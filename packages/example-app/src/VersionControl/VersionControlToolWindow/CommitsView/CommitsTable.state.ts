import { ReadCommitResult } from "isomorphic-git";
import { atom, atomFamily, selector } from "recoil";
import { Selection } from "@react-types/shared";

import { fs } from "../../../fs/fs";
import { vcsLogFilterCurrentTab } from "../vcs-logs.state";
import { allBranchesState } from "../../Branches/branches.state";
import { resolvedRefState } from "../../refs.state";
import { readCommits } from "./readCommits";
import { GitRef } from "./GitRef";
import { filter } from "ramda";

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
    refs: Set<string>;
    repoPath: string;
  }>
>({
  key: "vcs/allRepoCommits",
  get: ({ get }) =>
    readCommits(
      fs,
      ...get(allBranchesState).map(
        ({ repoRoot, localBranches, remoteBranches }) => ({
          repoPath: repoRoot,
          refs: ["HEAD"]
            .concat(localBranches.map((branch) => branch.name))
            .concat(
              remoteBranches.map((branch) => `${branch.remote}/${branch.name}`)
            ),
        })
      )
    ),
});

export const commitsTableRowsState = selector({
  key: "vcs/log/rows",
  get: ({ get }) => {
    const searchQuery = get(vcsLogFilterCurrentTab.searchQuery);
    const branches = get(vcsLogFilterCurrentTab.branch);
    const flags = {
      matchCase: get(vcsLogFilterCurrentTab.matchCase),
      regExp: get(vcsLogFilterCurrentTab.regExp),
    };
    const dateFilter = get(vcsLogFilterCurrentTab.date);

    return get(allCommitsState)
      .filter(
        ({ refs }) =>
          !branches?.length || branches.some((branch) => refs.has(branch))
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
