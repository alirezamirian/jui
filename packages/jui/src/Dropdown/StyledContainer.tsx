import { styled } from "@intellij-platform/core/styled";
import { UnknownThemeProp } from "@intellij-platform/core/Theme";

export const StyledContainer = styled.div<{
  $disabled?: boolean;
  $validationState?: "valid" | "error" | "warning";
}>`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  align-items: center;
  height: 1.5rem;
  background: ${({ theme, $disabled }) =>
    $disabled
      ? theme.color("ComboBox.disabledBackground")
      : theme.color("ComboBox.background")};
  color: ${({ theme, $disabled }) =>
    $disabled
      ? theme.color("ComboBox.disabledForeground")
      : theme.color(
          "ComboBox.foreground" as UnknownThemeProp<"ComboBox.foreground">
        )};
  border: 1px solid
    ${({ theme, $disabled: disabled, $validationState: validationState }) =>
      theme.commonColors.border({
        disabled,
        validationState,
      })};
  // The focus style is applied unconditionally in the reference impl, so no use of focus-visible or js-based focus visible detection

  box-shadow: 0 0 0 0.125rem
    ${({ theme, $validationState: validationState }) =>
      theme.commonColors.focusRing({
        validationState,
        focused: false,
      })};
  &:focus,
  &.is-focus {
    border-color: ${({ theme, $validationState: validationState }) =>
      theme.commonColors.border({
        focused: true,
        validationState,
      })};
    outline: none;
    box-shadow: 0 0 0 0.125rem
      ${({ theme, $validationState: validationState }) =>
        theme.commonColors.focusRing({
          validationState,
          focused: true,
        })};
  }

  border-radius: ${({ theme }) => theme.borderRadius.default}px;
`;
