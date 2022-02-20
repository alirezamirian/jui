import React from "react";
import styled from "styled-components";
import { ChangesViewSplitter } from "./ChangesViewSplitter";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ChangesViewPane = () => {
  return (
    <StyledContainer>
      <ChangesViewSplitter />
    </StyledContainer>
  );
};
