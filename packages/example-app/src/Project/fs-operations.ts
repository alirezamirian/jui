import { Getter, Setter } from "jotai";
import {
  refreshFileStatusCallback,
  vcsFootForFileAtom,
} from "../VersionControl/file-status.state";
import { editorManagerAtom } from "../Editor/editor.state";
import { fs } from "../fs/fs";
import git from "isomorphic-git";
import path from "path";
import { dirContentAtom, fileContentAtom } from "../fs/fs.state";
import { ensureDir } from "../fs/fs-utils";

export const deleteFileCallback = async (
  get: Getter,
  set: Setter,
  filepath: string
) => {
  try {
    await fs.promises.unlink(filepath);
    const repoDir = await get(vcsFootForFileAtom(filepath));
    if (repoDir) {
      await git.remove({
        fs,
        dir: repoDir,
        filepath: path.relative(repoDir, filepath),
      });
      await refreshFileStatusCallback(get, set, filepath); // TODO(fs.watch): better done separately using fs.watch
    }
  } catch (e) {
    console.error(`error in deleting file ${filepath}`, e);
  } finally {
    const editor = get(editorManagerAtom);
    editor.closePath(filepath); // TODO(fs.watch): better done as an effect on editorState, using fs.watch. But fs.watch is not available at the moment.
    set(dirContentAtom(path.dirname(filepath))); // TODO(fs.watch): better done separately using fs.watch
    set(fileContentAtom(filepath)); // TODO(fs.watch): better done separately using fs.watch
  }
};

export const deleteFilesCallback = async (
  get: Getter,
  set: Setter,
  filePaths: string[]
) => {
  // TODO: use task API
  // An attempt to make this transactional failed, since it requires passing `set` and `reset` from transact function
  // to deleteFileCallback, and {...callbackInterface, set, reset} didn't work , since callbackInterface is a proxy object
  return Promise.all(
    filePaths.map((filePath) => deleteFileCallback(get, set, filePath))
  );
};

export const deleteDirCallback = async (
  get: Getter,
  set: Setter,
  dir: string
) => {
  // TODO: use task API
  const recursivelyDeleteDir = async (dirname: string) => {
    const pathnames = await fs.promises.readdir(dirname);
    await Promise.all(
      pathnames.map(async (pathname) => {
        const fullpath = path.resolve(dirname, pathname);
        const stat = await fs.promises.stat(fullpath);
        if (stat.isFile()) {
          // potential improvement: refreshing dir content could wait until all files are deleted.
          await deleteFileCallback(get, set, fullpath);
        } else if (stat.isDirectory()) {
          await recursivelyDeleteDir(fullpath);
        }
      })
    );
    await fs.promises.rmdir(dirname);
    set(dirContentAtom(dir));
  };
  try {
    await recursivelyDeleteDir(dir);
  } catch (e) {
    console.error(`error in deleting directory ${dir}`, e);
  } finally {
    set(dirContentAtom(path.dirname(dir))); // TODO(fs.watch): better done separately using fs.watch
  }
};

export const createFileCallback = async (
  get: Getter,
  set: Setter,
  destinationDir: string,
  filename: string
) => {
  const filePath = path.join(destinationDir, filename);
  await ensureDir(fs.promises, path.dirname(filePath));
  if (await fs.promises.exists(filePath)) {
    throw new Error(`File ${filePath} already exists`);
  }
  await fs.promises.writeFile(filePath, "", "utf-8");
  set(fileContentAtom(filePath)); // TODO(fs.watch): better done in an atom effect
  get(editorManagerAtom).openPath(filePath);
  await refreshFileStatusCallback(get, set, filePath);
  set(dirContentAtom(destinationDir));
};

export const createDirectoryCallback = async (
  _get: Getter,
  set: Setter,
  destination: string,
  dirPath: string
) => {
  const fullpath = path.join(destination, dirPath);
  if (await fs.promises.exists(fullpath)) {
    throw new Error(`File ${fullpath} already exists`);
  }
  await ensureDir(fs.promises, fullpath);
  set(dirContentAtom(destination));
};
