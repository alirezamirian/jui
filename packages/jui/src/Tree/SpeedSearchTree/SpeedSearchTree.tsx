import React, { useRef } from "react";
import { StyledList } from "../../List/StyledList";
import { TreeNode } from "../TreeNode";
import { TreeProps } from "../Tree";
import { useTreeState } from "../__tmp__useTreeState";
import { replaceSelectionManager } from "../../selection/replaceSelectionManager";
import { CollectionSpeedSearchContainer } from "../../CollectionSpeedSearch/CollectionSpeedSearchContainer";
import { SpeedSearchPopup } from "../../SpeedSearch/SpeedSearchPopup";
import { useSpeedSearchTree } from "./useSpeedSearchTree";

export function SpeedSearchTree<T extends object>({
  fillAvailableSpace = false,
  onAction,
  ...props
}: TreeProps<T>) {
  const state = replaceSelectionManager(useTreeState(props));
  const ref = useRef<HTMLDivElement>(null);

  const {
    treeProps,
    focused,
    getHighlightedItem,
    searchPopupProps,
  } = useSpeedSearchTree({ ...state, onAction }, ref);

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
              onAction={onAction}
              containerFocused={focused}
            />
          ))}
      </StyledList>
    </CollectionSpeedSearchContainer>
  );
}
