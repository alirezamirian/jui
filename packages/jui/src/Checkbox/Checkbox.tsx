import React, { HTMLProps, ReactNode } from "react";
import { useToggleState } from "@react-stately/toggle";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useCheckbox } from "@react-aria/checkbox";
import {
  AriaLabelingProps,
  FocusableDOMProps,
  FocusableProps,
  InputBase,
} from "@react-types/shared";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { styled } from "@intellij-platform/core/styled";

import { CheckboxIcon } from "./CheckboxIcon";
import { usePress } from "@react-aria/interactions";
import { UnknownThemeProp } from "@intellij-platform/core/Theme";

export interface CheckboxProps
  extends InputBase,
    FocusableDOMProps,
    AriaLabelingProps,
    FocusableProps {
  /**
   * If set to true, the checkbox won't be focusable.
   * Common use cases:
   * - When checkbox is rendered in a focusable container, like a list item where the focus should not be taken away
   *   from that container.
   * - "Amend" checkbox in "Commit" tool window. The focus is kept in the commit message or changes tree, perhaps, for
   *   a questionably better UX.
   * Note: Passing {@link excludeFromTabOrder} will still let the checkbox be focusable, while `preventFocus`, doesn't
   * let the component get focused at all.
   * TODO(potential): it might be nicer to have a `preventFocusOnPress` prop consistent with ActionButton, instead.
   *  In that case preventing focus completely would be achieved with `preventFocusOnPres` and `excludeFromTabOrder`.
   */
  preventFocus?: boolean;

  /**
   * By default, focus ring is always shown when the checkbox is focused, independent of the interaction method.
   * if set to false, the focus will be only visible if the interaction is done via keyboard or screen readers.
   * Similar to how [:focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) works.
   */
  disableFocusAlwaysVisible?: boolean;

  /**
   * Indeterminism is presentational only.
   * The indeterminate visual representation remains regardless of user interaction.
   */
  isIndeterminate?: boolean;

  /**
   * The label for the element.
   */
  children?: ReactNode;

  /**
   * Whether the element should be selected (uncontrolled).
   */
  defaultSelected?: boolean;
  /**
   * Whether the element should be selected (controlled).
   */
  isSelected?: boolean;
  /**
   * Handler that is called when the element's selection state changes.
   */
  onChange?: (isSelected: boolean) => void;
  /**
   * The value of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue).
   */
  value?: string;
  /**
   * The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  name?: string;
}

const StyledWrapperLabel = styled.label`
  display: inline-flex;
  align-items: center;
`;

const StyledCheckboxLabelText = styled.span<{
  isDisabled: boolean | undefined;
}>`
  margin-left: 0.25rem;
  color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.color(
          "CheckBox.disabledText" as UnknownThemeProp,
          "#808080" /* this default value was a bit tricky. Still not clear from where it comes in darcular 
          theme when there is no clue of Checkbox.disabledText or *.disabledText. Note that using 
          CheckBox.disabledForeground is not a good option, because it's something other than #808080 for darcula */
        )
      : theme.color("*.foreground")};
`;

/**
 * Checkbox component to be used with or without a label.
 *
 * While the checkbox without the label + preventFocus makes it usable in tree/list, it might be more optimized to
 * use a more lightweight component like ListItemCheckbox, which uses CheckboxIcon with a simple press handle. Without
 * any input, state, etc.
 */
export const Checkbox = ({
  preventFocus,
  disableFocusAlwaysVisible,
  ...props
}: CheckboxProps) => {
  const state = useToggleState(props);
  const ref = React.useRef<HTMLInputElement>(null);
  const { inputProps } = useCheckbox(props, state, ref);

  const { isFocusVisible, isFocused, focusProps } = useFocusRing({
    autoFocus: props.autoFocus,
  });
  const { pressProps: wrapperPressProps, isPressed } = usePress({});

  const focusDisabledProps: Pick<
    HTMLProps<HTMLInputElement>,
    "onFocusCapture" | "tabIndex"
  > = preventFocus
    ? {
        onFocusCapture: (event) => {
          event.stopPropagation();
          event.preventDefault();
          if (event.relatedTarget instanceof HTMLElement) {
            event.relatedTarget.focus();
          } else {
            event.target.blur();
          }
        },
        tabIndex: -1,
      }
    : {};

  return (
    <StyledWrapperLabel {...wrapperPressProps}>
      <VisuallyHidden>
        <input
          {...mergeProps(inputProps, focusProps, focusDisabledProps)}
          ref={ref}
        />
      </VisuallyHidden>
      <CheckboxIcon
        isIndeterminate={props.isIndeterminate}
        isFocused={
          disableFocusAlwaysVisible
            ? isFocusVisible
            : (!preventFocus && isPressed) || isFocused
        }
        isSelected={props.isIndeterminate || state.isSelected}
        isDisabled={props.isDisabled}
        aria-hidden="true"
        style={{
          pointerEvents: "none",
        }}
      />
      {props.children && (
        <StyledCheckboxLabelText isDisabled={props.isDisabled}>
          {props.children}
        </StyledCheckboxLabelText>
      )}
    </StyledWrapperLabel>
  );
};
