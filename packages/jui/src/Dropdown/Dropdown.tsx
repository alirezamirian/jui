import React, { CSSProperties, ForwardedRef, forwardRef } from "react";
import { AriaSelectProps, useSelect } from "@react-aria/select";
import { useObjectRef } from "@react-aria/utils";
import { useSelectState } from "@react-stately/select";
import { styled } from "@intellij-platform/core/styled";
import { BareButton } from "@intellij-platform/core/Button";
import { Popover } from "@intellij-platform/core/Overlay";
import { ContextHelpProps, WithInlineContextHelp } from "../Field/ContextHelp";
import { StatelessListBox } from "./StatelessListBox";
import { StyledContainer } from "./StyledContainer";
import { LabelPlacement, WithLabel } from "../Field/Label";
import { StyledDropdownArrowIcon } from "./StyledDropdownArrowIcon";

export interface DropdownProps<T extends object>
  extends Omit<AriaSelectProps<T>, "validationState">,
    ContextHelpProps {
  labelPlacement?: LabelPlacement;
  className?: string;
  style?: CSSProperties;
  validationState?: "valid" | "error" | "warning";
}

const StyledDropdownContainer = styled(StyledContainer)`
  background: ${({ theme }) => theme.color("ComboBox.nonEditableBackground")};
`;

const StyledDropdownValue = styled.span`
  flex: 1;
  text-align: initial;
  white-space: nowrap;
  margin-right: 5px;
`;

export const Dropdown = forwardRef(
  <T extends object>(
    {
      labelPlacement,
      style,
      className,
      validationState,
      contextHelp,
      contextHelpPlacement,
      ...props
    }: DropdownProps<T>,
    forwardedRef: ForwardedRef<HTMLButtonElement>
  ): React.JSX.Element => {
    const ref = useObjectRef(forwardedRef);
    const state = useSelectState(props);
    const {
      menuProps,
      labelProps,
      triggerProps,
      valueProps,
      descriptionProps,
    } = useSelect(
      { ...props, isInvalid: validationState && validationState !== "valid" },
      state,
      ref
    );

    // minWidth is not kept in the state, assuming it's unnecessary, considering the width is expected to be
    // stable when the popover opens.
    const minWidth = ref.current
      ? ref.current?.offsetWidth + 2 /* for box shadow*/
      : undefined;

    return (
      <WithLabel
        label={props.label}
        labelPlacement={labelPlacement}
        labelProps={labelProps}
        isDisabled={props.isDisabled}
        className={className}
        style={style}
      >
        {/* probably no need for HiddenSelect as auto-filling doesn't seem relevant for applications using this library */}
        <WithInlineContextHelp
          contextHelp={contextHelp}
          contextHelpPlacement={contextHelpPlacement}
          descriptionProps={descriptionProps}
        >
          <BareButton {...triggerProps} autoFocus={props.autoFocus} ref={ref}>
            <StyledDropdownContainer
              as="button"
              $validationState={validationState}
              $disabled={props.isDisabled}
              className={state.isOpen ? "is-focus" : ""}
            >
              <StyledDropdownValue {...valueProps}>
                {state.selectedItem?.rendered}
              </StyledDropdownValue>
              <StyledDropdownArrowIcon
                disabled={props.isDisabled}
                size={20}
                icon="general/arrowDown.svg"
              />
            </StyledDropdownContainer>
          </BareButton>
        </WithInlineContextHelp>
        {state.isOpen && (
          <Popover
            state={state}
            triggerRef={ref}
            placement="bottom start"
            containerPadding={0}
            offset={2}
            crossOffset={-1}
          >
            <StatelessListBox
              {...menuProps}
              state={state}
              style={{ minWidth }}
            />
          </Popover>
        )}
      </WithLabel>
    );
  }
);
