import React from "react";
import { MnemonicText, MnemonicTrigger, styled } from "@intellij-platform/core";

const StyledContainer = styled.div`
  color: ${({ theme }) => theme.color("*.foreground")};
`;

describe("Mnemonic", () => {
  it("triggers when the specified key is pressed with the activator key", () => {
    const onTriggered = cy.stub();
    cy.mount(
      <MnemonicTrigger mnemonic="D" onTriggered={onTriggered}>
        Disconnect
      </MnemonicTrigger>
    );
    cy.window().focus();
    cy.realPress(["Alt", "d"]);
    cy.wrap(onTriggered).should("be.calledOnce");
  });

  it("handles multiple mnemonics are rendered at the same time", () => {
    const d = cy.stub();
    const t = cy.stub();
    cy.mount(
      <>
        <MnemonicTrigger mnemonic="D" onTriggered={d}>
          Disconnect
        </MnemonicTrigger>
        <MnemonicTrigger mnemonic="T" onTriggered={t}>
          Terminate
        </MnemonicTrigger>
      </>
    );
    cy.window().focus();
    cy.realPress(["Alt", "d"]);
    cy.wrap(d).should("be.calledOnce");
    cy.wrap(t).should("not.be.calledOnce");
    cy.realPress(["Alt", "t"]);
    cy.wrap(t).should("be.calledOnce");
  });

  it("is case insensitive", () => {
    const onTriggered = cy.stub();
    cy.mount(
      <MnemonicTrigger mnemonic="d" onTriggered={onTriggered}>
        Disconnect
      </MnemonicTrigger>
    );
    cy.window().focus();
    cy.realPress(["Alt", "d"]);
    cy.wrap(onTriggered).should("be.calledOnce");
  });

  it("shows the mnemonic character as underlined, when mnemonic modifier is being pressed", () => {
    cy.mount(
      <StyledContainer>
        <MnemonicTrigger mnemonic="D">
          {/* making sure only the first occurrence is underlined, even when not matching the case */}
          disconnect Disconnect
        </MnemonicTrigger>
        <br />
        <MnemonicTrigger mnemonic="D">
          {/* making sure first-letter of words is prioritized over mid-word letter that comes before it */}
          Include disabled actions
        </MnemonicTrigger>
      </StyledContainer>
    );
    cy.window().focus();
    cy.get("body").type("{alt}", { release: false });
    matchImageSnapshot("Mnemonic-activated");
  });

  it("works with non-string children", () => {
    const SomeComponent = ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    );
    cy.mount(
      <StyledContainer>
        <MnemonicTrigger mnemonic="D">
          <SomeComponent>
            {/* making sure, only the first occurrence is underlined, even when not matching the case */}
            <MnemonicText>disconnect Disconnect</MnemonicText>
          </SomeComponent>
        </MnemonicTrigger>
      </StyledContainer>
    );
    cy.window().focus();
    cy.get("body").type("{alt}", { release: false });
    matchImageSnapshot("Mnemonic-non-string-activated");
  });

  it("doesn't trigger if the trigger is hidden", () => {
    const onTriggered = cy.stub();

    cy.mount(
      <div style={{ display: "none" }}>
        <div>
          <MnemonicTrigger mnemonic="D" onTriggered={onTriggered}>
            Disconnect
          </MnemonicTrigger>
        </div>
      </div>
    );
    cy.window().focus();
    cy.realPress(["Alt", "d"]);
    cy.wrap(onTriggered).should("not.be.calledOnce");
  });

  it("warns when the mnemonic is activated but is not made visible to the user", () => {
    cy.window().then((win) => cy.spy(win.console, "warn").as("consoleWarn"));
    cy.mount(
      <StyledContainer>
        <MnemonicTrigger mnemonic="W">Disconnect</MnemonicTrigger>
        <br />
        <MnemonicTrigger mnemonic="D">
          <span>Disconnect</span>
        </MnemonicTrigger>
        <br />
        <MnemonicTrigger mnemonic="T">Terminate</MnemonicTrigger>
      </StyledContainer>
    );
    cy.get("@consoleWarn").should("be.calledTwice");
  });

  it("when activated, prevents alt code special characters being inserted into the currently focused input", () => {
    cy.mount(
      <StyledContainer>
        <input />
        <MnemonicTrigger mnemonic="D">Disconnect</MnemonicTrigger>
      </StyledContainer>
    );
    cy.get("input").focus();
    cy.realPress(["Alt", "d"]);
    cy.get("input").should("have.value", "");
  });
});

function matchImageSnapshot(snapshotsName: string) {
  // with percy
  cy.get("[aria-busy=true]").should("not.exist");
  cy.percySnapshot(snapshotsName);

  // or local snapshot testing
  // cy.document().toMatchImageSnapshot({
  //   name: snapshotsName,
  // });
}
