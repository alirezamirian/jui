import React, { HTMLAttributes, useMemo } from "react";
import { LayoutNode } from "@react-stately/layout";
import { Node } from "@react-types/shared";
import { TreeState } from "@react-stately/tree";
import { VirtualizerProps } from "@react-aria/virtualizer";
import { LayoutInfo, Rect } from "@react-stately/virtualizer";
import { VariableWidthListLayout } from "@intellij-platform/core/VariableWidthListLayout";

class FlattenedTreeLayout<T> extends VariableWidthListLayout<T> {
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
      // Not clear how this sizeToFit is supposed to work, due to lack of documentation, but don't be tempted to
      // think it solves the problem VariableWidthListLayout is trying to solve, because it doesn't :D
      // Also, note that setting this to "width" prevents re-layout when container width is increased, which
      // causes issues.
      sizeToFit: "height",
      scrollToItem: (key) => {
        return layout.virtualizer.scrollToItem(key, {
          shouldScrollX: false,
          duration: 0,
        });
      },
      scrollDirection: "both",
    },
  };
};
