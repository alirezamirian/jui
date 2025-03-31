import { Selection } from "@react-types/shared";
import { TreeRefValue } from "@intellij-platform/core";
import React, { Key, RefObject } from "react";
import { atom, Getter, Setter } from "jotai";
import { atomWithDefault, useAtomCallback } from "jotai/utils";
import { currentProjectAtom, Project } from "../Project/project.state";
import { dirContentAtom, FsItem } from "../fs/fs.state";
import { filterPath } from "../Project/project-utils";
import { getParentPaths } from "../file-utils";
import { vcsRootsAtom } from "../VersionControl/file-status.state";

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

export const foldersOnTopState = atom(true);

export const expandedKeysAtom = atomWithDefault(
  (get) =>
    new Set<Key>(
      get(vcsRootsAtom)
        .flatMap(({ dir }) => getParentPaths(dir).concat(dir))
        .concat(get(currentProjectAtom).path)
    )
);

export const selectionAtom = atom<Selection>(new Set<Key>([]));

export const selectedNodesAtom = atom(
  async (get): Promise<ReadonlyArray<ProjectTreeNode>> => {
    const selection = get(selectionAtom);
    const nodesByKey = (await get(currentProjectTreeAtom)).byKey;
    const selectedKeys = selection === "all" ? nodesByKey.keys() : selection;
    return [...selectedKeys]
      .map((key) => nodesByKey.get(`${key}`))
      .filter((i) => i != null);
  }
);

export const projectViewTreeRefAtom = atom<RefObject<TreeRefValue>>(
  React.createRef<TreeRefValue>()
);

export const currentProjectTreeAtom = atom((get) => {
  const project = get(currentProjectAtom);
  return createProjectTree(project, get);
});

type FilesTreeSort = "name"; // more to be added

// TODO: add more sort options and add "Tree Appearance" option in Project tool window settings menu.
export const projectTreeSortAtom = atom<FilesTreeSort>("name");

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
  get: Getter
): Promise<{ root: ProjectTreeRoot; byKey: Map<string, ProjectTreeNode> }> {
  const rootItems = await get(dirContentAtom(project.path));
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
              ((await get(dirContentAtom(item.path))) ?? ([] as FsItem[])).map(
                mapItem(dirNode)
              )
            )
          ).filter((i) => i != null);
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
  ).filter((i) => i != null);
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
 * atom callback for expanding to a certain path in project view.
 */
export const expandToPathCallback = (
  get: Getter,
  set: Setter,
  path: string
) => {
  const expandedKeys = get(expandedKeysAtom);
  const keysToExpand = [get(currentProjectAtom).path].concat(
    getParentPaths(path)
  );
  set(expandedKeysAtom, new Set([...expandedKeys, ...keysToExpand]));
};

/**
 * a function to be passed to useAtomCallback to get back a callback for selecting a file in ProjectView and focusing
 * the project view.
 */
export const selectKeyAndFocusCallback = (
  get: Getter,
  set: Setter,
  key: Key
) => {
  const treeRef = get(projectViewTreeRefAtom)?.current;
  treeRef?.replaceSelection(key);
  treeRef?.focus(key);
};

export const useSelectPathInProjectView = () => {
  const expandToOpenedFile = useAtomCallback(expandToPathCallback);
  const selectKeyAndFocus = useAtomCallback(selectKeyAndFocusCallback);
  return (path: string) => {
    // TODO: open project view tool window if needed and move the action to top level
    expandToOpenedFile(path);
    // Needed for the tree to rerender with the new nodes after expansion to be able to successfully focus
    // the (potentially new) node.
    // Setting focusedKey to some key for which there is no collection node is noop.
    // Covered by e2e tests, so removing this timeout can safely be re-checked if an upgrade of
    // react-aria dependencies changes anything.
    setTimeout(() => {
      selectKeyAndFocus(path);
    });
  };
};
