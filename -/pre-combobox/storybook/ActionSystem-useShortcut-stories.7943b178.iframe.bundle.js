"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[9396],{"./src/ActionSystem/useShortcut.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ConflictingShortcuts:()=>ConflictingShortcuts,Default:()=>Default,MultiKeyStroke:()=>MultiKeyStroke,SecondKeyStrokePriority:()=>SecondKeyStrokePriority,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_Theme__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Theme/Color.ts"),_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/styled.ts"),_useShortcut__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/ActionSystem/useShortcut.ts"),_shortcutToString__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/ActionSystem/shortcutToString.ts"),_Shortcut__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/ActionSystem/Shortcut.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"ActionSystem/useShortcut",args:{},argTypes:{onAction:{type:"function"}}},StyledContainer=_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_2__.zo.div`
  color: ${({theme})=>theme.color("*.foreground")};
  padding: 0.5rem;
  &:focus {
    outline: none;
    background: ${({theme})=>_intellij_platform_core_Theme__WEBPACK_IMPORTED_MODULE_3__.I.brighter(theme.commonColors.panelBackground)};
  }
  &:focus::after {
    content: "Focused. Type to trigger keyboard shortcuts";
    position: absolute;
    margin-top: 0.75rem;
    font-size: 0.85em;
    color: ${({theme})=>theme.commonColors.inactiveTextColor};
  }
  table {
    width: 400px;
    max-width: 100%;
  }
  th {
    text-align: left;
  }
`,Template=({onAction,shortcuts})=>{const{shortcutHandlerProps}=(0,_useShortcut__WEBPACK_IMPORTED_MODULE_4__.X)(shortcuts,onAction),ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{ref.current?.focus()})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{...shortcutHandlerProps,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(StyledContainer,{tabIndex:0,ref,onClick:()=>ref.current?.focus(),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("table",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("thead",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th",{children:"Action ID"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th",{children:"Keyboard Shortcuts"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("tbody",{children:Object.entries(shortcuts).map((([actionId,shortcuts])=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{children:actionId}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{children:shortcuts.filter(_Shortcut__WEBPACK_IMPORTED_MODULE_5__.e).map((shortcut=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:(0,_shortcutToString__WEBPACK_IMPORTED_MODULE_6__.W)(shortcut)})))})]},actionId)))})]})})})};Template.displayName="Template";const Default=Template.bind(null);Default.args={shortcuts:{action1:[{type:"keyboard",firstKeyStroke:{modifiers:["Control"],code:"KeyC"}}]}};const MultiKeyStroke=Template.bind(null);MultiKeyStroke.args={shortcuts:{action1:[{type:"keyboard",firstKeyStroke:{modifiers:["Control"],code:"KeyC"},secondKeyStroke:{code:"KeyD"}}]}};const SecondKeyStrokePriority=Template.bind(null);SecondKeyStrokePriority.args={shortcuts:{action1:[{type:"keyboard",firstKeyStroke:{code:"KeyD"}}],action2:[{type:"keyboard",firstKeyStroke:{modifiers:["Control"],code:"KeyC"},secondKeyStroke:{code:"KeyD"}}]}};const ConflictingShortcuts=Template.bind(null);ConflictingShortcuts.args={shortcuts:{action1:[{type:"keyboard",firstKeyStroke:{code:"KeyD"}}],action2:[{type:"keyboard",firstKeyStroke:{code:"KeyD"}}]}},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"Template.bind(null)",...Default.parameters?.docs?.source}}},MultiKeyStroke.parameters={...MultiKeyStroke.parameters,docs:{...MultiKeyStroke.parameters?.docs,source:{originalSource:"Template.bind(null)",...MultiKeyStroke.parameters?.docs?.source}}},SecondKeyStrokePriority.parameters={...SecondKeyStrokePriority.parameters,docs:{...SecondKeyStrokePriority.parameters?.docs,source:{originalSource:"Template.bind(null)",...SecondKeyStrokePriority.parameters?.docs?.source}}},ConflictingShortcuts.parameters={...ConflictingShortcuts.parameters,docs:{...ConflictingShortcuts.parameters?.docs,source:{originalSource:"Template.bind(null)",...ConflictingShortcuts.parameters?.docs?.source}}};const __namedExportsOrder=["Default","MultiKeyStroke","SecondKeyStrokePriority","ConflictingShortcuts"]},"./src/ActionSystem/Shortcut.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>supportedModifiers,e:()=>isKeyboardShortcut});const isKeyboardShortcut=shortcut=>"keyboard"===shortcut.type,supportedModifiers=["Alt","Meta","Shift","Control"]},"./src/ActionSystem/shortcutToString.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>shortcutToString});var ramda__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/fromPairs.js"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/platform.mjs"),_Shortcut__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/ActionSystem/Shortcut.ts");const defaultKeyToStr={Control:"Ctrl"," ":"Space",ArrowDown:"↓",ArrowUp:"↑",ArrowLeft:"←",ArrowRight:"→",Enter:"⏎",Quote:"'",Minus:"-",Equal:"+",Backspace:"⌫",...(0,ramda__WEBPACK_IMPORTED_MODULE_0__.Z)(Array.from(Array(26)).map(((e,i)=>i+"a".charCodeAt(0))).map((x=>String.fromCharCode(x))).map((a=>[a,a.toUpperCase()])))},KeystrokeToString=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.V5)()?{separator:"",codeToStr:{...defaultKeyToStr,Alt:"⌥",Shift:"⇧",Meta:"⌘",Control:"^",Escape:"⎋"}}:{separator:"+",codeToStr:defaultKeyToStr},modifiersOrder=["Control","Alt","Shift","Meta"],keystrokeToString=keystroke=>[...(keystroke.modifiers||[]).sort(((a,b)=>modifiersOrder.indexOf(a)-modifiersOrder.indexOf(b))),keystroke.code].map((code=>KeystrokeToString.codeToStr[code]||code)).map((code=>code.replace(/^(Key|Digit|Numpad)(.)$/,"$2"))).join(KeystrokeToString.separator),shortcutToString=shortcut=>{if((0,_Shortcut__WEBPACK_IMPORTED_MODULE_2__.e)(shortcut))return[shortcut.firstKeyStroke,shortcut.secondKeyStroke].filter((i=>null!=i)).map(keystrokeToString).join(", ");throw new Error("Not implemented yet")}},"./src/ActionSystem/useShortcut.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>useShortcuts});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_utils_useEventCallback__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/utils/useEventCallback.ts"),_Shortcut__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/ActionSystem/Shortcut.ts");function useShortcuts(shortcuts,onAction,{useCapture=!1}={}){const firstKeyActivatedShortcutsRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]),secondStrokeResetTimerIdRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),onKeyDown=(0,_intellij_platform_core_utils_useEventCallback__WEBPACK_IMPORTED_MODULE_1__.$)((e=>{if(!function isModifierOnly(event){return 1===event.location||2===event.location}(e.nativeEvent)&&!e.repeat)if(null!==secondStrokeResetTimerIdRef.current&&window.clearTimeout(secondStrokeResetTimerIdRef.current),firstKeyActivatedShortcutsRef.current.length>0)firstKeyActivatedShortcutsRef.current.some((({shortcut,actionId})=>{if(isKeyMatch(shortcut.secondKeyStroke,e,!0))return triggerAction(actionId),!0})),firstKeyActivatedShortcutsRef.current=[];else{const firstKeyMatches=Object.entries(shortcuts).flatMap((([actionId,shortcuts])=>shortcuts.map((shortcut=>({actionId,shortcut}))))).filter((input=>(0,_Shortcut__WEBPACK_IMPORTED_MODULE_2__.e)(input.shortcut))).filter((({shortcut})=>isKeyMatch(shortcut.firstKeyStroke,e)));firstKeyActivatedShortcutsRef.current=firstKeyMatches.filter((({shortcut,actionId})=>shortcut.secondKeyStroke)),firstKeyActivatedShortcutsRef.current.length>0?(secondStrokeResetTimerIdRef.current=window.setTimeout((()=>{firstKeyActivatedShortcutsRef.current=[]}),2e3),document.addEventListener("keydown",(()=>{document.addEventListener("keyup",(()=>{firstKeyActivatedShortcutsRef.current=[]}),{once:!0})}),{once:!0,capture:!0})):firstKeyMatches.length>0&&triggerAction(firstKeyMatches[0].actionId)}function triggerAction(actionId){!1!==onAction(actionId,{event:e})&&(e.stopPropagation(),e.preventDefault())}}));return{shortcutHandlerProps:{[useCapture?"onKeyDownCapture":"onKeyDown"]:onKeyDown}}}const isKeyMatch=(keyStroke,e,loose)=>e.code===keyStroke?.code&&(loose?keyStroke.modifiers||[]:_Shortcut__WEBPACK_IMPORTED_MODULE_2__.V).every((modifier=>e.getModifierState(modifier)===Boolean(keyStroke.modifiers?.includes(modifier))))},"./src/Theme/Color.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{I:()=>Color});const numberPattern="[0-9]{0,3}.?[0-9]*",parseComponent=(componentStr,index)=>componentStr?index<3?parseInt(componentStr):Math.round(255*Math.min(parseFloat(componentStr),1)):void 0,parseHexRgba=str=>str.match(/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})?$/i)?.slice(1,5).map((i=>i?parseInt(i,16):void 0)),parseShorthandHex=str=>str.match(/^#?([0-9A-F])([0-9A-F])([0-9A-F])$/i)?.slice(1,4).map((i=>i?parseInt(i+i,16):void 0)),parseRgb=str=>str.match(new RegExp(`^rgb\\(\\s*(${numberPattern})\\s*,\\s*(${numberPattern})\\s*,\\s*(${numberPattern}\\s*)\\)$`))?.slice(1,5).map(parseComponent),parseRgba=str=>str.match(new RegExp(`^rgba\\(\\s*(${numberPattern})\\s*,\\s*(${numberPattern})\\s*,\\s*(${numberPattern})\\s*,\\s*(${numberPattern}\\s*)\\)$`))?.slice(1,5).map(parseComponent);function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}class Color{constructor(rgba,g,b,a=255){let r;_defineProperty(this,"r",void 0),_defineProperty(this,"g",void 0),_defineProperty(this,"b",void 0),_defineProperty(this,"a",void 0),"string"==typeof rgba?[r=NaN,g=NaN,b=NaN,a=255]=(str=>{const result=[parseHexRgba,parseShorthandHex,parseRgb,parseRgba].reduce(((result,parse)=>result||parse(str)),void 0);return Array.isArray(result)&&result.slice(0,3).every((c=>Number.isInteger(c)))?result:null})(rgba)||[]:rgba instanceof Color?[r,g,b,a]=[rgba.r,rgba.g,rgba.b,rgba.a]:r=rgba,this.r=r,this.g=g,this.b=b,this.a=a<1?Math.round(255*a):a}isValid(){return Number.isInteger(this.r)&&Number.isInteger(this.g)&&Number.isInteger(this.b)&&Number.isInteger(this.a)}withTransparency(alpha){return new Color(this.r,this.g,this.b,alpha)}brighter(){let{r,g,b,a:alpha}=this;const int=Math.floor,FACTOR=Color.FACTOR;let i=int(1/(1-FACTOR));return 0==r&&0==g&&0==b?new Color(i,i,i,alpha):(r>0&&r<i&&(r=i),g>0&&g<i&&(g=i),b>0&&b<i&&(b=i),new Color(Math.min(int(r/FACTOR),255),Math.min(int(g/FACTOR),255),Math.min(int(b/FACTOR),255),alpha))}darker(){const FACTOR=Color.FACTOR,int=Math.floor;return new Color(Math.max(int(this.r*FACTOR),0),Math.max(int(this.g*FACTOR),0),Math.max(int(this.b*FACTOR),0),this.a)}static brighter(color){return new Color(color).brighter().toString()}blend(colorOrColorString){const color="string"==typeof colorOrColorString?new Color(colorOrColorString):colorOrColorString,getBlendedValue=component=>Math.round(color.a/255*color[component]+this.a/255*(1-color.a/255)*this[component]);return new Color(getBlendedValue("r"),getBlendedValue("g"),getBlendedValue("b"))}toString(){const toString=component=>Number.isNaN(component)?"":component.toString(16).padStart(2,"0");return`#${toString(this.r)}${toString(this.g)}${toString(this.b)}${255===this.a?"":toString(this.a)}`}}_defineProperty(Color,"FACTOR",.7)},"./src/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Fg:()=>useTheme,iv:()=>css,zo:()=>styled});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const styled=styled_components__WEBPACK_IMPORTED_MODULE_0__.ZP,useTheme=styled_components__WEBPACK_IMPORTED_MODULE_0__.Fg,css=styled_components__WEBPACK_IMPORTED_MODULE_0__.iv;styled_components__WEBPACK_IMPORTED_MODULE_0__.Sf},"./src/utils/useEventCallback.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$:()=>useEventCallback});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function useEventCallback(fn){let ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();(0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)((()=>{ref.current=fn}));return(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(((...args)=>ref.current?.apply(null,args)),[])}},"./node_modules/ramda/es/fromPairs.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=(0,__webpack_require__("./node_modules/ramda/es/internal/_curry1.js").Z)((function fromPairs(pairs){for(var result={},idx=0;idx<pairs.length;)result[pairs[idx][0]]=pairs[idx][1],idx+=1;return result}))},"./node_modules/ramda/es/internal/_curry1.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_curry1});var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/internal/_isPlaceholder.js");function _curry1(fn){return function f1(a){return 0===arguments.length||(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(a)?f1:fn.apply(this,arguments)}}},"./node_modules/ramda/es/internal/_isPlaceholder.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _isPlaceholder(a){return null!=a&&"object"==typeof a&&!0===a["@@functional/placeholder"]}__webpack_require__.d(__webpack_exports__,{Z:()=>_isPlaceholder})}}]);