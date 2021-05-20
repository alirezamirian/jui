import { Anchor, isHorizontal } from "./utils";
import React, { CSSProperties, Key, useRef, useState } from "react";
import { CollectionChildren, Node } from "@react-types/shared";
import { StyledSpacer, StyledToolWindowStripe } from "./StyledToolWindowStripe";
import { Section, useCollection } from "@react-stately/collections";
import { ListCollection } from "@react-stately/list";
import { StyledToolWindowStripeButton } from "./StyledToolWindowStripeButton";
import { useElementMove, UseElementMoveOptions } from "./useElementMove";

interface ToolWindowStripeProps<T extends object> {
  anchor: Anchor;
  children: CollectionChildren<T>;
}

interface DropPosition {
  placement: "before" | "after";
  key: Key;
}

/**
 * findings:
 * - Stripe priority: top, left, bottom right
 */
export function ToolWindowStripe<T extends object>({
  anchor,
  children,
}: ToolWindowStripeProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canDrop, setCanDrop] = useState(false);
  const [dropPosition, setDropPosition] = useState<DropPosition | null>(null);
  const [draggingKey, setDraggingKey] = useState<Key | null>(null);
  const [draggingRect, setDraggingRect] = useState<ClientRect | null>(null);
  const items = useCollection<T>(
    { children },
    (nodes) => new ListCollection(nodes)
  );
  const mainItems = [...items].filter((item) => item.type === "item");
  // Maybe a warning when more than one SplitItems (section) is rendered?
  const splitItems = [
    ...([...items].find((item) => item.type === "section")?.childNodes || []),
  ];

  const renderItem = (item: Node<T>) => {
    const onMoveStart: UseElementMoveOptions["onMoveStart"] = () => {
      const stripeElement = containerRef.current!;
      const stripeRect = stripeElement.getBoundingClientRect();
      const getCanDrop = (draggingRect: ClientRect) =>
        draggingRect.right > stripeRect.left - stripeRect.width &&
        draggingRect.left < stripeRect.right &&
        draggingRect.bottom > stripeRect.top - stripeRect.height &&
        draggingRect.top < stripeRect.bottom;

      const start = (rect: ClientRect) =>
        isHorizontal(anchor) ? rect.left : rect.top;
      const end = (rect: ClientRect) =>
        isHorizontal(anchor) ? rect.right : rect.bottom;
      const getItemRect = (key: Key) =>
        stripeElement
          .querySelector(`[data-key="${key}"]`)! // FIXME
          .getBoundingClientRect();

      const getKeyToOffsets = (items: Node<T>[]) => {
        const keyToOffsets: Record<Key, { start: number; end: number }> = {};
        items.forEach(({ key }) => {
          const boundingRect = getItemRect(key);
          keyToOffsets[key] = {
            start: start(boundingRect),
            end: end(boundingRect),
          };
        });
        return keyToOffsets;
      };

      const getDropPositions = (items: Node<T>[], split = false) =>
        items
          .filter(({ key }) => key !== item.key)
          .flatMap<DropPosition & { score: (rect: ClientRect) => number }>(
            ({ key }) => {
              const getRef = split ? end : start;
              return [
                {
                  placement: "before",
                  key,
                  score: (draggingRect: ClientRect) =>
                    Math.abs(getRef(draggingRect) - keyToOffsets[key].start),
                },
                {
                  placement: "after",
                  key,
                  score: (draggingRect: ClientRect) =>
                    Math.abs(getRef(draggingRect) - keyToOffsets[key].end),
                },
              ];
            }
          );

      setDraggingRect(getItemRect(item.key).toJSON());
      setDraggingKey(item.key);

      const keyToOffsets = getKeyToOffsets([...mainItems, ...splitItems]);

      const dropPositions = [
        ...getDropPositions(mainItems),
        ...getDropPositions(splitItems, true),
      ];

      const getDropPosition = (draggingRect: ClientRect) => {
        const { placement, key } =
          dropPositions.reduce(
            (bestMatch, candidate) => {
              const score = candidate.score(draggingRect);
              if (!bestMatch || score < bestMatch.score) {
                return {
                  score,
                  key: candidate.key,
                  placement: candidate.placement,
                };
              }
              return bestMatch;
            },
            null as
              | null
              | (DropPosition & {
                  score: number;
                })
          ) || {};
        return placement && key ? { placement, key } : null;
      };

      return {
        onMove: ({ to }) => {
          const canDrop = getCanDrop(to);
          setCanDrop(canDrop);
          if (canDrop) {
            const newDropPosition = getDropPosition(to);
            setDropPosition((dropPosition) => {
              if (
                newDropPosition?.placement !== dropPosition?.placement ||
                newDropPosition?.key !== dropPosition?.key
              ) {
                return newDropPosition;
              }
              return dropPosition;
            });
          }
        },
        onMoveEnd: () => {
          setCanDrop(false);
          setDraggingKey(null);
          setDropPosition(null);
          setDraggingRect(null);
        },
      };
    };
    const marginStyle: CSSProperties = {};
    if (canDrop && dropPosition?.key === item.key && draggingRect) {
      const marginValue = isHorizontal(anchor)
        ? draggingRect.width
        : draggingRect.height;

      if (isHorizontal(anchor)) {
        marginStyle[
          dropPosition.placement === "before" ? "marginLeft" : "marginRight"
        ] = marginValue;
      } else {
        marginStyle[
          dropPosition.placement === "before" ? "marginTop" : "marginBottom"
        ] = marginValue;
      }
    }

    return (
      <ToolWindowStripeButton
        anchor={anchor}
        key={item.key}
        style={{
          // transition: "margin 100ms", // maybe only when drag is in progress, if unwanted transition at drop
          display: item.key === draggingKey ? "none" : undefined,
          ...marginStyle,
        }}
        item={item}
        onMoveStart={onMoveStart}
      />
    );
  };
  return (
    <>
      <StyledToolWindowStripe
        anchor={anchor}
        // acceptsDrop={canDrop}
        ref={containerRef}
      >
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
  onMoveStart,
  ...otherProps
}: {
  item: Node<T>;
  anchor: Anchor;
  style: CSSProperties;
  onMoveStart: UseElementMoveOptions["onMoveStart"];
}) {
  const ref = useRef<HTMLElement>(null);

  const props = useElementMove({
    ref,
    dragThreshold: 7,
    ghost: true,
    onMoveStart: onMoveStart,
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
