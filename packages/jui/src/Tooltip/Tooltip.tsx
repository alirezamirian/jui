import React, {
  ForwardedRef,
  MutableRefObject,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { AriaTooltipProps, useTooltip } from "@react-aria/tooltip";
import { useObjectRef } from "@react-aria/utils";
import { PositionAria } from "@react-aria/overlays";
import { css, styled } from "@intellij-platform/core/styled";
import { UnknownThemeProp } from "@intellij-platform/core/Theme";
import { WINDOW_SHADOW } from "@intellij-platform/core/style-constants";
import { TooltipContext } from "./TooltipContext";
import { TooltipPointer, TooltipPointerPosition } from "./TooltipPointer";
import {
  tooltipBackground,
  tooltipBorderColor,
  WITH_POINTER_BORDER_RADIUS,
} from "./tooltip-styles";

export interface TooltipProps extends Omit<AriaTooltipProps, "isOpen"> {
  children: React.ReactNode;
  multiline?: boolean;
  className?: string;
  /**
   * Whether (and in what position) the arrow pointer should be shown.
   * When using {@link TooltipTrigger} or {@link PositionedTooltipTrigger}, the position of the pointer is calculated
   * based on the target element, and a boolean value to define whether the arrow should be shown or not would suffice.
   *
   * Tooltips with pointer have slight style difference.
   * {@see https://www.figma.com/file/nfDfMAdV7j2fnQlpYNAOfP/IntelliJ-Platform-UI-Kit-(Community)?type=design&node-id=15-51&mode=design&t=7PplrxG8ZfXB4hIK-0}
   *
   * @example
   * <Tooltip withPointer />
   * // shows the pointer in the position controlled by {@link TooltipTrigger} or {@link PositionedTooltipTrigger}
   * // If there is not `TooltipTrigger` or `PositionedTooltipTrigger`, the arrow is shown on top center by default.
   *
   * @example
   * <Tooltip withPointer={{side: 'top', offset: 30}} />
   * // shows the pointer on the top side, with horizontal offset of 30px from the left of tooltip, regardless
   * // of whether `TooltipTrigger` or `PositionedTooltipTrigger` is used.
   *
   * @example
   * <Tooltip withPointer={{side: 'left', offset: -30}} />
   * // shows the pointer on the left side, with vertidcal offset of 30px from the bottom of the tooltip, regardless
   * // of whether `TooltipTrigger` or `PositionedTooltipTrigger` is used.
   */
  withPointer?: boolean | TooltipPointerPosition;
}

// Providing default value for paddings, based on intellijlaf theme. In Intellij Platform, themes extend either
// intellijlaf or darcula. Which means some properties can be omitted in the custom theme, relying on the values
// in the base theme. This is not how theming works here, at the moment, and there are other similar issues, but
// this is just a mitigation for one case, spacing in tooltip.
export const DEFAULT_TEXT_BORDER_INSETS = "0.5rem 0.8125rem 0.625rem 0.625rem";
export const DEFAULT_SMALL_TEXT_BORDER_INSETS =
  "0.375rem 0.75rem 0.4375rem 0.625rem";
const StyledTooltip = styled.div<{ multiline?: boolean; hasPointer?: boolean }>`
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
  background: ${tooltipBackground};
  color: ${({ theme }) =>
    theme.color("ToolTip.foreground", !theme.dark ? "#000" : "#bfbfbf")};
  padding: ${({ theme, multiline }) =>
    multiline
      ? theme.inset("HelpTooltip.defaultTextBorderInsets") ||
        DEFAULT_TEXT_BORDER_INSETS
      : theme.inset("HelpTooltip.smallTextBorderInsets") ||
        DEFAULT_SMALL_TEXT_BORDER_INSETS};
  line-height: 1.2;
  border-style: solid;
  border-width: ${({ theme, hasPointer }) =>
    theme.value<boolean>("ToolTip.paintBorder") || hasPointer ? "1px" : "0px"};
  border-color: ${tooltipBorderColor};
  ${WINDOW_SHADOW};
  ${({ hasPointer }) =>
    hasPointer &&
    css`
      position: relative; // needed for absolute positioning of the pointer
      border-radius: ${WITH_POINTER_BORDER_RADIUS}px;
    `}
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

export const placementToPointerSide: Record<
  PositionAria["placement"],
  TooltipPointerPosition["side"]
> = {
  bottom: "top",
  top: "bottom",
  left: "right",
  right: "left",
  center: "top", // doesn't make sense :-?
};
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
  { children, multiline, withPointer, ...props }: TooltipProps,
  forwardedRef: ForwardedRef<HTMLDivElement>
): JSX.Element {
  const ref: MutableRefObject<HTMLDivElement | null> =
    useObjectRef(forwardedRef);
  const {
    state,
    isInteractive,
    pointerPositionStyle,
    placement = "bottom",
  } = useContext(TooltipContext) || {};
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
  const measuredSize = useMeasuredSize(ref);

  const { side, offset } =
    typeof withPointer === "object"
      ? withPointer
      : { side: placementToPointerSide[placement], offset: undefined };

  return (
    <StyledTooltip
      hasPointer={Boolean(withPointer)}
      multiline={multiline}
      {...tooltipProps}
      className={props.className}
      ref={ref}
    >
      {withPointer && measuredSize && (
        <TooltipPointer
          tooltipSize={measuredSize}
          side={side}
          offset={
            offset || !pointerPositionStyle
              ? { type: "specific", value: offset }
              : { type: "calculated", value: pointerPositionStyle }
          }
        />
      )}
      {children}
    </StyledTooltip>
  );
});

const useMeasuredSize = (
  ref: React.MutableRefObject<HTMLDivElement | null>
) => {
  const [measuredSize, setMeasuredSize] = useState<
    | undefined
    | {
        height: number;
        width: number;
      }
  >(undefined);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    const { offsetHeight, offsetWidth } = ref.current;
    if (
      offsetHeight != measuredSize?.height ||
      offsetWidth != measuredSize?.width
    ) {
      setMeasuredSize({ height: offsetHeight, width: offsetWidth });
    }
  });
  return measuredSize;
};

const _Tooltip = Object.assign(Tooltip, {
  Header: StyledHeader,
  Shortcut: StyledShortcut,
  Description: StyledDescription,
  Link: StyledLink,
});

export { _Tooltip as Tooltip };
