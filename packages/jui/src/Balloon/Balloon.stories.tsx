import { Meta, Story } from "@storybook/react";
import React from "react";
import { Balloon, BalloonProps } from "./Balloon";
import {
  AutoHoverPlatformIcon,
  Link,
  PlatformIcon,
} from "@intellij-platform/core";

export default {
  title: "Components/Balloon",
  component: Balloon,
  args: {
    title: "Maven Projects need to be imported",
    body:
      "Projects to be imported: MavenSync, MavenDependencies. Maven project structure has been changed. Import changes to IntelliJ IDEA project to make it work correctly. Otherwise, code analysis, completion and other features might work incorrectly.",
    actions: (
      <>
        <Link>Import changes</Link>
        <Link>Enable auto-import</Link>
      </>
    ),
    onClose: () => {},
    headerActions: (
      <AutoHoverPlatformIcon icon="ide/notification/gear" role="button" />
    ),
  } as BalloonProps,
  argTypes: {},
} as Meta;

const Template: Story<BalloonProps> = (props) => {
  return <Balloon {...props} />;
};

export const Default: Story<BalloonProps> = Template.bind({});

export const Expanded: Story<BalloonProps> = Template.bind({});
Expanded.args = { expanded: true };

export const Info: Story<BalloonProps> = Template.bind({});
Info.args = { icon: "Info" };

export const Warning: Story<BalloonProps> = Template.bind({});
Warning.args = { icon: "Warning" };

export const Error: Story<BalloonProps> = Template.bind({});
Error.args = { icon: "Error" };

export const CustomIcon: Story<BalloonProps> = Template.bind({});
CustomIcon.args = {
  title: "Docker file detection",
  body:
    "you may setup docker deployment run configuration for the following file",
  icon: <PlatformIcon icon="expui/fileTypes/docker.svg" />,
};

export const ShortBody: Story<BalloonProps> = Template.bind({});
ShortBody.args = {
  body: "Projects to be imported: MavenSync",
};

export const LongTitle: Story<BalloonProps> = Template.bind({});
LongTitle.args = {
  title:
    "Maven Projects need to be imported Maven Projects need to be imported",
};

export const LongActions: Story<BalloonProps> = Template.bind({});
LongActions.args = {
  actions: (
    <Link>
      Enable auto-import Enable auto-import Enable auto-import Enable
      auto-import
    </Link>
  ),
};

export const WithoutTitle: Story<BalloonProps> = Template.bind({});
WithoutTitle.args = { title: undefined };

export const WithoutTitleAndActions: Story<BalloonProps> = Template.bind({});
WithoutTitleAndActions.args = {
  title: undefined,
  actions: null,
};

export const WithoutBody: Story<BalloonProps> = Template.bind({});
WithoutBody.args = { body: undefined };

export const WithoutBodyAndActions: Story<BalloonProps> = Template.bind({});
WithoutBodyAndActions.args = {
  title: "Everything is up-to-date",
  body: undefined,
  actions: null,
};
export const WithoutActions: Story<BalloonProps> = Template.bind({});
WithoutActions.args = {
  actions: null,
};
