import React, { ComponentType, HTMLAttributes, Key, useEffect } from "react";
import { useTabList } from "@react-aria/tabs";
import { filterDOMProps, mergeProps, scrollIntoView } from "@react-aria/utils";
import { useTabListState } from "@react-stately/tabs";
import { AriaTabListProps } from "@react-types/tabs";
import { StyledHorizontalOverflowShadows } from "./StyledHorizontalOverflowShadows";
import { TabsOverflowMenu } from "./TabsOverflowMenu";
import { useOverflowObserver } from "../utils/overflow-utils/useOverflowObserver";
import { useHasOverflow } from "./useHasOverflow";
import { css, styled } from "@intellij-platform/core/styled";
import { notNull } from "@intellij-platform/core/utils/array-utils";
import { TabComponentProps } from "./StyledDefaultTab";
import { StyledDefaultTabs, TabsComponentProps } from "./StyledDefaultTabs";
import { Tab } from "./Tab";

export type TabsProps<T> = Omit<
  AriaTabListProps<T>,
  "orientation" | "isDisabled" | ""
> & {
  /**
   * Whether tabs should be focusable or not. By default, following the Intellij Platform implementation, tabs are
   * not focusable and therefore lack the keyboard accessibility support specified in WAI-ARIA.
   * You can change this default behaviour and make the tabs keyboard accessible by passing `focusable`.
   * focus styles are not perfect at the moment, since it's not considered an important feature.
   * @default false
   */
  focusable?: boolean;

  /**
   * Whether selected tab should change on press up instead of press down.
   * @default false.
   */
  shouldSelectOnPressUp?: boolean;

  /**
   * Enables "active" style on tabs. Is usually related to a container having focus.
   */
  active?: boolean;

  /**
   * If set to true, tabs will be wrapped into multiple rows if needed.
   * NOTE: In the original implementation, in multi row mode, rows are separated by a border. It's not easy to achieve
   * this when we are implementing this feature with a simple `flex-wrap: wrap` css rule. It doesn't seem that
   * important, but we can achieve something similar by some css tricks like the ones suggested here:
   * https://stackoverflow.com/questions/36128333/row-lines-for-flex-container-css
   * @default false
   */
  multiRow?: boolean;

  /**
   * Only effective when {@link multiRow} is not true.
   * If set to true and multiRow is not true, it will prevent horizontal scroll of tabs. Depending on the value of
   * In this case:
   * - if {@link noOverflowMenu} is not set to true, tabs that can't be fitted into the available space will be
   *   accessible via an overflow menu.
   * - if {@link noOverflowMenu} is set to true, the tabs will be fitted into the available space, and they will
   *   be shrunk when needed.
   *
   * @todo: not implemented yet.
   * @default false
   */
  noScroll?: boolean;

  /**
   * Only effective when {@link multiRow} is not true.
   * When set to true, tabs that couldn't be fitted into the available space, are either shrunk (if {@link noScroll}
   * is set to true), or are just accessible by scroll.
   */
  noOverflowMenu?: boolean;

  /**
   * Removes the top and bottom border when passed.
   * It's still not clear whether such option makes sense or not, but
   * at least in common use cases like in tool windows, it seems borders are already there and there should be a way
   * of removing tab borders. On the other hand, when Tabs is used without any assumption about the surrounding UI,
   * it kind of makes sense to have the top and bottom borders by default. So that's why this is made an option for
   * now, maybe until things are clearer.
   *
   * @default false
   */
  noBorders?: boolean;

  TabsComponent?: ComponentType<TabsComponentProps>;
  /**
   *
   */
  TabComponent?: ComponentType<TabComponentProps>;
};

const scrollBarDisabledStyle = css`
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  &::-webkit-scrollbar {
    /* for Chrome/Safari/Webkit */
    display: none;
  }
`;

const StyledTabList = styled.div<{ multiRow?: boolean }>`
  display: flex;
  flex-wrap: ${({ multiRow }) => (multiRow ? "wrap" : "nowrap")};
  overflow: auto;

  ${scrollBarDisabledStyle};
`;

/**
 *
 * TODO: add support for overflow:
 *  - have vertical scroll also scroll tabs
 *  - add support for re-reordering tabs.
 *  - FIX: When a tab that was not selected is removed, selection should not change. It now changes to the tab before the removed one.
 */
export const Tabs = <T extends object>({
  focusable,
  shouldSelectOnPressUp,
  active,
  TabComponent,
  TabsComponent = StyledDefaultTabs,
  multiRow,
  noOverflowMenu,
  noScroll,
  noBorders,
  ...props
}: TabsProps<T>): React.ReactElement => {
  const state = useTabListState(props);
  const ref = React.useRef<HTMLDivElement>(null);
  const { tabListProps } = useTabList(props, state, ref);

  const { scrolledIndicatorProps, hasOverflow } = useHasOverflow({ ref });
  const { overflowedElements } = useOverflowObserver(ref);
  const overflowedKeys = new Set(
    overflowedElements
      .map((element) =>
        element instanceof HTMLElement ? element.dataset["key"] : null
      )
      .filter(notNull)
  );

  useEffect(() => {
    if (!noScroll) {
      const scrollableContainer = ref.current;
      const selectedTabElement = scrollableContainer?.querySelector(
        `[data-key="${state.selectedKey}"]`
      ) as HTMLElement;
      if (scrollableContainer && selectedTabElement) {
        scrollIntoView(scrollableContainer, selectedTabElement);
      }
    } else {
      // TODO maybe? sample use case: project tool window tabs, when not grouped.
    }
  }, [state.selectedKey]);
  const onOverflowMenuItemSelected = (key: Key) => {
    state.setSelectedKey(key);
  };
  if (noScroll) {
    throw new Error("noScroll is not supported yet.");
  }
  return (
    <TabsComponent noBorders={noBorders} {...filterDOMProps(props)}>
      <StyledHorizontalOverflowShadows
        hasOverflowAtStart={hasOverflow.left}
        hasOverflowAtEnd={hasOverflow.right}
        style={{ minWidth: 0 }}
      >
        <StyledTabList
          {...mergeProps(tabListProps, scrolledIndicatorProps)}
          multiRow={multiRow}
          ref={ref}
        >
          {[...state.collection].map((item) => (
            <Tab
              key={item.key}
              item={item}
              state={state}
              focusable={focusable}
              shouldSelectOnPressUp={shouldSelectOnPressUp}
              active={active}
              Component={TabComponent}
            />
          ))}
        </StyledTabList>
      </StyledHorizontalOverflowShadows>
      {!noOverflowMenu && (
        <TabsOverflowMenu
          collection={state.collection}
          overflowedKeys={overflowedKeys}
          onSelect={onOverflowMenuItemSelected}
        />
      )}
    </TabsComponent>
  );
};
