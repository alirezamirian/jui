import { styled } from "../styled";

export const StyledList = styled.ul<{ fillAvailableSpace: boolean }>(
  ({ fillAvailableSpace, theme }) => ({
    padding: 0,
    margin: 0,
    flex: fillAvailableSpace ? "1" : undefined,
    listStyle: "none",
    color: theme.ui["*"].textForeground,
    background: theme.ui["*"].background,
    // focus state is always hinted by different color of selected item(s) when focused.
    outline: "none",
    overflow: "auto",
  })
);
