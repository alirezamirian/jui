import { useGhostInput } from "./useGhostInput";
import { useFocusWithin, useKeyboard } from "@react-aria/interactions";
import { useControlledState } from "@react-stately/utils";
import { ControlledStateProps } from "../type-utils";
import React, { RefObject } from "react";

export interface SpeedSearchState {
  /**
   * Whether speed search is active. Speed search becomes active when the user starts to type and becomes inactive
   * when Escape is pressed, or when the speed search container is blurred and `keepSearchActiveOnBlur` is false.
   * Whenever speed search becomes inactive, search text is also cleared.
   * Note that speed search can be active while search term is empty.
   */
  active: boolean;
  setActive: (value: boolean) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  /**
   * clears search term and sets active to false
   */
  clear: () => void;
}

export interface SpeedSearchStateProps
  extends ControlledStateProps<{
    searchTerm: string;
    isSearchActive: boolean;
  }> {}

export function useSpeedSearchState(
  props: SpeedSearchStateProps
): SpeedSearchState {
  const [active, setActive] = useControlledState(
    props.isSearchActive!,
    props.defaultIsSearchActive ?? false,
    props.onIsSearchActiveChange!
  );
  const [searchTerm, setSearchTerm] = useControlledState(
    props.searchTerm!,
    props.defaultSearchTerm || "",
    props.onSearchTermChange!
  );

  return {
    active,
    searchTerm,
    setActive,
    setSearchTerm,
    clear: () => {
      setSearchTerm("");
      setActive(false);
    },
  };
}

export interface SpeedSearchProps {
  keepSearchActiveOnBlur?: boolean | ((e: React.FocusEvent) => boolean);
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
  { keepSearchActiveOnBlur }: SpeedSearchProps,
  { searchTerm, active, setActive, setSearchTerm }: SpeedSearchState,
  ref: RefObject<HTMLElement>
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
      if (!ref.current?.contains(e.target as HTMLElement)) {
        // In case events are propagated through portals
        return;
      }
      if ((e.key === "a" && e.metaKey) || e.ctrlKey) {
        e.preventDefault();
      }
      if (e.key === "Escape") {
        if (searchTerm) {
          clear();
          return;
        }
      } else {
        ghostInputKeydown(e);
      }
      e.continuePropagation();
    },
  });

  const {
    focusWithinProps: { onFocus, onBlur },
  } = useFocusWithin({
    onBlurWithin: (event) => {
      if (
        !(typeof keepSearchActiveOnBlur === "function"
          ? keepSearchActiveOnBlur(event)
          : keepSearchActiveOnBlur)
      ) {
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
