import { diffLines } from "diff";
import { Change } from "./Change";
import { notNull } from "@intellij-platform/core/utils/array-utils";

// Read more: https://www.git-scm.com/docs/git-diff/2.6.7#:~:text=The-,similarity%20index,-is%20the%20percentage
const DEFAULT_SIMILARITY_INDEX = 50;

/**
 * Given a list of changes, detects renames based on the change in the content of changes where only `before` or
 * `after` is present, and consolidates them into one change, making it count as a rename.
 * @param changes
 */
export async function detectRenames(
  changes: ReadonlyArray<Change>
): Promise<Change[]> {
  const deletions: Change[] = changes.filter(
    (change) => Change.type(change) === "DELETED"
  );
  const additions: Change[] = changes.filter(
    (change) => Change.type(change) === "ADDED"
  );

  const contents = new Map<Change, { before: string; after: string }>();
  await Promise.all(
    [...deletions, ...additions].map(async (change) => {
      contents.set(change, {
        before: (await change.before?.content()) ?? "",
        after: (await change.after?.content()) ?? "",
      });
    })
  );

  const foundRenames: Change[] = [];
  return changes
    .map((change): Change | null => {
      if (foundRenames.includes(change)) {
        return null;
      }
      const type = Change.type(change);
      if (type === "DELETED") {
        for (const candidate of additions) {
          const similarity = computeSimilarity(
            contents.get(candidate)?.after || "",
            contents.get(change)?.before || ""
          );
          if (similarity >= DEFAULT_SIMILARITY_INDEX) {
            foundRenames.push(candidate);
            additions.splice(additions.indexOf(candidate), 1);
            return {
              before: change.before,
              after: candidate.after,
            };
          }
        }
      }
      if (type === "ADDED") {
        for (const candidate of deletions) {
          const similarity = computeSimilarity(
            contents.get(candidate)?.before || "",
            contents.get(change)?.after || ""
          );
          if (similarity >= DEFAULT_SIMILARITY_INDEX) {
            deletions.splice(deletions.indexOf(candidate), 1);
            foundRenames.push(candidate);
            return {
              before: candidate.before,
              after: change.after,
            };
          }
        }
      }
      return change;
    })
    .filter(notNull);
}

// Function to compute similarity
function computeSimilarity(file1Content: string, file2Content: string) {
  const changes = diffLines(file1Content, file2Content);
  const { unchanged, total } = changes.reduce(
    ({ total, unchanged }, change) => {
      const count = change.count ?? 0;

      return {
        total: total + count,
        unchanged: unchanged + (!change.added && !change.removed ? count : 0),
      };
    },
    { total: 0, unchanged: 0 }
  );
  return 100 * (unchanged / total);
}
