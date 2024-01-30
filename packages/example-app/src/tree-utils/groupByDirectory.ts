import { uniq } from "ramda";
import { getParentPaths } from "../file-utils";

export interface DirectoryNode {
  type: "directory";
  dirPath: string;
  parentNodePath: string;
  children: ReadonlyArray<any>;
}

type GroupByDirectorAdapter<T, D extends DirectoryNode> = {
  shouldCollapseDirectories?: boolean;
  getPath: (node: T) => string;
  createDirectoryNode?: (dirNode: DirectoryNode) => D;
};
/**
 * Exported only for tests.
 * @internal
 */
export const groupByDirectory =
  <T, D extends DirectoryNode>({
    getPath,
    createDirectoryNode = (i) => i as D,
    shouldCollapseDirectories = false,
  }: GroupByDirectorAdapter<T, D>) =>
  (nodes: ReadonlyArray<T>): readonly D[] => {
    const pathToNodeCache: Record<string, D> = {};
    const rootDirNodes = nodes.map((node) => {
      const filepath = getPath(node);
      // noinspection UnnecessaryLocalVariableJS
      const rootDirNode = getParentPaths(
        filepath.startsWith("/") ? filepath : `/${filepath}`
      ).reduce((prevNode: D | T, dirPath) => {
        if (!pathToNodeCache[dirPath]) {
          pathToNodeCache[dirPath] = createDirectoryNode({
            type: "directory",
            dirPath,
            parentNodePath: "",
            children: [],
          });
        }
        if (isDirectoryNode(prevNode)) {
          prevNode.parentNodePath = dirPath;
        }
        const dirNode = pathToNodeCache[dirPath];
        dirNode.children = dirNode.children.includes(prevNode)
          ? dirNode.children
          : [prevNode, ...dirNode.children];
        return dirNode;
      }, node) as D; // This is gonna be true if the array is non-empty, but TS can't recongnize it.
      // whether the array can be empty might be something to consider and guard against
      return rootDirNode;
    });
    const directoryNodes = uniq(rootDirNodes);
    return shouldCollapseDirectories
      ? directoryNodes.map((node) =>
          collapseDirectories(createDirectoryNode, node)
        )
      : directoryNodes;
  };

function isDirectoryNode<T, D extends DirectoryNode>(node: D | T): node is D {
  return "type" in node && node.type === "directory";
}

function collapseDirectories<T, D extends DirectoryNode>(
  createDirectorNode: Required<
    GroupByDirectorAdapter<T, any>
  >["createDirectoryNode"],
  dirNode: D
): D {
  let { children, dirPath, parentNodePath } = dirNode;
  if (dirNode.children.length === 1 && isDirectoryNode(dirNode.children[0])) {
    dirPath = dirNode.children[0].dirPath;
    children = dirNode.children[0].children.map((child: D | T) =>
      isDirectoryNode<T, D>(child)
        ? collapseDirectories<T, D>(createDirectorNode, {
            ...child,
            parentNodePath: dirPath,
          })
        : child
    );
    return collapseDirectories<T, D>(
      createDirectorNode,
      createDirectorNode({
        type: "directory",
        dirPath,
        parentNodePath,
        children,
      })
    );
  }
  return {
    ...dirNode,
    children: children.map((child) =>
      isDirectoryNode(child)
        ? collapseDirectories<T, D>(createDirectorNode, child)
        : child
    ),
  };
}
