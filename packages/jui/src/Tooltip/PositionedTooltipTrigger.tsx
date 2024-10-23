import React, {
  HTMLAttributes,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
} from "react";
import { TooltipTriggerProps as AriaTooltipTriggerProps } from "@react-aria/tooltip";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import { AriaPositionProps, useOverlayPosition } from "@react-aria/overlays";
import { TooltipTriggerAndOverlay } from "./TooltipTriggerAndOverlay";
import { useObjectRef } from "@react-aria/utils";

export interface PositionedTooltipTriggerProps<
  T extends HTMLElement = HTMLElement
> extends Omit<AriaTooltipTriggerProps, "trigger">,
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
        props: HTMLAttributes<HTMLElement> & { ref: RefObject<T> }
      ) => React.ReactNode);

  /**
   * Whether to show the tooltip on trigger's focus. By default, tooltip is shown only when the trigger
   * is hovered, but it can improve accessibility to show the tooltip on focus as well.
   */
  showOnFocus?: boolean;

  /**
   * Ref to trigger.
   * If not provided, a ref will be created internally.
   * Useful for when a ref to the trigger is necessary where PositionedTooltipTrigger
   * is used.
   */
  triggerRef?: RefObject<T>;
}

/**
 * Sets {@param tooltip} for its {@param children}. Tooltip will be positioned based relative to the trigger.
 * The default tooltip positioning is based on cursor, which is implemented by {@link TooltipTrigger}
 */
export const PositionedTooltipTrigger = <T extends HTMLElement>({
  tooltip,
  children,
  /**
   * ide.tooltip.initialReshowDelay registry key. [Docs](https://jetbrains.github.io/ui/controls/tooltip/#19) says
   * it's 300 by default, but it's 500 in the code currently.
   */
  delay = 500,
  offset = 8,
  showOnFocus,
  triggerRef: inputTriggerRef,
  ...props
}: PositionedTooltipTriggerProps<T>): JSX.Element => {
  const state = useTooltipTriggerState({
    ...props,
    delay,
  });

  const overlayRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useObjectRef<T>(inputTriggerRef);
  const triggerRef = inputTriggerRef || fallbackRef;

  const positionAria = useOverlayPosition({
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
      requestAnimationFrame(positionAria.updatePosition);
    }
  }, [state.isOpen]);

  return (
    <TooltipTriggerAndOverlay
      tooltip={tooltip}
      positionAria={positionAria}
      trigger={children}
      state={state}
      overlayRef={overlayRef}
      triggerRef={triggerRef}
      showOnFocus={showOnFocus}
      isDisabled={props.isDisabled}
    />
  );
};
