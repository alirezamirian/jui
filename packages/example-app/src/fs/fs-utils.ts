// @ts-expect-error: https://github.com/sindresorhus/pify/issues/74
import pify from "pify";
import path from "path";
import FS from "browserfs/dist/node/core/FS";
import { PromisifiedFS } from "./browser-fs";
// @ts-expect-error caf doesn't have typing :/
import { CAF } from "caf";

type CopyFsParams = {
  source: FS;
  target: FS;
  /**
   * called when a file is being copied
   */
  onCopy?: (filepath: string) => void;
  /**
   * force copy, even if file already exists in the target fs
   * @default false
   */
  force?: boolean;

  cancelSignal: unknown;
};

export async function copyFs({
  source,
  target,
  cancelSignal,
  ...rest
}: CopyFsParams) {
  await copyFsRecursively(cancelSignal, {
    ...rest,
    source: pify(source),
    target: pify(target),
    rootDir: "/",
  });
}

const copyFsRecursively = CAF(function* (
  cancelSignal: unknown,
  params: {
    source: PromisifiedFS;
    target: PromisifiedFS;
    onCopy?: (filepath: string) => void;
    force?: boolean;
    rootDir: string;
  }
): unknown {
  const { source, target, rootDir, onCopy, force } = params;
  const items = yield source.readdir(rootDir);

  // While we could parallelize copying files of a given directory, it didn't prove to be much faster. Plus, supporting
  // cancellation via CAF seems more straightforward if we don't do that.
  for (const name of items) {
    const fullPath = path.join(rootDir, name);
    const stat = yield source.stat(fullPath);
    if (stat.isFile() || stat.isSymbolicLink()) {
      if (!force && (yield fileExists(target, fullPath))) {
        return;
      }
      onCopy?.(fullPath);
      const content = yield source.readFile(fullPath); // is it ok for symlink too?
      yield ensureDir(target, path.dirname(fullPath));
      yield target.writeFile(fullPath, content);
    } else if (stat.isDirectory()) {
      yield copyFsRecursively(cancelSignal, {
        ...params,
        rootDir: path.join(rootDir, name),
      });
    } else {
      console.warn("unsupported file system item skipped, when copying:", stat);
    }
  }
});
const fileExists = async (fs: PromisifiedFS, filepath: string) => {
  const exists = await fs.exists(filepath);

  return exists && !(await fs.stat(filepath)).isDirectory();
};

/**
 * Similar to `fs.mkdir(dirPath, {recursive: true})`. `recursive` is not supported in the
 * currently used fs implementations.
 */
export async function ensureDir(fs: PromisifiedFS, dirPath: string) {
  const stat = await fs
    .stat(dirPath)
    .catch((e) => (e.code === "ENOENT" ? false : Promise.reject(e)));
  if (stat === false) {
    // path doesn't exist
    const dirname = path.dirname(dirPath);
    if (dirname !== path.dirname(dirname)) {
      // not root path
      await ensureDir(fs, dirname);
    }
    await fs
      .mkdir(dirPath)
      // it can happen that due to async nature of this function, between calling stat and this line, the folder is already created.
      .catch((e) =>
        e.code === "EEXIST" ? Promise.resolve() : Promise.reject(e)
      );
  } else if (!stat.isDirectory()) {
    throw new Error(`path is not a directory, but already exists: ${dirPath}`);
  }
}
