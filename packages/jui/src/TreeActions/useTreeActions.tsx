import React, { RefObject } from "react";
import {
  ActionDefinition,
  CommonActionId,
} from "@intellij-platform/core/ActionSystem";
import { PlatformIcon } from "@intellij-platform/core/Icon";
import { TreeRefValue } from "@intellij-platform/core/Tree";

/**
 * Returns action definitions object for common tree actions
 * TODO: add example in docs
 */
export function useTreeActions({
  treeRef,
}: {
  treeRef: RefObject<TreeRefValue>;
}): Array<ActionDefinition> {
  return [
    {
      id: CommonActionId.EXPAND_ALL,
      title: "Expand All",
      icon: <PlatformIcon icon="actions/expandall" />,
      actionPerformed: () => {
        treeRef.current?.expandAll();
      },
    },
    {
      id: CommonActionId.COLLAPSE_ALL,
      title: "Collapse All",
      icon: <PlatformIcon icon="actions/collapseall" />,
      actionPerformed: () => {
        treeRef.current?.collapseAll();
      },
    },
    {
      id: CommonActionId.EXPAND_SELECTION,
      title: "Expand Selection",
      actionPerformed: () => {
        treeRef.current?.expandSelection();
      },
    },
    {
      id: CommonActionId.SHRINK_SELECTION,
      title: "Shrink Selection",
      // TODO: disable if selection is only one item. Would need more data from treeRef. Maybe after treeRef is refactored
      //  to implement/extend CollectionRef
      actionPerformed: () => {
        treeRef.current?.shrinkSelection();
      },
    },
  ];
}
