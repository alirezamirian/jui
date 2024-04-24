import { Selection } from "@react-types/shared";
import { TreeRefValue } from "@intellij-platform/core";
import React, { Key, RefObject } from "react";
import {
  atom,
  CallbackInterface,
  GetRecoilValue,
  selector,
  useRecoilCallback,
} from "recoil";
import { currentProjectState, Project } from "../Project/project.state";
import { dirContentState, FsItem } from "../fs/fs.state";
import { filterPath } from "../Project/project-utils";
import { getParentPaths } from "../file-utils";
import { vcsRootsState } from "../VersionControl/file-status.state";
import { notNull } from "@intellij-platform/core/utils/array-utils";

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
    get: ({ get }) =>
      new Set<Key>(
        get(vcsRootsState).flatMap(({ dir }) => getParentPaths(dir).concat(dir))
      ),
  }),
});

export const selectionState = atom<Selection>({
  key: "projectView.selection",
  default: new Set<Key>([]),
});

export const selectedNodesState = selector<ReadonlyArray<ProjectTreeNode>>({
  key: "projectView.selectedKeys",
  get: ({ get }) => {
    const selection = get(selectionState);
    const nodesByKey = get(currentProjectTreeState).byKey;
    const selectedKeys = selection === "all" ? nodesByKey.keys() : selection;
    return [...selectedKeys]
      .map((key) => nodesByKey.get(`${key}`))
      .filter(notNull);
  },
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

type FilesTreeSort = "name"; // more to be added

// TODO: add more sort options and add "Tree Appearance" option in Project tool window settings menu.
export const projectTreeSortState = atom<FilesTreeSort>({
  key: "project.tree.sort",
  default: "name",
});

/**
 * NOTE: using in-place native sort for performance.
 * See more https://www.measurethat.net/Benchmarks/Show/6698/0/ramda-sort-vs-js-native-sort
 */
function sortProjectTreeNodes(items: FileTreeNode[]): void {
  // TODO: add sortBy: FileTreeSort parameter
  // TODO: add directoriesOnTop: boolean parameter
  items.sort((item1, item2) => {
    if (item1.name < item2.name) {
      return -1;
    }
    if (item1.name > item2.name) {
      return 1;
    }
    return 0;
  });
}

// NOTE: this function could be sync, and those `await`s before `get` are unnecessary. They are there simply because
// I didn't realize `get` returns the value, not Promise. But interestingly, when this function is made sync,
// performance drastically drops for some reason. That needs to be investigated.
async function createProjectTree(
  project: Project,
  get: GetRecoilValue
): Promise<{ root: ProjectTreeRoot; byKey: Map<string, ProjectTreeNode> }> {
  const rootItems = get(dirContentState(project.path));
  const byKey = new Map<string, ProjectTreeNode>();
  const mapItem =
    (parent: FileTreeDirNode | null) =>
    async (item: FsItem): Promise<FileTreeNode | null> => {
      const node = {
        ...item,
        parent,
      };
      if (item.type === "dir") {
        if (filterPath(item)) {
          const dirNode: FileTreeDirNode = { ...node, children: [] };
          dirNode.children = (
            await Promise.all(
              (get(dirContentState(item.path)) ?? ([] as FsItem[])).map(
                mapItem(dirNode)
              )
            )
          ).filter(notNull);
          sortProjectTreeNodes(dirNode.children);
          byKey.set(dirNode.path, dirNode);
          return dirNode;
        }
        return null;
      }
      byKey.set(node.path, node);
      return node;
    };

  const children = (
    await Promise.all((rootItems || []).map(mapItem(null)))
  ).filter(notNull);
  sortProjectTreeNodes(children);
  const root: ProjectTreeNode = {
    type: "project",
    path: project.path,
    name: project.name,
    parent: null,
    children,
  };
  byKey.set(root.path, root);
  return { root, byKey };
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

export const useSelectPathInProjectView = () => {
  const expandToOpenedFile = useRecoilCallback(expandToPathCallback, []);
  const selectKeyAndFocus = useRecoilCallback(selectKeyAndFocusCallback, []);
  return (path: string) => {
    expandToOpenedFile(path);
    selectKeyAndFocus(path);
  };
};
