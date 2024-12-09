import React from "react";
import { TreeState } from "@react-stately/tree";
import { Node } from "@react-types/shared";
import { ListDivider } from "@intellij-platform/core/List/ListDivider"; // private import

import { MenuItem } from "./MenuItem";
import { MenuSection } from "./MenuSection";

export function renderMenuNodes<T>(
  state: TreeState<T>,
  nodes: Node<T>[],
  filter: (node: Node<T>) => boolean = () => true
) {
  return nodes.filter(filter).map((node) => {
    switch (node.type) {
      case "item":
        return <MenuItem key={node.key} item={node} state={state} />;
      case "section":
        return (
          <>
            {node.props.hasDivider && (
              <ListDivider key={node.key + "-divider1"} />
            )}
            <MenuSection
              key={node.key}
              item={node}
              state={state}
              filter={filter}
            />
            {node.props.hasDivider && (
              <ListDivider key={node.key + "-divider2"} />
            )}
          </>
        );
      case "divider":
        return <ListDivider key={node.key} />;
    }
  });
}
