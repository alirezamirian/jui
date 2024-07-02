import {
  Button,
  Checkbox,
  InputField,
  ModalWindow,
  styled,
  useBalloonManager,
  WindowLayout,
} from "@intellij-platform/core";
import React, { FormEvent, ReactNode, useState } from "react";
import { useRecoilValue } from "recoil";
import { activeFileRepoBranchesState } from "../active-file.state";
import { useCreateBranch } from "./branches.state";
import { Errors } from "isomorphic-git";
import {
  BranchNameError,
  cleanUpBranchName,
  validateBranchName,
} from "./branch-name-utils";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1rem 0.875rem 0.25rem;
  gap: 0.6rem;
`;
const StyledCheckboxesContainer = styled.div`
  margin-left: -0.25rem; // to align with the field. Maybe something to look into in checkbox.
  display: flex;
  gap: 0.75rem;
`;

const ErrorMessages: Record<
  BranchNameError,
  (branchName: string) => ReactNode
> = {
  EXISTING: (branchName: string) => (
    <>
      Branch name {branchName} already exists. <br />
      Change the name or overwrite existing branch
    </>
  ),
  CLASHING_WITH_REMOTE: (branchName: string) => (
    <>
      Branch name {branchName} clashes with remote branch <br />
      with the same name
    </>
  ),
};

export function CreateNewBranchWindow({ close }: { close: () => void }) {
  const [checkout, setCheckout] = useState(true);
  const [overwrite, setOverwrite] = useState(false);
  const branches = useRecoilValue(activeFileRepoBranchesState);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const balloonManager = useBalloonManager();
  const createBranch = useCreateBranch();
  const currentBranchName = branches.currentBranch?.name;
  const [branchName, setBranchName] = useState(currentBranchName || "");

  const error = validateBranchName(branches, branchName);
  const isValid = !error || (error === "EXISTING" && overwrite);
  const validationState = !isValid && isErrorVisible ? "error" : "valid";

  const create = () => {
    if (isValid) {
      createBranch(branches.repoRoot, branchName, checkout)
        .catch((e) => {
          if (e instanceof Errors.AlreadyExistsError) {
            balloonManager.show({
              icon: "Error",
              title: "Unimplemented action",
              body: "Overwrite option is currently not supported.", // TODO,
            });
          } else {
            balloonManager.show({
              icon: "Error",
              title: "Unexpected error",
              body: `Could not create branch ${branchName}.`,
            });
          }
          console.error("Branch creation error: ", e);
        })
        .then(() => {
          close();
          // TODO: show toolwindow balloon, when/if git toolwindow is added
        });
    } else {
      setIsErrorVisible(true);
    }
  };

  return (
    <ModalWindow minWidth="content" minHeight="content">
      <WindowLayout
        header="Create New Branch"
        content={
          <StyledContainer
            id="create_branch_form"
            as="form"
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              create();
            }}
          >
            <InputField
              autoFocus
              autoSelect
              value={branchName}
              onChange={(newValue) => {
                setBranchName(cleanUpBranchName(newValue));
                setIsErrorVisible(true);
              }}
              validationState={validationState}
              validationMessage={
                validationState === "error" &&
                error &&
                ErrorMessages[error](branchName)
              }
              label="New branch name:"
              labelPlacement="above"
            />
            <StyledCheckboxesContainer>
              <Checkbox isSelected={checkout} onChange={setCheckout}>
                Checkout branch
              </Checkbox>
              <Checkbox
                isSelected={overwrite}
                isDisabled={!isErrorVisible || error !== "EXISTING"}
                onChange={setOverwrite}
              >
                Overwrite existing branch
              </Checkbox>
            </StyledCheckboxesContainer>
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
                  form="create_branch_form" // Using form in absence of built-in support for default button
                  isDisabled={validationState === "error"}
                >
                  Create
                </Button>
              </>
            }
          />
        }
      />
    </ModalWindow>
  );
}
