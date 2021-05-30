import { Anchor, isHorizontal } from "./utils";
import { Key } from "react";
import { Node } from "@react-types/shared";

export interface DropPosition {
  placement: "before" | "after";
  key: Key;
}

export const createGetDropPosition = ({
  anchor,
  stripeElement,
  splitItems,
  mainItems,
  getItemRect,
}: {
  stripeElement: HTMLElement;
  anchor: Anchor;
  getItemRect: (key: Key) => ClientRect;
  mainItems: Node<unknown>[];
  splitItems: Node<unknown>[];
}): ((draggedRect: ClientRect) => DropPosition | null) => {
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

  const getKeyToOffsets = (items: Node<unknown>[]) => {
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

  const getDropPositions = (items: Node<unknown>[], split = false) =>
    items.flatMap<DropPosition & { score: (rect: ClientRect) => number }>(
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

  const keyToOffsets = getKeyToOffsets([...mainItems, ...splitItems]);

  const dropPositions = [
    ...getDropPositions(mainItems),
    ...getDropPositions(splitItems, true),
  ];

  let lastDropPosition: DropPosition | null = null;
  return (draggingRect: ClientRect) => {
    if (!getCanDrop(draggingRect)) {
      return null;
    }
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

    if (!placement || !key) {
      return null;
    }
    if (
      placement !== lastDropPosition?.placement ||
      key !== lastDropPosition?.key
    ) {
      lastDropPosition = { key, placement };
    }
    return lastDropPosition;
  };
};
