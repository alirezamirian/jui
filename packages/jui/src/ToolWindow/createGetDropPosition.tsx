import { Anchor, isHorizontalToolWindow } from "./utils";
import { Key } from "react";
type Rect = Omit<ClientRect, "toJSON" | "x" | "y">;

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
  getItemRect: (key: Key) => Rect;
  getKey: (key: T) => Key;
  mainItems: T[];
  splitItems: T[];
}): ((draggedRect: Rect) => DropPosition | null) => {
  // Note: It may be tempting to calculate stripe element boundaries just once
  // here, since it's not supposed to change during a drag session, but it
  // can change due to getting empty when the only button is being dragged out.
  const getStripeRect = () => stripeElement.getBoundingClientRect();

  const getCanDrop = (draggingRect: Rect) => {
    const stripeRect = getStripeRect();
    return (
      draggingRect.right > stripeRect.left - stripeRect.width &&
      draggingRect.left < stripeRect.right &&
      draggingRect.bottom > stripeRect.top - stripeRect.height &&
      draggingRect.top < stripeRect.bottom
    );
  };

  const start = (rect: Rect) =>
    isHorizontalToolWindow(anchor) ? rect.left : rect.top;
  const end = (rect: Rect) =>
    isHorizontalToolWindow(anchor) ? rect.right : rect.bottom;

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

  const getDropPositions = (
    items: T[],
    split = false
    // FIXME: score is a bad name. it's quite the opposite! the less means the higher score.
  ): Array<DropPosition & { score: (rect: Rect) => number }> => {
    const getRef = split ? end : start;
    if (items.length === 0) {
      // if the section is empty, we should still allow adding to it.
      return [
        {
          index: 0,
          split,
          score: (draggingRect: Rect) =>
            Math.abs(getRef(draggingRect) - getRef(getStripeRect())),
        },
      ];
    }
    return items.flatMap((item, index) => {
      const key = getKey(item);
      return [
        {
          index,
          split,
          relative: { key, placement: "before" },
          score: (draggingRect: Rect) =>
            Math.abs(getRef(draggingRect) - keyToOffsets[key].start),
        },
        {
          index: index + 1,
          split,
          relative: { key, placement: "after" },
          score: (draggingRect: Rect) =>
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
  return (draggingRect: Rect) => {
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
