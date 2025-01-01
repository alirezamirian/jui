import { atom } from "jotai";
import {
  changesTreeNodesAtom,
  ChangesViewTreeNode,
} from "../ChangesView/ChangesView.state";
import {
  getExpandAllKeys,
  getExpandedToNodesKeys,
} from "@intellij-platform/core/utils/tree-utils";
import { Bounds } from "@intellij-platform/core/Overlay";
import {
  getNodeKeyForChange,
  isGroupNode,
} from "../ChangesTree/ChangeTreeNode";
import { AnyChange } from "../Change";

const isOpenAtom = atom<boolean>(false);
const windowBoundsAtom = atom<Partial<Bounds>>({ height: 500 });
const initiallyIncludedChangesAtom = atom<ReadonlyArray<AnyChange>>([]);
const rootNodesAtom = atom((get) => {
  const selectedChanges = get(initiallyIncludedChangesAtom);
  const { rootNodes } = get(changesTreeNodesAtom);
  const includedRootNodes = rootNodes.filter(
    (node) =>
      node.type === "changelist" &&
      selectedChanges.some((change) => node.changeList.changes.includes(change))
  );
  if (includedRootNodes.length === 0) {
    return rootNodes.filter(
      (node) => node.type === "changelist" && node.changeList.active
    );
  }
  return includedRootNodes;
});

const initiallyExpandedKeysAtom = atom((get) => {
  const includedChanges = get(initiallyIncludedChangesAtom);
  const nodes = get(rootNodesAtom);
  const expandedKeys = getExpandedToNodesKeys<ChangesViewTreeNode>(
    (node) => (isGroupNode(node) ? node.children : null),
    (node) => node.key,
    nodes,
    includedChanges.map(getNodeKeyForChange)
  );
  return new Set(
    expandedKeys.length
      ? expandedKeys
      : getExpandAllKeys<ChangesViewTreeNode>(
          (node) => (isGroupNode(node) ? node.children : null),
          (node) => node.key,
          nodes
        )
  );
});

export const rollbackViewState = {
  isOpenAtom,
  windowBoundsAtom,
  initiallyExpandedKeysAtom,
  initiallyIncludedChangesAtom,
  rootNodesAtom,
};
