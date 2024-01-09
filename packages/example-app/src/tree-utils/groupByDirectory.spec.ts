import { groupByDirectory } from "./groupByDirectory";
import { ChangeNode } from "../VersionControl/Changes/ChangesView/change-view-nodes";
import { readFileSync } from "fs";
import { performance } from "perf_hooks";

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

  it("is ~O(N) performant" /* experimental performance testing */, () => {
    const changeNodes = readFileSync(
      // eslint-disable-next-line no-undef
      __dirname + "/groupByDirectory.spec.fixture.txt",
      { encoding: "utf-8" }
    )
      .split("\n")
      .filter(Boolean)
      .map(change);

    const relativePerformanceMeasure =
      measureTime(() => {
        Array(10000)
          .fill(null)
          .map((_, i) => Math.sqrt(i));
      }) * 50;
    const timeFor50 = measureTime(() =>
      groupByDirectory(changeNodes.slice(0, 10))
    );
    const timeFor5_000 = measureTime(() => groupByDirectory(changeNodes));
    expect(timeFor5_000).toBeLessThan(
      3 /* Some empirical calibration factor*/ * timeFor50 * 100
    );

    expect(timeFor5_000).toBeLessThan(relativePerformanceMeasure);

    function measureTime(fn: () => void) {
      const start = performance.now();
      fn();
      const end = performance.now();
      return end - start;
    }
  });
});
