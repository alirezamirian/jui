import React, {
  ForwardedRef,
  HTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import { useFocusable } from "@react-aria/focus";
import { styled } from "@intellij-platform/core/styled";
import { UnknownThemeProp } from "@intellij-platform/core/Theme";
import { ValidationState } from "@react-types/shared";
import { useFocusWithin } from "@react-aria/interactions";

const StyledInputBox = styled.div<{
  disabled?: boolean;
  focused?: boolean;
  validationState: ValidationState | undefined;
}>`
  box-sizing: border-box;
  display: inline-flex;
  min-width: 4rem; // https://jetbrains.github.io/ui/controls/input_field/#28
  background: ${({ theme, disabled }) =>
    disabled
      ? theme.color("TextField.disabledBackground")
      : theme.color("TextField.background")};
  border: 1px solid
    ${({ theme, focused, disabled, validationState }) =>
      theme.commonColors.border({
        focused: focused,
        disabled: disabled,
        invalid: validationState === "invalid",
      })};
  box-shadow: 0 0 0 0.125rem
    ${({ theme, focused = false, validationState, disabled }) =>
      disabled
        ? "transparent"
        : theme.commonColors.focusRing({
            invalid: validationState === "invalid",
            focused: focused,
          })};
  border-radius: 1px;
`;

const StyledInput = styled.input<{ disabled?: boolean }>`
  all: unset;
  padding: 0.1875rem 0.375rem;
  flex: 1; // fill in the available space within the input box
  line-height: 1rem;
  color: ${({ theme }) =>
    theme.color(
      "TextField.foreground" as UnknownThemeProp<"TextField.foreground">
    )};
  color: ${({ theme, disabled }) =>
    disabled &&
    theme.color(
      "TextField.inactiveForeground" as UnknownThemeProp<"TextField.inactiveForeground">
    )};

  caret-color: ${({ theme }) =>
    theme.color(
      "TextField.caretForeground" as UnknownThemeProp<"TextField.caretForeground">
    )};
  &::selection {
    background: ${({ theme }) =>
      theme.color(
        "*.selectionBackground"
      )}; // Not checked with the reference impl
    color: ${({ theme }) =>
      theme.color(
        "*.selectionForeground"
      )}; // Not checked with the reference impl
  }
  &::placeholder {
    color: ${({ theme }) => theme.commonColors.inactiveTextColor};
  }
`;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  validationState?: ValidationState;
  /**
   * Whether to auto select the value initially
   */
  autoSelect?: boolean;
}

/**
 * Bare input, themed, and with a few extra features:
 * - Support for "invalid" state ({@param validationState}
 * - Support for autoSelect.
 * - TODO: support for addons within the input box, before and after the input area.
 * Use {@link InputField} for more features like an associated label, error message and context help.
 */
export const Input = React.forwardRef(function Input(
  { validationState, autoSelect, ...props }: InputProps,
  forwardedRef: ForwardedRef<HTMLInputElement>
) {
  const ref = useObjectRef(forwardedRef);
  const { focusableProps } = useFocusable(
    {
      isDisabled: props.disabled,
      ...(props as HTMLProps<Element>),
    },
    ref
  );
  const [isFocused, setIsFocused] = useState(false);
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setIsFocused,
  });

  useEffect(() => {
    if (autoSelect) {
      ref.current.select();
    }
  }, [autoSelect]);

  return (
    <StyledInputBox
      {...mergeProps(focusWithinProps)}
      focused={isFocused}
      validationState={validationState}
      disabled={props.disabled}
    >
      <StyledInput ref={ref} {...mergeProps(props, focusableProps)} />
    </StyledInputBox>
  );
});
