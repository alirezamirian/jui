// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-real-events/support";
import "cypress-plugin-snapshots/commands";
import "@testing-library/cypress/add-commands";
import "@oreillymedia/cypress-playback/addCommands";
import "cypress-plugin-xhr-toggle";
import "@percy/cypress";
import "cypress-plugin-steps";
import { isMac } from "@react-aria/utils";

// resize commands
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to perform resize action on an element with resize handle on `side`
       * @example cy.resizeFromSide('left', 50) // increase size by 50 pixels, using left resize handle.
       * @example cy.resizeFromSide('left', -50) // decrease size by 50 pixels, using left resize handle.
       * @example cy.resizeFromSide('top', 50) // increase size by 50 pixels, using top resize handle.
       * @example cy.resizeFromSide('top', -50) // decrease size by 50 pixels, using top resize handle.
       */
      resizeFromSide(
        side: "left" | "right" | "top" | "bottom",
        value: number
      ): Chainable<JQuery<HTMLElement>>;
      /**
       * Custom command to perform move action on a handle which allows moving by drag.
       */
      move(x: number, y: number): Chainable<JQuery<HTMLElement>>;

      isWithinViewport(): Chainable<JQuery<HTMLElement>>;

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

Cypress.Commands.add("ctrlClick", { prevSubject: true }, (subject, options) => {
  cy.wrap(subject).click({ ...options, metaKey: isMac(), ctrlKey: !isMac() });
});

Cypress.Commands.add(
  "resizeFromSide",
  { prevSubject: "element" },
  (subject, side, value) => {
    return cy
      .wrap(subject)
      .realMouseDown({ position: side })
      .realMouseMove(
        { top: 0, bottom: 0, left: -1, right: 1 }[side] * value,
        { top: -1, bottom: 1, left: 0, right: 0 }[side] * value,
        { position: side }
      )
      .realMouseUp();
  }
);

const originalDispatchEvent = window.dispatchEvent;

Cypress.Screenshot.defaults({
  onBeforeScreenshot: () => {
    window.dispatchEvent = (e) => {
      console.log(
        "Ignored event dispatched during snapshot testing. That's to prevent overlays from getting closed on scroll event",
        e
      );
      return false;
    };
  },
  onAfterScreenshot: () => {
    window.dispatchEvent = originalDispatchEvent;
  },
});

Cypress.Commands.add("move", { prevSubject: "element" }, (subject, x, y) => {
  return cy
    .wrap(subject)
    .realMouseDown({ position: "center" })
    .realMouseMove(x, y, { position: "center" })
    .realMouseUp();
});

Cypress.Commands.add("isWithinViewport", { prevSubject: true }, (subject) => {
  const rect = subject[0].getBoundingClientRect();

  expect(rect.top).to.be.within(0, window.innerHeight);
  expect(rect.right).to.be.within(0, window.innerWidth);
  expect(rect.bottom).to.be.within(0, window.innerHeight);
  expect(rect.left).to.be.within(0, window.innerWidth);

  return subject;
});
