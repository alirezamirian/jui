import { atom, selector } from "recoil";
import { Change } from "../change-lists.state";
import {
  AnyNode,
  changesTreeNodesState,
  getNodeKeyForChange,
  isGroupNode,
} from "../ChangesView/ChangesView.state";
import { Key } from "react";
import { dfsVisit, getExpandAllKeys } from "../../../TreeUtils/tree-utils";
import { Bounds, getDefaultBounds } from "@intellij-platform/core/Overlay";

const isOpen = atom<boolean>({
  key: "rollbackView.isOpen",
  default: false,
});
const windowBounds = atom<Bounds>({
  key: "rollbackView.windowBounds",
  default: new Promise((resolve) => resolve(getDefaultBounds(500, 500))),
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
    const expandedKeys: Key[] = [];
    dfsVisit<AnyNode, boolean>(
      (node) => (node ? (isGroupNode(node) ? node.children : null) : nodes),
      (node, childValues) => {
        const isExpanded: boolean =
          childValues?.some((childValue) => childValue) ||
          includedChanges.map(getNodeKeyForChange).includes(node.key);
        if (isExpanded && isGroupNode(node)) {
          expandedKeys.push(node.key);
        }
        return isExpanded;
      }
    );
    return new Set(
      expandedKeys.length
        ? expandedKeys
        : getExpandAllKeys<AnyNode>(
            (node) =>
              node == null ? nodes : isGroupNode(node) ? node.children : null,
            (node) => node.key
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
