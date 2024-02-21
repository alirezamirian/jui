import React, { HTMLAttributes, useMemo } from "react";
import { VirtualizerProps } from "@react-aria/virtualizer";
import { VariableWidthListLayout } from "@intellij-platform/core/VariableWidthListLayout";
import { ListState } from "@react-stately/list";
import { Node } from "@react-types/shared";
import { renderWrapper } from "./renderWrapper";
import { ListDivider } from "@intellij-platform/core/List/ListDivider";

interface ItemNode<T> extends Node<T> {
  type: "item";
}
export const useListVirtualizer = <T extends object>({
  renderItem,
  estimatedItemHeight = 20,
  state,
}: {
  renderItem: (item: ItemNode<T>) => React.ReactNode;
  estimatedItemHeight?: number;
  state: ListState<T>;
}): {
  virtualizerProps: Omit<
    VirtualizerProps<Node<T>, unknown>,
    keyof HTMLAttributes<HTMLElement>
  > & { children: (type: string, content: Node<T>) => React.ReactNode };
} => {
  const layout = useMemo(
    () =>
      new VariableWidthListLayout<T>({
        /**
         * there is currently no documentation available for these fields, but setting `rowHeight` enforces it, which
         * wouldn't be good for custom tree UI with a different row height.
         * wrong estimatedRowHeight seems to only affect small scrollbar position inaccuracy, which is a minor issue
         * and not even noticeable in most cases. Also, it seems it slightly improves the performance if it exactly
         * matches the real row height. But not even sure.
         */
        estimatedRowHeight: estimatedItemHeight,
        estimatedHeadingHeight: 20,
        dividerHeight: 2,
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
      children: (type, item) => {
        if (type === "item") {
          return renderItem(item as ItemNode<T>);
        }
        if (type === "divider") {
          return <ListDivider key={item.key} />;
        }
      },
      renderWrapper,

      scrollDirection: "both",
    },
  };
};
