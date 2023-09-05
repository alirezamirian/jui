import React from "react";
import { useAction } from "@intellij-platform/core/ActionSystem";
import { IconButton } from "@intellij-platform/core/IconButton";
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
    <IconButton
      onPress={() => action?.perform()}
      isDisabled={action.isDisabled}
    >
      {action.icon || children}
    </IconButton>
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
