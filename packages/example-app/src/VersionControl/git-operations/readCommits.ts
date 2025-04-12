import { ReadCommitResult } from "isomorphic-git";
import { groupBy, map, sort } from "ramda";
import type { gitImpl } from "../gitImpl";

export const commitDateComparator = (
  a: ReadCommitResult,
  b: ReadCommitResult
) => b.commit.committer.timestamp - a.commit.committer.timestamp;
export type CommitWithMeta = {
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
type CommitQueueItem = CommitWithMeta &
  RepoDescriptor & {
    isBare?: boolean;
    type: "whitelist" | "blacklist";
  };
export type CommitSource = Array<
  RepoDescriptor & {
    refs: string[];
    /**
     * Similar to [--not](https://git-scm.com/docs/git-log#Documentation/git-log.txt---not) in `git log`.
     * Traversing commits will stop when reaching any commit from `notRefs`.
     */
    notRefs?: string[];
  }
>;

/**
 * Similar to git.log(...), but:
 * - supports multiple repos and multiple refs per repo.
 * - for each commit, includes the list of refs the commit is a part of
 * Commits are sorted by commit time, from new to old.
 */
export async function readCommits(
  git: Pick<typeof gitImpl, "readCommit" | "resolveRef">,
  ...sources: CommitSource
): Promise<CommitWithMeta[]> {
  const allCommits: Array<CommitWithMeta> = [];
  const commitsMap: Record<string, CommitWithMeta> = {};
  let commitsToProcess: Array<CommitQueueItem> = [];

  const initialCommits = (
    await Promise.all(
      sources.flatMap(({ refs, notRefs, repoPath, isBare }) => {
        const prepareRef =
          (type: "whitelist" | "blacklist") => async (ref: string) => {
            const oid = await git
              .resolveRef({
                [isBare ? "gitdir" : "dir"]: repoPath,
                ref,
                depth: 3,
              })
              // resolveRef throws when ref doesn't exist.
              // A newly initialized repo doesn't have anything under refs/heads/
              .catch((e) => null);
            if (oid === null) {
              return null;
            }
            const commit = await git.readCommit({
              [isBare ? "gitdir" : "dir"]: repoPath,
              oid,
            });
            return { repoPath, isBare, commit, refs: new Set([ref]), type };
          };
        return refs
          .map(prepareRef("whitelist"))
          .concat(notRefs?.map(prepareRef("blacklist")) ?? []);
      })
    )
  ).filter((i) => i !== null);

  sort(
    ({ commit: c1 }, { commit: c2 }) => commitDateComparator(c1, c2),
    initialCommits
  ).forEach(({ commit, refs, repoPath, isBare, type }) =>
    queueCommit(type, { repoPath, isBare }, commit, -1, refs)
  );

  const repoToBlackListRefs: Record<string, string[]> = map(
    (value: CommitSource) => value.flatMap(({ notRefs }) => notRefs ?? []),
    groupBy((source) => source.repoPath, sources)
  );

  while (commitsToProcess.length > 0) {
    const {
      readCommitResult: latestCommit,
      repoPath,
      isBare,
      type,
      containingRefs,
    } = commitsToProcess.shift()!; // non-null assertion because of length>0;

    if (type === "whitelist") {
      if (
        repoToBlackListRefs[repoPath]?.some((ref) => containingRefs.has(ref))
      ) {
        continue;
      } else {
        allCommits.push({
          repoPath,
          readCommitResult: latestCommit,
          containingRefs: containingRefs,
        });
      }
    }
    const parentCommits = await Promise.all(
      latestCommit.commit.parent.map((oid) =>
        git.readCommit({
          [isBare ? "gitdir" : "dir"]: repoPath,
          oid,
        })
      )
    );
    // insert new parents in the right place so that commitsToProcess remains sorted.
    parentCommits.forEach((commit) => {
      // TODO: move the sorted insertion logic (index calculation) into queueCommit
      const index = commitsToProcess.findIndex(
        ({ readCommitResult: aCommit }) =>
          commitDateComparator(aCommit, commit) > 0
      );
      queueCommit(type, { repoPath, isBare }, commit, index, containingRefs);
    });
  }
  return allCommits;

  function queueCommit(
    type: "whitelist" | "blacklist",
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
      const entry: CommitQueueItem = {
        type,
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
}
