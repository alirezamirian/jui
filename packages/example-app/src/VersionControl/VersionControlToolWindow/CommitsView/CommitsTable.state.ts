import { ReadCommitResult } from "isomorphic-git";
import { atom, atomFamily, selector } from "recoil";
import { Selection } from "@react-types/shared";

import { fs } from "../../../fs/fs";
import { vcsLogFilterCurrentTab } from "../vcs-logs.state";
import { allBranchesState } from "../../Branches/branches.state";
import { resolvedRefState } from "../../refs.state";
import { readCommits } from "./readCommits";
import { GitRef } from "./GitRef";
import { indexBy } from "ramda";

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

type CommitLogItem = {
  readCommitResult: ReadCommitResult;
  containingRefs: Set<string>;
  repoPath: string;
};
export const allCommitsState = selector<Array<CommitLogItem>>({
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

    const rows = get(allCommitsState)
      .filter(
        ({ containingRefs }) =>
          !branches?.length ||
          branches.some((branch) => containingRefs.has(branch))
      )
      .filter(
        ({ readCommitResult: { commit } }) =>
          (!dateFilter?.from ||
            commit.author.timestamp * 1000 > dateFilter.from.getTime()) &&
          (!dateFilter?.to ||
            commit.author.timestamp * 1000 < dateFilter.to.getTime())
      )
      .filter(
        ({ readCommitResult: { commit } }) =>
          !searchQuery ||
          match(commit.message, searchQuery, flags) ||
          match(commit.tree, searchQuery, { matchCase: false })
      );
    return {
      rows,
      byOid: indexBy(({ readCommitResult: commit }) => commit.oid, rows),
    };
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

/**
 * selection state of the commits table
 */
export const commitsSelectionState = atom<Selection>({
  key: "vcs/log/commits/selection",
  default: new Set([]),
});

/**
 * OIDs of the selected commits in commits table.
 */
export const selectedCommitOids = selector({
  key: `${commitsSelectionState.key}/keys`,
  get: ({ get }) => {
    const selection = get(commitsSelectionState);
    if (selection === "all") {
      return get(commitsTableRowsState).rows.map(
        ({ readCommitResult: { oid } }) => oid
      );
    }
    return [...selection].map((i) => `${i}`);
  },
});

/**
 * Selected commit in the commits table. The first row, if multiple rows are selected
 */
export const selectedCommitState = selector({
  key: "vcs/log/details/selectedCommit",
  get: ({ get }) => {
    const oid = get(selectedCommitOids)[0];
    return (oid && get(commitsTableRowsState).byOid[oid]) || null;
  },
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
