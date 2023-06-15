import { Meta, Story } from "@storybook/react";
import React from "react";
import { Input } from "./Input";
import { InputField, InputFieldProps } from "./InputField";

export default {
  title: "Components/InputField",
  component: InputField,
  args: {
    label: "Label:",
  },
  argTypes: {},
} as Meta<InputFieldProps>;

const Template: Story<InputFieldProps> = (props) => {
  return <InputField {...props} />;
};

export const Default: Story<InputFieldProps> = Template.bind({});

export const LabelAbove: Story<InputFieldProps> = Template.bind({});
LabelAbove.args = {
  labelPlacement: "above",
};

export const Invalid: Story<InputFieldProps> = Template.bind({});
Invalid.args = {
  validationState: "invalid",
};
export const Disabled: Story<InputFieldProps> = Template.bind({});
Disabled.args = {
  isDisabled: true,
};

export const WithPlaceholder: Story<InputFieldProps> = Template.bind({});
WithPlaceholder.args = {
  placeholder: "Optional",
};

export const WithContextHelp: Story<InputFieldProps> = Template.bind({});
WithContextHelp.args = {
  contextHelp: "*.domain.com",
};

export const WithErrorMessage: Story<InputFieldProps> = (props) => {
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
};

WithErrorMessage.args = {
  label: "New branch name:",
  labelPlacement: "above",
};
