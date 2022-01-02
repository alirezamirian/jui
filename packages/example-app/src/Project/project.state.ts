import { atom, selector, selectorFamily } from "recoil";
import { dirContentState, FsItem } from "../fs/fs.state";
import { filterPath } from "./project-utils";

export interface Project {
  name: string;
  path: string;
}

/**
 * temporary hard coded sample repo, until clone UI is implemented.
 */
export const sampleRepo = {
  path: "/workspace/jui",
  url: "https://github.com/alirezamirian/jui.git",
};

export const currentProjectState = atom<Project>({
  key: "project",
  default: {
    name: "JUI",
    path: sampleRepo.path,
  },
});

export const projectFilePath = selectorFamily({
  key: "projectFilePath",
  get: (projectRelativePath: string) => ({ get }) =>
    `${get(currentProjectState).path}/${projectRelativePath}`,
});

export const currentProjectFilesState = selector({
  key: "projectFiles",
  get: async ({ get }): Promise<FsItem[]> => {
    const project = get(currentProjectState);
    const items = get(dirContentState(project.path));
    const files: FsItem[] = [];
    const addItem = (item: FsItem) => {
      if (item.type === "dir" && filterPath(item)) {
        const childItems = get(dirContentState(item.path));
        if (childItems) {
          childItems.map(addItem);
        }
      } else {
        files.push(item);
      }
    };
    (items || []).forEach((item) => addItem(item));
    return files;
  },
});
