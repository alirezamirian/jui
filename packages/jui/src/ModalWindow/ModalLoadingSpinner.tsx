import React from "react";
import { styled } from "@intellij-platform/core/styled";
import { DelayedLoadingSpinner } from "../LoadingSpinner";

const StyledModalLoadingContainer = styled.div`
  position: fixed;
  inset: 0;
  align-content: center;
  z-index: 9999999;
`;

const StyledDelayedLoadingSpinner = styled(DelayedLoadingSpinner)`
  display: block;
  margin: auto;
`;

export const ModalLoadingSpinner = () => {
  return (
    <StyledModalLoadingContainer>
      <StyledDelayedLoadingSpinner />
    </StyledModalLoadingContainer>
  );
};
