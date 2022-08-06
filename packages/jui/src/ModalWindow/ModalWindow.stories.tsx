import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { ModalWindow, ModalWindowProps } from "./ModalWindow";
import { SpeedSearchTreeSample } from "@intellij-platform/core/story-components";
import {
  Bounds,
  containedWithin,
  getDefaultBounds,
} from "@intellij-platform/core/Window";
import {
  ActionButton,
  ActionToolbar,
  Button,
  Checkbox,
  PlatformIcon,
  styled,
  WindowLayout,
} from "@intellij-platform/core";

export default {
  title: "Components/ModalWindow",
  component: ModalWindow,
  args: {
    children: <SpeedSearchTreeSample />,
    title: "Dialog title",
  } as ModalWindowProps,
  // argTypes: {},
} as Meta;

const StyledContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.75rem 0;
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

const rollbackWindowContent = (
  <>
    <StyledContainer>
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
      </div>
    </ModalWindow>
  );
};

export const Default = Template.bind({});

export const NoResize = Template.bind({});
NoResize.args = {
  interactions: "move",
};

export const NoInteraction = Template.bind({});
NoInteraction.args = {
  interactions: "none",
};

export const LimitedMovement: Story<
  Omit<ModalWindowProps, "interceptInteraction"> & { containerBounds: Bounds }
> = ({ containerBounds, ...props }) => (
  <>
    <ModalWindow
      {...props}
      interceptInteraction={containedWithin(containerBounds)}
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
  const [bounds, setBounds] = useState(getDefaultBounds(200, 200));
  return (
    <div style={{ padding: "1rem" }}>
      <Button onPress={() => setOpen(true)}>Open another window</Button>
      {open && (
        <ModalWindow
          title="Nested window"
          onClose={() => setOpen(false)}
          bounds={bounds}
          onBoundsChange={setBounds}
        >
          {" "}
        </ModalWindow>
      )}
    </div>
  );
};
export const Nested = Template.bind({});
Nested.args = {
  children: <NestedWindowExample />,
};

export const MinSize = Template.bind({});

MinSize.args = {
  minWidth: getDefaultBounds().width,
  minHeight: getDefaultBounds().height,
  children: (
    <div style={{ padding: 16 }}>
      Minimum size is set to the default size. You can resize to a bigger size.
    </div>
  ),
};

export const WithTallFooter = Template.bind({});

WithTallFooter.args = {
  minHeight: 200,
  title: "Rollback Changes",
  children: rollbackWindowContent,
  defaultBounds: getDefaultBounds(400, 500),
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
      hasBorder
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
