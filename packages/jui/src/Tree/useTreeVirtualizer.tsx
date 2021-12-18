import { TreeState } from "@intellij-platform/core/Tree/__tmp__useTreeState";
import React, { HTMLAttributes, useMemo } from "react";
import { LayoutNode, ListLayout } from "@react-stately/layout";
import { Node } from "@react-types/shared";
import { VirtualizerProps } from "@react-aria/virtualizer";
import { LayoutInfo, Rect } from "@react-stately/virtualizer";

class FlattenedTreeLayout<T> extends ListLayout<T> {
  buildChild(node: Node<T>, x: number, y: number): LayoutNode {
    const layoutNode = super.buildChild(node, x, y);
    if (
      node.parentKey &&
      this.collection.getItem(node.parentKey)?.type === "item"
    ) {
      layoutNode.layoutInfo.parentKey = null;
    }
    return layoutNode;
  }

  getVisibleLayoutInfos(rect: Rect): LayoutInfo[] {
    return super
      .getVisibleLayoutInfos(rect)
      .filter((layoutInfo) => this.collection.getItem(layoutInfo.key) != null);
  }
}

export const useTreeVirtualizer = <T extends object>({
  state,
}: {
  state: TreeState<T>;
}): {
  virtualizerProps: Omit<
    VirtualizerProps<any, unknown>,
    "children" | keyof HTMLAttributes<HTMLElement>
  >;
} => {
  const layout = useMemo(
    () =>
      new FlattenedTreeLayout({
        /**
         * there is currently no documentation available for these fields, but setting `rowHeight` enforces it, which
         * wouldn't be good for custom tree UI with a different row height.
         * wrong estimatedRowHeight seems to only affect small scrollbar position inaccuracy, which is a minor issue
         * and not even noticeable in most cases. Also, it seems it slightly improves the performance if it exactly
         * matches the real row height. But not even sure.
         */
        estimatedRowHeight: 20,
      }),
    []
  );
  layout.collection = state.collection;
  layout.disabledKeys = state.disabledKeys;

  return {
    virtualizerProps: {
      focusedKey: state.selectionManager.focusedKey,
      collection: state.collection,
      layout,
      sizeToFit: "height",
      scrollDirection: "vertical",
    },
  };
};
