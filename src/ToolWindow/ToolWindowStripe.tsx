import { Anchor, isHorizontal } from "./utils";
import React, { CSSProperties, Key, useRef, useState } from "react";
import { StyledSpacer, StyledToolWindowStripe } from "./StyledToolWindowStripe";
import { StyledToolWindowStripeButton } from "./StyledToolWindowStripeButton";
import { useElementMove, UseElementMoveOptions } from "./useElementMove";
import { createGetDropPosition, DropPosition } from "./createGetDropPosition";

export type OnItemDroppedArgs<T extends object> = {
  items: T[];
  splitItems: T[];
};

interface ToolWindowStripeProps<T extends object> {
  anchor: Anchor;
  onItemDropped?: (args: OnItemDroppedArgs<T>) => void;
  items: T[];
  splitItems?: T[];
  getKey: (item: T) => Key;
  renderItem: (item: T) => React.ReactNode;
}

/**
 * findings:
 * - Stripe priority: top, left, bottom right
 */
export function ToolWindowStripe<T extends object>({
  anchor,
  onItemDropped,
  items: mainItems,
  renderItem: render,
  splitItems = [],
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
      const newSplitItems = splitItems.filter((item) => item !== draggingItem);
      const newItems = mainItems.filter((item) => item !== draggingItem);
      (dropPosition.split ? newSplitItems : newItems).splice(
        dropPosition.index,
        0,
        draggingItem
      );
      onItemDropped({
        items: newItems,
        splitItems: newSplitItems,
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

      const isNotCurrentItem = (anItem: T) => anItem !== item;
      const getDropPosition = createGetDropPosition({
        stripeElement: stripeElement,
        mainItems: mainItems.filter(isNotCurrentItem),
        splitItems: splitItems.filter(isNotCurrentItem),
        getKey,
        anchor,
        getItemRect,
      });
      // Note: drop position should be set initially to prevent potentially emptied stripe from
      // collapsing. It's important to call it before setting dragging rect and key, since they
      // immediately affect the layout.
      setDropPosition(getDropPosition(from));
      setDraggingRect(getItemRect(key).toJSON());
      setDraggingKey(key);

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
  ...otherProps
}: {
  children: React.ReactNode;
  anchor: Anchor;
  style: CSSProperties;
  onMoveStart: UseElementMoveOptions<S>["onMoveStart"];
  onMove: UseElementMoveOptions<S>["onMove"];
  onMoveEnd: UseElementMoveOptions<S>["onMoveEnd"];
}) {
  const ref = useRef<HTMLElement>(null);

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
      {...otherProps}
      {...props}
      ref={ref}
    >
      {children}
    </StyledToolWindowStripeButton>
  );
}
