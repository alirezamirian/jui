"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[5147],{"./src/ToolWindows/stories/StyledStripeButton.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{StripeButton:()=>StripeButton,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/ToolWindows/StyledToolWindowStripeButton.tsx"),_story_helpers__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/story-helpers.tsx");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/ToolWindow"},StripeButton={render:props=>{const{$anchor="left"}=props;return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,"Note: background is meant to be semi-transparent"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_1__.Tb,{...props,$anchor},"Anchor: ",$anchor))},argTypes:{anchor:{defaultValue:"left"},active:{defaultValue:!0}},parameters:{controls:{exclude:_story_helpers__WEBPACK_IMPORTED_MODULE_2__.E},component:_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_1__.Tb}},__namedExportsOrder=["StripeButton"];StripeButton.parameters={...StripeButton.parameters,docs:{...StripeButton.parameters?.docs,source:{originalSource:'{\n  render: (props: StyledToolWindowStripeButtonProps) => {\n    const {\n      $anchor = "left"\n    } = props;\n    return <>\n        <p>Note: background is meant to be semi-transparent</p>\n        <StyledToolWindowStripeButton {...props} $anchor={$anchor}>\n          Anchor: {$anchor}\n        </StyledToolWindowStripeButton>\n      </>;\n  },\n  argTypes: {\n    anchor: {\n      defaultValue: "left"\n    },\n    active: {\n      defaultValue: true\n    }\n  },\n  parameters: {\n    controls: {\n      exclude: styledComponentsControlsExclude\n    },\n    component: StyledToolWindowStripeButton\n  }\n}',...StripeButton.parameters?.docs?.source}}}},"./src/Icon/StyledIconWrapper.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{o:()=>StyledIconWrapper});var _styled__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styled.ts");const StyledIconWrapper=_styled__WEBPACK_IMPORTED_MODULE_0__.I4.span`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  width: ${({$size=16})=>`${$size}px`};
  height: ${({$size=16})=>`${$size}px`};
  position: relative; // to allow absolute positioned indicators and overlays on icon
  cursor: ${({role})=>"button"===role?"pointer":void 0};
`},"./src/ToolWindows/StyledToolWindowStripeButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Qj:()=>STRIPE_BUTTON_CROSS_PADDING,Tb:()=>StyledToolWindowStripeButton,os:()=>STRIPE_BUTTON_LINE_HEIGHT});var _Icon_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/Icon/StyledIconWrapper.tsx"),_styled__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styled.ts");const STRIPE_BUTTON_CROSS_PADDING=2.5,STRIPE_BUTTON_LINE_HEIGHT="1rem",StyledToolWindowStripeButton=_styled__WEBPACK_IMPORTED_MODULE_0__.I4.span`
  box-sizing: border-box;
  display: flex; // to allow icon and text alignment by default;
  align-items: center;
  cursor: default;
  user-select: none;
  overflow: hidden;
  direction: ltr;
  flex-shrink: 0;
  font-size: 0.7rem;
  line-height: ${STRIPE_BUTTON_LINE_HEIGHT}; // absolute value seems to be problematic when the base font size is changed
  white-space: nowrap;
  color: ${({theme,$active})=>$active?theme.color("ToolWindow.Button.selectedForeground",theme.dark?"rgb(255,255,255)":"rgb(0,0,0)"):theme.color("*.foreground")};
  background: ${({theme,$active})=>$active?theme.color("ToolWindow.Button.selectedBackground",theme.dark?"rgba(15,15,15,.332)":"rgba(85,85,85,.332)"):void 0};

  ${({$anchor})=>"horizontal"===("left"===$anchor||"right"===$anchor?"vertical":"horizontal")?_styled__WEBPACK_IMPORTED_MODULE_0__.AH`
        padding: ${STRIPE_BUTTON_CROSS_PADDING}px 10px;
      `:_styled__WEBPACK_IMPORTED_MODULE_0__.AH`
        padding: 10px ${STRIPE_BUTTON_CROSS_PADDING}px;
        writing-mode: vertical-lr;
        // writing-mode: sideways-lr is not supported anywhere other than FF, so, we need to rotate
        transform: ${"left"===$anchor?"rotateZ(180deg)":void 0};

        // icons are not rotated like text in Intellij Platform implementation. It kind of makes sense.
        ${_Icon_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_1__.o} {
          transform: rotate(180deg);
        }
      `}
  ${({$active})=>!$active&&_styled__WEBPACK_IMPORTED_MODULE_0__.AH`
      &:hover {
        background: ${({theme})=>theme.color("ToolWindow.Button.hoverBackground",theme.dark?"rgba(15,15,15,.156)":"rgba(85,85,85,.156)")};
      }
    `};
`},"./src/story-helpers.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{E:()=>styledComponentsControlsExclude});__webpack_require__("../../node_modules/react/index.js");const styledComponentsControlsExclude=["theme","as","forwardedAs","ref"]},"./src/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{AH:()=>css,DP:()=>useTheme,I4:()=>styled});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const styled=styled_components__WEBPACK_IMPORTED_MODULE_0__.Ay,useTheme=styled_components__WEBPACK_IMPORTED_MODULE_0__.DP,css=styled_components__WEBPACK_IMPORTED_MODULE_0__.AH;styled_components__WEBPACK_IMPORTED_MODULE_0__.e$}}]);
//# sourceMappingURL=ToolWindows-stories-StyledStripeButton-stories.c4fc4f88.iframe.bundle.js.map