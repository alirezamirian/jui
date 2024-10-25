import React, {
  CSSProperties,
  MouseEvent,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { styled, css } from "../styled";
import {
  StyledHorizontalSeparator,
  StyledSeparator,
  StyledVerticalSeparator,
} from "../StyledSeparator";
import { useOverflowObserver } from "@intellij-platform/core/utils/overflow-utils/useOverflowObserver";
import { PlatformIcon } from "@intellij-platform/core/Icon";
import { Overlay, useOverlayPosition } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { StyledPopupContainer } from "@intellij-platform/core/Popup/StyledPopupContainer";

type ToolbarBorderProp =
  | true
  | "horizontal"
  | "vertical"
  | "bottom"
  | "top"
  | "left"
  | "right";

export type ToolbarProps = {
  children: React.ReactNode;
  orientation?: "vertical" | "horizontal";
  border?: ToolbarBorderProp;
  style?: CSSProperties;
  className?: string;
} & (
  | {
      orientation: "vertical";
    }
  | {
      orientation?: "horizontal";
      /**
       * Defines how the toolbar should handle its children when there is not enough room
       * to fit all:
       * - popup: the overflowed children will be hidden behind a show more arrow icon that
       *   shows the rest of the items in a popup.
       * - wrap: children will be wrapped so that they fit the available width/height
       **/
      overflowBehavior?: "popup" | "wrap";
    }
);

const borderStyle = ({ border }: { border?: ToolbarBorderProp }) =>
  border &&
  css`
    border-style: solid;
    border-color: ${({ theme }) => theme.commonColors.borderColor};
    border-width: ${border === true ? "1px" : borderPropToCssProp[border]};
  `;

const StyledToolbar = styled.div<{
  border?: ToolbarBorderProp;
}>`
  display: inline-flex;
  box-sizing: border-box;
  overflow: hidden;
  // NOTE: in the original implementation, there is no empty space between buttons, but buttons have kind of an
  // invisible left padding, which is mouse-intractable, but doesn't visually seem a part of the button.
  // Although implementable, it didn't seem necessary to follow the exact same thing. Margin should be fine.
  gap: 4px;
  ${borderStyle}
  ${StyledSeparator}:first-child {
    display: none;
  }
  ${StyledSeparator}:last-child {
    display: none;
  }
`;

const borderPropToCssProp: Record<
  Exclude<ToolbarBorderProp, boolean>,
  CSSProperties["borderWidth"]
> = {
  top: "1px 0 0 0",
  bottom: "0 0 1px 0",
  right: "0 1px 0 0",
  left: "0 0 0 1px",
  horizontal: "0 1px",
  vertical: "1px 0",
};

const SIDE_PADDING = 3;
const END_PADDING = 4;

const StyledShowMoreButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  ${borderStyle};
`;

const StyledHorizontalToolbar = styled(StyledToolbar)`
  padding: ${SIDE_PADDING}px ${END_PADDING}px;
  max-width: 100%;
  /*noinspection CssInvalidPropertyValue*/
  max-width: -webkit-fill-available;
  ${StyledHorizontalSeparator} {
    margin: 1px 0;
  }
  ${StyledShowMoreButton} {
    margin-right: -${END_PADDING}px;
  }
`;

const StyledVerticalToolbar = styled(StyledToolbar)`
  flex-direction: column;
  max-height: 100%;
  /*noinspection CssInvalidPropertyValue*/
  max-height: -webkit-fill-available;
  padding: ${END_PADDING}px ${SIDE_PADDING}px;
  ${StyledVerticalSeparator} {
    margin: 0 1px;
  }
  ${StyledShowMoreButton} {
    margin-bottom: -${END_PADDING}px;
  }
`;

const StyledToolbarContent = styled.div<{
  shouldWrap?: boolean;
  firstOverflowedIndex: number;
}>`
  box-sizing: inherit;
  display: inherit;
  flex-direction: inherit;
  flex-wrap: ${({ shouldWrap }) => (shouldWrap ? "wrap" : "nowrap")};
  gap: inherit;
  max-height: inherit;
  max-width: inherit;
  min-height: 0;
  min-width: 0;

  ${({ firstOverflowedIndex }) =>
    /**
     * The hidden styles should be in a way that the hidden element:
     * - occupies its space in the document layout.
     * - doesn't capture mouse events. (e.g. a half-overflowing hidden element shouldn't show tooltip)
     * - remains accessible to screen readers.
     */
    css`
      > ${firstOverflowedIndex === 0
          ? "*"
          : `:nth-child(${firstOverflowedIndex}) ~ *`} {
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `}
`;
// This can be used in other places if use-cases are raised for keeping orientation in the context.
const OrientationContext = React.createContext<"horizontal" | "vertical">(
  "horizontal"
);

/**
 * ## Toolbar API/Implementation notes
 *
 * ### Handling Overflow
 *
 * Handling the overflow popup on DOM-level, allows for a simple and flexible implementation that doesn't
 * require any coupling between Toolbar and components like IconButton. Other components can also similarly be
 * rendered inside toolbar without adopting any specific API. It's worth noting that any generic approach based
 * on children react nodes instead of children DOM nodes will have many edge cases and will involve assumptions
 * that will limit the API of toolbar. Also, any approach based on moving dom nodes to the overflow popup will
 * conflict with React owning the DOM.
 *
 * #### Assumption
 *
 * Since the overflow popup renders the same `children`, and items in the toolbar and popup overflow are made
 * visible/hidden based on the index of DOM nodes, it's important than children deterministically results in the
 * same dom structure. i.e. if a component in children randomly renders different number of root dom nodes in
 * each render, it can cause issues in hiding/showing elements.
 *
 * ### Orientation
 * A few reasons for not having separate `HorizontalToolbar` and `VerticalToolbar` components instead of `Toolbar` with
 * `orientation` prop:
 * - From usage side, a single `Toolbar` component is considered a more discoverable API.
 * - Separate components would require abstracting common parts which unnecessarily adds to complexity.
 *   The amount of branching to handle the differences is considered ok, at the current state of the component.
 */

/**
 * @description
 * A toolbar is a container for {@link IconButton} and similar UI components.
 *
 * ## Features:
 * - A toolbar can be horizontal or vertical
 * - When there is not enough space for all children, toolbar shows an arrow icon, which shows the overflowing
 *   items in a popup, upon mouseover.
 *   Optionally, overflow can be wrapped into multiple lines, in horizontal toolbars.
 *
 * @example
 * <Toolbar>
 *   <IconButton aria-label="Show Diff">
 *     <PlatformIcon icon="actions/diff" />
 *   </IconButton>
 *   </Toolbar>
 */
export const Toolbar: React.FC<ToolbarProps> = ({
  border,
  orientation = "horizontal",
  ...props
}): React.ReactElement => {
  const overflowBehavior =
    orientation === "horizontal" && "overflowBehavior" in props
      ? props.overflowBehavior
      : null;
  const rootProps = { style: props.style, className: props.className };
  const ref = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const showMoreButtonRef = useRef<HTMLButtonElement>(null);
  const StyledToolbar =
    orientation === "horizontal"
      ? StyledHorizontalToolbar
      : StyledVerticalToolbar;
  const { overflowedElements } = useOverflowObserver(ref, { threshold: 0.8 });
  const [isOverflowPopupVisible, setOverflowPopupVisible] = useState(false);
  const [popupHeight, setPopupHeight] = useState(30);
  const [firstOverflowedChildIndex, setFirstOverflowedChildIndex] =
    useState<number>(-1);
  const firstOverflowedChildRef = useRef<HTMLElement | undefined>();

  useLayoutEffect(() => {
    if (ref.current) {
      const childElements = [...ref.current.children].filter(
        (node): node is HTMLElement => node instanceof HTMLElement
      );
      const firstOverflowedChild = childElements.findIndex((child) =>
        overflowedElements.includes(child)
      );
      setFirstOverflowedChildIndex(firstOverflowedChild);
      firstOverflowedChildRef.current = childElements[firstOverflowedChild];
    }
  }, [overflowedElements]);

  useLayoutEffect(() => {
    if (overlayRef.current && popupHeight !== overlayRef.current.offsetHeight) {
      setPopupHeight(overlayRef.current.offsetHeight);
    }
  });

  const { overlayProps } = useOverlayPosition({
    isOpen: isOverflowPopupVisible,
    placement: "bottom left",
    offset:
      // in lack of positioning options for aligning bottom and left of of the overflow popup with the bottom and left
      // of the toolbar itself, we have to measure the popup height, and use offset to achieve the same
      orientation === "horizontal"
        ? -popupHeight + SIDE_PADDING + 1
        : -popupHeight + 1,
    crossOffset:
      orientation === "horizontal" ? -(SIDE_PADDING + 2) : -(SIDE_PADDING + 1),
    containerPadding: 0,
    shouldFlip: false,
    targetRef: orientation === "horizontal" ? ref : showMoreButtonRef,
    overlayRef: overlayRef,
    onClose: () => {
      setOverflowPopupVisible(false);
    },
  });

  const showOverflowPopup = () => {
    setOverflowPopupVisible(true);
  };

  const toolbarProps = {
    onMouseMove: (event: MouseEvent) => {
      const firstOverflowedElement = firstOverflowedChildRef.current;
      if (!firstOverflowedElement) {
        return;
      }
      const shouldShow =
        orientation === "vertical"
          ? event.clientY > firstOverflowedElement.getBoundingClientRect().top
          : event.clientX > firstOverflowedElement.getBoundingClientRect().left;
      if (shouldShow !== isOverflowPopupVisible) {
        setOverflowPopupVisible(shouldShow);
      }
    },
    onMouseLeave: () => {
      if (isOverflowPopupVisible) {
        setOverflowPopupVisible(false);
      }
    },
  };
  const toolbarOverflowPopupProps = {
    onMouseEnter: () => setOverflowPopupVisible(true),
    onMouseLeave: () => setOverflowPopupVisible(false),
  };
  return (
    <OrientationContext.Provider value={orientation}>
      <StyledToolbar
        border={border}
        {...mergeProps(rootProps, toolbarProps)}
        role="toolbar"
      >
        <StyledToolbarContent
          ref={ref}
          role="presentation"
          firstOverflowedIndex={firstOverflowedChildIndex}
          shouldWrap={overflowBehavior === "wrap"}
        >
          {props.children}
        </StyledToolbarContent>
        {overflowedElements.length > 0 && (
          <StyledShowMoreButton
            ref={showMoreButtonRef}
            tabIndex={-1}
            onMouseEnter={showOverflowPopup}
          >
            <PlatformIcon icon="ide/link" />
          </StyledShowMoreButton>
        )}
      </StyledToolbar>
      {isOverflowPopupVisible && overflowedElements.length > 0 && (
        // Maybe more accessible to reuse the entire Popup here? it would require more flexible API to handle mouseleave though
        // Note: we could also render the whole toolbar with the same props and only orientation being overwritten,
        // but it has the risk of infinite overlay opening in some edge cases, and that level of generality doesn't
        // seem to be necessary, at least at the moment.
        <OrientationContext.Provider value="horizontal">
          <Overlay>
            <StyledPopupContainer
              ref={overlayRef}
              {...mergeProps(overlayProps, toolbarOverflowPopupProps)}
            >
              <ToolbarInOverlay
                border
                firstVisibleIndex={
                  orientation === "vertical"
                    ? firstOverflowedChildIndex
                    : undefined
                }
              >
                {props.children}
              </ToolbarInOverlay>
            </StyledPopupContainer>
          </Overlay>
        </OrientationContext.Provider>
      )}
    </OrientationContext.Provider>
  );
};

const ToolbarInOverlay = styled(StyledHorizontalToolbar)<{
  firstVisibleIndex?: number;
}>`
  ${({ firstVisibleIndex }) =>
    firstVisibleIndex &&
    css`
      ${StyledSeparator}:nth-child(${firstVisibleIndex + 1}) {
        display: none;
      }
      > :not(:nth-child(${firstVisibleIndex}) ~ *) {
        display: none;
      }
    `};
`;

/**
 * Separator to be used between items in a toolbar.
 */
export const ToolbarSeparator = (): React.ReactElement => {
  const orientation = useContext(OrientationContext);
  return orientation === "horizontal" ? (
    <StyledHorizontalSeparator />
  ) : (
    <StyledVerticalSeparator />
  );
};
