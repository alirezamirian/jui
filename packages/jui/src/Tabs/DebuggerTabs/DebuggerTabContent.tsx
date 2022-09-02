import { TabCloseButton } from "@intellij-platform/core/Tabs/TabCloseButton";
import { TabContentLayout } from "@intellij-platform/core/Tabs/TabContentLayout";
import React from "react";

export const DebuggerTabContent = ({
  icon,
  title,
  closeButton,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  /**
   * Close button for the tab. Use {@link TabCloseButton} to render the close button
   * for the tab.
   *
   * @example
   * ```tsx
   * <DebuggerTabContent
   *   closeButton={
   *     <TooltipTrigger
   *       tooltip={<ActionTooltip actionName="Close Tab" shortcut="^⇧F4" />}
   *     >
   *       <TabCloseButton onPress={}></TabCloseButton>
   *     </TooltipTrigger>
   *   }
   * />
   * ```
   */
  closeButton?: React.ReactElement;
}) => {
  return (
    <TabContentLayout startIcon={icon} title={title} endIcon={closeButton} />
  );
};
