import React, { ForwardedRef, useContext } from "react";
import { AriaTooltipProps, useTooltip } from "@react-aria/tooltip";
import { useObjectRef } from "@react-aria/utils";
import { styled } from "@intellij-platform/core/styled";
import { UnknownThemeProp } from "@intellij-platform/core/Theme";
import { WINDOW_SHADOW } from "@intellij-platform/core/style-constants";
import { TooltipContext } from "./TooltipContext";

export interface TooltipProps extends Omit<AriaTooltipProps, "isOpen"> {
  children: React.ReactNode;
  multiline?: boolean;
}

const StyledTooltip = styled.div<{ multiline?: boolean }>`
  box-sizing: content-box;
  max-width: ${
    /**
     * Max width is meant to be set on the multiline description (which is not used in ActionTooltip which would
     * be right according to [the specs](https://jetbrains.github.io/ui/controls/tooltip/#09)).
     * But if set on `Tooltip.Description`, title and link can still make the tooltip grow more that the expected max
     * width. So it makes more sense to set the max width on the container anyway. But since the value of the max width
     * is meant to be for description we set the box-sizing to "content-box" to exclude container's padding in max-width
     * calculation.
     */
    ({ theme, multiline }) =>
      multiline
        ? `${
            theme.value<number>(
              "HelpTooltip.maxWidth" as UnknownThemeProp<"HelpTooltip.maxWidth">
            ) ?? 250
          }px`
        : null
  };
  white-space: ${({ multiline }) => (!multiline ? "nowrap" : null)};
  display: inline-flex;
  flex-direction: column;
  gap: ${({ theme }) =>
    theme.value<number>(
      "HelpToolTip.verticalGap" as UnknownThemeProp<"HelpToolTip.verticalGap">
    ) ?? 4}px;
  background: ${({ theme }) =>
    theme.color("ToolTip.background", !theme.dark ? "#f2f2f2" : "#3c3f41")};
  color: ${({ theme }) =>
    theme.color("ToolTip.foreground", !theme.dark ? "#000" : "#bfbfbf")};
  padding: ${({ theme, multiline }) =>
    multiline
      ? theme.inset("HelpTooltip.defaultTextBorderInsets")
      : theme.inset("HelpTooltip.smallTextBorderInsets")};
  border-style: solid;
  border-width: ${({ theme }) =>
    theme.value<boolean>("ToolTip.paintBorder") ? "1px" : "0px"};
  border-color: ${({ theme }) =>
    theme.color("ToolTip.borderColor", !theme.dark ? "#adadad" : "#636569")};
  ${WINDOW_SHADOW};
`;

const StyledShortcut = styled.kbd`
  all: unset;
  color: ${({ theme }) =>
    theme.color(
      "ToolTip.shortcutForeground",
      !theme.dark ? "#787878" : "#999999"
    )};
`;

const StyledHeader = styled.div`
  font-size: ${({ theme }) => theme.fontSizeDelta("HelpTooltip.fontSizeDelta")};
  display: flex;
  gap: 0.5rem;
`;
const StyledDescription = styled.div`
  color: ${({ theme }) =>
    theme.color(
      "Tooltip.infoForeground" as UnknownThemeProp<"Tooltip.infoForeground">,
      theme.commonColors.contextHelpForeground
    )};
  font-size: ${({ theme }) =>
    theme.fontSizeDelta("HelpTooltip.descriptionSizeDelta")};
`;

const StyledLink = styled.div`
  color: ${({ theme }) =>
    theme.color(
      "ToolTip.linkForeground" as UnknownThemeProp<"ToolTip.linkForeground">,
      theme.commonColors.linkForegroundEnabled
    )};
  a,
  [role="link"] {
    // Maybe target Link instead, without important. It didn't work as expected, in the first try tho.
    color: inherit !important;
  }
`;

/**
 * Implements the UI of a Tooltip. For tooltip to be shown for a trigger, on hover, use {@link TooltipTrigger}.
 * The following components can be used to compose the content of a tooltip.
 * - {@link Tooltip.Header}
 * - {@link Tooltip.Description}
 * - {@link Tooltip.Link}
 * - {@link Tooltip.Shortcut}
 * Prefer using higher-level components like {@link HelpTooltip}, {@link ActionHelpTooltip} or {@link ActionTooltip}.
 * that ensure different pieces of tooltip content follow the
 * [design system recommendation](https://jetbrains.github.io/ui/controls/tooltip)
 *
 *
 * ### Reference:
 * Tooltip, Tooltip.* and TooltipTrigger are corresponding to [HelpTooltip](https://github.com/JetBrains/intellij-community/blob/854daf45b47a6ea9da0348978608bfbfe998d99c/platform/platform-api/src/com/intellij/ide/HelpTooltip.java#L102)
 * in the original impl.
 */
const Tooltip = React.forwardRef(function Tooltip(
  { children, multiline, ...props }: TooltipProps,
  forwardedRef: ForwardedRef<HTMLDivElement>
): JSX.Element {
  const ref = useObjectRef(forwardedRef);
  const { state, isInteractive } = useContext(TooltipContext) || {};
  const { tooltipProps } = useTooltip(
    props,
    state
      ? {
          ...state,
          // if the tooltip is not interactive, let it be closed even when it's hovered. That's the according to the reference impl.
          open: isInteractive ? state?.open : () => {},
        }
      : state
  );

  return (
    <StyledTooltip multiline={multiline} {...tooltipProps} ref={ref}>
      {children}
    </StyledTooltip>
  );
});

const _Tooltip = Object.assign(Tooltip, {
  Header: StyledHeader,
  Shortcut: StyledShortcut,
  Description: StyledDescription,
  Link: StyledLink,
});

export { _Tooltip as Tooltip };
