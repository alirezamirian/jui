import { Selection } from "@react-types/shared";
import { TreeRef } from "@intellij-platform/core";
import { Key, RefObject } from "react";
import { atom, CallbackInterface, selector } from "recoil";
import {
  currentProjectFilesState,
  currentProjectState,
  FileTreeDirItem,
  FileTreeFileItem,
  FileTreeItem,
  GithubProject,
} from "../Project/project.state";

interface FileTreeNodeBase {
  parent: (FileTreeNodeBase & { children: FileTreeNode[] }) | null;
  path: string;
  name: string;
}

type FileTreeDirNode = FileTreeNodeBase &
  FileTreeDirItem & {
    children: FileTreeNode[];
  };
type FileTreeFileNode = FileTreeNodeBase & FileTreeFileItem;
type FileTreeNode = FileTreeFileNode | FileTreeDirNode;

interface ProjectTreeRoot extends FileTreeNodeBase {
  type: "project";
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
  default: new Set<Key>([""]), // empty string is the key for the root node
});

export const selectedKeysState = atom<Selection>({
  key: "projectView.selectedKeys",
  default: new Set<Key>([]),
});

export const projectViewTreeRefState = atom<null | RefObject<TreeRef>>({
  key: "projectView.focusHandle",
  default: null,
  dangerouslyAllowMutability: true,
});

export const currentProjectTreeState = selector({
  key: "projectTree",
  get: ({ get }) => {
    const { items } = get(currentProjectFilesState);
    const project = get(currentProjectState);
    return createTreeFromNodes(items, project);
  },
});

function createTreeFromNodes(items: FileTreeItem[], project: GithubProject) {
  const nodes: FileTreeNode[] = items.map((item) => {
    const name = item.path.split("/").pop() || item.path;
    return item.type === "dir"
      ? {
          ...item,
          parent: null,
          children: [],
          name,
        }
      : {
          ...item,
          parent: null,
          name: name,
        };
  });
  nodes.forEach((node) => {
    const pathParts = node.path.split("/");
    const parentPath = pathParts.slice(0, -1).join("/");
    const parent = parentPath
      ? nodes.find(
          (node): node is FileTreeDirNode =>
            node.path === parentPath && node.type === "dir"
        )
      : null;
    if (parent === undefined) {
      throw new Error(
        `Unexpected file tree. Could not find file tree item at path: "${parentPath}"`
      );
    }
    node.parent = parent;
    if (parent && !parent.children.includes(node)) {
      parent.children.push(node);
    }
  });
  const root: ProjectTreeRoot = {
    type: "project",
    path: "",
    name: project.name,
    parent: null,
    children: nodes.filter((node) => !node.parent),
  };
  root.children = root.children.map((item) => ({ ...item, parent: root }));
  return root;
}

/**
 * a function to be passed to useRecoilCallback to get back a callback for expanding to a certain path in project view.
 * @param snapshot
 * @param set
 */
export const expandToPathCallback = ({ snapshot, set }: CallbackInterface) => (
  path: string
) => {
  const expandedKeys = snapshot.getLoadable(expandedKeysState).valueOrThrow();
  const keysToExpand = [""].concat(
    path
      .split("/")
      .map((part, index, parts) => parts.slice(0, index + 1).join("/"))
  );
  set(expandedKeysState, new Set([...expandedKeys, ...keysToExpand]));
};

/**
 * a function to be passed to useRecoilCallback to get back a callback for selecting a file in project view and focusing
 * the project view.
 * // TODO: open project view tool window if needed, when tool window state is also moved to recoil instead of local
 * //  state.
 */
export const selectKeyAndFocusCallback = ({ snapshot }: CallbackInterface) => (
  key: Key
) => {
  const treeRef = snapshot.getLoadable(projectViewTreeRefState).valueOrThrow()
    ?.current;
  treeRef?.replaceSelection(key);
  treeRef?.focus(key);
};
