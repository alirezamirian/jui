import {
  Button,
  Checkbox,
  ModalWindow,
  WindowLayout,
} from "@intellij-platform/core";
import React, { Dispatch, SetStateAction, useState } from "react";

const UseBooleanState = <T,>({
  children,
  initialValue,
}: {
  children: (args: [T, Dispatch<SetStateAction<T>>]) => React.ReactNode;
  initialValue: T;
}) => {
  return <>{children(useState<T>(initialValue))}</>;
};
it("only triggers mnemonics inside the model", () => {
  const amend = cy.stub();
  const firstModal = {
    dontAsk: cy.stub(),
    dontAskDuplicate: cy.stub(),
  };
  const secondModal = {
    dontAsk: cy.stub(),
    disconnect: cy.stub(),
  };
  cy.mount(
    <div>
      <Checkbox mnemonic="M" onChange={amend}>
        Amend
      </Checkbox>
      <ModalWindow defaultBounds={{ top: 50, width: 400, height: 100 }}>
        <WindowLayout
          header={<WindowLayout.Header>First window</WindowLayout.Header>}
          content={
            <>
              <Checkbox mnemonic="A" onChange={firstModal.dontAskDuplicate}>
                Don't ask again (in first modal - duplicate mnemonic)
              </Checkbox>

              <Checkbox mnemonic="O" onChange={firstModal.dontAsk}>
                Don't ask again (in first modal)
              </Checkbox>
              <UseBooleanState initialValue={false}>
                {([isOpen, setOpen]) => (
                  <>
                    <Button onPress={() => setOpen(true)}>Show</Button>
                    <br />
                    {isOpen && (
                      <ModalWindow onClose={() => setOpen(false)}>
                        <WindowLayout
                          header={
                            <WindowLayout.Header>
                              Second window
                            </WindowLayout.Header>
                          }
                          content={
                            <>
                              <Checkbox
                                mnemonic="A"
                                onChange={secondModal.dontAsk}
                              >
                                Don't ask again
                              </Checkbox>
                            </>
                          }
                          footer={
                            <WindowLayout.Footer
                              right={
                                <>
                                  <Button
                                    mnemonic="D"
                                    onPress={secondModal.disconnect}
                                  >
                                    Disconnect
                                  </Button>
                                  <Button>Terminate</Button>
                                </>
                              }
                            />
                          }
                        />
                      </ModalWindow>
                    )}
                  </>
                )}
              </UseBooleanState>
            </>
          }
        />
      </ModalWindow>
    </div>
  );
  cy.window().focus();
  cy.contains("Show").click();
  cy.realPress(["Alt", "m"]);
  cy.realPress(["Alt", "A"]);
  cy.realPress(["Alt", "D"]);
  cy.realPress(["Alt", "O"]);
  cy.wrap(secondModal.disconnect).should("be.called"); // 🟢 mnemonic inside the nested modal
  cy.wrap(firstModal.dontAskDuplicate).should("not.be.called"); // 🔴 mnemonic in the parent modal (same key)
  cy.wrap(firstModal.dontAsk).should("not.be.called"); // 🔴 mnemonic in the parent modal
  cy.wrap(amend).should("not.be.called"); // 🔴 mnemonic outside open modals
});
