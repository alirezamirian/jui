import React from "react";
import {
  AutoHoverPlatformIcon,
  BareButton,
  MenuTrigger,
  MenuTriggerProps,
  PlatformIcon,
  styled,
} from "@intellij-platform/core";

const StyledDropdownButton = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding-left: 0.25rem;
  cursor: pointer;
  background: ${({ theme }) => theme.color("ComboBoxButton.background")};
  color: ${({ theme }) => theme.commonColors.label({ disabled: true })};

  line-height: 1.5;
  border-radius: 0.25rem;
  white-space: nowrap;
  border: 2px solid transparent;
  &:hover {
    color: ${({ theme }) => theme.color("*.foreground")};
  }
  &:focus-visible {
    border-color: ${({ theme }) =>
      theme.commonColors.focusRing({ focused: true })};
  }
`;

const StyledDropdownIcon = styled.span`
  margin-left: -1px;
  line-height: 1.2;
`;

const StyledValue = styled.span`
  color: ${({ theme }) => theme.color("*.foreground")};
  max-width: 8.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FocusableAutoHoverPlatformIcon = styled(AutoHoverPlatformIcon)`
  &:focus-visible {
    outline: 2px solid
      ${({ theme }) => theme.commonColors.focusRing({ focused: true })};
    outline-offset: -2px;
  }
`;
export function VcsFilterDropdown({
  label,
  value,
  onClear,
  ...menuTriggerProps
}: Omit<MenuTriggerProps, "children"> & {
  label: React.ReactNode;
  value?: React.ReactNode;
  onClear?: () => void;
}) {
  return (
    <MenuTrigger {...menuTriggerProps}>
      {(props, ref) => (
        <StyledDropdownButton {...props} ref={ref}>
          {label}
          {value ? (
            <>
              : <StyledValue>{value}</StyledValue>
              <BareButton onPress={onClear}>
                <FocusableAutoHoverPlatformIcon
                  icon="actions/close"
                  hoverIcon="actions/closeHovered"
                />
              </BareButton>
            </>
          ) : (
            <StyledDropdownIcon>
              <PlatformIcon icon="general/arrowDownSmall.svg" />
            </StyledDropdownIcon>
          )}
        </StyledDropdownButton>
      )}
    </MenuTrigger>
  );
}
