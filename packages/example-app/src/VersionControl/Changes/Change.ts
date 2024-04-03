import { FileStatus } from "../file-status";
import { dirname } from "path";

export type Revision = {
  path: string;
  isDir: boolean;
  hash?: string;
  content(): Promise<string>;
};

export interface Change {
  before?: Revision;
  after?: Revision;
}
export type ModificationChange = Required<Change>;
export type DeletionChange = {
  before: Revision;
  after: undefined;
};
export type AdditionChange = {
  before: undefined;
  after: Revision;
};

export type ChangeType = Extract<FileStatus, "MODIFIED" | "ADDED" | "DELETED">;

/**
 * Experimenting a pattern of exporting both a type and a value under the same name, to collocate behavior and interface
 * while still using plain objects, to avoid caveats of using class.
 */
export class Change {
  static path(change: Change): string {
    return (change.after ?? change.before)?.path ?? "";
  }
  static type(
    change: Change
  ): // Making sure the return value is a subset of FileStatus
  ChangeType {
    if (change.after) {
      if (change.before) {
        return "MODIFIED";
      }
      return "ADDED";
    }
    return "DELETED";
  }
  static isAddition(change: Change): change is AdditionChange {
    return Change.type(change) === "ADDED";
  }
  static isModification(change: Change): change is ModificationChange {
    return Change.type(change) === "MODIFIED";
  }
  static isDeletion(change: Change): change is DeletionChange {
    return Change.type(change) === "DELETED";
  }
  static isRename(change: Change): change is ModificationChange {
    return (
      Change.isModification(change) &&
      change.before.path !== change.after.path &&
      dirname(change.before.path) === dirname(change.after.path)
    );
  }
  static isMove(change: Change): change is ModificationChange {
    return (
      Change.isModification(change) &&
      change.before.path !== change.after.path &&
      dirname(change.before.path) !== dirname(change.after.path)
    );
  }
  static equals(a: Change, b: Change): boolean {
    return (
      a.before?.path === b.before?.path &&
      a.after?.path === b.after?.path &&
      Boolean(a.before?.isDir) === Boolean(b.before?.isDir) &&
      Boolean(a.after?.isDir) === Boolean(b.after?.isDir)
    );
  }
}
