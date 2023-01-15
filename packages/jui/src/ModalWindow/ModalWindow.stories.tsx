import { Meta, Story } from "@storybook/react";
import React, { useEffect, useState } from "react";
import { ModalWindow, ModalWindowProps } from "./ModalWindow";
import { SpeedSearchTreeSample } from "@intellij-platform/core/story-components";
import { Bounds, containedWithin } from "@intellij-platform/core/Overlay";
import {
  ActionButton,
  ActionToolbar,
  Button,
  Checkbox,
  PlatformIcon,
  styled,
  WindowLayout,
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
      <StyledContainer>
        <StyledFrame>
          <SpeedSearchTreeSample />
        </StyledFrame>
      </StyledContainer>
    ),
    title: "Dialog title",
  },
  parameters: {
    actions: { argTypesRegex: "^on((?!BoundsChanging).)*$" },
  },
  // argTypes: {},
} as Meta<ModalWindowProps>;

const rollbackWindowContent = (
  <>
    <StyledContainer style={{ paddingBottom: 0 }}>
      <div style={{ display: "flex" }}>
        <ActionToolbar>
          <ActionButton>
            <PlatformIcon icon="actions/diff" />
          </ActionButton>
          <ActionButton>
            <PlatformIcon icon="actions/groupBy" />
          </ActionButton>
        </ActionToolbar>
        <span style={{ flex: 1 }} />
        <ActionToolbar>
          <ActionButton>
            <PlatformIcon icon="actions/expandall" />
          </ActionButton>
          <ActionButton>
            <PlatformIcon icon="actions/collapseall" />
          </ActionButton>
        </ActionToolbar>
      </div>

      <StyledFrame>
        <SpeedSearchTreeSample />
      </StyledFrame>
    </StyledContainer>
  </>
);

const Template: Story<ModalWindowProps> = (props) => <ModalWindow {...props} />;

export const ControlledBounds: Story<ModalWindowProps> = (props) => {
  const [bounds, setBounds] = useState<Bounds>({
    left: 100,
    top: 100,
    width: 450,
    height: 300,
  });
  return (
    <ModalWindow {...props} bounds={bounds} onBoundsChange={setBounds}>
      <div style={{ padding: 16 }}>
        bounds: {JSON.stringify(bounds, null, 2)}
        <RenderCount />
      </div>
    </ModalWindow>
  );
};

export const Default = Template.bind({});

export const NoResize = Template.bind({});
NoResize.args = {
  interactions: "move",
};
export const DefaultSize = Template.bind({});
DefaultSize.args = {
  defaultBounds: { width: 300, height: 300 },
};

export const DefaultPosition = Template.bind({});
DefaultPosition.args = {
  defaultBounds: { left: 100, top: 100 },
};

export const DefaultSizeAndPosition = Template.bind({});
DefaultSizeAndPosition.args = {
  defaultBounds: { left: 100, top: 100, width: 300, height: 300 },
};

export const NoInteraction = Template.bind({});
NoInteraction.args = {
  interactions: "none",
};

export const LimitedMovement: Story<
  Omit<ModalWindowProps, "onBoundsChanging"> & { containerBounds: Bounds }
> = ({ containerBounds, ...props }) => (
  <>
    <ModalWindow
      {...props}
      onBoundsChanging={containedWithin(containerBounds)}
    />
    <div
      style={{
        position: "fixed",
        boxShadow: "0 0 0 2px rgb(255 0 0 / 50%)",
        ...containerBounds,
      }}
    />
  </>
);

LimitedMovement.args = {
  containerBounds: {
    left: 20,
    top: 20,
    width: window.innerWidth - 100,
    height: window.innerHeight - 100,
  },
};

const NestedWindowExample = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <div style={{ padding: "1rem" }}>
      <Button onPress={() => setOpen(true)}>Open another window</Button>
      {open && (
        <ModalWindow
          title="Nested window"
          minWidth="content"
          onClose={close}
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
        >
          <StyledContainer>
            Press Escape or any button to close this window.
          </StyledContainer>
        </ModalWindow>
      )}
    </div>
  );
};
export const Nested = Template.bind({});
Nested.args = {
  children: <NestedWindowExample />,
  minWidth: window.innerWidth / 3,
  minHeight: window.innerHeight / 3,
};

export const MinSize = Template.bind({});

MinSize.args = {
  minWidth: 300,
  minHeight: 200,
  children: (
    <div style={{ padding: 16 }}>
      Minimum size is set to 300x200 pixels. You can resize to a bigger size.
    </div>
  ),
};
export const MinSizeContent = Template.bind({});

MinSizeContent.args = {
  minWidth: "content",
  minHeight: "content",
  children: (
    <div style={{ padding: 16, outline: "none" }} contentEditable>
      Window Content. Window Content. Window Content. <br />
      Window Content. Window Content. Window Content. <br />
      Window Content. Window Content. Window Content.
    </div>
  ),
};

export const WithTallFooter = Template.bind({});

WithTallFooter.args = {
  minHeight: 200,
  minWidth: 275,
  title: "Rollback Changes",
  children: rollbackWindowContent,
  footer: (
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
  ),
};

export const WithFooter = Template.bind({});

WithFooter.args = {
  footer: (
    <WindowLayout.Footer
      left={
        <>
          <Button variant="icon">?</Button>
          <Checkbox>Open in editor</Checkbox>
        </>
      }
      right={
        <>
          <Button autoFocus>Cancel</Button>
          <Button variant="default">OK</Button>
        </>
      }
    />
  ),
};
