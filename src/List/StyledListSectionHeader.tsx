import { styled } from "../styled";

export const StyledListSectionHeader = styled.li(({ theme }) => ({
  paddingLeft: 8,
  fontWeight: "bold",
  lineHeight: "20px",
  outline: "none",
  cursor: "default",
  color: theme.ui["*"]?.textForeground || theme.ui["*"]?.foreground,
}));
