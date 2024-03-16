import { DirectoryNode, createGroupByDirectory } from "./groupByDirectory";
import { ChangeNode } from "../VersionControl/Changes/ChangesTree/ChangeTreeNode";
import { readFileSync } from "fs";
import { performance } from "perf_hooks";
import { Change } from "../VersionControl/Changes/Change";

const change = (path: string): ChangeNode => ({
  key: path,
  type: "change",
  change: {
    after: {
      path,
      isDir: false,
      content(): Promise<string> {
        throw new Error("Not implemented");
      },
    },
    before: {
      path,
      isDir: false,
      content(): Promise<string> {
        throw new Error("Not implemented");
      },
    },
  },
  showPath: false,
});

const groupByDirectory = createGroupByDirectory<ChangeNode, DirectoryNode>({
  getPath: (node) => Change.path(node.change),
});

const groupByDirectoryMergingPaths = createGroupByDirectory<
  ChangeNode,
  DirectoryNode
>({
  getPath: (node) => Change.path(node.change),
  shouldCollapseDirectories: true,
});

describe("groupByDirectory", () => {
  it("groups by directory", () => {
    const y = change("/a/c/y.js");
    const x = change("/a/b/x.js");
    const groups = groupByDirectory([x, y]);
    expect(groups).toMatchObject([
      {
        dirPath: "/a",
        parentNodePath: "",
        children: expect.arrayContaining([
          expect.objectContaining({
            dirPath: "/a/b",
            parentNodePath: "/a",
            children: [x],
          }),
          expect.objectContaining({
            dirPath: "/a/c",
            parentNodePath: "/a",
            children: [y],
          }),
        ]),
      },
    ]);
  });

  it("merges directories all the way through", () => {
    const x = change("/a/b/c/d/x.js");
    const groups = groupByDirectoryMergingPaths([x]);
    expect(groups).toMatchObject([
      {
        dirPath: "/a/b/c/d",
        parentNodePath: "",
        children: [x],
      },
    ]);
  });

  it("merges directories when possible", () => {
    const x = change("/a/b/bc/h/g/x.js");
    const u = change("/e/f/g/u.js");
    const y = change("/a/b/bc/d/y.js");
    const z = change("/a/z.js");
    const groups = groupByDirectoryMergingPaths([x, u, y, z]);
    expect(groups).toMatchObject([
      {
        dirPath: "/a",
        parentNodePath: "",
        children: expect.arrayContaining([
          z,
          expect.objectContaining({
            dirPath: "/a/b/bc",
            parentNodePath: "/a",
            children: expect.arrayContaining([
              expect.objectContaining({
                dirPath: "/a/b/bc/d",
                parentNodePath: "/a/b/bc",
                children: [y],
              }),
              expect.objectContaining({
                dirPath: "/a/b/bc/h/g",
                parentNodePath: "/a/b/bc",
                children: [x],
              }),
            ]),
          }),
        ]),
      },
      {
        dirPath: "/e/f/g",
        parentNodePath: "",
        children: [u],
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
      4 /* Some empirical calibration factor*/ * timeFor50 * 100
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
