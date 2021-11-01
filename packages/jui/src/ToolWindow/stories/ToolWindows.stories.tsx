import { Section, Item } from "@react-stately/collections";
import { Meta } from "@storybook/react";
import { StyledIconLiveIndicator } from "../../Icon";
import { SpeedSearchList } from "../../List/SpeedSearchList/SpeedSearchList";
import { ToolWindowTabContent } from "../../tabs/ToolWindowTabs";
import {
  MultiContentToolWindow,
  MultiContentToolWindowContent,
} from "../MultiContentToolWindow";
import {
  FakeExecutionToolbar,
  RunConsoleOutput,
  useFakeExecution,
  VerticalFlexContainer,
} from "./components/FakeExecution";
import { indexBy, map } from "ramda";
import React, { useState } from "react";
import packageJson from "../../../package.json";
import { ActionButton } from "../../ActionButton/ActionButton";
import { PlatformIcon } from "../../Icon";
import { SpeedSearchTreeSample } from "../../story-components";
import { styledComponentsControlsExclude } from "../../story-helpers";
import { DefaultToolWindow } from "../DefaultToolWindow";
import { ToolWindows, ToolWindowsProps } from "../ToolWindows";
import {
  ToolWindowsState,
  toolWindowState,
} from "../ToolWindowsState/ToolWindowsState";

export default {
  title: "Components/ToolWindow",
} as Meta;

const SampleToolWindowContent = () => <textarea />;
const windows = [
  {
    id: "project",
    title: "Project",
    icon: "toolwindows/toolWindowProject",
    component: SpeedSearchTreeSample,
    initialState: toolWindowState({ isVisible: true }),
  },
  {
    id: "structure",
    title: "Structure",
    icon: "toolwindows/toolWindowStructure",
    component: SampleToolWindowContent,
    initialState: toolWindowState(),
  },
  {
    id: "favorites",
    title: "Favorites",
    icon: "toolwindows/toolWindowFavorites",
    component: SampleToolWindowContent,
    initialState: toolWindowState({ isSplit: true }),
  },
  {
    id: "run",
    title: "Run",
    icon: "toolwindows/toolWindowRun",
    component: SampleToolWindowContent,
    initialState: toolWindowState({ anchor: "bottom", weight: 0.35 }),
  },
  {
    id: "debugger",
    title: "Debug",
    icon: "toolwindows/toolWindowDebugger",
    component: SampleToolWindowContent,
    initialState: toolWindowState({ anchor: "bottom", viewMode: "float" }),
  },
  {
    id: "messages",
    title: "Messages",
    icon: "toolwindows/toolWindowMessages",
    component: SampleToolWindowContent,
    initialState: toolWindowState({
      anchor: "bottom",
      viewMode: "undock",
      weight: 0.15,
    }),
  },
  {
    id: "events",
    title: "Events Log",
    icon: "toolwindows/errorEvents",
    component: SampleToolWindowContent,
    initialState: toolWindowState({ anchor: "bottom", isSplit: true }),
  },
  {
    id: "commit",
    title: "Commit",
    icon: "toolwindows/toolWindowCommit",
    component: SpeedSearchTreeSample,
    initialState: toolWindowState({ anchor: "right" }),
  },
];
const windowById = indexBy(({ id }) => id, windows);
export const Default = (
  props: Pick<ToolWindowsProps, "hideToolWindowBars" | "useWidescreenLayout">
) => {
  const [state, setState] = useState(
    () =>
      new ToolWindowsState(map(({ initialState }) => initialState, windowById))
  );
  return (
    <ToolWindows
      {...props}
      height={"100vh"}
      toolWindowsState={state}
      onToolWindowStateChange={setState}
      renderToolbarButton={(id) => (
        <>
          <PlatformIcon icon={windowById[id].icon} />
          &nbsp;
          {windowById[id].title}
        </>
      )}
      renderWindow={(id) => {
        const Component = windowById[id].component;
        return (
          <DefaultToolWindow
            key={id} /*FIXME: this shouldn't be necessary */
            headerContent={windowById[id].title}
            additionalActions={
              id === "project" && (
                <>
                  <ActionButton>
                    <PlatformIcon icon="actions/expandall" />
                  </ActionButton>
                </>
              )
            }
          >
            {<Component />}
          </DefaultToolWindow>
        );
      }}
    >
      <div style={{ padding: 8 }}>
        <textarea />
      </div>
    </ToolWindows>
  );
};

const open = (toolWindow: typeof windows[number]): typeof windows[number] => ({
  ...toolWindow,
  initialState: { ...toolWindow.initialState, isVisible: true },
});

export const MultiContent = (
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
      renderToolbarButton={(id) => (
        <>
          <PlatformIcon icon={windowById[id].icon}>
            {executions.some((execution) => execution.isRunning) && (
              <StyledIconLiveIndicator />
            )}
          </PlatformIcon>
          &nbsp;
          {windowById[id].title}
        </>
      )}
      renderWindow={(id) => {
        return (
          <MultiContentToolWindow
            key={id}
            headerContent={({ renderedContentSwitcher }) => {
              return (
                <>
                  {
                    <span style={{ marginRight: 4 }}>
                      {windowById[id].title}:
                    </span>
                  }
                  {executions.length > 1 ? (
                    renderedContentSwitcher
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
              <MultiContentToolWindowContent
                key={execution.id}
                tabContent={
                  <ToolWindowTabContent
                    title={execution.title}
                    icon={
                      <PlatformIcon icon="runConfigurations/application">
                        {execution.isRunning && <StyledIconLiveIndicator />}
                      </PlatformIcon>
                    }
                    onClose={() => close(execution.id)}
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
              </MultiContentToolWindowContent>
            ))}
          </MultiContentToolWindow>
        );
      }}
    >
      <div style={{ padding: 8 }}>
        <SpeedSearchList
          onAction={(key) => runScript(`${key}`)}
          selectionMode="single"
        >
          <Section title="Run a script">
            {Object.keys(packageJson.scripts).map((name) => (
              <Item key={name}>{name}</Item>
            ))}
          </Section>
        </SpeedSearchList>
      </div>
    </ToolWindows>
  );
};

MultiContent.parameters = {
  layout: "fullscreen",
  controls: { exclude: styledComponentsControlsExclude },
  component: MultiContentToolWindow,
};

Default.parameters = {
  layout: "fullscreen",
  controls: { exclude: styledComponentsControlsExclude },
  component: Default,
};
