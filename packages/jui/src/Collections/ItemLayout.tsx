import React from "react";
import { styled } from "../styled";
import { SelectionAwareSpan } from "@intellij-platform/core/Collections/SelectionAwareSpan";

const StyledItemLayout = styled.div`
  display: flex;
  align-items: center;
  padding-right: 0.25rem;
  gap: 0.2rem;
`;

const StyledHint = styled(SelectionAwareSpan)`
  display: inline-flex;
  color: ${({ theme }) => theme.commonColors.inactiveTextColor};
  padding-left: 0.1rem;
`;

/**
 * Generic layout component capturing common use cases of tree or list items.
 * It handles the spacing between parts, and provides styled components for parts that need specific styling.
 * For more flexibility over the order of various pieces of content in list/tree items, there is no specific props
 * for parts. Different parts should just be rendered in children.
 *
 * @example
 * ```tsx
 * <ItemLayout>
 *   <PlatformIcon icon="nodes/folder" />
 *   <HighlightedTextValue />
 *   <ItemLayout.Hint>~/workspace/jui</ItemLayout.Hint>
 * </ItemLayout>
 * ```
 * @beta
 */
export const ItemLayout = ({ children }: { children: React.ReactNode }) => {
  return <StyledItemLayout>{children}</StyledItemLayout>;
};

/**
 * A more subtle text usually rendered next to the main text in the item.
 * @example: project path in project root node, in project view
 * @example: "library root" rendered next to "node_modules" folders in project view.
 */
ItemLayout.Hint = StyledHint;
