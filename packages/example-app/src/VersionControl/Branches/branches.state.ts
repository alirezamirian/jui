import { equals } from "ramda";
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

type FavoriteBranch = {
  repoRoot: string;
  branchType: "local" | "remote";
  branchName: string;
};

const PREDEFINED_FAVORITE_BRANCH_NAMES = [
  { branchType: "local", branchName: "master" },
  { branchType: "remote", branchName: "origin/master" },
];

const favoriteBranchesState = atom<FavoriteBranch[]>({
  key: "vcs/branches/favorite",
  default: [],
});

const excludedFromFavoriteBranchesState = atom<FavoriteBranch[]>({
  key: "vcs/branches/favorite-excluded",
  default: [],
});

function isPredefinedAsFavorite(params: {
  repoRoot: string;
  branchName: string;
  branchType: "local" | "remote";
}) {
  return PREDEFINED_FAVORITE_BRANCH_NAMES.some(
    ({ branchType, branchName }) =>
      branchName === params.branchName && branchType === params.branchType
  );
}

const isFavorite = (
  favoriteBranches: FavoriteBranch[],
  excludedFromFavoriteBranches: FavoriteBranch[],
  params: FavoriteBranch
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
        params: FavoriteBranch,
        favorite: boolean = !isFavorite(
          snapshot.getLoadable(favoriteBranchesState).getValue(),
          snapshot.getLoadable(excludedFromFavoriteBranchesState).getValue(),
          params
        )
      ) => {
        const remove = (currentValue: FavoriteBranch[]) =>
          currentValue.filter(
            (favoriteBranch: FavoriteBranch) => !equals(favoriteBranch, params)
          );
        const add = (currentValue: FavoriteBranch[]) => {
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
    isFavorite: (params: FavoriteBranch) =>
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
          branchType: "local",
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
