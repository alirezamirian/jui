import { styled, UnknownThemeProp } from "jui";

export const StyledTabs = styled.div`
  display: flex;
  box-sizing: border-box;
  border-color: ${({ theme }) =>
    theme.color(
      "DefaultTabs.borderColor" as UnknownThemeProp,
      theme.commonColors.contrastBorder
    )};
  border-style: solid;
  border-width: 1px 0;
`;
