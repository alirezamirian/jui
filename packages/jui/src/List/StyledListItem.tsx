import { UnknownThemeProp } from "@intellij-platform/core/Theme";
import { styled } from "../styled";

export type StyledListItemProps = {
  containerFocused: boolean;
  selected: boolean;
  disabled: boolean;
};

export const StyledListItem = styled.div.attrs<StyledListItemProps>({
  role: "listitem",
})<StyledListItemProps>`
  ${({ containerFocused, selected, disabled, theme }) => {
    let backgroundColor;
    let color = disabled
      ? theme.color("*.disabledForeground")
      : theme.color(
          "List.foreground" as UnknownThemeProp<"List.foreground">,
          theme.commonColors.labelForeground
        );
    if (selected) {
      if (containerFocused) {
        color = theme.asCurrentForeground(
          theme.color(
            "List.selectionForeground" as UnknownThemeProp<"List.selectionForeground">
          ) || theme.commonColors.labelSelectedForeground
        ) /* Prioritizing "*.selectionForeground" over labelSelectedForeground*/;
        backgroundColor = theme.color(
          "List.selectionBackground" as UnknownThemeProp<"List.selectionBackground">
        );
      } else {
        color = theme.color(
          "List.selectionInactiveForeground" as UnknownThemeProp<"List.selectionInactiveForeground">,
          color
        );
        backgroundColor = theme.color(
          "List.selectionBackgroundInactive" as UnknownThemeProp<"List.selectionBackgroundInactive">
        );
      }
    }
    return {
      backgroundColor: theme.asCurrentBackground(backgroundColor),
      color,
    };
  }};
  position: relative;
  display: flex;
  white-space: nowrap;
  padding: 0 0.5rem; // themed?
  line-height: 1.25rem;
  outline: none;
  cursor: default;
`;
