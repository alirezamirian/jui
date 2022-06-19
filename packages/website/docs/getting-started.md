---
id: getting-started
sidebar_position: 0
---

# Getting started

## Installation

The packaging may be subject to change as the library evolves. At the moment, everything is shipped in a single package,
`@intellij-platform/core`.
There is a peer dependency on `styled-components`. While styled-components@4 might work too, only v5 has been tested.

```bash
yarn add @intellij-platform/core styled-components
```

Or with npm:

```bash
npm i @intellij-platform/core styled-components
```

[//]: # "TODO Build tooling"

### Configuring theme

All components rely on [Theme](guides/Theming.mdx#theme) to be provided. So you need to wrap your application code in a
`ThemeProvider`:

```tsx
import { ThemeProvider } from "@intellij-platform/core";
import darculaThemeJson from "@intellij-platform/core/themes/darcula.theme.json";

const theme = new Theme(darculaThemeJson);

function App() {
  return <ThemeProvider theme={theme}>...</ThemeProvider>;
}
```

The only required value for creating a `Theme` object is a theme json object. You can use any
[valid theme json][theme-json-schema] but
[the default themes](https://www.jetbrains.com/help/idea/user-interface-themes.html) are
available under `@intellij-platform/core/themes`.
See more options for creating theme in [theming docs](guides/Theming.mdx#creating-a-theme).

:::tip
Set `resolveJsonModule` to `true` in your `tsconfig.json` to allow importing theme json files.
:::

### Hello World!

```tsx live
// import { Item, List, Theme, ThemeProvider } from "@intellij-platform/core";
// import darculaThemeJson from "@intellij-platform/core/themes/darcula.theme.json";

function App() {
  const darculaTheme = new Theme(darculaThemeJson);
  return (
    <ThemeProvider theme={darculaTheme}>
      <List selectionMode="multiple">
        <Item>Hello React!</Item>
        <Item>Hello Intellij Platform</Item>
        <Item>Hello World!</Item>
      </List>
    </ThemeProvider>
  );
}
```

## Next steps

A good next step would be to check out [Tool Windows](components/ToolWindows.mdx). It's the centric component in
most apps. A few other commonly used components to start with would be
[SpeedSearchTree](components/Tree.mdx#speedsearchtree), [SpeedSearchList](components/List.mdx#speedsearchlist) and
[Tabs](components/Tabs.mdx).

[theme-json-schema]: https://raw.githubusercontent.com/JetBrains/intellij-community/e3c7d96daba1d5d84d5650bde6c220aed225bfda/plugins/devkit/devkit-core/resources/schemes/theme.schema.json
