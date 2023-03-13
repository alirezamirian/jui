import {
  atomFamily,
  CallbackInterface,
  selectorFamily,
  useRecoilRefresher_UNSTABLE,
} from "recoil";
import { fs } from "./fs";

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
        return fs.promises.stat(filePath).then((stat) => ({
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

export const reloadFileFromDiskCallback =
  ({ set }: CallbackInterface) =>
  async (path: string) =>
    set(fileContent(path), await fetchFileContent(path));

const fetchFileContent = async (filepath: string | undefined) => {
  if (!filepath) {
    return "";
  }
  // @ts-expect-error return type is wrong
  return fs.promises.readFile(filepath, {
    encoding: "utf8",
  }) as Promise<string>;
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
            .writeFile(
              filepath,
              // @ts-expect-error: string should also be acceptable. Seems like bad typing
              content,
              { encoding: "utf8" }
            )
            .catch((e) => {
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
