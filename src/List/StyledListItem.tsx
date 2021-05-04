import { styled } from "../styled";

export type StyledListItemProps = {
  containerFocused: boolean;
  selected: boolean;
  disabled: boolean;
};

export const StyledListItem = styled.li<StyledListItemProps>(
  ({ containerFocused, selected, disabled, theme }) => {
    const common = theme.ui["*"];
    let backgroundColor;
    let color = disabled
      ? theme.ui.colors?.disabledForeground || "#8C8C8C" // FIXME: fallbacks should not be inlined
      : common.textForeground || common.foreground;
    if (selected) {
      if (containerFocused) {
        color = theme.colors?.selectionForeground || common.selectionForeground;
        backgroundColor = common.selectionBackground;
      } else {
        backgroundColor = common.selectionBackgroundInactive;
      }
    }
    return {
      backgroundColor,
      color,
      position: "relative",
      paddingLeft: 8, // themed?
      lineHeight: "20px",
      outline: "none",
      cursor: "default",
    };
  }
);
