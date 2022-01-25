import { styled } from "../styled";

export type StyledListItemProps = {
  containerFocused: boolean;
  selected: boolean;
  disabled: boolean;
};

export const StyledListItem = styled.li<StyledListItemProps>(
  ({ containerFocused, selected, disabled, theme }) => {
    let backgroundColor;
    let color = disabled
      ? theme.color("*.disabledForeground")
      : theme.color("*.textForeground", theme.color("*.foreground"));
    if (selected) {
      if (containerFocused) {
        color = theme.color(
          "*.selectionForeground",
          theme.color("*.acceleratorSelectionForeground")
        );
        backgroundColor = theme.color("*.selectionBackground");
      } else {
        backgroundColor = theme.color("*.selectionBackgroundInactive");
      }
    }
    return {
      backgroundColor,
      color,
      position: "relative",
      display: "flex",
      whiteSpace: "nowrap",
      paddingLeft: 8, // themed?
      lineHeight: "20px",
      outline: "none",
      cursor: "default",
      minWidth: "min-content", // ?
    };
  }
);
