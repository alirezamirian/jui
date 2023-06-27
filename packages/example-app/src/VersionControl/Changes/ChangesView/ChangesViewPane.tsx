import React, { useEffect } from "react";
import styled from "styled-components";
import { ChangesViewSplitter } from "./ChangesViewSplitter";
import { useRefreshChanges } from "../change-lists.state";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ChangesViewPane = () => {
  const refresh = useRefreshChanges();
  useEffect(() => {
    refresh();
  }, []);
  return (
    <StyledContainer>
      <ChangesViewSplitter />
    </StyledContainer>
  );
};
