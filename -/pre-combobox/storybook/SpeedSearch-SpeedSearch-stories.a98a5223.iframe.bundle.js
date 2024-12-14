"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[3173],{"../../node_modules/@react-aria/interactions/dist/useFocusWithin.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L:()=>$9ab94262bd0047c7$export$420e68273165f4ec});var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/utils.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function $9ab94262bd0047c7$export$420e68273165f4ec(props){let{isDisabled,onBlurWithin,onFocusWithin,onFocusWithinChange}=props,state=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({isFocusWithin:!1}),onBlur=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>{state.current.isFocusWithin&&!e.currentTarget.contains(e.relatedTarget)&&(state.current.isFocusWithin=!1,onBlurWithin&&onBlurWithin(e),onFocusWithinChange&&onFocusWithinChange(!1))}),[onBlurWithin,onFocusWithinChange,state]),onSyntheticFocus=(0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.d)(onBlur),onFocus=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>{state.current.isFocusWithin||document.activeElement!==e.target||(onFocusWithin&&onFocusWithin(e),onFocusWithinChange&&onFocusWithinChange(!0),state.current.isFocusWithin=!0,onSyntheticFocus(e))}),[onFocusWithin,onFocusWithinChange,onSyntheticFocus]);return isDisabled?{focusWithinProps:{onFocus:void 0,onBlur:void 0}}:{focusWithinProps:{onFocus,onBlur}}}},"../../node_modules/@react-aria/interactions/dist/useKeyboard.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function $93925083ecbb358c$export$48d1ea6320830260(handler){if(!handler)return;let shouldStopPropagation=!0;return e=>{let event={...e,preventDefault(){e.preventDefault()},isDefaultPrevented:()=>e.isDefaultPrevented(),stopPropagation(){console.error("stopPropagation is now the default behavior for events in React Spectrum. You can use continuePropagation() to revert this behavior.")},continuePropagation(){shouldStopPropagation=!1}};handler(event),shouldStopPropagation&&e.stopPropagation()}}function $46d819fcbaf35654$export$8f71654801c2f7cd(props){return{keyboardProps:props.isDisabled?{}:{onKeyDown:$93925083ecbb358c$export$48d1ea6320830260(props.onKeyDown),onKeyUp:$93925083ecbb358c$export$48d1ea6320830260(props.onKeyUp)}}}__webpack_require__.d(__webpack_exports__,{v:()=>$46d819fcbaf35654$export$8f71654801c2f7cd})},"../../node_modules/@react-aria/interactions/dist/utils.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>$8a9cb279dc87e130$export$715c682d09d639cc});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useLayoutEffect.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useEffectEvent.mjs");class $8a9cb279dc87e130$export$905e7fc544a71f36{isDefaultPrevented(){return this.nativeEvent.defaultPrevented}preventDefault(){this.defaultPrevented=!0,this.nativeEvent.preventDefault()}stopPropagation(){this.nativeEvent.stopPropagation(),this.isPropagationStopped=()=>!0}isPropagationStopped(){return!1}persist(){}constructor(type,nativeEvent){this.nativeEvent=nativeEvent,this.target=nativeEvent.target,this.currentTarget=nativeEvent.currentTarget,this.relatedTarget=nativeEvent.relatedTarget,this.bubbles=nativeEvent.bubbles,this.cancelable=nativeEvent.cancelable,this.defaultPrevented=nativeEvent.defaultPrevented,this.eventPhase=nativeEvent.eventPhase,this.isTrusted=nativeEvent.isTrusted,this.timeStamp=nativeEvent.timeStamp,this.type=type}}function $8a9cb279dc87e130$export$715c682d09d639cc(onBlur){let stateRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({isFocused:!1,observer:null});(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.b)((()=>{const state=stateRef.current;return()=>{state.observer&&(state.observer.disconnect(),state.observer=null)}}),[]);let dispatchBlur=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.i)((e=>{null==onBlur||onBlur(e)}));return(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>{if(e.target instanceof HTMLButtonElement||e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement||e.target instanceof HTMLSelectElement){stateRef.current.isFocused=!0;let target=e.target,onBlurHandler=e=>{stateRef.current.isFocused=!1,target.disabled&&dispatchBlur(new $8a9cb279dc87e130$export$905e7fc544a71f36("blur",e)),stateRef.current.observer&&(stateRef.current.observer.disconnect(),stateRef.current.observer=null)};target.addEventListener("focusout",onBlurHandler,{once:!0}),stateRef.current.observer=new MutationObserver((()=>{if(stateRef.current.isFocused&&target.disabled){var _stateRef_current_observer;null===(_stateRef_current_observer=stateRef.current.observer)||void 0===_stateRef_current_observer||_stateRef_current_observer.disconnect();let relatedTargetEl=target===document.activeElement?null:document.activeElement;target.dispatchEvent(new FocusEvent("blur",{relatedTarget:relatedTargetEl})),target.dispatchEvent(new FocusEvent("focusout",{bubbles:!0,relatedTarget:relatedTargetEl}))}})),stateRef.current.observer.observe(target,{attributes:!0,attributeFilter:["disabled"]})}}),[dispatchBlur])}},"../../node_modules/@react-aria/utils/dist/useObjectRef.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>$df56164dff5785e2$export$4338b53315abf666});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function $df56164dff5785e2$export$4338b53315abf666(forwardedRef){const objRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>({get current(){return objRef.current},set current(value){objRef.current=value,"function"==typeof forwardedRef?forwardedRef(value):forwardedRef&&(forwardedRef.current=value)}})),[forwardedRef])}},"../../node_modules/@react-stately/utils/dist/useControlledState.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>$458b0a5536c1a7cf$export$40bfa8c7b0832715});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function $458b0a5536c1a7cf$export$40bfa8c7b0832715(value,defaultValue,onChange){let[stateValue,setStateValue]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value||defaultValue),isControlledRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(void 0!==value),isControlled=void 0!==value;(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{let wasControlled=isControlledRef.current;wasControlled!==isControlled&&console.warn(`WARN: A component changed from ${wasControlled?"controlled":"uncontrolled"} to ${isControlled?"controlled":"uncontrolled"}.`),isControlledRef.current=isControlled}),[isControlled]);let currentValue=isControlled?value:stateValue,setValue=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(((value,...args)=>{let onChangeCaller=(value,...onChangeArgs)=>{onChange&&(Object.is(currentValue,value)||onChange(value,...onChangeArgs)),isControlled||(currentValue=value)};if("function"==typeof value){console.warn("We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320"),setStateValue(((oldValue,...functionArgs)=>{let interceptedValue=value(isControlled?currentValue:oldValue,...functionArgs);return onChangeCaller(interceptedValue,...args),isControlled?oldValue:interceptedValue}))}else isControlled||setStateValue(value),onChangeCaller(value,...args)}),[isControlled,currentValue,onChange]);return[currentValue,setValue]}},"./src/SpeedSearch/SpeedSearch.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>SpeedSearch_stories});var react=__webpack_require__("../../node_modules/react/index.js"),useObjectRef=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs"),mergeProps=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),SpeedSearchContainer=__webpack_require__("./src/SpeedSearch/SpeedSearchContainer.tsx"),SpeedSearchPopup=__webpack_require__("./src/SpeedSearch/SpeedSearchPopup.tsx"),useSpeedSearch=__webpack_require__("./src/SpeedSearch/useSpeedSearch.tsx"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const SpeedSearch=react.forwardRef((function SpeedSearch({children,keepSearchActiveOnBlur=!1,className,containerProps={},match,...otherProps},forwardedRef){const ref=(0,useObjectRef.B)(forwardedRef),speedSearchState=(0,useSpeedSearch.Y)(otherProps),{containerProps:speedSearchContainerProps}=(0,useSpeedSearch.m)({keepSearchActiveOnBlur},speedSearchState,ref);return(0,jsx_runtime.jsxs)(SpeedSearchContainer.i,{tabIndex:-1,ref,...(0,mergeProps.d)(containerProps,speedSearchContainerProps,{className}),children:[(0,jsx_runtime.jsx)(SpeedSearchPopup.e,{active:speedSearchState.active,match,children:speedSearchState.searchTerm}),children]})}));try{SpeedSearch.displayName="SpeedSearch",SpeedSearch.__docgenInfo={description:"",displayName:"SpeedSearch",props:{keepSearchActiveOnBlur:{defaultValue:{value:"false"},description:"",name:"keepSearchActiveOnBlur",required:!1,type:{name:"boolean"}},match:{defaultValue:null,description:"",name:"match",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},containerProps:{defaultValue:{value:"{}"},description:"",name:"containerProps",required:!1,type:{name:'Omit<HTMLProps<HTMLDivElement>, "as" | "ref">'}},searchTerm:{defaultValue:null,description:"",name:"searchTerm",required:!1,type:{name:"string"}},isSearchActive:{defaultValue:null,description:"",name:"isSearchActive",required:!1,type:{name:"boolean"}},defaultSearchTerm:{defaultValue:null,description:"",name:"defaultSearchTerm",required:!1,type:{name:"string"}},defaultIsSearchActive:{defaultValue:null,description:"",name:"defaultIsSearchActive",required:!1,type:{name:"boolean"}},onSearchTermChange:{defaultValue:null,description:"",name:"onSearchTermChange",required:!1,type:{name:"((value: string) => void)"}},onIsSearchActiveChange:{defaultValue:null,description:"",name:"onIsSearchActiveChange",required:!1,type:{name:"((value: boolean) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/SpeedSearch/SpeedSearch.tsx#SpeedSearch"]={docgenInfo:SpeedSearch.__docgenInfo,name:"SpeedSearch",path:"src/SpeedSearch/SpeedSearch.tsx#SpeedSearch"})}catch(__react_docgen_typescript_loader_error){}var minusculeMatch=__webpack_require__("./src/minusculeMatch.ts"),TextWithHighlights=__webpack_require__("./src/TextWithHighlights/TextWithHighlights.tsx"),styled=__webpack_require__("./src/styled.ts");const SpeedSearch_stories={title:"Components/SpeedSearch",component:SpeedSearch},SpeedSearch_stories_SpeedSearchContainer=(0,styled.zo)(SpeedSearch)`
  width: 400px;
  margin-top: 25px;
  background: ${({theme})=>theme.commonColors.panelBackground};
  color: ${({theme})=>theme.color("*.textForeground")};
`,Default={render:({onSearchTermChange,onIsSearchActiveChange})=>{const[searchTerm,setSearchTerm]=(0,react.useState)(""),[isActive,setIsActive]=(0,react.useState)(!1);return(0,jsx_runtime.jsx)(SpeedSearch_stories_SpeedSearchContainer,{searchTerm,onSearchTermChange:searchTerm=>{setSearchTerm(searchTerm),onSearchTermChange?.(searchTerm)},isSearchActive:isActive,onIsSearchActiveChange:active=>{setIsActive(active),onIsSearchActiveChange?.(active)},match:!0,keepSearchActiveOnBlur:!0,children:(0,jsx_runtime.jsxs)("ul",{children:[(0,jsx_runtime.jsx)("li",{children:(0,jsx_runtime.jsx)(SearchableText,{searchTerm,children:"Item one."})}),(0,jsx_runtime.jsxs)("li",{children:[(0,jsx_runtime.jsx)(SearchableText,{searchTerm,children:"Item two."})," ",(0,jsx_runtime.jsx)("input",{})]}),(0,jsx_runtime.jsxs)("li",{children:[(0,jsx_runtime.jsx)(SearchableText,{searchTerm,children:"Paco de lucia"})," ",(0,jsx_runtime.jsx)("button",{children:"test"})]}),(0,jsx_runtime.jsxs)("li",{children:[(0,jsx_runtime.jsx)(SearchableText,{searchTerm,children:"Paco de lucia, godOfTheGuitar"})," ",(0,jsx_runtime.jsx)("button",{children:"test"})]}),(0,jsx_runtime.jsxs)("li",{children:[(0,jsx_runtime.jsx)("input",{type:"checkbox"}),(0,jsx_runtime.jsx)(SearchableText,{searchTerm,children:"Item four"})]})]})})}};function SearchableText({children,searchTerm}){const highlights=(0,react.useMemo)((()=>(0,minusculeMatch.M)(children,searchTerm)),[children,searchTerm]);return(0,jsx_runtime.jsx)(TextWithHighlights.x,{highlights,children})}SearchableText.displayName="SearchableText",Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  render: ({\n    onSearchTermChange,\n    onIsSearchActiveChange\n  }: {\n    onSearchTermChange?: (searchTerm: string) => void;\n    onIsSearchActiveChange?: (active: boolean) => void;\n  }) => {\n    const [searchTerm, setSearchTerm] = useState("");\n    const [isActive, setIsActive] = useState(false);\n    return <SpeedSearchContainer searchTerm={searchTerm} onSearchTermChange={searchTerm => {\n      setSearchTerm(searchTerm);\n      onSearchTermChange?.(searchTerm);\n    }} isSearchActive={isActive} onIsSearchActiveChange={active => {\n      setIsActive(active);\n      onIsSearchActiveChange?.(active);\n    }} match // search is done within the searchable text component in this dummy example, and we don\'t have information about match.\n    keepSearchActiveOnBlur>\n        <ul>\n          <li>\n            <SearchableText searchTerm={searchTerm}>Item one.</SearchableText>\n          </li>\n          <li>\n            <SearchableText searchTerm={searchTerm}>Item two.</SearchableText>{" "}\n            <input />\n          </li>\n          <li>\n            <SearchableText searchTerm={searchTerm}>\n              Paco de lucia\n            </SearchableText>{" "}\n            <button>test</button>\n          </li>\n          <li>\n            <SearchableText searchTerm={searchTerm}>\n              Paco de lucia, godOfTheGuitar\n            </SearchableText>{" "}\n            <button>test</button>\n          </li>\n          <li>\n            <input type="checkbox" />\n            <SearchableText searchTerm={searchTerm}>Item four</SearchableText>\n          </li>\n        </ul>\n      </SpeedSearchContainer>;\n  }\n}',...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/Collections/ItemStateContext.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>ItemStateContext});const ItemStateContext=__webpack_require__("../../node_modules/react/index.js").createContext(null)},"./src/Icon/PlatformIcon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{qb:()=>amendName,vq:()=>PlatformIcon});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_utils_useForwardedRef__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/utils/useForwardedRef.ts"),_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/styled.ts"),_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/Icon/StyledIconWrapper.tsx"),_useSvgIcon__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Icon/useSvgIcon.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const amendName=(iconNameOrPath,amendment)=>{const[name,ext]=iconNameOrPath.split(".");return`${name}${amendment}${ext?`.${ext}`:""}`},getPlatformIconPath=relativePath=>relativePath.startsWith("/")?relativePath.slice(1):`platform/icons/src/${relativePath}`,PlatformIcon=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((({icon,darkIcon,...props},forwardedRef)=>{const ref=(0,_intellij_platform_core_utils_useForwardedRef__WEBPACK_IMPORTED_MODULE_2__.Z)(forwardedRef),iconName=(0,_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_3__.Fg)().dark?((path,darkPath)=>{const[name,ext]=path.split(".");return darkPath||`${name}_dark${ext?`.${ext}`:""}`})(icon,darkIcon):icon;return(0,_useSvgIcon__WEBPACK_IMPORTED_MODULE_4__.Z)({path:getPlatformIconPath(iconName),fallbackPath:getPlatformIconPath(icon)},ref),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_5__.M,{...props,ref})}));try{PlatformIcon.displayName="PlatformIcon",PlatformIcon.__docgenInfo={description:"Renders an icon from the predefined list of platform icons.\nicon name must follow the directory structure in platform icons.",displayName:"PlatformIcon",props:{icon:{defaultValue:null,description:'Icon path in intellij platform repo.\nIf starts with "/", the path will be from the repo root. Otherwise, it\'s relative to "platform/icons/src".\n".svg" extension is optional.',name:"icon",required:!0,type:{name:"string"}},darkIcon:{defaultValue:null,description:"Similar to icon, but for dark themes.",name:"darkIcon",required:!1,type:{name:"string"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"number"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},children:{defaultValue:null,description:"Additional node going into the icon wrapper. Such as indicators.",name:"children",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Icon/PlatformIcon.tsx#PlatformIcon"]={docgenInfo:PlatformIcon.__docgenInfo,name:"PlatformIcon",path:"src/Icon/PlatformIcon.tsx#PlatformIcon"})}catch(__react_docgen_typescript_loader_error){}},"./src/Icon/StyledIconWrapper.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>StyledIconWrapper});var _styled__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styled.ts");const StyledIconWrapper=_styled__WEBPACK_IMPORTED_MODULE_0__.zo.span`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  width: ${({size=16})=>`${size}px`};
  height: ${({size=16})=>`${size}px`};
  position: relative; // to allow absolute positioned indicators and overlays on icon
  cursor: ${({role})=>"button"===role?"pointer":void 0};
`;try{StyledIconWrapper.displayName="StyledIconWrapper",StyledIconWrapper.__docgenInfo={description:"",displayName:"StyledIconWrapper",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"number"}},useCurrentColor:{defaultValue:null,description:"",name:"useCurrentColor",required:!1,type:{name:"boolean"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme<KnownThemePropertyPath>"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Icon/StyledIconWrapper.tsx#StyledIconWrapper"]={docgenInfo:StyledIconWrapper.__docgenInfo,name:"StyledIconWrapper",path:"src/Icon/StyledIconWrapper.tsx#StyledIconWrapper"})}catch(__react_docgen_typescript_loader_error){}},"./src/Icon/useSvgIcon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>useSvgIcon});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/styled.ts"),_intellij_platform_core_Collections__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Collections/ItemStateContext.tsx");function useSvgIcon({path,fallbackPath},ref){const theme=(0,_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__.Fg)(),itemState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_intellij_platform_core_Collections__WEBPACK_IMPORTED_MODULE_2__.k),selected=itemState?.isSelected||itemState?.isContainerFocused;(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{let unmounted=!1;return(async()=>{if(!path)return void console.error("icon path is empty");ref.current&&(ref.current.ariaBusy="true");const svg=await theme.getSvgIcon(path,selected).catch((e=>{if(fallbackPath)return theme.getSvgIcon(fallbackPath,selected);throw e})).finally((()=>{ref?.current&&(ref.current.ariaBusy="false")}));if(svg){const element=ref?.current;if(!unmounted&&element){element.querySelector("svg")?.remove();const svgElement=document.createElement("svg");element.appendChild(svgElement),svgElement.outerHTML=function makeIdsUnique(svg){const randomPostfix=(1e3*Math.random()).toFixed(0),idMatches=svg.matchAll(/id="(.*?)"/g);return[...idMatches].reduce(((modifiedSvg,[_,id])=>{const newId=`${id}-${randomPostfix}`;return replaceAll(`id="${id}"`,`id="${newId}"`,replaceAll(`url(#${id})`,`url(#${newId})`,modifiedSvg))}),svg)}(svg)}}else console.error("Could not resolve icon:",path)})().catch(console.error),()=>{unmounted=!0}}),[path,selected])}function replaceAll(theOld,theNew,str){const replaced=str.replace(theOld,theNew),replacedAgain=replaced.replace(theOld,theNew);return replaced===replacedAgain?replaced:replaceAll(theOld,theNew,replacedAgain)}},"./src/SpeedSearch/SpeedSearchContainer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>SpeedSearchContainer});const SpeedSearchContainer=__webpack_require__("./src/styled.ts").zo.div`
  position: relative;
  overflow: visible;
  max-height: 100%;
`;try{SpeedSearchContainer.displayName="SpeedSearchContainer",SpeedSearchContainer.__docgenInfo={description:"",displayName:"SpeedSearchContainer",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme<KnownThemePropertyPath>"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/SpeedSearch/SpeedSearchContainer.tsx#SpeedSearchContainer"]={docgenInfo:SpeedSearchContainer.__docgenInfo,name:"SpeedSearchContainer",path:"src/SpeedSearch/SpeedSearchContainer.tsx#SpeedSearchContainer"})}catch(__react_docgen_typescript_loader_error){}},"./src/SpeedSearch/SpeedSearchPopup.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{e:()=>SpeedSearchPopup});var _intellij_platform_core_Icon__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Icon/PlatformIcon.tsx"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_styled__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/styled.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const StyledSearchIcon=(0,_styled__WEBPACK_IMPORTED_MODULE_2__.zo)(_intellij_platform_core_Icon__WEBPACK_IMPORTED_MODULE_3__.vq)`
  margin-right: 10px;
  vertical-align: middle;
`,SpeedSearchPopup=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((({active,match,children},ref)=>active?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(StyledSpeedSearchPopup,{ref,noMatch:!match,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(StyledSearchIcon,{icon:"actions/search"}),(children||"").replace(/ /g," ")]}):null)),StyledSpeedSearchPopup=_styled__WEBPACK_IMPORTED_MODULE_2__.zo.span`
  // ref: https://github.com/JetBrains/intellij-community/blob/e3c7d96daba1d5d84d5650bde6c220aed225bfda/platform/platform-impl/src/com/intellij/ui/SpeedSearchBase.java#L53-L53
  box-sizing: border-box;
  position: absolute;
  background: ${({theme})=>theme.color("SpeedSearch.background",theme.dark?"rgb(111,111,111)":"#fff")};
  border: 1px solid
    ${({theme})=>theme.color("SpeedSearch.borderColor",theme.dark?"rgb(64, 64, 64)":"rgb(192, 192, 192)")};
  color: ${({noMatch,theme})=>noMatch?theme.color("SpeedSearch.errorForeground",theme.commonColors.red):theme.color("SpeedSearch.foreground",theme.commonColors.tooltipForeground)};
  z-index: 1;
  padding: 3px 7px;
  height: 25px;
  line-height: 1.2;
  transform: translateY(-100%);
`;try{SpeedSearchPopup.displayName="SpeedSearchPopup",SpeedSearchPopup.__docgenInfo={description:"The little popup view shown in the top left corner of list, tree, etc., which shows the search\nquery.",displayName:"SpeedSearchPopup",props:{match:{defaultValue:null,description:"",name:"match",required:!1,type:{name:"boolean"}},active:{defaultValue:null,description:"",name:"active",required:!0,type:{name:"boolean | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/SpeedSearch/SpeedSearchPopup.tsx#SpeedSearchPopup"]={docgenInfo:SpeedSearchPopup.__docgenInfo,name:"SpeedSearchPopup",path:"src/SpeedSearch/SpeedSearchPopup.tsx#SpeedSearchPopup"})}catch(__react_docgen_typescript_loader_error){}},"./src/SpeedSearch/useSpeedSearch.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{m:()=>useSpeedSearch,Y:()=>useSpeedSearchState});var react=__webpack_require__("../../node_modules/react/index.js");function useGhostInput({value,onChange}){const valueRef=(0,react.useRef)(value);valueRef.current=value;return{onKeyDown:event=>{if(!(event.ctrlKey||event.altKey||event.metaKey||event.target instanceof HTMLElement&&function isTypeableElement(elem){return elem.isContentEditable||elem instanceof HTMLInputElement&&!["checkbox","radio","button"].includes(elem.type)||elem instanceof HTMLTextAreaElement}(event.target))){if(1===event.key.length)return event.preventDefault(),onChange(`${valueRef.current}${event.key}`);if("Backspace"===event.key){const sliceEnd=event.metaKey?0:-1;onChange(valueRef.current.slice(0,sliceEnd))}}}}}try{useGhostInput.displayName="useGhostInput",useGhostInput.__docgenInfo={description:"Main use case is for a list of item, which can have keyboard focus, be filterable and capture\ntyping if the corresponding keyboard events are not happening on an inner element (like an input)\nthat already handles typing.",displayName:"useGhostInput",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(value: string) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/SpeedSearch/useGhostInput.tsx#useGhostInput"]={docgenInfo:useGhostInput.__docgenInfo,name:"useGhostInput",path:"src/SpeedSearch/useGhostInput.tsx#useGhostInput"})}catch(__react_docgen_typescript_loader_error){}var useKeyboard=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useKeyboard.mjs"),useFocusWithin=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocusWithin.mjs"),useControlledState=__webpack_require__("../../node_modules/@react-stately/utils/dist/useControlledState.mjs"),keyboard_utils=__webpack_require__("./src/utils/keyboard-utils.ts");function useSpeedSearchState(props){const[active,setActive]=(0,useControlledState.z)(props.isSearchActive,props.defaultIsSearchActive??!1,props.onIsSearchActiveChange),[searchTerm,setSearchTerm]=(0,useControlledState.z)(props.searchTerm,props.defaultSearchTerm||"",props.onSearchTermChange);return{active,searchTerm,setActive,setSearchTerm,clear:()=>{setSearchTerm(""),setActive(!1)}}}function useSpeedSearch({keepSearchActiveOnBlur},{searchTerm,active,setActive,setSearchTerm},ref){const{onKeyDown:ghostInputKeydown}=useGhostInput({value:searchTerm,onChange:value=>{const trimmedValue=value.trimStart();setSearchTerm(trimmedValue),active||""===trimmedValue||setActive(!0)}}),clear=()=>{setSearchTerm(""),setActive(!1)},{keyboardProps:{onKeyDown,onKeyUp}}=(0,useKeyboard.v)({onKeyDown:e=>{ref.current?.contains(e.target)&&("a"===e.key&&(e.metaKey||e.ctrlKey)&&e.preventDefault(),"Escape"===e.key?clear():ghostInputKeydown(e),active&&!(0,keyboard_utils.a)(e)||e.continuePropagation())}}),{focusWithinProps:{onFocus,onBlur}}=(0,useFocusWithin.L)({onBlurWithin:event=>{("function"==typeof keepSearchActiveOnBlur?keepSearchActiveOnBlur(event):keepSearchActiveOnBlur)||clear()}});return{containerProps:{onFocus,onBlur,onKeyDown,onKeyUp}}}try{useSpeedSearchState.displayName="useSpeedSearchState",useSpeedSearchState.__docgenInfo={description:"",displayName:"useSpeedSearchState",props:{searchTerm:{defaultValue:null,description:"",name:"searchTerm",required:!1,type:{name:"string"}},isSearchActive:{defaultValue:null,description:"",name:"isSearchActive",required:!1,type:{name:"boolean"}},defaultSearchTerm:{defaultValue:null,description:"",name:"defaultSearchTerm",required:!1,type:{name:"string"}},defaultIsSearchActive:{defaultValue:null,description:"",name:"defaultIsSearchActive",required:!1,type:{name:"boolean"}},onSearchTermChange:{defaultValue:null,description:"",name:"onSearchTermChange",required:!1,type:{name:"((value: string) => void)"}},onIsSearchActiveChange:{defaultValue:null,description:"",name:"onIsSearchActiveChange",required:!1,type:{name:"((value: boolean) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/SpeedSearch/useSpeedSearch.tsx#useSpeedSearchState"]={docgenInfo:useSpeedSearchState.__docgenInfo,name:"useSpeedSearchState",path:"src/SpeedSearch/useSpeedSearch.tsx#useSpeedSearchState"})}catch(__react_docgen_typescript_loader_error){}try{useSpeedSearch.displayName="useSpeedSearch",useSpeedSearch.__docgenInfo={description:"TODO: description\nIMPORTANT: making the container element focusable is not a part of this hook. But it's a prerequisite for it to work.\nPreviously, a tabIndex:-1 was passed as a container prop, but it turns out it's not that simple. For collections for\nexample we usually want tab index to be 0 once it's not focused and then when an item is focused, we want it to be\n-1, and such kind of logics are handled in their respective hooks. So, making the container focusable and how to do\nit is NOT this hook's responsibility anymore.",displayName:"useSpeedSearch",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/SpeedSearch/useSpeedSearch.tsx#useSpeedSearch"]={docgenInfo:useSpeedSearch.__docgenInfo,name:"useSpeedSearch",path:"src/SpeedSearch/useSpeedSearch.tsx#useSpeedSearch"})}catch(__react_docgen_typescript_loader_error){}},"./src/TextRange.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function getAllRanges(ranges,length){const result=[];return ranges?.length?(ranges[0].from>0&&result.push([{from:0,to:ranges[0].from-1},!1]),ranges.forEach((({from,to},index)=>{result.push([{from,to},!0]);const gapRange=ranges[index+1]?{from:to+1,to:ranges[index+1].from-1}:{from:to+1,to:length-1};(function isEmptyRange(range){return range.from>range.to})(gapRange)||result.push([gapRange,!1])})),result):[[{from:0,to:length-1},!1]]}function createRangesFromIndices(indices){return indices.reduce(((ranges,index)=>{const lastRange=ranges.slice(-1)[0];return lastRange?.to===index-1?[...ranges.slice(0,-1),{from:lastRange.from,to:index}]:[...ranges,{from:index,to:index}]}),[])}__webpack_require__.d(__webpack_exports__,{UQ:()=>getAllRanges,nf:()=>createRangesFromIndices})},"./src/TextWithHighlights/TextWithHighlights.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{x:()=>TextWithHighlights});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_TextRange__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/TextRange.ts"),_styled__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/styled.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const HighlightedMatch=_styled__WEBPACK_IMPORTED_MODULE_2__.zo.span`
  background: ${({theme})=>`linear-gradient(${theme.color("SearchMatch.startBackground","#ffeaa2b3")}, ${theme.color("SearchMatch.endBackground","#ffd042b3")})`};
  color: #000;
  border-radius: 3px;
`;function TextWithHighlights({children,highlights}){const parts=highlights?(0,_TextRange__WEBPACK_IMPORTED_MODULE_3__.UQ)(highlights,children.length):[[{from:0,to:children.length},!1]];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:parts.map((([{from,to},highlighted])=>{const text=children.slice(from,to+1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:highlighted?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(HighlightedMatch,{children:text}):text},`${from}_${to}`)}))})}try{TextWithHighlights.displayName="TextWithHighlights",TextWithHighlights.__docgenInfo={description:"Renders the children (which must be a string), with highlights wrapped in spans with the highlight style.\nNote: this component doesn't render a container. It just highlights the specified ranges.",displayName:"TextWithHighlights",props:{highlights:{defaultValue:null,description:"",name:"highlights",required:!0,type:{name:"TextRange[] | null"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/TextWithHighlights/TextWithHighlights.tsx#TextWithHighlights"]={docgenInfo:TextWithHighlights.__docgenInfo,name:"TextWithHighlights",path:"src/TextWithHighlights/TextWithHighlights.tsx#TextWithHighlights"})}catch(__react_docgen_typescript_loader_error){}},"./src/minusculeMatch.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>minusculeMatch});var TextRange=__webpack_require__("./src/TextRange.ts");function isWordSeparator(c){return isWhitespace(c)||"_"==c||"-"==c||":"==c||"+"==c||"."==c}function isWhitespace(char){return/^\s*$/.test(char)}function isUpperCase(str){return str.toUpperCase()===str&&str.toLowerCase()!==str}function isMeaningfulChar(ch){return!isWordSeparator(ch)&&!isWhitespace(ch)}const minusculeMatch=(input,rawPattern)=>{const isStarts=input.split("").map(isStart),pattern=rawPattern.split("").filter(isMeaningfulChar).join(""),matches=[];let continuous=!1,inputIndex=0,patternIndex=0;for(;;){if(matches.length===pattern.length)return(0,TextRange.nf)(matches.map((({inputIndex:i})=>i)));if(inputIndex>input.length-1){if(matches.length>0){const lastMatch=matches.pop();inputIndex=lastMatch.inputIndex+1,patternIndex=lastMatch.patternIndex;continue}break}isMeaningfulChar(input[inputIndex])?pattern[patternIndex].toLowerCase()===input[inputIndex].toLowerCase()&&(continuous||isStarts[inputIndex]||0===matches.length)?(matches.push({patternIndex,inputIndex}),continuous=!0,patternIndex++,inputIndex++):(continuous=!1,inputIndex++):inputIndex++}return null};function isStart(char,index,chars){const previousChar=chars[index-1];return 0===index||isWordSeparator(previousChar)&&!isWordSeparator(char)||isUpperCase(char)&&!isUpperCase(previousChar)}},"./src/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Fg:()=>useTheme,iv:()=>css,zo:()=>styled});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const styled=styled_components__WEBPACK_IMPORTED_MODULE_0__.ZP,useTheme=styled_components__WEBPACK_IMPORTED_MODULE_0__.Fg,css=styled_components__WEBPACK_IMPORTED_MODULE_0__.iv;styled_components__WEBPACK_IMPORTED_MODULE_0__.Sf},"./src/utils/keyboard-utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{a:()=>hasAnyModifier,y:()=>isCtrlKeyPressed});var _react_aria_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@react-aria/utils/dist/platform.mjs");function isCtrlKeyPressed(e){return(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_0__.V5)()?e?.metaKey:e?.ctrlKey}function hasAnyModifier(e){return e.altKey||e.ctrlKey||e.metaKey||e.shiftKey}},"./src/utils/useForwardedRef.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>useForwardedRef});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function useForwardedRef(forwardedRef){const innerRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>{forwardedRef&&("function"==typeof forwardedRef?forwardedRef(innerRef.current):forwardedRef.current=innerRef.current)})),innerRef}}}]);
//# sourceMappingURL=SpeedSearch-SpeedSearch-stories.a98a5223.iframe.bundle.js.map