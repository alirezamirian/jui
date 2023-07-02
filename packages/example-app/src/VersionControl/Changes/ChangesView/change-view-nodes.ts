import { VcsDirectoryMapping } from "../../file-status";
import { Change, ChangeListObj } from "../change-lists.state";
import { GroupFn } from "./ChangesView.state";

export interface ChangeBrowserNode<T extends string> {
  type: T;
  key: string;
}

export interface GroupNode<T extends string> extends ChangeBrowserNode<T> {
  children: ReadonlyArray<AnyNode>;
}

export interface ChangeNode extends ChangeBrowserNode<"change"> {
  change: Change;
}

export interface ChangeListNode extends GroupNode<"changelist"> {
  changeList: ChangeListObj;
}

export interface DirectoryNode extends GroupNode<"directory"> {
  dirPath: string;
  parentNodePath: string;
}

export interface RepositoryNode extends GroupNode<"repo"> {
  repository: VcsDirectoryMapping;
}

export type AnyGroupNode = ChangeListNode | RepositoryNode | DirectoryNode;
export type AnyNode = AnyGroupNode | ChangeNode;
const changeBrowserNodeKey = (type: string, id: string): string =>
  `${type}_${id}`;
export const getNodeKeyForChange = (change: Change) =>
  changeBrowserNodeKey("change", change.after.path);
export const changeNode = (change: Change): ChangeNode => ({
  type: "change",
  key: getNodeKeyForChange(change),
  change,
});
export const changeListNode = (
  changeList: ChangeListObj,
  groupFn: GroupFn<any> = (i) => i
): ChangeListNode => ({
  type: "changelist",
  key: changeBrowserNodeKey("changelist", changeList.id),
  changeList,
  children: groupFn(changeList.changes.map((change) => changeNode(change))),
});
export const directoryNode = (
  dirPath: string,
  parentNodePath: string,
  children: readonly AnyNode[] = []
): DirectoryNode => ({
  type: "directory",
  key: changeBrowserNodeKey("directory", dirPath),
  dirPath,
  parentNodePath,
  children,
});
export const repositoryNode = (
  repository: VcsDirectoryMapping,
  children: AnyNode[] = []
): RepositoryNode => ({
  type: "repo",
  key: changeBrowserNodeKey("repo", repository.dir),
  repository,
  children,
});
export const isGroupNode = (
  node: ChangeBrowserNode<any>
): node is GroupNode<any> => "children" in node;
export const isChangeNode = (
  node: ChangeBrowserNode<any>
): node is ChangeNode => node.type === "change";
export const isDirectoryNode = (node: AnyNode): node is DirectoryNode =>
  node.type === "directory";
export const getChildren = (node: AnyNode) =>
  isGroupNode(node) ? node.children : null;
