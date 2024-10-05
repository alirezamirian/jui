import React, {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  HTMLProps,
  useRef,
} from "react";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import { useFilter } from "@react-aria/i18n";
import { AriaComboBoxProps, useComboBox } from "@react-aria/combobox";
import { useComboBoxState } from "@react-stately/combobox";
import { styled } from "@intellij-platform/core/styled";
import { UnknownThemeProp } from "@intellij-platform/core/Theme";
import { ControlledStateProps } from "@intellij-platform/core/type-utils";
import { BareButton } from "@intellij-platform/core/Button";
import { Popover } from "@intellij-platform/core/Overlay";
import { StatelessListBox } from "./StatelessListBox";
import { StyledContainer } from "./StyledContainer";
import { LabelPlacement, WithLabel } from "../Field/Label";
import { StyledDropdownArrowIcon } from "./StyledDropdownArrowIcon";
import {
  PositionedTooltipTrigger,
  ValidationTooltip,
} from "@intellij-platform/core/Tooltip";
import {
  ContextHelpProps,
  WithInlineContextHelp,
} from "@intellij-platform/core/Field/ContextHelp";

type AriaProps<T> = {
  [K in keyof T as K extends `aria-${string}` ? K : never]: T[K];
};

export interface ComboBoxProps<T extends object>
  extends Pick<
      AriaComboBoxProps<T>,
      | "disabledKeys"
      | "defaultSelectedKey"
      | "selectedKey"
      | "isDisabled"
      | "children"
      | "items"
      | "label"
      | "autoFocus"
      | "menuTrigger"
      | "placeholder"
      | "onFocus"
      | "onBlur"
      | "onKeyDown"
      | "onKeyUp"
      | "onOpenChange"
      | "onFocusChange"
      | "onSelectionChange"
    >,
    AriaProps<AriaComboBoxProps<T>>,
    ControlledStateProps<{
      value: string;
    }>,
    ContextHelpProps {
  labelPlacement?: LabelPlacement;
  className?: string;
  style?: CSSProperties;

  validationState?: "valid" | "error" | "warning";

  /**
   * Validation message shown as a {@link ValidationTooltip} above the component.
   * {@link ValidationTooltipProps#type} is defined based on `validationState`.
   */
  validationMessage?: React.ReactNode;

  /**
   * props to apply on input, excluding value that's controlled by the component
   */
  inputProps?: Omit<
    HTMLProps<HTMLInputElement>,
    "value" | "defaultValue" | "as"
  >;
}

const StyledComboBoxContainer = styled(StyledContainer)`
  padding: 0;
  color: ${({ theme, disabled }) =>
    disabled
      ? theme.color(
          "TextField.disabledForeground" as UnknownThemeProp<"TextField.disabledForeground">
        )
      : theme.color(
          "TextField.foreground" as UnknownThemeProp<"TextField.foreground">
        )};
`;
const StyledComboBoxInput = styled.input`
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: inherit;
  padding: ${({ theme }) =>
    theme.inset("ComboBox.padding") ?? "1px 6px 1px 6px"};
  height: 100%;
`;

const StyledDropdownButton = styled.button`
  // Resetting default styles
  appearance: none;
  border: none;
  background: ${({ theme }) => theme.color("ComboBox.ArrowButton.background")};
  outline: none;
  font: inherit;
  padding: 0;

  // Custom styles
  border-left: 1px solid ${({ theme }) => theme.commonColors.border()};
  height: 100%;
  aspect-ratio: 1;
  /**
   * In the reference impl, the clickable area exceeds the left border by a
   * few pixels. The following trick implements that
   */
  position: relative;
  ::before {
    content: "";
    position: absolute;
    left: -4px;
    top: 0;
    bottom: 0;
    width: 4px;
  }
`;

/**
 * [Combobox](https://plugins.jetbrains.com/docs/intellij/combo-box.html) implementation.
 * Known differences with the reference impl:
 * - selected key doesn't focus when opened the dropdown manually.
 *   Opening the dropdown by pressing ArrowDown does focus the previously selected item.
 */
export const ComboBox = forwardRef(
  <T extends object>(
    {
      labelPlacement,
      style,
      className,
      value,
      defaultValue,
      onValueChange,
      validationState,
      validationMessage,
      contextHelp,
      contextHelpPlacement,
      inputProps,
      ...props
    }: ComboBoxProps<T>,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ): React.JSX.Element => {
    const ref = useObjectRef(forwardedRef);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownContainerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const listBoxRef = useRef<HTMLDivElement>(null);
    const isInvalid = Boolean(validationState) && validationState !== "valid";

    const state = useComboBoxState({
      // defaultFilter not provided based on how ComboBoxes don't filter based on input in Intellij Platform
      // filtering can still be implemented by controlling `value` and `items`.
      menuTrigger: "manual", // overridable via props
      allowsCustomValue: true,
      inputValue: value,
      defaultInputValue: defaultValue,
      onInputChange: onValueChange,
      isInvalid,
      ...props,
    });
    const {
      descriptionProps,
      errorMessageProps,
      labelProps,
      inputProps: comboboxInputProps,
      listBoxProps,
      buttonProps,
    } = useComboBox(
      {
        ...props,
        allowsCustomValue: true,
        buttonRef,
        inputRef,
        popoverRef,
        listBoxRef,
      },
      state
    );

    // minWidth is not kept in the state, assuming it's unnecessary, considering the width is expected to be
    // stable when the popover opens.
    const minWidth = dropdownContainerRef.current
      ? dropdownContainerRef.current?.offsetWidth + 2 /* for box shadow*/
      : undefined;
    return (
      <>
        <WithLabel
          ref={ref}
          isDisabled={props.isDisabled}
          label={props.label}
          labelPlacement={labelPlacement}
          labelProps={labelProps}
          className={className}
          style={style}
        >
          {/* probably no need for HiddenSelect as autofilling doesn't seem relevant for applications using this library */}
          <WithInlineContextHelp
            contextHelp={contextHelp}
            contextHelpPlacement={contextHelpPlacement}
            descriptionProps={descriptionProps}
          >
            <StyledComboBoxContainer
              ref={dropdownContainerRef}
              validationState={validationState}
              disabled={props.isDisabled}
              className={state.isFocused ? "is-focus" : ""}
            >
              {/* FIXME: tooltip comes and goes on mouse enter/leave, which is especially weird when trying to open options */}
              <PositionedTooltipTrigger
                placement="top"
                showOnFocus
                isDisabled={!validationMessage}
                triggerRef={inputRef}
                tooltip={
                  <ValidationTooltip
                    type={
                      validationState !== "valid" ? validationState : undefined
                    }
                  >
                    <div {...errorMessageProps}>{validationMessage}</div>
                  </ValidationTooltip>
                }
                delay={0}
              >
                {(tooltipTriggerProps) => (
                  <StyledComboBoxInput
                    {...mergeProps(
                      comboboxInputProps,
                      inputProps,
                      tooltipTriggerProps
                    )}
                  />
                )}
              </PositionedTooltipTrigger>

              <BareButton {...buttonProps} ref={buttonRef}>
                <StyledDropdownButton>
                  <StyledDropdownArrowIcon
                    disabled={props.isDisabled}
                    size={20}
                    icon="general/arrowDown.svg"
                  />
                </StyledDropdownButton>
              </BareButton>
            </StyledComboBoxContainer>
          </WithInlineContextHelp>
        </WithLabel>
        {state.isOpen && (
          <Popover
            ref={popoverRef}
            state={state}
            triggerRef={dropdownContainerRef}
            placement="bottom start"
            containerPadding={0}
            offset={2}
            crossOffset={-1}
          >
            <StatelessListBox
              {...listBoxProps}
              ref={listBoxRef}
              state={state}
              minWidth={minWidth}
            />
          </Popover>
        )}
      </>
    );
  }
);
