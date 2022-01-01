// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const path = require("path");

const repoUrl = "https://github.com/alirezamirian/jui";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "JUI",
  tagline: "Intellij Platform in React",
  url: "https://alirezamirian.github.io",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "throw",
  favicon: "jui/img/favicon.ico", // FIXME
  organizationName: "alirezamirian",
  projectName: "jui",
  trailingSlash: false,

  plugins: [
    "@docusaurus/theme-live-codeblock",
    myPlugin,
    [
      // We might as well remove this and add the alias in our custom plugin, now that we have one
      "docusaurus-plugin-module-alias",
      {
        alias: {
          "@intellij-platform/core": path.resolve(__dirname, "../jui/src"),
        },
      },
    ],
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
      announcementBar: {
        id: "library-state-warning",
        content:
          "This library is still in very early stages of development. It's <b>not even published yet</b>, and documentation is incomplete.",
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
            docId: "intro",
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
                label: "Tutorial",
                to: "/docs/intro",
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
      if (config.mode === "production" && !isServer) {
        return {
          devtool: "source-map",
        };
      }
      return {};
    },
  };
}

module.exports = config;
