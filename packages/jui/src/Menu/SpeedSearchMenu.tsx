import React, {
  HTMLAttributes,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Node } from "@react-types/shared";
import {
  mergeProps,
  useLayoutEffect,
  useResizeObserver,
} from "@react-aria/utils";
import { focusSafely } from "@react-aria/focus";
import { ListCollection } from "@react-stately/list";
import { TreeState } from "@react-stately/tree";
import { useEventCallback } from "@intellij-platform/core/utils/useEventCallback";
import {
  useCollectionSpeedSearch,
  CollectionSpeedSearchMatches,
} from "@intellij-platform/core/CollectionSpeedSearch";
import {
  SpeedSearchInput,
  SpeedSearchPopupProps,
  SpeedSearchState,
} from "@intellij-platform/core/SpeedSearch";

import { StyledMenu } from "./StyledMenu";
import { MenuContext, MenuProps, useMenu, useMenuState } from "./Menu";
import { renderMenuNodes } from "./renderMenuNodes";
import { SubmenuProps, useSubmenu } from "./Submenu";
import { useSubmenuState } from "./_useSubmenuState";
import { MenuKeyboardDelegate } from "./_useSubmenu";
import { styled } from "@intellij-platform/core/styled";
import { StyledVerticalSeparator } from "@intellij-platform/core/StyledSeparator";

export interface SpeedSearchMenuProps<T>
  extends Omit<MenuProps<T>, "submenuBehavior"> {
  submenuBehavior?: Exclude<MenuProps<T>["submenuBehavior"], "default">;
  /**
   * Text to show when the filtering is active but no match is found for the current query.
   * @default "Nothing to show"
   */
  emptyText?: React.ReactNode;
}

const StyledItemsContainer = styled.ul`
  all: unset;
  flex: 1;
  overflow: auto;
`;

const StyledSearchFieldWrapper = styled.div`
  flex-shrink: 0;
  padding: 0 0.2rem 0.3rem;
`;

const StyledSpeedSearchMenu = styled(StyledMenu)`
  --jui-menu-item-padding: 1.25rem;
  ${StyledVerticalSeparator} {
    margin: 0 3px; // FIXME: probably use theme
  }
`;

const StyledPlaceholder = styled.div`
  color: ${({ theme }) =>
    // Ref: StatusText => DEFAULT_ATTRIBUTES => SimpleTextAttributes.GRAYED_ATTRIBUTES
    theme.color(
      "Component.infoForeground",
      theme.dark ? "#787878" : "#999999"
    )};

  // center positioning. Intentionally different from reference impl.
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  white-space: nowrap;
`;

function useSpeedSearchMenu<T>(
  state: TreeState<T>,
  rootKey: React.Key | null,
  ref: React.RefObject<HTMLUListElement>,
  containerRef: React.RefObject<HTMLDivElement>
) {
  const {
    speedSearch,
    selectionManager,
    keyboardDelegate,
    containerProps: speedSearchContainerProps,
    searchPopupProps,
  } = useCollectionSpeedSearch({
    collection: useMemo(
      () =>
        new ListCollection(
          rootKey
            ? state.collection.getItem(rootKey).childNodes
            : state.collection
        ),
      [rootKey, state.collection]
    ),
    selectionManager: state.selectionManager,
    keyboardDelegate: new MenuKeyboardDelegate(
      rootKey,
      state.collection,
      state.disabledKeys,
      ref
    ),
    stickySearch: true,
    focusBestMatch: true,
    ref,
  });

  // When a menu item which was focused is filtered out, the focus goes to body.
  // We manually move focus back to the container.
  useEffect(() => {
    const element = ref.current;
    if (
      element &&
      state.selectionManager.isFocused &&
      !element?.contains(document.activeElement)
    ) {
      focusSafely(element);
    }
  });

  const lastSize = useRef<{ width: number; height: number } | null>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null
  );
  const measureSize = () => {
    const { offsetWidth = 0, offsetHeight = 0 } = containerRef.current || {};
    if (offsetWidth > 0 && offsetHeight > 0) {
      lastSize.current = {
        width: offsetWidth,
        height: offsetHeight,
      };
    }
  };
  const isSearchActive =
    speedSearch.active && speedSearch.searchTerm.length > 0;
  useResizeObserver({
    ref: containerRef,
    onResize: useEventCallback(() => {
      if (!isSearchActive) {
        measureSize();
      }
    }),
  });
  useLayoutEffect(() => {
    if (isSearchActive) {
      if (lastSize.current) {
        setSize(lastSize.current);
      }
    } else {
      if (!lastSize.current) {
        measureSize();
      }
      setSize(null);
    }
  }, [isSearchActive]);

  const sizeStyleProps: HTMLAttributes<HTMLElement> = size
    ? {
        style: {
          ...size,
          minHeight: size.height,
          maxHeight: size.height,
        },
      }
    : {};
  return {
    speedSearch,
    keyboardDelegate,
    selectionManager,
    speedSearchContainerProps: mergeProps<HTMLAttributes<HTMLElement>[]>(
      speedSearchContainerProps,
      sizeStyleProps,
      {
        onMouseDown: (e: React.MouseEvent) => {
          // Until SearchInput and connecting that to a selectable list is implemented, we should prevent menu from
          // losing focus when the fake search input is clicked
          e.preventDefault();
        },
      }
    ),
    searchPopupProps,
  };
}

/**
 * Drop-in replacement for Menu, which implements SpeedSearch.
 *
 *
 */
export const SpeedSearchMenu = <T extends object>({
  submenuBehavior = "toggleOnPress",
  autoFocus = "first",
  emptyText = "Nothing to show",
  minWidth,
  ...props
}: SpeedSearchMenuProps<T>) => {
  const onAction = (key: React.Key) => {
    props.onAction?.(key);
    speedSearch.clear();
  };
  const ref = React.useRef<HTMLUListElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const state = useMenuState({ ...props });
  const {
    speedSearch,
    speedSearchContainerProps,
    searchPopupProps,
    keyboardDelegate,
  } = useSpeedSearchMenu(state, null, ref, containerRef);
  const { menuContextValue, menuProps } = useMenu(
    {
      ...props,
      autoFocus,
      onAction,
      keyboardDelegate,
      submenuBehavior,
    },
    state,
    ref
  );

  return (
    <MenuContext.Provider
      value={{
        ...menuContextValue,
        renderSubmenu: (props) => (
          <SpeedSearchSubmenu emptyText={emptyText} {...props} />
        ),
      }}
    >
      <StyledSpeedSearchMenu
        as="div"
        ref={containerRef}
        style={{ minWidth }}
        {...speedSearchContainerProps}
        fillAvailableSpace={props.fillAvailableSpace}
      >
        <SpeedSearchMenuContent
          items={[...state.collection]}
          emptyText={emptyText}
          speedSearch={speedSearch}
          searchPopupProps={searchPopupProps}
          state={state}
          menuProps={menuProps}
          menuRef={ref}
        />
      </StyledSpeedSearchMenu>
    </MenuContext.Provider>
  );
};

function SpeedSearchMenuContent<T>({
  items,
  state,
  speedSearch,
  searchPopupProps,
  menuProps,
  menuRef,
  emptyText,
}: {
  state: TreeState<T>;
  items: Node<T>[];
  speedSearch: SpeedSearchState & { matches: CollectionSpeedSearchMatches };
  searchPopupProps: SpeedSearchPopupProps;
  menuProps: HTMLAttributes<HTMLElement>;
  menuRef: RefObject<HTMLUListElement>;
  emptyText: React.ReactNode;
}) {
  const filter = speedSearch.active
    ? ({ key, type }: Node<T>) =>
        type !== "item" || speedSearch.matches.has(key)
    : undefined;
  return (
    <>
      {searchPopupProps.children && (
        <StyledSearchFieldWrapper
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <SpeedSearchInput {...searchPopupProps} clear={speedSearch.clear} />
        </StyledSearchFieldWrapper>
      )}
      <StyledItemsContainer {...menuProps} ref={menuRef}>
        {renderMenuNodes(state, items, filter)}
        {speedSearch.active && speedSearch.matches.size === 0 && (
          <StyledPlaceholder>{emptyText}</StyledPlaceholder>
        )}
      </StyledItemsContainer>
    </>
  );
}

function SpeedSearchSubmenu<T>({
  parentState,
  rootKey,
  emptyText,
}: SubmenuProps<T> & { emptyText: React.ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const state = useSubmenuState(parentState);
  const rootItem = state.collection.getItem(rootKey);

  const {
    speedSearch,
    speedSearchContainerProps,
    searchPopupProps,
    keyboardDelegate,
  } = useSpeedSearchMenu(state, rootKey, ref, containerRef);
  const { submenuProps } = useSubmenu(
    { rootKey, parentState, keyboardDelegate },
    state,
    ref
  );

  return (
    <StyledSpeedSearchMenu
      {...speedSearchContainerProps}
      as="div"
      ref={containerRef}
    >
      <SpeedSearchMenuContent
        items={[...(rootItem?.childNodes || [])]}
        speedSearch={speedSearch}
        searchPopupProps={searchPopupProps}
        state={state}
        menuProps={submenuProps}
        menuRef={ref}
        emptyText={emptyText}
      />
    </StyledSpeedSearchMenu>
  );
}
