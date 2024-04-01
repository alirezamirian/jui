import React, { useEffect } from "react";
import styled from "styled-components";
import { ChangesViewSplitter } from "./ChangesViewSplitter";
import { useRefreshRepoStatuses } from "../../file-status.state";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ChangesViewPane = () => {
  const refresh = useRefreshRepoStatuses();
  useEffect(() => {
    refresh();
  }, []);
  return (
    <StyledContainer>
      <ChangesViewSplitter />
    </StyledContainer>
  );
};
