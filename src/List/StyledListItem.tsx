import styled from "@emotion/styled";

export const StyledListItem = styled.li(
  ({ listFocused, selected }: { listFocused: boolean; selected: boolean }) => {
    let backgroundColor;
    let color = "#bbb";
    if (selected) {
      if (listFocused) {
        color = "#fff";
        backgroundColor = "#1465D1";
      } else {
        backgroundColor = "#032b40";
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
