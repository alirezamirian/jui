import { Meta } from "@storybook/react";
import React, { CSSProperties, useState } from "react";
import { css } from "styled-components";
import {
  ComponentArgTypes,
  styledComponentsControlsExclude,
} from "../story-helpers";
import { styled } from "../styled";
import { BottomResizer } from "./BottomResizer";
import { LeftResizer } from "./LeftResizer";
import { ResizerProps } from "./ResizerProps";
import { RightResizer } from "./RightResizer";

const meta: Meta = {
  title: "Components/HorizontalResizer",
  parameters: {
    layout: "fullscreen",
    controls: { exclude: styledComponentsControlsExclude },
    component: LeftResizer,
  },
  argTypes: {
    orientation: {
      defaultValue: "horizontal",
      options: ["horizontal", "vertical"],
      control: { type: "radio" },
    },
    background: { defaultValue: "red" },
    size: { defaultValue: 5 },
    outerPadding: { defaultValue: 10 },
  } as ComponentArgTypes<ResizerProps>,
};
export default meta;

const HorizontalContainer = styled.div`
  height: 100vh;
  display: flex;
`;
const VerticalContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const LeftSide = styled.div`
  background: lightseagreen;
  height: 100%;
`;

const RightSide = styled.div`
  background: lightslategray;
  height: 100%;
  flex: 1;
`;

const TopSize = styled.div`
  background: lightseagreen;
  width: 100%;
`;

const BottomSide = styled.div`
  background: lightslategray;
  width: 100%;
  flex: 1;
`;

type StoryProps = Omit<ResizerProps, "cursor"> & {
  orientation: "horizontal" | "vertical";
};

const getComponentsAndProps = (
  orientation: "horizontal" | "vertical",
  size: number
) => {
  return orientation === "horizontal"
    ? {
        Container: HorizontalContainer,
        FirstSide: LeftSide,
        SecondSide: RightSide,
        Resizer: RightResizer,
        sizeStyles: { width: size },
      }
    : {
        Container: VerticalContainer,
        FirstSide: TopSize,
        SecondSide: BottomSide,
        Resizer: BottomResizer,
        sizeStyles: { height: size },
      };
};
export const Default = ({ orientation, ...props }: StoryProps) => {
  const [size, setSize] = useState(200);
  const {
    Resizer,
    Container,
    FirstSide,
    SecondSide,
    sizeStyles,
  } = getComponentsAndProps(orientation, size);
  return (
    <Container>
      <FirstSide style={sizeStyles}>Resizable panel</FirstSide>
      <Resizer
        {...props}
        onResizeStarted={(...args) => {
          props.onResizeStarted(...args);
          return size;
        }}
        onResize={(...args) => {
          setSize(args[0]);
          props.onResize(...args);
        }}
      />
      <SecondSide />
    </Container>
  );
};

const Handle = styled.div<{ orientation: "horizontal" | "vertical" }>`
  background: grey;
  border-radius: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${({ orientation }) =>
    orientation === "horizontal"
      ? css`
          height: 42px;
          width: 50%;
        `
      : css`
          width: 42px;
          height: 50%;
        `}
`;

export const CustomAppearance = ({ orientation, ...props }: StoryProps) => {
  const [size, setSize] = useState(200);
  const {
    Resizer,
    Container,
    FirstSide,
    SecondSide,
    sizeStyles,
  } = getComponentsAndProps(orientation, size);

  return (
    <Container>
      <FirstSide style={sizeStyles}>Resizable panel</FirstSide>
      <Resizer
        {...props}
        onResizeStarted={(...args) => {
          props.onResizeStarted(...args);
          return size;
        }}
        onResize={(...args) => {
          setSize(args[0]);
          props.onResize(...args);
        }}
      >
        <Handle orientation={orientation} />
      </Resizer>
      <SecondSide />
    </Container>
  );
};

CustomAppearance.argTypes = {
  ...meta.argTypes,
  background: { defaultValue: "lightgrey" },
  width: { defaultValue: 10 },
};

export const WithMinSize = ({
  orientation,
  minSize,
  ...props
}: StoryProps & { minSize: CSSProperties["minWidth" | "minHeight"] }) => {
  const [size, setSize] = useState(200);
  const {
    Resizer,
    Container,
    FirstSide,
    SecondSide,
    sizeStyles,
  } = getComponentsAndProps(orientation, size);
  return (
    <Container>
      <FirstSide
        style={{
          ...sizeStyles,
          [orientation === "horizontal" ? "minWidth" : "minHeight"]: minSize,
        }}
      >
        Resizable panel
      </FirstSide>
      <Resizer
        {...props}
        onResizeStarted={(...args) => {
          props.onResizeStarted(...args);
          return size;
        }}
        onResize={(...args) => {
          setSize(args[0]);
          props.onResize(...args);
        }}
      />
      <SecondSide />
    </Container>
  );
};

WithMinSize.argTypes = {
  ...meta.argTypes,
  minSize: {
    type: "string",
    options: ["100px", "fit-content", "min-content", undefined],
    control: {
      type: "select",
    },
    defaultValue: "100px",
  },
};
