import { TreeRef } from "@intellij-platform/core/Tree";
import { Node } from "@react-types/shared";
import React, { ForwardedRef, useRef } from "react";
import { StyledList } from "../../List/StyledList";
import { replaceSelectionManager } from "../../selection/replaceSelectionManager";
import { SpeedSearchPopup } from "../../SpeedSearch/SpeedSearchPopup";
import { useTreeState } from "../__tmp__useTreeState";
import { TreeProps } from "../Tree";
import { TreeNode } from "../TreeNode";
import { TreeContext } from "../TreeContext";
import { useSpeedSearchTree } from "./useSpeedSearchTree";
import {
  SpeedSearchItemHighlightsProvider,
  CollectionSpeedSearchContext,
} from "@intellij-platform/core/CollectionSpeedSearch";

export const SpeedSearchTree = React.forwardRef(
  <T extends object>(
    { fillAvailableSpace = false, onAction, ...props }: TreeProps<T>,
    forwardedRef: ForwardedRef<TreeRef>
  ) => {
    const state = replaceSelectionManager(useTreeState(props, forwardedRef));
    const ref = useRef<HTMLDivElement>(null);

    const {
      treeProps,
      treeContext,
      speedSearchContextValue,
      searchPopupProps,
    } = useSpeedSearchTree({ ...state, onAction }, ref);

    const renderNode = (item: Node<T>) => (
      <SpeedSearchItemHighlightsProvider itemKey={item.key}>
        <TreeNode key={item.key} item={item} />
      </SpeedSearchItemHighlightsProvider>
    );
    // NOTE: SpeedSearchPopup can be rendered as a portal with proper positioning (useOverlayPosition), if overflow
    // issues required it.
    return (
      <TreeContext.Provider value={treeContext}>
        <CollectionSpeedSearchContext.Provider value={speedSearchContextValue}>
          <SpeedSearchPopup {...searchPopupProps} />
          <StyledList
            as="div"
            ref={ref}
            fillAvailableSpace={fillAvailableSpace}
            {...treeProps}
          >
            {[...state.collection.getKeys()]
              .map((key) => state.collection.getItem(key))
              .map(renderNode)}
          </StyledList>
        </CollectionSpeedSearchContext.Provider>
      </TreeContext.Provider>
    );
  }
);
