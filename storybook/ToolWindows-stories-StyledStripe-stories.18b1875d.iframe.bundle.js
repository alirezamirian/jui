"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[8458],{"./src/ToolWindows/stories/StyledStripe.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{StyledStripe:()=>StyledStripe,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_StyledToolWindowStripe__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/ToolWindows/StyledToolWindowStripe.tsx"),_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/ToolWindows/StyledToolWindowStripeButton.tsx"),_story_helpers__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/story-helpers.tsx");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/ToolWindow"},StyledStripe={render:props=>{const{anchor,empty}=props;return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{style:{height:"calc(100vh - 50px)"}},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_StyledToolWindowStripe__WEBPACK_IMPORTED_MODULE_1__.l,props,!empty&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_2__.jz,{active:!0,anchor},anchor," - Active"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_2__.jz,{anchor},anchor," - Inactive"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_StyledToolWindowStripe__WEBPACK_IMPORTED_MODULE_1__.K,null),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_2__.jz,{active:!0,anchor},anchor," - Split 1"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_2__.jz,{anchor},anchor," - Split 2"))))},argTypes:{empty:{type:"boolean"},anchor:{defaultValue:"left"}},parameters:{controls:{exclude:_story_helpers__WEBPACK_IMPORTED_MODULE_3__.q},component:_StyledToolWindowStripe__WEBPACK_IMPORTED_MODULE_1__.l}},__namedExportsOrder=["StyledStripe"];StyledStripe.parameters={...StyledStripe.parameters,docs:{...StyledStripe.parameters?.docs,source:{originalSource:'{\n  render: (props: StoryProps) => {\n    const {\n      anchor,\n      empty\n    } = props;\n    return <div style={{\n      height: "calc(100vh - 50px)"\n    }}>\n        <StyledToolWindowStripe {...props}>\n          {!empty && <>\n              <StyledToolWindowStripeButton active anchor={anchor}>\n                {anchor} - Active\n              </StyledToolWindowStripeButton>\n              <StyledToolWindowStripeButton anchor={anchor}>\n                {anchor} - Inactive\n              </StyledToolWindowStripeButton>\n              <StyledSpacer />\n              <StyledToolWindowStripeButton active anchor={anchor}>\n                {anchor} - Split 1\n              </StyledToolWindowStripeButton>\n              <StyledToolWindowStripeButton anchor={anchor}>\n                {anchor} - Split 2\n              </StyledToolWindowStripeButton>\n            </>}\n        </StyledToolWindowStripe>\n      </div>;\n  },\n  argTypes: newVar,\n  parameters: {\n    controls: {\n      exclude: styledComponentsControlsExclude\n    },\n    component: StyledToolWindowStripe\n  }\n}',...StyledStripe.parameters?.docs?.source}}}},"./src/Icon/StyledIconWrapper.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>StyledIconWrapper});var _styled__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styled.ts");const StyledIconWrapper=_styled__WEBPACK_IMPORTED_MODULE_0__.zo.span`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  width: ${({size=16})=>`${size}px`};
  height: ${({size=16})=>`${size}px`};
  position: relative; // to allow absolute positioned indicators and overlays on icon
  cursor: ${({role})=>"button"===role?"pointer":void 0};
`},"./src/Theme/Color.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{I:()=>Color});const numberPattern="[0-9]{0,3}.?[0-9]*",parseComponent=(componentStr,index)=>componentStr?index<3?parseInt(componentStr):Math.round(255*Math.min(parseFloat(componentStr),1)):void 0,parseHexRgba=str=>str.match(/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})?$/i)?.slice(1,5).map((i=>i?parseInt(i,16):void 0)),parseShorthandHex=str=>str.match(/^#?([0-9A-F])([0-9A-F])([0-9A-F])$/i)?.slice(1,4).map((i=>i?parseInt(i+i,16):void 0)),parseRgb=str=>str.match(new RegExp(`^rgb\\(\\s*(${numberPattern})\\s*,\\s*(${numberPattern})\\s*,\\s*(${numberPattern}\\s*)\\)$`))?.slice(1,5).map(parseComponent),parseRgba=str=>str.match(new RegExp(`^rgba\\(\\s*(${numberPattern})\\s*,\\s*(${numberPattern})\\s*,\\s*(${numberPattern})\\s*,\\s*(${numberPattern}\\s*)\\)$`))?.slice(1,5).map(parseComponent);class Color{r;g;b;a;static FACTOR=.7;constructor(rgba,g,b,a=255){let r;"string"==typeof rgba?[r=NaN,g=NaN,b=NaN,a=255]=(str=>{const result=[parseHexRgba,parseShorthandHex,parseRgb,parseRgba].reduce(((result,parse)=>result||parse(str)),void 0);return Array.isArray(result)&&result.slice(0,3).every((c=>Number.isInteger(c)))?result:null})(rgba)||[]:rgba instanceof Color?[r,g,b,a]=[rgba.r,rgba.g,rgba.b,rgba.a]:r=rgba,this.r=r,this.g=g,this.b=b,this.a=a<1?Math.round(255*a):a}isValid(){return Number.isInteger(this.r)&&Number.isInteger(this.g)&&Number.isInteger(this.b)&&Number.isInteger(this.a)}withTransparency(alpha){return new Color(this.r,this.g,this.b,alpha)}brighter(){let{r,g,b,a:alpha}=this;const int=Math.floor,FACTOR=Color.FACTOR;let i=int(1/(1-FACTOR));return 0==r&&0==g&&0==b?new Color(i,i,i,alpha):(r>0&&r<i&&(r=i),g>0&&g<i&&(g=i),b>0&&b<i&&(b=i),new Color(Math.min(int(r/FACTOR),255),Math.min(int(g/FACTOR),255),Math.min(int(b/FACTOR),255),alpha))}darker(){const FACTOR=Color.FACTOR,int=Math.floor;return new Color(Math.max(int(this.r*FACTOR),0),Math.max(int(this.g*FACTOR),0),Math.max(int(this.b*FACTOR),0),this.a)}static brighter(color){return new Color(color).brighter().toString()}blend(colorOrColorString){const color="string"==typeof colorOrColorString?new Color(colorOrColorString):colorOrColorString,getBlendedValue=component=>Math.round(color.a/255*color[component]+this.a/255*(1-color.a/255)*this[component]);return new Color(getBlendedValue("r"),getBlendedValue("g"),getBlendedValue("b"))}toString(){const toString=component=>Number.isNaN(component)?"":component.toString(16).padStart(2,"0");return`#${toString(this.r)}${toString(this.g)}${toString(this.b)}${255===this.a?"":toString(this.a)}`}}},"./src/ToolWindows/StyledToolWindowStripe.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{K:()=>StyledSpacer,l:()=>StyledToolWindowStripe});var _StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/ToolWindows/StyledToolWindowStripeButton.tsx"),_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/ToolWindows/utils.ts"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),_styled__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/styled.ts"),_Theme_Color__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Theme/Color.ts");const minHeight=`calc(${_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_0__.A6} + ${2*_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_0__.Mk+1}px)`,StyledToolWindowStripe=_styled__WEBPACK_IMPORTED_MODULE_3__.zo.div`
  box-sizing: border-box;
  background: ${({theme,highlighted})=>highlighted?_Theme_Color__WEBPACK_IMPORTED_MODULE_4__.I.brighter(theme.commonColors.panelBackground):theme.commonColors.panelBackground};
  display: inline-flex;
  overflow: hidden;
  ${({anchor,theme})=>styled_components__WEBPACK_IMPORTED_MODULE_2__.iv`border-${(0,_utils__WEBPACK_IMPORTED_MODULE_1__.vo)(anchor)}: 1px solid ${theme.commonColors.contrastBorder}`};
  ${({anchor,preventCollapse})=>(0,_utils__WEBPACK_IMPORTED_MODULE_1__.m$)(anchor)?styled_components__WEBPACK_IMPORTED_MODULE_2__.iv`
        flex-direction: row;
        width: 100%;
        min-height: ${preventCollapse?minHeight:"fit-content"};
        ${_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_0__.jz} {
          height: 1.25rem;
        }
      `:styled_components__WEBPACK_IMPORTED_MODULE_2__.iv`
        flex-direction: column;
        height: 100%;
        min-width: ${preventCollapse?minHeight:"fit-content"};
        ${_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_0__.jz} {
          width: 1.25rem;
        }
      `}
`,StyledSpacer=_styled__WEBPACK_IMPORTED_MODULE_3__.zo.div`
  flex: 1;
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
`},"./src/ToolWindows/utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ss:()=>getAnchorOrientation,m$:()=>isHorizontalToolWindow,vo:()=>theOtherSide});const getAnchorOrientation=anchor=>isHorizontalToolWindow(anchor)?"horizontal":"vertical",isHorizontalToolWindow=anchor=>"top"===anchor||"bottom"===anchor,theOtherSide=anchor=>({left:"right",right:"left",top:"bottom",bottom:"top"}[anchor])},"./src/story-helpers.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{q:()=>styledComponentsControlsExclude});__webpack_require__("../../node_modules/react/index.js");const styledComponentsControlsExclude=["theme","as","forwardedAs","ref"]},"./src/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Fg:()=>useTheme,iv:()=>css,zo:()=>styled});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const styled=styled_components__WEBPACK_IMPORTED_MODULE_0__.ZP,useTheme=styled_components__WEBPACK_IMPORTED_MODULE_0__.Fg,css=styled_components__WEBPACK_IMPORTED_MODULE_0__.iv;styled_components__WEBPACK_IMPORTED_MODULE_0__.Sf}}]);
//# sourceMappingURL=ToolWindows-stories-StyledStripe-stories.18b1875d.iframe.bundle.js.map