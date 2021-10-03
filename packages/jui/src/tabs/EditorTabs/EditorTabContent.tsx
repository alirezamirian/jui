import { Pressable } from "@react-aria/interactions";
import { PlatformIcon } from "jui";
import { TabCloseButton } from "jui/tabs/TabCloseButton";
import { TabContentLayout } from "jui/tabs/TabContentLayout";
import React from "react";

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
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  onClose?: () => void;
  onUnpin?: () => void;
  pinned?: boolean;
}) => {
  // TODO: Tooltip for unpin and close buttons
  return (
    <TabContentLayout
      startIcon={icon}
      title={title}
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
