import git from "isomorphic-git";

/**
 * A wrapper around `git.commit`, which interfaces on file updates, instead of tree oid.
 * It will iterate on the provided files and create new blobs for each one. Then it creates
 * a new tree object corresponding to the new state, which in turn is passed to git.commit.
 * This way of committing files by building the new tree directly, and without using index
 * provides more flexibility in selectively committing only some changes, and is similar to
 * how it's done in JetBrains IDEs.
 */
export async function commitFiles({
  updates,
  fs,
  dir,
  gitdir,
  ...options
}: Omit<Parameters<typeof git["commit"]>[0], "tree"> & {
  /**
   * A mapping from file paths to either:
   * - the new content of the file that should be committed, in form of a Uint8Array blob
   * - null, indicating the files should be removed
   */
  updates: { [filePath: string]: Uint8Array | null };
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
    Object.entries(updates).map(async ([filePath, blob]) => {
      const index = entries.findIndex(({ path }) => path === filePath);
      if (blob == null) {
        // null indicates removed file
        if (index > -1) {
          entries.splice(index, 1);
        }
        return;
      }
      const entry = entries[index];
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
    Object.keys(updates).map((filepath) =>
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
