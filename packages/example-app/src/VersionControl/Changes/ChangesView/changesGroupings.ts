import { GetRecoilValue, selector } from "recoil";
import { vcsRootsState } from "../../file-status.state";
import { ChangeGrouping } from "./ChangesView.state";
import { groupByDirectory } from "../../../tree-utils/groupByDirectory";
import {
  ChangeNode,
  directoryNode,
  DirectoryNode,
  RepositoryNode,
  repositoryNode,
} from "./change-view-nodes";

const repositoryGrouping: ChangeGrouping<RepositoryNode, "repository"> = {
  id: "repository",
  title: "Repository",
  isAvailable: selector({
    key: "repositoryGrouping/isAvailable",
    get: ({ get }) => get(vcsRootsState).length > 0,
  }),
  groupFn: selector({
    key: "repositoryGrouping/groupFn",
    get:
      ({ get }: { get: GetRecoilValue }) =>
      (nodes: ReadonlyArray<ChangeNode>) => {
        const repos = get(vcsRootsState);
        return repos.map(
          (repository): RepositoryNode =>
            repositoryNode(
              repository,
              nodes.filter((node) =>
                (
                  node.change.after?.path || node.change.before?.path
                )?.startsWith(repository.dir)
              )
            )
        );
      },
  }),
};

export const directoryGrouping: ChangeGrouping<DirectoryNode, "directory"> = {
  id: "directory",
  title: "Directory",
  isAvailable: true,
  groupFn: groupByDirectory<ChangeNode, DirectoryNode>({
    shouldCollapseDirectories: true,
    createDirectoryNode: ({ dirPath, parentNodePath, children }) =>
      directoryNode(dirPath, parentNodePath, children),
    getPath: (node) => {
      if (node.change.after.isDir) {
        throw new Error("isDir=true is not supported for changes ATM!");
      }
      return node.change.after.path;
    },
  }),
};

export const groupings = [repositoryGrouping, directoryGrouping];
