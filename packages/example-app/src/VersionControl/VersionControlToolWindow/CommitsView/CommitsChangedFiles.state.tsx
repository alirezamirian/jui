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
import { sortTreeNodesInPlace } from "@intellij-platform/core/utils/tree-utils";
import { commitChangesTreeNodeRenderer } from "./commitChangesTreeNodeRenderer";
import { detectRenames } from "../../Changes/detectRenames";

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
  let items: Change[] = await git.walk({
    fs,
    dir: dir,
    trees: [git.TREE({ ref: fromRef }), git.TREE({ ref: toRef })],
    cache,
    map: async function map(
      filepath,
      [before, after]
    ): Promise<null | boolean | Change> {
      const afterOid = await after?.oid();
      const beforeOid = await before?.oid();
      const afterType = await after?.type();
      const beforeType = await before?.type();
      if (afterOid === beforeOid) {
        return null;
      }
      const afterRevision: Revision = {
        path: path.join(dir, filepath),
        isDir: afterType === "tree",
        content: async () =>
          new TextDecoder().decode(
            (await after?.content()) ?? new Uint8Array()
          ),
      };
      const beforeRevision: Revision = {
        path: path.join(dir, filepath),
        isDir: beforeType === "tree",
        content: async () =>
          new TextDecoder().decode(
            (await before?.content()) ?? new Uint8Array()
          ),
      };
      const type = afterType ?? beforeType;
      return (
        type === "blob" && {
          ...(afterOid ? { after: afterRevision } : null),
          ...(beforeOid ? { before: beforeRevision } : null),
        }
      );
    },
  });

  return await detectRenames(
    (items || []).filter((item: boolean | Change) => item)
  );
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
            (changes) =>
              ({
                type: COMMIT_PARENT_ID,
                key: changesTreeNodeKey(COMMIT_PARENT_ID, parent),
                oid: parent,
                subject: byOid[parent]?.readCommitResult.commit.message || "",
                children: groupFn([...changes].map((node) => changeNode(node))),
              } as CommitParentChangeTreeNode)
          )
        )
      );
      const { expandAllKeys, fileCountsMap, ...result } =
        changesTreeNodesResult(
          rootNodes.length === 1
            ? rootNodes[0].children
            : rootNodes.filter(({ children }) => children.length > 0)
        );

      type Writeable<T> = { -readonly [P in keyof T]: T[P] };
      sortTreeNodesInPlace(
        (node) =>
          commitChangesTreeNodeRenderer
            .getTextValue(node, { fileCountsMap })
            .toLowerCase(),
        {
          // cheating with the types by removing readonly constraints to use the inplace sort tree util.
          // it should be ok, since the ReadonlyArray is only a compile-time thing.
          roots: result.rootNodes as Writeable<typeof result.rootNodes>,
          getChildren: (node) =>
            "children" in node
              ? (node.children as Writeable<typeof node.children>)
              : null,
        }
      );

      return {
        ...result,
        fileCountsMap,
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
