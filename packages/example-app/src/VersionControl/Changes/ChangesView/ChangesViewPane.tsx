import React from "react";
import styled from "styled-components";
import { ChangesViewSplitter } from "./ChangesViewSplitter";
import { vcsRootsState } from "../../file-status.state";
import { useRecoilValue } from "recoil";
import { ChangesViewZeroState } from "./ChangesViewZeroState";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ChangesViewPane = () => {
  const vcsRoots = useRecoilValue(vcsRootsState);
  return (
    <StyledContainer>
      {vcsRoots.length > 0 ? <ChangesViewSplitter /> : <ChangesViewZeroState />}
    </StyledContainer>
  );
};
