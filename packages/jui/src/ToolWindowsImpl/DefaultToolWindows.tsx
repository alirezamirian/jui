import React, { ForwardedRef } from "react";
import { indexBy } from "ramda";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import {
  ToolWindowRefValue,
  ToolWindows,
  ToolWindowsProps,
} from "@intellij-platform/core/ToolWindows";
import { useToolWindowsActions } from "./useToolWindowsActions";
import { DefaultToolWindowToolbarButton } from "./DefaultToolWindowToolbarButton";
import { ActionsProvider } from "@intellij-platform/core/ActionSystem";

interface DefaultToolWindow {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

/**
 * A wrapper around ToolWindows, which provides default actions. It also expects windows to have a `title` and an `icon`
 * instead of more generic `toolbarButton`. The `title` and `icon` are then used in toolbar button, and also in the
 * actions that are dynamically created for each window to toggle/focus the tool window.
 */
export const DefaultToolWindows = React.forwardRef(function DefaultToolWindows(
  {
    windows: toolWindows,
    toolWindowsState,
    showNumbers,
    ...props
  }: Omit<ToolWindowsProps, "windows"> & {
    windows: DefaultToolWindow[];
    showNumbers?: boolean;
  },
  forwardedRef: ForwardedRef<ToolWindowRefValue>
): React.ReactElement {
  const toolWindowsRef = useObjectRef(forwardedRef);
  const windowById = indexBy(({ id }) => id, toolWindows);
  const actions = useToolWindowsActions({
    toolWindowsRef,
    toolWindowsState,
    getPresentation: (id) => windowById[id],
  });
  return (
    <ActionsProvider actions={actions}>
      {({ shortcutHandlerProps }) => (
        <ToolWindows
          {...props}
          ref={toolWindowsRef}
          toolWindowsState={toolWindowsState}
          windows={toolWindows.map(({ id, icon, content, title }) => ({
            id,
            toolbarButton: (
              <DefaultToolWindowToolbarButton
                id={id}
                icon={icon}
                title={title}
                showNumber={showNumbers}
              />
            ),
            content,
          }))}
          containerProps={mergeProps(
            props.containerProps || {},
            shortcutHandlerProps
          )}
        />
      )}
    </ActionsProvider>
  );
});
