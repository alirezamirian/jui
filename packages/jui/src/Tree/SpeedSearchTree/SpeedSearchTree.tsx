import React, { ForwardedRef } from "react";
import { Node } from "@react-types/shared";
import { Virtualizer } from "@react-aria/virtualizer";
import { CollectionSpeedSearchContext } from "@intellij-platform/core/CollectionSpeedSearch";
import {
  SpeedSearchProps,
  SpeedSearchStateProps,
} from "@intellij-platform/core/SpeedSearch";
import { StyledTree } from "../StyledTree";
import { SpeedSearchPopup } from "../../SpeedSearch/SpeedSearchPopup";
import { useTreeState } from "../useTreeState";
import { TreeProps } from "../Tree";
import { useTreeVirtualizer } from "../useTreeVirtualizer";
import { TreeContext } from "../TreeContext";
import { useSpeedSearchTree } from "./useSpeedSearchTree";
import { SpeedSearchTreeNode } from "./SpeedSearchTreeNode";
import { filterDOMProps, useObjectRef } from "@react-aria/utils";
import { useTreeRef } from "@intellij-platform/core/Tree/useTreeRef";

export type SpeedSearchTreeProps<T extends object> = TreeProps<T> &
  SpeedSearchProps &
  SpeedSearchStateProps & {
    /**
     * Whether speed search popup should not be shown. Useful when speed search state is controlled, and
     * a search input is rendered outside the tree.
     */
    hideSpeedSearchPopup?: boolean;
  };

export const SpeedSearchTree = React.forwardRef(
  <T extends object>(
    {
      fillAvailableSpace = false,
      treeRef,
      hideSpeedSearchPopup,
      style,
      className,
      ...props
    }: SpeedSearchTreeProps<T>,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) => {
    const state = useTreeState({
      ...props,
      disallowEmptySelection: !props.allowEmptySelection,
    });

    const ref = useObjectRef(forwardedRef);
    useTreeRef({ state, scrollRef: ref }, treeRef);

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
          {!hideSpeedSearchPopup && <SpeedSearchPopup {...searchPopupProps} />}
          <StyledTree
            as={Virtualizer}
            ref={ref}
            $fillAvailableSpace={fillAvailableSpace}
            {...virtualizerProps}
            {...treeProps}
            {...filterDOMProps(props, { labelable: true })}
            style={style}
            className={className}
          >
            {(type: string, item: unknown) => (
              <SpeedSearchTreeNode
                key={(item as Node<T>).key}
                item={item as Node<T>}
              />
            )}
          </StyledTree>
        </CollectionSpeedSearchContext.Provider>
      </TreeContext.Provider>
    );
  }
);
