"use strict";
exports.id = 1585;
exports.ids = [1585];
exports.modules = {

/***/ 11585:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   conf: () => (/* binding */ conf),
/* harmony export */   language: () => (/* binding */ language)
/* harmony export */ });
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.52.0(f6dc0eb8fce67e57f6036f4769d92c1666cdf546)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/


// src/basic-languages/dockerfile/dockerfile.ts
var conf = {
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"]
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" }
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" }
  ]
};
var language = {
  defaultToken: "",
  tokenPostfix: ".dockerfile",
  variable: /\${?[\w]+}?/,
  tokenizer: {
    root: [
      { include: "@whitespace" },
      { include: "@comment" },
      [/(ONBUILD)(\s+)/, ["keyword", ""]],
      [/(ENV)(\s+)([\w]+)/, ["keyword", "", { token: "variable", next: "@arguments" }]],
      [
        /(FROM|MAINTAINER|RUN|EXPOSE|ENV|ADD|ARG|VOLUME|LABEL|USER|WORKDIR|COPY|CMD|STOPSIGNAL|SHELL|HEALTHCHECK|ENTRYPOINT)/,
        { token: "keyword", next: "@arguments" }
      ]
    ],
    arguments: [
      { include: "@whitespace" },
      { include: "@strings" },
      [
        /(@variable)/,
        {
          cases: {
            "@eos": { token: "variable", next: "@popall" },
            "@default": "variable"
          }
        }
      ],
      [
        /\\/,
        {
          cases: {
            "@eos": "",
            "@default": ""
          }
        }
      ],
      [
        /./,
        {
          cases: {
            "@eos": { token: "", next: "@popall" },
            "@default": ""
          }
        }
      ]
    ],
    // Deal with white space, including comments
    whitespace: [
      [
        /\s+/,
        {
          cases: {
            "@eos": { token: "", next: "@popall" },
            "@default": ""
          }
        }
      ]
    ],
    comment: [[/(^#.*$)/, "comment", "@popall"]],
    // Recognize strings, including those broken across lines with \ (but not without)
    strings: [
      [/\\'$/, "", "@popall"],
      // \' leaves @arguments at eol
      [/\\'/, ""],
      // \' is not a string
      [/'$/, "string", "@popall"],
      [/'/, "string", "@stringBody"],
      [/"$/, "string", "@popall"],
      [/"/, "string", "@dblStringBody"]
    ],
    stringBody: [
      [
        /[^\\\$']/,
        {
          cases: {
            "@eos": { token: "string", next: "@popall" },
            "@default": "string"
          }
        }
      ],
      [/\\./, "string.escape"],
      [/'$/, "string", "@popall"],
      [/'/, "string", "@pop"],
      [/(@variable)/, "variable"],
      [/\\$/, "string"],
      [/$/, "string", "@popall"]
    ],
    dblStringBody: [
      [
        /[^\\\$"]/,
        {
          cases: {
            "@eos": { token: "string", next: "@popall" },
            "@default": "string"
          }
        }
      ],
      [/\\./, "string.escape"],
      [/"$/, "string", "@popall"],
      [/"/, "string", "@pop"],
      [/(@variable)/, "variable"],
      [/\\$/, "string"],
      [/$/, "string", "@popall"]
    ]
  }
};



/***/ })

};
;