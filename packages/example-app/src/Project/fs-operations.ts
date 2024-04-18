import { CallbackInterface } from "recoil";
import {
  refreshFileStatusCallback,
  vcsRootForFile,
} from "../VersionControl/file-status.state";
import { editorManagerState } from "../Editor/editor.state";
import { fs } from "../fs/fs";
import git from "isomorphic-git";
import path from "path";
import { dirContentState, fileContentState } from "../fs/fs.state";
import { ensureDir } from "../fs/fs-utils";

export const deleteFileCallback =
  (callbackInterface: CallbackInterface) => async (filepath: string) => {
    const { refresh, reset, snapshot } = callbackInterface;
    const refreshFileStatus = refreshFileStatusCallback(callbackInterface);
    const releaseSnapshot = snapshot.retain();
    try {
      try {
        await fs.promises.unlink(filepath);
        const repoDir = await snapshot.getPromise(vcsRootForFile(filepath));
        if (repoDir) {
          await git.remove({
            fs,
            dir: repoDir,
            filepath: path.relative(repoDir, filepath),
          });
          await refreshFileStatus(filepath); // TODO(fs.watch): better done separately using fs.watch
          const editor = await snapshot.getPromise(editorManagerState);
          editor.closePath(filepath); // TODO(fs.watch): better done as an effect on editorState, using fs.watch. But fs.watch is not available at the moment.
        }
      } finally {
        refresh(dirContentState(path.dirname(filepath))); // TODO(fs.watch): better done separately using fs.watch
        reset(fileContentState(filepath)); // TODO(fs.watch): better done separately using fs.watch
      }
    } finally {
      releaseSnapshot();
    }
  };

export const deleteFilesCallback =
  (callbackInterface: CallbackInterface) => async (filePaths: string[]) => {
    // An attempt to make this transactional failed, since it requires passing `set` and `reset` from transact function
    // to deleteFileCallback, and {...callbackInterface, set, reset} didn't work , since callbackInterface is a proxy object
    const deleteFile = deleteFileCallback(callbackInterface);
    return Promise.all(filePaths.map(deleteFile));
  };

export const createFileCallback = (callbackInterface: CallbackInterface) => {
  const refreshFileStatus = refreshFileStatusCallback(callbackInterface);
  return async (filePath: string) => {
    const { snapshot, refresh, reset } = callbackInterface;
    const releaseSnapshot = snapshot.retain();
    try {
      const destinationDir = path.dirname(filePath);
      await ensureDir(fs.promises, destinationDir);
      if (await fs.promises.exists(filePath)) {
        throw new Error(`File ${filePath} already exists`);
      }
      await fs.promises.writeFile(filePath, "", "utf-8");
      reset(fileContentState(filePath)); // TODO(fs.watch): better done in an atom effect
      (await snapshot.getPromise(editorManagerState)).openPath(filePath);
      await refreshFileStatus(filePath);
      refresh(dirContentState(destinationDir));
    } finally {
      releaseSnapshot();
    }
  };
};
