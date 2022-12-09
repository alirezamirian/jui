import { Selection } from "@react-types/shared";
import { TreeRefValue } from "@intellij-platform/core";
import React, { Key, RefObject } from "react";
import { atom, CallbackInterface, GetRecoilValue, selector } from "recoil";
import { currentProjectState, Project } from "../Project/project.state";
import { dirContentState, FsItem } from "../fs/fs.state";
import { filterPath } from "../Project/project-utils";
import { getParentPaths } from "../file-utils";
import * as path from "path";

interface FileTreeNodeBase {
  parent: (FileTreeNodeBase & { children: FsItem[] }) | null;
  name: string;
}

export type FileTreeDirNode = FileTreeNodeBase &
  FsItem & {
    children: FileTreeNode[];
  };
export type FileTreeFileNode = FileTreeNodeBase & FsItem;
export type FileTreeNode = FileTreeFileNode | FileTreeDirNode;

interface ProjectTreeRoot extends FileTreeNodeBase {
  type: "project";
  path: string;
  children: FileTreeNode[];
}

export type ProjectTreeNode =
  | ProjectTreeRoot
  | ProjectTreeRoot["children"][number]; // type def can be improved

export const foldersOnTopState = atom({
  key: "projectView.foldersOnTop",
  default: true,
});

export const expandedKeysState = atom({
  key: "projectView.expandedKeys",
  default: selector({
    key: "projectView.expandedKeys/default",
    get: ({ get }) => new Set<Key>([get(currentProjectState).path]),
  }),
});

export const selectedKeysState = atom<Selection>({
  key: "projectView.selectedKeys",
  default: new Set<Key>([]),
});

export const projectViewTreeRefState = atom<RefObject<TreeRefValue>>({
  key: "projectView.focusHandle",
  default: React.createRef(),
  dangerouslyAllowMutability: true,
});

export const currentProjectTreeState = selector({
  key: "projectTree",
  get: ({ get }) => {
    const project = get(currentProjectState);
    return createProjectTree(project, get);
  },
});

// NOTE: this function could be sync, and those `await`s before `get` are unnecessary. They are there simply because
// I didn't realize `get` returns the value, not Promise. But interestingly, when this function is made sync,
// performance drastically drops for some reason. That needs to be investigated.
async function createProjectTree(
  project: Project,
  get: GetRecoilValue
): Promise<ProjectTreeRoot> {
  const rootItems = await get(dirContentState(project.path));
  const mapItem =
    (parent: FileTreeDirNode | null) =>
    async (item: FsItem): Promise<FileTreeNode> => {
      const name = path.basename(item.path);
      const node = {
        ...item,
        name,
        parent,
      };
      const dirNode: FileTreeDirNode = { ...node, children: [] };
      if (item.type === "dir") {
        dirNode.children = await Promise.all(
          ((await get(dirContentState(item.path))) ?? ([] as FsItem[])).map(
            mapItem(dirNode)
          )
        );
      }
      return item.type === "dir" ? dirNode : node;
    };

  return {
    type: "project",
    path: project.path,
    name: project.name,
    parent: null,
    children: await Promise.all(
      (rootItems || []).filter(filterPath).map(mapItem(null))
    ),
  };
}

/**
 * a function to be passed to useRecoilCallback to get back a callback for expanding to a certain path in project view.
 * @param snapshot
 * @param set
 */
export const expandToPathCallback =
  ({ snapshot, set }: CallbackInterface) =>
  (path: string) => {
    const expandedKeys = snapshot.getLoadable(expandedKeysState).valueOrThrow();
    const keysToExpand = [
      snapshot.getLoadable(currentProjectState).valueOrThrow().path,
    ].concat(getParentPaths(path));
    set(expandedKeysState, new Set([...expandedKeys, ...keysToExpand]));
  };

/**
 * a function to be passed to useRecoilCallback to get back a callback for selecting a file in project view and focusing
 * the project view.
 * // TODO: open project view tool window if needed, when tool window state is also moved to recoil instead of local
 * //  state.
 */
export const selectKeyAndFocusCallback =
  ({ snapshot }: CallbackInterface) =>
  (key: Key) => {
    const treeRef = snapshot
      .getLoadable(projectViewTreeRefState)
      .valueOrThrow()?.current;
    treeRef?.replaceSelection(key);
    treeRef?.focus(key);
  };
