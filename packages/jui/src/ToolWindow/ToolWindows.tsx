import React, {
  CSSProperties,
  ForwardedRef,
  Key,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ThreeViewSplitter } from "../ThreeViewSplitter/ThreeViewSplitter";
import { FocusScope } from "../utils/FocusScope";
import { FloatToolWindows } from "./FloatToolWindows";
import { MovableToolWindowStripeProvider } from "./MovableToolWindowStripeProvider";
import { StyledToolWindowOuterLayout } from "./StyledToolWindowOuterLayout";
import {
  getToolWindowsLayoutState,
  SideDockedState,
  StripesState,
  ToolWindowsLayoutState,
} from "./ToolWindowsState/ToolWindowsLayoutState";
import { ToolWindowsState } from "./ToolWindowsState/ToolWindowsState";
import { ToolWindowStateProvider } from "./ToolWindowsState/ToolWindowStateProvider";
import { ToolWindowStripe } from "./ToolWindowStripe";
import { UndockSide } from "./UndockSide";
import { Anchor, isHorizontalToolWindow } from "./utils";
import { useLatest } from "@intellij-platform/core/utils/useLatest";

export interface ToolWindowsProps {
  children: React.ReactNode;
  toolWindowsState: Readonly<ToolWindowsState>;
  onToolWindowStateChange: (newState: ToolWindowsState) => void;

  renderToolbarButton: (id: Key) => React.ReactNode;
  renderWindow: (id: Key) => React.ReactNode;
  /**
   * Whether stripe buttons should be hidden or not.
   * `hideToolStripes` UISettings in Intellij Platform
   */
  hideToolWindowBars?: boolean;

  /**
   *
   * `wideScreenSupport` in UISettings in Intellij Platform
   */
  useWidescreenLayout?: boolean;

  /**
   * min width applied to the main content (children).
   * @default 50
   */
  mainContentMinWidth?: number;

  height?: CSSProperties["height"];
  minHeight?: CSSProperties["minHeight"];
  margin?: CSSProperties["margin"];
}

export interface ToolWindowRefValue {
  focus(key: Key): void;
  focusLastActiveWindow(): void;
  focusMainContent(): void;
  changeState(
    updater: (currentState: Readonly<ToolWindowsState>) => ToolWindowsState
  ): void;
}

/**
 * @constructor
 *
 * Corresponding to ToolWindowPane in Intellij Platform
 *
 * Known issues:
 * - in Firefox and Safari, left and right toolbars are not properly shown. Seems like a nasty bug, since adding and
 * then removing some min-width: fit-content style fixes it.
 * - in the dock view of a side, open only a window from the split ones. then open a window from main ones.
 *   focus is not moved to the just opened window. The reason is we rely on autofocusing and because the React tree
 *   changes for both windows, even the split one which was open will be unmounted and mounted again, and since it's
 *   placed after the main one, and hence mounted later, it will get the focus again. This becomes a bigger issue
 *   if the main one is unpinned, because it immediately gets closed after opening.
 *   Possible solutions:
 *   - make sure the split one won't unmount and mount again in such scenario.
 *   - decouple focusing logic from mounting logic, and only focus windows somehow, when the `isVisible` is changed
 *     from false to true, not when mounted.
 * - related to previous issue: open a tool window in split section of a side. set view mode for a tool window in main
 *   section of the same side to docked_unpinned. try to open the unpinned one while the split one is open. it doesn't
 *   work.
 */
export const ToolWindows = React.forwardRef(function ToolWindows(
  {
    hideToolWindowBars = false,
    useWidescreenLayout = false,
    height = "100%",
    minHeight = "0",
    margin,
    toolWindowsState,
    onToolWindowStateChange,
    renderToolbarButton,
    renderWindow,
    children,
    mainContentMinWidth = 50,
  }: ToolWindowsProps,
  ref: ForwardedRef<ToolWindowRefValue>
): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainContentFocusScopeRef =
    useRef<React.ComponentRef<typeof FocusScope>>(null);
  const [layoutState, setLayoutState] = useState<ToolWindowsLayoutState>();
  const windowFocusableRefs = useRef<{
    [key: string]: React.RefObject<React.ComponentRef<typeof FocusScope>>;
  }>({});

  const latestRef = useLatest({ toolWindowsState });
  useImperativeHandle(
    ref,
    () => ({
      focus: (key: Key) => {
        windowFocusableRefs.current[key].current?.focus();
      },
      focusLastActiveWindow: () => {
        const { lastFocusedKey } = latestRef.current.toolWindowsState;
        if (lastFocusedKey) {
          windowFocusableRefs.current[lastFocusedKey].current?.focus(true);
        }
      },
      focusMainContent: () => {
        mainContentFocusScopeRef.current?.focus();
      },
      changeState: (updater) => {
        onToolWindowStateChange(updater(latestRef.current.toolWindowsState));
      },
    }),
    []
  );
  useLayoutEffect(() => {
    setLayoutState(
      getToolWindowsLayoutState(
        toolWindowsState,
        containerRef.current!.getBoundingClientRect()
      )
    );
  }, [toolWindowsState]);

  // TODO: extract component candidate
  const renderStripe = ({
    anchor,
    state,
  }: {
    anchor: Anchor;
    state: StripesState;
  }) => (
    <ToolWindowStripe
      anchor={anchor}
      items={state.main}
      splitItems={state.split}
      getKey={(item) => item}
      renderItem={(item) => renderToolbarButton(item)}
      onItemPress={(key) =>
        onToolWindowStateChange(toolWindowsState.toggle(key))
      }
      selectedKeys={state.activeKeys}
    />
  );

  const renderToolWindow = (key: Key) => {
    if (!windowFocusableRefs.current[key]) {
      windowFocusableRefs.current[key] = React.createRef();
    }
    return (
      <div
        style={{ all: "unset" }}
        onFocus={() => {
          onToolWindowStateChange(toolWindowsState.focused(key));
        }}
      >
        <FocusScope ref={windowFocusableRefs.current[key]}>
          <ToolWindowStateProvider
            id={key}
            containerRef={containerRef}
            mainContentFocusableRef={mainContentFocusScopeRef}
            toolWindowsState={toolWindowsState}
            onToolWindowStateChange={onToolWindowStateChange}
          >
            {renderWindow(key)}
          </ToolWindowStateProvider>
        </FocusScope>
      </div>
    );
  };
  // TODO: candidate for component extraction
  const renderSideDockedView = ({
    anchor,
    state,
  }: {
    anchor: Anchor;
    state: SideDockedState;
  }) => {
    if (!state) {
      return null;
    }
    return (
      <ThreeViewSplitter
        innerView={renderToolWindow(state.mainKey)}
        innerViewMinSize={50}
        lastView={state.split && renderToolWindow(state.split.key)}
        lastSize={state.split?.sizeFraction}
        onLastResize={(newSize) => {
          onToolWindowStateChange(
            toolWindowsState.resizeDockSplitView(anchor, newSize)
          );
        }}
        orientation={isHorizontalToolWindow(anchor) ? "horizontal" : "vertical"}
      />
    );
  };
  const onDockResize = (anchor: Anchor) => (size: number) => {
    const containerBounds = containerRef.current?.getBoundingClientRect();
    // containerBounds should have value in normal course of events
    if (containerBounds) {
      onToolWindowStateChange(
        toolWindowsState.resizeDock(anchor, size, containerBounds)
      );
    }
  };
  const getSplitViewProps = (
    layoutState: ToolWindowsLayoutState,
    orientation: "horizontal" | "vertical"
  ) => {
    const firstAnchor = orientation === "horizontal" ? "left" : "top";
    const secondAnchor = orientation === "horizontal" ? "right" : "bottom";
    return {
      orientation,
      firstView: renderSideDockedView({
        anchor: firstAnchor,
        state: layoutState[firstAnchor].docked,
      }),
      firstSize: layoutState[firstAnchor].docked?.size,
      onFirstResize: onDockResize(firstAnchor),
      lastView: renderSideDockedView({
        anchor: secondAnchor,
        state: layoutState[secondAnchor].docked,
      }),
      lastSize: layoutState[secondAnchor].docked?.size,
      onLastResize: onDockResize(secondAnchor),
    };
  };
  const renderInnerLayout = (layoutState: ToolWindowsLayoutState) => {
    const horizontalSplitterProps = getSplitViewProps(
      layoutState,
      "horizontal"
    );
    const verticalSplitterProps = getSplitViewProps(layoutState, "vertical");

    const [outerSplitterProps, innerSplitterProps] = useWidescreenLayout
      ? [horizontalSplitterProps, verticalSplitterProps]
      : [verticalSplitterProps, horizontalSplitterProps];

    const undockLayers = (["left", "top", "right", "bottom"] as const).map(
      (anchor) => {
        const state = layoutState[anchor].undocked;
        return (
          state && (
            <UndockSide
              key={anchor}
              anchor={anchor}
              state={state}
              onResize={(size) => {
                containerRef.current &&
                  onToolWindowStateChange(
                    toolWindowsState.resizeUndock(
                      anchor,
                      size,
                      containerRef.current.getBoundingClientRect()
                    )
                  );
              }}
            >
              {renderToolWindow(state.key)}
            </UndockSide>
          )
        );
      }
    );

    return (
      <>
        <MovableToolWindowStripeProvider
          onMove={({ to, from }) => {
            onToolWindowStateChange(
              toolWindowsState.move(
                layoutState[from.anchor].stripes[
                  from.isSplit ? "split" : "main"
                ][from.index],
                { anchor: to.anchor, isSplit: to.isSplit },
                to.index
              )
            );
          }}
        >
          {/**
           * ToolWindow bars, aka Stripes. Order of stripes is irrelevant for layout but relevant for
           * priority when stripe buttons are moved across stripes.
           * layout is handled by `StyledToolWindowOuterLayout`.
           */}
          <StyledToolWindowOuterLayout.LeftStripe>
            {renderStripe({
              anchor: "left",
              state: layoutState["left"].stripes,
            })}
          </StyledToolWindowOuterLayout.LeftStripe>
          <StyledToolWindowOuterLayout.TopStripe>
            {renderStripe({
              anchor: "top",
              state: layoutState["top"].stripes,
            })}
          </StyledToolWindowOuterLayout.TopStripe>
          <StyledToolWindowOuterLayout.RightStripe>
            {renderStripe({
              anchor: "right",
              state: layoutState["right"].stripes,
            })}
          </StyledToolWindowOuterLayout.RightStripe>
          <StyledToolWindowOuterLayout.BottomStripe>
            {renderStripe({
              anchor: "bottom",
              state: layoutState["bottom"].stripes,
            })}
          </StyledToolWindowOuterLayout.BottomStripe>
        </MovableToolWindowStripeProvider>
        {/**
         * The inner layout of the ToolWindow, including four tool windows and
         * a main content in the center.
         */}
        <StyledToolWindowOuterLayout.InnerView>
          <ThreeViewSplitter
            {...outerSplitterProps}
            innerView={
              <ThreeViewSplitter
                innerViewMinSize={mainContentMinWidth}
                innerView={
                  <FocusScope ref={mainContentFocusScopeRef}>
                    {children}
                  </FocusScope>
                }
                {...innerSplitterProps}
              />
            }
          />
          {undockLayers}
          {
            <FloatToolWindows
              floatWindows={layoutState?.floatWindows}
              renderToolWindow={renderToolWindow}
              onBoundsChange={(key, bounds) =>
                onToolWindowStateChange(
                  toolWindowsState.setFloatingBound(key, bounds)
                )
              }
            />
          }
        </StyledToolWindowOuterLayout.InnerView>
      </>
    );
  };
  return (
    /**
     * Potential refactoring: hideStripes can also be handled by conditionally
     * rendering tool window bars, instead of considering it as a feature of
     * StyledToolWindowOuterLayout
     **/
    <StyledToolWindowOuterLayout.Shell
      ref={containerRef}
      hideStripes={hideToolWindowBars}
      style={{ height, minHeight, margin }}
    >
      {layoutState && renderInnerLayout(layoutState)}
    </StyledToolWindowOuterLayout.Shell>
  );
});
