import React, { ComponentProps, useState } from "react";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import { useControlledState } from "@react-stately/utils";

import { styled } from "@intellij-platform/core/styled";
import {
  ActionDefinition,
  ActionsProvider,
  CommonActionId,
  useGetActionShortcut,
} from "@intellij-platform/core/ActionSystem";
import { Input, InputProps } from "@intellij-platform/core/InputField";
import {
  AutoHoverPlatformIcon,
  PlatformIcon,
} from "@intellij-platform/core/Icon";
import { Menu, MenuTrigger } from "@intellij-platform/core/Menu";
import { Item } from "@intellij-platform/core/Collections";
import { ActionTooltip, TooltipTrigger } from "@intellij-platform/core/Tooltip";

export interface SearchInputProps
  extends Omit<InputProps, "onSubmit" | "onChange"> {
  /**
   * Search history to be shown as a menu when the search icon is pressed.
   */
  searchHistory?: Array<string>;
  /**
   * The content of "show history" button tooltip, and the corresponding action title.
   * @default "Recent Search"
   */
  historyButtonTitle?: string;
  /**
   * Called when the search input is cleared by either clear button or `Escape` key.
   * `onChange` is also called with an empty string, whenever the input is cleared,
   * so there is no need for updating the state using `onClear`, when the value is controlled.
   *
   * @param clearedValue the value before clearing.
   */
  onClear?: (clearedValue: string) => void;
  /**
   * Called when the search is submitted by pressing `Enter`
   * @param value submitted text
   */
  onSubmit?: (value: string) => void;
  /**
   * Controlled value of the search input
   */
  value?: string;
  /**
   * Default value of the search input, used for initialization when value is uncontrolled.
   */
  defaultValue?: string;
  /**
   * Called when the value is changed.
   */
  onChange?: (value: string) => void;
  /**
   * Called when a history item is selected. `onChange` is called with the selected text, so
   * there is no need for updating the state using `onHistoryItemSelected`, when the value is controlled.
   *
   * @param value text selected from history.
   * @param previousValue the value of the input before the history item was selected.
   */
  onHistoryItemSelected?: (value: string, previousValue: string) => void;
}

const StyledInput = styled(Input)`
  input[type="search"] {
    -webkit-appearance: none;
    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }
    &::-webkit-search-decoration {
      -webkit-appearance: none;
    }
  }
`;

/**
 * A wrapper around {@link Input} with a few additions:
 * - A Search icon, added as an {@link InputProps#addonBefore addonBefore}.
 * - A clear button, added as an {@link InputProps#addonAfter addonAfter}, when the input has value.
 *   {@link SearchInputProps#onClear onClear} is called when the clear button is clicked.
 * - A list of search queries shown as a menu, when the search icon is clicked,
 *   if {@link SearchInputProps#searchHistory searchHistory} is provided.
 * - An action provided on the input element, to open the search history via
 *   {@link CommonActionId.SHOW_SEARCH_HISTORY} shortcut.
 * - Search submission callback ({@link SearchInputProps#onSubmit onSubmit}) called when search is submitted by pressing Enter
 *
 * {@link InputProps#onChange onChange} and {@link InputProps#onSubmit onSubmit} props are also different in SearchInput, compared to
 * the corresponding props of the native input.
 *
 * Caveat: If the width is not set (either explicitly or via the entailing layout), the width of the input will change when clear button shows/hides.
 *
 * @see Input
 * @see InputField
 */
export const SearchInput = React.forwardRef(function SearchInput(
  {
    addonBefore,
    addonAfter,
    searchHistory,
    onClear,
    onSubmit,
    onHistoryItemSelected,
    historyButtonTitle = "Recent Search",
    value: valueProp,
    defaultValue = "",
    onChange,
    type = "search",
    inputRef: inputRefProp,
    ...props
  }: SearchInputProps,
  forwardedRef: React.Ref<HTMLDivElement>
) {
  const [value, setValue] = useControlledState(
    valueProp!,
    defaultValue,
    onChange!
  );
  const inputContainerRef = useObjectRef(forwardedRef);
  const inputRef = useObjectRef(inputRefProp);
  const [isSearchHistoryOpen, setSearchHistoryOpen] = useState(false);
  const showSearchHistoryAction: ActionDefinition = {
    id: CommonActionId.SHOW_SEARCH_HISTORY,
    title: historyButtonTitle,
    actionPerformed: () => {
      setSearchHistoryOpen(true);
    },
  };
  // TODO: rename HelpTooltip, ActionTooltip, etc. to Tooltip.Action Tooltip.Help, then add ActionTooltip in action
  //  components, and use that instead of the more low-level API used here.
  const getShortcut = useGetActionShortcut();
  const searchIcon = searchHistory ? (
    <MenuTrigger
      isOpen={isSearchHistoryOpen}
      onOpenChange={setSearchHistoryOpen}
      positioningTargetRef={inputContainerRef}
      renderMenu={({ menuProps }) => (
        <Menu
          {...menuProps}
          autoFocus="first"
          onAction={(key) => {
            const historyItemText =
              searchHistory[parseInt(`${key}`.split("_")[0])];
            if (historyItemText !== undefined) {
              setValue(historyItemText);
              onHistoryItemSelected?.(historyItemText, value);
              inputRef.current?.focus();
            }
          }}
        >
          {searchHistory.map((historyItem, index) => (
            <Item key={`${index}_${historyItem}`}>{historyItem}</Item>
          ))}
        </Menu>
      )}
    >
      {(menuTriggerProps, ref) => (
        <TooltipTrigger
          tooltip={
            <ActionTooltip
              actionName={historyButtonTitle}
              shortcut={getShortcut(CommonActionId.SHOW_SEARCH_HISTORY)}
            />
          }
        >
          {(tooltipTriggerProps) => (
            <PlatformIcon
              {...mergeProps(tooltipTriggerProps, menuTriggerProps)}
              ref={ref}
              icon="actions/searchWithHistory.svg"
              role="button"
              aria-label={historyButtonTitle}
            />
          )}
        </TooltipTrigger>
      )}
    </MenuTrigger>
  ) : (
    <PlatformIcon icon="actions/search.svg" />
  );
  const clear = () => {
    setValue("");
    onClear?.(value);
  };
  const inputProps = mergeProps<ComponentProps<typeof Input>[]>(props, {
    ref: inputContainerRef,
    inputRef,
    value,
    type,
    onChange: (event) => {
      setValue(event.target.value);
    },
    addonBefore: (
      <>
        {searchIcon}
        {addonBefore}
      </>
    ),
    addonAfter: (
      <>
        {value && (
          <AutoHoverPlatformIcon
            onClick={clear}
            role="button"
            aria-label="Clear search"
            icon="actions/close"
            hoverIcon="actions/closeHovered"
          />
        )}
        {addonAfter}
      </>
    ),
    onKeyDown: (event) => {
      if (event.repeat) {
        return;
      }
      if (event.key === "Enter") {
        onSubmit?.(event.currentTarget.value);
      } else if (event.key === "Escape") {
        clear();
      }
    },
  });
  if (searchHistory) {
    return (
      <ActionsProvider actions={[showSearchHistoryAction]}>
        {({ shortcutHandlerProps }) => (
          <StyledInput {...mergeProps(inputProps, shortcutHandlerProps)} />
        )}
      </ActionsProvider>
    );
  }
  return <StyledInput {...inputProps} />;
});
