import React from "react";
import { ModalWindow, styled, WindowLayout } from "@intellij-platform/core";
import { SpeedSearchTreeSample } from "@intellij-platform/core/story-components";

const StyledContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.75rem;
`;
const StyledFrame = styled.div`
  border: 1px solid ${({ theme }) => theme.commonColors.contrastBorder};
  flex: 1;
  overflow: auto;
`;

describe("ModalWindow containing Tree", () => {
  // FIXME(https://github.com/alirezamirian/jui/issues/56): unskip
  it.skip("should be sized to fit tree", () => {
    cy.mount(
      <ModalWindow>
        <WindowLayout
          header="Window title"
          content={
            <StyledContainer>
              <StyledFrame>
                <SpeedSearchTreeSample />
              </StyledFrame>
            </StyledContainer>
          }
        />
      </ModalWindow>
    );
    cy.findByRole("dialog").invoke("width").should("be.greaterThan", 180);
    matchImageSnapshot("ModalWindow-sized-based-on-Tree");
  });
});

function matchImageSnapshot(snapshotsName: string) {
  cy.get("[aria-busy=true]").should("not.exist");
  cy.percySnapshot(snapshotsName);
}
