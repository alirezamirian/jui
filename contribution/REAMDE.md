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
