import React from "react";
import { Pressable } from "@react-aria/interactions";
import { PlatformIcon } from "@intellij-platform/core/Icon";
import { TabCloseButton } from "@intellij-platform/core/tabs/TabCloseButton";
import {
  TabContentLayout,
  TabItemLayoutProps,
} from "@intellij-platform/core/tabs/TabContentLayout";

/**
 * For rendering the content of Editor tabs. supports for file icon which is shown on the left and close or unpin
 * button shown on the right.
 */
export const EditorTabContent = ({
  icon,
  title,
  onClose,
  onUnpin,
  pinned,
  containerProps,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  onClose?: () => void;
  onUnpin?: () => void;
  pinned?: boolean;
  containerProps?: TabItemLayoutProps["containerProps"];
}) => {
  // TODO: Tooltip for unpin and close buttons
  return (
    <TabContentLayout
      startIcon={icon}
      title={title}
      containerProps={containerProps}
      endIcon={
        pinned ? (
          <Pressable onPress={onUnpin}>
            <PlatformIcon icon="actions/pinTab" />
          </Pressable>
        ) : (
          onClose && <TabCloseButton onPress={onClose} />
        )
      }
    />
  );
};
