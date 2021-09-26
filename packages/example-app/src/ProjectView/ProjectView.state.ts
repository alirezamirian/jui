import { Selection } from "@react-types/shared";
import { atom, selector } from "recoil";
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
  default: new Set([""]), // empty string is the key for the root node
});

export const selectedKeysState = atom<Selection>({
  key: "projectView.selectedKeys",
  default: new Set([]),
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
    children: nodes
      .filter((node) => !node.parent)
      .map((item) => ({ ...item, parent: root })),
  };
  return root;
}
