import {
  Button,
  Checkbox,
  InputField,
  styled,
  useBalloonManager,
  WindowLayout,
} from "@intellij-platform/core";
import React, { FormEvent, ReactNode, useState } from "react";
import { useRecoilValue } from "recoil";
import { activeFileRepoBranchesState } from "../active-file.state";
import { RepoBranches, useCreateBranch } from "./branches.state";
import { Errors } from "isomorphic-git";

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
type CreateNewBranchError = "EXISTING" | "CLASHING_WITH_REMOTE";
const ErrorMessages: Record<
  CreateNewBranchError,
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
  const currentBranchName = branches.localBranches.find(
    ({ isCurrent }) => isCurrent
  )?.name;
  const [branchName, setBranchName] = useState(currentBranchName || "");

  const error = validateBranchName(branches, branchName);
  const isValid = !error || (error === "EXISTING" && overwrite);
  const validationState = !isValid && isErrorVisible ? "invalid" : "valid";

  const create = () => {
    if (isValid) {
      createBranch(branchName, branches.repoRoot, checkout)
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
            errorMessage={
              validationState === "invalid" &&
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
                isDisabled={validationState === "invalid"}
              >
                Create
              </Button>
            </>
          }
        />
      }
    />
  );
}

function validateBranchName(
  branches: RepoBranches,
  newBranchName: string
): CreateNewBranchError | null {
  if (
    branches.remoteBranches.some(
      (remoteBranchName) => remoteBranchName === newBranchName
    )
  ) {
    return "CLASHING_WITH_REMOTE";
  }
  if (branches.localBranches.some(({ name }) => name === newBranchName)) {
    return "EXISTING";
  }
  return null;
}

// Almost borrowed from GitRefNameValidator
const ILLEGAL_CHARS_PATTERN = new RegExp(
  "(^\\.)|" + // begins with a dot
    "(^-)|" + // begins with '-'
    "(^/)|" + // begins with '/'
    "(\\.\\.)+|" + // two dots in a row
    "[ ~:^?*\\[\\\\]+|(@\\{)+|" + // contains invalid character: space, one of ~:^?*[\ or @{ sequence)
    `[${Array(32)
      .fill(null)
      .map((_, index) => String.fromCharCode(index))
      .join("")}u007F]`
);
function cleanUpBranchName(branchName: string) {
  return branchName.replace(ILLEGAL_CHARS_PATTERN, "_");
}
