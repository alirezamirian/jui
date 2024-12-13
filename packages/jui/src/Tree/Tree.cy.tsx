import { composeStories } from "@storybook/react";
import * as React from "react";
import * as stories from "./Tree.stories";
import { isMac } from "@react-aria/utils";
import { Tree, TreeProps } from "./Tree";
import { Item } from "../Collections";

const { Static, ScrollAndContainerWidth } = composeStories(stories);

describe("Tree", () => {
  it("expands/collapses and navigates nodes by arrow keys", () => {
    cy.mount(
      <Tree selectionMode="multiple">
        <Item title="node 1">
          <Item>node 1.1</Item>
          <Item>node 1.2</Item>
        </Item>
      </Tree>
    );

    cy.findByRole("treeitem") // only one should be visible initially
      .click() // focus
      .realPress("ArrowRight");
    // node 1 should be expanded
    cy.findByRole("treeitem", { name: "node 1.1" });
    cy.findByRole("treeitem", { name: "node 1.2" });
    // but selection doesn't go to the children right away
    cy.findByRole("treeitem", { name: "node 1", selected: true });
    cy.realPress("ArrowDown");
    cy.findByRole("treeitem", { name: "node 1.1", selected: true });
    cy.realPress("ArrowDown");
    cy.findByRole("treeitem", { name: "node 1.2", selected: true });
    cy.realPress("ArrowLeft"); // selection should move to node 1 but it remains expanded
    cy.findByRole("treeitem", { name: "node 1", selected: true });
    cy.realPress("ArrowLeft"); // the second ArrowLeft closes the node
    cy.findAllByRole("treeitem").should("have.length", 1);

    cy.realPress("ArrowRight"); // expanding the node again and going down with ArrowRight this time
    cy.findByRole("treeitem", { name: "node 1", selected: true });
    cy.realPress("ArrowRight");
    cy.findByRole("treeitem", { name: "node 1.1", selected: true });
    cy.realPress("ArrowRight");
    cy.findByRole("treeitem", { name: "node 1.2", selected: true });
  });

  it("opens nested expandable single-child items", () => {
    cy.mount(<Static />);

    cy.contains("Foo").click().type("{enter}");
    cy.findByRole("treeitem", { name: "FooBar" });
    matchImageSnapshot("Tree-nested-single-child-expansion");
  });

  it("sets the right accessibility roles", () => {
    cy.mount(
      <Tree>
        <Item>node 1</Item>
        <Item>node 2</Item>
      </Tree>
    );

    cy.findByRole("tree");
    cy.findAllByRole("treeitem").should("have.length", 2);
  });

  it("collapses descendant items of a node that is collapsed", () => {
    cy.mount(<Static />);

    cy.contains("List") // "List" item is expanded by default and has expanded children
      .click() // select it
      .type("{enter}") // collapse it
      .type("{enter}"); // collapse expand it. Initially expanded children should now be collapsed
    matchImageSnapshot("Tree-children-collapsed-when-parent-collapsed");
  });

  it('focuses and selects the first item, when autofocus is "first"', () => {
    cy.mount(
      <Tree autoFocus="first" selectionMode="single">
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Tree>
    );
    cy.findAllByRole("treeitem")
      .first()
      .should("have.focus")
      .should("be.selected");
  });

  /**
   * This test makes sure virtualization doesn't affect content width. It's relevant because when virtualization is used
   * items are usually rendered inside absolutely positioned elements, where the width should explicitly be set,
   * instead of implicitly determined based on the content.
   */
  it.skip("takes the necessary width based on the visible item's content", () => {
    // FIXME: the snapshot testing in this case turns out to be too flaky.
    //  Needs more investigation as to why it's flaky, because in real user interactions it doesn't seem to be buggy.
    cy.mount(<ScrollAndContainerWidth />).then(({ rerender }) => {
      cy.get("[data-testid=tree]").should(notBeHorizontallyScrollable);
      cy.get("[data-testid=tree]").scrollTo(0, 230);
      cy.get("[data-testid=tree]").should(beHorizontallyScrollable);
      cy.get("[data-testid=tree]").scrollTo("right");
      matchImageSnapshot("Tree-horizontal-scrolled-midway");
      cy.get("[data-testid=tree]").scrollTo("bottom");
      matchImageSnapshot("Tree-horizontal-scrolled-all-the-way");
      cy.get("[data-testid=tree]").scrollTo("top", { duration: 100 });
      cy.get("[data-testid=tree]").should(notBeHorizontallyScrollable);
      rerender(<ScrollAndContainerWidth width={200} />);
      cy.get("[data-testid=tree]").should(beHorizontallyScrollable);
      rerender(<ScrollAndContainerWidth width={300} />);
      cy.get("[data-testid=tree]").should(notBeHorizontallyScrollable);
      matchImageSnapshot("Tree-horizontal-scrolled-resized");
    });
  });

  it("calls onAction for leaves on click or Enter", () => {
    const onAction = cy.stub().as("onAction");
    cy.mount(<Static onAction={onAction} />);

    cy.findByRole("treeitem", { name: "index.ts" }).dblclick();
    cy.get("@onAction").should("be.calledOnceWith", "index.ts");
    cy.findByRole("treeitem", { name: "index.ts" }).type("{enter}");
    cy.get("@onAction").should("be.calledTwice");
  });

  it("doesn't select all when more modifiers than 'cmd' (or 'ctrl' on windows) are pressed", () => {
    cy.mount(<Static />);
    const modifier = isMac() ? "Meta" : "Control";
    cy.findAllByRole("treeitem").first().click();
    cy.findAllByRole("treeitem", { selected: true }).should("have.length", 1);
    cy.realPress([modifier, "Shift", "a"]);
    cy.findAllByRole("treeitem", { selected: true }).should("have.length", 1);
    cy.realPress([modifier, "Alt", "a"]);
    cy.findByRole("treeitem", { selected: true }).should("have.length", 1);
    cy.realPress([modifier, "a"]);
    cy.findAllByRole("treeitem", { selected: true }).should("have.length", 12);
  });

  type ExampleTreeNode = { name: string; children?: ExampleTreeNode[] };
  const tree = ({
    items,
    ...props
  }: { items: ExampleTreeNode[] } & Omit<
    TreeProps<ExampleTreeNode>,
    "children" | "selectionMode" | "items"
  >) => (
    <Tree selectionMode="multiple" key="example" items={items} {...props}>
      {(item) => (
        <Item key={item.name} childItems={item.children}>
          {item.name}
        </Item>
      )}
    </Tree>
  );

  it("handles keyboard events when the tree is focused, but no item is", () => {
    cy.mount(
      tree({
        items: [{ name: "node 1" }, { name: "node 2" }, { name: "node 3" }],
      })
    ).then(({ rerender }) => {
      cy.findByRole("treeitem", { name: "node 2" }).realClick();
      cy.findByRole("treeitem", { name: "node 2" }).should("be.focused");
      rerender(tree({ items: [{ name: "node 1" }, { name: "node 3" }] }));
      cy.findByRole("tree").should("be.focused"); // when node is removed, focus is moved to the container
      cy.realPress("ArrowDown");
      cy.focused().should("have.attr", "role", "treeitem");
    });
  });

  describe("moving selection up when selected node is removed", () => {
    it("moves selection to the parent when selected node is removed", () => {
      cy.mount(
        tree({
          items: [
            { name: "node 1" },
            { name: "node 2", children: [{ name: "node 2.1" }] },
            { name: "node 3" },
          ],
          defaultExpandedKeys: ["node 2"],
          defaultSelectedKeys: ["node 2.1"],
        })
      ).then(({ rerender }) => {
        rerender(
          tree({
            items: [{ name: "node 1" }, { name: "node 2" }, { name: "node 3" }],
          })
        );
        cy.findByRole("treeitem", { name: "node 2", selected: true });
      });
    });

    it("moves selection to the parent when multiple selected nodes of the same parent are is removed", () => {
      cy.mount(
        tree({
          items: [
            { name: "node 1" },
            {
              name: "node 2",
              children: [{ name: "node 2.1" }, { name: "node 2.2" }],
            },
            { name: "node 3" },
          ],
          defaultExpandedKeys: ["node 2"],
          defaultSelectedKeys: ["node 2.1", "node 2.2"],
        })
      ).then(({ rerender }) => {
        rerender(
          tree({
            items: [{ name: "node 1" }, { name: "node 2" }, { name: "node 3" }],
          })
        );
        cy.findByRole("treeitem", { name: "node 2", selected: true });
      });
    });

    it("moves selection to the first non-removed parent when selected node is removed", () => {
      cy.mount(
        tree({
          items: [
            { name: "node 1" },
            {
              name: "node 2",
              children: [
                { name: "node 2.1", children: [{ name: "node 2.1.1" }] },
              ],
            },
            { name: "node 3" },
          ],
          defaultExpandedKeys: ["node 2", "node 2.1"],
          defaultSelectedKeys: ["node 2.1.1"],
        })
      ).then(({ rerender }) => {
        rerender(
          tree({
            items: [{ name: "node 1" }, { name: "node 2" }, { name: "node 3" }],
          })
        );
        cy.findByRole("treeitem", { name: "node 2", selected: true });
      });
    });

    it("doesn't change selection when the removed node wasn't the only selected node", () => {
      cy.mount(
        tree({
          items: [
            { name: "node 1" },
            { name: "node 2", children: [{ name: "node 2.1" }] },
            { name: "node 3" },
          ],
          defaultExpandedKeys: ["node 2"],
          defaultSelectedKeys: ["node 2.1", "node 3"],
        })
      ).then(({ rerender }) => {
        rerender(
          tree({
            items: [{ name: "node 1" }, { name: "node 2" }, { name: "node 3" }],
          })
        );
        cy.findByRole("treeitem", { name: "node 3", selected: true });
        cy.findByRole("treeitem", { name: "node 2", selected: false });
      });
    });
  });
});

const notBeHorizontallyScrollable = ($el: Cypress.JQueryWithSelector) => {
  const el = $el.get(0);
  expect(el.scrollWidth).not.to.be.above(
    el.offsetWidth,
    "tree is not scrollable"
  );
};
const beHorizontallyScrollable = ($el: Cypress.JQueryWithSelector) => {
  const el = $el.get(0);
  expect(el.scrollWidth).to.be.above(el.offsetWidth, "tree is scrollable");
};

function matchImageSnapshot(snapshotsName: string) {
  cy.get("[aria-busy=true]").should("not.exist");
  cy.percySnapshot(snapshotsName);
}
