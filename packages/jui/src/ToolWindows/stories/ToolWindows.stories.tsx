import { Item, Section } from "@react-stately/collections";
import { Meta } from "@storybook/react";
import { PlatformIcon, StyledIconLiveIndicator } from "../../Icon";
import { SpeedSearchList } from "../../List/SpeedSearchList/SpeedSearchList";
import { ToolWindowTabContent } from "../../Tabs/ToolWindowTabs";
import { MultiViewToolWindow } from "../../ToolWindowsImpl/MultiViewToolWindow";
import {
  FakeExecutionToolbar,
  RunConsoleOutput,
  useFakeExecution,
  VerticalFlexContainer,
} from "./components/FakeExecution";
import { indexBy, map } from "ramda";
import React, { useState } from "react";
import packageJson from "../../../package.json";
import { IconButton } from "../../IconButton";
import { SpeedSearchTreeSample } from "../../story-components";
import { styledComponentsControlsExclude } from "../../story-helpers";
import { DefaultToolWindow } from "../../ToolWindowsImpl/DefaultToolWindow";
import { ToolWindows, ToolWindowsProps } from "../ToolWindows";
import {
  ToolWindowsState,
  toolWindowState,
} from "../ToolWindowsState/ToolWindowsState";
import {
  ActionTooltip,
  DefaultToolWindows,
  HighlightedTextValue,
  TabCloseButton,
  TooltipTrigger,
} from "@intellij-platform/core";

export default {
  title: "Components/ToolWindow",
  parameters: {
    docs: {
      // This is needed due to this complicated issue causing browser to hang otherwise:
      // https://github.com/storybookjs/storybook/issues/17025#issuecomment-1055654634
      source: { type: "code" }, // Default here is 'dynamic'
    },
  },
} as Meta;

const SampleToolWindowContent = () => <textarea />;
const windows = [
  {
    id: "project",
    title: "Project",
    icon: <PlatformIcon icon="toolwindows/toolWindowProject" />,
    content: (
      <DefaultToolWindow
        headerContent="Project"
        additionalActions={
          <>
            <IconButton>
              <PlatformIcon icon="actions/expandall" />
            </IconButton>
          </>
        }
      >
        {<SpeedSearchTreeSample />}
      </DefaultToolWindow>
    ),
    initialState: toolWindowState({ isVisible: true }),
  },
  {
    id: "structure",
    title: "Structure",
    icon: <PlatformIcon icon="toolwindows/toolWindowStructure" />,
    content: (
      <DefaultToolWindow headerContent="Structure">
        {<SampleToolWindowContent />}
      </DefaultToolWindow>
    ),
    initialState: toolWindowState(),
  },
  {
    id: "favorites",
    title: "Favorites",
    icon: <PlatformIcon icon="toolwindows/toolWindowFavorites" />,
    content: (
      <DefaultToolWindow headerContent="Favorites">
        {<SampleToolWindowContent />}
      </DefaultToolWindow>
    ),
    initialState: toolWindowState({ isSplit: true }),
  },
  {
    id: "run",
    title: "Run",
    icon: <PlatformIcon icon="toolwindows/toolWindowRun" />,
    content: (
      <DefaultToolWindow headerContent="Run">
        {<SampleToolWindowContent />}
      </DefaultToolWindow>
    ),
    initialState: toolWindowState({ anchor: "bottom", weight: 0.35 }),
  },
  {
    id: "debugger",
    title: "Debugger",
    icon: <PlatformIcon icon="toolwindows/toolWindowDebugger" />,
    content: (
      <DefaultToolWindow headerContent="Debug">
        {<SampleToolWindowContent />}
      </DefaultToolWindow>
    ),
    initialState: toolWindowState({ anchor: "bottom", viewMode: "float" }),
  },
  {
    id: "messages",
    title: "Messages",
    icon: <PlatformIcon icon="toolwindows/toolWindowMessages" />,
    content: (
      <DefaultToolWindow headerContent="Messages">
        {<SampleToolWindowContent />}
      </DefaultToolWindow>
    ),
    initialState: toolWindowState({
      anchor: "bottom",
      viewMode: "undock",
      weight: 0.15,
    }),
  },
  {
    id: "events",
    title: "Events",
    icon: <PlatformIcon icon="toolwindows/errorEvents" />,
    content: (
      <DefaultToolWindow headerContent="Events Log">
        {<SampleToolWindowContent />}
      </DefaultToolWindow>
    ),
    initialState: toolWindowState({ anchor: "bottom", isSplit: true }),
  },
  {
    id: "commit",
    title: "Commit",
    icon: <PlatformIcon icon="toolwindows/toolWindowCommit" />,
    content: (
      <DefaultToolWindow headerContent="Commit">
        {<SpeedSearchTreeSample />}
      </DefaultToolWindow>
    ),
    initialState: toolWindowState({ anchor: "right" }),
  },
];
const windowById = indexBy(({ id }) => id, windows);

export const Default = {
  render: (
    props: Pick<ToolWindowsProps, "hideToolWindowBars" | "useWidescreenLayout">
  ) => {
    const [state, setState] = useState(
      () =>
        new ToolWindowsState(
          map(({ initialState }) => initialState, windowById)
        )
    );
    return (
      <DefaultToolWindows
        {...props}
        height={"100vh"}
        toolWindowsState={state}
        onToolWindowStateChange={setState}
        windows={windows}
      >
        <div style={{ padding: 8 }}>
          <textarea />
        </div>
      </DefaultToolWindows>
    );
  },

  parameters: {
    layout: "fullscreen",
    controls: { exclude: styledComponentsControlsExclude },
  },
};

const open = (toolWindow: typeof windows[number]): typeof windows[number] => ({
  ...toolWindow,
  initialState: { ...toolWindow.initialState, isVisible: true },
});

export const MultiView = {
  render: (
    props: Pick<ToolWindowsProps, "hideToolWindowBars" | "useWidescreenLayout">
  ) => {
    const filteredWindows = indexBy(
      ({ id }) => id,
      windows.filter(({ id }) => id === "run").map(open)
    );
    const [state, setState] = useState(
      () =>
        new ToolWindowsState(
          map(({ initialState }) => initialState, filteredWindows)
        )
    );

    const { executions, toggle, runScript, close } = useFakeExecution(
      packageJson.scripts
    );

    return (
      <ToolWindows
        {...props}
        height={"100vh"}
        toolWindowsState={state}
        onToolWindowStateChange={setState}
        windows={[
          {
            id: "run",
            toolbarButton: (
              <>
                <PlatformIcon icon="toolwindows/toolWindowRun">
                  {executions.some((execution) => execution.isRunning) && (
                    <StyledIconLiveIndicator />
                  )}
                </PlatformIcon>
                &nbsp; Run
              </>
            ),
            content: (
              <MultiViewToolWindow
                headerContent={({ renderedViewSwitcher }) => {
                  return (
                    <>
                      {<span style={{ marginRight: 4 }}>Run</span>}
                      {executions.length > 1 ? (
                        renderedViewSwitcher
                      ) : (
                        <FakeExecutionToolbar
                          execution={executions[0]}
                          toggle={toggle}
                        />
                      )}
                    </>
                  );
                }}
              >
                {executions.map((execution) => (
                  <MultiViewToolWindow.View
                    key={execution.id}
                    tabContent={
                      <ToolWindowTabContent
                        title={execution.title}
                        icon={
                          <PlatformIcon icon="runConfigurations/application">
                            {execution.isRunning && <StyledIconLiveIndicator />}
                          </PlatformIcon>
                        }
                        closeButton={
                          <TooltipTrigger
                            tooltip={
                              <ActionTooltip
                                actionName="Close Tab"
                                shortcut="^⇧F4"
                              />
                            }
                          >
                            <TabCloseButton
                              onPress={() => close(execution.id)}
                            />
                          </TooltipTrigger>
                        }
                      />
                    }
                  >
                    <VerticalFlexContainer>
                      {executions.length > 1 && (
                        <FakeExecutionToolbar
                          execution={execution}
                          toggle={toggle}
                        />
                      )}
                      <RunConsoleOutput />
                    </VerticalFlexContainer>
                  </MultiViewToolWindow.View>
                ))}
              </MultiViewToolWindow>
            ),
          },
        ]}
      >
        <div style={{ marginTop: 25, width: 300 }}>
          <SpeedSearchList
            onAction={(key) => runScript(`${key}`)}
            selectionMode="single"
          >
            <Section title="Run a script">
              {Object.keys(packageJson.scripts).map((name) => (
                <Item key={name} textValue={name}>
                  <HighlightedTextValue />
                </Item>
              ))}
            </Section>
          </SpeedSearchList>
        </div>
      </ToolWindows>
    );
  },

  parameters: {
    layout: "fullscreen",
    controls: { exclude: styledComponentsControlsExclude },
    component: MultiViewToolWindow,
  },
};
