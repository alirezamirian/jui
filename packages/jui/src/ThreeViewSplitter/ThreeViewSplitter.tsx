import React, { CSSProperties, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import {
  BottomResizer,
  LeftResizer,
  RightResizer,
  TopResizer,
} from "../Resizer";
import { ResizerProps } from "../Resizer/ResizerProps";
import { Theme } from "../Theme/Theme";

/**
 * Props are named mostly based on ThreeComponentsSplitter in Intellij Platform.
 */
export interface ThreeViewSplitterProps {
  orientation?: "horizontal" | "vertical";
  resizerProps?: Partial<
    Omit<ResizerProps, "onResize" | "onResizeStarted" | "onResizeEnd">
  >;
  innerView?: React.ReactNode;
  innerViewMinSize?: number;
  firstView?: React.ReactNode;
  firstSize?: number | null;
  firstViewMinSize?: number;
  lastView?: React.ReactNode;
  lastSize?: number | null;
  lastViewMinSize?: number;
  onFirstResize?: (size: number) => void;
  onLastResize?: (size: number) => void;
  style?: CSSProperties;
  className?: string;
}

const StyledSplitterContainer = styled.div<{
  orientation: "horizontal" | "vertical";
}>`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-direction: ${({ orientation }) =>
    orientation === "vertical" ? "column" : "row"};
`;

const StyledView = styled.div`
  // The default overflow visible should be changed obviously. Not sure if there is any layout implication
  // in using 'auto' instead of hidden, to provide scroll behaviour by default, but even if we realize later
  // that we need to set overflow to hidden here, we can have scrollable content inside the inner view via an
  // intermediate element inside the inner view, with overflow set to auto and width set to 100%.
  overflow: auto;
`;

const StyledSplitterInnerView = styled(StyledView)`
  flex: 1;
`;

/**
 * Corresponding to
 * [ThreeComponentsSplitter](https://github.com/JetBrains/intellij-community/blob/58dbd93e9ea527987466072fa0bfbf70864cd35f/platform/platform-api/src/com/intellij/openapi/ui/ThreeComponentsSplitter.java#L40-L40)
 * `firstView` and `lastView` are optional, and if not provided, the corresponding resizer is not rendered.
 * innerView is supposed to fill the remaining space, while firstView and lastView have specific sizes.
 * size changes in a resize interaction is not reported and is handled by local state in the component. That's
 * to prevent frequent state updates in a higher level which can be expensive. It's also based on this assumption
 * that in the usage side there is no need for any control over resizing or even knowing the intermediate state.
 * Maybe a minSize and maxSize would be the extent of the required control over resizing. But anyway, this model
 * of keeping the size as a local state during a resize session is something that can be changed if needed.
 *
 * Features:
 * - Relative sizing (fraction of the container)
 * - Default size by content
 * - Change handling only when resize is done.
 *
 * TODO: max and min size not implemented
 * TODO: add support for uncontrolled version
 */
export const ThreeViewSplitter: React.FC<ThreeViewSplitterProps> = ({
  orientation = "horizontal",
  firstView,
  firstSize,
  lastView,
  lastSize,
  onFirstResize,
  onLastResize,
  resizerProps: resizerPropsOverrides = {},
  innerView,
  firstViewMinSize,
  lastViewMinSize,
  innerViewMinSize,
  ...containerProps
}: ThreeViewSplitterProps): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstViewRef = useRef<HTMLDivElement>(null);
  const lastViewRef = useRef<HTMLDivElement>(null);
  const resizeFromRef = useRef<{
    firstView: number | null;
    lastView: number | null;
  }>({ firstView: null, lastView: null });
  const [firstSizeState, setFirstSizeState] = useState<number | null>(null);
  const [lastSizeState, setLastSizeState] = useState<number | null>(null);
  const theme = useTheme() as Theme;

  const value = <T1, T2>(horizontalValue: T1, verticalValue: T2) =>
    orientation === "horizontal" ? horizontalValue : verticalValue;

  const FirstResizer: React.ComponentType<ResizerProps> = value(
    RightResizer,
    BottomResizer
  );
  const SecondResizer: React.ComponentType<ResizerProps> = value(
    LeftResizer,
    TopResizer
  );
  const sizeStyleProp = value("width", "height");
  const minSizeStyleProp = value("minWidth", "minHeight");

  const resizerProps: ThreeViewSplitterProps["resizerProps"] = {
    background: theme.commonColors.contrastBorder,
    size: 1,
    ...resizerPropsOverrides,
  };

  const isFractionSize = (size: number) => size < 1;

  const normalizeSize = (
    size: number | undefined | null
  ): CSSProperties["width" | "height"] =>
    size != null
      ? isFractionSize(size)
        ? `${size * 100}%`
        : Math.round(size)
      : undefined;

  const getSize = (elem: HTMLElement): number =>
    value(elem.offsetWidth, elem.offsetHeight);

  const getNewSize = (fromSize: number, resize: number) => {
    if (fromSize != null && isFractionSize(fromSize)) {
      if (!containerRef.current) {
        throw new Error(
          "ThreeViewSplitter: Could not locate container to calculate fraction size"
        );
      }
      const containerSize = value(
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight
      );
      const newFractionSize = resize / containerSize;
      return newFractionSize < 1 ? newFractionSize : fromSize;
    } else {
      return Math.max(resize, 1);
    }
  };

  const getActualSize = (viewElem: HTMLElement | null): number | null => {
    if (!containerRef.current || !viewElem) {
      return null;
    }
    const actualSize = getSize(viewElem);
    if (viewElem.style[sizeStyleProp]?.includes("%")) {
      return actualSize / getSize(containerRef.current);
    }
    return actualSize;
  };

  const currentLastSize = normalizeSize(lastSizeState ?? lastSize);
  const currentFirstSize = normalizeSize(firstSizeState ?? firstSize);
  return (
    <StyledSplitterContainer
      ref={containerRef}
      orientation={orientation}
      {...containerProps}
    >
      {firstView && (
        <>
          <StyledView
            ref={firstViewRef}
            style={{
              [sizeStyleProp]: currentFirstSize,
              // if other side is resizing, minWidth/minHeight is set so that this side is not get affected.
              // It may make sense to allow opting out of this behaviour, if it's considered a feature to be able to
              // "push" the other side too when expanding one side.
              [minSizeStyleProp]:
                (lastSizeState !== null ? currentFirstSize : undefined) ??
                firstViewMinSize,
            }}
          >
            {firstView}
          </StyledView>
          <FirstResizer
            onResizeStarted={() => {
              const size = firstViewRef.current
                ? getSize(firstViewRef.current)
                : 0;
              setFirstSizeState(firstSize ?? size);
              // In React 18, set state in handlers can be batched, so we can't rely
              // on `firstSizeState` in `onResize`, and keep the initial size in a ref too.
              // Although not likely in practice for those events to be batched,
              // it at least happened in tests.
              resizeFromRef.current.firstView = firstSize ?? size;
              return size;
            }}
            onResize={(newSize) => {
              if (resizeFromRef.current.firstView != null) {
                setFirstSizeState(
                  getNewSize(resizeFromRef.current.firstView, newSize)
                );
              }
            }}
            onResizeEnd={() => {
              const actualSize = getActualSize(firstViewRef.current);
              if (actualSize !== null) {
                onFirstResize?.(actualSize);
              }
              setFirstSizeState(null);
            }}
            {...resizerProps}
          />
        </>
      )}
      {innerView && (
        <StyledSplitterInnerView
          style={{
            [minSizeStyleProp]: innerViewMinSize,
          }}
        >
          {innerView}
        </StyledSplitterInnerView>
      )}
      {lastView && (
        <>
          <SecondResizer
            onResizeStarted={() => {
              const size = getSize(lastViewRef.current!);
              setLastSizeState(lastSize ?? size);
              resizeFromRef.current.lastView = lastSize ?? size;
              return size;
            }}
            onResize={(newSize) => {
              if (resizeFromRef.current.lastView != null) {
                setLastSizeState(
                  getNewSize(resizeFromRef.current.lastView, newSize)
                );
              }
            }}
            onResizeEnd={() => {
              const actualSize = getActualSize(lastViewRef.current);
              if (actualSize !== null) {
                onLastResize?.(actualSize);
              }
              setLastSizeState(null);
            }}
            {...resizerProps}
          />
          <StyledView
            ref={lastViewRef}
            style={{
              [sizeStyleProp]: currentLastSize,
              // if other side is resizing, minWidth/minHeight is set so that this side is not get affected.
              // It may make sense to allow opting out of this behaviour, if it's considered a feature to be able to
              // "push" the other side too when expanding one side.
              [minSizeStyleProp]:
                (firstSizeState !== null ? currentLastSize : undefined) ??
                lastViewMinSize,
            }}
          >
            {lastView}
          </StyledView>
        </>
      )}
    </StyledSplitterContainer>
  );
};
