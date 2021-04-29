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
      ? theme.ui.MenuItem.disabledForeground // couldn't find a better value
      : common.textForeground;
    if (selected) {
      if (listFocused) {
        color = common.selectionForeground["os.mac"]; // why mac is different!
        backgroundColor = common.selectionBackground["os.default"];
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
