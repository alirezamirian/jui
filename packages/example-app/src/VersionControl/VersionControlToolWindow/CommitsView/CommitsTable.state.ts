import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { Selection } from "@react-types/shared";
import { vcsLogFilterCurrentTab } from "../vcs-logs.state";
import git, { ReadCommitResult } from "isomorphic-git";
import { vcsRootsState } from "../../file-status.state";
import { sort } from "ramda";
import { fs } from "../../../fs/fs";
import { allBranchesState } from "../../Branches/branches.state";
import { GitRef } from "./GitRef";
import { resolvedRefState } from "../../refs.state";

const cache = {};
const repoCommitsState = selectorFamily({
  key: "vcs/repoCommits",
  get: (repoRoot: string) => () =>
    git.log({ fs, dir: repoRoot, depth: 50 /* FIXME */, cache }),
});
const commitDateComparator = (a: ReadCommitResult, b: ReadCommitResult) =>
  b.commit.author.timestamp - a.commit.author.timestamp;
function match(
  input: string,
  query: string,
  flags: { matchCase?: boolean; regExp?: boolean } = {}
) {
  if (flags.regExp) {
    return new RegExp(query, flags.matchCase ? "" : "i").test(input);
  }
  if (flags.matchCase) {
    return input.toLowerCase().includes(query.toLowerCase());
  }
  return input.includes(query);
}

export const allCommitsState = selector<
  Array<{
    commit: ReadCommitResult;
    repoRoot: string;
  }>
>({
  key: "vcs/allRepoCommits",
  get: ({ get }) => {
    get(vcsRootsState);
    const result =
      JSON.parse(localStorage.getItem("TMP_ALL_COMMITS") ?? "null") ??
      get(vcsRootsState)
        .filter(({ vcs }) => vcs === "git")
        .flatMap((repo) =>
          get(repoCommitsState(repo.dir)).map((commit) => ({
            commit,
            repoRoot: repo.dir,
          }))
        );
    localStorage.setItem("TMP_ALL_COMMITS", JSON.stringify(result));
    return result;
  },
});

export const commitsTableRowsState = selector({
  key: "vcs/log/rows",
  get: ({ get }) => {
    console.log("getting commit table rows");
    const searchQuery = get(vcsLogFilterCurrentTab.searchQuery);
    const flags = {
      matchCase: get(vcsLogFilterCurrentTab.matchCase),
      regExp: get(vcsLogFilterCurrentTab.regExp),
    };
    const dateFilter = get(vcsLogFilterCurrentTab.date);

    return sort(
      ({ commit: c1 }, { commit: c2 }) => commitDateComparator(c1, c2),
      get(allCommitsState)
    )
      .filter(
        ({ commit: { commit } }) =>
          (!dateFilter?.from ||
            commit.author.timestamp * 1000 > dateFilter.from.getTime()) &&
          (!dateFilter?.to ||
            commit.author.timestamp * 1000 < dateFilter.to.getTime())
      )
      .filter(
        ({ commit: { commit } }) =>
          !searchQuery ||
          match(commit.message, searchQuery, flags) ||
          match(commit.tree, searchQuery, { matchCase: false })
      );
  },
});
export const allResolvedRefsState = selector({
  key: "vcs/logs/all-refs",
  get: ({ get }) => {
    const repoBranches = get(allBranchesState);
    const refs: Record<string, GitRef[]> = {};
    const addRef = (ref: string, value: GitRef) => {
      refs[ref] = refs[ref] || [];
      refs[ref].push(value);
    };
    repoBranches.forEach(({ repoRoot }) => {
      addRef(get(resolvedRefState({ repoRoot, ref: "HEAD" })), {
        type: "head",
        name: "HEAD",
      });
    });
    repoBranches.forEach(({ repoRoot, localBranches, currentBranch }) => {
      localBranches.forEach((branch) => {
        addRef(get(resolvedRefState({ repoRoot, ref: branch.name })), {
          type: "localBranch",
          name: branch.name,
          isCurrent: currentBranch?.name === branch.name,
          trackingBranch: branch.trackingBranch,
        });
      });
    });
    repoBranches.forEach(({ repoRoot, remoteBranches }) =>
      remoteBranches.forEach((branch) => {
        const branchName = `${branch.remote}/${branch.name}`;
        addRef(get(resolvedRefState({ repoRoot, ref: branchName })), {
          type: "remoteBranch",
          name: branchName,
        });
      })
    );
    return refs;
  },
});

export const selectedCommitsState = atom<Selection>({
  key: "vcs/log/commits/selected",
  default: new Set(),
});
export const vcsTableShowCommitTimestampState = atom<boolean>({
  key: "vcs/log/commits/showCommitTimestamp",
  default: false,
});

export const vcsTableReferencesOnTheLeftState = atom<boolean>({
  key: "vcs/log/commits/referencesOnTheLeft",
  default: false,
});

export const vcsTableHighlightMyCommitsState = atom<boolean>({
  key: "vcs/log/commits/highlightMyCommits",
  default: false,
});

type CommitTableColumn = {
  id: string;
  /**
   * column name shown in the UI.
   */
  name: string;
};

export const authorColumn = {
  id: "Default.Author",
  name: "Author",
};
export const hashColumn = {
  id: "Default.Hash",
  name: "Hash",
};

export const dateColumn = {
  id: "Date.Date",
  name: "Date",
};

const defaultVisibleColumns = [authorColumn.id, dateColumn.id];
export const vcsTableColumnsVisibilityState = atomFamily<boolean, string>({
  key: "vcs/log/commits/highlightMyCommits",
  default: (id) => defaultVisibleColumns.includes(id),
});
