import React from "react";
import { styled } from "@intellij-platform/core/styled";

const StyledPopupLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: inherit;
`;
const StyledPopupLayoutHeader = styled.div`
  flex-shrink: 0;
`;
const StyledPopupLayoutContent = styled.div`
  flex: 1;
  overflow: auto;
`;
const StyledPopupLayoutFooter = styled.div`
  flex-shrink: 0;
`;

/**
 * Popup content layout, supporting fixed `header` and `footer` sections, and a scrollable `content` area.
 */
export function PopupLayout({
  header,
  footer,
  content,
}: {
  /**
   * Fixed position header of the popup at the top. {@link Popup.Header} can be used for the content.
   */
  header?: React.ReactNode;
  /**
   * Scrollable content of the popup.
   */
  content: React.ReactNode;
  /**
   * Fixed position footer of the popup at the bottom. {@link Popup.Hint} can be used for the content.
   */
  footer?: React.ReactNode;
}) {
  return (
    <StyledPopupLayout>
      {header && <StyledPopupLayoutHeader>{header}</StyledPopupLayoutHeader>}
      <StyledPopupLayoutContent>{content}</StyledPopupLayoutContent>
      {footer && <StyledPopupLayoutFooter>{footer}</StyledPopupLayoutFooter>}
    </StyledPopupLayout>
  );
}
