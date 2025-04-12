import { atomFamily } from "jotai/utils";
import git from "isomorphic-git";
import { equals } from "ramda";
import { atomWithRefresh } from "../atom-utils/atomWithRefresh";
import { fs } from "../fs/fs";
import { gitImpl } from "./gitImpl";
import { atom, Getter } from "jotai";
import {
  readCommits as _readCommits,
  CommitSource,
} from "./git-operations/readCommits";

export const resolvedRefAtoms = atomFamily(
  ({ repoRoot, ref }: { repoRoot: string; ref: string }) =>
    atomWithRefresh(() => {
      // resolveRef promise rejects when ref doesn't exist
      // A newly initialized repo doesn't have anything under refs/heads/
      return git
        .resolveRef({ fs, dir: repoRoot, ref, depth: 3 })
        .catch((e) => null);
    }),
  equals
);
export const readCommitAtoms = atomFamily(
  (params: Parameters<(typeof gitImpl)["readCommit"]>[0]) =>
    atom(() => gitImpl.readCommit(params)),
  equals
);

export const readCommits = (get: Getter, ...sources: CommitSource) =>
  _readCommits(
    {
      // Not using the atom for now to make sure up-to-date ref resolution, in case the refs are not refereshed
      // properly when they should.
      // Although using the atom would have the advantage of making the result reactive when the refs change e.g.
      // because of pull/commit
      resolveRef: gitImpl.resolveRef,
      readCommit: (params) => get(readCommitAtoms(params)),
    },
    ...sources
  );
