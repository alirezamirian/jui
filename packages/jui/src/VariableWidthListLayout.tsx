import {
  LayoutNode,
  ListLayout,
  ListLayoutOptions,
} from "@react-stately/layout";
import React, { Key } from "react";
import { LayoutInfo, Rect, Size } from "@react-stately/virtualizer";
import { Node } from "@react-types/shared";

export type VariableWidthListLayoutOptions = ListLayoutOptions & {
  dividerHeight?: number;
};

/**
 * Extends `ListLayout` and allows items of the list to have width based on the content. `ListLayout` by default
 * sets width based on the virtualizer's visible rect. This means the overflow of list items will be clipped.
 * In `VariableWidthListLayout`, the width of the list depends on the content of the visible items.
 *
 * NOTE: At the time of writing this class, Virtualization in @react-aria and @react-stately don't have proper
 * documentation, and it wasn't clear if there could be better ways of letting list's width grow based on the content.
 * Also, this implementation currently lacks support for sections. `buildSection()` would most probably need to be
 * overridden like how `buildItem` is.
 */
export class VariableWidthListLayout<T> extends ListLayout<T> {
  /**
   * content width of items are stored here, if the content width is bigger than the Virtualizer's visible rect's width.
   */
  keyToWidth = new Map<Key, number>();
  private visibleContentWidth: number = 0;
  private dividerHeight: number = 2;

  constructor(options: VariableWidthListLayoutOptions) {
    super(options);
    if (options.dividerHeight != undefined) {
      this.dividerHeight = options.dividerHeight;
    }
  }

  buildItem(node: Node<T>, x: number, y: number): LayoutNode {
    const layoutNode = super.buildItem(node, x, y);
    if (this.visibleContentWidth) {
      layoutNode.layoutInfo.rect.width = this.visibleContentWidth;
    }
    return layoutNode;
  }

  buildNode(node: Node<T>, x: number, y: number): LayoutNode {
    if (node.type === "divider") {
      return this.buildDivider(node, x, y);
    }
    return super.buildNode(node, x, y);
  }

  buildDivider(node: Node<T>, x: number, y: number): LayoutNode {
    let width = this.virtualizer?.visibleRect.width ?? 0;
    let rectHeight = this.dividerHeight;

    let rect = new Rect(x, y, width - x, rectHeight);
    let layoutInfo = new LayoutInfo(node.type, node.key, rect);
    layoutInfo.estimatedSize = false;
    return {
      layoutInfo,
      validRect: layoutInfo.rect,
    };
  }

  /**
   * Allows for overriding buildCollection in a sub-class
   */
  protected doBuildCollection() {
    return super.buildCollection();
  }

  buildCollection(): LayoutNode[] {
    this.visibleContentWidth = this.getVisibleContentWidth();
    const layoutNodes = this.doBuildCollection();
    this.contentSize.width = this.visibleContentWidth;
    return layoutNodes;
  }

  shouldInvalidate(newRect: Rect, oldRect: Rect): boolean {
    return (
      super.shouldInvalidate(newRect, oldRect) ||
      this.virtualizer?.contentSize.width !== this.visibleContentWidth
    );
  }

  protected isValid(node: Node<T>, y: number): boolean | undefined {
    let cached = this.layoutNodes.get(node.key);
    return (
      super.isValid(node, y) &&
      cached?.layoutInfo.rect.width === this.visibleContentWidth
    );
  }

  updateItemSize(key: React.Key, size: Size): boolean {
    const changed = super.updateItemSize(key, size);
    const layoutInfo = this.getLayoutInfo(key);
    if (layoutInfo && size.width > this.contentSize.width) {
      this.keyToWidth.set(key, size.width);
      return true;
    } else {
      return changed;
    }
  }

  // TODO: try overriding getContentSize() and update()
  // https://reactspectrum.blob.core.windows.net/reactspectrum/baf4c2ac98c3272836fca3f49e2a8647d1ebb5ef/docs/react-aria/Virtualizer.html

  private getVisibleContentWidth() {
    return Math.max(
      this.virtualizer?.visibleRect.width ?? 0,
      ...[...(this.virtualizer?.getVisibleLayoutInfos().values() ?? [])].map(
        (layoutInfo: LayoutInfo) => {
          const itemContentWidth =
            layoutInfo && this.keyToWidth.get(layoutInfo.key);
          if (
            itemContentWidth &&
            this.virtualizer &&
            layoutInfo.rect.intersects(this.virtualizer?.visibleRect)
          ) {
            return itemContentWidth;
          }
          return 0;
        }
      )
    );
  }
}
