import React from "react";
import styled from "styled-components";
import { useAtomValue } from "jotai";
import { vcsRootsAtom } from "../../file-status.state";
import { ChangesViewSplitter } from "./ChangesViewSplitter";
import { ChangesViewZeroState } from "./ChangesViewZeroState";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ChangesViewPane = () => {
  const vcsRoots = useAtomValue(vcsRootsAtom);
  return (
    <StyledContainer>
      {vcsRoots.length > 0 ? <ChangesViewSplitter /> : <ChangesViewZeroState />}
    </StyledContainer>
  );
};
