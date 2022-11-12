import React, { ForwardedRef } from "react";
import { indexBy } from "ramda";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import {
  ToolWindowRefValue,
  ToolWindows,
  ToolWindowsProps,
} from "@intellij-platform/core/ToolWindows";
import { ToolWindowsActionProvider } from "./ToolWindowsActionProvider";
import { DefaultToolWindowToolbarButton } from "./DefaultToolWindowToolbarButton";

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
    showNumbers,
    ...props
  }: Omit<ToolWindowsProps, "windows"> & {
    windows: DefaultToolWindow[];
    showNumbers?: boolean;
  },
  forwardedRef: ForwardedRef<ToolWindowRefValue>
): React.ReactElement {
  const ref = useObjectRef(forwardedRef);
  const windowsById = indexBy(({ id }) => id, toolWindows);
  return (
    <ToolWindowsActionProvider
      toolWindowRef={ref}
      toolWindowState={props.toolWindowsState}
      getPresentation={(id) => windowsById[id]}
    >
      {({ shortcutHandlerProps }) => (
        <ToolWindows
          {...props}
          ref={ref}
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
            shortcutHandlerProps,
            props.containerProps || {}
          )}
        />
      )}
    </ToolWindowsActionProvider>
  );
});
