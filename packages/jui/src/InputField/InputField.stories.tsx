import { Meta, StoryFn, StoryObj } from "@storybook/react";
import React from "react";
import { InputField, InputFieldProps } from "./InputField";

export default {
  title: "Components/InputField",
  component: InputField,
  args: {
    label: "Label:",
  },
  argTypes: {},
} as Meta<InputFieldProps>;

const render = (props: InputFieldProps) => {
  return <InputField {...props} />;
};

export const Default: StoryObj<InputFieldProps> = {
  render: render,
};

export const LabelAbove: StoryObj<InputFieldProps> = {
  render: render,

  args: {
    labelPlacement: "above",
  },
};

export const Invalid: StoryObj<InputFieldProps> = {
  render: render,

  args: {
    validationState: "invalid",
  },
};

export const Disabled: StoryObj<InputFieldProps> = {
  render: render,

  args: {
    isDisabled: true,
  },
};

export const WithPlaceholder: StoryObj<InputFieldProps> = {
  render: render,

  args: {
    placeholder: "Optional",
  },
};

export const WithContextHelp: StoryObj<InputFieldProps> = {
  render: render,

  args: {
    contextHelp: "*.domain.com",
  },
};

export const WithErrorMessage: StoryObj<InputFieldProps> = {
  render: (props) => {
    const branches = ["main"];
    const [branchName, setBranchName] = React.useState(branches[0]);

    const alreadyExisting = branches.includes(branchName);
    return (
      <div style={{ marginTop: "1.5rem" }}>
        <InputField
          {...props}
          value={branchName}
          onChange={setBranchName}
          validationState={alreadyExisting ? "invalid" : "valid"}
          errorMessage={
            alreadyExisting ? (
              <>
                Branch name {branchName} already exists. <br />
                Change the name or overwrite existing branch
              </>
            ) : null
          }
        />
      </div>
    );
  },

  args: {
    label: "New branch name:",
    labelPlacement: "above",
  },
};
