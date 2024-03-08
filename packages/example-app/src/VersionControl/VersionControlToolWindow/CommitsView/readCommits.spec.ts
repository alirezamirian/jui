import * as fs from "fs";
import path from "path";

import { readCommits } from "./readCommits";

const repoPath = path.resolve(
  // eslint-disable-next-line no-undef
  __dirname,
  "./_fixture_readCommits/example-branches.git"
);

describe("readCommits", () => {
  it("works for a single branch of a single repo", async () => {
    const result = await readCommits(fs, {
      repoPath,
      isBare: true,
      refs: ["master"],
    });
    expect(result).toHaveLength(12);
    expect(result.map(({ readCommitResult: { oid } }) => oid)).toEqual([
      "14d63f8c757e52f7e60e13765031a7fdf0768195",
      "18c380ebf2b05773262e576946349d5d6deaa18a",
      "5b1b99986a0096c774f26a4917dbad0ac31d2d26",
      "5de4412a5f70cb9974f120936157e4ef81329a18",
      "cc98a1381cf83c59c8309f1ac6be3d0c52f859f6",
      "758af8ed2e58709512e95c4293abc6cf7395c6d7",
      "aac9e379d0961d15bd969887d9d4c74952f3fce1",
      "daf0079ed765c7fe3fe883fe060ab0f712d54ac6",
      "43210db57607e3655c6259e8a395083335510a5c",
      "2f3f4cd3e46893112aa5b7e45526da76b2fea0ce",
      "ec7309b0e116b85bc052424f63cbda882f88ce77",
      "f0eb272cc8f77803478c6748103a1450aa1abd37",
    ]);
  });

  it("works for multiple branches of a single repo", async () => {
    const result = await readCommits(fs, {
      repoPath,
      isBare: true,
      refs: ["master", "topic1", "topic2"],
    });
    expect(result).toHaveLength(15);
    expect(result.map(({ readCommitResult: { oid } }) => oid)).toEqual([
      "14d63f8c757e52f7e60e13765031a7fdf0768195",
      "18c380ebf2b05773262e576946349d5d6deaa18a",
      "5b1b99986a0096c774f26a4917dbad0ac31d2d26",
      "5de4412a5f70cb9974f120936157e4ef81329a18",
      "cc98a1381cf83c59c8309f1ac6be3d0c52f859f6",
      "758af8ed2e58709512e95c4293abc6cf7395c6d7",
      "d5ed0e6a098710ad9dfe08bc7039fc6e61d00fa3",
      "ca60ac707b05a28d54c4191022dacfb940305efc",
      "5086927860395c3a173df36eabe9f2525c357bc2",
      "aac9e379d0961d15bd969887d9d4c74952f3fce1",
      "daf0079ed765c7fe3fe883fe060ab0f712d54ac6",
      "43210db57607e3655c6259e8a395083335510a5c",
      "2f3f4cd3e46893112aa5b7e45526da76b2fea0ce",
      "ec7309b0e116b85bc052424f63cbda882f88ce77",
      "f0eb272cc8f77803478c6748103a1450aa1abd37",
    ]);
  });

  it("includes all refs for commits that exist in multiple branches", async () => {
    const result = await readCommits(fs, {
      repoPath,
      isBare: true,
      refs: ["topic1", "topic2"],
    });
    expect(
      result.filter(({ containingRefs }) => containingRefs.has("topic2"))
    ).toHaveLength(9);
    expect(
      result.map(({ containingRefs }) => containingRefs.has("topic1"))
    ).toEqual([false, false, true, true, true, true, true, true, true]);
  });

  it("includes all refs for commits that exist in multiple branches (more complex)", async () => {
    const almostAllBranches = new Set([
      "HEAD",
      "master",
      "RC1.0",
      "enhancement",
      "featureGreen",
      "featureRed",
      "topic1",
      "topic2",
    ]);

    const result = await readCommits(fs, {
      repoPath,
      isBare: true,
      refs: [...almostAllBranches, "gh-pages"],
    });

    expect(result.map(({ containingRefs }) => containingRefs)).toEqual([
      new Set(["HEAD", "master"]),
      new Set(["HEAD", "master"]),
      new Set(["enhancement"]),
      new Set(["enhancement"]),
      new Set(["featureGreen"]),
      new Set(["featureGreen"]),
      new Set(["featureGreen"]),
      new Set(["featureGreen"]),
      new Set(["featureGreen"]),
      new Set(["RC1.0", "HEAD", "master", "enhancement", "featureGreen"]),
      new Set(["featureRed"]),
      new Set(["RC1.0", "HEAD", "master", "enhancement", "featureGreen"]),
      new Set(["gh-pages"]),
      new Set([
        "RC1.0",
        "HEAD",
        "master",
        "enhancement",
        "featureGreen",
        "featureRed",
      ]),
      new Set([
        "RC1.0",
        "HEAD",
        "master",
        "enhancement",
        "featureGreen",
        "featureRed",
      ]),
      new Set(["topic2"]),
      new Set(["topic2"]),
      new Set(["topic1", "topic2"]),
      almostAllBranches,
      almostAllBranches,
      almostAllBranches,
      almostAllBranches,
      almostAllBranches,
      almostAllBranches,
    ]);
  });

  it("creates unique sets of refs", async () => {
    const result = await readCommits(fs, {
      repoPath,
      isBare: true,
      refs: ["topic1", "topic2"],
    });
    expect(new Set(result.map(({ containingRefs }) => containingRefs)).size)
      // It can actually be 2 in this case, but it's three because ["topic1", "topic2"] and
      // ["topic2", "topic1"] are created twice.
      .toBeLessThanOrEqual(3);
  });
});
