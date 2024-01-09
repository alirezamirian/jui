import { equals, groupBy } from "ramda";
import {
  atom,
  selector,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
} from "recoil";
import git, {
  branch,
  checkout,
  deleteBranch,
  renameBranch,
} from "isomorphic-git";

import { fs } from "../../fs/fs";
import { vcsRootForFile, vcsRootsState } from "../file-status.state";
import { dirContentState, reloadFileFromDiskCallback } from "../../fs/fs.state";
import { editorTabsState } from "../../Editor/editor.state";
import { asyncFilter } from "../../async-utils";
import { getTrackingBranch } from "./branch-utils";
import { array, literal, object, string, union } from "@recoiljs/refine";
import { persistentAtomEffect } from "../../Project/persistence/persistentAtomEffect";

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
const repoLocalBranchesState = selectorFamily<LocalBranch[], string>({
  key: "vcs/repoLocalBranches",
  get:
    (repoRoot: string) =>
    async ({}) => {
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
    },
});

/**
 * List of remote branches of a given repository
 */
const repoRemoteBranchesState = selectorFamily({
  key: "vcs/repoRemoteBranches",
  get: (repoRoot: string) => async (): Promise<RemoteBranch[]> => {
    const remotes = await git.listRemotes({ fs, dir: repoRoot });
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
  },
});

/**
 * List of local and remote branches of a given repository
 */
export const repoBranchesState = selectorFamily<RepoBranches, string>({
  key: "vcs/repoBranches",
  get:
    (repoRoot: string) =>
    async ({ get }) => {
      const currentBranchName = get(repoCurrentBranchNameState(repoRoot));
      const localBranches = get(repoLocalBranchesState(repoRoot));
      return {
        repoRoot,
        currentBranch:
          localBranches.find((branch) => branch.name === currentBranchName) ||
          null,
        localBranches: localBranches,
        remoteBranches: get(repoRemoteBranchesState(repoRoot)),
      };
    },
});

/**
 * Current branch name of the given repository. Can be null, if head is detached.
 */
export const repoCurrentBranchNameState = selectorFamily({
  key: "vcs/repoCurrentBranch",
  get: (repoRoot: string) => () => {
    return git.currentBranch({
      fs,
      dir: repoRoot,
      fullname: false,
    });
  },
});

/**
 * List of all (remote and local) branches of all repositories
 */
export const allBranchesState = selector<RepoBranches[]>({
  key: "vcs/allBranches",
  get: ({ get }) => {
    const repoRoots = get(vcsRootsState);
    return repoRoots.map(({ dir: repoRoot }) =>
      get(repoBranchesState(repoRoot))
    );
  },
});

/**
 * Given the absolute path of a file, returns the current branch on the repository this file belongs to.
 */
export const branchForPathState = selectorFamily<string | null, string>({
  key: "gitBranchForFile",
  get:
    (filepath: string) =>
    ({ get }) => {
      const root = get(vcsRootForFile(filepath));
      return root
        ? get(repoBranchesState(root)).currentBranch?.name || null
        : null;
    },
});

const PREDEFINED_FAVORITE_BRANCH_NAMES = [
  { branchType: "LOCAL", branchName: "master" },
  { branchType: "REMOTE", branchName: "origin/master" },
];

type MaybeArray<T> = Array<T> | T;
const maybeArray = <T>(input: MaybeArray<T> | undefined): Array<T> =>
  Array.isArray(input) ? input : input ? [input] : [];
interface BranchStorage {
  map: MaybeArray<{
    entry: {
      "@type": "LOCAL" | "REMOTE";
      value: {
        list: MaybeArray<{
          "branch-info": {
            "@repo": string;
            "@source": string;
          };
        }>;
      };
    };
  }>;
}

/**
 * Implements the intellij's data structure for persisting branch storage objects, used in persisting favorite branches
 * state. The reason for following the same data structure is to be able to open existing intellij projects with this
 * app and have it read/write the persistent state the same way an intellij does.
 */
interface GitSettingsStorage {
  "favorite-branches"?: {
    "branch-storage": BranchStorage;
  };
  "exclude-from-favorite"?: {
    "branch-storage": BranchStorage;
  };
}

function readBranchStorage(branchStorage: BranchStorage | undefined) {
  return (
    maybeArray(branchStorage?.map).flatMap<BranchInfo>((entry) =>
      maybeArray(entry?.entry.value.list).map(
        ({ "branch-info": { "@source": branchName, "@repo": repoRoot } }) => ({
          branchType: entry?.entry["@type"],
          branchName,
          repoRoot,
        })
      )
    ) || []
  );
}

function toBranchStorage(value: readonly BranchInfo[]): BranchStorage {
  const branchesByType = groupBy(({ branchType }) => branchType, value);
  const entries = Object.entries(branchesByType).map(
    ([branchType, branches]) => ({
      entry: {
        "@type": branchType as BranchType,
        value: {
          list: branches.map((branch) => ({
            "branch-info": {
              "@repo": branch.repoRoot,
              "@source": branch.branchName,
            },
          })),
        },
      },
    })
  );
  return {
    map: entries,
  };
}

const branchInfoArrayChecker = array(
  object({
    branchType: union(literal("LOCAL"), literal("REMOTE")),
    branchName: string(),
    repoRoot: string(),
  })
);

const favoriteBranchesState = atom<ReadonlyArray<BranchInfo>>({
  key: "vcs/branches/favorite",
  default: [],
  effects: [
    persistentAtomEffect<ReadonlyArray<BranchInfo>, GitSettingsStorage>({
      refine: branchInfoArrayChecker,
      componentName: "Git.Settings",
      read: (gitSettings) => {
        return readBranchStorage(
          gitSettings?.["favorite-branches"]?.["branch-storage"]
        );
      },
      update: (value) => {
        return (currentValue): GitSettingsStorage => ({
          ...(currentValue || {}),
          "favorite-branches": {
            "branch-storage": toBranchStorage(value),
          },
        });
      },
    }),
  ],
});

export const isFavoriteBranchState = selectorFamily({
  key: "vcs/branches/isFavorite",
  get:
    (branchInfo: BranchInfo) =>
    ({ get }) => {
      return isFavorite(
        get(favoriteBranchesState),
        get(excludedFromFavoriteBranchesState),
        branchInfo
      );
    },
});

const excludedFromFavoriteBranchesState = atom<ReadonlyArray<BranchInfo>>({
  key: "vcs/branches/favorite-excluded",
  default: [],
  effects: [
    persistentAtomEffect<ReadonlyArray<BranchInfo>, GitSettingsStorage>({
      refine: branchInfoArrayChecker,
      componentName: "Git.Settings",
      read: (gitSettings) => {
        return readBranchStorage(
          gitSettings?.["exclude-from-favorite"]?.["branch-storage"]
        );
      },
      update: (value) => {
        return (currentValue): GitSettingsStorage => ({
          ...(currentValue || {}),
          "exclude-from-favorite": {
            "branch-storage": toBranchStorage(value),
          },
        });
      },
    }),
  ],
});

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
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (
        params: BranchInfo,
        favorite: boolean = !isFavorite(
          snapshot.getLoadable(favoriteBranchesState).getValue(),
          snapshot.getLoadable(excludedFromFavoriteBranchesState).getValue(),
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
          set(excludedFromFavoriteBranchesState, remove);
          if (!isPredefinedAsFavorite(params)) {
            set(favoriteBranchesState, add);
          }
        } else {
          set(favoriteBranchesState, remove);
          if (isPredefinedAsFavorite(params)) {
            set(excludedFromFavoriteBranchesState, add);
          }
        }
      },
    []
  );
}
export function useFavoriteBranches() {
  const favoriteBranches = useRecoilValue(favoriteBranchesState);
  const excludedFromFavoriteBranches = useRecoilValue(
    excludedFromFavoriteBranchesState
  );

  return {
    isFavorite: (params: BranchInfo) =>
      isFavorite(favoriteBranches, excludedFromFavoriteBranches, params),
    toggleFavorite: useToggleFavoriteBranch(),
  } as const;
}

export function useCreateBranch() {
  return useRecoilCallback(
    ({ refresh }) =>
      (repoRoot: string, branchName: string, checkout: boolean = true) => {
        return branch({ fs, dir: repoRoot, checkout, ref: branchName }).then(
          () => {
            refresh(repoBranchesState(repoRoot));
          }
        );
      },
    []
  );
}

/**
 * Rename of a local branch.
 */
export function useRenameBranch() {
  const toggleFavoriteBranch = useToggleFavoriteBranch();
  return useRecoilCallback(
    ({ refresh, snapshot }) =>
      async (repoRoot: string, branchName: string, newBranchName: string) => {
        await renameBranch({
          fs,
          dir: repoRoot,
          oldref: branchName,
          ref: newBranchName,
        });
        refresh(repoBranchesState(repoRoot));
        const favoriteBranch = {
          branchType: "LOCAL",
          branchName,
          repoRoot,
        } as const;
        if (
          isFavorite(
            snapshot.getLoadable(favoriteBranchesState).getValue(),
            snapshot.getLoadable(excludedFromFavoriteBranchesState).getValue(),
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
  );
}

export function useCheckoutBranch() {
  return useRecoilCallback(
    (callbackInterface) =>
      async (repoRoot: string, branchName: string, remote?: string) => {
        const { refresh, snapshot, set } = callbackInterface;
        const reloadFileFromDisk =
          reloadFileFromDiskCallback(callbackInterface);
        await checkout({
          fs,
          dir: repoRoot,
          remote,
          ref: branchName,
        });
        refresh(repoBranchesState(repoRoot));
        refresh(dirContentState(repoRoot));
        const openedFiles = snapshot.getLoadable(editorTabsState).getValue();
        const existingOpenedFile = await asyncFilter(
          ({ filePath }) => reloadFileFromDisk(filePath),
          openedFiles
        );
        set(editorTabsState, existingOpenedFile);
        // TODO: update file status (fileStatusState) for the repo.
      },
    []
  );
}

export function useDeleteBranch() {
  return useRecoilCallback(
    ({ refresh }) =>
      (repoRoot: string, branchName: string) => {
        return deleteBranch({ fs, dir: repoRoot, ref: branchName }).then(() => {
          refresh(repoBranchesState(repoRoot));
        });
      },
    []
  );
}
