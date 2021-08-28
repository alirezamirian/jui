import { mergeProps } from "@react-aria/utils";
import React, { CSSProperties, Key, useRef } from "react";
import { createGetDropPosition, DropPosition } from "./createGetDropPosition";
import { useMovableStripeButtons } from "./MovableToolWindowStripeProvider";
import { StyledSpacer, StyledToolWindowStripe } from "./StyledToolWindowStripe";
import { StyledToolWindowStripeButton } from "./StyledToolWindowStripeButton";
import { useElementMove, UseElementMoveOptions } from "./useElementMove";
import { Anchor, isHorizontal } from "./utils";

interface ToolWindowStripeProps<T> {
  anchor: Anchor;
  items: T[];
  splitItems?: T[];
  getKey: (item: T) => Key;
  renderItem: (item: T) => React.ReactNode;
  selectedKeys?: Key[];
  onItemPress?: (key: Key) => void;
}

/**
 * TODO: refactor to remove the key based interface.
 * findings:
 * - Stripe priority: top, left, bottom right
 */
export function ToolWindowStripe<T>({
  anchor,
  items: mainItems,
  renderItem: render,
  splitItems = [],
  selectedKeys = [],
  onItemPress,
  getKey,
}: ToolWindowStripeProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    getProps,
    draggingRect,
    draggingKey,
    dropPosition,
  } = useMovableStripeButtons({
    stripeElRef: containerRef,
    getKey,
    anchor,
    mainItems,
    splitItems,
    createGetDropPosition: (key: Key) => {
      const isNotCurrentItem = (anItem: T) => getKey(anItem) !== key;
      const stripeElement = containerRef.current!;
      const getItemRect = (key: Key) =>
        stripeElement
          .querySelector(`[data-key="${key}"]`)! // FIXME
          .getBoundingClientRect();
      return createGetDropPosition({
        stripeElement: stripeElement,
        mainItems: mainItems.filter(isNotCurrentItem),
        splitItems: splitItems.filter(isNotCurrentItem),
        getKey,
        anchor,
        getItemRect,
      });
    },
  });

  const highlighted =
    dropPosition != null &&
    draggingKey != null &&
    [...mainItems, ...splitItems].every((item) => getKey(item) !== draggingKey);

  const renderItem = (item: T) => {
    const key = getKey(item);

    return (
      <ToolWindowStripeButton
        anchor={anchor}
        key={key}
        data-key={key}
        style={{
          ...getStripeButtonStyles({
            key,
            dropPosition,
            anchor,
            draggingRect,
            draggingKey,
          }),
        }}
        {...getProps(key)}
        active={selectedKeys.includes(key)}
        onPress={() => onItemPress?.(key)}
      >
        {render(item)}
      </ToolWindowStripeButton>
    );
  };
  return (
    <>
      <StyledToolWindowStripe
        anchor={anchor}
        preventCollapse={Boolean(dropPosition)}
        highlighted={highlighted}
        ref={containerRef}
      >
        {mainItems.map(renderItem)}
        <StyledSpacer />
        {splitItems.map(renderItem)}
      </StyledToolWindowStripe>
    </>
  );
}

function getStripeButtonStyles({
  anchor,
  key,
  dropPosition,
  draggingRect,
  draggingKey,
}: {
  anchor: Anchor;
  key: Key;
  draggingKey: Key | null;
  draggingRect: ClientRect | null;
  dropPosition: DropPosition | null;
}) {
  const styles: CSSProperties = {
    // transition: "margin 100ms", // maybe only when drag is in progress, if unwanted transition at drop
  };
  if (dropPosition?.relative?.key === key && draggingRect) {
    const marginValue = isHorizontal(anchor)
      ? draggingRect.width
      : draggingRect.height;

    if (isHorizontal(anchor)) {
      styles[
        dropPosition.relative.placement === "before"
          ? "marginLeft"
          : "marginRight"
      ] = marginValue;
    } else {
      styles[
        dropPosition.relative.placement === "before"
          ? "marginTop"
          : "marginBottom"
      ] = marginValue;
    }
  }
  if (key === draggingKey) {
    styles.display = "none";
  }
  return styles;
}

function ToolWindowStripeButton<T, S>({
  children,
  anchor,
  onMoveStart,
  onMove,
  onMoveEnd,
  onPress,
  moveDisabled,
  ...otherProps
}: {
  children: React.ReactNode;
  anchor: Anchor;
  style: CSSProperties;
  active: boolean;
  onPress: () => void;
  moveDisabled?: boolean;
  onMoveStart: UseElementMoveOptions<S>["onMoveStart"];
  onMove: UseElementMoveOptions<S>["onMove"];
  onMoveEnd: UseElementMoveOptions<S>["onMoveEnd"];
}) {
  const ref = useRef<HTMLElement>(null);

  // for some reason, usePress and useMove (used in useElementMove) are not compatible.
  // it seems onMouseDown in useMove is not called, even when handlers are merged by mergeProps.
  // FIXME: fix compatibility of useMove and usePress, and switch to usePress({ onPress })
  const { pressProps } = { pressProps: { onClick: onPress } }; //usePress({ onPress });
  const props = useElementMove({
    ref,
    disabled: moveDisabled,
    dragThreshold: 7,
    ghost: true,
    onMoveStart,
    onMove,
    onMoveEnd,
  });

  return (
    <StyledToolWindowStripeButton
      anchor={anchor}
      {...mergeProps(otherProps, pressProps, props)}
      ref={ref}
    >
      {children}
    </StyledToolWindowStripeButton>
  );
}
