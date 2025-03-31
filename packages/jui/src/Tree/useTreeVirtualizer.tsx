import { HTMLAttributes, Key, useMemo } from "react";
import { LayoutNode } from "@react-stately/layout";
import { Node } from "@react-types/shared";
import { TreeState } from "@react-stately/tree";
import { VirtualizerProps } from "@react-aria/virtualizer";
import {
  InvalidationContext,
  LayoutInfo,
  Rect,
  Size,
} from "@react-stately/virtualizer";
import { VariableWidthListLayout } from "@intellij-platform/core/VariableWidthListLayout";

const DEFAULT_HEIGHT = 20;

class FlattenedTreeLayout<T> extends VariableWidthListLayout<T> {
  padding = 0;
  buildChild(
    node: Node<T>,
    x: number,
    y: number,
    parentKey: Key | null
  ): LayoutNode {
    const layoutNode = super.buildChild(node, x, y, parentKey);
    if (
      node.parentKey &&
      this.collection.getItem(node.parentKey)?.type === "item"
    ) {
      layoutNode.layoutInfo.parentKey = null;
    }
    return layoutNode;
  }

  doBuildCollection(y = 0): LayoutNode[] {
    /**
     * The only difference here is that in tree, we need to use getKeys() to get the keys for a flattened list of items
     * that are currently visible. With this difference only, things seem to work as expected, but sections are not
     * tested, and not even sure if they would be applicable for Tree view.
     * Diff compared to ListLayout#BuildCollection:
     * -        for (let node of collection) {
     * +        const visibleNodes = [...this.collection.getKeys()].map(key => this.collection.getItem(key).filter(i => i!=null));
     * +        for (let node of visibleNodes) {
     * This needs to be maintained with version upgrades, until TreeLayout is supported:
     * https://github.com/adobe/react-spectrum/issues/2396
     *
     * UPDATE: another minor change compared to the update made on @react-stately/layout@4.1.1:
     * collection.size is changed to visibleNodes.length
     */
    let collection = this.virtualizer!.collection;
    let skipped = 0;
    let nodes: LayoutNode[] = [];
    const visibleNodes = [...collection.getKeys()]
      .map((key) => collection.getItem(key))
      .filter((i) => i != null);
    for (let node of visibleNodes) {
      let rowHeight =
        this.rowHeight ?? this.estimatedRowHeight ?? DEFAULT_HEIGHT;

      // Skip rows before the valid rectangle unless they are already cached.
      if (
        node.type === "item" &&
        y + rowHeight < this.requestedRect.y &&
        !this.isValid(node, y)
      ) {
        y += rowHeight;
        skipped++;
        continue;
      }

      let layoutNode = this.buildChild(node, 0, y, null);
      y = layoutNode.layoutInfo.rect.maxY;
      nodes.push(layoutNode);

      if (node.type === "item" && y > this.requestedRect.maxY) {
        y += (visibleNodes.length - (nodes.length + skipped)) * rowHeight;
        break;
      }
    }
    this.contentSize = new Size(this.virtualizer!.visibleRect.width, y);
    return nodes;
  }

  protected shouldInvalidateEverything(
    invalidationContext: InvalidationContext<any>
  ): boolean {
    return (
      super.shouldInvalidateEverything(invalidationContext) ||
      // When expanded keys changes, the collection changes.
      // Without invalidating everything in this case, there can be an edge
      // case of the persisted key (focusedKey) not being rendered because of
      // bad cached layout info.
      // It's not clear if it's a bug in ListLayout or something else, but the
      // workaround here is covered in one of the e2e tests, so removing
      // it can be tried in future upgrades of react-aria deps.
      this.lastCollection !== this.collection
    );
  }

  protected isVisible(node: LayoutNode, rect: Rect): boolean {
    return super.isVisible(node, rect);
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
    VirtualizerProps<any, unknown, unknown>,
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

  const focusedKey = state.selectionManager.focusedKey;
  const persistedKeys = useMemo(
    () => new Set(focusedKey ? [focusedKey] : []),
    [focusedKey]
  );
  return {
    virtualizerProps: {
      persistedKeys,
      collection: state.collection,
      layout,
      scrollDirection: "both",
    },
  };
};
