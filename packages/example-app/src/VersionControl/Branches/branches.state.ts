import { equals, groupBy } from "ramda";
import { useCallback } from "react";
import { atomFamily, useAtomCallback } from "jotai/utils";
import { atom, Getter, Setter, useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";

import git, {
  branch,
  checkout,
  deleteBranch,
  renameBranch,
} from "isomorphic-git";
import { z } from "zod";

import { fs } from "../../fs/fs";
import { atomWithRefresh } from "../../atom-utils/atomWithRefresh";
import { vcsFootForFileAtom, vcsRootsAtom } from "../file-status.state";
import { dirContentAtom, reloadFileFromDiskCallback } from "../../fs/fs.state";
import { editorTabsAtom } from "../../Editor/editor.state";
import { asyncFilter } from "../../async-utils";
import { getTrackingBranch } from "./branch-utils";
import { atomWithPersistence } from "../../persistence/atomWithPersistence";
import { list, map } from "../../persistence/schema-utils";

export type LocalBranch = {
  name: string;
  trackingBranch: string | null;
};

export type RemoteBranch = {
  name: string;
  remote: string;
};

export type RepoBranches = {
  repoRoot: string;
  currentBranch: LocalBranch | null;
  localBranches: LocalBranch[];
  remoteBranches: RemoteBranch[];
};

export type BranchType = "LOCAL" | "REMOTE";

export type BranchInfo = {
  repoRoot: string;
  branchType: BranchType;
  branchName: string;
};

/**
 * List of local branches of a given repository.
 */
const repoLocalBranchesAtom = atomFamily((repoRoot: string) =>
  atomWithRefresh(async ({}): Promise<LocalBranch[]> => {
    const branches = await git.listBranches({ fs, dir: repoRoot });
    return Promise.all(
      branches.map(async (branch) => ({
        name: branch,
        trackingBranch: await getTrackingBranch({
          fs,
          dir: repoRoot,
          localBranchName: branch,
        }),
      }))
    );
  })
);

export const repoRemotesAtoms = atomFamily((repoRoot: string) =>
  atomWithRefresh(() => git.listRemotes({ fs, dir: repoRoot }))
);

/**
 * List of remote branches of a given repository
 */
export const repoRemoteBranchesAtoms = atomFamily((repoRoot: string) =>
  atomWithRefresh(async (get): Promise<RemoteBranch[]> => {
    const remotes = await get(repoRemotesAtoms(repoRoot));
    return (
      await Promise.all(
        remotes.map(({ remote }) =>
          git
            .listBranches({ fs, dir: repoRoot, remote })
            .then((branches) =>
              branches
                .filter((branch) => branch !== "HEAD")
                .map((branch) => ({ name: branch, remote }))
            )
        )
      )
    ).flat();
  })
);

/**
 * List of local and remote branches of a given repository
 * TODO: rename and refactor to be repoState?
 */
export const repoBranchesAtom = atomFamily((repoRoot: string) =>
  atomWithRefresh(async (get) => {
    const currentBranchName = await get(repoCurrentBranchNameAtom(repoRoot));
    let localBranches = await get(repoLocalBranchesAtom(repoRoot));
    if (localBranches.length === 0 && currentBranchName) {
      // When a repo is initialized and before the first commit, no branch is returned when listing branches.
      // See more: https://github.com/isomorphic-git/isomorphic-git/issues/1650
      localBranches = localBranches.concat({
        name: currentBranchName,
        trackingBranch: null,
      });
    }
    return {
      repoRoot,
      currentBranch:
        localBranches.find((branch) => branch.name === currentBranchName) ||
        null,
      localBranches: localBranches,
      remoteBranches: await get(repoRemoteBranchesAtoms(repoRoot)),
    };
  })
);

/**
 * Current branch name of the given repository. Can be null, if head is detached.
 */
export const repoCurrentBranchNameAtom = atomFamily((repoRoot: string) =>
  atomWithRefresh(() => {
    return git.currentBranch({
      fs,
      dir: repoRoot,
      fullname: false,
    });
  })
);

/**
 * List of all (remote and local) branches of all repositories
 */
export const allBranchesAtom = atom(async (get): Promise<RepoBranches[]> => {
  const repoRoots = get(vcsRootsAtom);
  return Promise.all(
    repoRoots.map(({ dir: repoRoot }) => get(repoBranchesAtom(repoRoot)))
  );
});

/**
 * Given the absolute path of a file, returns the current branch on the repository this file belongs to.
 */
export const branchForPathAtoms = atomFamily((filepath: string) =>
  atom(async (get): Promise<string | null> => {
    const root = await get(vcsFootForFileAtom(filepath));
    const repoRoot = root ? await get(repoBranchesAtom(root)) : null;
    console.log(`repo root for ${filepath}`, root, root && repoRoot);
    return root ? repoRoot?.currentBranch?.name || null : null;
  })
);

const PREDEFINED_FAVORITE_BRANCH_NAMES = [
  { branchType: "LOCAL", branchName: "master" },
  { branchType: "REMOTE", branchName: "origin/master" },
];

function readBranchStorage(branchStorage: BranchStorage | undefined) {
  return (
    branchStorage?.map.entry.flatMap<BranchInfo>((entry) =>
      entry?.value.list["branch-info"].map(
        ({ "@source": branchName, "@repo": repoRoot }) => ({
          branchType: entry["@type"],
          branchName,
          repoRoot,
        })
      )
    ) || []
  );
}

function writeBranchStorage(value: readonly BranchInfo[]): BranchStorage {
  const branchesByType = groupBy(({ branchType }) => branchType, value);
  const entries = Object.entries(branchesByType).map(
    ([branchType, branches]) => ({
      "@type": branchType as BranchType,
      value: {
        list: {
          "branch-info": branches.map((branch) => ({
            "@repo": branch.repoRoot,
            "@source": branch.branchName,
          })),
        },
      },
    })
  );
  return {
    map: {
      entry: entries,
    },
  };
}

const branchStorage = z.object({
  "branch-storage": z.object({
    map: map(
      z.enum(["LOCAL", "REMOTE"]),
      z.object({
        list: list(
          z.object({
            "@repo": z.string(),
            "@source": z.string(),
          }),
          "branch-info"
        ),
      })
    ),
  }),
});

type BranchStorage = (typeof branchStorage)["_output"]["branch-storage"];

/**
 * Implements the intellij's data structure for persisting branch storage objects, used in persisting favorite branches
 * state. The reason for following the same data structure is to be able to open existing intellij projects with this
 * app and have it read/write the persistent state the same way an intellij does.
 */
export const gitSettingsSchema = z
  .object({
    "favorite-branches": branchStorage.optional(),
    "exclude-from-favorite": branchStorage.optional(),
  })
  .optional();

type GitSettings = {
  branches: ReadonlyArray<BranchInfo>;
  excludedBranches: ReadonlyArray<BranchInfo>;
};

const gitSettingsAtom = atomWithPersistence(
  {
    schema: gitSettingsSchema,
    componentName: "Git.Settings",
    read: (componentState): GitSettings => {
      return {
        branches: readBranchStorage(
          componentState?.["favorite-branches"]?.["branch-storage"]
        ),
        excludedBranches: readBranchStorage(
          componentState?.["exclude-from-favorite"]?.["branch-storage"]
        ),
      };
    },
    write: (value, state) => {
      const newState = {
        ...state,
      };
      // empty objects or arrays convert into empty tag, which then gets deserialized as string
      // it's not convenient to make sure empty objects are not included, and it's not even type safe
      // so maybe a better solution would be to handle deserialization from empty string too, with a custom
      // object() (similar to maybeArray utility), that would be able to deserialize from empty string,
      // and would used instead of z.object().
      // Type safety could also be implemented the same way it's done for maybeArray, to make sure everywhere that
      // an object with all-optional properties exist, empty string is also allowed in the input type.
      if (value.branches.length > 0) {
        newState["favorite-branches"] = {
          "branch-storage": writeBranchStorage(value.branches),
        };
      } else {
        delete newState["favorite-branches"];
      }
      if (value.excludedBranches.length > 0) {
        newState["exclude-from-favorite"] = {
          "branch-storage": writeBranchStorage(value.excludedBranches),
        };
      } else {
        delete newState["exclude-from-favorite"];
      }
      return newState;
    },
  },
  { branches: [], excludedBranches: [] } as GitSettings
);

const favoriteBranchesAtom = focusAtom(gitSettingsAtom, (optic) =>
  optic.prop("branches")
);

const excludedFromFavoriteBranchesAtom = focusAtom(gitSettingsAtom, (optic) =>
  optic.prop("excludedBranches")
);

export const isFavoriteBranchAtoms = atomFamily(
  (branchInfo: BranchInfo) =>
    atom((get) => {
      return isFavorite(
        get(favoriteBranchesAtom),
        get(excludedFromFavoriteBranchesAtom),
        branchInfo
      );
    }),
  equals
);

function isPredefinedAsFavorite(params: {
  repoRoot: string;
  branchName: string;
  branchType: BranchType;
}) {
  return PREDEFINED_FAVORITE_BRANCH_NAMES.some(
    ({ branchType, branchName }) =>
      branchName === params.branchName && branchType === params.branchType
  );
}

const isFavorite = (
  favoriteBranches: ReadonlyArray<BranchInfo>,
  excludedFromFavoriteBranches: ReadonlyArray<BranchInfo>,
  params: BranchInfo
) => {
  if (favoriteBranches.find(equals(params))) {
    return true;
  }
  if (excludedFromFavoriteBranches.find(equals(params))) {
    return false;
  }
  return isPredefinedAsFavorite(params);
};

function useToggleFavoriteBranch() {
  return useAtomCallback(
    useCallback(
      (
        get,
        set,
        params: BranchInfo,
        favorite: boolean = !isFavorite(
          get(favoriteBranchesAtom),
          get(excludedFromFavoriteBranchesAtom),
          params
        )
      ) => {
        const remove = (
          currentValue: ReadonlyArray<BranchInfo>
        ): ReadonlyArray<BranchInfo> =>
          currentValue.filter(
            (favoriteBranch: BranchInfo) => !equals(favoriteBranch, params)
          );
        const add = (
          currentValue: ReadonlyArray<BranchInfo>
        ): ReadonlyArray<BranchInfo> => {
          if (currentValue.some(equals(params))) {
            return currentValue;
          }
          return currentValue.concat(params);
        };

        if (favorite) {
          set(excludedFromFavoriteBranchesAtom, remove);
          if (!isPredefinedAsFavorite(params)) {
            set(favoriteBranchesAtom, add);
          }
        } else {
          set(favoriteBranchesAtom, remove);
          if (isPredefinedAsFavorite(params)) {
            set(excludedFromFavoriteBranchesAtom, add);
          }
        }
      },
      []
    )
  );
}
export function useFavoriteBranches() {
  const favoriteBranches = useAtomValue(favoriteBranchesAtom);
  const excludedFromFavoriteBranches = useAtomValue(
    excludedFromFavoriteBranchesAtom
  );

  return {
    isFavorite: (params: BranchInfo) =>
      isFavorite(favoriteBranches, excludedFromFavoriteBranches, params),
    toggleFavorite: useToggleFavoriteBranch(),
  } as const;
}

export function useCreateBranch() {
  return useAtomCallback(
    useCallback(
      (
        _get,
        set,
        repoRoot: string,
        branchName: string,
        checkout: boolean = true
      ) => {
        return branch({ fs, dir: repoRoot, checkout, ref: branchName }).then(
          () => {
            set(repoBranchesAtom(repoRoot));
          }
        );
      },
      []
    )
  );
}

/**
 * Rename of a local branch.
 */
export function useRenameBranch() {
  const toggleFavoriteBranch = useToggleFavoriteBranch();
  return useAtomCallback(
    useCallback(
      async (
        get,
        set,
        repoRoot: string,
        branchName: string,
        newBranchName: string
      ) => {
        await renameBranch({
          fs,
          dir: repoRoot,
          oldref: branchName,
          ref: newBranchName,
        });
        set(repoBranchesAtom(repoRoot));
        const favoriteBranch = {
          branchType: "LOCAL",
          branchName,
          repoRoot,
        } as const;
        if (
          isFavorite(
            get(favoriteBranchesAtom),
            get(excludedFromFavoriteBranchesAtom),
            favoriteBranch
          )
        ) {
          toggleFavoriteBranch(favoriteBranch, false); // remove old branch from favorites
          toggleFavoriteBranch(
            {
              ...favoriteBranch,
              branchName: newBranchName,
            },
            true
          ); // add new branch as favorite
        }
      },
      []
    )
  );
}

export function useCheckoutBranch() {
  return useAtomCallback(
    useCallback(
      async (
        get: Getter,
        set: Setter,
        repoRoot: string,
        branchName: string,
        remote?: string
      ) => {
        const reloadFileFromDisk = reloadFileFromDiskCallback(get, set);
        await checkout({
          fs,
          dir: repoRoot,
          remote,
          ref: branchName,
        });
        console.log(`checked out branch ${branchName}`);
        set(repoBranchesAtom(repoRoot));
        set(dirContentAtom(repoRoot));
        const openedFiles = get(editorTabsAtom);
        const existingOpenedFile = await asyncFilter(async ({ filePath }) => {
          const exists = await fs.promises.exists(filePath); // should it be fs directly?
          // the file content for files not open in the editor also need to be updated. TODO(fs.watch)
          console.log(`updating the content of the file ${filePath}`, exists);
          if (exists) {
            await reloadFileFromDisk(filePath);
          }
          return exists;
        }, openedFiles);
        set(editorTabsAtom, existingOpenedFile);
        // TODO: update file status (fileStatusState) for the repo.
      },
      []
    )
  );
}

export function useDeleteBranch() {
  return useAtomCallback(
    useCallback((_get, set, repoRoot: string, branchName: string) => {
      return deleteBranch({ fs, dir: repoRoot, ref: branchName }).then(() => {
        set(repoBranchesAtom(repoRoot));
      });
    }, [])
  );
}
