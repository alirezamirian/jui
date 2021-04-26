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

interface SpeedSearchProps {
  stickySearch?: boolean;
}

export function useSpeedSearch(
  { stickySearch }: SpeedSearchProps,
  { searchTerm, setActive, setSearchTerm }: SpeedSearchState
) {
  const { onKeyDown: ghostInputKeydown } = useGhostInput({
    value: searchTerm,
    onChange: (value) => {
      setSearchTerm(value);
      setActive(true);
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
      tabIndex: -1,
    },
  };
}
