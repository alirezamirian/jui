import { Meta, Story } from "@storybook/react";
import React from "react";
import { BalloonActionLink } from "./Balloon";
import {
  AutoHoverPlatformIcon,
  BalloonsProvider,
  BalloonsProviderProps,
  useBalloons,
} from "@intellij-platform/core";

export default {
  title: "Components/BalloonProvider",
  component: BalloonsProvider,
} as Meta;

const ShowBalloonButton = () => {
  const { show } = useBalloons();
  const showNotification = (timeout = 0) =>
    show(
      {
        title: "Maven Projects need to be imported",
        body:
          "Projects to be imported: MavenSync, MavenDependencies. Maven project structure has been changed. Import changes to IntelliJ IDEA project to make it work correctly. Otherwise, code analysis, completion and other features might work incorrectly.",
        actions: (
          <>
            <BalloonActionLink>Import changes</BalloonActionLink>
            <BalloonActionLink>Enable auto-import</BalloonActionLink>
          </>
        ),
        headerActions: (
          <AutoHoverPlatformIcon icon="ide/notification/gear" role="button" />
        ),
      },
      timeout
    );
  return (
    <>
      <button onClick={() => showNotification()}>
        show sticky balloon notification
      </button>
      <br />
      <br />
      <button onClick={() => showNotification(5000)}>
        show auto-hide balloon notification
      </button>
    </>
  );
};

export const BalloonsProviderStory: Story<BalloonsProviderProps> = (props) => (
  <BalloonsProvider {...props}>
    <ShowBalloonButton />
  </BalloonsProvider>
);

BalloonsProviderStory.storyName = "Balloons Provider";
