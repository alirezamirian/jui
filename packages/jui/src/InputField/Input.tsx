import React, {
  ForwardedRef,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import { FocusableOptions, useFocusable } from "@react-aria/focus";
import { useFocusWithin } from "@react-aria/interactions";
import { UnknownThemeProp } from "@intellij-platform/core/Theme";
import { styled, css } from "@intellij-platform/core/styled";

const StyledInputBox = styled.div<{
  disabled?: boolean;
  focused?: boolean;
  validationState: InputProps["validationState"];
  appearance: InputProps["appearance"];
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
        focused,
        disabled,
        validationState,
      })};
  box-shadow: 0 0 0 0.125rem
    ${({ theme, focused = false, validationState, disabled }) =>
      disabled
        ? "transparent"
        : theme.commonColors.focusRing({
            validationState,
            focused: focused,
          })};
  border-radius: 1px;
  cursor: text; // the whole box moves focus to the input
  overflow: hidden;
  ${({ appearance, validationState, disabled }) =>
    appearance === "embedded" &&
    css`
      border-color: ${validationState !== "error" && "transparent"};
      box-shadow: ${validationState !== "error" && "none"};
      background: ${!disabled && "transparent"};
    `};
`;

const StyledInput = styled.input<{ disabled?: boolean }>`
  all: unset;
  padding: 0.1875rem 0.375rem;
  flex: 1; // fill in the available space within the input box
  min-width: 0;
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

const StyledAddons = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem; /* TODO: check */
  padding: 1px 0;
`;
const StyledRightAddons = styled(StyledAddons)`
  margin-right: 0.125rem; /* TODO: check */
`;

const StyledLeftAddons = styled(StyledAddons)`
  margin-left: 0.375rem; /* TODO: check */
`;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  validationState?: "valid" | "error" | "warning";
  /**
   * Whether to auto select the value initially
   */
  autoSelect?: boolean;

  /**
   * Rendered inside the input box and after the input element.
   * Used to render [Built-in buttons](https://jetbrains.github.io/ui/controls/built_in_button/).
   */
  addonAfter?: React.ReactNode;
  /**
   * Rendered inside the input box and before the input element.
   */
  addonBefore?: React.ReactNode;

  /**
   * Ref to the underlying input element
   */
  inputRef?: React.Ref<HTMLInputElement>;

  /**
   * Appearance of the input.
   * - "ghost": Without the border and shadow in valid state.
   * - "boxed" With the border and shadow.
   * @default "box"
   */
  appearance?: "embedded" | "box";
}

/**
 * Bare input, themed, and with a few extra features:
 * - Support for "error" and "warning" state ({@param validationState}
 * - Support for autoSelect.
 * - Disables spell check by default. It can be overwritten.
 * Use {@link InputField} for more features like an associated label, error message and context help.
 */
export const Input = React.forwardRef(function Input(
  {
    validationState,
    autoSelect,
    addonBefore,
    addonAfter,
    style,
    className,
    inputRef: inputRefProp,
    onFocus,
    onBlur,
    autoFocus,
    appearance,
    ...props
  }: InputProps,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  const ref = useObjectRef(forwardedRef);
  const inputRef = useObjectRef(inputRefProp);
  const { focusableProps } = useFocusable(
    {
      isDisabled: props.disabled,
      autoFocus,
      onFocus,
      onBlur,
    } as FocusableOptions,
    inputRef
  );
  const [isFocused, setIsFocused] = useState(false);
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setIsFocused,
  });

  useEffect(() => {
    if (autoSelect) {
      inputRef.current?.select();
    }
  }, [autoSelect]);

  return (
    <StyledInputBox
      ref={ref}
      spellCheck={false}
      appearance={appearance}
      {...mergeProps(focusWithinProps, {
        className,
        style,
        onMouseDown: (event: MouseEvent) => {
          if (event.target !== inputRef.current) {
            event.preventDefault();
            inputRef.current?.focus();
          }
        },
      })}
      focused={isFocused}
      validationState={validationState}
      disabled={props.disabled}
    >
      {addonBefore && <StyledLeftAddons>{addonBefore}</StyledLeftAddons>}
      <StyledInput ref={inputRef} {...mergeProps(props, focusableProps)} />
      {addonAfter && <StyledRightAddons>{addonAfter}</StyledRightAddons>}
    </StyledInputBox>
  );
});
