import React, { ForwardedRef, HTMLProps } from "react";
import { css, styled } from "../styled";

const StyledTabItemLayout = styled.div`
  display: inline-flex;
  align-items: center;
`;

const iconStyle = css`
  display: inline-flex; // without this, the wrapper takes the full height, causing icon to be placed on top
  margin-top: -0.1rem; // seems necessary for pixel perfect match with the original impl
`;

const StyledStartIconWrapper = styled.span`
  ${iconStyle};
  margin-right: 0.25rem;
`;

const StyledEndIconWrapper = styled.span`
  ${iconStyle};
  margin-left: 0.25rem;
  margin-right: -0.25rem; // default padding of the tab should be a little reduced when close icon is there.
  border-radius: 16px;
`;

interface TabItemLayoutProps {
  /**
   * the icon placed before the text.
   */
  startIcon?: React.ReactNode;
  /**
   * title of the tab. Normally just a string
   */
  title?: React.ReactNode;
  /**
   * the icon placed after the text. Typical use cases: close or pin icon.
   */
  endIcon?: React.ReactNode;

  /**
   * Generic HTML props passed to the container div.
   */
  containerProps?: Omit<HTMLProps<HTMLDivElement>, "ref" | "as">;
}

/**
 * Helper component for rendering the common layout of tab content.
 */
export const TabContentLayout = React.forwardRef(
  (
    { startIcon, title, endIcon, containerProps }: TabItemLayoutProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <StyledTabItemLayout {...containerProps} ref={ref}>
        {startIcon && (
          <StyledStartIconWrapper>{startIcon}</StyledStartIconWrapper>
        )}
        {title}
        {endIcon && <StyledEndIconWrapper>{endIcon}</StyledEndIconWrapper>}
      </StyledTabItemLayout>
    );
  }
);
