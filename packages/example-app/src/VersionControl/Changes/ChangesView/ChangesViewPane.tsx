import React, { useEffect } from "react";
import styled from "styled-components";
import { ChangesViewSplitter } from "./ChangesViewSplitter";
import { useChangeListManager } from "../change-lists.state";
import { rollbackViewState } from "../Rollback/rollbackView.state";
import { RollbackWindow } from "../Rollback/RollbackWindow";
import { useRecoilValue } from "recoil";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ChangesViewPane = () => {
  const { refresh } = useChangeListManager();
  const isRollbackWindowOpen = useRecoilValue(rollbackViewState.isOpen);
  useEffect(() => {
    refresh();
  }, []);
  // FIXME: Rollback window should be moved to upper levels. It should not be coupled with the changes view pane UI
  return (
    <StyledContainer>
      <ChangesViewSplitter />
      {isRollbackWindowOpen && <RollbackWindow />}
    </StyledContainer>
  );
};
