import path from "path";
import { FSModuleWithPromises } from "jui-example-app/src/fs/browser-fs";
import { AppGlobals } from "./AppGlobals";

type InitializationContext = { currentBranch?: string; dir?: string };

/**
 * Composable helpers to be used with cy.initialization() to create an initial state.
 * Each helper typically returns a {@link Change} function with a standard interface, that creates some
 * side effect (creating a branch, writing a file, deleting a file, etc.). Some helpers also accept some
 * further {@link Change}s to apply, which allows for composing different initialization helpers to create
 * different states, in a declarative and readable way.
 *
 * API design goals:
 * - Initialization functions could be composed together, with a minimal assumption about which can be combined with which.
 * - Composition of initialization functions should result in initialization functions with a similar signature, making
 *   it possible to extract specific composition of the functions and reusing them. For example, it should be possible
 *   to create an initialization function that "creates two parallel branches off of the current branch, each with one
 *   commit adding a new file", and reuse it on different states.
 * - Composition of different functions should be readable
 * - Composition of different functions should be intuitive to write, when thinking about a specific state
 *
 *
 * @example initialize an empty git repo
 * ```ts
 * cy.initialization(gitInit())
 * ```
 *
 * @example initialize an empty git repo, and then create a file without committing
 * ```ts
 * cy.initialization(gitInit(file("test.ts"))
 * ```
 *
 * @example initialize an empty git repo, and then commit some change on the default branch ("master")
 * ```ts
 * cy.initialization(gitInit(commit([file("test.ts")])))
 * ```
 * @example initialize git repo, with some file on "master" branch, and two branches created off of master branch,
 * each including an extra file.
 * ```ts
 * cy.initialization(
 *    gitInit(
 *      commit([file("test-on-master.ts")]),
 *      branch(
 *        "branch-1",
 *        commit([
 *          file("test-on-branch-1.ts"),
 *        ])
 *      ),
 *      branch(
 *        "branch-2",
 *        commit([
 *          file("test-on-branch-2.ts"),
 *        ])
 *      )
 *    )
 *  )
 * ```
 */

type Change<T = unknown, C = InitializationContext> = (
  args: AppGlobals,
  context?: C
) => Promise<T>;

type FileChange = Change<string>;

/**
 * Creates an initializer which initializes git in project directory ("/workspace" by default),
 * running each change passed change on "master" branch.gitInit
 * @param changes changes to run on "master", after git init.
 */
export function gitInit(...changes: Array<Change>): Change {
  return async (args, { dir = args.projectDir } = {}) => {
    const { git, fs } = args;
    console.log("calling init on", dir);
    await git.init({ fs, dir });
    await git.commit({
      fs,
      dir,
      author: { name: "Ali" },
      message: "initial empty commit",
    });

    for (const change of changes) {
      await change(args, { dir, currentBranch: "master" });
    }
  };
}

/**
 * Creates an initializer which creates a branch, and runs further changes on it.
 * @param branchName branch name to create
 * @param changes further changes to run on after branch is created. Typically, changes created by {@link commit} calls.
 */
export function branch(branchName: string, ...changes: Array<Change>): Change {
  return async (
    args,
    { dir = args.projectDir }: InitializationContext = {}
  ) => {
    const { git, fs } = args;
    await git.branch({ fs, dir, ref: branchName, checkout: true });
    for (const change of changes) {
      await change(args, { currentBranch: branchName, dir });
    }
  };
}

/**
 * Creates an initializer which applies a number of initializers on the current branch. Before each initializer is
 * applied, it checks out the current branch. A typical use case is to create a bunch of parallel branches, off of the
 * current branch
 * @param changes further changes to run on after branch is created. Typically, changes created by {@link commit} calls.
 */
export function fromCurrentBranch(...changes: Array<Change>): Change {
  return async (
    args,
    { dir = args.projectDir }: InitializationContext = {}
  ) => {
    const { git, fs } = args;
    const currentBranch = (await git.currentBranch({ fs, dir })) ?? "master";
    for (const change of changes) {
      await git.checkout({ fs, dir, ref: currentBranch });
      await change(args, { dir, currentBranch });
    }
  };
}

/**
 * Creates an initializer which creates a commit, after applying some {@link fileChanges}.
 * @param fileChanges initializers that make some change on the fs and resolve to the affected file path.
 * @param params commit parameters
 */
export function commit(
  fileChanges: Array<FileChange>,
  params: Omit<
    Partial<Parameters<AppGlobals["git"]["commit"]>[0]>,
    "fs" | "dir"
  > = {}
): Change {
  return async (args, context) => {
    const { git, fs } = args;
    const filepaths = await gitAdd(...fileChanges)(args, context);
    if (filepaths.length > 0) {
      await git.commit({
        fs,
        dir: context?.dir ?? args.projectDir,
        author: { ...params.author, name: "Ali" },
        message: context?.currentBranch
          ? `Test commit on ${context?.currentBranch}`
          : "Test commit",
        ...params,
      });
    }
  };
}

export function gitAdd(...fileChanges: FileChange[]): Change<string[]> {
  return async (args, context) => {
    const { git, fs } = args;
    const paths = await Promise.all(
      fileChanges.map((fileChange) => fileChange(args, context))
    );
    if (paths.length > 0) {
      await git.add({
        fs,
        dir: context?.dir ?? args.projectDir,
        filepath: paths,
      });
    }

    return paths;
  };
}

/**
 * Creates an initializer which creates a directory.
 * @param dirname directory name to create
 * @param changes further changes to run within the context of the created directory.
 */
export function dir(dirname: string, changes: Change[] = []): Change {
  return async (args, context) => {
    const { fs, path, projectDir } = args;
    const dir = path.join(context?.dir ?? projectDir, dirname);
    await ensureDir(fs, dir);
    for (const change of changes) {
      await change(args, { ...context, dir });
    }
  };
}

/**
 * Runs the passed changes within the context of the provided directory
 * @param dir directory to run changes in
 * @param changes changes to run within the context of the provided directory.
 */
export function cd(dir: string, ...changes: Change[]): Change {
  return async (args, context) => {
    for (const change of changes) {
      await change(args, { ...context, dir });
    }
  };
}

/**
 * Creates an initializer which writes a file on a path specified by {@link filename}
 * @param filename path of the file to write, relative to the project directory.
 * @param content the content of the file. The default content will indicate filename and the current branch
 */
export function file(filename: string, content?: string): FileChange {
  return async ({ fs, path, projectDir }, context) => {
    const fullpath = path.join(context?.dir ?? projectDir, filename);
    await ensureDir(fs, path.dirname(fullpath));
    await fs.promises.writeFile(
      fullpath,
      content ??
        (context?.currentBranch
          ? `${filename} content on ${context?.currentBranch}`
          : `${filename} content`)
    );
    return filename;
  };
}

/**
 * Creates an initializer which deletes a file on a path specified by {@link filename}
 * @param filename path of the file to delete, relative to the project directory.
 */
export function deleteFile(filename: string): FileChange {
  return async ({ fs, path, projectDir }, context) => {
    await fs.promises.unlink(path.join(context?.dir ?? projectDir, filename));
    return filename;
  };
}

/**
 * Creates an initializer which writes the XML file corresponding the persisted git configuration
 * @param gitRoots: paths used to initialize vcs mappings settings.
 */
export function persistedGitSettings({
  gitRoots,
  rememberedInputs: { urls, cloneParentDir } = {},
}: {
  rememberedInputs?: {
    urls?: string[];
    cloneParentDir?: string;
  };
  gitRoots?: string[];
}): Change {
  return async (args, context) => {
    const { projectDir, path } = args;
    return file(
      ".idea/vcs.xml",
      `<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="GitRememberedInputs">
    <option name="visitedUrls">
      <list>
        ${
          urls
            ?.map(
              (url) => `<UrlAndUserName>
          <option name="url" value="${url}" />
          <option name="userName" value="" />
        </UrlAndUserName>`
            )
            .join("\n        ") ?? ""
        }
      </list>
    </option>
    ${
      cloneParentDir
        ? `<option name="cloneParentDir" value="${cloneParentDir}" />`
        : ""
    }
  </component>

  <component name="VcsDirectoryMappings">
    ${
      gitRoots
        ?.map(
          (gitRoot) =>
            `<mapping directory="${path.join(
              projectDir,
              gitRoot
            )}" vcs="Git" />`
        )
        .join("\n    ") ?? ""
    }
  </component>
</project>`
    )(args, context);
  };
}

async function ensureDir(fs: FSModuleWithPromises, dirPath: string) {
  console.log("ensuring directory", dirPath);
  const stat = await fs.promises
    .stat(dirPath)
    .catch((e) => (e.code === "ENOENT" ? false : Promise.reject(e)));
  if (stat === false) {
    // path doesn't exist
    const dirname = path.dirname(dirPath);
    if (dirname !== path.dirname(dirname)) {
      // not root path
      await ensureDir(fs, dirname);
    }
    await fs.promises
      .mkdir(dirPath)
      // it can happen that due to async nature of this function, between calling stat and this line, the folder is already created.
      .catch((e) =>
        e.code === "EEXIST" ? Promise.resolve() : Promise.reject(e)
      );
  } else if (!stat.isDirectory()) {
    throw new Error(`path is not a directory, but already exists: ${dirPath}`);
  }
}
