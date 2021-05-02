import { styled } from "../styled";

type Props = {
  listFocused: boolean;
  selected: boolean;
  disabled: boolean;
};

export const StyledListItem = styled.li<Props>(
  ({ listFocused, selected, disabled, theme }) => {
    const common = theme.ui["*"];
    let backgroundColor;
    let color = disabled
      ? theme.ui.colors?.disabledForeground || "#8C8C8C" // FIXME: fallbacks should not be inlined
      : common.textForeground || common.foreground;
    if (selected) {
      if (listFocused) {
        color = theme.colors?.selectionForeground || common.selectionForeground;
        backgroundColor = common.selectionBackground;
      } else {
        backgroundColor = common.selectionBackgroundInactive;
      }
    }
    return {
      backgroundColor,
      color,
      paddingLeft: 8,
      lineHeight: "20px",
      outline: "none",
      cursor: "default",
    };
  }
);
