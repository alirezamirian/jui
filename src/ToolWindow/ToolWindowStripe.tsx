import { Anchor, isHorizontal } from "./utils";
import React, { CSSProperties, Key, useRef, useState } from "react";
import { Collection, Node } from "@react-types/shared";
import { StyledSpacer, StyledToolWindowStripe } from "./StyledToolWindowStripe";
import { Section, useCollection } from "@react-stately/collections";
import { ListCollection } from "@react-stately/list";
import { StyledToolWindowStripeButton } from "./StyledToolWindowStripeButton";
import { useElementMove, UseElementMoveOptions } from "./useElementMove";
import { createGetDropPosition, DropPosition } from "./createGetDropPosition";
import { CollectionBase } from "@react-types/shared/src/collections";

export type OnMoveArgs<T extends object> = {
  /**
   * Collection from which the item is moved. Useful for moving between stripes
   */
  collection: Collection<Node<T>>;
  /**
   * The key of the moved item
   */
  key: Key;
  /**
   * Position the dragging item is moved to.
   */
  position: DropPosition;
};

interface ToolWindowStripeProps<T extends object> extends CollectionBase<T> {
  anchor: Anchor;
  onItemDropped?: (args: OnMoveArgs<T>) => void;
}

/**
 * findings:
 * - Stripe priority: top, left, bottom right
 *
 * current issues:
 * - It's not possible to move items to split section, if it's empty.
 */
export function ToolWindowStripe<T extends object>({
  anchor,
  children,
  onItemDropped,
  items: itemsProp,
  disabledKeys,
}: ToolWindowStripeProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dropPosition, setDropPosition] = useState<DropPosition | null>(null);
  const [draggingKey, setDraggingKey] = useState<Key | null>(null);
  const [draggingRect, setDraggingRect] = useState<ClientRect | null>(null);
  const items = useCollection<T>(
    { children, items: itemsProp, disabledKeys: disabledKeys },
    (nodes) => new ListCollection(nodes)
  );
  const mainItems = [...items].filter((item) => item.type === "item");
  // Maybe a warning when more than one SplitItems (section) is rendered?
  const splitItems = [
    ...([...items].find((item) => item.type === "section")?.childNodes || []),
  ];

  const onMoveEnd = () => {
    setDraggingKey(null);
    setDropPosition(null);
    setDraggingRect(null);

    if (onItemDropped && draggingKey && dropPosition) {
      onItemDropped({
        collection: items,
        key: draggingKey,
        position: dropPosition,
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

  const renderItem = (item: Node<T>) => {
    const onMoveStart = () => {
      const stripeElement = containerRef.current!;
      const getItemRect = (key: Key) =>
        stripeElement
          .querySelector(`[data-key="${key}"]`)! // FIXME
          .getBoundingClientRect();

      setDraggingRect(getItemRect(item.key).toJSON());
      setDraggingKey(item.key);

      return {
        getDropPosition: createGetDropPosition({
          stripeElement,
          mainItems: mainItems.filter(({ key }) => key !== item.key),
          splitItems: splitItems.filter(({ key }) => key !== item.key),
          anchor,
          getItemRect,
        }),
      };
    };

    return (
      <ToolWindowStripeButton
        anchor={anchor}
        key={item.key}
        style={{
          ...getStripeButtonStyles({
            key: item.key,
            dropPosition,
            anchor,
            draggingRect,
            draggingKey,
          }),
        }}
        item={item}
        onMoveStart={onMoveStart}
        onMove={onMove}
        onMoveEnd={onMoveEnd}
      />
    );
  };
  return (
    <>
      <StyledToolWindowStripe
        anchor={anchor}
        // acceptsDrop={Boolean(dropPosition)}
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
  if (dropPosition?.key === key && draggingRect) {
    const marginValue = isHorizontal(anchor)
      ? draggingRect.width
      : draggingRect.height;

    if (isHorizontal(anchor)) {
      styles[
        dropPosition.placement === "before" ? "marginLeft" : "marginRight"
      ] = marginValue;
    } else {
      styles[
        dropPosition.placement === "before" ? "marginTop" : "marginBottom"
      ] = marginValue;
    }
  }
  if (key === draggingKey) {
    styles.display = "none";
  }
  return styles;
}

function ToolWindowStripeButton<T, S>({
  item,
  anchor,
  onMoveStart,
  onMove,
  onMoveEnd,
  ...otherProps
}: {
  item: Node<T>;
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
      data-key={item.key}
    >
      {item.rendered}
    </StyledToolWindowStripeButton>
  );
}

export const SplitItems = Section;
