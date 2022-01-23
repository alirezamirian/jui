import { constSelector, GetRecoilValue, selector } from "recoil";
import { vcsRootsState } from "../../file-status.state";
import { uniq } from "ramda";
import {
  AnyGroupNode,
  ChangeGrouping,
  ChangeNode,
  DirectoryNode,
  directoryNode,
  isDirectoryNode,
  RepositoryNode,
  repositoryNode,
} from "./ChangesView.state";
import { getParentPaths } from "../../../file-utils";

const repositoryGrouping: ChangeGrouping<RepositoryNode> = {
  id: "repository",
  title: "Repository",
  isAvailable: selector({
    key: "repositoryGrouping/isAvailable",
    get: ({ get }) => get(vcsRootsState).length > 0,
  }),
  groupFn: selector({
    key: "repositoryGrouping/groupFn",
    get: ({ get }: { get: GetRecoilValue }) => (
      nodes: ReadonlyArray<ChangeNode>
    ) => {
      const repos = get(vcsRootsState);
      return repos.map(
        (repository): RepositoryNode => {
          return repositoryNode(
            repository,
            nodes.filter((node) =>
              (node.change.after?.path || node.change.before?.path).startsWith(
                repository.dir
              )
            )
          );
        }
      );
    },
  }),
};

const directoryGrouping: ChangeGrouping<DirectoryNode> = {
  id: "directory",
  title: "Directory",
  isAvailable: constSelector(true),
  groupFn: (nodes: ReadonlyArray<ChangeNode>) => {
    const pathToNodeCache: Record<string, DirectoryNode> = {};
    const rootDirNodes = nodes.map((node) => {
      if (node.change.after.isDir) {
        throw new Error("isDir=true is not supported for changes ATM!");
      }
      const filepath = node.change.after.path;
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
      let { children, dirPath } = dirNode;
      if (
        dirNode.children.length === 1 &&
        isDirectoryNode(dirNode.children[0])
      ) {
        children = dirNode.children[0].children;
        dirPath = dirNode.children[0].dirPath;
      }
      return {
        ...dirNode,
        dirPath,
        children: children.map((child) =>
          isDirectoryNode(child) ? collapseDirectories(child) : child
        ),
      };
    };
    return uniq(rootDirNodes).map(collapseDirectories);
  },
};

export const groupings: ReadonlyArray<ChangeGrouping<AnyGroupNode>> = [
  repositoryGrouping,
  directoryGrouping,
];
