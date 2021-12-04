import { TabCloseButton } from "@intellij-platform/core/tabs/TabCloseButton";
import { TabContentLayout } from "@intellij-platform/core/tabs/TabContentLayout";
import React from "react";

export const DebuggerTabContent = ({
  icon,
  title,
  onClose,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  onClose?: () => void;
}) => {
  return (
    <TabContentLayout
      startIcon={icon}
      title={title}
      endIcon={onClose && <TabCloseButton onPress={onClose} />}
    />
  );
};
