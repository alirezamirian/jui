import git from "isomorphic-git";

/**
 * A wrapper around `git.commit`, which interfaces on file updates, instead of tree oid.
 * It will iterate on the provided files and create new blobs for each one. Then it creates
 * a new tree object corresponding to the new state, which in turn is passed to git.commit.
 * This way of committing files by building the new tree directly, and without using index
 * provides more flexibility in selectively committing only some changes, and is similar to
 * how it's done in JetBrains IDEs.
 * TODO: support removing files by null as content
 */
export async function commitFiles({
  files,
  fs,
  dir,
  gitdir,
  ...options
}: Omit<Parameters<typeof git["commit"]>[0], "tree"> & {
  files: { [filePath: string]: Uint8Array };
}) {
  const headTreeOid = await git.resolveRef({ fs, dir, gitdir, ref: "HEAD" });
  const headTree = await git.readTree({
    fs,
    dir,
    gitdir,
    oid: headTreeOid,
  });
  const entries = headTree.tree;

  // Write content into blobs, and upsert respective entries with the new oids
  await Promise.all(
    Object.entries(files).map(async ([filePath, blob]) => {
      const entry = entries.find(({ path }) => path === filePath);
      const oid = await git.writeBlob({ fs, dir, gitdir, blob });
      if (entry) {
        entry.oid = oid;
      } else {
        entries.push({
          type: "blob",
          mode: "100644", // Default mode. Maybe should be input?
          oid,
          path: filePath,
        });
      }
    })
  );

  // Write the new tree into the git object database
  const newTreeOid = await git.writeTree({ fs, dir, gitdir, tree: entries });

  // Commit using the newly created tree
  const commitRef = await git.commit({
    ...options,
    fs,
    dir,
    gitdir,
    tree: newTreeOid,
  });

  // Index is not updated when committing from a custom tree. We need to reset index for each updated file.
  await Promise.all(
    Object.keys(files).map((filepath) =>
      git.resetIndex({
        fs,
        dir,
        gitdir,
        filepath,
        ref: commitRef /* Default HEAD would work too in normal cases where commit is added on HEAD, but this is more accurate */,
      })
    )
  );
}
