import React, { useContext } from "react";
import { Checkbox } from "@intellij-platform/core/Checkbox";
import { TreeContext } from "@intellij-platform/core/Tree/TreeContext";
import { SelectionState } from "@intellij-platform/core/TreeCheckboxes/NestedSelection";
import { ItemStateContext } from "@intellij-platform/core/Collections";
import styled from "styled-components";

export type TreeNodeCheckboxProps<T extends unknown> = {
  selectionState?: SelectionState;
  selectItemOnPress?: boolean;
  onToggle: () => void;
  // maybe a isDisabled prop to be merged with isDisabled from the item?
};

const StyledCheckboxWrapper = styled.span`
  margin-right: 0.125rem;
  display: inline-flex;
`;

/**
 * Checkbox to be used with {@link SpeedSearchTreeWithCheckboxes}. `SpeedSearchTreeWithCheckboxes` doesn't add the
 * checkboxes by default to the nodes, which makes it more flexible in terms of which nodes should have checkbox, or
 * it's exact placement within the tree rows.
 *
 * TreeNodeCheckbox renders a Checkbox with a few extras:
 * - `aria-label` set based on the encompassing item's textValue
 * - `isSelected` and `isIndeterminate` set based on `selectionState`
 * - `isDisabled` is set based in disabled state of the item.
 * - The encompassing item will be selected upon press, if `selectItemOnPress` is `true` (default is `true`).
 * - Small styling adjustment achieved by a wrapper StyledListIconWrapper.
 *
 * @see SpeedSearchTreeWithCheckboxes
 * @see useNestedSelectionState
 *
 * NOTE: this component currently uses TreeContext, to get a hold of selectionManager. If a more abstract component
 * like CollectionCheckbox is needed in the future, we can refactor TreeContext also to something more abstract like
 * CollectionContext which is provided by all such components like List, Tree or Table.
 */
export const TreeNodeCheckbox = <T extends unknown>({
  selectionState,
  onToggle,
  selectItemOnPress = true,
}: TreeNodeCheckboxProps<T>) => {
  const treeContext = useContext(TreeContext);
  const itemContext = useContext(ItemStateContext);
  if (!itemContext) {
    throw new Error("TreeNodeCheckbox is rendered outside tree nodes.");
  }

  return (
    <StyledCheckboxWrapper>
      <Checkbox
        preventFocus
        aria-label={`Select ${itemContext.node.textValue}`}
        isSelected={selectionState === "Selected"}
        isIndeterminate={selectionState === "PartiallySelected"}
        isDisabled={itemContext.isDisabled}
        onChange={() => {
          onToggle();
          // this if and the whole need for treeContext could be avoided if event.stopPropagation() was not hard coded
          // in useToggle: https://github.com/adobe/react-spectrum/blob/0d007bca9417c4b7b86fafd5842871bf997bd4c0/packages/@react-aria/toggle/src/useToggle.ts#L46
          // An improvement could be to replace Checkbox with CheckboxIcon, and simply handle press on it (potential TODO)
          if (treeContext && itemContext && selectItemOnPress) {
            treeContext.state.selectionManager.setFocusedKey(
              itemContext.node.key
            );
            treeContext.state.selectionManager.setFocused(true);
            treeContext.state.selectionManager.setSelectedKeys([
              itemContext.node.key,
            ]);
          }
        }}
      />
    </StyledCheckboxWrapper>
  );
};
