import {
  ToolWindowRefValue,
  ToolWindows,
  ToolWindowsProps,
} from "@intellij-platform/core";
import React, { ForwardedRef } from "react";
import { DefaultToolWindowActions } from "@intellij-platform/core/ToolWindow/impl/DefaultToolWindowActions";
import { useObjectRef } from "@react-aria/utils";

export const ToolWindowsWithActions = React.forwardRef(
  function ToolWindowsWithActions(
    props: ToolWindowsProps,
    forwardedRef: ForwardedRef<ToolWindowRefValue>
  ): React.ReactElement {
    const ref = useObjectRef(forwardedRef);
    return (
      <DefaultToolWindowActions
        toolWindowRef={ref}
        toolWindowState={props.toolWindowsState}
      >
        <ToolWindows {...props} ref={ref} />
      </DefaultToolWindowActions>
    );
  }
);
