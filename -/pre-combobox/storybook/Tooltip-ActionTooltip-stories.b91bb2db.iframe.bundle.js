"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[4010],{"../../node_modules/@react-aria/interactions/dist/useFocus.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{K:()=>$a1ea59d68270f0dd$export$f8168d8dd8fd66e6});var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/utils.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/utils/dist/domHelpers.mjs");function $a1ea59d68270f0dd$export$f8168d8dd8fd66e6(props){let{isDisabled,onFocus:onFocusProp,onBlur:onBlurProp,onFocusChange}=props;const onBlur=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>{if(e.target===e.currentTarget)return onBlurProp&&onBlurProp(e),onFocusChange&&onFocusChange(!1),!0}),[onBlurProp,onFocusChange]),onSyntheticFocus=(0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.d)(onBlur),onFocus=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>{const ownerDocument=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.r)(e.target);e.target===e.currentTarget&&ownerDocument.activeElement===e.target&&(onFocusProp&&onFocusProp(e),onFocusChange&&onFocusChange(!0),onSyntheticFocus(e))}),[onFocusChange,onFocusProp,onSyntheticFocus]);return{focusProps:{onFocus:!isDisabled&&(onFocusProp||onFocusChange||onBlurProp)?onFocus:void 0,onBlur:isDisabled||!onBlurProp&&!onFocusChange?void 0:onBlur}}}},"../../node_modules/@react-aria/interactions/dist/useHover.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>$6179b936705e76d3$export$ae780daf29e6d456});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");let $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents=!1,$6179b936705e76d3$var$hoverCount=0;function $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents(){$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents=!0,setTimeout((()=>{$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents=!1}),50)}function $6179b936705e76d3$var$handleGlobalPointerEvent(e){"touch"===e.pointerType&&$6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents()}function $6179b936705e76d3$var$setupGlobalTouchEvents(){if("undefined"!=typeof document)return"undefined"!=typeof PointerEvent?document.addEventListener("pointerup",$6179b936705e76d3$var$handleGlobalPointerEvent):document.addEventListener("touchend",$6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents),$6179b936705e76d3$var$hoverCount++,()=>{$6179b936705e76d3$var$hoverCount--,$6179b936705e76d3$var$hoverCount>0||("undefined"!=typeof PointerEvent?document.removeEventListener("pointerup",$6179b936705e76d3$var$handleGlobalPointerEvent):document.removeEventListener("touchend",$6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents))}}function $6179b936705e76d3$export$ae780daf29e6d456(props){let{onHoverStart,onHoverChange,onHoverEnd,isDisabled}=props,[isHovered,setHovered]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),state=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({isHovered:!1,ignoreEmulatedMouseEvents:!1,pointerType:"",target:null}).current;(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)($6179b936705e76d3$var$setupGlobalTouchEvents,[]);let{hoverProps,triggerHoverEnd}=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>{let triggerHoverStart=(event,pointerType)=>{if(state.pointerType=pointerType,isDisabled||"touch"===pointerType||state.isHovered||!event.currentTarget.contains(event.target))return;state.isHovered=!0;let target=event.currentTarget;state.target=target,onHoverStart&&onHoverStart({type:"hoverstart",target,pointerType}),onHoverChange&&onHoverChange(!0),setHovered(!0)},triggerHoverEnd=(event,pointerType)=>{if(state.pointerType="",state.target=null,"touch"===pointerType||!state.isHovered)return;state.isHovered=!1;let target=event.currentTarget;onHoverEnd&&onHoverEnd({type:"hoverend",target,pointerType}),onHoverChange&&onHoverChange(!1),setHovered(!1)},hoverProps={};return"undefined"!=typeof PointerEvent?(hoverProps.onPointerEnter=e=>{$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents&&"mouse"===e.pointerType||triggerHoverStart(e,e.pointerType)},hoverProps.onPointerLeave=e=>{!isDisabled&&e.currentTarget.contains(e.target)&&triggerHoverEnd(e,e.pointerType)}):(hoverProps.onTouchStart=()=>{state.ignoreEmulatedMouseEvents=!0},hoverProps.onMouseEnter=e=>{state.ignoreEmulatedMouseEvents||$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents||triggerHoverStart(e,"mouse"),state.ignoreEmulatedMouseEvents=!1},hoverProps.onMouseLeave=e=>{!isDisabled&&e.currentTarget.contains(e.target)&&triggerHoverEnd(e,"mouse")}),{hoverProps,triggerHoverEnd}}),[onHoverStart,onHoverChange,onHoverEnd,isDisabled,state]);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{isDisabled&&triggerHoverEnd({currentTarget:state.target},state.pointerType)}),[isDisabled]),{hoverProps,isHovered}}},"../../node_modules/@react-aria/utils/dist/useObjectRef.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>$df56164dff5785e2$export$4338b53315abf666});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function $df56164dff5785e2$export$4338b53315abf666(forwardedRef){const objRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>({get current(){return objRef.current},set current(value){objRef.current=value,"function"==typeof forwardedRef?forwardedRef(value):forwardedRef&&(forwardedRef.current=value)}})),[forwardedRef])}},"./src/Tooltip/ActionTooltip.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Long:()=>Long,WithShortcut:()=>WithShortcut,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Tooltip/Action",component:__webpack_require__("./src/Tooltip/ActionTooltip.tsx").M,args:{actionName:"Commit"},argTypes:{}},Default={},Long={args:{actionName:"/workspace/intellij-community/platform/platform-api/src/com/intellij/ide/HelpTooltip.java"}},WithShortcut={args:{shortcut:"⌘K"}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{}",...Default.parameters?.docs?.source}}},Long.parameters={...Long.parameters,docs:{...Long.parameters?.docs,source:{originalSource:'{\n  args: {\n    actionName: "/workspace/intellij-community/platform/platform-api/src/com/intellij/ide/HelpTooltip.java"\n  }\n}',...Long.parameters?.docs?.source}}},WithShortcut.parameters={...WithShortcut.parameters,docs:{...WithShortcut.parameters?.docs,source:{originalSource:'{\n  args: {\n    shortcut: "⌘K"\n  }\n}',...WithShortcut.parameters?.docs?.source}}};const __namedExportsOrder=["Default","Long","WithShortcut"]},"./src/Tooltip/ActionTooltip.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>ActionTooltip});__webpack_require__("../../node_modules/react/index.js");var _intellij_platform_core_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Tooltip/Tooltip.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const ActionTooltip=({actionName,shortcut,...tooltipProps})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_2__.u,{...tooltipProps,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_intellij_platform_core_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_2__.u.Header,{children:[actionName,shortcut&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_2__.u.Shortcut,{children:shortcut})]})});ActionTooltip.displayName="ActionTooltip";try{ActionTooltip.displayName="ActionTooltip",ActionTooltip.__docgenInfo={description:'Tooltip of type "Action"',displayName:"ActionTooltip",props:{actionName:{defaultValue:null,description:"",name:"actionName",required:!0,type:{name:"ReactNode"}},shortcut:{defaultValue:null,description:"",name:"shortcut",required:!1,type:{name:"ReactNode"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},withPointer:{defaultValue:null,description:"Whether (and in what position) the arrow pointer should be shown.\nWhen using {@link TooltipTrigger } or {@link PositionedTooltipTrigger }, the position of the pointer is calculated\nbased on the target element, and a boolean value to define whether the arrow should be shown or not would suffice.\n\nTooltips with pointer have slight style difference.\n{@see https://www.figma.com/file/nfDfMAdV7j2fnQlpYNAOfP/IntelliJ-Platform-UI-Kit-(Community)?type=design&node-id=15-51&mode=design&t=7PplrxG8ZfXB4hIK-0}\n@example <Tooltip withPointer />\n// shows the pointer in the position controlled by {@link TooltipTrigger } or {@link PositionedTooltipTrigger }// If there is not `TooltipTrigger` or `PositionedTooltipTrigger`, the arrow is shown on top center by default.\n@example <Tooltip withPointer={{side: 'top', offset: 30}} />\n// shows the pointer on the top side, with horizontal offset of 30px from the left of tooltip, regardless\n// of whether `TooltipTrigger` or `PositionedTooltipTrigger` is used.\n@example <Tooltip withPointer={{side: 'left', offset: -30}} />\n// shows the pointer on the left side, with vertidcal offset of 30px from the bottom of the tooltip, regardless\n// of whether `TooltipTrigger` or `PositionedTooltipTrigger` is used.",name:"withPointer",required:!1,type:{name:"boolean | TooltipPointerPosition"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Tooltip/ActionTooltip.tsx#ActionTooltip"]={docgenInfo:ActionTooltip.__docgenInfo,name:"ActionTooltip",path:"src/Tooltip/ActionTooltip.tsx#ActionTooltip"})}catch(__react_docgen_typescript_loader_error){}},"./src/Tooltip/Tooltip.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{u:()=>_Tooltip});var react=__webpack_require__("../../node_modules/react/index.js"),dist_module=__webpack_require__("../../node_modules/@react-aria/tooltip/dist/module.js"),useObjectRef=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs"),styled=__webpack_require__("./src/styled.ts"),style_constants=__webpack_require__("./src/style-constants.ts"),TooltipContext=__webpack_require__("./src/Tooltip/TooltipContext.tsx"),compose=__webpack_require__("./node_modules/ramda/es/compose.js"),identity=__webpack_require__("./node_modules/ramda/es/identity.js");const tooltipBackground=({theme})=>theme.color("ToolTip.background",theme.dark?"#3c3f41":"#f2f2f2");var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const TRANSLATE="translate(-6px, -9px)",sideStyles={top:styled.iv`
    top: 0;
    transform: ${TRANSLATE};
  `,bottom:styled.iv`
    bottom: 0;
    transform: rotateX(180deg) ${TRANSLATE};
  `,left:styled.iv`
    left: 0;
    transform: rotate(-90deg) ${TRANSLATE};
  `,right:styled.iv`
    right: 0;
    transform: rotate(90deg) ${TRANSLATE};
  `},StyledTooltipPointer=styled.zo.span`
  position: absolute;
  width: 0;
  height: 0;
  ${({side})=>sideStyles[side]};

  &::before {
    content: "";
    position: absolute;
    border-left: ${7.5}px solid transparent;
    border-right: ${7.5}px solid transparent;
    border-bottom: ${10.5}px solid #636569;
    left: -${1.5}px;
    top: -${1.5}px;
  }

  &::after {
    content: "";
    position: absolute;
    border-left: ${6}px solid transparent;
    border-right: ${6}px solid transparent;
    border-bottom: ${9}px solid ${tooltipBackground};
  }
`;function normalizeCssValue(value){return"number"==typeof value?`${value}px`:value}const withMin=min=>value=>null!=value?`max(${min}px, ${normalizeCssValue(value)})`:value,withMax=max=>value=>null!=value?`min(${max}px, ${normalizeCssValue(value)})`:value,HEIGHT_OFFSET=13,WIDTH_OFFSET=10;function limitPointerPositionStyles({width,height},{top,left,right,bottom}){const applyVerticalMinMax=(0,compose.Z)(height?withMax(height-HEIGHT_OFFSET):identity.Z,withMin(HEIGHT_OFFSET)),applyHorizontalMinMax=(0,compose.Z)(width?withMax(width-WIDTH_OFFSET):identity.Z,withMin(WIDTH_OFFSET));return{top:applyVerticalMinMax(top),bottom:applyVerticalMinMax(bottom),left:applyHorizontalMinMax(left),right:applyHorizontalMinMax(right)}}const getOffsetCssProp=(side,invert)=>"top"===side||"bottom"===side?invert?"right":"left":invert?"bottom":"top";function pointerPositionToOffsetStyle({side,offset="50%"}){const{invert=!1,value:offsetValue}="object"==typeof offset?offset:{invert:!1,value:offset};return{[getOffsetCssProp(side,invert)]:offsetValue}}function TooltipPointer({side,offset,tooltipRef}){const[size,setSize]=(0,react.useState)({height:void 0,width:void 0});return(0,react.useEffect)((()=>{const{offsetHeight,offsetWidth}=tooltipRef.current||{};offsetHeight==size?.height&&offsetWidth==size?.width||setSize({height:offsetHeight,width:offsetWidth})})),(0,jsx_runtime.jsx)(StyledTooltipPointer,{side,style:limitPointerPositionStyles(size,"specific"===offset.type?pointerPositionToOffsetStyle({side,offset:offset.value}):offset.value)})}TooltipPointer.displayName="TooltipPointer";try{TooltipPointer.displayName="TooltipPointer",TooltipPointer.__docgenInfo={description:"",displayName:"TooltipPointer",props:{side:{defaultValue:null,description:"",name:"side",required:!0,type:{name:"enum",value:[{value:'"bottom"'},{value:'"top"'},{value:'"left"'},{value:'"right"'}]}},offset:{defaultValue:null,description:"",name:"offset",required:!0,type:{name:'{ type: "calculated"; value: CSSProperties; } | { type: "specific"; value: OffsetValue | { value: OffsetValue; invert?: boolean | undefined; } | undefined; }'}},tooltipRef:{defaultValue:null,description:"",name:"tooltipRef",required:!0,type:{name:"RefObject<HTMLElement>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Tooltip/TooltipPointer.tsx#TooltipPointer"]={docgenInfo:TooltipPointer.__docgenInfo,name:"TooltipPointer",path:"src/Tooltip/TooltipPointer.tsx#TooltipPointer"})}catch(__react_docgen_typescript_loader_error){}const StyledTooltip=styled.zo.div`
  box-sizing: content-box;
  max-width: ${({theme,multiline})=>multiline?`${theme.value("HelpTooltip.maxWidth")??250}px`:null};
  white-space: ${({multiline})=>multiline?null:"nowrap"};
  display: inline-flex;
  flex-direction: column;
  gap: ${({theme})=>theme.value("HelpToolTip.verticalGap")??4}px;
  background: ${tooltipBackground};
  color: ${({theme})=>theme.color("ToolTip.foreground",theme.dark?"#bfbfbf":"#000")};
  padding: ${({theme,multiline})=>multiline?theme.inset("HelpTooltip.defaultTextBorderInsets")||"0.5rem 0.8125rem 0.625rem 0.625rem":theme.inset("HelpTooltip.smallTextBorderInsets")||"0.375rem 0.75rem 0.4375rem 0.625rem"};
  line-height: 1.2;
  border-style: solid;
  border-width: ${({theme,hasPointer})=>theme.value("ToolTip.paintBorder")||hasPointer?"1px":"0px"};
  border-color: ${({theme})=>theme.color("ToolTip.borderColor",theme.dark?"#636569":"#adadad")};
  ${style_constants.s};
  ${({hasPointer})=>hasPointer&&styled.iv`
      position: relative; // needed for absolute positioning of the pointer
      border-radius: ${4}px;
    `}
`,StyledShortcut=styled.zo.kbd`
  all: unset;
  color: ${({theme})=>theme.color("ToolTip.shortcutForeground",theme.dark?"#999999":"#787878")};
`,StyledHeader=styled.zo.div`
  font-size: ${({theme})=>theme.fontSizeDelta("HelpTooltip.fontSizeDelta")};
  display: flex;
  gap: 0.5rem;
`,StyledDescription=styled.zo.div`
  color: ${({theme})=>theme.color("Tooltip.infoForeground",theme.commonColors.contextHelpForeground)};
  font-size: ${({theme})=>theme.fontSizeDelta("HelpTooltip.descriptionSizeDelta")};
`,StyledLink=styled.zo.div`
  color: ${({theme})=>theme.color("ToolTip.linkForeground",theme.commonColors.linkForegroundEnabled)};
  a,
  [role="link"] {
    // Maybe target Link instead, without important. It didn't work as expected, in the first try tho.
    color: inherit !important;
  }
`,placementToPointerSide={bottom:"top",top:"bottom",left:"right",right:"left",center:"top"},Tooltip=react.forwardRef((function Tooltip({children,multiline,withPointer,...props},forwardedRef){const ref=(0,useObjectRef.B)(forwardedRef),{state,isInteractive,pointerPositionStyle,placement="bottom"}=(0,react.useContext)(TooltipContext.d)||{},{tooltipProps}=(0,dist_module.l)(props,state?{...state,open:isInteractive?state?.open:()=>{}}:state),{side,offset}="object"==typeof withPointer?withPointer:{side:placementToPointerSide[placement],offset:void 0};return(0,jsx_runtime.jsxs)(StyledTooltip,{hasPointer:Boolean(withPointer),multiline,...tooltipProps,className:props.className,ref,children:[withPointer&&(0,jsx_runtime.jsx)(TooltipPointer,{tooltipRef:ref,side,offset:offset||!pointerPositionStyle?{type:"specific",value:offset}:{type:"calculated",value:pointerPositionStyle}}),children]})})),_Tooltip=Object.assign(Tooltip,{Header:StyledHeader,Shortcut:StyledShortcut,Description:StyledDescription,Link:StyledLink});try{Tooltip.displayName="_Tooltip",Tooltip.__docgenInfo={description:"",displayName:"_Tooltip",props:{multiline:{defaultValue:null,description:"",name:"multiline",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},withPointer:{defaultValue:null,description:"Whether (and in what position) the arrow pointer should be shown.\nWhen using {@link TooltipTrigger } or {@link PositionedTooltipTrigger }, the position of the pointer is calculated\nbased on the target element, and a boolean value to define whether the arrow should be shown or not would suffice.\n\nTooltips with pointer have slight style difference.\n{@see https://www.figma.com/file/nfDfMAdV7j2fnQlpYNAOfP/IntelliJ-Platform-UI-Kit-(Community)?type=design&node-id=15-51&mode=design&t=7PplrxG8ZfXB4hIK-0}\n@example <Tooltip withPointer />\n// shows the pointer in the position controlled by {@link TooltipTrigger } or {@link PositionedTooltipTrigger }// If there is not `TooltipTrigger` or `PositionedTooltipTrigger`, the arrow is shown on top center by default.\n@example <Tooltip withPointer={{side: 'top', offset: 30}} />\n// shows the pointer on the top side, with horizontal offset of 30px from the left of tooltip, regardless\n// of whether `TooltipTrigger` or `PositionedTooltipTrigger` is used.\n@example <Tooltip withPointer={{side: 'left', offset: -30}} />\n// shows the pointer on the left side, with vertidcal offset of 30px from the bottom of the tooltip, regardless\n// of whether `TooltipTrigger` or `PositionedTooltipTrigger` is used.",name:"withPointer",required:!1,type:{name:"boolean | TooltipPointerPosition"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Tooltip/Tooltip.tsx#_Tooltip"]={docgenInfo:_Tooltip.__docgenInfo,name:"_Tooltip",path:"src/Tooltip/Tooltip.tsx#_Tooltip"})}catch(__react_docgen_typescript_loader_error){}},"./src/Tooltip/TooltipContext.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>TooltipContext});const TooltipContext=__webpack_require__("../../node_modules/react/index.js").createContext(null)},"./src/style-constants.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>WINDOW_SHADOW});const WINDOW_SHADOW="box-shadow: 0 5px 15px rgb(0 0 0 / 30%)"},"./src/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Fg:()=>useTheme,iv:()=>css,zo:()=>styled});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const styled=styled_components__WEBPACK_IMPORTED_MODULE_0__.ZP,useTheme=styled_components__WEBPACK_IMPORTED_MODULE_0__.Fg,css=styled_components__WEBPACK_IMPORTED_MODULE_0__.iv;styled_components__WEBPACK_IMPORTED_MODULE_0__.Sf}}]);
//# sourceMappingURL=Tooltip-ActionTooltip-stories.b91bb2db.iframe.bundle.js.map