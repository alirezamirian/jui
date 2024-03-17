import { atom, selector } from "recoil";
import {
  changesTreeNodesState,
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
import { Change } from "../Change";

const isOpen = atom<boolean>({
  key: "rollbackView.isOpen",
  default: false,
});
const windowBounds = atom<Partial<Bounds>>({
  key: "rollbackView.windowBounds",
  default: { height: 500 },
});
const initiallyIncludedChanges = atom<ReadonlyArray<Change>>({
  key: "rollbackView.initiallySelectedChanges",
  default: [],
});
const rootNodes = selector({
  key: "rollbackView.includedRootNodes",
  get: ({ get }) => {
    const selectedChanges = get(initiallyIncludedChanges);
    const { rootNodes } = get(changesTreeNodesState);
    return rootNodes.filter(
      ({ changeList: { changes, active } }) =>
        (selectedChanges.length === 0 && active) ||
        selectedChanges.some((change) => changes.includes(change))
    );
  },
});
const initiallyExpandedKeys = selector({
  key: "rollbackView.initiallyExpandedKeys",
  get: ({ get }) => {
    const includedChanges = get(initiallyIncludedChanges);
    const nodes = get(rootNodes);
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
  },
});

export const rollbackViewState = {
  isOpen,
  windowBounds,
  initiallyExpandedKeys,
  initiallyIncludedChanges,
  rootNodes,
};
