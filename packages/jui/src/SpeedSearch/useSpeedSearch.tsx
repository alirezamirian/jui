import { useGhostInput } from "./useGhostInput";
import { useFocusWithin, useKeyboard } from "@react-aria/interactions";
import { useControlledState } from "@react-stately/utils";
import { ControlledStateProps } from "../type-utils";

export interface SpeedSearchState {
  active: boolean;
  setActive: (value: boolean) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export interface SpeedSearchStateProps
  extends ControlledStateProps<{
    searchTerm: string;
    active: boolean;
  }> {}

export function useSpeedSearchState(
  props: SpeedSearchStateProps
): SpeedSearchState {
  const [active, setActive] = useControlledState(
    props.active!,
    props.active || false,
    props.onActiveChange!
  );
  const [searchTerm, setSearchTerm] = useControlledState(
    props.searchTerm!,
    props.defaultSearchTerm || "",
    props.onSearchTermChange!
  );

  return {
    active: active,
    searchTerm,
    setActive,
    setSearchTerm,
  };
}

export interface SpeedSearchProps {
  stickySearch?: boolean;
}

/**
 * TODO: description
 * IMPORTANT: making the container element focusable is not a part of this hook. But it's a prerequisite for it to work.
 * Previously, a tabIndex:-1 was passed as a container prop, but it turns out it's not that simple. For collections for
 * example we usually want tab index to be 0 once it's not focused and then when an item is focused, we want it to be
 * -1, and such kind of logics are handled in their respective hooks. So, making the container focusable and how to do
 * it is NOT this hook's responsibility anymore.
 */
export function useSpeedSearch(
  { stickySearch }: SpeedSearchProps,
  { searchTerm, active, setActive, setSearchTerm }: SpeedSearchState
) {
  const { onKeyDown: ghostInputKeydown } = useGhostInput({
    value: searchTerm,
    onChange: (value) => {
      const trimmedValue = value.trimStart();
      setSearchTerm(trimmedValue);
      if (!active && trimmedValue !== "") {
        setActive(true);
      }
    },
  });
  const clear = () => {
    setSearchTerm("");
    setActive(false);
  };

  const {
    keyboardProps: { onKeyDown, onKeyUp },
  } = useKeyboard({
    onKeyDown: (e) => {
      // intellij UI implementation removes the searchTerm by left/right arrows. Maybe do the same?
      if (e.key === "Escape") {
        clear();
      } else {
        ghostInputKeydown(e);
      }
    },
  });

  const {
    focusWithinProps: { onFocus, onBlur },
  } = useFocusWithin({
    onFocusWithinChange: (focused) => {
      if (!focused && !stickySearch) {
        clear();
      }
    },
  });

  return {
    containerProps: {
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
    },
  };
}
