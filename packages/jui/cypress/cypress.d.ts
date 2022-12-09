import { mount } from "cypress/react";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;

      /**
       * Command+click on mac, Ctrl+click, otherwise
       */
      ctrlClick(
        options?: Partial<
          Omit<
            Cypress.ClickOptions,
            "cmdKey" | "ctrlKey" | "commandKey" | "controlKey" | "metaKey"
          >
        >
      ): Chainable<Subject>;
    }
  }
}
