import React from "react";
import { useAction } from "@intellij-platform/core/ActionSystem/ActionsProvider";
import {
  IconButton,
  IconButtonProps,
} from "@intellij-platform/core/IconButton";
import { ActionTooltip, TooltipTrigger } from "@intellij-platform/core/Tooltip";

export const ActionButton = ({
  actionId,
  children,
  ...otherProps
}: {
  actionId: string;
  /**
   * Content to show instead of `action.icon`.
   */
  children?: React.ReactNode;
} & IconButtonProps): JSX.Element => {
  const action = useAction(actionId);
  if (!action) {
    return <></>;
  }
  const actionButton = (
    <IconButton
      isDisabled={action.isDisabled}
      {...otherProps}
      onPress={(e) => {
        action?.perform();
        otherProps.onPress?.(e);
      }}
    >
      {children || action.icon}
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
