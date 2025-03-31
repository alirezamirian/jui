import React, {
  ChangeEvent,
  CSSProperties,
  ForwardedRef,
  HTMLProps,
} from "react";
import { AriaFieldProps, useField } from "@react-aria/label";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import { FocusableProps } from "@react-types/shared";
import {
  PositionedTooltipTrigger,
  ValidationTooltip,
} from "@intellij-platform/core/Tooltip";
import { Input, InputProps } from "@intellij-platform/core/InputField/Input";
import { styled } from "@intellij-platform/core/styled";
import {
  ContextHelpProps,
  WithInlineContextHelp,
} from "@intellij-platform/core/Field/ContextHelp";
import { LabelPlacement, WithLabel } from "@intellij-platform/core/Field/Label";

export interface InputFieldProps
  extends Omit<
      AriaFieldProps,
      "labelElementType" | "validationState" | "errorMessage" | "isInvalid"
    >,
    FocusableProps,
    Pick<
      InputProps,
      "addonBefore" | "addonAfter" | "inputRef" | "validationState"
    >,
    ContextHelpProps {
  /**
   * className applied on the field's wrapper div.
   */
  className?: string;
  /**
   * style applied on the field's wrapper div.
   */
  style?: CSSProperties;
  /**
   * Label to be associated with the input.
   */
  label?: React.ReactNode;
  /**
   * Placement of the label with respect to the input box.
   */
  labelPlacement?: LabelPlacement;

  /**
   * Whether the input is disabled. Use this prop
   */
  isDisabled?: boolean;

  /**
   * Convenient prop to be used instead of inputProps.placeholder
   **/
  placeholder?: string;
  /**
   * Convenient prop to be used instead of inputProps.value
   **/
  value?: HTMLProps<HTMLInputElement>["value"];
  /**
   * Convenient prop to be used instead of inputProps.defaultValue
   **/
  defaultValue?: HTMLProps<HTMLInputElement>["defaultValue"];
  /**
   * Convenient prop to be used instead of inputProps.onChange. It also calls the passed callback with the
   * change value instead of input.
   **/
  onChange?: (newValue: string) => void;
  /**
   * Props to be passed to the underlying input element.
   **/
  inputProps?: Omit<
    HTMLProps<HTMLInputElement>,
    "as" | "ref" | "disabled" //isDisabled should be used
  >;
  /**
   * Whether to auto select the value initially
   */
  autoSelect?: boolean;

  /**
   * Validation message shown as a {@link ValidationTooltip} above the field.
   * {@link ValidationTooltipProps#type} is defined based on `validationState`.
   */
  validationMessage?: React.ReactNode;
}

const StyledInput = styled(Input)`
  width: 100%;
`;

const StyledWithLabel = styled(WithLabel)`
  // by default, WithLabel doesn't stretch the labeled content to fill the width of the container. The container
  // width might be set explicitly, based on parent, or based on the label width.
  // This behavior seemed more reasonable as default, but for input field it makes more sense to have the text input
  // fill in the width of the field. For dropdown it seemed more reasonable for the dropdown to not stretch just
  // because the label is long. But it might be something to rethink or maybe even allow to be controlled via an option?
  align-items: normal;
`;

/**
 * An input box with an associated label, error message, and context help.
 */
export const InputField = React.forwardRef(function InputField(
  {
    validationState,
    validationMessage,
    className,
    style,
    labelPlacement = "before",
    contextHelp,
    contextHelpPlacement,
    inputProps = {},
    addonBefore,
    addonAfter,
    inputRef,
    ...props
  }: InputFieldProps,
  forwardedRef: ForwardedRef<HTMLDivElement>
): JSX.Element {
  const ref = useObjectRef(forwardedRef);
  const { fieldProps, errorMessageProps, labelProps, descriptionProps } =
    useField({
      ...props,
      errorMessage: validationMessage,
      validationState:
        validationState === "error" || validationState === "warning"
          ? "invalid"
          : "valid",
    });

  return (
    <StyledWithLabel
      ref={ref}
      label={props.label}
      labelPlacement={labelPlacement}
      isDisabled={props.isDisabled}
      labelProps={labelProps}
      className={className}
      style={style}
    >
      <WithInlineContextHelp
        contextHelp={contextHelp}
        contextHelpPlacement={contextHelpPlacement}
        descriptionProps={descriptionProps}
      >
        <PositionedTooltipTrigger
          placement="top start"
          crossOffset={36}
          showOnFocus
          isDisabled={!validationMessage}
          tooltip={
            <ValidationTooltip
              type={validationState !== "valid" ? validationState : undefined}
            >
              <div {...errorMessageProps}>{validationMessage}</div>
            </ValidationTooltip>
          }
          delay={0}
        >
          <StyledInput
            inputRef={inputRef}
            placeholder={props.placeholder}
            disabled={props.isDisabled}
            validationState={validationState}
            autoSelect={props.autoSelect}
            autoFocus={props.autoFocus}
            addonAfter={addonAfter}
            addonBefore={addonBefore}
            {...mergeProps(fieldProps, inputProps, {
              value: props.value,
              defaultValue: props.defaultValue,
              onChange: (e: ChangeEvent<HTMLInputElement>) =>
                props.onChange?.(e.target.value),
            })}
          />
        </PositionedTooltipTrigger>
      </WithInlineContextHelp>
    </StyledWithLabel>
  );
});
