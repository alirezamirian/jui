import { atomFamily } from "jotai/utils";
import git from "isomorphic-git";
import { equals } from "ramda";
import { atomWithRefresh } from "../atom-utils/atomWithRefresh";
import { fs } from "../fs/fs";

export const resolvedRefAtoms = atomFamily(
  ({ repoRoot, ref }: { repoRoot: string; ref: string }) =>
    atomWithRefresh(() => {
      return git.resolveRef({ fs, dir: repoRoot, ref, depth: 3 });
    }),
  equals
);
