import { Item, PartialNode, Section } from "@react-stately/collections";
import { Item as Item2 } from "./Item";
import {
  CollectionBase,
  CollectionElement,
  ItemProps,
  SectionProps,
} from "@react-types/shared";
import React from "react";

function* patchCollectionItem<T>(nodes: Generator<PartialNode<T>>) {
  for (const partialNode of nodes)
    yield {
      ...partialNode,
      *childNodes() {
        const result2 = partialNode.childNodes?.();
        if (result2) {
          for (const partialChildNode of result2) {
            const { type, ...partialChildNodeWithoutType } = partialChildNode;
            yield partialChildNodeWithoutType;
          }
        }
      },
    };
}

const PatchedItem = Item.bind(null);

// @ts-expect-error: getCollectionNode is not public
PatchedItem.getCollectionNode = function getCollectionNode<T>(
  props: ItemProps<T>,
  context: any
): Generator<PartialNode<T>> {
  // @ts-expect-error getCollectionNode is not public API
  return patchCollectionItem(Item.getCollectionNode(props, context));
};

const PatchedSection = Section.bind(null);

// @ts-expect-error: getCollectionNode is not public
PatchedSection.getCollectionNode = function getCollectionNode<T>(
  props: SectionProps<T>,
  context: any
): Generator<PartialNode<T>> {
  // @ts-expect-error getCollectionNode is not public API
  return patchCollectionItem(Section.getCollectionNode(props, context));
};
function convertCollectionElement<T>(
  result: CollectionElement<T> | React.ReactNode
): CollectionElement<T> {
  if (
    React.isValidElement(result) &&
    (result.type === Item || result.type === Item2)
  ) {
    return React.createElement(
      PatchedItem,
      {
        key: result.key != null ? result.key : undefined,
        ...(result.props as ItemProps<T>),
      },
      convertChildren(result.props.children)
    ) as CollectionElement<T>;
  }
  if (React.isValidElement(result) && result.type === Section) {
    return React.createElement(
      PatchedSection,
      {
        key: result.key != null ? result.key : undefined,
        ...(result.props as SectionProps<T>),
      } as any,
      convertChildren((result.props as any).children)
    ) as CollectionElement<T>;
  }
  return result as CollectionElement<T>;
}

function convertChildren<T>(children: React.ReactNode): React.ReactNode {
  return Array.isArray(children)
    ? // NOTE: We intentionally avoid using React.Children.map as it messes with keys.
      children.map(convertChildren)
    : convertCollectionElement(children);
}

/**
 * CollectionBuilder expects child type to be the same as parent type, which is weird in the first place:
 * https://github.com/adobe/react-spectrum/blob/cae83ff95f2f709b761c70d47ace96d6346ed873/packages/%40react-stately/collections/src/CollectionBuilder.ts#L148
 * On the other hand, the default Item components sets the `type` to item, for all child PartialNode objects:
 * https://github.com/adobe/react-spectrum/blob/c49d9819adc2cb63377f39557352440c72072caf/packages/%40react-stately/collections/src/Item.ts#L40-L54
 * Which is also a little unexpected, as in many nested collections, an item can have all types of children.
 * This function patches that, replacing Item elements with PatchedItem element which doesn't set type on children
 * PartialNodes.
 */
export function patchCollectionProps<T>({
  children,
  ...props
}: Partial<CollectionBase<T>>): CollectionBase<T> {
  return {
    ...props,
    children:
      typeof children === "function"
        ? (node: T) => convertChildren(children(node)) as CollectionElement<T>
        : (convertChildren(children) as CollectionElement<T>),
  };
}
