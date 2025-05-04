import React, { useRef, useState } from "react";
import {
  FocusScope,
  IconButton,
  Item,
  Menu,
  MenuOverlayFromOrigin,
  MenuTrigger,
  ModalWindow,
  PlatformIcon,
  WindowLayout,
} from "@intellij-platform/core";

it("allows the focus to go out of modal window and into nested overlays such as menu", () => {
  const Example = () => {
    const [showMenu, setShowMenu] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    return (
      <ModalWindow>
        <WindowLayout
          header="Modal window"
          content={
            <div style={{ padding: "1rem" }}>
              <input
                ref={inputRef}
                onInput={(e) => setShowMenu(e.currentTarget.value !== "")}
              />
              {showMenu && (
                <MenuOverlayFromOrigin
                  origin={{
                    clientX: inputRef.current?.getBoundingClientRect().x ?? 0,
                    clientY:
                      inputRef.current?.getBoundingClientRect().bottom ?? 0,
                  }}
                  onClose={() => {
                    setShowMenu(false);
                  }}
                >
                  <div style={{ padding: "0.375rem", background: "#000" }}>
                    <button onClick={() => setShowMenu(false)}>
                      focused element inside nested overlay
                    </button>
                  </div>
                </MenuOverlayFromOrigin>
              )}
            </div>
          }
        />
      </ModalWindow>
    );
  };
  cy.mount(<Example />);
  cy.get("input").type("a");
  cy.focused().should("contain.text", "focused element inside nested overlay");
  cy.realPress("Enter");
  cy.get("input").should("be.focused");
});

it("moves focus to the modal window, when opened by a menu item action", () => {
  cy.mount(<ModalOnMenuItem />);
  cy.findByRole("button").click();
  cy.findByRole("menuitem").click();
  cy.findByRole("textbox").should("have.focus");
});

it("does not set aria-hidden on the menus opened from within a modal window", () => {
  const Example = () => {
    const [isOpen, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>open modal window</button>
        {isOpen && (
          <ModalWindow onClose={() => setOpen(false)}>
            <WindowLayout
              header="Modal window"
              content={
                <div style={{ padding: "1rem" }}>
                  <MenuTrigger
                    renderMenu={({ menuProps }) => (
                      <Menu {...menuProps}>
                        <Item>Restart Typescript Service</Item>
                        <Item>packages/jui/tsconfig.json</Item>
                        <Item>Compile All</Item>
                      </Menu>
                    )}
                  >
                    {(props, ref) => (
                      <IconButton
                        {...props}
                        aria-label="menu trigger"
                        ref={ref}
                      >
                        <PlatformIcon icon={"general/gearPlain"} />
                      </IconButton>
                    )}
                  </MenuTrigger>
                </div>
              }
            />
          </ModalWindow>
        )}
      </>
    );
  };
  cy.mount(<Example />);
  cy.contains("open modal window").click();
  cy.findByRole("button", { name: "menu trigger" }).click();
  cy.findByRole("menu");
  cy.findAllByRole("menuitem").should("have.length", 3);
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
            <IconButton {...props} ref={ref} preventFocusOnPress={false}>
              <PlatformIcon icon="general/gear" />
            </IconButton>
          )}
        </MenuTrigger>
        {isOpen && (
          <ModalWindow onClose={() => setOpen(false)}>
            <WindowLayout
              header="Modal window"
              content={
                <div style={{ padding: "1rem" }}>
                  <input />
                </div>
              }
            />
          </ModalWindow>
        )}
      </FocusScope>
    </FocusScope>
  );
};
