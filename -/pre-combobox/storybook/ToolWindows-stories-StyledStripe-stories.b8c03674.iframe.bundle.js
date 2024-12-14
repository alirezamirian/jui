"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[8458],{"./src/ToolWindows/stories/StyledStripe.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{StyledStripe:()=>StyledStripe,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var _StyledToolWindowStripe__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/ToolWindows/StyledToolWindowStripe.tsx"),_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/ToolWindows/StyledToolWindowStripeButton.tsx"),_story_helpers__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/story-helpers.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/ToolWindow"},StyledStripe={render:props=>{const{anchor,empty}=props;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{height:"calc(100vh - 50px)"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_StyledToolWindowStripe__WEBPACK_IMPORTED_MODULE_2__.l,{...props,children:!empty&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_3__.jz,{active:!0,anchor,children:[anchor," - Active"]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_3__.jz,{anchor,children:[anchor," - Inactive"]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_StyledToolWindowStripe__WEBPACK_IMPORTED_MODULE_2__.K,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_3__.jz,{active:!0,anchor,children:[anchor," - Split 1"]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_3__.jz,{anchor,children:[anchor," - Split 2"]})]})})})},argTypes:{empty:{type:"boolean"},anchor:{defaultValue:"left"}},parameters:{controls:{exclude:_story_helpers__WEBPACK_IMPORTED_MODULE_4__.q},component:_StyledToolWindowStripe__WEBPACK_IMPORTED_MODULE_2__.l}};StyledStripe.parameters={...StyledStripe.parameters,docs:{...StyledStripe.parameters?.docs,source:{originalSource:'{\n  render: (props: StoryProps) => {\n    const {\n      anchor,\n      empty\n    } = props;\n    return <div style={{\n      height: "calc(100vh - 50px)"\n    }}>\n        <StyledToolWindowStripe {...props}>\n          {!empty && <>\n              <StyledToolWindowStripeButton active anchor={anchor}>\n                {anchor} - Active\n              </StyledToolWindowStripeButton>\n              <StyledToolWindowStripeButton anchor={anchor}>\n                {anchor} - Inactive\n              </StyledToolWindowStripeButton>\n              <StyledSpacer />\n              <StyledToolWindowStripeButton active anchor={anchor}>\n                {anchor} - Split 1\n              </StyledToolWindowStripeButton>\n              <StyledToolWindowStripeButton anchor={anchor}>\n                {anchor} - Split 2\n              </StyledToolWindowStripeButton>\n            </>}\n        </StyledToolWindowStripe>\n      </div>;\n  },\n  argTypes: newVar,\n  parameters: {\n    controls: {\n      exclude: styledComponentsControlsExclude\n    },\n    component: StyledToolWindowStripe\n  }\n}',...StyledStripe.parameters?.docs?.source}}};const __namedExportsOrder=["StyledStripe"]},"./src/Icon/StyledIconWrapper.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>StyledIconWrapper});var _styled__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styled.ts");const StyledIconWrapper=_styled__WEBPACK_IMPORTED_MODULE_0__.zo.span`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  width: ${({size=16})=>`${size}px`};
  height: ${({size=16})=>`${size}px`};
  position: relative; // to allow absolute positioned indicators and overlays on icon
  cursor: ${({role})=>"button"===role?"pointer":void 0};
`;try{StyledIconWrapper.displayName="StyledIconWrapper",StyledIconWrapper.__docgenInfo={description:"",displayName:"StyledIconWrapper",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"number"}},useCurrentColor:{defaultValue:null,description:"",name:"useCurrentColor",required:!1,type:{name:"boolean"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme<KnownThemePropertyPath>"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Icon/StyledIconWrapper.tsx#StyledIconWrapper"]={docgenInfo:StyledIconWrapper.__docgenInfo,name:"StyledIconWrapper",path:"src/Icon/StyledIconWrapper.tsx#StyledIconWrapper"})}catch(__react_docgen_typescript_loader_error){}},"./src/Theme/Color.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{I:()=>Color});const numberPattern="[0-9]{0,3}.?[0-9]*",parseComponent=(componentStr,index)=>componentStr?index<3?parseInt(componentStr):Math.round(255*Math.min(parseFloat(componentStr),1)):void 0,parseHexRgba=str=>str.match(/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})?$/i)?.slice(1,5).map((i=>i?parseInt(i,16):void 0)),parseShorthandHex=str=>str.match(/^#?([0-9A-F])([0-9A-F])([0-9A-F])$/i)?.slice(1,4).map((i=>i?parseInt(i+i,16):void 0)),parseRgb=str=>str.match(new RegExp(`^rgb\\(\\s*(${numberPattern})\\s*,\\s*(${numberPattern})\\s*,\\s*(${numberPattern}\\s*)\\)$`))?.slice(1,5).map(parseComponent),parseRgba=str=>str.match(new RegExp(`^rgba\\(\\s*(${numberPattern})\\s*,\\s*(${numberPattern})\\s*,\\s*(${numberPattern})\\s*,\\s*(${numberPattern}\\s*)\\)$`))?.slice(1,5).map(parseComponent);function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}class Color{constructor(rgba,g,b,a=255){let r;_defineProperty(this,"r",void 0),_defineProperty(this,"g",void 0),_defineProperty(this,"b",void 0),_defineProperty(this,"a",void 0),"string"==typeof rgba?[r=NaN,g=NaN,b=NaN,a=255]=(str=>{const result=[parseHexRgba,parseShorthandHex,parseRgb,parseRgba].reduce(((result,parse)=>result||parse(str)),void 0);return Array.isArray(result)&&result.slice(0,3).every((c=>Number.isInteger(c)))?result:null})(rgba)||[]:rgba instanceof Color?[r,g,b,a]=[rgba.r,rgba.g,rgba.b,rgba.a]:r=rgba,this.r=r,this.g=g,this.b=b,this.a=a<1?Math.round(255*a):a}isValid(){return Number.isInteger(this.r)&&Number.isInteger(this.g)&&Number.isInteger(this.b)&&Number.isInteger(this.a)}withTransparency(alpha){return new Color(this.r,this.g,this.b,alpha)}brighter(){let{r,g,b,a:alpha}=this;const int=Math.floor,FACTOR=Color.FACTOR;let i=int(1/(1-FACTOR));return 0==r&&0==g&&0==b?new Color(i,i,i,alpha):(r>0&&r<i&&(r=i),g>0&&g<i&&(g=i),b>0&&b<i&&(b=i),new Color(Math.min(int(r/FACTOR),255),Math.min(int(g/FACTOR),255),Math.min(int(b/FACTOR),255),alpha))}darker(){const FACTOR=Color.FACTOR,int=Math.floor;return new Color(Math.max(int(this.r*FACTOR),0),Math.max(int(this.g*FACTOR),0),Math.max(int(this.b*FACTOR),0),this.a)}static brighter(color){return new Color(color).brighter().toString()}blend(colorOrColorString){const color="string"==typeof colorOrColorString?new Color(colorOrColorString):colorOrColorString,getBlendedValue=component=>Math.round(color.a/255*color[component]+this.a/255*(1-color.a/255)*this[component]);return new Color(getBlendedValue("r"),getBlendedValue("g"),getBlendedValue("b"))}toString(){const toString=component=>Number.isNaN(component)?"":component.toString(16).padStart(2,"0");return`#${toString(this.r)}${toString(this.g)}${toString(this.b)}${255===this.a?"":toString(this.a)}`}}_defineProperty(Color,"FACTOR",.7)},"./src/ToolWindows/StyledToolWindowStripe.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{K:()=>StyledSpacer,l:()=>StyledToolWindowStripe});var _StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/ToolWindows/StyledToolWindowStripeButton.tsx"),_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/ToolWindows/utils.ts"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),_styled__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/styled.ts"),_Theme_Color__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Theme/Color.ts");const minHeight=`calc(${_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_0__.A6} + ${2*_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_0__.Mk+1}px)`,StyledToolWindowStripe=_styled__WEBPACK_IMPORTED_MODULE_3__.zo.div`
  box-sizing: border-box;
  background: ${({theme,highlighted})=>highlighted?_Theme_Color__WEBPACK_IMPORTED_MODULE_4__.I.brighter(theme.commonColors.panelBackground):theme.commonColors.panelBackground};
  display: inline-flex;
  overflow: hidden;
  ${({anchor,theme})=>(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.iv)(["border-",":1px solid ",""],(0,_utils__WEBPACK_IMPORTED_MODULE_1__.vo)(anchor),theme.commonColors.contrastBorder)};
  ${({anchor,preventCollapse})=>(0,_utils__WEBPACK_IMPORTED_MODULE_1__.m$)(anchor)?(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.iv)(["flex-direction:row;width:100%;min-height:",";","{height:1.25rem;}"],preventCollapse?minHeight:"fit-content",_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_0__.jz):(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.iv)(["flex-direction:column;height:100%;min-width:",";","{width:1.25rem;}"],preventCollapse?minHeight:"fit-content",_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_0__.jz)}
`,StyledSpacer=_styled__WEBPACK_IMPORTED_MODULE_3__.zo.div`
  flex: 1;
`;try{StyledToolWindowStripe.displayName="StyledToolWindowStripe",StyledToolWindowStripe.__docgenInfo={description:"",displayName:"StyledToolWindowStripe",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},anchor:{defaultValue:null,description:"",name:"anchor",required:!0,type:{name:"enum",value:[{value:'"bottom"'},{value:'"top"'},{value:'"left"'},{value:'"right"'}]}},preventCollapse:{defaultValue:null,description:"",name:"preventCollapse",required:!1,type:{name:"boolean"}},highlighted:{defaultValue:null,description:"",name:"highlighted",required:!1,type:{name:"boolean"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme<KnownThemePropertyPath>"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ToolWindows/StyledToolWindowStripe.tsx#StyledToolWindowStripe"]={docgenInfo:StyledToolWindowStripe.__docgenInfo,name:"StyledToolWindowStripe",path:"src/ToolWindows/StyledToolWindowStripe.tsx#StyledToolWindowStripe"})}catch(__react_docgen_typescript_loader_error){}try{StyledSpacer.displayName="StyledSpacer",StyledSpacer.__docgenInfo={description:"",displayName:"StyledSpacer",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme<KnownThemePropertyPath>"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ToolWindows/StyledToolWindowStripe.tsx#StyledSpacer"]={docgenInfo:StyledSpacer.__docgenInfo,name:"StyledSpacer",path:"src/ToolWindows/StyledToolWindowStripe.tsx#StyledSpacer"})}catch(__react_docgen_typescript_loader_error){}},"./src/ToolWindows/StyledToolWindowStripeButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A6:()=>STRIPE_BUTTON_LINE_HEIGHT,Mk:()=>STRIPE_BUTTON_CROSS_PADDING,jz:()=>StyledToolWindowStripeButton});var _Icon_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/Icon/StyledIconWrapper.tsx"),_styled__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/styled.ts"),styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const STRIPE_BUTTON_CROSS_PADDING=2.5,STRIPE_BUTTON_LINE_HEIGHT="1rem",StyledToolWindowStripeButton=_styled__WEBPACK_IMPORTED_MODULE_2__.zo.span`
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

  ${({anchor})=>"horizontal"===("left"===anchor||"right"===anchor?"vertical":"horizontal")?(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.iv)(["padding:","px 10px;"],STRIPE_BUTTON_CROSS_PADDING):(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.iv)(["padding:10px ","px;writing-mode:vertical-lr;transform:",";","{transform:rotate(180deg);}"],STRIPE_BUTTON_CROSS_PADDING,"left"===anchor?"rotateZ(180deg)":void 0,_Icon_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_1__.M)}
  ${({active})=>!active&&(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.iv)(["&:hover{background:",";}"],(({theme})=>theme.color("ToolWindow.Button.hoverBackground",theme.dark?"rgba(15,15,15,.156)":"rgba(85,85,85,.156)")))};
`;try{StyledToolWindowStripeButton.displayName="StyledToolWindowStripeButton",StyledToolWindowStripeButton.__docgenInfo={description:"",displayName:"StyledToolWindowStripeButton",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},active:{defaultValue:null,description:"",name:"active",required:!1,type:{name:"boolean"}},anchor:{defaultValue:null,description:"",name:"anchor",required:!0,type:{name:"enum",value:[{value:'"bottom"'},{value:'"top"'},{value:'"left"'},{value:'"right"'}]}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme<KnownThemePropertyPath>"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ToolWindows/StyledToolWindowStripeButton.tsx#StyledToolWindowStripeButton"]={docgenInfo:StyledToolWindowStripeButton.__docgenInfo,name:"StyledToolWindowStripeButton",path:"src/ToolWindows/StyledToolWindowStripeButton.tsx#StyledToolWindowStripeButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/ToolWindows/utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ss:()=>getAnchorOrientation,m$:()=>isHorizontalToolWindow,vo:()=>theOtherSide});const getAnchorOrientation=anchor=>isHorizontalToolWindow(anchor)?"horizontal":"vertical",isHorizontalToolWindow=anchor=>"top"===anchor||"bottom"===anchor,theOtherSide=anchor=>({left:"right",right:"left",top:"bottom",bottom:"top"}[anchor])},"./src/story-helpers.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{q:()=>styledComponentsControlsExclude});const styledComponentsControlsExclude=["theme","as","forwardedAs","ref"]},"./src/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Fg:()=>useTheme,iv:()=>css,zo:()=>styled});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const styled=styled_components__WEBPACK_IMPORTED_MODULE_0__.ZP,useTheme=styled_components__WEBPACK_IMPORTED_MODULE_0__.Fg,css=styled_components__WEBPACK_IMPORTED_MODULE_0__.iv;styled_components__WEBPACK_IMPORTED_MODULE_0__.Sf}}]);
//# sourceMappingURL=ToolWindows-stories-StyledStripe-stories.b8c03674.iframe.bundle.js.map