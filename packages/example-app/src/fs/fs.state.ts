import { selectorFamily, useRecoilRefresher_UNSTABLE } from "recoil";
import { fs } from "./fs";

export interface FsItem {
  type: "dir" | "file";
  path: string;
  size: number;
}

/**
 * recoil atoms and selectors for keeping list and content of files in recoil state, for components that need on such
 * state.
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

export const fileContent = selectorFamily({
  key: "fileContent",
  get: (path: string) => async (): Promise<Uint8Array | string> => {
    if (!path) {
      return "";
    }
    return fs.promises.readFile(path, { encoding: "utf8" });
  },
});

export const useReloadFromDisk = (path: string) => {
  return useRecoilRefresher_UNSTABLE(dirContentState(path));
};
