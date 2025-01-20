import React, {
  Key,
  MutableRefObject,
  RefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLatest } from "../utils/useLatest";
import { DropPosition } from "./createGetDropPosition";
import { UseElementMoveOptions } from "./useElementMove";
import { Anchor } from "./utils";

type Rect = Omit<ClientRect, "toJSON" | "x" | "y">;

type StripeLocation<T extends unknown> = {
  index: number;
  anchor: Anchor;
  isSplit: boolean;
};
type MovableStripeProps<T> = {
  stripeElRef: React.RefObject<HTMLElement>;
  getKey: (item: T) => Key;
  anchor: Anchor;
  mainItems: T[];
  splitItems: T[];
  createGetDropPosition: (
    key: Key
  ) => (draggedRect: Rect) => DropPosition | null;
};

type MovableToolWindowStripeContextType<T> = {
  addStripe: <T>(
    id: string,
    propsRef: MutableRefObject<MovableStripeProps<T>>
  ) => () => void;
  startMove: (id: string, args: { from: Rect; key: Key }) => void;
  move: (args: { to: Rect }) => void;
  endMove: () => void;
  dropPosition: null | { id: string; dropPosition: DropPosition };
  draggingKey: Key | null;
  draggingRect: Rect | null;
};

export type MovableToolWindowStripeProviderProps<T = unknown> = {
  children: React.ReactNode;
  onMove: (args: { from: StripeLocation<T>; to: StripeLocation<T> }) => void;
};

const MovableToolWindowStripeContext =
  React.createContext<MovableToolWindowStripeContextType<any> | null>(null);

/**
 * A wrapper component to render around `ToolWindowStripe`s to make their button movable. Stripe buttons then become
 * draggable and can be moved either within the same `ToolWindowStripe` or across different ones.
 * @param onMove: called when a stripe button is moved from one anchor to another.
 * @param children: child element tree, containing one or more ToolWindowStripe elements. No need to be direct children.
 */
export const MovableToolWindowStripeProvider = <T extends unknown>({
  onMove,
  children,
}: MovableToolWindowStripeProviderProps<T>) => {
  const stripes = useRef<{
    [id: string]: RefObject<MovableStripeProps<T>>;
  }>({});
  const [draggingRect, setDraggingRect] = useState<Rect | null>(null);
  const [draggingKey, setDraggingKey] = useState<Key | null>(null);
  const [dropPosition, setDropPosition] = useState<{
    id: string;
    dropPosition: DropPosition;
  } | null>(null);
  const getDropPositionRef = useRef<
    (to: Rect) => {
      id: string;
      dropPosition: DropPosition;
    } | null
  >(() => null);
  const moveStartLocationRef = useRef<null | {
    id: string;
    index: number;
    anchor: Anchor;
    isSplit: boolean;
  }>(null);

  const contextValue = useMemo(
    (): MovableToolWindowStripeContextType<T> => ({
      addStripe: (id, propsRef) => {
        if (stripes.current[id]) {
          console.error(`multiple stripes with the same id "${id}`);
        }
        // @ts-expect-error
        stripes.current[id] = propsRef;
        return () => {
          delete stripes.current[id];
        };
      },
      startMove: (id, { from, key }) => {
        const stripe = stripes.current[id]?.current;
        if (!stripe) {
          return;
        }
        const { stripeElRef } = stripe;
        const stripeElement = stripeElRef.current!;
        const itemElement = stripeElement.querySelector<HTMLElement>(
          `[data-key="${key}"]`
        );
        if (!itemElement) {
          throw new Error(
            `unexpected state: Could not find stripe button element ${key} via data-key attribute`
          );
        }
        setDraggingRect(itemElement.getBoundingClientRect().toJSON());
        setDraggingKey(key);

        const indexInMain = stripe.mainItems.findIndex(
          (item) => stripe.getKey(item) === key
        );
        const indexInSplit = stripe.splitItems.findIndex(
          (item) => stripe.getKey(item) === key
        );
        moveStartLocationRef.current = {
          id,
          anchor: stripe.anchor,
          index: indexInMain > -1 ? indexInMain : indexInSplit,
          isSplit: indexInSplit > -1,
        };
        const display = itemElement.style.display;
        // Hiding the button that's being dragged immediately is important for size calculation.
        // It will be controlled and overridden by style prop later, But it's important to have it
        // set here too.
        // That's because in React 18 setting state (which subsequently sets style prop) is batched
        // with other state changes in the event handler this is being called and is not immediately
        // applied.
        itemElement.style.display = "none";
        const dropPositionGetters = Object.entries(stripes.current).map(
          ([id, stripe]) =>
            [id, stripe.current!.createGetDropPosition(key)] as const
        );
        itemElement.style.display = display;

        const getDropPosition = (draggedRect: Rect) => {
          for (const [id, getDropPosition] of dropPositionGetters) {
            const dropPosition = getDropPosition(draggedRect);
            if (dropPosition) {
              return {
                id,
                dropPosition,
              };
            }
          }
          return null;
        };

        setDropPosition(getDropPosition(from));

        getDropPositionRef.current = getDropPosition;
      },
      move: ({ to }) => {
        setDropPosition(getDropPositionRef.current(to));
      },
      endMove: () => {
        if (dropPosition && draggingKey) {
          onMove({
            from: moveStartLocationRef.current!,
            to: {
              anchor: dropPosition.id as Anchor /*FIXME*/,
              index: dropPosition.dropPosition.index,
              isSplit: dropPosition.dropPosition.split,
            },
          });
        }
        setDraggingKey(null);
        setDropPosition(null);
        setDraggingRect(null);
      },
      dropPosition,
      draggingRect,
      draggingKey,
    }),
    [dropPosition, draggingKey, draggingRect]
  );

  return (
    <MovableToolWindowStripeContext.Provider value={contextValue}>
      {children}
    </MovableToolWindowStripeContext.Provider>
  );
};

export function useMovableStripeButtons<T>(props: MovableStripeProps<T>) {
  // Seems reasonable to assume anchor is unique. Also current onMove signature is coupled with anchor, not a more generic id.
  const id = props.anchor;
  const context = useContext(MovableToolWindowStripeContext);
  const latestPropsRef = useLatest(props);
  useEffect(() => {
    if (context) {
      return context.addStripe(id, latestPropsRef);
    }
  }, [context, id]);

  const getProps = (
    key: Key
  ): Pick<
    Required<UseElementMoveOptions<unknown>>,
    "onMoveStart" | "onMove" | "onMoveEnd"
  > & { moveDisabled: boolean } => ({
    moveDisabled: !context,
    onMoveStart: ({ from }) => {
      context?.startMove?.(id, { from, key });
    },
    onMove: ({ to }) => {
      context?.move({ to });
    },
    onMoveEnd: () => {
      context?.endMove();
    },
  });
  return {
    getProps,
    draggingRect: context?.draggingRect ?? null,
    dropPosition:
      context?.dropPosition?.id === id
        ? context?.dropPosition.dropPosition
        : null,
    draggingKey: context?.draggingKey ?? null,
  };
}
