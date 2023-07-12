import React from "react";
import { useMenuSection } from "@react-aria/menu";
import { Node } from "@react-types/shared";
import { TreeState } from "@react-stately/tree";
import { styled } from "@intellij-platform/core/styled";

import { renderMenuNodes } from "./renderMenuNodes";

export interface MenuSectionProps<T> {
  item: Node<T>;
  state: TreeState<T>;
  filter?: (node: Node<T>) => boolean;
}

const StyledMenuHeading = styled.div`
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
  filter = () => true,
}: MenuSectionProps<T>): React.ReactElement => {
  let { itemProps, headingProps, groupProps } = useMenuSection({
    heading: item.rendered,
    "aria-label": item["aria-label"],
  });

  const nodes = [...item.childNodes].filter(filter);
  if (nodes.filter(({ type }) => type === "item").length === 0) {
    return <></>;
  }
  return (
    <>
      <li {...itemProps}>
        {item.rendered && (
          <StyledMenuHeading {...headingProps}>
            {item.rendered}
          </StyledMenuHeading>
        )}
        <StyledMenuSectionItemsContainer {...groupProps}>
          {renderMenuNodes(state, nodes)}
        </StyledMenuSectionItemsContainer>
      </li>
    </>
  );
};
