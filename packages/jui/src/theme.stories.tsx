import * as React from "react";
import { useState } from "react";
import { indexBy, map } from "ramda";
import { Meta, Story } from "@storybook/react";
import {
  ActionButton,
  AutoHoverPlatformIcon,
  Balloon,
  BalloonActionLink,
  Checkbox,
  DefaultToolWindow,
  Divider,
  HighlightedTextValue,
  Item,
  ItemLayout,
  Menu,
  MenuItemLayout,
  MultiViewToolWindow,
  PlatformIcon,
  ProgressBar,
  ProgressBarPauseButton,
  SpeedSearchList,
  SpeedSearchTree,
  StatusBar,
  StatusBarWidget,
  styled,
  StyledDefaultTab,
  StyledDefaultTabs,
  StyledIconLiveIndicator,
  TabCloseButton,
  ThreeViewSplitter,
  ToolWindows,
  ToolWindowsState,
  toolWindowState,
  ToolWindowTabContent,
} from "@intellij-platform/core";
import {
  FakeExecutionToolbar,
  VerticalFlexContainer,
} from "./ToolWindows/stories/components/FakeExecution";
import { StyledEditorTab } from "./Tabs/EditorTabs/StyledEditorTab";
import { StyledToolWindowTab } from "./Tabs/ToolWindowTabs/StyledToolWindowTab";
import { StyledDebuggerTab } from "./Tabs/DebuggerTabs/StyledDebuggerTab";
import { StyledEditorTabs } from "./Tabs/EditorTabs/StyledEditorTabs";
import { StyledToolWindowTabs } from "./Tabs/ToolWindowTabs/StyledToolWindowTabs";
import { StyledButton, StyledDefaultButton } from "./Button/StyledButton";
import { StyledLink } from "./Link/StyledLink";

export default {
  title: "Demos/Theme",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const RunConsoleOutput = styled.div`
  background: ${({ theme }) => (theme.dark ? "#2b2b2b" : "#fff")};
  flex: 1;
`;

/**
 * A kitchen sink story for testing changes to themes. Mostly styled components that use theme properties.
 * Useful for manual testing, and also used in an automated visual test on theme changes.
 */
export const Theme: Story = () => {
  const speedSearchTree = (
    <>
      <DefaultToolWindow
        headerContent="SpeedSearchTree"
        additionalActions={
          <>
            <ActionButton>
              <PlatformIcon icon="actions/expandall" />
            </ActionButton>
          </>
        }
      >
        <SpeedSearchTree
          selectionMode="multiple"
          defaultExpandedKeys={["project", "src", "src/app"]}
          defaultSelectedKeys={["App.jsx"]}
        >
          <Item
            key="project"
            textValue="jui"
            title={
              <ItemLayout>
                <PlatformIcon icon="nodes/folder" />
                <HighlightedTextValue />
                <ItemLayout.Hint>~/workspace/jui</ItemLayout.Hint>
              </ItemLayout>
            }
          >
            <Item
              key="src"
              textValue="src"
              title={
                <ItemLayout>
                  <PlatformIcon icon="nodes/folder" />
                  <HighlightedTextValue />
                </ItemLayout>
              }
            >
              <Item
                key="src/app"
                textValue="app"
                title={
                  <ItemLayout>
                    <PlatformIcon icon="nodes/folder" />
                    <HighlightedTextValue />
                  </ItemLayout>
                }
              >
                <Item textValue="App.jsx" key="App.jsx">
                  <ItemLayout>
                    <PlatformIcon icon="fileTypes/javaScript" />
                    <HighlightedTextValue />
                  </ItemLayout>
                </Item>
              </Item>
              <Item textValue="index.jsx" key="index.jsx">
                <ItemLayout>
                  <PlatformIcon icon="fileTypes/javaScript" />
                  <HighlightedTextValue />
                </ItemLayout>
              </Item>
            </Item>
          </Item>
        </SpeedSearchTree>
        <br />
        <SpeedSearchTree
          defaultSelectedKeys={["index.jsx"]}
          selectionMode="multiple"
          alwaysShowAsFocused
        >
          <Item textValue="index.jsx" key="index.jsx">
            <ItemLayout>
              <PlatformIcon icon="fileTypes/javaScript" />
              <HighlightedTextValue />
            </ItemLayout>
          </Item>
        </SpeedSearchTree>
      </DefaultToolWindow>
    </>
  );
  const speedSearchList = (
    <>
      <DefaultToolWindow headerContent="SpeedSearchList">
        <SpeedSearchList selectionMode="single">
          <Item textValue=".gitignore" key=".gitignore">
            <ItemLayout>
              <PlatformIcon icon="vcs/ignore_file" />
              <HighlightedTextValue />
            </ItemLayout>
          </Item>
          <Item textValue="Archive" key="Archive">
            <ItemLayout>
              <PlatformIcon icon="fileTypes/archive" />
              <HighlightedTextValue />
            </ItemLayout>
          </Item>
          <Item textValue="JavaScript" key="JavaScript">
            <ItemLayout>
              <PlatformIcon icon="fileTypes/javaScript" />
              <HighlightedTextValue />
            </ItemLayout>
          </Item>
          <Item textValue="JSON" key="JSON">
            <ItemLayout>
              <PlatformIcon icon="fileTypes/json" />
              <HighlightedTextValue />
            </ItemLayout>
          </Item>
          <Item textValue="HTML" key="HTML">
            <ItemLayout>
              <PlatformIcon icon="fileTypes/html" />
              <HighlightedTextValue />
            </ItemLayout>
          </Item>
          <Item textValue="YAML" key="YAML">
            <ItemLayout>
              <PlatformIcon icon="fileTypes/yaml" />
              <HighlightedTextValue />
            </ItemLayout>
          </Item>
        </SpeedSearchList>
        <br />
        <SpeedSearchList selectionMode="single" alwaysShowAsFocused>
          <Item textValue=".gitignore" key=".gitignore">
            <ItemLayout>
              <PlatformIcon icon="vcs/ignore_file" />
              <HighlightedTextValue />
            </ItemLayout>
          </Item>
          <Item textValue="Archive" key="Archive">
            <ItemLayout>
              <PlatformIcon icon="fileTypes/archive" />
              <HighlightedTextValue />
            </ItemLayout>
          </Item>
        </SpeedSearchList>
      </DefaultToolWindow>
    </>
  );
  const multiViewToolWindow = (
    <>
      <MultiViewToolWindow
        defaultActiveKey="e2"
        headerContent={({ renderedViewSwitcher }) => {
          return <>{renderedViewSwitcher}</>;
        }}
      >
        <MultiViewToolWindow.View
          key={"e1"}
          tabContent={
            <ToolWindowTabContent
              title="start"
              icon={
                <PlatformIcon icon="runConfigurations/application">
                  <StyledIconLiveIndicator />
                </PlatformIcon>
              }
              closeButton={<TabCloseButton />}
            />
          }
        >
          <VerticalFlexContainer>
            <FakeExecutionToolbar
              execution={{ id: "foo", title: "Foo", isRunning: true }}
              toggle={() => {}}
            />
            <RunConsoleOutput />
          </VerticalFlexContainer>
        </MultiViewToolWindow.View>
        <MultiViewToolWindow.View
          key={"e2"}
          tabContent={
            <ToolWindowTabContent
              title="test"
              icon={<PlatformIcon icon="expui/fileTypes/jest" />}
              closeButton={<TabCloseButton />}
            />
          }
        >
          <ThreeViewSplitter
            firstView={
              <VerticalFlexContainer>
                <FakeExecutionToolbar
                  execution={{
                    id: "foo",
                    title: "Foo",
                    isRunning: false,
                  }}
                  toggle={() => {}}
                />
                <SpeedSearchTree
                  selectionMode="single"
                  defaultExpandedKeys={["root", "specFile", "spec"]}
                >
                  <Item
                    key="root"
                    textValue="Text Results"
                    title={
                      <ItemLayout>
                        <PlatformIcon icon="runConfigurations/testPassed.svg" />
                        <HighlightedTextValue />
                      </ItemLayout>
                    }
                  >
                    <Item
                      key="specFile"
                      textValue="Theme.spec.ts"
                      title={
                        <ItemLayout>
                          <PlatformIcon icon="runConfigurations/testPassed.svg" />
                          <HighlightedTextValue />
                        </ItemLayout>
                      }
                    >
                      <Item
                        key="spec"
                        textValue="Theme"
                        title={
                          <ItemLayout>
                            <PlatformIcon icon="runConfigurations/testPassed.svg" />
                            <HighlightedTextValue />
                          </ItemLayout>
                        }
                      >
                        <Item
                          key="c1"
                          textValue="resolves os-dependent values based on os"
                        >
                          <ItemLayout>
                            <PlatformIcon icon="runConfigurations/testPassed.svg" />
                            <HighlightedTextValue />
                          </ItemLayout>
                        </Item>
                        <Item
                          key="c2"
                          textValue="resolves os-dependent values to default when os doesn't match"
                        >
                          <ItemLayout>
                            <PlatformIcon icon="runConfigurations/testPassed.svg" />
                            <HighlightedTextValue />
                            {/* TODO: add test times (sticky on the right) when the component is implemented */}
                          </ItemLayout>
                        </Item>
                      </Item>
                    </Item>
                  </Item>
                </SpeedSearchTree>
              </VerticalFlexContainer>
            }
            innerView={
              <VerticalFlexContainer>
                <RunConsoleOutput />
              </VerticalFlexContainer>
            }
          />
        </MultiViewToolWindow.View>
      </MultiViewToolWindow>
    </>
  );
  const toolWindows = [
    {
      id: "SpeedSearchTree",
      initialState: toolWindowState({ anchor: "left", isVisible: true }),
      toolbarButton: (
        <>
          <PlatformIcon icon="toolwindows/toolWindowProject" />
          &nbsp; SpeedSearchTree
        </>
      ),
      content: speedSearchTree,
    },
    {
      id: "SpeedSearchList",
      initialState: toolWindowState({
        anchor: "left",
        isSplit: true,
        isVisible: true,
      }),
      toolbarButton: (
        <>
          <PlatformIcon icon="toolwindows/toolWindowCommit" />
          &nbsp; SpeedSearchTree
        </>
      ),
      content: speedSearchList,
    },
    {
      id: "MultiViewToolWindow",
      initialState: toolWindowState({ anchor: "bottom", isVisible: true }),
      toolbarButton: (
        <>
          <PlatformIcon icon="toolwindows/toolWindowRun">
            <StyledIconLiveIndicator />
          </PlatformIcon>
          &nbsp; MultiViewToolWindow
        </>
      ),
      content: multiViewToolWindow,
    },
  ];
  const toolWindowById = indexBy(({ id }) => id, toolWindows);

  const [toolWindowsState, setToolWindowsState] = useState(
    () =>
      new ToolWindowsState(
        map(({ initialState }) => initialState, toolWindowById)
      )
  );

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ToolWindows
        toolWindowsState={toolWindowsState}
        onToolWindowStateChange={setToolWindowsState}
        windows={toolWindows}
      >
        <div style={{ padding: 8 }}>
          <StyledDefaultTabs>
            <StyledDefaultTab>Default tabs</StyledDefaultTab>
            <StyledDefaultTab selected>selected</StyledDefaultTab>
            <StyledDefaultTab disabled>disabled</StyledDefaultTab>
            <StyledDefaultTab className="hover">hovered</StyledDefaultTab>
            <StyledDefaultTab className="hover" active>
              hovered active
            </StyledDefaultTab>
            <StyledDefaultTab selected active>
              selected active
            </StyledDefaultTab>
          </StyledDefaultTabs>

          <StyledEditorTabs>
            <StyledEditorTab>Editor tabs</StyledEditorTab>
            <StyledEditorTab selected>selected</StyledEditorTab>
            <StyledEditorTab disabled>disabled</StyledEditorTab>
            <StyledEditorTab className="hover">hovered</StyledEditorTab>
            <StyledEditorTab className="hover" active>
              hovered active
            </StyledEditorTab>
            <StyledEditorTab selected active>
              selected active
            </StyledEditorTab>
          </StyledEditorTabs>

          <StyledToolWindowTabs>
            <StyledToolWindowTab>ToolWindow tabs</StyledToolWindowTab>
            <StyledToolWindowTab selected>selected</StyledToolWindowTab>
            <StyledToolWindowTab disabled>disabled</StyledToolWindowTab>
            <StyledToolWindowTab className="hover">hovered</StyledToolWindowTab>
            <StyledToolWindowTab className="hover" active>
              hovered active
            </StyledToolWindowTab>
            <StyledToolWindowTab selected active>
              selected active
            </StyledToolWindowTab>
          </StyledToolWindowTabs>

          <StyledDefaultTabs>
            <StyledDebuggerTab>Debugger tabs</StyledDebuggerTab>
            <StyledDebuggerTab selected>selected</StyledDebuggerTab>
            <StyledDebuggerTab disabled>disabled</StyledDebuggerTab>
            <StyledDebuggerTab className="hover">hovered</StyledDebuggerTab>
            <StyledDebuggerTab className="hover" active>
              hovered active
            </StyledDebuggerTab>
            <StyledDebuggerTab selected active>
              selected active
            </StyledDebuggerTab>
          </StyledDefaultTabs>
          <br />
          <Balloon
            title="Maven Projects need to be imported"
            body="Projects to be imported: MavenSync, MavenDependencies. Maven project structure has been changed. Import changes to IntelliJ IDEA project to make it work correctly. Otherwise, code analysis, completion and other features might work incorrectly."
            actions={
              <>
                <BalloonActionLink>Import changes</BalloonActionLink>
                <BalloonActionLink>Enable auto-import</BalloonActionLink>
              </>
            }
            onClose={() => {}}
            headerActions={
              <AutoHoverPlatformIcon
                icon="ide/notification/gear"
                role="button"
              />
            }
          />
          <br />
          <div style={{ display: "flex", gap: 8 }}>
            <StyledButton>Button</StyledButton>
            <StyledButton className="focus">Focused Button</StyledButton>
            <StyledButton disabled>Disabled Button</StyledButton>
            <StyledDefaultButton>Default Button</StyledDefaultButton>
            <StyledDefaultButton className="focus">
              Focused Default Button
            </StyledDefaultButton>
            <StyledDefaultButton disabled>
              Disabled Default Button
            </StyledDefaultButton>
          </div>
          <br />
          <div style={{ display: "flex", gap: 8 }}>
            <Checkbox>Checkbox</Checkbox>
            <Checkbox isIndeterminate>Indeterminate Checkbox</Checkbox>
            <Checkbox isSelected>Selected Checkbox</Checkbox>
            <Checkbox isDisabled>Disabled Checkbox</Checkbox>
          </div>
          <br />
          <div style={{ display: "flex", gap: 8 }}>
            <StyledLink>Link</StyledLink>
            <StyledLink className="active">active</StyledLink>
            <StyledLink className="disabled">disabled</StyledLink>
            <StyledLink className="hover">hover</StyledLink>
            <StyledLink className="visited">visited</StyledLink>
          </div>
          <br />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div>
              <Menu
                disabledKeys={["jumpToExternalEditor"]}
                selectedKeys={["Reformat Code"]}
                aria-label="Dummy menu"
                autoFocus
              >
                <Item textValue="Copy" key="copy">
                  <MenuItemLayout
                    icon={<PlatformIcon icon={"actions/copy"} />}
                    content="Copy"
                    shortcut={"⌘C"}
                  />
                </Item>
                <Divider />
                <Item key="Reformat Code">Reformat Code</Item>
                <Item textValue="Optimize Imports">
                  <MenuItemLayout content="Optimize Imports" shortcut={"⌃⌥O"} />
                </Item>
                <Divider />
                <Item textValue="Compare with...">
                  <MenuItemLayout
                    icon={<PlatformIcon icon={"actions/diff"} />}
                    content="Compare with..."
                  />
                </Item>
                <Divider />
                <Item
                  key="jumpToExternalEditor"
                  textValue="Jump to external editor"
                >
                  <MenuItemLayout
                    content="Jump to external editor"
                    shortcut={"⌥⌘F4"}
                  />
                </Item>
              </Menu>
            </div>
            <div style={{ width: 300 }}>
              <ProgressBar
                value={50}
                maxValue={100}
                name="Progress Bar"
                details="Details"
                button={
                  <ProgressBarPauseButton paused onPausedChange={() => {}} />
                }
              />
            </div>
          </div>
          {/* Not rendering indeterminate because of it's animation*/}
        </div>
      </ToolWindows>
      <StatusBar
        left={
          <>
            <PlatformIcon icon="general/tbHidden.svg" />
            <span style={{ marginLeft: "0.75rem" }}>
              Workspace associated with branch 'feat/balloons-provider' has been
              restored // Rollback Configure...
            </span>
          </>
        }
        right={
          <>
            <StatusBarWidget label="LF" />
            <StatusBarWidget label="UTF-8" />
            <StatusBarWidget
              icon={<PlatformIcon icon="vcs/branch.svg" />}
              label="feat/StatusBar"
            />
            <StatusBarWidget icon={<PlatformIcon icon="ide/readwrite.svg" />} />
            <StatusBarWidget
              icon={<PlatformIcon icon="ide/fatalError.svg" />}
            />
          </>
        }
      />
    </div>
  );
};
