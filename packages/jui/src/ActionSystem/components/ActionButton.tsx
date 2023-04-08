import React from "react";
import { useAction } from "@intellij-platform/core/ActionSystem";
import { ActionButton as ActionButtonUI } from "@intellij-platform/core/ActionButton";
import { ActionTooltip, TooltipTrigger } from "@intellij-platform/core/Tooltip";

export const ActionButton = ({
  actionId,
  children,
}: {
  actionId: string;
  /**
   * Content to show if `action.icon` is not set.
   */
  children?: React.ReactNode;
}): JSX.Element => {
  const action = useAction(actionId);
  if (!action) {
    return <></>;
  }
  const actionButton = (
    <ActionButtonUI
      onPress={() => action?.perform()}
      isDisabled={action.isDisabled}
    >
      {action.icon || children}
    </ActionButtonUI>
  );
  if (action.title) {
    return (
      <TooltipTrigger
        tooltip={
          <ActionTooltip actionName={action.title} shortcut={action.shortcut} />
        }
      >
        {actionButton}
      </TooltipTrigger>
    );
  }
  return actionButton;
};
