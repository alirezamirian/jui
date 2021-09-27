import React, { useRef } from "react";
import { StyledList } from "../../List/StyledList";
import { replaceSelectionManager } from "../../selection/replaceSelectionManager";
import { SpeedSearchPopup } from "../../SpeedSearch/SpeedSearchPopup";
import { useTreeState } from "../__tmp__useTreeState";
import { TreeProps } from "../Tree";
import { TreeNode } from "../TreeNode";
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

  // NOTE: SpeedSearchPopup can be rendered as an portal with proper positioning (useOverlayPosition), if overflow
  // issues required it.
  return (
    <>
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
    </>
  );
}
