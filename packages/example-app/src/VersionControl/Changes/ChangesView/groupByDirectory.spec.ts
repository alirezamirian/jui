import { groupByDirectory } from "./groupByDirectory";
import { ChangeNode } from "./change-view-nodes";

const change = (path: string): ChangeNode => ({
  key: path,
  type: "change",
  change: {
    after: { path, isDir: false },
    before: { path, isDir: false },
  },
});

describe("groupByDirectory", () => {
  it("groups by directory", () => {
    const groups = groupByDirectory([change("/a/b/x.js"), change("/a/c/y.js")]);
    expect(groups).toMatchObject([
      {
        dirPath: "/a",
        parentNodePath: "",
        children: expect.arrayContaining([
          expect.objectContaining({
            dirPath: "/a/b",
            parentNodePath: "/a",
            children: [change("/a/b/x.js")],
          }),
          expect.objectContaining({
            dirPath: "/a/c",
            parentNodePath: "/a",
            children: [change("/a/c/y.js")],
          }),
        ]),
      },
    ]);
  });

  it("merges directories all the way through", () => {
    const groups = groupByDirectory([change("/a/b/c/d/x.js")]);
    expect(groups).toMatchObject([
      {
        dirPath: "/a/b/c/d",
        parentNodePath: "",
        children: [change("/a/b/c/d/x.js")],
      },
    ]);
  });

  it("merges directories when possible", () => {
    const groups = groupByDirectory([
      change("/a/b/bc/h/g/x.js"),
      change("/e/f/g/u.js"),
      change("/a/b/bc/d/y.js"),
      change("/a/z.js"),
    ]);
    expect(groups).toMatchObject([
      {
        dirPath: "/a",
        parentNodePath: "",
        children: expect.arrayContaining([
          change("/a/z.js"),
          expect.objectContaining({
            dirPath: "/a/b/bc",
            parentNodePath: "/a",
            children: expect.arrayContaining([
              expect.objectContaining({
                dirPath: "/a/b/bc/d",
                parentNodePath: "/a/b/bc",
                children: [change("/a/b/bc/d/y.js")],
              }),
              expect.objectContaining({
                dirPath: "/a/b/bc/h/g",
                parentNodePath: "/a/b/bc",
                children: [change("/a/b/bc/h/g/x.js")],
              }),
            ]),
          }),
        ]),
      },
      {
        dirPath: "/e/f/g",
        parentNodePath: "",
        children: [change("/e/f/g/u.js")],
      },
    ]);
  });
});
