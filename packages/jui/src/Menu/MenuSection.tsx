import React from "react";
import { useMenuSection } from "@react-aria/menu";
import { Node } from "@react-types/shared";
import { TreeState } from "@react-stately/tree";
import { styled } from "@intellij-platform/core/styled";

import { renderMenuNode } from "./renderMenuNode";

export interface MenuSectionProps<T> {
  item: Node<T>;
  state: TreeState<T>;
}

const StyledMenuHeading = styled.li`
  cursor: default;
  padding: 2px 0 2px 12px;
  font-weight: bold;
  font-size: 0.8125rem;
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
          {[...item.childNodes].map((node) => renderMenuNode(state, node))}
        </StyledMenuSectionItemsContainer>
      </li>
    </>
  );
};
