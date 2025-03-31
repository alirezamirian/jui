import { addRemote, dir, file, gitInit } from "../../support/example-app";

// NOTE: Different expectations are intentionally bundled to minimize the number of test cases for performance
// reasons, since each e2e test has the overhead of loading the app, which takes a few seconds.

describe("push window", () => {
  it("opens by invoking push action, and works as expected", () => {
    cy.initialization(gitInit());
    cy.section("Open Push Dialog");
    cy.searchAndInvokeAction("push");
    cy.findByRole("dialog", { name: /Push commits/ });
    cy.section("Check push tree nodes");
    // It should be 2, because the content outside a modal window should be inaccessible.
    // But project tree nodes are also found.
    cy.findAllByRole("treeitem").should("have.length", 3); // Known issue.

    cy.section("Add a remote");
    cy.findByRole("button", { name: "Push" }).should("be.disabled");
    repoNode().should("be.focused");
    repoNode().contains("Define remote").click();
    cy.findByRole("dialog", { name: /Define Remote/i });
    cy.findByRole("textbox", { name: /Name/i }).should("have.value", "origin");
    cy.findByRole("textbox", { name: /URL/i })
      .should("be.focused")
      .type("http://localhost:8174/empty-repo.git{enter}");
    repoNode()
      .click() // FIXME: for some reason focus doesn't come back here. It didn't seem reproducible in a real interaction
      .should("be.focused")
      .should("contain.text", "master")
      .should("contain.text", "origin : master")
      .should("contain.text", "New")
      .should("be.focused");
    cy.findByRole("treeitem", { name: "initial empty commit" });
    cy.findByRole("button", { name: "Push" }).should("be.enabled");

    cy.section("Change target branch");
    cy.findByRole("link", { name: "master" }).click();
    cy.realType("another-branch{enter}");
    repoNode()
      .should("contain.text", "origin : another-branch")
      .should("contain.text", "New")
      .should("be.focused"); // the tree node should regain the focus after the renaming is done

    cy.section("Add another remote");
    repoNode().contains("origin").click();
    cy.findByRole("menuitem", { name: "origin" }); // the first remote should exist
    cy.findByRole("menuitem", { name: "Define remote" }).click();
    cy.findByRole("dialog", { name: /Define Remote/i });
    cy.findByRole("textbox", { name: /Name/i })
      .should("have.value", "") // in the original impl, it wrongly has "origin" value, at the time of writing this
      .should("be.focused")
      .type("second-remote");
    cy.findByRole("textbox", { name: /URL/i }).type(
      "http://localhost:8174/example-branches.git{enter}"
    );

    cy.section("Change remote");
    repoNode()
      .findByRole("link", { name: /second-remote/ })
      .click();
    cy.findByRole("menuitem", { name: "origin" }).click();
    repoNode().should("contain.text", "origin").should("be.focused");

    function repoNode() {
      // The next lines dialog selector could be removed when the issue with of outside content being accessible is fixed.
      return cy
        .findByRole("dialog", { name: /Push commits/ })
        .findAllByRole("treeitem")
        .first();
    }
  });

  it("supports multiple repos", () => {
    cy.initialization(
      file(
        ".idea/vcs.xml",
        `<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="VcsDirectoryMappings">
      <mapping directory="/workspace/repo1" vcs="Git"></mapping>
      <mapping directory="/workspace/repo2" vcs="Git"></mapping>
    </component>
</project>`
      ),
      dir("repo1", [
        file("repo1-file"),
        gitInit(
          addRemote("origin", "https://mock-remote"),
          addRemote("second-remote", "https://mock-remote-2")
        ),
      ]),
      dir("repo2", [
        file("repo2-file"),
        gitInit(
          addRemote("origin", "https://mock-remote"),
          addRemote("second-remote", "https://mock-remote-2")
        ),
      ])
    );
    cy.section("open push window when repo1-file is open");
    cy.findTreeNodeInProjectView("repo1-file").dblclick(); // make sure repo1-file is opened
    cy.searchAndInvokeAction("push");
    cy.findByRole("dialog", { name: /Push commits/ })
      .findAllByRole("treeitem", { selected: true })
      .should("have.length", 1)
      .should("contain.text", "repo1")
      .findByRole("checkbox", { checked: true });
    cy.findByRole("dialog", { name: /Push commits/ })
      .findAllByRole("tree")
      .findAllByRole("checkbox", { checked: true })
      .should("have.length", 1);

    cy.section("Close Push Dialog");
    cy.findByRole("button", { name: "Cancel" }).click();

    cy.section("open push window when repo2-file is open");
    cy.findTreeNodeInProjectView("repo2-file").dblclick(); // make sure repo1-file is opened
    cy.searchAndInvokeAction("push");
    cy.findByRole("dialog", { name: /Push commits/ })
      .findAllByRole("treeitem", { selected: true })
      .should("have.length", 1)
      .should("contain.text", "repo2")
      .findByRole("checkbox", { checked: true });
    cy.findByRole("dialog", { name: /Push commits/ })
      .findAllByRole("tree")
      .findAllByRole("checkbox", { checked: true });

    cy.section("testing focus when toggling repo inclusion");
    cy.findByRole("dialog", { name: /Push commits/ })
      .findAllByRole("tree")
      .findAllByRole("checkbox", { checked: true })
      .should("have.length", 1)
      .realClick() // toggle off
      .realPress("Space") // toggle on
      .realPress("ArrowUp"); // moving focus one node up.
    cy.findByRole("dialog", { name: /Push commits/ })
      .findAllByRole("treeitem")
      .eq(1)
      .should("be.focused");
  });
});

describe("push action", () => {
  it("is disabled when there is no repo", () => {
    cy.initialization();
    cy.searchAndInvokeAction({
      actionName: "push",
      disabled: true,
    });
    cy.findByRole("dialog", { name: /Push commits/ }).should("not.exist");
  });
});

describe("push to github", () => {
  it("prompts for access token and fails or succeeds depending on token validity", () => {
    cy.initialization(
      gitInit(addRemote("origin", "https://github.com/testuser/mock-repo"))
    );
    mockPushEndpoints({
      remoteUrl: "https://github.com/testuser/mock-repo",
      auth: true,
    });

    cy.section("Invalid token");
    cy.searchAndInvokeAction("push");
    cy.findByRole("button", { name: /Push/i }).click();
    cy.findByLabelText(/Token/i).type("wrong token{enter}");
    cy.contains("Push failed");
    cy.contains(/remote: .* Authentication failed/);

    cy.section("Valid token");
    cy.findByRole("treeitem", { name: /Workspace/i }).click(); // FIXME: this should not be needed. Fix the focus issue
    cy.searchAndInvokeAction("push");
    cy.findByRole("button", { name: /Push/i }).click();
    cy.findByLabelText(/Token/i).type("testpassword{enter}");
    cy.contains("Pushed master to new branch origin/master");
  });
});

describe("push to unknown git servers", () => {
  it("Pushes without prompting for credentials if the server doesn't require it", () => {
    cy.initialization(
      // yarn run e2e:git-server:start in example-app to run mock git server
      gitInit(addRemote("origin", "http://localhost:8174/empty-repo.git"))
    );
    cy.section("Invalid credential");
    cy.searchAndInvokeAction("push");
    cy.findByRole("button", { name: /Push/i }).click();
    cy.contains("Pushed master to new branch origin/master");
  });

  it("prompts for access token and succeeds or fails depending on the credential's validity", () => {
    cy.initialization(
      gitInit(
        // yarn run e2e:git-server:start in example-app to run mock git server
        addRemote("origin", "http://localhost:8174/empty-repo-with-auth.git")
      )
    );
    cy.section("Invalid credential");
    cy.searchAndInvokeAction("push");
    cy.findByRole("button", { name: /Push/i }).click();
    cy.findByLabelText(/Username/i).type("wrong username");
    cy.findByLabelText(/Password/i).type("wrong password{enter}");
    cy.contains("Push failed");
    cy.contains(/remote: .* Authentication failed/);
    cy.findByRole("treeitem", { name: /Workspace/i }).click(); // FIXME: this should not be needed. Fix the focus issue

    cy.section("Valid credential");
    cy.searchAndInvokeAction("push");
    cy.findByRole("treeitem", { name: "initial empty commit" });
    cy.findByRole("button", { name: /Push/i }).click();
    cy.findByLabelText(/Username/i).type("testuser");
    cy.findByLabelText(/Password/i).type("testpassword{enter}");
    cy.contains("Pushed master to new branch origin/master");

    cy.section("Check push dialog state is up-to-date");
    cy.searchAndInvokeAction("push");
    cy.findByRole("dialog", { name: /Push commits/ });
    cy.findByRole("treeitem", { name: "initial empty commit" }).should(
      "not.exist"
    );
    cy.findByRole("treeitem", { name: /master/ }).should(
      "not.contain.text",
      "new"
    );
  });
});

function mockPushEndpoints({
  remoteUrl,
  auth,
}: {
  /**
   * Remote URL without a trailing slash
   */
  remoteUrl: string;
  auth?: boolean;
}) {
  // yarn run e2e:git-server:start in example-app to run mock git server
  const url = `http://localhost:8174/empty-repo${auth ? "-with-auth" : ""}.git`;
  cy.intercept("POST", `${remoteUrl}/git-receive-pack`, (req) => {
    req.url = `${url}/git-receive-pack`;
  });
  cy.intercept(
    "GET",
    `${remoteUrl}/info/refs?service=git-receive-pack`,
    (req) => {
      req.url = `${url}/info/refs?service=git-receive-pack`;
    }
  );
}
