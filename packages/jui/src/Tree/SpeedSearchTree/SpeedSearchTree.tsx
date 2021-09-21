import { TreeProps } from "@react-stately/tree";
import React, { useRef } from "react";
import { StyledList } from "../../List/StyledList";
import { TreeNode } from "../TreeNode";
import { useTreeState } from "../__tmp__useTreeState";
import { replaceSelectionManager } from "../../selection/replaceSelectionManager";
import { useSpeedSearchTree } from "./useSpeedSearchTree";
import { SpeedSearchPopup } from "../../SpeedSearch/SpeedSearchPopup";
import { CollectionSpeedSearchContainer } from "../../CollectionSpeedSearch/CollectionSpeedSearchContainer";

interface Props<T extends object> extends TreeProps<T> {
  fillAvailableSpace?: boolean;
}

export function SpeedSearchTree<T extends object>({
  fillAvailableSpace = false,
  ...props
}: Props<T>) {
  const state = replaceSelectionManager(useTreeState(props));
  const ref = useRef<HTMLDivElement>(null);

  const {
    treeProps,
    focused,
    getHighlightedItem,
    searchPopupProps,
  } = useSpeedSearchTree(state, ref);

  return (
    <CollectionSpeedSearchContainer fillAvailableSpace={fillAvailableSpace}>
      <SpeedSearchPopup {...searchPopupProps} />
      <StyledList
        as="div"
        ref={ref}
        fillAvailableSpace={fillAvailableSpace}
        {...treeProps}
      >
        {[...state.collection.getKeys()]
          .map((key) => state.collection.getItem(key))
          .map((item) => (
            <TreeNode
              key={item.key}
              item={getHighlightedItem(item)}
              state={state}
              containerFocused={focused}
            />
          ))}
      </StyledList>
    </CollectionSpeedSearchContainer>
  );
}
