import { Anchor } from "./utils";
import React, { Key, useRef, useState } from "react";
import { CollectionChildren, Node } from "@react-types/shared";
import { StyledSpacer, StyledToolWindowStripe } from "./StyledToolWindowStripe";
import { Section, useCollection } from "@react-stately/collections";
import { ListCollection } from "@react-stately/list";
import { StyledToolWindowStripeButton } from "./StyledToolWindowStripeButton";
import { useElementMove } from "./useElementMove";

interface ToolWindowStripeProps<T extends object> {
  anchor: Anchor;
  children: CollectionChildren<T>;
}

export function ToolWindowStripe<T extends object>({
  anchor,
  children,
}: ToolWindowStripeProps<T>) {
  const [canDrop, setCanDrop] = useState(false);
  const [draggingKey, setDraggingKey] = useState<Key | null>(null);
  const items = useCollection<T>(
    { children },
    (nodes) => new ListCollection(nodes)
  );
  const mainItems = [...items].filter((item) => item.type === "item");
  // Maybe a warning when more than one SplitItems (section) is rendered?
  const splitItems = [
    ...([...items].find((item) => item.type === "section")?.childNodes || []),
  ];

  const renderItem = (item: Node<T>) => (
    <ToolWindowStripeButton
      anchor={anchor}
      key={item.key}
      item={item}
      setDraggingKey={setDraggingKey}
    />
  );
  return (
    <>
      <StyledToolWindowStripe anchor={anchor} acceptsDrop={canDrop}>
        {mainItems.map(renderItem)}
        <StyledSpacer />
        {splitItems.map(renderItem)}
      </StyledToolWindowStripe>
    </>
  );
}

function ToolWindowStripeButton<T>({
  item,
  anchor,
  setDraggingKey,
}: {
  item: Node<T>;
  anchor: Anchor;
  setDraggingKey: (key: Key | null) => void;
}) {
  const ref = useRef<HTMLElement>(null);

  const props = useElementMove({
    ref,
    dragThreshold: 7,
    ghost: true,
    onMoveStart: () => {
      setDraggingKey(item.key);
      return {
        onMove: () => {},
        onMoveEnd: () => {
          setDraggingKey(null);
        },
      };
    },
  });

  return (
    <StyledToolWindowStripeButton anchor={anchor} {...props} ref={ref}>
      {item.rendered}
    </StyledToolWindowStripeButton>
  );
}

export const SplitItems = Section;
