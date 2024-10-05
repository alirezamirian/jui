import { PlatformIcon } from "@intellij-platform/core/Icon";
import { styled } from "@intellij-platform/core/styled";

export const StyledDropdownArrowIcon = styled(PlatformIcon).attrs<{
  disabled?: boolean;
}>({
  "aria-hidden": "true",
})`
  // NOTE: "ArrowButton.nonEditableBackground" theme key is used in the reference impl, but it doesn't seem necessary to allow
  // for a separate arrow background in Dropdown (aka non-editable combobox), since the arrow is not really a
  // separate button, but a visual indicator for the whole trigger. Also there is no mention of it in designs
  // There is also separate theme properties for color and disabled color, but inheriting it (via currentColor)
  // makes more sense

  * {
    fill: ${({ theme, disabled }) =>
      disabled
        ? theme.color("ComboBox.ArrowButton.disabledIconColor")
        : theme.color("ComboBox.ArrowButton.iconColor")};
  }
`;
