import React, { useState } from "react";
import {
  ActionButton,
  FocusScope,
  Item,
  Menu,
  MenuTrigger,
  ModalWindow,
  PlatformIcon,
} from "@intellij-platform/core";

it("moves focus to the modal window, when opened by a menu item action", () => {
  cy.mount(<ModalOnMenuItem />);
  cy.findByRole("button").click();
  cy.findByRole("menuitem").click();
  cy.findByRole("textbox").should("have.focus");
});

const ModalOnMenuItem = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    // This UI mimics what is going on in ToolWindows. It's the minimum required setup to reproduce the issue.
    <FocusScope contain>
      <FocusScope>
        <MenuTrigger
          renderMenu={({ menuProps }) => (
            <Menu {...menuProps} onAction={() => setOpen(true)}>
              <Item key="open">open modal window</Item>
            </Menu>
          )}
        >
          {(props, ref) => (
            <ActionButton {...props} ref={ref} preventFocusOnPress={false}>
              <PlatformIcon icon="general/gear" />
            </ActionButton>
          )}
        </MenuTrigger>
        {isOpen && (
          <ModalWindow title={"Modal window"} onClose={() => setOpen(false)}>
            <div style={{ padding: "1rem" }}>
              <input />
            </div>
          </ModalWindow>
        )}
      </FocusScope>
    </FocusScope>
  );
};
