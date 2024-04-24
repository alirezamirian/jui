import path from "path";
import { identity } from "ramda";

export function isParentPath(parent: string, dir: string) {
  return dir.startsWith(parent + path.sep); // is this good enough, or do we need the code below?
  // const relative = path.relative(parent, dir);
  // return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
}

/**
 * Given a list of paths, returns a subset of them, where nested paths are removed.
 * @example findRoots(['/a/b/c/x.txt', '/a/b', '/a/b/c', '/a/b/y.ts']); // ['/a/b']
 * @example findRoots([{p: '/a/b'}, {p: '/a'}]); // [{p: '/a'}]
 */
export function findRootPaths(paths: readonly string[]): string[];
export function findRootPaths<T>(
  objects: readonly T[],
  getPath: (obj: T) => string
): T[];
export function findRootPaths<T>(
  objects: readonly T[],
  getPath: (obj: T) => string = identity as (obj: T) => string
): T[] {
  return objects.filter((obj) => {
    const thePath = getPath(obj);
    return !objects.find(
      (anObject) => anObject !== obj && isParentPath(getPath(anObject), thePath)
    );
  });
}
