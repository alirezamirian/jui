// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const webpack = require("webpack");
const path = require("path");

const repoUrl = "https://github.com/alirezamirian/jui";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "JUI",
  tagline: "A react-web implementation of Intellij Platform",
  url: "https://alirezamirian.github.io",
  baseUrl: process.env.WEBSITE_BASE_URL || "/jui/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "jui/img/favicon.ico", // FIXME
  organizationName: "alirezamirian",
  projectName: "jui",
  trailingSlash: false,

  plugins: [
    "@docusaurus/theme-live-codeblock",
    myPlugin,
    isomorphicGitWebpackConfigPlugin,
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
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
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

function myPlugin() {
  return {
    name: "my-docusaurus-plugin",
    configureWebpack(config, isServer) {
      const resolve = {
        alias: {
          /**
           * without this alias also we would be linked to the package source, but two things to consider:
           * - `module`, `browser` and `main` fields are linked to `dist` folder, which means we would need to have
           *   the library built on every change, in development, if we want it truly linked.
           * - At the moment build is broken, due to duplicate exported identifiers.
           *
           * It's probably nicer to have this alias configured in website's package.json, but it didn't work as expected
           * in the first attempt at least.
           */
          "@intellij-platform/core/themes": path.resolve(
            __dirname,
            "../jui/themes"
          ),
          "@intellij-platform/core": path.resolve(__dirname, "../jui/src"),
        },
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
}

/**
 *
 * @return {import('@docusaurus/types').Plugin}
 */
function isomorphicGitWebpackConfigPlugin() {
  return {
    name: "isomorphic-git-webpack-config-docusaurus-plugin",
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          fallback: {
            buffer: require.resolve("buffer"),
            process: require.resolve("process/browser"),
            stream: require.resolve("stream-browserify"),
            path: require.resolve("path-browserify"),
          },
        },
        plugins: [
          new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
          }),
          new webpack.ProvidePlugin({
            process: "process/browser",
          }),
        ],
      };
    },
  };
}

module.exports = config;
