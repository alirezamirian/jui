import { equals } from "ramda";
import React, { Key, RefObject } from "react";
import { Atom, atom, Getter } from "jotai";
import { atomFamily, loadable } from "jotai/utils";
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
import { commitChangesTreeNodeRenderer } from "./commitChangesTreeNodeRenderer";
import { getCommitChanges } from "./getCommitChanges";
import { detectRenames } from "../../Changes/detectRenames";
import { readCommit } from "isomorphic-git";

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

const COMMIT_PARENT_ID = "commitParent";

type CommitIdentifier = {
  repoPath: string;
  oid: string;
};

export function createCommitsChangesTreeState(
  selectedCommitsAtom: Atom<CommitIdentifier[] | Promise<CommitIdentifier[]>>
) {
  const isGroupingActiveAtom = atomFamily((id: string) =>
    atom(id === directoryGrouping.id)
  );
  const treeRefAtom = atom<RefObject<TreeRefValue>>(
    React.createRef<TreeRefValue>()
  );
  const expandedKeysAtom = atom<Set<Key>>(new Set<Key>());
  const selectionAtom = atom<Selection>(new Set<Key>());

  const getChangedFilesAtom =
    (atomForCommitsDiff: typeof commitsDiffAtoms) => async (get: Getter) => {
      const includedCommitIds = await get(selectedCommitsAtom);
      const { oid, repoPath } = includedCommitIds[0]; // FIXME: take all commits into account
      const toRef = oid;
      const { commit } = await readCommit({ fs, dir: repoPath, oid }); // FIXME use atomFamily for commits for caching.
      const parents = commit.parent;
      if (toRef && parents) {
        const groupFn = getChangesGroupFn({
          get,
          groupings: defaultChangeGroupings,
          isActive: isGroupingActiveAtom,
        });
        const rootNodes = await Promise.all(
          parents?.map(
            async (parent) =>
              ({
                type: COMMIT_PARENT_ID,
                key: changesTreeNodeKey(COMMIT_PARENT_ID, parent),
                oid: parent,
                subject: commit.message || "",
                children: groupFn(
                  [
                    ...(await get(
                      atomForCommitsDiff({
                        toRef,
                        fromRef: parent,
                        dir: repoPath,
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
  const changedFilesWithoutRenamesAtom = atom(
    getChangedFilesAtom(commitsDiffWithoutRenamesAtoms)
  );

  /**
   * Changes corresponding to the currently selected commits.
   */
  const changedFilesAtom = atom(getChangedFilesAtom(commitsDiffAtoms));

  const loadableChangedFilesAtom = [
    changedFilesAtom,
    changedFilesWithoutRenamesAtom,
  ].map(loadable);
  const changedFilesLoadableAtom = atom((get) => {
    return get(
      loadableChangedFilesAtom.find((atom) => get(atom).state === "hasData") ??
        loadableChangedFilesAtom.slice(-1)[0]
    );
  });

  return {
    isGroupingActiveAtom,
    treeRefAtom,
    expandedKeysAtom,
    selectionAtom,
    changedFilesLoadableAtom,
  };
}
