import { findRootPaths } from "./path-utils";

describe(findRootPaths, () => {
  it("works with string array input", () => {
    expect(
      findRootPaths([
        "/a/b/c/x.txt",
        "/a/b",
        "/a/b/c",
        "/a/b/y.ts",
        "/d/e/f/z.u",
      ])
    ).toEqual(["/a/b", "/d/e/f/z.u"]);
  });
  it("works with arbitrary objects", () => {
    expect(
      findRootPaths(
        ["/a/b/c/x.txt", "/a/b", "/a/b/c", "/a/b/y.ts", "/d/e/f/z.u"].map(
          (p) => ({ p })
        ),
        (i) => i.p
      )
    ).toEqual([{ p: "/a/b" }, { p: "/d/e/f/z.u" }]);
  });
});
