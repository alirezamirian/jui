import { atomFamily } from "jotai/utils";
import git from "isomorphic-git";
import { equals } from "ramda";
import { atomWithRefresh } from "../atom-utils/atomWithRefresh";
import { fs } from "../fs/fs";

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
