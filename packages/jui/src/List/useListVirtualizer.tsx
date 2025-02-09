import React, { HTMLAttributes, useMemo } from "react";
import { VirtualizerProps } from "@react-aria/virtualizer";
import {
  VariableWidthListLayout,
  VariableWidthListLayoutOptions,
} from "@intellij-platform/core/VariableWidthListLayout";
import { ListState } from "@react-stately/list";
import { Node } from "@react-types/shared";
import { renderWrapper } from "./renderWrapper";
import { ListDivider } from "@intellij-platform/core/List/ListDivider";
import {
  InvalidationContext,
  LayoutInfo,
  Rect,
} from "@react-stately/virtualizer";
import { LayoutNode, ListLayoutOptions } from "@react-stately/layout";

class ListWithSectionsLayout<T> extends VariableWidthListLayout<T> {
  private paddingY = 0;

  constructor(opts: VariableWidthListLayoutOptions) {
    super(opts);
  }

  update(invalidationContext: InvalidationContext<ListLayoutOptions>): void {
    super.update(invalidationContext);
  }

  protected doBuildCollection(): LayoutNode[] {
    let nodes = super.doBuildCollection();
    let y = this.contentSize.height;

    if (nodes.length === 0) {
      let rect = new Rect(
        0,
        y,
        this.virtualizer!.visibleRect.width,
        this.virtualizer!.visibleRect.height
      );
      let placeholder = new LayoutInfo("placeholder", "placeholder", rect);
      let node = {
        layoutInfo: placeholder,
        validRect: placeholder.rect,
      };
      nodes.push(node);
      this.layoutNodes.set(placeholder.key, node);
      y = placeholder.rect.maxY;
    }

    this.contentSize.height = y + this.paddingY;
    return nodes;
  }

  protected buildSection(node: Node<T>, x: number, y: number): LayoutNode {
    // Synthesize a collection node for the header.
    let headerNode = {
      type: "header",
      key: node.key + ":header",
      parentKey: node.key,
      value: null,
      level: node.level,
      index: node.index,
      hasChildNodes: false,
      childNodes: [],
      rendered: node.rendered,
      textValue: node.textValue,
    };

    // Build layout node for it and adjust y offset of section children.
    let header = this.buildSectionHeader(headerNode, x, y);
    header.node = headerNode;
    header.layoutInfo.parentKey = node.key;
    this.layoutNodes.set(headerNode.key, header);
    y += header.layoutInfo.rect.height;

    let section = super.buildSection(node, x, y);
    section.children!.unshift(header);
    return section;
  }
}

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
    VirtualizerProps<Node<T>, unknown, unknown>,
    keyof HTMLAttributes<HTMLElement>
  > & { children: (type: string, content: Node<T>) => React.ReactNode };
} => {
  const layout = useMemo(
    () =>
      new ListWithSectionsLayout<T>({
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
  const focusedKey = state.selectionManager.focusedKey;
  const persistedKeys = useMemo(
    () => new Set(focusedKey ? [focusedKey] : []),
    [focusedKey]
  );
  return {
    virtualizerProps: {
      persistedKeys,
      layout,
      collection: state.collection,
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
