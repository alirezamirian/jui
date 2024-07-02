import {
  Button,
  InputField,
  ModalWindow,
  styled,
  useBalloonManager,
  WindowLayout,
} from "@intellij-platform/core";
import React, { FormEvent, ReactNode, useState } from "react";
import {
  BranchNameError,
  cleanUpBranchName,
  validateBranchName,
} from "./branch-name-utils";
import { useRecoilValue } from "recoil";
import { repoBranchesState, useRenameBranch } from "./branches.state";

const StyledContainer = styled.div`
  padding: 0.5rem 1rem;
`;
const StyledInputField = styled(InputField)`
  width: 100%;
`;

export const ErrorMessages: Record<
  BranchNameError,
  (branchName: string) => ReactNode
> = {
  EXISTING: (branchName: string) => (
    <>
      Branch name {branchName} already exists <br />
    </>
  ),
  CLASHING_WITH_REMOTE: (branchName: string) => (
    <>
      Branch name {branchName} clashes with remote branch <br />
      with the same name
    </>
  ),
};

export function RenameBranchWindow({
  branchName,
  repoRoot,
  close,
}: {
  branchName: string;
  repoRoot: string;
  close: () => void;
}) {
  const [newBranchName, setNewBranchName] = useState(branchName);
  const [touched, setTouched] = useState(false);
  const balloonManager = useBalloonManager();
  const branches = useRecoilValue(repoBranchesState(repoRoot));
  const renameBranch = useRenameBranch();

  const error = validateBranchName(branches, newBranchName);
  const validationState = error && touched ? "error" : "valid";

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!error) {
      renameBranch(branches.repoRoot, branchName, newBranchName)
        .catch((e) => {
          balloonManager.show({
            icon: "Error",
            title: "Unexpected error",
            body: `Could not rename branch ${branchName} to ${newBranchName}.`,
          });
          console.error("Branch rename error: ", e);
        })
        .then(() => {
          close();
          // TODO: show toolwindow balloon, when/if git toolwindow is added
        });
    } else {
      setTouched(true);
    }
  };
  return (
    <ModalWindow minWidth="content" minHeight="content">
      <WindowLayout
        header={`Rename branch ${branchName}`}
        content={
          <StyledContainer>
            <form id="branch_rename_form" onSubmit={onSubmit}>
              <StyledInputField
                labelPlacement="above"
                label="New branch name:"
                value={newBranchName}
                onChange={(newValue) => {
                  setNewBranchName(cleanUpBranchName(newValue));
                  setTouched(true);
                }}
                validationState={validationState}
                validationMessage={
                  error && validationState === "error"
                    ? ErrorMessages[error]?.(branchName)
                    : undefined
                }
              />
            </form>
          </StyledContainer>
        }
        footer={
          <WindowLayout.Footer
            right={
              <>
                <Button onPress={close}>Cancel</Button>
                <Button
                  variant="default"
                  type="submit"
                  form="branch_rename_form"
                  isDisabled={Boolean(error) && touched}
                >
                  Rename
                </Button>
              </>
            }
          />
        }
      />
    </ModalWindow>
  );
}
