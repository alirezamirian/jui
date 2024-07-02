import { flatten } from "ramda";
import React from "react";
import { Popup, usePopupManager } from "@intellij-platform/core/Popup";
import { SpeedSearchMenu } from "@intellij-platform/core/Menu";
import { MENU_POSITION_TARGET_DATA_ATTRIBUTE } from "@intellij-platform/core/Menu/ContextMenuContainer";
import { useEventCallback } from "@intellij-platform/core/utils/useEventCallback";
import {
  ActionContext,
  type ActionGroupDefinition,
  isActionGroupDefinition,
  useGetActionShortcut,
} from "@intellij-platform/core/ActionSystem";

import { renderActionAsMenuItem } from "./ActionsMenu";

export const useCreateDefaultActionGroup = () => {
  const { show } = usePopupManager();
  const getActionShortcut = useGetActionShortcut();
  const openActionsInPopup = useEventCallback(
    (
      { children, title }: Pick<ActionGroupDefinition, "children" | "title">,
      context: ActionContext
    ) => {
      show(({ close }) => (
        <Popup
          // Maybe an option to conditionally use context-based positioning?
          positioning={
            context.element instanceof HTMLElement
              ? {
                  targetRef: {
                    current:
                      context.element.querySelector(
                        `[${MENU_POSITION_TARGET_DATA_ATTRIBUTE}]`
                      ) ?? context.element,
                  },
                  placement: "bottom",
                }
              : undefined
          }
        >
          <Popup.Layout
            content={
              /**
               * NOTE: It would be much nicer to use {@link ActionGroupMenu} component here. But the action group is not
               * yet provided when the group definition is being created. It seems like a sign of bad design that needs
               * to get addressed.
               */
              <SpeedSearchMenu
                aria-label={title}
                items={children}
                onAction={(key) => {
                  // The need for calculating `allActions` is a consequence of the issue explained in the note above.
                  const allActions = flatten(
                    children.map((item) =>
                      isActionGroupDefinition(item) ? item.children : item
                    )
                  );
                  const action = allActions.find((action) => action.id === key);
                  if (action && !action.isDisabled) {
                    action.actionPerformed(context);
                  }
                }}
                onClose={close}
                autoFocus="first"
              >
                {(item) =>
                  renderActionAsMenuItem({
                    ...item,
                    // a consequence of the issue explained in the note above.
                    shortcut: getActionShortcut(item.id),
                  })
                }
              </SpeedSearchMenu>
            }
            header={title}
          />
        </Popup>
      ));
    }
  );

  return (
    groupDefinition: Omit<ActionGroupDefinition, "actionPerformed">
  ): ActionGroupDefinition => {
    return {
      menuPresentation: "submenu",
      ...groupDefinition,
      actionPerformed: (context) =>
        openActionsInPopup(groupDefinition, context),
    };
  };
};
