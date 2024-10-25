import { WINDOW_SHADOW } from "@intellij-platform/core/style-constants";
import { styled } from "@intellij-platform/core/styled";

export const StyledPopupContainer = styled.div`
  position: fixed;
  box-sizing: border-box;
  // not checked if there should be a better substitute for * in the following colors. Maybe "Component"?
  background-color: ${({ theme }) => theme.color("*.background")};
  color: ${({ theme }) => theme.color("*.foreground")};
  outline: none; // Focus will be reflected in header. No need for outline or any other focus style on the container
  ${WINDOW_SHADOW}; // FIXME: OS-dependant style?
`;
