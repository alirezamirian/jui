import { styled } from "../styled";

export const StyledList = styled.ul<{ fillAvailableSpace?: boolean }>`
  padding: 0;
  margin: 0;
  list-style: none;
  max-height: 100%;
  overflow: auto;
  color: ${({ theme }) => theme.color("*.textForeground")};
  outline: none;
  flex: ${({ fillAvailableSpace }) => (fillAvailableSpace ? "1" : undefined)};
  background: ${({ theme }) =>
    theme.color(
      "Panel.background"
    )}; // FIXME: not correct for all themes. Maybe no background for list at all.
`;
