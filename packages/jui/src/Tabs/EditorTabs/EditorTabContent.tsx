import React from "react";
import { PlatformIcon } from "@intellij-platform/core/Icon";
import { TabCloseButton } from "@intellij-platform/core/Tabs/TabCloseButton";
import {
  TabContentLayout,
  TabItemLayoutProps,
} from "@intellij-platform/core/Tabs/TabContentLayout";
import { ActionTooltip, TooltipTrigger } from "@intellij-platform/core/Tooltip";
import { BareButton } from "@intellij-platform/core/Button";

interface EditorTabContentProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  /**
   * Close button, shown in place of "pin" button if not pinned. Use {@link TabCloseButton} to render the close button
   * for the tab.
   *
   * @example
   * ```tsx
   * <EditorTabContent
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
  onUnpin?: () => void;
  pinned?: boolean;
  containerProps?: TabItemLayoutProps["containerProps"];
}
/**
 * For rendering the content of Editor tabs. supports for file icon which is shown on the left and close or unpin
 * button shown on the right.
 */
export const EditorTabContent = ({
  icon,
  title,
  closeButton,
  onUnpin,
  pinned,
  containerProps,
}: EditorTabContentProps) => {
  return (
    <TabContentLayout
      startIcon={icon}
      title={title}
      containerProps={containerProps}
      endIcon={
        pinned ? (
          <TooltipTrigger tooltip={<ActionTooltip actionName="Unpin Tab" />}>
            <BareButton onPress={onUnpin}>
              <PlatformIcon icon="actions/pinTab" />
            </BareButton>
          </TooltipTrigger>
        ) : (
          closeButton
        )
      }
    />
  );
};
