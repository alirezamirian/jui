import React, {
  HTMLAttributes,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
} from "react";
import { TooltipTriggerProps as AriaTooltipTriggerProps } from "@react-aria/tooltip";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import { TooltipTriggerAndOverlay } from "@intellij-platform/core/Tooltip/TooltipTriggerAndOverlay";
import { AriaPositionProps, useOverlayPosition } from "@react-aria/overlays";

interface TooltipTriggerProps
  extends Omit<AriaTooltipTriggerProps, "trigger">,
    Pick<
      AriaPositionProps,
      "placement" | "offset" | "crossOffset" | "shouldFlip"
    > {
  /**
   * Tooltip content. The value should be an element of type {@link Tooltip}.
   */
  tooltip: ReactElement;
  /**
   * Either a focusable component, or a render function which accepts trigger props and passes it to some component.
   */
  children:
    | React.ReactNode
    | ((
        props: HTMLAttributes<HTMLElement> & { ref: RefObject<HTMLElement> }
      ) => React.ReactNode);

  /**
   * Whether to show the tooltip on trigger's focus. By default, tooltip is shown only when the trigger
   * is hovered, but it can improve accessibility to show the tooltip on focus as well.
   */
  showOnFocus?: boolean;
}

/**
 * Sets {@param tooltip} for its {@param children}. Tooltip will be positioned based relative to the trigger.
 * The default tooltip positioning is based on cursor, which is implemented by {@link TooltipTrigger}
 */
export const PositionedTooltipTrigger = ({
  tooltip,
  children,
  /**
   * ide.tooltip.initialReshowDelay registry key. [Docs](https://jetbrains.github.io/ui/controls/tooltip/#19) says
   * it's 300 by default, but it's 500 in the code currently.
   */
  delay = 500,
  offset = 8,
  showOnFocus,
  ...props
}: TooltipTriggerProps): JSX.Element => {
  const state = useTooltipTriggerState({
    ...props,
    delay,
  });

  const overlayRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  const { overlayProps, updatePosition } = useOverlayPosition({
    ...props,
    overlayRef,
    targetRef: triggerRef,
    offset,
    isOpen: state.isOpen,
    onClose: state.close,
  });

  // A workaround for a mysterious issue that happens only in docusaurus build.
  // The ref value is not up-to-date, when the effect runs.
  // FIXME: Find the explanation for why it happens, and fix it properly, if it's a legit issue.
  useEffect(() => {
    if (state.isOpen) {
      requestAnimationFrame(updatePosition);
    }
  }, [state.isOpen]);

  return (
    <TooltipTriggerAndOverlay
      tooltip={tooltip}
      tooltipOverlayProps={overlayProps}
      trigger={children}
      state={state}
      overlayRef={overlayRef}
      triggerRef={triggerRef}
      showOnFocus={showOnFocus}
      isDisabled={props.isDisabled}
    />
  );
};
