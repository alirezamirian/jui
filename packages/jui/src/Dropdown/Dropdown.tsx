import React, { CSSProperties, ForwardedRef, forwardRef } from "react";
import { AriaSelectProps, useSelect } from "@react-aria/select";
import { useObjectRef } from "@react-aria/utils";
import { useSelectState } from "@react-stately/select";

import { styled } from "@intellij-platform/core/styled";
import { Label } from "@intellij-platform/core/Label";

import { PlatformIcon } from "../Icon";
import { BareButton } from "../Button";
import { Popover } from "../Overlay";
import { StatelessListBox } from "./StatelessListBox";

export interface DropdownProps<T extends object> extends AriaSelectProps<T> {
  labelPlacement?: LabelPlacement;
  className?: string;
  style?: CSSProperties;
}

// NOTE: LabelPlacement, StyledLabelContainer and StyledLabel copied from InputField and can be made reusable.
type LabelPlacement = "above" | "before";
const StyledLabelContainer = styled.div<{ labelPlacement?: LabelPlacement }>`
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

const StyledDropdownTrigger = styled.button<{
  disabled?: boolean;
  invalid?: boolean;
}>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  height: 1.5rem;
  background: ${({ theme }) => theme.color("ComboBox.nonEditableBackground")};
  color: ${({ theme, disabled }) =>
    disabled
      ? theme.color("*.disabledForeground")
      : theme.color("*.foreground")};
  border: 1px solid
    ${({ theme, disabled, invalid }) =>
      theme.commonColors.border({
        disabled,
        validationState: invalid ? "error" : "valid",
      })};
  // The focus style is applied unconditionally in the reference impl, so no use of focus-visible or js-based focus visible detection

  &:focus,
  &.is-focus {
    border-color: ${({ theme, invalid }) =>
      theme.commonColors.border({
        focused: true,
        validationState: invalid ? "error" : "valid",
      })};
    outline: none;
    box-shadow: 0 0 0 0.125rem
      ${({ theme, invalid }) =>
        theme.commonColors.focusRing({
          validationState: invalid ? "error" : "valid",
          focused: true,
        })};
  }

  border-radius: ${({ theme }) => theme.borderRadius.default}px;
  padding: ${({ theme }) =>
    theme.inset("ComboBox.padding") ?? "1px 6px 1px 6px"};
`;

const StyledDropdownValue = styled.span`
  flex: 1;
  text-align: initial;
  white-space: nowrap;
`;

const StyledDropdownArrowIcon = styled(PlatformIcon).attrs({
  "aria-hidden": "true",
})`
  // NOTE: "ArrowButton.nonEditableBackground" theme key is used in the reference impl, but it doesn't seem necessary to allow
  // for a separate arrow background in Dropdown (aka non-editable combobox), since the arrow is not really a
  // separate button, but a visual indicator for the whole trigger. Also there is no mention of it in designs
  // There is also separate theme properties for color and disabled color, but inheriting it (via currentColor)
  // makes more sense
  padding-left: 5px;
  * {
    fill: currentColor;
  }
`;

export const Dropdown = forwardRef(
  <T extends object>(
    { labelPlacement, style, className, ...props }: DropdownProps<T>,
    forwardedRef: ForwardedRef<HTMLButtonElement>
  ): React.JSX.Element => {
    const ref = useObjectRef(forwardedRef);
    const state = useSelectState(props);
    const { menuProps, labelProps, triggerProps, valueProps, isInvalid } =
      useSelect(props, state, ref);

    // minWidth is not kept in the state, assuming it's not needed, considering the width is expected to be
    // stable when the popover opens.
    const minWidth = ref.current
      ? ref.current?.offsetWidth + 2 /* for box shadow*/
      : undefined;

    return (
      <StyledLabelContainer
        labelPlacement={labelPlacement}
        className={className}
        style={style}
      >
        {/* probably no need for HiddenSelect as auto-filling doesn't seem relevant for applications using this library */}
        {props.label && (
          <StyledLabel {...labelProps}>{props.label}</StyledLabel>
        )}
        <BareButton {...triggerProps} ref={ref}>
          <StyledDropdownTrigger
            invalid={isInvalid}
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
          </StyledDropdownTrigger>
        </BareButton>
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
              minWidth={minWidth}
            />
          </Popover>
        )}
      </StyledLabelContainer>
    );
  }
);
