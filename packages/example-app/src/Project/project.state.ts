import { indexBy, prop } from "ramda";
import { atom, selector, selectorFamily } from "recoil";
import { getContentTree, getFileContent } from "../github-api";

interface Project {
  name: string;
}

export interface GithubProject extends Project {
  type: "github";
  slug: string;
  ref: string;
}

export type AnyProject = GithubProject;

export const currentProjectState = atom<AnyProject>({
  key: "project",
  default: {
    type: "github",
    name: "React Spectrum",
    slug: "adobe/react-spectrum",
    ref: "main",
  },
});

interface FileTreeItemBase {
  path: string;
  url: string;
}

export interface FileTreeDirItem extends FileTreeItemBase {
  type: "dir";
}
export interface FileTreeFileItem extends FileTreeItemBase {
  type: "file";
  size: number;
}

export type FileTreeItem = FileTreeFileItem | FileTreeDirItem;

export const currentProjectFilesState = selector({
  key: "projectFiles",
  get: async ({
    get,
  }): Promise<{
    byPath: { [path: string]: FileTreeItem };
    items: FileTreeItem[];
  }> => {
    const project = get(currentProjectState);
    switch (project.type) {
      case "github":
        const response = await fetch(
          `https://api.github.com/repos/${project.slug}/git/trees/${project.ref}?recursive=1`
        );
        if (!response.ok) {
          throw response; // can be improved
        }
        const result = await getContentTree(project.slug);
        const typeMap = { tree: "dir", blob: "file" } as const;
        const items: FileTreeItem[] = result.tree.map(
          ({ type, ...item }) =>
            ({
              type: typeMap[type],
              ...item,
            } as FileTreeItem) // maybe there is a better way, to avoid `as FileTreeItem`
        );
        const byPath = indexBy(prop("path"), items);
        return { byPath, items };
    }
    throw new Error(
      `Unsupported project: \n${JSON.stringify(project, null, 2)}`
    );
  },
});

export const fileContent = selectorFamily({
  key: "fileContent",
  get: (path: string) => async ({ get }) => {
    if (!path) {
      return "";
    }
    const project = get(currentProjectState);
    // const file = get(currentProjectFilesState).byPath[path];
    // if (!file) {
    //   throw new Error(
    //     `file not found: ${path}. Only editing project file is supported currently.`
    //   );
    // }
    // if (file.type !== "file") {
    //   throw new Error(`"${path}" is not pointing to a file.`);
    // }
    // return new Promise<string>((resolve) =>
    //   setTimeout(() => resolve("test"), 2000)
    // );
    return getFileContent(project.slug, path, project.ref);
  },
});
