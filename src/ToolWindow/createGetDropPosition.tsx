import { Anchor, isHorizontal } from "./utils";
import { Key } from "react";

export interface DropPosition {
  index: number;
  split: boolean;

  relative?: {
    placement: "before" | "after";
    key: Key;
  };
}

/**
 * TODO: Add a few words about what this function do.
 */
export const createGetDropPosition = <T extends any>({
  anchor,
  stripeElement,
  splitItems,
  mainItems,
  getItemRect,
  getKey,
}: {
  stripeElement: HTMLElement;
  anchor: Anchor;
  getItemRect: (key: Key) => ClientRect;
  getKey: (key: T) => Key;
  mainItems: T[];
  splitItems: T[];
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

  const getKeyToOffsets = (items: T[]) => {
    const keyToOffsets: Record<Key, { start: number; end: number }> = {};
    items.forEach((item) => {
      const key = getKey(item);
      const boundingRect = getItemRect(key);
      keyToOffsets[key] = {
        start: start(boundingRect),
        end: end(boundingRect),
      };
    });
    return keyToOffsets;
  };

  const getDropPositions = (items: T[], split = false) => {
    if (items.length === 0) {
      // if the section is empty, we should still allow adding to it.
    }
    return items.flatMap<
      DropPosition & { score: (rect: ClientRect) => number }
    >((item, index) => {
      const key = getKey(item);
      const getRef = split ? end : start;
      return [
        {
          index,
          split,
          relative: { key, placement: "before" },
          score: (draggingRect: ClientRect) =>
            Math.abs(getRef(draggingRect) - keyToOffsets[key].start),
        },
        {
          index: index + 1,
          split,
          relative: { key, placement: "after" },
          score: (draggingRect: ClientRect) =>
            Math.abs(getRef(draggingRect) - keyToOffsets[key].end),
        },
      ];
    });
  };

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
    const result = dropPositions.reduce(
      (bestMatch, candidate) => {
        const score = candidate.score(draggingRect);
        if (!bestMatch || score < bestMatch.score) {
          return {
            ...candidate,
            score,
          };
        }
        return bestMatch;
      },
      null as
        | null
        | (DropPosition & {
            score: number;
          })
    );

    if (!result) {
      return null;
    }
    if (
      result.split !== lastDropPosition?.split ||
      result.index !== lastDropPosition?.index
    ) {
      lastDropPosition = result;
    }
    return lastDropPosition;
  };
};
