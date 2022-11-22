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
}): Record<string, ActionDefinition> {
  return {
    [CommonActionId.EXPAND_ALL]: {
      title: "Expand All",
      icon: <PlatformIcon icon="actions/expandall" />,
      actionPerformed: () => {
        treeRef.current?.expandAll();
      },
    },
    [CommonActionId.COLLAPSE_ALL]: {
      title: "Collapse All",
      icon: <PlatformIcon icon="actions/collapseall" />,
      actionPerformed: () => {
        treeRef.current?.collapseAll();
      },
    },
    [CommonActionId.EXPAND_SELECTION]: {
      title: "Expand Selection",
      actionPerformed: () => {
        treeRef.current?.expandSelection();
      },
    },
    [CommonActionId.SHRINK_SELECTION]: {
      title: "Shrink Selection",
      actionPerformed: () => {
        treeRef.current?.shrinkSelection();
      },
    },
  };
}
