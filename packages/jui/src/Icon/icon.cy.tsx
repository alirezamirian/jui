import { PlatformIcon } from "@intellij-platform/core";
import * as React from "react";

describe("PlatformIcon", () => {
  it("sets aria-busy while loading the icon", () => {
    cy.mount(<PlatformIcon icon="actions/search" />); // existing icon
    cy.get('[aria-busy="true"]').should("exist"); // initially loading
    cy.get('[aria-busy="true"]').should("not.exist"); // eventually loaded

    cy.mount(<PlatformIcon icon="expui/fileTypes/jest" />); // non-existing icon
    cy.get('[aria-busy="true"]').should("exist"); // initially loading
    cy.get('[aria-busy="true"]').should("not.exist"); // still should remove aria-busy when the loading fails
  });
});
