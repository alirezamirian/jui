# Contribution

This page explains conventions, decisions, and notes used in development of this codebase.

## Phantom dev dependencies

While [phantom deps](https://rushjs.io/pages/advanced/phantom_deps/) is undoubtedly not a good thing, some build
dependencies are **intentionally** installed on the root workspace and used in scripts in the `@intellij-platform/core`.
The reason is to simplify dependencies of the actual library package(s) and make sure we always have one version of
build tools. While we could run those scripts on root workspace's scripts, while the binary for those build tools is
available, but having `build` script in the actual package.json makes it easy to build one package in isolation.
The draw back is that we need to use the binary from the root node_modules.

## API documentation generation

TODO

## Folder organization

The code base is mostly consisted of **modules** represented at top level folders.

- By **module** we mean closely related components, hooks, etc. Not necessarily a single component.
- While the boundaries defined by these modules might be a candidate for packaging boundaries too, everything
  is exported from a single package for simplicity, at least for now.
- In each module, there is an `index.ts` file exporting the public API of that hypothetical package.
- Each module contains source, tests and stories.

### Import rules

While features are split into many top level folders or **modules**, it can happen in many cases that one of these
modules has a relation with another one, which means importing code from one into another.

Here is some do and don'ts regarding how to import code across these folders:

- 🟢 `import { Something } from '@intellij-platform/core/SomeTopLevelFolder`, where `Something` is a public API
- 🔴 `import { Something } from '@intellij-platrofm/core/SomeTopLevelFolder/someFile`, when `Something` is a public API.
- 🟢 `import { Something } from '@intellij-platrofm/core/SomeTopLevelFolder/someFile`, when something is not
  a public API yet. Maybe it's not clear yet if it should be a public API. Maybe it's not considered stable enough,
  or maybe it could be extracted to its own module later.
- 🔴 `import { Something } from '../SomeTopLevelFolder/someFile`: Avoiding the mess that can be created by relative
  imports like this

The purpose of these rules is to make these folders as close to a standalone package as possible. As if
`@intellij-platform/core/{something}` could be npm packages of their own.
