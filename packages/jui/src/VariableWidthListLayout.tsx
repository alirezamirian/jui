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
    // in buildChild, if invalidateEverything is false and y is not changed, it will reuse the existing layoutInfo.
    // which can be problematic, if it was created in a time when the visible content width was different.
    // A more efficient approach (instead of rebuilding the whole collection), might be to set layout width to
    // visibleContentWidth, in getVisibleLayoutInfos, if mutation is ok.
    // UPDATE: using getFinalLayoutInfo seems to be a legitimate last minute way to mutate layout infos.
    this.invalidateEverything =
      this.contentSize?.width !== this.visibleContentWidth;
    const layoutNodes = super.buildCollection();
    this.contentSize.width = this.visibleContentWidth;
    return layoutNodes;
  }

  shouldInvalidate(newRect: Rect, oldRect: Rect): boolean {
    return (
      super.shouldInvalidate(newRect, oldRect) ||
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
    const layoutInfo = this.layoutInfos.get(key);
    if (layoutInfo && size.width > this.contentSize.width) {
      this.keyToWidth.set(key, size.width);
      return true;
    } else {
      this.keyToWidth.delete(key);
      return changed;
    }
  }

  private getVisibleContentWidth() {
    return Math.max(
      this.virtualizer.visibleRect.width,
      ...this.virtualizer.visibleViews.map((view) => {
        const layoutInfo = view.layoutInfo;
        const itemContentWidth =
          layoutInfo && this.keyToWidth.get(layoutInfo.key);
        if (
          itemContentWidth &&
          layoutInfo.rect.intersects(this.virtualizer.getVisibleRect())
        ) {
          return itemContentWidth;
        }
        return 0;
      })
    );
  }
}
