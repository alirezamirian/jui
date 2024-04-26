import React from "react";
import {
  ModalWindow,
  ModalWindowProps,
} from "@intellij-platform/core/ModalWindow";
import { OverlayMoveHandle } from "@intellij-platform/core/Overlay";
import { styled } from "../styled";
import { StyledWindowContainer } from "@intellij-platform/core/ModalWindow/ModalWindow";
import { PlatformIcon } from "@intellij-platform/core/Icon";
import { ButtonGroup } from "@intellij-platform/core/ButtonGroup";
import { isEventOnEmptySpaces } from "@intellij-platform/core/utils/interaction-utils/useMove";

export interface AlertDialogProps
  extends Pick<ModalWindowProps, "minWidth" | "id" | "onClose"> {
  /**
   * Content slot for the heading, aka. title of the dialog. Typically plain text.
   */
  heading?: React.ReactNode;
  /**
   * Content slot for the body, aka. message of the dialog. Typically plain text.
   */
  body?: React.ReactNode;
  /**
   * Content slot for the checkbox ("Do not ask again").
   * @example
   * ```jsx
   * <AlertDialog checkbox={<Checkbox>Do not ask again</Checkbox>} />
   * ```
   * @see Checkbox
   */
  checkbox?: React.ReactNode;

  /**
   * Type of the alert dialog. The icon is set based on type.
   */
  type?: "error" | "warning" | "information" | "question";

  /**
   * Content slot for buttons.
   * @example
   * ```jsx
   * <AlertDialog
   *   buttons={
   *     <>
   *       <Button>Cancel</Button>
   *       <Button variant="default">Ok</Button>
   *     </>
   *   }
   * />
   * ```
   * @see Button
   */
  buttons?: React.ReactNode;

  /**
   * Content slot for help icon button in the footer.
   * @example
   * ```jsx
   * <AlertDialog
   *   helpButton={
   *     <TooltipTrigger tooltip={<HelpTooltip helpText="Show Help Contents" />}>
   *       <Button variant="icon">
   *         <PlatformIcon icon="actions/help"></PlatformIcon>
   *       </Button>
   *     </TooltipTrigger>
   *   }
   * />
   * ```
   * @see Button
   */
  helpButton?: React.ReactNode;
}

const StyledModalWindow = styled(ModalWindow)`
  ${StyledWindowContainer} {
    border-radius: 0;
    outline: 0.5px solid rgba(0, 0, 0, 0.85); // FIXME
  }
`;

const StyledContainer = styled.div`
  padding: 1.25rem;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  align-items: center;
  gap: 0.875rem;
`;

const StyledHeading = styled.h2`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: bold;
`;

const StyledBody = styled.div`
  line-height: 1.2;
`;

const StyledContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: default;
`;

const StyledCheckbox = styled.div`
  padding: 0.375rem 0;
  // to align the checkbox with the content, since the box has a padding. Maybe Checkbox should not have any padding.
  margin-left: -0.25rem;
`;

const StyledButtons = styled(ButtonGroup)`
  display: flex;
  justify-self: end;
  gap: 1rem;
`;

const StyledIcon = styled.span`
  align-self: start;
`;

const StyledHelpIcon = styled.div`
  justify-self: center;
`;

/**
 * A modal dialog implementing [Alert](https://jetbrains.github.io/ui/controls/alert), which is the
 * [notification](https://jetbrains.github.io/ui/controls/notifications/) pattern for use cases where
 * immediate user action is required.
 * Since the use cases are quite specific, and the component is expected to be used with pretty specific
 * content items, the layout is not implemented as a separate component, the way it is in many other components.
 *
 */
export const AlertDialog = ({
  type = "question",
  heading,
  body,
  checkbox,
  helpButton,
  buttons,
  minWidth = 370,
  ...otherProps
}: AlertDialogProps): JSX.Element => {
  return (
    <StyledModalWindow
      role="alertdialog"
      interactions="move"
      minWidth={minWidth}
      defaultBounds={{
        top: window.innerHeight / 4,
      }}
      // Reacting to content size, to make sure the content will be visible, considering the window is not resizable.
      observeContentResize
      {...otherProps}
    >
      <OverlayMoveHandle dragThreshold={6} canMoveStart={isEventOnEmptySpaces}>
        {({ moveHandleProps }) => (
          <StyledContainer {...moveHandleProps}>
            <StyledIcon>
              {/* Icon name is theme-able in the reference impl via OptionPane[`${icon}Icon`] */}
              <PlatformIcon size={32} icon={`general/${type}Dialog`} />
            </StyledIcon>
            <StyledContent>
              <StyledHeading>{heading}</StyledHeading>
              <StyledBody>{body}</StyledBody>
              {checkbox && <StyledCheckbox>{checkbox}</StyledCheckbox>}
            </StyledContent>
            <StyledHelpIcon>{helpButton}</StyledHelpIcon>
            <StyledButtons>{buttons}</StyledButtons>
          </StyledContainer>
        )}
      </OverlayMoveHandle>
    </StyledModalWindow>
  );
};
