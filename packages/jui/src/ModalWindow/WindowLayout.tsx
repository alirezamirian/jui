import { styled } from "@intellij-platform/core/styled";
import React from "react";
import { WindowHeader } from "./WindowHeader";
import { WindowFooter } from "@intellij-platform/core/ModalWindow/WindowFooter";

const StyledWindowFooter = styled.div`
  min-height: min-content;
`;

const StyledWindowContentWrapper = styled.div`
  overflow: auto;
  flex: 1;
`;

/**
 * Window content layout, supporting fixed `header` and `footer` sections, and a scrollable `content` area.
 */
export function WindowLayout({
  header,
  footer,
  content,
}: {
  /**
   * Fixed position header of the window at the top. Use {@link WindowLayout.Header} for the default window header,
   * which also acts as a move handle for the window. If a string is passed, it will be wrapped by
   * {@link WindowLayout.Header} automatically.
   */
  header: React.ReactNode;
  /**
   * Scrollable content of the window.
   */
  content: React.ReactNode;
  /**
   * An area at the bottom of the window which is not scrolled as opposed to `content`. Use {@link WindowLayout.Footer}
   * for rendering the common layout of a window footer.
   */
  footer?: React.ReactNode;
}) {
  return (
    <>
      {header &&
        (typeof header === "string" ? (
          <WindowHeader>{header}</WindowHeader>
        ) : (
          header
        ))}
      <StyledWindowContentWrapper>{content}</StyledWindowContentWrapper>
      {footer && <StyledWindowFooter>{footer}</StyledWindowFooter>}
    </>
  );
}

// Just for improved discoverability. Might as well export WindowFooter and WindowHeader instead.
WindowLayout.Footer = WindowFooter;
WindowLayout.Header = WindowHeader;
