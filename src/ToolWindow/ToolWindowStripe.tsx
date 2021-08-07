import { mergeProps } from "@react-aria/utils";
import React, { CSSProperties, Key, useRef, useState } from "react";
import { createGetDropPosition, DropPosition } from "./createGetDropPosition";
import { StyledSpacer, StyledToolWindowStripe } from "./StyledToolWindowStripe";
import { StyledToolWindowStripeButton } from "./StyledToolWindowStripeButton";
import { useElementMove, UseElementMoveOptions } from "./useElementMove";
import { Anchor, isHorizontal } from "./utils";

export type OnItemDroppedArgs<T> = {
  items: T[];
  splitItems: T[];
  key: Key;
  from: {
    anchor: Anchor;
    split: boolean;
    index: number;
  };
  to: {
    index: number;
    split: boolean;
  };
};

interface ToolWindowStripeProps<T> {
  anchor: Anchor;
  onItemDropped?: (args: OnItemDroppedArgs<T>) => void;
  items: T[];
  splitItems?: T[];
  getKey: (item: T) => Key;
  renderItem: (item: T) => React.ReactNode;
  selectedKeys?: Key[];
  onItemPress?: (key: Key) => void;
}

/**
 * findings:
 * - Stripe priority: top, left, bottom right
 */
export function ToolWindowStripe<T>({
  anchor,
  onItemDropped,
  items: mainItems,
  renderItem: render,
  splitItems = [],
  selectedKeys = [],
  onItemPress,
  getKey,
}: ToolWindowStripeProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dropPosition, setDropPosition] = useState<DropPosition | null>(null);
  const [draggingKey, setDraggingKey] = useState<Key | null>(null);
  const [draggingRect, setDraggingRect] = useState<ClientRect | null>(null);

  const onMoveEnd = () => {
    setDraggingKey(null);
    setDropPosition(null);
    setDraggingRect(null);

    if (onItemDropped && draggingKey && dropPosition) {
      const draggingItem = mainItems
        .concat(splitItems)
        .find((item) => getKey(item) === draggingKey);
      if (!draggingItem) {
        return;
      }
      const newItems = mainItems.filter((item) => item !== draggingItem);
      const newSplitItems = splitItems.filter((item) => item !== draggingItem);
      (dropPosition.split ? newSplitItems : newItems).splice(
        dropPosition.index,
        0,
        draggingItem
      );
      const indexOfDraggingItemInSplit = splitItems.indexOf(draggingItem);
      const index =
        indexOfDraggingItemInSplit > -1
          ? indexOfDraggingItemInSplit
          : mainItems.indexOf(draggingItem);
      onItemDropped({
        items: newItems,
        splitItems: newSplitItems,
        key: draggingKey,
        from: {
          anchor,
          split: indexOfDraggingItemInSplit > -1,
          index: index,
        },
        to: {
          split: dropPosition.split,
          index: dropPosition.index,
        },
      });
    }
  };

  const onMove = ({
    to,
    startState: { getDropPosition },
  }: {
    to: ClientRect;
    startState: {
      getDropPosition: (draggedRect: ClientRect) => DropPosition | null;
    };
  }) => {
    setDropPosition(getDropPosition(to));
  };

  const renderItem = (item: T) => {
    const key = getKey(item);
    const onMoveStart = ({ from }: { from: ClientRect }) => {
      const stripeElement = containerRef.current!;
      const getItemRect = (key: Key) =>
        stripeElement
          .querySelector(`[data-key="${key}"]`)! // FIXME
          .getBoundingClientRect();

      // Running the following two state setters immediately affect the layout
      // in a way that is necessary for drop position calculation, so the order
      // is important
      setDraggingRect(getItemRect(key).toJSON());
      setDraggingKey(key);

      const isNotCurrentItem = (anItem: T) => anItem !== item;
      const getDropPosition = createGetDropPosition({
        stripeElement: stripeElement,
        mainItems: mainItems.filter(isNotCurrentItem),
        splitItems: splitItems.filter(isNotCurrentItem),
        getKey,
        anchor,
        getItemRect,
      });
      // Note: drop position should be set initially to prevent potentially
      // emptied stripe from collapsing.
      setDropPosition(getDropPosition(from));

      return {
        getDropPosition,
      };
    };

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
        onMoveStart={onMoveStart}
        onMove={onMove}
        active={selectedKeys.includes(key)}
        onPress={() => onItemPress?.(key)}
        onMoveEnd={onMoveEnd}
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
        // highlighted={Boolean(dropPosition) /* && dragging item is from another stripe */}
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
  ...otherProps
}: {
  children: React.ReactNode;
  anchor: Anchor;
  style: CSSProperties;
  active: boolean;
  onPress: () => void;
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
