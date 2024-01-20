import React, {
  ChangeEvent,
  CSSProperties,
  ForwardedRef,
  HTMLProps,
} from "react";
import { styled } from "@intellij-platform/core/styled";
import { AriaFieldProps, useField } from "@react-aria/label";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import { FocusableProps } from "@react-types/shared";
import { Label } from "@intellij-platform/core/Label";
import {
  PositionedTooltipTrigger,
  ValidationTooltip,
} from "@intellij-platform/core/Tooltip";
import { Input, InputProps } from "@intellij-platform/core/InputField/Input";

type LabelPlacement = "above" | "before";

export interface InputFieldProps
  extends Omit<AriaFieldProps, "labelElementType">,
    FocusableProps,
    Pick<InputProps, "addonBefore" | "addonAfter"> {
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
   * Context help, shown below the input. A typical use case is
   * [to provide example values](https://jetbrains.github.io/ui/principles/context_help/#07).
   */
  contextHelp?: React.ReactNode;
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
}

const StyledInputContainer = styled.div<{ labelPlacement?: LabelPlacement }>`
  display: inline-flex;
  flex-direction: ${({ labelPlacement }) =>
    labelPlacement === "above" ? "column" : "row"};
  align-items: start;
  gap: 0.375rem;
`;

const StyledLabel = styled(Label)`
  margin-top: 0.25rem;
  line-height: 1.2;
`;
const StyledContextHelp = styled.div`
  color: ${({ theme }) => theme.commonColors.contextHelpForeground};
`;

const StyledBoxAndContextHelpWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.25rem; /* Not checked with the reference impl */
`;

/**
 * An input box with an associated label, error message, and context help.
 */
export const InputField = React.forwardRef(function InputField(
  {
    className,
    style,
    labelPlacement = "before",
    contextHelp,
    inputProps = {},
    addonBefore,
    addonAfter,
    ...props
  }: InputFieldProps,
  forwardedRef: ForwardedRef<HTMLInputElement>
): JSX.Element {
  const ref = useObjectRef(forwardedRef);
  const { fieldProps, errorMessageProps, labelProps, descriptionProps } =
    useField(props);

  return (
    <StyledInputContainer
      labelPlacement={labelPlacement}
      className={className}
      style={style}
    >
      <StyledLabel {...labelProps} disabled={props.isDisabled}>
        {props.label}
      </StyledLabel>
      <StyledBoxAndContextHelpWrapper>
        <PositionedTooltipTrigger
          placement="top start"
          crossOffset={36}
          showOnFocus
          isDisabled={!props.errorMessage}
          tooltip={
            <ValidationTooltip>
              <div {...errorMessageProps}>{props.errorMessage}</div>
            </ValidationTooltip>
          }
          delay={0}
        >
          <Input
            ref={ref}
            placeholder={props.placeholder}
            disabled={props.isDisabled}
            validationState={props.validationState}
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
        {contextHelp && (
          <StyledContextHelp {...descriptionProps}>
            {contextHelp}
          </StyledContextHelp>
        )}
      </StyledBoxAndContextHelpWrapper>
    </StyledInputContainer>
  );
});
