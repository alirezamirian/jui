import type { Config, PluginConfig } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { ProvidePlugin } from "@rspack/core"; // 🟡transitive dependency
import { themes as prismThemes } from "prism-react-renderer";
// @ts-expect-error TS7016: Could not find a declaration file for module ...
import exampleAppConfig from "../../config/example-app-webpack-config";
// @ts-expect-error TS7016: Could not find a declaration file for module ...
import libAliases from "../../config/lib-aliases";

const repoUrl = "https://github.com/alirezamirian/jui";

const myPlugin: PluginConfig = () => {
  return {
    name: "my-docusaurus-plugin",
    configureWebpack(config, isServer) {
      const resolve = {
        alias: libAliases,
      };
      if (config.mode === "production" && !isServer) {
        return {
          devtool: "source-map",
          resolve,
        };
      }
      return { resolve };
    },
  };
};

const config: Config = {
  title: "JUI",
  tagline: "A react-web implementation of Intellij Platform",
  url: "https://alirezamirian.github.io",
  baseUrl: process.env.WEBSITE_BASE_URL || "/jui/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  onBrokenAnchors: "throw",
  favicon: "jui/img/favicon.ico", // FIXME
  organizationName: "alirezamirian",
  projectName: "jui",
  trailingSlash: false,
  future: {
    experimental_faster: {
      /**
       * swc loader for js files is disabled because:
       * - the swc config is not customizable (via .swcrc) at the moment,
       *   and we need `jsc.parser.decorators` set to true.
       *   easy to work around, though, via patching.
       * - we use `babel-plugin-react-docgen` to capture jsdoc description
       *   of different library objects on a special property and render them
       *   in the docs.
       *   There is currently no swc plugin for react-docgen.
       *
       * Still a huge performance gain even without swc js loader:
       *
       * | experimental_faster | time                                                  |
       * | ------------------- | ----------------------------------------------------- |
       * | false               | 385.85s user 36.71s system 210% cpu **3:20.60** total |
       * | without swcJsLoader | 97.00s user 10.75s system 195% cpu **55.169** total   |
       * | true                | 51.54s user 6.84s system 237% cpu **24.538** total    |
       */
      swcJsLoader: false,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      mdxCrossCompilerCache: true,
      rspackBundler: true,
    },
  },
  plugins: [
    "@docusaurus/theme-live-codeblock",
    myPlugin,
    isomorphicGitWebpackConfigPlugin,
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: `${repoUrl}/edit/master/packages/website/`,
        },
        blog: {
          showReadingTime: true,
          editUrl: `${repoUrl}/edit/master/packages/website/blog/`,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    tableOfContents: {
      maxHeadingLevel: 4,
    },
    announcementBar: {
      id: "library-state-warning",
      content:
        "This library is still in early stages of development. It's not stable and documentation is incomplete.",
      backgroundColor: "khaki",
    },
    liveCodeBlock: { playgroundPosition: "top" },
    navbar: {
      style: "primary",
      title: "jui",
      hideOnScroll: true, // especially useful for embedded demo app in homepage
      // logo: {
      //   alt: "jui logo",
      //   src: "../img/logo.svg",
      // },
      items: [
        {
          type: "doc",
          docId: "getting-started",
          position: "left",
          label: "Docs",
        },

        { to: "/example-app", label: "Demo", position: "left" },
        {
          // for some reason neither setting "href" instead of "to", nor "prependBaseUrlToHref", nor "target: 'self'"
          // won't prevent docusaurus from using react-router Link.
          href: "storybook/",
          prependBaseUrlToHref: true,
          target: "_blank",
          label: "Storybook",
          position: "left",
        },
        {
          type: "search",
          position: "right",
        },
        // { to: "/blog", label: "Blog", position: "left" },
        {
          href: repoUrl,
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting started",
              to: "/docs/getting-started",
            },
          ],
        },
        // {
        //   title: "Community",
        //   items: [
        //     {
        //       label: "Stack Overflow",
        //       href: "https://stackoverflow.com/questions/tagged/docusaurus",
        //     },
        //     {
        //       label: "Discord",
        //       href: "https://discordapp.com/invite/docusaurus",
        //     },
        //     {
        //       label: "Twitter",
        //       href: "https://twitter.com/docusaurus",
        //     },
        //   ],
        // },
        {
          title: "More",
          items: [
            // {
            //   label: "Blog",
            //   to: "/blog",
            // },
            {
              label: "GitHub",
              href: repoUrl,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} alirezamirian, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
};

/**
 *
 * @return {import('@docusaurus/types').Plugin}
 */
function isomorphicGitWebpackConfigPlugin() {
  return {
    name: "isomorphic-git-webpack-config-docusaurus-plugin",
    configureWebpack() {
      return {
        ...exampleAppConfig,
        plugins: [
          new ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
          }),
          new ProvidePlugin({
            process: "process/browser",
          }),
        ],
      };
    },
  };
}

module.exports = config;
