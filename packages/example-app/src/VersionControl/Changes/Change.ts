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
}
