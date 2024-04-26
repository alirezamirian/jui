import React, { CSSProperties, ReactNode } from "react";
import { DOMAttributes, FocusableElement } from "@react-types/shared";
import { FocusScope, useFocusManager } from "@react-aria/focus";
import { useKeyboard } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { hasAnyModifier } from "@intellij-platform/core/utils/keyboard-utils";
import { styled } from "@intellij-platform/core/styled";

export interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const StyledButtonGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
`;

/**
 * `ButtonGroup` should be used as a wrapper around related {@link Button Buttons}, in places such as the
 * footer of a dialog. It does two things:
 * - allows for moving the focus between the buttons with left/right arrow keys.
 * - applies the right spacing between the buttons
 *
 * @see Button
 */
export function ButtonGroup(props: ButtonGroupProps) {
  return (
    <FocusScope>
      <HorizontalArrowKeyNavigation>
        {(arrowKeyNavigationProps) => (
          <StyledButtonGroup {...mergeProps(props, arrowKeyNavigationProps)} />
        )}
      </HorizontalArrowKeyNavigation>
    </FocusScope>
  );
}

function HorizontalArrowKeyNavigation({
  children,
}: {
  children: (props: DOMAttributes<FocusableElement>) => ReactNode;
}) {
  const focusManager = useFocusManager();
  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      if (!hasAnyModifier(e)) {
        if (e.key === "ArrowLeft") {
          return focusManager?.focusPrevious({ wrap: true });
        } else if (e.key === "ArrowRight") {
          return focusManager?.focusNext({ wrap: true });
        }
      }
      e.continuePropagation();
    },
  });

  return <>{children(keyboardProps)}</>;
}
