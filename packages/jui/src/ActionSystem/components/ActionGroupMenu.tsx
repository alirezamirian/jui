import { ActionGroup } from "@intellij-platform/core/ActionSystem";
import React from "react";
import { ActionMenuProps, ActionsMenu } from "./ActionsMenu";

export type ActionGroupMenuProps = Omit<ActionMenuProps, "actions"> & {
  actionGroup: ActionGroup;
};
/**
 * Renders children of an action group as a menu.
 */
export const ActionGroupMenu = ({
  actionGroup,
  ...props
}: ActionGroupMenuProps) => {
  return (
    <ActionsMenu
      aria-label={actionGroup.title}
      actions={actionGroup.children}
      {...props}
    />
  );
};
