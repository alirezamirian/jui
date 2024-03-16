import React from "react";
import { ModalWindow, styled, WindowLayout } from "@intellij-platform/core";
import { SpeedSearchTreeSample } from "../src/story-components";

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
  it("should be sized to fit tree", () => {
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
    matchImageSnapshot("ModalWindow-sized-based-on-Tree");
  });
});

function matchImageSnapshot(snapshotsName: string) {
  // cy.get("[data-loading-icon]").should("not.exist");
  // cy.percySnapshot(snapshotsName);
}
