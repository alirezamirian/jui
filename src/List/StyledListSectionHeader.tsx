import { styled } from "../styled";

export const StyledListSectionHeader = styled.li(({ theme }) => ({
  paddingLeft: 8,
  fontWeight: "bold",
  lineHeight: "20px",
  outline: "none",
  cursor: "default",
  color: theme.color("*.textForeground", theme.color("*.foreground")),
}));
