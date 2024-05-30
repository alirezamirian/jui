import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "../Button";
import { AlertDialog, AlertDialogProps } from "./AlertDialog";
import {
  Checkbox,
  HelpTooltip,
  PlatformIcon,
  TooltipTrigger,
} from "@intellij-platform/core";

export default {
  title: "Components/AlertDialog",
  component: AlertDialog,
  args: {
    heading: "Alert heading",
    body: "Alert body",
    buttons: (
      <>
        <Button>Cancel</Button>
        <Button variant="default">Ok</Button>
      </>
    ),
  },
  argTypes: {},
} as Meta<AlertDialogProps>;

export const Information: StoryObj<AlertDialogProps> = {
  args: {
    type: "information",
    heading: "Information",
    body: "No usages found",
    buttons: <Button variant="default">Ok</Button>,
  },
};

export const Question: StoryObj<AlertDialogProps> = {
  args: {
    type: "question",
    heading: "Delete",
    body: "Delete 'AlertDialog.stories.tsx'?",
    buttons: (
      <>
        <Button autoFocus>Cancel</Button>
        <Button variant="default">Delete</Button>
      </>
    ),
  },
};

export const Warning: StoryObj<AlertDialogProps> = {
  args: {
    type: "warning",
    heading: "Process 'storybook:start' Is Running",
    body: "Do you want to terminate the process 'storybook:start'?",
    checkbox: <Checkbox>Don't ask again</Checkbox>,
    buttons: (
      <>
        <Button>Cancel</Button>
        <Button autoFocus>Disconnect</Button>
        <Button variant="default">Terminate</Button>
      </>
    ),
  },
};

export const Error: StoryObj<AlertDialogProps> = {
  args: {
    type: "error",
    heading: "Failed to Re-Run Refactoring",
    body: "Can't restore context for method extraction",
    buttons: <Button variant="default">Ok</Button>,
  },
};

export const WithHelpIcon: StoryObj<AlertDialogProps> = {
  args: {
    helpButton: (
      <TooltipTrigger tooltip={<HelpTooltip helpText="Show Help Contents" />}>
        <Button variant="icon">
          <PlatformIcon icon="actions/help"></PlatformIcon>
        </Button>
      </TooltipTrigger>
    ),
    buttons: (
      <>
        <Button autoFocus>Cancel</Button>
        <Button variant="default">Exit</Button>
      </>
    ),
  },
};

export const WithCheckbox: StoryObj<AlertDialogProps> = {
  args: {
    type: "question",
    heading: "Confirm Exit",
    body: "Are you sure you want to exit?",
    checkbox: <Checkbox>Don't ask again</Checkbox>,
    buttons: (
      <>
        <Button autoFocus>Cancel</Button>
        <Button variant="default">Exit</Button>
      </>
    ),
  },
};

export const WithSetWidth: StoryObj<AlertDialogProps> = {
  args: {
    type: "question",
    heading: "Delete?",
    body: (
      <div style={{ width: 354 }}>
        Delete 2 directories and 3 files?
        <br />
        All files and subdirectories in the selected directories will be
        deleted. <br />
        You might not be able to fully undo this operation!
      </div>
    ),
    buttons: (
      <>
        <Button autoFocus>Cancel</Button>
        <Button variant="default">Delete</Button>
      </>
    ),
  },
};
