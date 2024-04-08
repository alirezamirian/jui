import { styled } from "@intellij-platform/core/styled";
import { StyledList } from "@intellij-platform/core/List/StyledList";

export const StyledTree = styled(StyledList).attrs({ role: "tree" as string })`
  background: ${({ theme }) => theme.color("Tree.background")};
`;
