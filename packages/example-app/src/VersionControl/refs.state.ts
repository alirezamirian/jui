import { selectorFamily } from "recoil";
import git from "isomorphic-git";
import { fs } from "../fs/fs";

export const resolvedRefState = selectorFamily<
  string,
  { repoRoot: string; ref: string }
>({
  key: "vcs/resolved-branche-ref",
  get:
    ({ repoRoot, ref }: { repoRoot: string; ref: string }) =>
    () => {
      return git.resolveRef({ fs, dir: repoRoot, ref });
    },
});
