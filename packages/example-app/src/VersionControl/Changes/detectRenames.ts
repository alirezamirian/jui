import { diffLines } from "diff";
import { AdditionChange, AnyChange, Change, DeletionChange } from "./Change";

// Read more: https://www.git-scm.com/docs/git-diff/2.6.7#:~:text=The-,similarity%20index,-is%20the%20percentage
const DEFAULT_SIMILARITY_INDEX = 50;

/**
 * Given a list of changes, detects renames based on the change in the content of changes where only `before` or
 * `after` is present, and consolidates them into one change, making it count as a rename.
 * @param changes
 */
export async function detectRenames(
  changes: ReadonlyArray<AnyChange>
): Promise<AnyChange[]> {
  return detectRenamesBasedOnContent(detectRenamesBasedOnHash(changes));
}

function detectRenamesBasedOnHash(
  changes: ReadonlyArray<AnyChange>
): AnyChange[] {
  const deletions = changes.filter(Change.isDeletion);
  const additions = changes.filter(Change.isAddition);

  return mergeRenames(
    new Map<DeletionChange, { to: AdditionChange }>(
      deletions
        .map((deletion) => {
          const match = additions.find(
            ({ after: { hash } }) => hash === deletion.before.hash
          );
          if (match) {
            return [deletion, { to: match }] as const;
          }
          return null;
        })
        .filter((i) => i != null)
    ),
    changes
  );
}

async function detectRenamesBasedOnContent(
  changes: ReadonlyArray<AnyChange>
): Promise<AnyChange[]> {
  const deletions = changes.filter(Change.isDeletion);
  const additions = changes.filter(Change.isAddition);

  const contents = new Map<AnyChange, string>();
  const getContent = async (change: AnyChange): Promise<string> => {
    if (!contents.get(change)) {
      contents.set(change, await Change.content(change));
    }
    return contents.get(change) ?? "";
  };
  const renameMapping = new Map<
    DeletionChange,
    { similarity: number; to: AdditionChange }
  >();
  await Promise.all(
    deletions.map(async (deletion) => {
      return Promise.all(
        additions.map(async (addition) => {
          const similarity = await computeSimilarity(
            await getContent(deletion),
            await getContent(addition)
          );
          const currentCandidate = renameMapping.get(deletion);
          if (
            similarity >= DEFAULT_SIMILARITY_INDEX &&
            (!currentCandidate || similarity > currentCandidate.similarity)
          ) {
            renameMapping.set(deletion, { similarity, to: addition });
          }
        })
      );
    })
  );
  return mergeRenames(renameMapping, changes);
}

function mergeRenames(
  renameMapping: Map<DeletionChange, { to: AdditionChange }>,
  changes: ReadonlyArray<AnyChange>
) {
  const renamedChanges: AnyChange[] = [...renameMapping.values()].map(
    (rename) => rename.to
  );
  return changes
    .map((change) => {
      if (Change.isDeletion(change)) {
        const candidate = renameMapping.get(change);
        if (candidate) {
          return Change(change.before, candidate?.to.after);
        }
      }
      return change;
    })
    .filter((change) => !renamedChanges.includes(change));
}

/**
 * Computes similarity to two strings (typically file contents), and returns a similarity score,
 * similar to [git's similarity index](https://www.git-scm.com/docs/git-diff/2.6.7#:~:text=The-,similarity%20index,-is%20the%20percentage)
 * based on diff computed on a line basis.
 *
 * Note on performance:
 * diff computation can be quite heavy, so it's at least made async not to block the main thread. Further improvement
 * could be moving it to a worker thread.
 * Several alternatives are tested with no luck:
 * - fast-diff: It turned out to be much slower than diff
 * - fast-myers-diff: doesn't seem to support line diffing, or maybe it does but it wasn't straightforward, so skipped it.
 * - detect-rename: too slow!
 */
async function computeSimilarity(file1Content: string, file2Content: string) {
  return new Promise<number>((resolve, reject) => {
    diffLines(file1Content, file2Content, (err, value = []) => {
      if (err) {
        return reject(err);
      }
      const { unchanged, total } = value.reduce(
        ({ total, unchanged }, change) => {
          const count = change.count ?? 0;

          return {
            total: total + count,
            unchanged:
              unchanged + (!change.added && !change.removed ? count : 0),
          };
        },
        { total: 0, unchanged: 0 }
      );
      resolve(100 * (unchanged / total));
    });
  });
}
