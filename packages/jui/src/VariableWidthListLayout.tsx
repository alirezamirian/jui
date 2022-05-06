import { LayoutNode, ListLayout } from "@react-stately/layout";
import { Node } from "@react-types/shared";
import React from "react";
import { LayoutInfo, Size } from "@react-stately/virtualizer";

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
  buildItem(node: Node<T>, x: number, y: number): LayoutNode {
    const previousLayoutNode = this.layoutNodes.get(node.key);
    const layoutNode = super.buildItem(node, x, y);
    if (previousLayoutNode) {
      layoutNode.layoutInfo.rect.width =
        previousLayoutNode.layoutInfo.rect.width;
    }
    return layoutNode;
  }

  buildCollection(): LayoutNode[] {
    const layoutNodes = super.buildCollection();
    this.contentSize.width = Math.max(
      ...this.virtualizer.visibleViews.map(
        (view) => this.layoutInfos.get(view.layoutInfo?.key!)?.rect.width || 0
      )
    );
    return layoutNodes;
  }

  /**
   * Because we keep the content width for each item in its layoutInfo, but we need the final layout info to have the
   * same width as the list, we copy the layout and override the width. Not sure if the referential instability of the
   * layoutInfo objects for the same key can have a performance implication, but it seemed it's at least not noticeable.
   */
  getLayoutInfo(key: React.Key): LayoutInfo {
    const layoutInfo = super.getLayoutInfo(key).copy();
    layoutInfo.rect.width = this.contentSize.width;
    return layoutInfo;
  }

  updateItemSize(key: React.Key, size: Size): boolean {
    const changed = super.updateItemSize(key, size);
    let layoutInfo = this.layoutInfos.get(key);
    // If no layoutInfo, item has been deleted/removed.
    if (!layoutInfo) {
      return changed;
    }
    if (
      layoutInfo.rect.width !== size.width ||
      size.width !== this.contentSize.width
    ) {
      // Copy layout info rather than mutating so that later caches are invalidated.
      const newLayoutInfo = layoutInfo.copy();
      newLayoutInfo.rect.width = size.width;
      this.layoutInfos.set(key, newLayoutInfo);

      // Invalidate layout only for this layout node
      this.updateLayoutNode(key, layoutInfo, newLayoutInfo);

      return true;
    }
    return changed;
  }
}
