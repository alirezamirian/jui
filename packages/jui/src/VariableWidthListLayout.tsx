import { LayoutNode, ListLayout } from "@react-stately/layout";
import React, { Key } from "react";
import { InvalidationContext, Rect, Size } from "@react-stately/virtualizer";
import { Node } from "@react-types/shared";

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

  buildItem(node: Node<T>, x: number, y: number): LayoutNode {
    const layoutNode = super.buildItem(node, x, y);
    if (this.visibleContentWidth) {
      layoutNode.layoutInfo.rect.width = this.visibleContentWidth;
    }
    return layoutNode;
  }

  buildCollection(): LayoutNode[] {
    this.visibleContentWidth = this.getVisibleContentWidth();
    const layoutNodes = super.buildCollection();
    this.contentSize.width = this.visibleContentWidth;
    return layoutNodes;
  }

  shouldInvalidate(newRect: Rect, oldRect: Rect): boolean {
    const shouldInvalidate = super.shouldInvalidate(newRect, oldRect);
    return (
      shouldInvalidate ||
      this.getVisibleContentWidth() !== this.visibleContentWidth
    );
  }

  // Setting lastWidth doesn't seem to be important, but we set it based on the content anyway.
  validate(invalidationContext: InvalidationContext<Node<T>, unknown>) {
    super.validate(invalidationContext);
    this.lastWidth = this.contentSize.width;
  }

  updateItemSize(key: React.Key, size: Size): boolean {
    const changed = super.updateItemSize(key, size);
    let layoutInfo = this.layoutInfos.get(key);
    if (layoutInfo && size.width > this.contentSize.width) {
      this.keyToWidth.set(key, size.width);
      const newLayoutInfo = layoutInfo.copy();
      this.layoutInfos.set(key, newLayoutInfo);
      this.updateLayoutNode(key, layoutInfo, newLayoutInfo);
      return true;
    } else {
      this.keyToWidth.delete(key);
      return changed;
    }
  }

  private getVisibleContentWidth() {
    return Math.max(
      this.virtualizer.visibleRect.width,
      ...this.virtualizer.visibleViews.map(
        (view) => this.keyToWidth.get(view.layoutInfo?.key!) || 0
      )
    );
  }
}
