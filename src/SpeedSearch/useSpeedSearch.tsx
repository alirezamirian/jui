import { useState } from "react";
import { useSimulatedInput } from "./useSimulatedInput";
import { useFocusWithin, useKeyboard } from "@react-aria/interactions";

export type SpeedSearchStateProps = ReturnType<typeof useSpeedSearchState>;

export function useSpeedSearchState() {
  const [isSearchTermVisible, onSearchTermVisibleChange] = useState(false);
  const [searchTerm, onSearchTermChange] = useState("");

  return {
    isSearchTermVisible,
    searchTerm,
    onSearchTermVisibleChange,
    onSearchTermChange,
  };
}

export function useSpeedSearch(
  {
    searchTerm,
    onSearchTermVisibleChange,
    onSearchTermChange,
  }: Omit<SpeedSearchStateProps, "isSearchTermVisible">,
  { stickySearch }: { stickySearch: boolean }
) {
  const { onKeyDown: simulatedInputKeydown } = useSimulatedInput({
    value: searchTerm,
    onChange: (value) => {
      onSearchTermChange(value);
      onSearchTermVisibleChange(true);
    },
  });
  const clear = () => {
    onSearchTermChange("");
    onSearchTermVisibleChange(false);
  };

  const {
    keyboardProps: { onKeyDown, onKeyUp },
  } = useKeyboard({
    onKeyDown: (e) => {
      // intellij UI implementation removes the searchTerm by left/right arrows. Maybe do the same?
      if (e.key === "Escape") {
        clear();
      } else {
        simulatedInputKeydown(e);
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
