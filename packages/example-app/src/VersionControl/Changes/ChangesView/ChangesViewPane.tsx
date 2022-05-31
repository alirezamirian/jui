import React, { useEffect } from "react";
import styled from "styled-components";
import { ChangesViewSplitter } from "./ChangesViewSplitter";
import { useChangeListManager } from "../change-lists.state";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ChangesViewPane = () => {
  const { refresh } = useChangeListManager();
  useEffect(() => {
    refresh();
  }, []);
  return (
    <StyledContainer>
      <ChangesViewSplitter />
    </StyledContainer>
  );
};
