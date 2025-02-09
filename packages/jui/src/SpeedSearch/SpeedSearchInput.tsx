import React, { useRef } from "react";
import { useButton } from "@react-aria/button";
import {
  AutoHoverPlatformIcon,
  PlatformIcon,
} from "@intellij-platform/core/Icon";
import { styled } from "@intellij-platform/core/styled";
import { UnknownThemeProp } from "@intellij-platform/core/Theme";

export interface SpeedSearchInputProps {
  children: string | undefined;
  match?: boolean;
  active: boolean | undefined;
  clear: () => void;
}

const StyledSearchIcon = styled(PlatformIcon)`
  margin-right: 0.25rem;
`;

const StyledSpeedSearchInput = styled.span<{ noMatch?: boolean }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: ${({ theme, noMatch }) =>
    noMatch
      ? theme.color(
          "SearchField.errorBackground",
          theme.dark ? "#743A3A" : "#ffcccc"
        )
      : theme.color(
          "TextField.background"
        )}; // fallback logic not checked with the ref impl
  color: ${({ theme }) =>
    theme.color(
      "TextField.foreground" as UnknownThemeProp<"TextField.foreground">
    )}; // fallback logic not checked with the ref impl
  height: 1.5rem; // 24px, JBTextField COMPACT_HEIGHT
  padding: 0.125rem 0.375rem;
  border: 1px solid ${({ theme }) => theme.getOutlineColor(true, false)};
  border-radius: ${({ theme }) =>
    ((theme.value("Component.arc") as number) ?? 5) / 2}px;
`;
const StyledSearchText = styled.span`
  flex: 1;
  font-size: 0.91em; // RelativeFont.SMALL
`;

/**
 * An input field to be rendered to show the filter value in speed search in menus and similar speedSearch-enabled
 * components.
 * @see SpeedSearchPopup
 */
export const SpeedSearchInput = React.forwardRef<
  HTMLElement,
  SpeedSearchInputProps
>(({ active, match, children, clear }, ref) => {
  const clearButtonRef = useRef<HTMLElement>(null);
  const { buttonProps } = useButton(
    {
      elementType: "span",
      "aria-label": "Clear search",
      excludeFromTabOrder: true,
      preventFocusOnPress: true,
      onPress: clear,
    },
    clearButtonRef
  );

  // Temporary styled components until SearchInput is implemented
  return active ? (
    <StyledSpeedSearchInput ref={ref} noMatch={!match}>
      <StyledSearchIcon icon={"actions/search"} />
      <StyledSearchText>
        {(children || "").replace(/ /g, "\u00A0")}
      </StyledSearchText>
      {children && (
        <AutoHoverPlatformIcon
          {...buttonProps}
          ref={clearButtonRef}
          icon="actions/close"
          hoverIcon="actions/closeHovered"
        />
      )}
    </StyledSpeedSearchInput>
  ) : null;
});
