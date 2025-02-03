import { atom } from "jotai";
import { selectedCommitsAtom } from "../CommitsView/CommitsTable.state";
import { createCommitsChangesTreeState } from "./createCommitsChangesTreeState";

export const gitLogCommitsChangesTreeState = createCommitsChangesTreeState(
  atom((get) =>
    get(selectedCommitsAtom).then((selectedCommits) =>
      selectedCommits.map(({ readCommitResult: { oid }, repoPath }) => {
        return {
          oid: oid,
          repoPath: repoPath,
        };
      })
    )
  )
);
