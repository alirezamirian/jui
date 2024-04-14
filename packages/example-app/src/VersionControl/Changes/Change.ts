import { FileStatus } from "../file-status";
import { dirname } from "path";

export type Revision = {
  path: string;
  isDir: boolean;
  hash?: string;
  content(): Promise<string>;
};

declare const __tag: unique symbol;

type ChangeVariant<T extends { type: string }> = T & {
  /**
   * A non-exported tag is used to make opaque types that can only be created by Change function, following
   * "parse, don't validate" rule, enforcing certain rules that defines the change type based on the
   * presence and properties of the before and after revisions.
   */
  readonly [__tag]: any;
};

/**
 * Represents a file being moved from one directory to another, which may or may not have been renamed too.
 */
export type MoveChange = ChangeVariant<{
  type: "MOVED";
  before: Revision;
  after: Revision;
}>;

/**
 * Represents a file being renamed withing the same directory.
 */
export type RenameChange = ChangeVariant<{
  type: "RENAMED";
  before: Revision;
  after: Revision;
}>;

/**
 * Represents a file being changed, but not moved or renamed.
 */
export type ModificationChange = ChangeVariant<{
  type: "MODIFIED";
  before: Revision;
  after: Revision;
}>;

/**
 * Represents a path being deleted.
 */
export type DeletionChange = ChangeVariant<{
  type: "DELETED";
  before: Revision;
}>;

/**
 * Represents a new file
 */
export type AdditionChange = ChangeVariant<{
  type: "ADDED";
  after: Revision;
}>;

/**
 * Represents an unversioned (new) file. In git terms, a file that doesn't exist in index or HEAD.
 */
export type UnversionedChange = ChangeVariant<{
  type: "UNVERSIONED";
  after: Revision;
}>;

export type AnyChange =
  | AdditionChange
  | MoveChange
  | RenameChange
  | ModificationChange
  | DeletionChange
  | UnversionedChange;

const Tagged = <T>(change: T): T & { [__tag]: any } =>
  change as T & { [__tag]: any };

/**
 * Creates change objects from before and after revisions. It creates the right type of change
 * depending on the presence and properties of `before` and `after` revisions.
 * Note: Use Change.Unversioned(revision) to create unversioned changes.
 */
export function Change(before: null, after: Revision): Readonly<AdditionChange>;
export function Change(before: Revision, after: null): Readonly<DeletionChange>;
export function Change(
  before: Revision,
  after: Revision
): Readonly<ModificationChange | RenameChange | MoveChange>;
export function Change(
  before: Revision | null,
  after: Revision | null
): AnyChange {
  if (after) {
    if (!before) {
      return Tagged({
        type: "ADDED",
        after,
      });
    }
    if (before.path !== after.path) {
      if (dirname(before.path) === dirname(after.path)) {
        return Tagged({
          type: "RENAMED",
          before,
          after,
        });
      } else {
        return Tagged({
          type: "MOVED",
          before,
          after,
        });
      }
    }
    return Tagged({
      type: "MODIFIED",
      before,
      after,
    });
  } else {
    return Tagged({
      type: "DELETED",
      before: before!, // "!" because typescript has an issue recognizing after and before can't be null simultaneously
    });
  }
}

/**
 * Creates an unversioned change object
 */
Change.Unversioned = (revision: Revision): UnversionedChange => {
  return Tagged({
    type: "UNVERSIONED",
    after: revision,
  });
};

const changeToFileStatus: Record<AnyChange["type"], FileStatus> = {
  ADDED: "ADDED",
  DELETED: "DELETED",
  MOVED: "MODIFIED",
  RENAMED: "MODIFIED",
  MODIFIED: "MODIFIED",
  UNVERSIONED: "UNKNOWN",
};

/**
 * @returns {@link FileStatus} corresponding to the change type
 */
Change.fileStatus = function (change: AnyChange): FileStatus {
  return changeToFileStatus[change.type] ?? "NOT_CHANGED";
};

/**
 * @returns the `after` path if the change is not a deletion, and `before` path, otherwise.
 */
Change.path = function (change: AnyChange): string {
  return Change.revision(change).path;
};

Change.content = function (change: AnyChange): Promise<string> {
  if ("after" in change) {
    return change.after.content();
  }
  if ("before" in change) {
    return change.before.content();
  }
  return Promise.resolve("");
};

/**
 * type-guard returning filter for addition change
 */
Change.isAddition = function (change: AnyChange): change is AdditionChange {
  return change.type === "ADDED";
};

/**
 * type-guard returning filter for deletion change
 */
Change.isDeletion = function (change: AnyChange): change is DeletionChange {
  return change.type === "DELETED";
};

/**
 * type-guard returning filter for rename change
 */
Change.isRename = function (change: AnyChange): change is RenameChange {
  return change.type === "RENAMED";
};

/**
 * type-guard returning filter for move change
 */
Change.isMove = function (change: AnyChange): change is MoveChange {
  return change.type === "MOVED";
};

/**
 * type-guard returning filter for modification change.
 */
Change.isModified = function (change: AnyChange): change is ModificationChange {
  return change.type === "MODIFIED";
};

/**
 * @returns the `after` revision if the change is not a deletion, and `before` revision, otherwise.
 */
Change.revision = function (change: AnyChange): Revision {
  return "after" in change ? change.after : change.before;
};

Change.equals = function (a: AnyChange, b: AnyChange): boolean {
  const sameBefore =
    "before" in a && "before" in b
      ? revisionEquals(a.before, b.before)
      : "before" in a === "before" in b;
  const sameAfter =
    "after" in a && "after" in b
      ? revisionEquals(a.after, b.after)
      : "after" in a === "after" in b;
  return sameBefore && sameAfter;
};

function revisionEquals(a: Revision, b: Revision) {
  return a?.path === b?.path && a.isDir === b.isDir;
}
