import { styled } from "@intellij-platform/core/styled";
import { UnknownThemeProp } from "@intellij-platform/core/Theme";

export const StyledButton = styled.button<{ isDisabled?: boolean }>`
  box-sizing: border-box;
  min-width: 4.5rem; // https://jetbrains.github.io/ui/controls/button/#28
  padding: 0.25rem 0.875rem; // https://jetbrains.github.io/ui/controls/button/#28
  background-color: ${({ theme, isDisabled }) =>
    isDisabled ? "transparent" : theme.color("Button.startBackground")};
  color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.color("Button.disabledText")
      : theme.color("Button.foreground" as UnknownThemeProp)};
  border: 1px solid
    ${({ theme, isDisabled }) =>
      isDisabled
        ? theme.color("Button.disabledBorderColor")
        : theme.color("Button.startBorderColor")};
  border-radius: ${({ theme }) =>
    (theme.value<number>("Button.arc") ?? 6) / 2}px;
  box-shadow: ${({ theme }) =>
    theme.value("Button.paintShadow")
      ? `0 0 0 ${theme.value("Button.shadowWidth") ?? 2}px ${
          theme.color("Button.shadowColor") ?? // Button.darcula.shadowColor default is skipped.
          (theme.dark ? "#36363680" : "#a6a6a633")
        }`
      : ""};
  white-space: nowrap; // https://jetbrains.github.io/ui/controls/button/#29

  &:focus {
    border-color: ${({ theme }) =>
      theme.color("Button.focusedBorderColor", "#87afda")};
    outline: none;
    box-shadow: ${({ theme }) =>
      `0 0 0 2px ${
        // NOTE: by not using the second argument for default value, we prioritize *.focusColor over the rest.
        theme.color("Component.focusColor") ??
        theme.color("Focus.borderColor" as UnknownThemeProp, "#8ab2eb")
      }`};
  }
`;
export const StyledDefaultButton = styled(StyledButton)`
  background-color: ${({ theme, isDisabled }) =>
    !isDisabled && theme.color("Button.default.startBackground", "#384f6b")};
  color: ${({ theme, isDisabled }) =>
    !isDisabled && theme.color("Button.default.foreground")};
  border-color: ${({ theme, isDisabled }) =>
    !isDisabled && theme.color("Button.default.startBorderColor", "#BFBFBF")};
  &:focus {
    border-color: ${({ theme }) =>
      theme.color("Button.default.focusedBorderColor", "#87afda")};
  }
`;
