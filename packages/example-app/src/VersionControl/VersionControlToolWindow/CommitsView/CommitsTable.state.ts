import { ReadCommitResult } from "isomorphic-git";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { Selection } from "@react-types/shared";
import { indexBy } from "ramda";

import { fs } from "../../../fs/fs";
import { atomWithRefresh } from "../../../atom-utils/atomWithRefresh";
import { allBranchesAtom } from "../../Branches/branches.state";
import { resolvedRefAtoms } from "../../refs.state";
import { GitRef } from "../GitRef";
import { vcsLogFilterCurrentTab } from "../vcs-logs.state";
import { readCommits } from "./readCommits";

function match(
  input: string,
  query: string,
  flags: { matchCase?: boolean; regExp?: boolean } = {}
) {
  if (flags.regExp) {
    return new RegExp(query, flags.matchCase ? "" : "i").test(input);
  }
  if (!flags.matchCase) {
    return input.toLowerCase().includes(query.toLowerCase());
  }
  return input.includes(query);
}

type CommitLogItem = {
  readCommitResult: ReadCommitResult;
  containingRefs: Set<string>;
  repoPath: string;
};

export const allCommitsAtom = atomWithRefresh<Promise<Array<CommitLogItem>>>(
  async (get) => {
    // TODO: readCommit can take too long. Suspending anything that depends on it leads to poor UX. would be nicer
    //  to have the state updated (like an atom instead of selector) when commits are read, instead of query inside
    //  the selector. But the challenge is that it does depend on another piece of state, allBranchesState
    return readCommits(
      fs,
      ...(await get(allBranchesAtom)).map(
        ({ repoRoot, localBranches, remoteBranches }) => ({
          repoPath: repoRoot,
          refs: ["HEAD"]
            .concat(localBranches.map((branch) => branch.name))
            .concat(
              remoteBranches.map((branch) => `${branch.remote}/${branch.name}`)
            ),
        })
      )
    );
  }
);

export const commitsTableRowsAtom = atom(async (get) => {
  const searchQuery = get(vcsLogFilterCurrentTab.searchQuery);
  const branches = get(vcsLogFilterCurrentTab.branch);
  const flags = {
    matchCase: get(vcsLogFilterCurrentTab.matchCase),
    regExp: get(vcsLogFilterCurrentTab.regExp),
  };
  const dateFilter = get(vcsLogFilterCurrentTab.date);

  const rows = (await get(allCommitsAtom))
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
});

export const allResolvedRefsAtom = atom(async (get) => {
  const repoBranches = await get(allBranchesAtom);
  const refs: Record<string, GitRef[]> = {};
  const addRef = (ref: string, value: GitRef) => {
    refs[ref] = refs[ref] || [];
    refs[ref].push(value);
  };
  (
    await Promise.all(
      repoBranches.map(({ repoRoot }) =>
        get(resolvedRefAtoms({ repoRoot, ref: "HEAD" }))
      )
    )
  ).forEach((resolvedRef) => {
    addRef(resolvedRef, {
      type: "head",
      name: "HEAD",
    });
  });
  for (const { repoRoot, localBranches, currentBranch } of repoBranches) {
    for (const branch of localBranches) {
      addRef(await get(resolvedRefAtoms({ repoRoot, ref: branch.name })), {
        type: "localBranch",
        name: branch.name,
        isCurrent: currentBranch?.name === branch.name,
        trackingBranch: branch.trackingBranch,
      });
    }
  }
  for (const { repoRoot, remoteBranches } of repoBranches) {
    for (const branch of remoteBranches) {
      const branchName = `${branch.remote}/${branch.name}`;
      addRef(await get(resolvedRefAtoms({ repoRoot, ref: branchName })), {
        type: "remoteBranch",
        name: branchName,
      });
    }
  }
  return refs;
});

/**
 * selection state of the commits table
 * TODO: make it per-tab
 */
export const commitsSelectionAtom = atom<Selection>(new Set([]));

/**
 * OIDs of the selected commits in commits table.
 */
export const selectedCommitOids = atom(async (get) => {
  const selection = get(commitsSelectionAtom);
  if (selection === "all") {
    return (await get(commitsTableRowsAtom)).rows.map(
      ({ readCommitResult: { oid } }) => oid
    );
  }
  return [...selection].map((i) => `${i}`);
});

export const selectedCommitsAtom = atom(async (get) =>
  Promise.all(
    (await get(selectedCommitOids)).map(
      async (oid) => (await get(commitsTableRowsAtom)).byOid[oid]
    )
  )
);

/**
 * Selected commit in the commits table. The first row, if multiple rows are selected
 */
export const selectedCommitAtom = atom(async (get) => {
  const oid = (await get(selectedCommitOids))[0];
  return (oid && (await get(commitsTableRowsAtom)).byOid[oid]) || null;
});

export const vcsTableShowCommitTimestampAtom = atom<boolean>(false);

export const vcsTableReferencesOnTheLeftAtom = atom<boolean>(false);

export const vcsTableHighlightMyCommitsAtom = atom<boolean>(false);

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
export const vcsTableColumnsVisibilityAtoms = atomFamily((id: string) =>
  atom<boolean>(defaultVisibleColumns.includes(id))
);
