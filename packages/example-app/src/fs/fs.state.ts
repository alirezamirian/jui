import { basename } from "path";
import { Stats } from "@isomorphic-git/lightning-fs";
import { atom, Getter, Setter } from "jotai";
import { atomFamily, atomWithLazy } from "jotai/utils";
import { atomWithRefresh } from "../atom-utils/atomWithRefresh";
import { fs } from "./fs";

export interface FsItem {
  type: "dir" | "file";
  name: string;
  path: string;
  lastModification: number;
  size: number;
}

const getDirContent = async (path: string): Promise<null | FsItem[]> => {
  let fileNames: string[];
  try {
    fileNames = await fs.promises.readdir(path);
  } catch (e) {
    return null;
  }
  const stats = await Promise.all(
    fileNames.map((fileName) => {
      const filePath = `${path}/${fileName}`;
      return fs.promises.stat(filePath).then((stat: Stats) => ({
        ...stat,
        type: stat.isDirectory() ? ("dir" as const) : ("file" as const),
        filePath,
      }));
    })
  );
  return stats.map((stat) => ({
    type: stat.type,
    name: basename(stat.filePath),
    path: stat.filePath,
    lastModification: stat.mtimeMs,
    size: stat.size,
  }));
};

/**
 * List files and directories in a given directory.
 */
export const dirContentAtom = atomFamily((path: string) => {
  const atom = atomWithRefresh(() => {
    return getDirContent(path);
  });
  atom.debugLabel = `DirContent(${path})`;
  return atom;
});

/**
 * atom callback to refresh the file content atom value of a give path.
 * The callback returns `true` the file exists, and content is refreshed successfully, and `false otherwise.
 * @deprecated use set(fileContent(path)) directly
 */
export const reloadFileFromDiskCallback =
  (_get: Getter, set: Setter) => async (path: string) => {
    await set(fileContentAtom(path));
  };

/**
 * **Note**: currently, only text files are supported, for simplicity.
 **/
export const fileContentAtom = atomFamily((filepath: string | null) => {
  const readFile = async (): Promise<string | null> => {
    if (!filepath) {
      return "";
    }
    const exists = await fs.promises.exists(filepath);
    if (!exists) {
      return null;
    }
    // @ts-expect-error: bad typing in @isomorphic-git/lightning-fs@4.6.0. It's fixed, but not published at the time of writing this
    return fs.promises.readFile(filepath, { encoding: "utf8" });
  };
  const fileContentAtom = atomWithLazy(readFile);
  return atom(
    async (get): Promise<string | null> => get(fileContentAtom),
    async (_get, set, ...args: [string | undefined | null] | []) => {
      const content = args[0] ?? "";
      if (args.length === 0) {
        // refresh
        return set(fileContentAtom, readFile());
      }
      set(fileContentAtom, Promise.resolve(content));
      // TODO: check if the file content was changed externally,
      //  keep track of it in a state
      //  (so a dialog can be shown to confirm actions such as "Overwrite" or "Reload from disk"
      //  and add an `overwrite` argument here to be used when overwrite is used.
      if (filepath) {
        // this could also be an effect on fileContentAtom, avoiding this write function (and the wrapper atom),
        // but:
        // A: something similar to Recoil's onSet() didn't seem straightforward with jotai-effect
        // B: we want to support refreshing when content is not passed (similar to how atomWithRefresh works)
        await fs.promises
          .writeFile(filepath, content ?? "", "utf8")
          .catch((e: unknown) => {
            // TODO: what to do if writing file fails? undo setting atom content?
            console.error("failed to sync the file back to the fs", e);
          });
      }
    }
  );
});
