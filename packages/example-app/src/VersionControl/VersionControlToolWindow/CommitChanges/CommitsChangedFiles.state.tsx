import React, { Key, RefObject } from "react";
import { atom, Getter } from "jotai";
import { atomFamily } from "jotai/utils";
import { Selection } from "@react-types/shared";
import { TreeRefValue } from "@intellij-platform/core";
import { sortTreeNodesInPlace } from "@intellij-platform/core/utils/tree-utils";

import { fs } from "../../../fs/fs";
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
  commitsTableRowsAtom,
  selectedCommitsAtom,
} from "../CommitsView/CommitsTable.state";
import { commitChangesTreeNodeRenderer } from "./commitChangesTreeNodeRenderer";
import { getCommitChanges } from "./getCommitChanges";
import { detectRenames } from "../../Changes/detectRenames";
import { equals } from "ramda";

export const changesGroupingActiveAtoms = atomFamily((id: string) =>
  atom(id === directoryGrouping.id)
);

export const commitChangesTreeRefAtom = atom<RefObject<TreeRefValue>>(
  React.createRef<TreeRefValue>()
);

export const expandedKeysAtom = atom<Set<Key>>(new Set<Key>());

export const selectionAtom = atom<Selection>(new Set<Key>());

const COMMIT_PARENT_ID = "commitParent";

export type CommitChangesTreeNode =
  ExtendedChangesTreeNode<CommitParentChangeTreeNode>;
export interface CommitParentChangeTreeNode
  extends ChangesTreeGroupNode<typeof COMMIT_PARENT_ID, CommitChangesTreeNode> {
  changeList: ChangeListObj;
  oid: string;
  subject: string;
}

type CommitDiffParams = Pick<
  Parameters<typeof getCommitChanges>[0],
  "fromRef" | "toRef" | "dir"
>;
const commitsDiffWithoutRenamesAtoms = atomFamily(
  (params: CommitDiffParams) =>
    atom(() =>
      getCommitChanges({
        fs,
        ...params,
      })
    ),
  equals
);

const commitsDiffAtoms = atomFamily(
  (params: CommitDiffParams) =>
    atom(async (get) =>
      detectRenames(await get(commitsDiffWithoutRenamesAtoms(params)))
    ),
  equals
);

const getChangedFilesAtom =
  (atomForCommitsDiff: typeof commitsDiffAtoms) => async (get: Getter) => {
    const selectedCommits = await get(selectedCommitsAtom);
    const commitLogItem = selectedCommits[0]; // FIXME: take all selected commits into account
    const { byOid } = await get(commitsTableRowsAtom);
    const toRef = commitLogItem?.readCommitResult?.oid;
    const parents = commitLogItem?.readCommitResult.commit.parent;
    if (toRef && parents) {
      const groupFn = getChangesGroupFn({
        get,
        groupings: defaultChangeGroupings,
        isActive: changesGroupingActiveAtoms,
      });
      const rootNodes = await Promise.all(
        parents?.map(
          async (parent) =>
            ({
              type: COMMIT_PARENT_ID,
              key: changesTreeNodeKey(COMMIT_PARENT_ID, parent),
              oid: parent,
              subject: byOid[parent]?.readCommitResult.commit.message || "",
              children: groupFn(
                [
                  ...(await get(
                    atomForCommitsDiff({
                      toRef,
                      fromRef: parent,
                      dir: commitLogItem.repoPath,
                    })
                  )),
                ].map((node) => changeNode(node))
              ),
            } as CommitParentChangeTreeNode)
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
          (node.type === "directory" ? "a_" : "b_") +
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
  };

/**
 * Changes corresponding to the currently selected commits, before rename detection, which can be slow.
 */
export const changedFilesWithoutRenamesAtom = atom(
  getChangedFilesAtom(commitsDiffWithoutRenamesAtoms)
);

/**
 * Changes corresponding to the currently selected commits.
 */
export const changedFilesAtom = atom(getChangedFilesAtom(commitsDiffAtoms));
