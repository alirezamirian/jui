import { groupBy, identity, memoizeWith, uniq } from "ramda";
import { getParentPaths } from "../../../file-utils";
import {
  AnyNode,
  ChangeNode,
  DirectoryNode,
  directoryNode,
  isDirectoryNode,
} from "./change-view-nodes";

/**
 * Exported only for tests.
 * @internal
 */
export const groupByDirectory = (
  nodes: ReadonlyArray<ChangeNode>
): DirectoryNode[] => {
  const pathToNodeCache: Record<string, DirectoryNode> = {};
  const rootDirNodes = nodes.map((node) => {
    if (node.change.after.isDir) {
      throw new Error("isDir=true is not supported for changes ATM!");
    }
    const filepath = node.change.after.path;
    // noinspection UnnecessaryLocalVariableJS
    const rootDirNode = getParentPaths(filepath).reduce(
      (prevNode: DirectoryNode | ChangeNode, dirPath) => {
        if (!pathToNodeCache[dirPath]) {
          pathToNodeCache[dirPath] = directoryNode(dirPath, "");
        }
        if (prevNode.type === "directory") {
          prevNode.parentNodePath = dirPath;
        }
        const dirNode = pathToNodeCache[dirPath];
        dirNode.children = dirNode.children.includes(prevNode)
          ? dirNode.children
          : [prevNode, ...dirNode.children];
        return dirNode;
      },
      node
    ) as DirectoryNode; // This is gonna be true if the array is non-empty, but TS can't recongnize it.
    // whether the array can be empty might be something to consider and guard against
    return rootDirNode;
  });
  const collapseDirectories = (dirNode: DirectoryNode): DirectoryNode => {
    let { children, dirPath, parentNodePath } = dirNode;
    if (dirNode.children.length === 1 && isDirectoryNode(dirNode.children[0])) {
      dirPath = dirNode.children[0].dirPath;
      children = dirNode.children[0].children.map((child) =>
        isDirectoryNode(child)
          ? collapseDirectories({
              ...child,
              parentNodePath: dirPath,
            })
          : child
      );
      return collapseDirectories(
        directoryNode(dirPath, parentNodePath, children)
      );
    }
    return {
      ...dirNode,
      children: children.map((child) =>
        isDirectoryNode(child) ? collapseDirectories(child) : child
      ),
    };
  };
  return uniq(rootDirNodes).map(collapseDirectories);
};

/**
 * Exported only for tests.
 * @internal
 */
export const groupByDirectory2 = (
  nodes: ReadonlyArray<ChangeNode>
): DirectoryNode[] => {
  const memoizedGetParentPaths = memoizeWith(identity, getParentPaths);

  const groups = groupBy((node) => {
    const parentPaths = memoizedGetParentPaths(node.change.after.path);
    return parentPaths.pop()!;
  }, nodes);
  const dirNodes = Object.entries(groups).map(([pathPrefix, changes]) =>
    directoryNode(pathPrefix, "", changes)
  );
  let unprocessedDirNodes = dirNodes;

  while (unprocessedDirNodes.length > 0) {
    const dirNode = unprocessedDirNodes[0];
    const nextGroups = groupBy((node) => {
      const pathPrefixes = Array.from(
        memoizedGetParentPaths((node as ChangeNode).change.after.path)
      ).reverse();
      const index = pathPrefixes.indexOf(dirNode.dirPath);
      return pathPrefixes[index + 1];
    }, dirNode.children);
    const nextPathPrefixes = Object.keys(nextGroups).filter(
      (pathPrefix) => pathPrefix !== "undefined"
    );
    if (nextPathPrefixes.length === 1 && !nextGroups["undefined"]) {
      Object.assign(
        dirNode,
        directoryNode(
          nextPathPrefixes[0],
          dirNode.parentNodePath,
          dirNode.children
        )
      );
    } else {
      const childDirs = nextPathPrefixes.map((pathPrefix) =>
        directoryNode(pathPrefix, dirNode.dirPath, nextGroups[pathPrefix])
      );
      // remove the current node from unprocessed nodes, and add new dir nodes
      unprocessedDirNodes = childDirs.concat(
        unprocessedDirNodes.filter((node) => node != dirNode)
      );
      const movedChildren = childDirs.flatMap((dirNode) => dirNode.children);
      dirNode.children = (childDirs as AnyNode[]).concat(
        dirNode.children.filter((child) => !movedChildren.includes(child))
      );
    }
  }

  return dirNodes;
};
