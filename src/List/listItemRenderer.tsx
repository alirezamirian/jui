import { Node } from "@react-types/shared";
import React from "react";
import { StyledListSectionHeader } from "./StyledListSectionHeader";
import { ListDivider } from "./ListDivider";

interface SectionNode<T> extends Node<T> {
  type: "section";
}

interface ItemNode<T> extends Node<T> {
  type: "item";
}

interface DividerNode<T> extends Node<T> {
  type: "divider";
}

const isItemNode = <T extends any>(node: Node<T>): node is ItemNode<T> =>
  node.type === "item";
const isSectionNode = <T extends any>(node: Node<T>): node is SectionNode<T> =>
  node.type === "section";
const isDividerNode = <T extends any>(node: Node<T>): node is DividerNode<T> =>
  node.type === "divider";

type listItemRendererArgs<T extends any> = {
  item: (item: ItemNode<T>) => React.ReactNode;
  sectionHeader?: (item: SectionNode<T>) => React.ReactNode;
};
export const listItemRenderer = <T extends any>({
  item: renderItem,
  sectionHeader: renderSectionHeader = (item) => (
    <StyledListSectionHeader>{item.rendered}</StyledListSectionHeader>
  ),
}: listItemRendererArgs<T>) => {
  return render;

  function render(item: Node<T>): React.ReactNode {
    if (isItemNode(item)) {
      return renderItem(item);
    }
    if (isSectionNode(item)) {
      return (
        <React.Fragment key={item.key}>
          {renderSectionHeader(item)}
          {[...(item.childNodes as ItemNode<T>[])].map(render)}
        </React.Fragment>
      );
    }
    if (isDividerNode(item)) {
      return <ListDivider key={item.key} />;
    }
    return null;
  }
};
