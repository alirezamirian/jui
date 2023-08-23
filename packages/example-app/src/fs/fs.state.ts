import {
  atomFamily,
  CallbackInterface,
  selectorFamily,
  useRecoilRefresher_UNSTABLE,
} from "recoil";
import { fs } from "./fs";
import { Stats } from "@isomorphic-git/lightning-fs";

export interface FsItem {
  type: "dir" | "file";
  path: string;
  size: number;
}

/**
 * recoil atoms and selectors for keeping list and content of files in recoil state, for components that need on such
 * state.
 * NOTE: still not clear if we should be using atomFamily or selectorFamily for this. changing the current
 * implementation to atomFamily however is easy and side effect free.
 */
export const dirContentState = selectorFamily({
  key: "dirContents",
  get: (path: string) => async (): Promise<null | FsItem[]> => {
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
      path: stat.filePath,
      size: stat.size,
    }));
  },
});

/**
 * recoil callback to refresh the file content recoil value of a give path.
 * The callback returns `true` the file exists and content is refreshed successfully, and `false otherwise.
 * @param set
 */
export const reloadFileFromDiskCallback =
  ({ set }: CallbackInterface) =>
  async (path: string) => {
    try {
      const content = await fetchFileContent(path);
      set(fileContent(path), content);
      return true;
    } catch {
      return false;
    }
  };

const fetchFileContent = async (
  filepath: string | undefined
): Promise<string> => {
  if (!filepath) {
    return "";
  }
  // @ts-expect-error: bad typing in @isomorphic-git/lightning-fs@4.6.0. It's fixed, but not published at the time of writing this
  return fs.promises.readFile(filepath, { encoding: "utf8" });
};

/**
 * **Note**: Still not quite clear if we should use atom and [synchronize with source of truth (FS)][recoil-atom-effects],
 * or if we should use selector and refresh it when needed. We probably need a proper [VFS][vfs] implementation at
 * some point, which would be capable of tracking modifications, and setting up listeners for it, and then atoms, can
 * hold the states like directory content, with effects which uses the listener API.
 * A few things to consider in that regard:
 * - if modifications to files are not directly synchronized to fs, using isomorphic-git for updating the file status
 *   can be tricky, unless an FS implementation is provided which uses the file content that is not yet synced with
 *   the actual local FS. Maybe something like Intellij's VFS, can be implemented as a BrowserFS backend impl.
 *
 * **Note**: currently, only text file is supported, for simplicity.
 *
 * [recoil-atom-effects]: https://recoiljs.org/docs/guides/atom-effects#write-through-cache-example
 * [vfs]: https://plugins.jetbrains.com/docs/intellij/virtual-file-system.html
 **/
export const fileContent = atomFamily<string, string | undefined>({
  key: "fileContent",
  default: fetchFileContent,
  effects: (filepath) => [
    ({ onSet }) => {
      onSet((content) => {
        if (filepath) {
          // Should a sync API be used here?
          fs.promises
            .writeFile(filepath, content, "utf8")
            .catch((e: unknown) => {
              console.error("failed to sync the file back to the fs", e);
            });
        }
      });
    },
  ],
});

export const useReloadFromDisk = (path: string) => {
  return useRecoilRefresher_UNSTABLE(dirContentState(path));
};
