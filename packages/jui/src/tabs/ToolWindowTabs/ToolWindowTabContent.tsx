import { TabCloseButton } from "jui/tabs/TabCloseButton";
import { TabContentLayout } from "jui/tabs/TabContentLayout";
import React, { ForwardedRef, HTMLProps, RefObject } from "react";

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
