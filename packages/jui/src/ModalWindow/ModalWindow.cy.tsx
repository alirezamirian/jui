import React from "react";
import { composeStories } from "@storybook/react";
import * as stories from "./ModalWindow.stories";
import {
  Button,
  ModalWindow,
  WindowLayout,
  WindowManager,
} from "@intellij-platform/core";

const { Default, WithFooter } = composeStories(stories);

describe("ModalWindow", () => {
  it("works!", () => {
    cy.mount(
      <Default>
        <WindowLayout header="Dialog title" content="Content" />
      </Default>
    );
    matchImageSnapshot("ModalWindow-default");
  });

  it("it allows for navigating buttons with arrow keys", () => {
    cy.mount(
      <ModalWindow>
        <WindowLayout
          header="Dialog title"
          content="Content"
          footer={
            <WindowLayout.Footer
              right={
                <>
                  <Button autoFocus>Cancel</Button>
                  <Button variant="default">Ok</Button>
                </>
              }
            />
          }
        />
      </ModalWindow>
    );
    cy.findByRole("button", { name: "Ok" })
      .focus()
      .should("be.focused")
      .realPress("ArrowLeft");
    cy.findByRole("button", { name: "Cancel" })
      .should("be.focused")
      .realPress("ArrowLeft"); // should wrap
    cy.findByRole("button", { name: "Ok" }).should("be.focused");
  });

  it("supports resize", () => {
    const onBoundsChange = cy.stub().as("onBoundsChange");
    cy.mount(
      <Default
        defaultBounds={{ left: 100, top: 100, width: 200, height: 150 }}
        onBoundsChange={onBoundsChange}
      >
        <WindowLayout header="Window title" content=" " />
      </Default>
    );
    // Resize from left to 50px more width
    drag({ x: 100, y: 150 }, { x: 50, y: 100 });
    cy.get("@onBoundsChange")
      .should("have.been.calledOnce")
      .should("have.been.calledWith", {
        left: 50,
        top: 100,
        width: 250,
        height: 150,
      });

    // Resize from top to 50px less height
    drag({ x: 100, y: 100 }, { x: 100, y: 150 });
    cy.get("@onBoundsChange").should("have.been.calledWith", {
      left: 50,
      top: 150,
      width: 250,
      height: 100,
    });

    // Resize from right to 50px less width
    drag({ x: 300, y: 200 }, { x: 250, y: 210 });
    cy.get("@onBoundsChange").should("have.been.calledWith", {
      left: 50,
      top: 150,
      width: 200,
      height: 100,
    });

    // Resize from bottom to 50px more height
    drag({ x: 200, y: 250 }, { x: 210, y: 300 });
    cy.get("@onBoundsChange").should("have.been.calledWith", {
      left: 50,
      top: 150,
      width: 200,
      height: 150,
    });
  });

  it("supports drag header to move", () => {
    const onBoundsChange = cy.stub().as("onBoundsChange");
    cy.mount(
      <Default
        defaultBounds={{ left: 100, top: 100, width: 200, height: 150 }}
        onBoundsChange={onBoundsChange}
      >
        <WindowLayout header="title" content=" " />
      </Default>
    );
    cy.contains("title").realMouseDown({ position: { x: 10, y: 10 } });
    cy.get("body").realMouseMove(50, 50).realMouseUp();
    cy.get("@onBoundsChange").should("have.been.calledOnce");
    cy.get("@onBoundsChange").should("have.been.calledWith", {
      left: 40,
      top: 40,
      width: 200,
      height: 150,
    });
  });

  it("supports intercepting in-interaction bound changes", () => {
    // TODO
  });

  it("supports sizing the window based on the content", () => {
    cy.mount(
      <ModalWindow>
        <WindowLayout
          header="title"
          content={
            <div style={{ padding: "1rem", fontFamily: "monospace" }}>
              line 1 line 1 line 1<br />
              line 2 line 2 line 2<br />
              line 3 line 3 line 3<br />
            </div>
          }
        />
      </ModalWindow>
    );
    cy.findByRole("dialog").invoke("width").should("be.approximately", 189, 3);
    cy.findByRole("dialog").invoke("height").should("be.approximately", 101, 3);
  });

  it("supports sizing the window height based on the content, when width is set", () => {
    cy.mount(
      <ModalWindow defaultBounds={{ width: 120 }}>
        <WindowLayout
          header="title"
          content={
            <div style={{ padding: "1rem", fontFamily: "monospace" }}>
              line 1 line 1 line 1 line 1<br />
              line 2 line 2 line 2 line 2<br />
              line 3 line 3 line 3 line 3<br />
            </div>
          }
        />
      </ModalWindow>
    );
    cy.findByRole("dialog").invoke("width").should("eq", 120);
    cy.findByRole("dialog").invoke("height").should("be.approximately", 191, 3);
  });

  it("measures window size correctly, when window content suspends rendering", () => {
    let resolved = false;
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolved = true;
        resolve();
      }, 30);
    });
    function ContentThatSuspends() {
      if (resolved) {
        return <div style={{ width: 200, height: 150 }}>Content</div>;
      }
      throw promise;
    }
    cy.mount(
      <React.Suspense fallback={null}>
        <ModalWindow id="window">
          <WindowLayout header="header" content={<ContentThatSuspends />} />
        </ModalWindow>
      </React.Suspense>
    );
    cy.get("#window").invoke("width").should("eq", 200);
  });

  it("can open on top of other windows", () => {
    const Example = () => {
      const [window1Open, setWindow1Open] = React.useState(false);
      const [window2Open, setWindow2Open] = React.useState(false);

      return (
        <>
          <Button
            onPress={() => setWindow1Open(true)}
            style={{ margin: "1rem" }}
          >
            Open window 1
          </Button>
          {window1Open && (
            <ModalWindow onClose={() => setWindow1Open(false)}>
              <WindowLayout
                header="Window 1 header"
                content={
                  <>
                    <Button
                      preventFocusOnPress
                      onPress={() => setWindow2Open(true)}
                      style={{ margin: "1rem" }}
                    >
                      Open window 2
                    </Button>
                  </>
                }
              />
            </ModalWindow>
          )}

          {window2Open && (
            <ModalWindow onClose={() => setWindow2Open(false)}>
              <WindowLayout
                header="Window 2 header"
                content={
                  <>
                    Window 2 content <br /> <input style={{ width: 300 }} />
                  </>
                }
              />
            </ModalWindow>
          )}
        </>
      );
    };
    cy.mount(
      <WindowManager>
        <Example />
      </WindowManager>
    );
    cy.contains("Open window 1").click();
    cy.contains("Open window 2").click();
    cy.get("input").should("be.focused").realType("abc");
    cy.get("input").should("have.value", "abc");
  });
});

function drag(from: { x: number; y: number }, to: { x: number; y: number }) {
  cy.get("body")
    .realMouseDown({ position: from })
    .realMouseMove(to.x, to.y)
    .realMouseUp({ position: to });
}

function matchImageSnapshot(snapshotsName: string) {
  cy.get("[aria-busy=true]").should("not.exist");
  cy.percySnapshot(snapshotsName);
}
