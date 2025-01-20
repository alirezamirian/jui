import React from "react";
import {
  CommonActionId,
  styled,
  useAction,
  useGetActionShortcut,
} from "@intellij-platform/core";

const StyledContainer = styled.div.attrs({ tabIndex: -1 })`
  display: flex;
  flex-direction: column;
  height: inherit;
  justify-content: center;
  padding: 0 25%;
  font-size: 1rem;
  outline: none;
`;

const StyledLine = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const StyledShortcut = styled.div`
  color: ${({ theme }) => theme.commonColors.linkForegroundEnabled};
`;

export function EditorZeroState() {
  return (
    <StyledContainer data-testid="EditorZeroState">
      <ActionTip actionId={CommonActionId.GO_TO_FILE} />
      <ActionTip actionId={CommonActionId.GO_TO_ACTION} />
    </StyledContainer>
  );
}

function ActionTip({ actionId }: { actionId: string }) {
  const getShortcut = useGetActionShortcut();
  const action = useAction(actionId);
  return (
    <StyledLine>
      {action?.title}
      <StyledShortcut>{getShortcut(actionId)}</StyledShortcut>
    </StyledLine>
  );
}
