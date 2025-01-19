import { Meta, StoryObj } from "@storybook/react";
import React, { useEffect, useState } from "react";
import { ModalWindow, ModalWindowProps } from "./ModalWindow";
import { SpeedSearchTreeSample } from "@intellij-platform/core/story-components";
import { Bounds, containedWithin } from "@intellij-platform/core/Overlay";
import {
  IconButton,
  Toolbar,
  Button,
  Checkbox,
  PlatformIcon,
  styled,
  WindowLayout,
  TooltipTrigger,
  HelpTooltip,
} from "@intellij-platform/core";

const StyledContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.75rem;
`;
const StyledFrame = styled.div`
  border: 1px solid ${({ theme }) => theme.commonColors.contrastBorder};
  flex: 1;
  overflow: auto;
`;

const StyledLine = styled.div`
  line-height: 2;
  padding-left: 0.5rem;
  color: ${({ theme }) => theme.commonColors.green};
`;

const RenderCount = () => {
  const ref = React.useRef(1);
  useEffect(() => {
    ref.current++;
  });
  return <div>Number of re-renders {ref.current}</div>;
};

export default {
  title: "Components/ModalWindow",
  component: ModalWindow,
  args: {
    children: (
      <WindowLayout
        header="Window title"
        content={
          <StyledContainer>
            <StyledFrame>
              <SpeedSearchTreeSample />
            </StyledFrame>
          </StyledContainer>
        }
      />
    ),
  },
  // argTypes: {},
} as Meta<ModalWindowProps>;

export const ControlledBounds: StoryObj<ModalWindowProps> = {
  render: (props) => {
    const [bounds, setBounds] = useState<Bounds>({
      left: 100,
      top: 100,
      width: 450,
      height: 300,
    });
    return (
      <ModalWindow {...props} bounds={bounds} onBoundsChange={setBounds}>
        <WindowLayout
          header="Window title"
          content={
            <div style={{ padding: 16 }}>
              bounds: {JSON.stringify(bounds, null, 2)}
              <RenderCount />
            </div>
          }
        />
      </ModalWindow>
    );
  },
};

export const Default: StoryObj<ModalWindowProps> = {};

export const NoResize: StoryObj<ModalWindowProps> = {
  args: {
    interactions: "move",
  },
};

export const DefaultSize: StoryObj<ModalWindowProps> = {
  args: {
    defaultBounds: { width: 300, height: 300 },
  },
};

export const DefaultPosition: StoryObj<ModalWindowProps> = {
  args: {
    defaultBounds: { left: 100, top: 100 },
  },
};

export const DefaultSizeAndPosition: StoryObj<ModalWindowProps> = {
  args: {
    defaultBounds: { left: 100, top: 100, width: 300, height: 300 },
  },
};

export const NoInteraction: StoryObj<ModalWindowProps> = {
  args: {
    interactions: "none",
  },
};

export const LimitedMovement: StoryObj<
  Omit<ModalWindowProps, "onBoundsChanging"> & { containerBounds: Bounds }
> = {
  render: ({ containerBounds, ...props }) => (
    <>
      <ModalWindow
        {...props}
        onBoundsChanging={containedWithin(containerBounds)}
      />
      <WindowLayout
        header="Window title"
        content={
          <div
            style={{
              position: "fixed",
              boxShadow: "0 0 0 2px rgb(255 0 0 / 50%)",
              ...containerBounds,
            }}
          />
        }
      />
    </>
  ),

  args: {
    containerBounds: {
      left: 20,
      top: 20,
      width: window.innerWidth - 100,
      height: window.innerHeight - 100,
    },
  },
};

const NestedWindowExample = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <div style={{ padding: "1rem" }}>
      <Button onPress={() => setOpen(true)}>Open another window</Button>
      {open && (
        <ModalWindow minWidth="content" onClose={close}>
          <WindowLayout
            header="Nested window"
            content={
              <StyledContainer>
                Press Escape or any button to close this window.
              </StyledContainer>
            }
            footer={
              <WindowLayout.Footer
                right={
                  <>
                    <Button autoFocus onPress={close}>
                      Cancel
                    </Button>
                    <Button variant="default" onPress={close}>
                      OK
                    </Button>
                  </>
                }
              />
            }
          />
        </ModalWindow>
      )}
    </div>
  );
};

export const Nested: StoryObj<ModalWindowProps> = {
  args: {
    children: <NestedWindowExample />,
    minWidth: window.innerWidth / 3,
    minHeight: window.innerHeight / 3,
  },
};

export const MinSize: StoryObj<ModalWindowProps> = {
  args: {
    minWidth: 300,
    minHeight: 200,
    children: (
      <div style={{ padding: 16 }}>
        Minimum size is set to 300x200 pixels. You can resize to a bigger size.
      </div>
    ),
  },
};

export const MinSizeContent: StoryObj<ModalWindowProps> = {
  args: {
    minWidth: "content",
    minHeight: "content",
    children: (
      <div style={{ padding: 16, outline: "none" }} contentEditable>
        Window Content. Window Content. Window Content. <br />
        Window Content. Window Content. Window Content. <br />
        Window Content. Window Content. Window Content.
      </div>
    ),
  },
};

export const WithTallFooter: StoryObj<ModalWindowProps> = {
  args: {
    minHeight: 200,
    minWidth: 275,
    children: (
      <WindowLayout
        header="Rollback Changes"
        content={
          <StyledContainer style={{ paddingBottom: 0 }}>
            <div style={{ display: "flex" }}>
              <Toolbar>
                <IconButton>
                  <PlatformIcon icon="actions/diff" />
                </IconButton>
                <IconButton>
                  <PlatformIcon icon="actions/groupBy" />
                </IconButton>
              </Toolbar>
              <span style={{ flex: 1 }} />
              <Toolbar>
                <IconButton>
                  <PlatformIcon icon="actions/expandall" />
                </IconButton>
                <IconButton>
                  <PlatformIcon icon="actions/collapseall" />
                </IconButton>
              </Toolbar>
            </div>

            <StyledFrame>
              <SpeedSearchTreeSample />
            </StyledFrame>
          </StyledContainer>
        }
        footer={
          <>
            <div
              style={{
                padding: "0 .75rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <StyledLine>1 added</StyledLine>
              <Checkbox>Delete local copies of the added files</Checkbox>
            </div>
            <WindowLayout.Footer
              right={
                <>
                  <Button autoFocus>Cancel</Button>
                  <Button variant="default">Rollback</Button>
                </>
              }
            />
          </>
        }
      />
    ),
  },
};

export const WithFooter: StoryObj<ModalWindowProps> = {
  args: {
    children: (
      <WindowLayout
        header="Dialog title"
        content={
          <StyledContainer>
            <StyledFrame>
              <SpeedSearchTreeSample />
            </StyledFrame>
          </StyledContainer>
        }
        footer={
          <WindowLayout.Footer
            left={
              <>
                <TooltipTrigger
                  tooltip={<HelpTooltip helpText="Show Help Contents" />}
                >
                  <Button variant="icon">
                    <PlatformIcon icon="actions/help"></PlatformIcon>
                  </Button>
                </TooltipTrigger>
                <Checkbox>Open in editor</Checkbox>
              </>
            }
            right={
              <>
                <Button autoFocus>Cancel</Button>
                <Button variant="default">Ok</Button>
              </>
            }
          />
        }
      />
    ),
  },
};
