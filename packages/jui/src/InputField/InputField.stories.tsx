import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import * as inputStories from "./Input.stories";
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
  render,
};

export const LabelAbove: StoryObj<InputFieldProps> = {
  render,
  args: {
    labelPlacement: "above",
  },
};

export const LabelAboveFullWidth: StoryObj<InputFieldProps> = {
  render: (props) => (
    <div
      style={{
        border: "1px solid rgba(0, 0, 0, 0.25)",
        padding: "1rem",
        margin: ".5rem",
        width: 400,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {render(props)}
    </div>
  ),
  args: {
    labelPlacement: "above",
  },
};

export const Error: StoryObj<InputFieldProps> = {
  render,
  args: {
    validationState: "error",
  },
};

export const Warning: StoryObj<InputFieldProps> = {
  render,
  args: {
    validationState: "warning",
  },
};

export const Disabled: StoryObj<InputFieldProps> = {
  render,
  args: {
    isDisabled: true,
  },
};

export const WithPlaceholder: StoryObj<InputFieldProps> = {
  render,
  args: {
    placeholder: "Optional",
  },
};

export const WithContextHelp: StoryObj<InputFieldProps> = {
  render,
  args: {
    contextHelp: "*.domain.com",
  },
};

export const WithContextHelpAfter: StoryObj<InputFieldProps> = {
  render,
  args: {
    label: "Thread count:",
    contextHelp: "-T option",
    contextHelpPlacement: "after",
  },
};

export const WithAfterAddons: StoryObj<InputFieldProps> = {
  render,

  args: inputStories.WithAfterAddons.args as Partial<InputFieldProps>,
};
export const WithBeforeAndAfterAddons: StoryObj<InputFieldProps> = {
  render,
  args: inputStories.WithBeforeAndAfterAddons.args as Partial<InputFieldProps>,
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
          validationState={alreadyExisting ? "error" : "valid"}
          validationMessage={
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

export const WithWarningMessage: StoryObj<InputFieldProps> = {
  render: (props) => {
    const [name, setName] = React.useState("");

    return (
      <div style={{ marginTop: "2rem" }}>
        <InputField
          {...props}
          value={name}
          onChange={setName}
          validationState={!name ? "warning" : "valid"}
          validationMessage={!name ? <>Target name is not specified.</> : null}
        />
      </div>
    );
  },

  args: {
    label: "Target name:",
  },
};
