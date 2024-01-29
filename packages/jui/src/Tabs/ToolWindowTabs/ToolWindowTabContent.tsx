import React, { ForwardedRef, HTMLProps } from "react";
import { TabCloseButton } from "@intellij-platform/core/Tabs/TabCloseButton";
import { TabContentLayout } from "@intellij-platform/core/Tabs/TabContentLayout";

type ToolWindowTabContentProps = {
  icon?: React.ReactNode;
  title: React.ReactNode;
  /**
   * Close button for the tab. Use {@link TabCloseButton} to render the close button
   * for the tab.
   *
   * @example
   * ```tsx
   * <ToolWindowTabContent
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
  closeButton?: React.ReactNode;
  containerProps?: Omit<HTMLProps<HTMLDivElement>, "ref" | "as">;
};

export const ToolWindowTabContent = React.forwardRef(
  (
    { icon, title, closeButton, containerProps }: ToolWindowTabContentProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <TabContentLayout
        containerProps={containerProps}
        ref={ref}
        startIcon={icon}
        title={title}
        endIcon={closeButton}
      />
    );
  }
);
