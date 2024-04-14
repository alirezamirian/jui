import { VcsDirectoryMapping } from "../../file-status";
import { AnyChange, Change } from "../Change";

export interface ChangesTreeNode<T extends string> {
  type: T;
  key: string;
}

export interface ChangesTreeGroupNode<
  T extends string,
  C extends ChangesTreeNode<any> = ChangesTreeNode<T>
> extends ChangesTreeNode<T> {
  children: ReadonlyArray<C>;
}

export type GroupNodes<T extends ChangesTreeNode<any>> = Extract<
  T,
  ChangesTreeGroupNode<any>
>;

export interface ChangeNode extends ChangesTreeNode<"change"> {
  change: AnyChange;
  /**
   * Whether to show the file path in front of the file name (in muted UI)
   */
  showPath?: boolean;
}

export interface DirectoryNode<
  C extends ChangesTreeNode<any> = ChangesTreeNode<any>
> extends ChangesTreeGroupNode<"directory", C> {
  dirPath: string;
  parentNodePath: string;
}

export interface RepositoryNode<
  C extends ChangesTreeNode<any> = ChangesTreeNode<any>
> extends ChangesTreeGroupNode<"repo", C> {
  repository: VcsDirectoryMapping;
}

/**
 * Extends the type of changes tree nodes with additional (group) node types.
 */
export type ExtendedChangesTreeNode<G extends ChangesTreeGroupNode<any>> =
  | ChangeNode
  | RepositoryNode<G>
  | DirectoryNode<G>
  | G;

export type DefaultChangesTreeNode = ExtendedChangesTreeNode<never>;
export const changesTreeNodeKey = (type: string, id: string): string =>
  `${type}_${id}`;

export const getNodeKeyForChange = (change: AnyChange) =>
  changesTreeNodeKey("change", Change.path(change));
export const changeNode = (change: AnyChange, showPath = true): ChangeNode => ({
  type: "change",
  key: getNodeKeyForChange(change),
  change,
  showPath,
});
export const directoryNode = <G extends ChangesTreeNode<any>>(
  dirPath: string,
  parentNodePath: string,
  children: readonly G[] = []
): DirectoryNode<G> => ({
  type: "directory",
  key: changesTreeNodeKey("directory", dirPath),
  dirPath,
  parentNodePath,
  children,
});
export const repositoryNode = <G extends ChangesTreeNode<any>>(
  repository: VcsDirectoryMapping,
  children: G[] = []
): RepositoryNode<G> => ({
  type: "repo",
  key: changesTreeNodeKey("repo", repository.dir),
  repository,
  children,
});
export const isGroupNode = <T extends ChangesTreeNode<any>>(
  node: T
): node is GroupNodes<T> => "children" in node;
export const isChangeNode = (node: ChangesTreeNode<any>): node is ChangeNode =>
  node.type === "change";
export const isDirectoryNode = <G extends ChangesTreeNode<any>>(
  node: ChangesTreeNode<any>
): node is DirectoryNode<G> => node.type === "directory";

export const getChildren = <
  T extends ChangesTreeNode<any> = DefaultChangesTreeNode
>(
  node: T
): null | GroupNodes<T>["children"] =>
  isGroupNode(node) ? node.children : null;
