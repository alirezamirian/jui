import git from "isomorphic-git";
import path from "path";
import React, { Key, RefObject } from "react";
import { atom, atomFamily, selector } from "recoil";
import { Selection } from "@react-types/shared";

import { fs } from "../../../fs/fs";
import { Change, Revision } from "../../Changes/Change";
import {
  defaultChangeGroupings,
  directoryGrouping,
  getChangesGroupFn,
} from "../../Changes/ChangesTree/changesGroupings";
import {
  changeNode,
  ChangesTreeGroupNode,
  changesTreeNodeKey,
  ExtendedChangesTreeNode,
} from "../../Changes/ChangesTree/ChangeTreeNode";
import { changesTreeNodesResult } from "../../Changes/ChangesTree/changesTreeNodesResult";
import { ChangeListObj } from "../../Changes/change-lists.state";
import {
  commitsTableRowsState,
  selectedCommitsState,
} from "./CommitsTable.state";
import { TreeRefValue } from "@intellij-platform/core";

const cache = {}; // FIXME: find a better caching strategy. Per project?
async function getCommitChanges({
  dir,
  fromRef,
  toRef,
}: {
  dir: string;
  fromRef: string;
  toRef: string;
}): Promise<Change[]> {
  const items = await git.walk({
    fs,
    dir: dir,
    trees: [git.TREE({ ref: fromRef }), git.TREE({ ref: toRef })],
    cache,
    map: async function map(
      filepath,
      [after, before]
    ): Promise<null | boolean | Change> {
      const afterOid = await after?.oid();
      const beforeOid = await before?.oid();
      const type = await after?.type();
      if (afterOid === beforeOid) {
        return null;
      }
      const revision: Revision = {
        path: path.join(dir, filepath),
        isDir: type === "tree",
      };
      return (
        type === "blob" && {
          ...(afterOid ? { after: revision } : null),
          ...(beforeOid ? { before: revision } : null),
        }
      );
    },
  });
  return await (items || []).filter((item: boolean | Change) => item);
}

export const changesGroupingActiveState = atomFamily<boolean, string>({
  key: "vcs/log/commits/changes/isGroupingActive",
  default: (id) => id === directoryGrouping.id,
});

export const commitChangesTreeRefState = atom<RefObject<TreeRefValue>>({
  key: "vcs/log/commits/changes/treeRef",
  default: React.createRef(),
  dangerouslyAllowMutability: true,
});

export const expandedKeysState = atom<Set<Key>>({
  key: "vcs/log/commits/changes/expandedKeys",
  default: new Set(),
});

export const selectionState = atom<Selection>({
  key: "vcs/log/commits/changes/selectedKeys",
  default: new Set(),
});

const COMMIT_PARENT_ID = "commitParent";

export type CommitChangesTreeNode =
  ExtendedChangesTreeNode<CommitParentChangeTreeNode>;
export interface CommitParentChangeTreeNode
  extends ChangesTreeGroupNode<typeof COMMIT_PARENT_ID, CommitChangesTreeNode> {
  changeList: ChangeListObj;
  oid: string;
  subject: string;
}

/**
 * Changes corresponding to the currently selected commits.
 * NOTE: it could be refactored into a selectorFamily, where the selected OIds are
 * passed as parameter, which would allow for caching the result, as the selector
 * would not be reevaluated when the only selection is changed, and the state
 * of the table is not changed.
 */
export const changedFilesState = selector({
  key: "vcs/log/commits/selection/changes",
  get: async ({ get }) => {
    const selectedCommits = get(selectedCommitsState);
    const commitLogItem = selectedCommits[0]; // FIXME: take all selected commits into account
    const { byOid } = get(commitsTableRowsState);
    const toRef = commitLogItem?.readCommitResult?.oid;
    if (toRef) {
      const groupFn = getChangesGroupFn({
        get,
        groupings: defaultChangeGroupings,
        isActive: changesGroupingActiveState,
      });

      const rootNodes = await Promise.all(
        commitLogItem?.readCommitResult.commit.parent.map((parent) =>
          getCommitChanges({
            fromRef: parent,
            toRef,
            dir: commitLogItem.repoPath,
          }).then(
            (nodes) =>
              ({
                type: COMMIT_PARENT_ID,
                key: changesTreeNodeKey(COMMIT_PARENT_ID, parent),
                oid: parent,
                subject: byOid[parent]?.readCommitResult.commit.message || "",
                children: groupFn(nodes.map((node) => changeNode(node))),
              } as CommitParentChangeTreeNode)
          )
        )
      );
      const { expandAllKeys, ...result } = changesTreeNodesResult(
        rootNodes.length === 1
          ? rootNodes[0].children
          : rootNodes.filter(({ children }) => children.length > 0)
      );
      return {
        ...result,
        expandAllKeys: new Set(
          [...expandAllKeys].filter(
            (key) => !`${key}`.startsWith(COMMIT_PARENT_ID)
          )
        ),
      };
    }
    return null;
  },
});
