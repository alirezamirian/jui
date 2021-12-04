import React, { ForwardedRef, HTMLProps } from "react";
import { TabCloseButton } from "@intellij-platform/core/tabs/TabCloseButton";
import { TabContentLayout } from "@intellij-platform/core/tabs/TabContentLayout";

type Props = {
  icon: React.ReactNode;
  title: React.ReactNode;
  onClose?: () => void;
  containerProps?: Omit<HTMLProps<HTMLDivElement>, "ref" | "as">;
};

export const ToolWindowTabContent = React.forwardRef(
  (
    { icon, title, onClose, containerProps }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <TabContentLayout
        containerProps={containerProps}
        ref={ref}
        startIcon={icon}
        title={title}
        endIcon={onClose && <TabCloseButton onPress={onClose} />}
      />
    );
  }
);
