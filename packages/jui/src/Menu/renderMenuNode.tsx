import React from "react";
import { TreeState } from "@react-stately/tree";
import { Node } from "@react-types/shared";
import { MenuItem } from "./MenuItem";
import { MenuSection } from "./MenuSection";
import { ListDivider } from "@intellij-platform/core/List/ListDivider";

export function renderMenuNode<T>(state: TreeState<T>, node: Node<T>) {
  switch (node.type) {
    case "item":
      return <MenuItem key={node.key} item={node} state={state} />;
    case "section":
      return <MenuSection key={node.key} item={node} state={state} />;
    case "divider":
      return <ListDivider key={node.key} />;
  }
}
