import { css } from "styled-components";
import { styled } from "../styled";

type StyledListProps = {
  fillAvailableSpace?: boolean;
};
export const StyledList = styled.div
  .attrs<StyledListProps>((props) => ({ role: props.role || "list" }))
  .withConfig<StyledListProps>({
    shouldForwardProp: (prop) => prop !== "fillAvailableSpace",
  })<StyledListProps>`
  padding: 0;
  margin: 0;
  list-style: none;
  max-height: 100%;
  overflow: auto;
  color: ${({ theme }) => theme.color("*.textForeground")};
  outline: none;
  ${({ fillAvailableSpace }) =>
    fillAvailableSpace &&
    css`
      flex: 1;
      height: fill-available; // will be converted to --webkit-fill-available and --moz-available, but doesn't work in FF
    `}
  background: ${({ theme }) => theme.color("List.background")};
`;
