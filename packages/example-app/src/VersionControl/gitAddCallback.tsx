import { CallbackInterface } from "recoil";
import { refreshFileStatusCallback } from "./file-status.state";
import git from "isomorphic-git";
import { fs } from "../fs/fs";
import path from "path";

export const gitAddCallback =
  (callbackInterface: CallbackInterface) => async (filepath: string) => {
    const refreshFileStatus = refreshFileStatusCallback(callbackInterface);
    const dir = await git.findRoot({ fs, filepath });
    await git.add({ fs, dir, filepath: path.relative(dir, filepath) });
    await refreshFileStatus(filepath);
  };
