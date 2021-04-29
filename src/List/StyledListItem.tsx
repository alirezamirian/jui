import { styled } from "../styled";

type Props = {
  listFocused: boolean;
  selected: boolean;
  disabled: boolean;
};

export const StyledListItem = styled.li<Props>(
  ({ listFocused, selected, disabled, theme }) => {
    let backgroundColor;
    let color = disabled ? "#808080" : "#bbb";
    if (selected) {
      if (listFocused) {
        color = "#fff";
        backgroundColor = theme.ui["*"].selectionBackground["os.default"];
      } else {
        backgroundColor = theme.ui["*"].selectionBackgroundInactive;
      }
    }
    return {
      backgroundColor,
      color,
      height: 20,
      paddingLeft: 8,
      lineHeight: "20px",
      outline: "none",
      cursor: "default",
    };
  }
);
