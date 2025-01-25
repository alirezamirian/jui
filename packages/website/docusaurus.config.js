// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const exampleAppConfig = require("../../config/example-app-webpack-config");
const libAliases = require("../../config/lib-aliases");

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
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    },
};

function myPlugin() {
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
}

/**
 *
 * @return {import('@docusaurus/types').Plugin}
 */
function isomorphicGitWebpackConfigPlugin() {
  return {
    name: "isomorphic-git-webpack-config-docusaurus-plugin",
    configureWebpack() {
      return exampleAppConfig;
    },
  };
}

module.exports = config;
