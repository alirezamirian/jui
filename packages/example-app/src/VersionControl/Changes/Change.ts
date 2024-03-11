import { FileStatus } from "../file-status";

export type Revision = {
  path: string;
  isDir: boolean;
};

export interface Change {
  before?: Revision;
  after?: Revision;
}

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
  Extract<FileStatus, "MODIFIED" | "ADDED" | "DELETED"> {
    if (change.after) {
      if (change.before) {
        return "MODIFIED";
      }
      return "ADDED";
    }
    return "DELETED";
  }
}
