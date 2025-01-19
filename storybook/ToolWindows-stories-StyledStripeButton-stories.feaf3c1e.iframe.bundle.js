"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[487],{"./src/ToolWindows/stories/StyledStripeButton.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{StripeButton:()=>StripeButton,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/ToolWindows/StyledToolWindowStripeButton.tsx"),_story_helpers__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/story-helpers.tsx");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/ToolWindow"},StripeButton={render:props=>{const{anchor="left"}=props;return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,"Note: background is meant to be semi-transparent"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_1__.jz,{...props,anchor},"Anchor: ",anchor))},argTypes:{anchor:{defaultValue:"left"},active:{defaultValue:!0}},parameters:{controls:{exclude:_story_helpers__WEBPACK_IMPORTED_MODULE_2__.q},component:_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_1__.jz}},__namedExportsOrder=["StripeButton"];StripeButton.parameters={...StripeButton.parameters,docs:{...StripeButton.parameters?.docs,source:{originalSource:'{\n  render: (props: StyledToolWindowStripeButtonProps) => {\n    const {\n      anchor = "left"\n    } = props;\n    return <>\n        <p>Note: background is meant to be semi-transparent</p>\n        <StyledToolWindowStripeButton {...props} anchor={anchor}>\n          Anchor: {anchor}\n        </StyledToolWindowStripeButton>\n      </>;\n  },\n  argTypes: {\n    anchor: {\n      defaultValue: "left"\n    },\n    active: {\n      defaultValue: true\n    }\n  },\n  parameters: {\n    controls: {\n      exclude: styledComponentsControlsExclude\n    },\n    component: StyledToolWindowStripeButton\n  }\n}',...StripeButton.parameters?.docs?.source}}}},"./src/Icon/StyledIconWrapper.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>StyledIconWrapper});var _styled__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styled.ts");const StyledIconWrapper=_styled__WEBPACK_IMPORTED_MODULE_0__.zo.span`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  width: ${({size=16})=>`${size}px`};
  height: ${({size=16})=>`${size}px`};
  position: relative; // to allow absolute positioned indicators and overlays on icon
  cursor: ${({role})=>"button"===role?"pointer":void 0};
`},"./src/ToolWindows/StyledToolWindowStripeButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A6:()=>STRIPE_BUTTON_LINE_HEIGHT,Mk:()=>STRIPE_BUTTON_CROSS_PADDING,jz:()=>StyledToolWindowStripeButton});var _Icon_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Icon/StyledIconWrapper.tsx"),_styled__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/styled.ts"),styled_components__WEBPACK_IMPORTED_MODULE_1__=(__webpack_require__("../../node_modules/react/index.js"),__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"));const STRIPE_BUTTON_CROSS_PADDING=2.5,STRIPE_BUTTON_LINE_HEIGHT="1rem",StyledToolWindowStripeButton=_styled__WEBPACK_IMPORTED_MODULE_3__.zo.span`
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
  color: ${({theme,active})=>active?theme.color("ToolWindow.Button.selectedForeground",theme.dark?"rgb(255,255,255)":"rgb(0,0,0)"):theme.color("*.foreground")};
  background: ${({theme,active})=>active?theme.color("ToolWindow.Button.selectedBackground",theme.dark?"rgba(15,15,15,.332)":"rgba(85,85,85,.332)"):void 0};

  ${({anchor})=>"horizontal"===("left"===anchor||"right"===anchor?"vertical":"horizontal")?styled_components__WEBPACK_IMPORTED_MODULE_1__.iv`
        padding: ${STRIPE_BUTTON_CROSS_PADDING}px 10px;
      `:styled_components__WEBPACK_IMPORTED_MODULE_1__.iv`
        padding: 10px ${STRIPE_BUTTON_CROSS_PADDING}px;
        writing-mode: vertical-lr;
        // writing-mode: sideways-lr is not supported anywhere other than FF, so, we need to rotate
        transform: ${"left"===anchor?"rotateZ(180deg)":void 0};

        // icons are not rotated like text in Intellij Platform implementation. It kind of makes sense.
        ${_Icon_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_2__.M} {
          transform: rotate(180deg);
        }
      `}
  ${({active})=>!active&&styled_components__WEBPACK_IMPORTED_MODULE_1__.iv`
      &:hover {
        background: ${({theme})=>theme.color("ToolWindow.Button.hoverBackground",theme.dark?"rgba(15,15,15,.156)":"rgba(85,85,85,.156)")};
      }
    `};
`},"./src/story-helpers.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{q:()=>styledComponentsControlsExclude});__webpack_require__("../../node_modules/react/index.js");const styledComponentsControlsExclude=["theme","as","forwardedAs","ref"]},"./src/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Fg:()=>useTheme,iv:()=>css,zo:()=>styled});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const styled=styled_components__WEBPACK_IMPORTED_MODULE_0__.ZP,useTheme=styled_components__WEBPACK_IMPORTED_MODULE_0__.Fg,css=styled_components__WEBPACK_IMPORTED_MODULE_0__.iv;styled_components__WEBPACK_IMPORTED_MODULE_0__.Sf}}]);
//# sourceMappingURL=ToolWindows-stories-StyledStripeButton-stories.feaf3c1e.iframe.bundle.js.map