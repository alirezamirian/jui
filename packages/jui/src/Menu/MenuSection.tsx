import { styled } from "@intellij-platform/core/styled";
import React, { Key } from "react";
import { useMenuSection } from "@react-aria/menu";
import { MenuItem } from "@intellij-platform/core/Menu/MenuItem";
import { Node } from "@react-types/shared";
import { TreeState } from "@react-stately/tree";

export interface MenuSectionProps<T> {
  item: Node<T>;
  state: TreeState<T>;
  onAction?: (key: Key) => void;
  expandOn?: "hover" | "press";
}

const StyledMenuHeading = styled.li`
  cursor: default;
  padding: 2px 0 2px 12px;
  color: ${({ theme }) =>
    theme.color(
      "MenuItem.disabledForeground"
    )}; // TODO: make sure about it. It's probably not correct color
`;

const StyledMenuSectionItemsContainer = styled.ul`
  padding: 0;
  margin: 0;
`;

export const MenuSection = <T extends unknown>({
  item,
  state,
  onAction,
  expandOn,
}: MenuSectionProps<T>): React.ReactElement => {
  let { itemProps, headingProps, groupProps } = useMenuSection({
    heading: item.rendered,
    "aria-label": item["aria-label"],
  });

  return (
    <>
      <li {...itemProps}>
        {item.rendered && (
          <StyledMenuHeading {...headingProps}>
            {item.rendered}
          </StyledMenuHeading>
        )}
        <StyledMenuSectionItemsContainer {...groupProps}>
          {[...item.childNodes].map((node) => {
            return (
              <MenuItem
                key={node.key}
                item={node}
                state={state}
                onAction={onAction}
                expandOn={expandOn}
              />
            );
          })}
        </StyledMenuSectionItemsContainer>
      </li>
    </>
  );
};
