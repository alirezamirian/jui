import { ReusableView } from "@react-stately/virtualizer";
import { Node } from "@react-types/shared";
import React, { ReactNode, useRef } from "react";
import {
  layoutInfoToStyle,
  useVirtualizerItem,
  VirtualizerItem,
  VirtualizerProps,
} from "@react-aria/virtualizer";
import { StyledListSectionHeader } from "@intellij-platform/core/List/StyledListSectionHeader";

interface SectionProps<T> {
  reusableView: ReusableView<Node<T>, unknown>;
  header: ReusableView<Node<T>, unknown>;
  children?: ReactNode;
}

function ListSection<T extends object>({
  reusableView,
  header,
  children,
}: SectionProps<T>) {
  const headerRef = useRef<HTMLDivElement>(null);
  useVirtualizerItem({
    reusableView: header,
    ref: headerRef,
  });
  return (
    <>
      <StyledListSectionHeader
        role="presentation"
        ref={headerRef}
        style={layoutInfoToStyle(header.layoutInfo!, "ltr")}
      >
        {reusableView.content.rendered}
      </StyledListSectionHeader>
      <div
        key={reusableView.key}
        style={layoutInfoToStyle(reusableView.layoutInfo!, "ltr")}
      >
        {children}
      </div>
    </>
  );
}

export const renderWrapper: VirtualizerProps<
  Node<any>,
  unknown
>["renderWrapper"] = (parent, reusableView, children, renderChildren) => {
  if (reusableView.viewType === "section") {
    return (
      <ListSection
        key={reusableView.key}
        reusableView={reusableView}
        header={children.find((c) => c.viewType === "header")!}
      >
        {renderChildren(children.filter((c) => c.viewType === "item"))}
      </ListSection>
    );
  }
  return (
    <VirtualizerItem
      key={reusableView.key}
      reusableView={reusableView}
      parent={parent ?? undefined}
    />
  );
};
