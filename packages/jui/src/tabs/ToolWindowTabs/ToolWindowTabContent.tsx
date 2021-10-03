import { TabCloseButton } from "jui/tabs/TabCloseButton";
import { TabContentLayout } from "jui/tabs/TabContentLayout";
import React from "react";

export const ToolWindowTabContent = ({
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
