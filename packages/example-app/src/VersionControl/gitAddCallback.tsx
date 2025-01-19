import git from "isomorphic-git";
import { Getter, Setter } from "jotai";
import path from "path";
import { fs } from "../fs/fs";
import { refreshFileStatusCallback } from "./file-status.state";

export const gitAddCallback = async (
  get: Getter,
  set: Setter,
  filepath: string
) => {
  const dir = await git.findRoot({ fs, filepath });
  await git.add({ fs, dir, filepath: path.relative(dir, filepath) });
  await refreshFileStatusCallback(get, set, filepath);
};
