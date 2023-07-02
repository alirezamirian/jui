import { constSelector, GetRecoilValue, selector } from "recoil";
import { vcsRootsState } from "../../file-status.state";
import { ChangeGrouping } from "./ChangesView.state";
import { groupByDirectory } from "./groupByDirectory";
import {
  ChangeNode,
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
        return repos.map((repository): RepositoryNode => {
          return repositoryNode(
            repository,
            nodes.filter((node) =>
              (node.change.after?.path || node.change.before?.path)?.startsWith(
                repository.dir
              )
            )
          );
        });
      },
  }),
};

export const directoryGrouping: ChangeGrouping<DirectoryNode, "directory"> = {
  id: "directory",
  title: "Directory",
  isAvailable: constSelector(true),
  groupFn: groupByDirectory,
};

export const groupings = [repositoryGrouping, directoryGrouping];
