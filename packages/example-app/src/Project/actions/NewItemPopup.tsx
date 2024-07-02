import {
  Input,
  Popup,
  PopupLayout,
  PositionedTooltipTrigger,
  styled,
  ValidationTooltip,
} from "@intellij-platform/core";
import React, { ChangeEvent, useState } from "react";

const StyledInput = styled(Input)`
  width: 20.5rem;
  /**
     * To have the validation box shadow not clipped by the popup.
     * Maybe it should be an option on input to make sure margin is always in sync with the box-shadow thickness
     */
  margin: 3px;

  input {
    padding-top: 1px;
    padding-bottom: 1px;
  }
`;
const StyledHeader = styled(Popup.Header)`
  border-bottom: 1px solid ${({ theme }) => theme.commonColors.border()};
`;

/**
 * A simple Popup with an input, used in actions such as create file, or create directory
 */
export function NewItemPopup({
  title,
  inputName = "Name",
  onSubmit,
  validationMessage,
  validationType = "error",
  value,
  onChange,
}: {
  inputName?: string;
  title: React.ReactNode;
  onSubmit: () => void;
  value: string;
  onChange: (newValue: string) => void;
  validationMessage?: string;
  validationType?: "error" | "warning";
}) {
  const [hideMessage, setHideMessage] = useState(false);
  return (
    <Popup>
      <PopupLayout
        header={<StyledHeader>{title}</StyledHeader>}
        content={
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            onMouseDown={() => {
              setHideMessage(true);
            }}
          >
            <PositionedTooltipTrigger
              isOpen={Boolean(validationMessage) && !hideMessage}
              placement="top start"
              offset={6}
              crossOffset={-6}
              tooltip={
                <ValidationTooltip type={validationType}>
                  {validationMessage}
                </ValidationTooltip>
              }
            >
              <StyledInput
                appearance="embedded"
                validationState={validationMessage ? validationType : undefined}
                placeholder={inputName}
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setHideMessage(false);
                  onChange(e.target.value);
                }}
              />
            </PositionedTooltipTrigger>
          </form>
        }
      />
    </Popup>
  );
}
