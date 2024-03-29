import React from "react";
import { styled } from "@intellij-platform/core/styled";
import { Popup } from "./Popup";
import { PopupHeader } from "./PopupHeader";
import { StyledPopupHint } from "@intellij-platform/core/Popup/StyledPopupHint";

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
  // Not sure about making the content area a vertical flex container, but it seemed it makes sense as default.
  // The use case at hand where this was added was "Branches" popup, which would of course be implementable without this
  // too, with an extra flex container around the menu.
  display: flex;
  flex-direction: column;
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
      {header && (
        <StyledPopupLayoutHeader>
          {typeof header === "string" ? (
            <PopupHeader>{header}</PopupHeader>
          ) : (
            header
          )}
        </StyledPopupLayoutHeader>
      )}
      <StyledPopupLayoutContent>{content}</StyledPopupLayoutContent>
      {footer && (
        <StyledPopupLayoutFooter>
          {typeof footer === "string" ? (
            <StyledPopupHint>{footer}</StyledPopupHint>
          ) : (
            footer
          )}
        </StyledPopupLayoutFooter>
      )}
    </StyledPopupLayout>
  );
}
