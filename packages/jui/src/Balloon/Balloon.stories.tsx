import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { AutoHoverPlatformIcon, PlatformIcon } from "@intellij-platform/core";

import { Balloon, BalloonActionLink } from "./Balloon";

export default {
  title: "Components/Balloon",
  component: Balloon,
  argTypes: { onClose: { action: "onClose" } },
} as Meta<typeof Balloon>;

type Story = StoryObj<typeof Balloon>;

export const Default: Story = {
  args: {
    title: "Maven Projects need to be imported",
    body: "Projects to be imported: MavenSync, MavenDependencies. Maven project structure has been changed. Import changes to IntelliJ IDEA project to make it work correctly. Otherwise, code analysis, completion and other features might work incorrectly.",
    actions: (
      <>
        <BalloonActionLink>Import changes</BalloonActionLink>
        <BalloonActionLink>Enable auto-import</BalloonActionLink>
      </>
    ),
    onClose: () => {},
    headerActions: (
      <AutoHoverPlatformIcon icon="ide/notification/gear" role="button" />
    ),
  },
  render: (props) => <Balloon {...props} />,
};

const withProps = (args: typeof Default.args): Story => ({
  ...Default,
  args: { ...Default.args, ...args },
});

export const Expanded = withProps({ expanded: true });
export const Info = withProps({ icon: "Info" });

export const Warning = withProps({ icon: "Warning" });

export const Error = withProps({ icon: "Error" });

export const CustomIcon = withProps({
  title: "Docker file detection",
  body: "you may setup docker deployment run configuration for the following file",
  icon: <PlatformIcon icon="expui/fileTypes/docker.svg" />,
});

export const ShortBody = withProps({
  body: "Projects to be imported: MavenSync",
});

export const LongTitle = withProps({
  title:
    "Maven Projects need to be imported Maven Projects need to be imported",
});

export const LongActions = withProps({
  actions: (
    <BalloonActionLink>
      Enable auto-import Enable auto-import Enable auto-import Enable
      auto-import
    </BalloonActionLink>
  ),
});

export const WithoutTitle = withProps({ title: undefined });

export const WithoutTitleAndActions = withProps({
  title: undefined,
  actions: null,
});

export const WithoutBody = withProps({ body: undefined });

export const WithoutBodyAndActions = withProps({
  title: "Everything is up-to-date",
  body: undefined,
  actions: null,
});

export const WithoutActions = withProps({
  actions: null,
});
