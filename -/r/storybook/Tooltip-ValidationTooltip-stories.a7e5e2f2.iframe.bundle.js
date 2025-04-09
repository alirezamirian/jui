"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[600],{"../../node_modules/@react-aria/interactions/dist/useFocus.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{K:()=>$a1ea59d68270f0dd$export$f8168d8dd8fd66e6});var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/utils.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/interactions/node_modules/@react-aria/utils/dist/domHelpers.mjs");function $a1ea59d68270f0dd$export$f8168d8dd8fd66e6(props){let{isDisabled,onFocus:onFocusProp,onBlur:onBlurProp,onFocusChange}=props;const onBlur=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>{if(e.target===e.currentTarget)return onBlurProp&&onBlurProp(e),onFocusChange&&onFocusChange(!1),!0}),[onBlurProp,onFocusChange]),onSyntheticFocus=(0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.d)(onBlur),onFocus=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>{const ownerDocument=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.r)(e.target);e.target===e.currentTarget&&ownerDocument.activeElement===e.target&&(onFocusProp&&onFocusProp(e),onFocusChange&&onFocusChange(!0),onSyntheticFocus(e))}),[onFocusChange,onFocusProp,onSyntheticFocus]);return{focusProps:{onFocus:!isDisabled&&(onFocusProp||onFocusChange||onBlurProp)?onFocus:void 0,onBlur:isDisabled||!onBlurProp&&!onFocusChange?void 0:onBlur}}}},"../../node_modules/@react-aria/interactions/dist/useHover.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>$6179b936705e76d3$export$ae780daf29e6d456});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");let $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents=!1,$6179b936705e76d3$var$hoverCount=0;function $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents(){$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents=!0,setTimeout((()=>{$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents=!1}),50)}function $6179b936705e76d3$var$handleGlobalPointerEvent(e){"touch"===e.pointerType&&$6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents()}function $6179b936705e76d3$var$setupGlobalTouchEvents(){if("undefined"!=typeof document)return"undefined"!=typeof PointerEvent?document.addEventListener("pointerup",$6179b936705e76d3$var$handleGlobalPointerEvent):document.addEventListener("touchend",$6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents),$6179b936705e76d3$var$hoverCount++,()=>{$6179b936705e76d3$var$hoverCount--,$6179b936705e76d3$var$hoverCount>0||("undefined"!=typeof PointerEvent?document.removeEventListener("pointerup",$6179b936705e76d3$var$handleGlobalPointerEvent):document.removeEventListener("touchend",$6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents))}}function $6179b936705e76d3$export$ae780daf29e6d456(props){let{onHoverStart,onHoverChange,onHoverEnd,isDisabled}=props,[isHovered,setHovered]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),state=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({isHovered:!1,ignoreEmulatedMouseEvents:!1,pointerType:"",target:null}).current;(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)($6179b936705e76d3$var$setupGlobalTouchEvents,[]);let{hoverProps,triggerHoverEnd}=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>{let triggerHoverStart=(event,pointerType)=>{if(state.pointerType=pointerType,isDisabled||"touch"===pointerType||state.isHovered||!event.currentTarget.contains(event.target))return;state.isHovered=!0;let target=event.currentTarget;state.target=target,onHoverStart&&onHoverStart({type:"hoverstart",target,pointerType}),onHoverChange&&onHoverChange(!0),setHovered(!0)},triggerHoverEnd=(event,pointerType)=>{if(state.pointerType="",state.target=null,"touch"===pointerType||!state.isHovered)return;state.isHovered=!1;let target=event.currentTarget;onHoverEnd&&onHoverEnd({type:"hoverend",target,pointerType}),onHoverChange&&onHoverChange(!1),setHovered(!1)},hoverProps={};return"undefined"!=typeof PointerEvent?(hoverProps.onPointerEnter=e=>{$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents&&"mouse"===e.pointerType||triggerHoverStart(e,e.pointerType)},hoverProps.onPointerLeave=e=>{!isDisabled&&e.currentTarget.contains(e.target)&&triggerHoverEnd(e,e.pointerType)}):(hoverProps.onTouchStart=()=>{state.ignoreEmulatedMouseEvents=!0},hoverProps.onMouseEnter=e=>{state.ignoreEmulatedMouseEvents||$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents||triggerHoverStart(e,"mouse"),state.ignoreEmulatedMouseEvents=!1},hoverProps.onMouseLeave=e=>{!isDisabled&&e.currentTarget.contains(e.target)&&triggerHoverEnd(e,"mouse")}),{hoverProps,triggerHoverEnd}}),[onHoverStart,onHoverChange,onHoverEnd,isDisabled,state]);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{isDisabled&&triggerHoverEnd({currentTarget:state.target},state.pointerType)}),[isDisabled]),{hoverProps,isHovered}}},"../../node_modules/@react-aria/tooltip/dist/module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Q:()=>$4e1b34546679e357$export$a6da6c504e4bba8b,l:()=>$326e436e94273fe1$export$1c4b08e0eca38426});var _react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/filterDOMProps.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useId.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useHover.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocusVisible.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/usePress.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_focus__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusable.mjs");function $326e436e94273fe1$export$1c4b08e0eca38426(props,state){let domProps=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.z)(props,{labelable:!0}),{hoverProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__.X)({onHoverStart:()=>null==state?void 0:state.open(!0),onHoverEnd:()=>null==state?void 0:state.close()});return{tooltipProps:(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__.d)(domProps,hoverProps,{role:"tooltip"})}}function $4e1b34546679e357$export$a6da6c504e4bba8b(props,state,ref){let{isDisabled,trigger}=props,tooltipId=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_4__.Me)(),isHovered=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),isFocused=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),handleShow=()=>{(isHovered.current||isFocused.current)&&state.open(isFocused.current)},handleHide=immediate=>{isHovered.current||isFocused.current||state.close(immediate)};(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{let onKeyDown=e=>{ref&&ref.current&&"Escape"===e.key&&state.close(!0)};if(state.isOpen)return document.addEventListener("keydown",onKeyDown,!0),()=>{document.removeEventListener("keydown",onKeyDown,!0)}}),[ref,state]);let{hoverProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__.X)({isDisabled,onHoverStart:()=>{"focus"!==trigger&&("pointer"===(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_5__.Jz)()?isHovered.current=!0:isHovered.current=!1,handleShow())},onHoverEnd:()=>{"focus"!==trigger&&(isFocused.current=!1,isHovered.current=!1,handleHide())}}),{pressProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_6__.r)({onPressStart:()=>{isFocused.current=!1,isHovered.current=!1,handleHide(!0)}}),{focusableProps}=(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_7__.k)({isDisabled,onFocus:()=>{(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_5__.E)()&&(isFocused.current=!0,handleShow())},onBlur:()=>{isFocused.current=!1,isHovered.current=!1,handleHide(!0)}},ref);return{triggerProps:{"aria-describedby":state.isOpen?tooltipId:void 0,...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__.d)(focusableProps,hoverProps,pressProps)},tooltipProps:{id:tooltipId}}}},"./src/Tooltip/ValidationTooltip.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,MultiLine:()=>MultiLine,Warning:()=>Warning,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Tooltip/Validation",component:__webpack_require__("./src/Tooltip/ValidationTooltip.tsx").p,args:{children:"The port number should be between 0 and 65535."},argTypes:{}},Default={},Warning={args:{type:"warning"}},MultiLine={args:{children:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,"Branch name foo already exists. ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("br",null),"Change the name or overwrite existing branch")}},__namedExportsOrder=["Default","Warning","MultiLine"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{}",...Default.parameters?.docs?.source}}},Warning.parameters={...Warning.parameters,docs:{...Warning.parameters?.docs,source:{originalSource:'{\n  args: {\n    type: "warning"\n  }\n}',...Warning.parameters?.docs?.source}}},MultiLine.parameters={...MultiLine.parameters,docs:{...MultiLine.parameters?.docs,source:{originalSource:"{\n  args: {\n    children: <>\n        Branch name foo already exists. <br />\n        Change the name or overwrite existing branch\n      </>\n  }\n}",...MultiLine.parameters?.docs?.source}}}},"./src/Tooltip/ValidationTooltip.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{p:()=>ValidationTooltip});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Tooltip/Tooltip.tsx"),_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/styled.ts");const StyledValidationTooltip=(0,_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__.zo)(_intellij_platform_core_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_2__.u)`
  box-shadow: none;
  padding: 0.25rem 0.5rem; // from ComponentValidator class in the reference impl
  max-width: ${({theme})=>`${theme.value("ValidationTooltip.maxWidth")}px`};
  background: ${({theme})=>theme.color("ValidationTooltip.errorBackground")};
  border: 1px solid
    ${({theme})=>theme.color("ValidationTooltip.errorBorderColor")};
`,StyledWarningValidationTooltip=(0,_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__.zo)(StyledValidationTooltip)`
  background: ${({theme})=>theme.color("ValidationTooltip.warningBackground")};
  border-color: ${({theme})=>theme.color("ValidationTooltip.warningBorderColor")};
`,ValidationTooltip=({type="error",children})=>{const Component="error"===type?StyledValidationTooltip:StyledWarningValidationTooltip;return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{multiline:!0},children)};ValidationTooltip.__docgenInfo={description:"Tooltip to be used for validation error messages\n@see https://jetbrains.github.io/ui/principles/validation_errors/",methods:[],displayName:"ValidationTooltip",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},type:{required:!1,tsType:{name:"union",raw:'"error" | "warning"',elements:[{name:"literal",value:'"error"'},{name:"literal",value:'"warning"'}]},description:"@default error",defaultValue:{value:'"error"',computed:!1}}}}},"./src/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Fg:()=>useTheme,iv:()=>css,zo:()=>styled});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const styled=styled_components__WEBPACK_IMPORTED_MODULE_0__.ZP,useTheme=styled_components__WEBPACK_IMPORTED_MODULE_0__.Fg,css=styled_components__WEBPACK_IMPORTED_MODULE_0__.iv;styled_components__WEBPACK_IMPORTED_MODULE_0__.Sf},"./node_modules/ramda/es/compose.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>compose});var pipe=__webpack_require__("./node_modules/ramda/es/pipe.js"),_curry1=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js"),_isString=__webpack_require__("./node_modules/ramda/es/internal/_isString.js");const es_reverse=(0,_curry1.Z)((function reverse(list){return(0,_isString.Z)(list)?list.split("").reverse().join(""):Array.prototype.slice.call(list,0).reverse()}));function compose(){if(0===arguments.length)throw new Error("compose requires at least one argument");return pipe.Z.apply(this,es_reverse(arguments))}},"./node_modules/ramda/es/identity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _identity(x){return x}__webpack_require__.d(__webpack_exports__,{Z:()=>es_identity});const es_identity=(0,__webpack_require__("./node_modules/ramda/es/internal/_curry1.js").Z)(_identity)}}]);
//# sourceMappingURL=Tooltip-ValidationTooltip-stories.a7e5e2f2.iframe.bundle.js.map