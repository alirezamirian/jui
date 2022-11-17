import React, { ForwardedRef, useRef } from "react";
import { Node } from "@react-types/shared";
import { Virtualizer } from "@react-aria/virtualizer";
import { CollectionSpeedSearchContext } from "@intellij-platform/core/CollectionSpeedSearch";
import { SpeedSearchProps } from "@intellij-platform/core/SpeedSearch";
import { TreeRefValue } from "../useTreeRef";
import { StyledTree } from "../StyledTree";
import { SpeedSearchPopup } from "../../SpeedSearch/SpeedSearchPopup";
import { useTreeState } from "../useTreeState";
import { TreeProps } from "../Tree";
import { useTreeVirtualizer } from "../useTreeVirtualizer";
import { TreeContext } from "../TreeContext";
import { useSpeedSearchTree } from "./useSpeedSearchTree";
import { SpeedSearchTreeNode } from "./SpeedSearchTreeNode";

export type SpeedSearchTreeProps<T extends object> = TreeProps<T> &
  SpeedSearchProps;

export const SpeedSearchTree = React.forwardRef(
  <T extends object>(
    {
      fillAvailableSpace = false,
      alwaysShowAsFocused = false,
      ...props
    }: SpeedSearchTreeProps<T>,
    forwardedRef: ForwardedRef<TreeRefValue>
  ) => {
    const state = useTreeState(
      { ...props, disallowEmptySelection: !props.allowEmptySelection },
      forwardedRef
    );
    const ref = useRef<HTMLDivElement>(null);
    const {
      treeProps,
      treeContext,
      speedSearchContextValue,
      searchPopupProps,
    } = useSpeedSearchTree({ ...props, isVirtualized: true }, state, ref);

    const { virtualizerProps } = useTreeVirtualizer({ state });

    // NOTE: SpeedSearchPopup can be rendered as a portal with proper positioning (useOverlayPosition), if overflow
    // issues required it.
    return (
      <TreeContext.Provider value={treeContext}>
        <CollectionSpeedSearchContext.Provider value={speedSearchContextValue}>
          <SpeedSearchPopup {...searchPopupProps} />
          <StyledTree
            as={Virtualizer}
            ref={ref}
            fillAvailableSpace={fillAvailableSpace}
            {...virtualizerProps}
            {...treeProps}
          >
            {(type: string, item: unknown) => (
              <SpeedSearchTreeNode
                key={(item as Node<T>).key}
                item={item as Node<T>}
                alwaysShowAsFocused={alwaysShowAsFocused}
              />
            )}
          </StyledTree>
        </CollectionSpeedSearchContext.Provider>
      </TreeContext.Provider>
    );
  }
);
