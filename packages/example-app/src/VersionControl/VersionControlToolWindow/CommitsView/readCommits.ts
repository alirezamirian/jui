import git, { ReadCommitResult } from "isomorphic-git";
import { sort } from "ramda";

type Fs = Parameters<typeof git["readCommit"]>[0]["fs"];

const cache = {};
export const commitDateComparator = (
  a: ReadCommitResult,
  b: ReadCommitResult
) => b.commit.committer.timestamp - a.commit.committer.timestamp;

type CommitWithMeta = {
  repoPath: string;
  /**
   * refs this commit contains in
   */
  containingRefs: Set<string>;
  readCommitResult: ReadCommitResult;
};

type RepoDescriptor = {
  repoPath: string;
  isBare?: boolean;
};
/**
 * Similar to git.log(...), but:
 * - supports multiple repos and multiple refs per repo.
 * - for each commit, includes the list of refs the commit is a part of
 * Commits are sorted by commit time, from new to old.
 */
export async function readCommits(
  fs: Fs,
  ...sources: Array<
    RepoDescriptor & {
      refs: string[];
    }
  >
) {
  const allCommits: Array<CommitWithMeta> = [];
  const commitsMap: Record<string, CommitWithMeta> = {};
  let commitsToProcess: Array<CommitWithMeta & RepoDescriptor> = [];

  commitsToProcess.forEach((item) => {
    commitsMap[item.readCommitResult.oid] = item;
  });
  const initialCommits = await Promise.all(
    sources.flatMap(({ refs, repoPath, isBare }) =>
      refs.map(async (ref) => {
        const commit = await git
          .resolveRef({
            ...getCommonArgs({ repoPath, isBare }),
            ref,
            depth: 3,
          })
          .then((oid) =>
            git.readCommit({
              ...getCommonArgs({ repoPath, isBare }),
              oid,
            })
          );
        return { repoPath, isBare, commit, refs: new Set([ref]) };
      })
    )
  );

  sort(
    ({ commit: c1 }, { commit: c2 }) => commitDateComparator(c1, c2),
    initialCommits
  ).forEach(({ commit, refs, repoPath, isBare }) =>
    addCommit({ repoPath, isBare }, commit, -1, refs)
  );

  while (commitsToProcess.length > 0) {
    const {
      readCommitResult: latestCommit,
      repoPath,
      isBare,
      containingRefs,
    } = commitsToProcess.shift()!; // non-null assertion because of length>0;
    allCommits.push({
      repoPath,
      readCommitResult: latestCommit,
      containingRefs: containingRefs,
    });
    const parentCommits = await Promise.all(
      latestCommit.commit.parent.map((oid) =>
        git.readCommit({
          ...getCommonArgs({ repoPath, isBare }),
          oid,
        })
      )
    );
    // insert new parents in the right place so that commitsToProcess remains sorted.
    parentCommits.forEach((commit) => {
      const index = commitsToProcess.findIndex(
        ({ readCommitResult: aCommit }) =>
          commitDateComparator(aCommit, commit) > 0
      );
      addCommit({ repoPath, isBare }, commit, index, containingRefs);
    });
  }
  return allCommits;

  function addCommit(
    { repoPath, isBare }: RepoDescriptor,
    commit: ReadCommitResult,
    index: number,
    refs: Set<string>
  ) {
    if (commitsMap[commit.oid]) {
      commitsMap[commit.oid].containingRefs = new Set([
        ...commitsMap[commit.oid].containingRefs,
        ...refs,
      ]);
    } else {
      const entry: CommitWithMeta & RepoDescriptor = {
        readCommitResult: commit,
        containingRefs: commitsMap[commit.oid]
          ? new Set([...commitsMap[commit.oid].containingRefs, ...refs])
          : refs,
        repoPath,
        isBare,
      };
      commitsMap[commit.oid] = entry;
      commitsToProcess.splice(
        index >= 0 ? index : commitsToProcess.length,
        0,
        entry
      );
    }
  }
  function getCommonArgs({
    repoPath,
    isBare,
  }: {
    repoPath: string;
    isBare?: boolean;
  }) {
    return {
      fs,
      cache,
      [isBare ? "gitdir" : "dir"]: repoPath,
    };
  }
}
