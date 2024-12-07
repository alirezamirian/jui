"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[4932],{"./src/Tooltip/Tooltip.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{u:()=>_Tooltip});var react=__webpack_require__("../../node_modules/react/index.js"),dist_module=__webpack_require__("../../node_modules/@react-aria/tooltip/dist/module.js"),useObjectRef=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs"),styled=__webpack_require__("./src/styled.ts"),style_constants=__webpack_require__("./src/style-constants.ts"),TooltipContext=__webpack_require__("./src/Tooltip/TooltipContext.tsx"),compose=__webpack_require__("./node_modules/ramda/es/compose.js"),identity=__webpack_require__("./node_modules/ramda/es/identity.js");const tooltipBackground=({theme})=>theme.color("ToolTip.background",theme.dark?"#3c3f41":"#f2f2f2");var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const TRANSLATE="translate(-6px, -9px)",sideStyles={top:styled.iv`
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
`,placementToPointerSide={bottom:"top",top:"bottom",left:"right",right:"left",center:"top"},Tooltip=react.forwardRef((function Tooltip({children,multiline,withPointer,...props},forwardedRef){const ref=(0,useObjectRef.B)(forwardedRef),{state,isInteractive,pointerPositionStyle,placement="bottom"}=(0,react.useContext)(TooltipContext.d)||{},{tooltipProps}=(0,dist_module.l)(props,state?{...state,open:isInteractive?state?.open:()=>{}}:state),{side,offset}="object"==typeof withPointer?withPointer:{side:placementToPointerSide[placement],offset:void 0};return(0,jsx_runtime.jsxs)(StyledTooltip,{hasPointer:Boolean(withPointer),multiline,...tooltipProps,className:props.className,ref,children:[withPointer&&(0,jsx_runtime.jsx)(TooltipPointer,{tooltipRef:ref,side,offset:offset||!pointerPositionStyle?{type:"specific",value:offset}:{type:"calculated",value:pointerPositionStyle}}),children]})})),_Tooltip=Object.assign(Tooltip,{Header:StyledHeader,Shortcut:StyledShortcut,Description:StyledDescription,Link:StyledLink});try{Tooltip.displayName="_Tooltip",Tooltip.__docgenInfo={description:"",displayName:"_Tooltip",props:{multiline:{defaultValue:null,description:"",name:"multiline",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},withPointer:{defaultValue:null,description:"Whether (and in what position) the arrow pointer should be shown.\nWhen using {@link TooltipTrigger } or {@link PositionedTooltipTrigger }, the position of the pointer is calculated\nbased on the target element, and a boolean value to define whether the arrow should be shown or not would suffice.\n\nTooltips with pointer have slight style difference.\n{@see https://www.figma.com/file/nfDfMAdV7j2fnQlpYNAOfP/IntelliJ-Platform-UI-Kit-(Community)?type=design&node-id=15-51&mode=design&t=7PplrxG8ZfXB4hIK-0}\n@example <Tooltip withPointer />\n// shows the pointer in the position controlled by {@link TooltipTrigger } or {@link PositionedTooltipTrigger }// If there is not `TooltipTrigger` or `PositionedTooltipTrigger`, the arrow is shown on top center by default.\n@example <Tooltip withPointer={{side: 'top', offset: 30}} />\n// shows the pointer on the top side, with horizontal offset of 30px from the left of tooltip, regardless\n// of whether `TooltipTrigger` or `PositionedTooltipTrigger` is used.\n@example <Tooltip withPointer={{side: 'left', offset: -30}} />\n// shows the pointer on the left side, with vertidcal offset of 30px from the bottom of the tooltip, regardless\n// of whether `TooltipTrigger` or `PositionedTooltipTrigger` is used.",name:"withPointer",required:!1,type:{name:"boolean | TooltipPointerPosition"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Tooltip/Tooltip.tsx#_Tooltip"]={docgenInfo:_Tooltip.__docgenInfo,name:"_Tooltip",path:"src/Tooltip/Tooltip.tsx#_Tooltip"})}catch(__react_docgen_typescript_loader_error){}},"./src/Tooltip/TooltipContext.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>TooltipContext});const TooltipContext=__webpack_require__("../../node_modules/react/index.js").createContext(null)},"./src/Tooltip/TooltipTrigger.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{a:()=>TooltipTrigger});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_stately_tooltip__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-stately/tooltip/dist/module.js"),_intellij_platform_core_utils_useMouseEventOverlayPosition__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/utils/useMouseEventOverlayPosition.tsx"),_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/styled.ts"),_intellij_platform_core_Tooltip_TooltipTriggerAndOverlay__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/Tooltip/TooltipTriggerAndOverlay.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const TooltipTrigger=({tooltip,children,delay=500,offset,placement="bottom left",...props})=>{const triggerRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),theme=(0,_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_2__.Fg)(),state=(0,_react_stately_tooltip__WEBPACK_IMPORTED_MODULE_3__.O)({...props,delay}),overlayRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),positionAria=(0,_intellij_platform_core_utils_useMouseEventOverlayPosition__WEBPACK_IMPORTED_MODULE_4__.u)({overlayRef,isOpen:state.isOpen,placement,shouldFlip:!0,offset:offset??theme.value("HelpTooltip.mouseCursorOffset")??20});return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{state.isOpen&&requestAnimationFrame((()=>{positionAria.updatePosition()}))}),[state.isOpen]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core_Tooltip_TooltipTriggerAndOverlay__WEBPACK_IMPORTED_MODULE_5__.t,{tooltip,positionAria,trigger:children,state,overlayRef,triggerRef,showOnFocus:!1,isDisabled:props.isDisabled})};TooltipTrigger.displayName="TooltipTrigger";try{TooltipTrigger.displayName="TooltipTrigger",TooltipTrigger.__docgenInfo={description:"Sets {@param tooltip} for its {@param children}.\nShowing tooltip on focus and controlled open state are not supported at the moment, based on how tooltip works in the\nreference impl, and since tooltip is positioned based on cursor position. Positioning the tooltip based on cursor\nposition requires tooltip to be opened on hover. That's why neither controlling opened state nor showing the tooltip\non focus are supported here. {@link PositionedTooltipTrigger } allows for positioning the tooltip with respect to the\ntrigger element, and offers more options.",displayName:"TooltipTrigger",props:{tooltip:{defaultValue:null,description:"Tooltip content. The value should be an element of type {@link Tooltip }.",name:"tooltip",required:!0,type:{name:"ReactElement<any, string | JSXElementConstructor<any>>"}},placement:{defaultValue:{value:"bottom left"},description:"Placement of the tooltip with respect to the cursor",name:"placement",required:!1,type:{name:"enum",value:[{value:'"bottom"'},{value:'"bottom left"'},{value:'"bottom right"'},{value:'"bottom start"'},{value:'"bottom end"'},{value:'"top"'},{value:'"top left"'},{value:'"top right"'},{value:'"top start"'},{value:'"top end"'},{value:'"left"'},{value:'"left top"'},{value:'"left bottom"'},{value:'"start"'},{value:'"start top"'},{value:'"start bottom"'},{value:'"right"'},{value:'"right top"'},{value:'"right bottom"'},{value:'"end"'},{value:'"end top"'},{value:'"end bottom"'}]}},offset:{defaultValue:{value:'theme.value<number>("HelpTooltip.mouseCursorOffset") ?? 20'},description:"The additional offset applied along the main axis between the element and its\nanchor element.",name:"offset",required:!1,type:{name:"number"}},children:{defaultValue:null,description:"Either a focusable component, or a render function which accepts trigger props and passes it to some component.",name:"children",required:!0,type:{name:"ReactNode | ((props: HTMLAttributes<HTMLElement> & { ref: RefObject<HTMLElement>; }) => ReactNode)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Tooltip/TooltipTrigger.tsx#TooltipTrigger"]={docgenInfo:TooltipTrigger.__docgenInfo,name:"TooltipTrigger",path:"src/Tooltip/TooltipTrigger.tsx#TooltipTrigger"})}catch(__react_docgen_typescript_loader_error){}},"./src/Tooltip/TooltipTriggerAndOverlay.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{t:()=>TooltipTriggerAndOverlay});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_tooltip__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/@react-aria/tooltip/dist/module.js"),_react_aria_focus__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusable.mjs"),_react_aria_overlays__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/Overlay.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useLayoutEffect.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_TooltipContext__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Tooltip/TooltipContext.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const TooltipTriggerAndOverlay=({tooltip,trigger,state,overlayRef,triggerRef,showOnFocus,positionAria,...props})=>{const[isInteractive,setInteractive]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),{triggerProps,tooltipProps}=useTooltipTrigger(props,{...state,close:isInteractive?state.close:()=>state.close(!0)},triggerRef);return showOnFocus||delete triggerProps.onFocus,(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.b)((()=>{setInteractive(null!==overlayRef.current?.querySelector('a, button, [role="button"], [role=link]'))})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[normalizeChildren(trigger,{...triggerProps,ref:triggerRef}),state.isOpen&&!props.isDisabled&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_aria_overlays__WEBPACK_IMPORTED_MODULE_3__.aV,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_TooltipContext__WEBPACK_IMPORTED_MODULE_4__.d.Provider,{value:{state,isInteractive,placement:positionAria.placement,pointerPositionStyle:positionAria.arrowProps.style},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__.d)(positionAria.overlayProps,tooltipProps),ref:overlayRef,children:tooltip})})})]})};function normalizeChildren(children,triggerProps){return"function"==typeof children?children(triggerProps):react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(children)&&"string"==typeof children.type?react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(children,triggerProps):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_aria_focus__WEBPACK_IMPORTED_MODULE_6__.t,{...triggerProps,children})}normalizeChildren.displayName="normalizeChildren";const useTooltipTrigger=(props,state,ref)=>{const{triggerProps,tooltipProps}=(0,_react_aria_tooltip__WEBPACK_IMPORTED_MODULE_7__.Q)(props,state,ref);return triggerProps.onPointerDown=()=>{ref.current instanceof HTMLInputElement||state.close(!0)},delete triggerProps.onMouseDown,{triggerProps,tooltipProps}};try{TooltipTriggerAndOverlay.displayName="TooltipTriggerAndOverlay",TooltipTriggerAndOverlay.__docgenInfo={description:"Sets {@param tooltip} for its {@param children}. It doesn't handle tooltip positioning, and so shouldn't be used\ndirectly. {@param tooltipOverlayProps} should be used to apply the intended positioning.\n\nTODO: Implement timeout-based auto-hide (https://jetbrains.github.io/ui/controls/tooltip/#19)\nTODO: shadow",displayName:"TooltipTriggerAndOverlay",props:{tooltip:{defaultValue:null,description:"Tooltip content. The value should be an element of type {@link Tooltip }.",name:"tooltip",required:!0,type:{name:"ReactElement<any, string | JSXElementConstructor<any>>"}},trigger:{defaultValue:null,description:"Either a focusable component, or a render function which accepts trigger props and passes it to some component.",name:"trigger",required:!0,type:{name:"ReactNode | ((props: HTMLAttributes<HTMLElement> & { ref: RefObject<HTMLElement>; }) => ReactNode)"}},state:{defaultValue:null,description:"",name:"state",required:!0,type:{name:"TooltipTriggerState"}},showOnFocus:{defaultValue:null,description:"",name:"showOnFocus",required:!1,type:{name:"boolean"}},positionAria:{defaultValue:null,description:"",name:"positionAria",required:!0,type:{name:"PositionAria"}},overlayRef:{defaultValue:null,description:"",name:"overlayRef",required:!0,type:{name:"RefObject<HTMLDivElement>"}},triggerRef:{defaultValue:null,description:"",name:"triggerRef",required:!0,type:{name:"RefObject<HTMLElement>"}},isDisabled:{defaultValue:null,description:"",name:"isDisabled",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Tooltip/TooltipTriggerAndOverlay.tsx#TooltipTriggerAndOverlay"]={docgenInfo:TooltipTriggerAndOverlay.__docgenInfo,name:"TooltipTriggerAndOverlay",path:"src/Tooltip/TooltipTriggerAndOverlay.tsx#TooltipTriggerAndOverlay"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/useMouseEventOverlayPosition.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{u:()=>useMouseEventOverlayPosition});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useLayoutEffect.mjs"),_react_aria_overlays__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/useOverlayPosition.mjs");let lastMouseClientPos,globalMoveHandler=null;function useMouseEventOverlayPosition(options){const targetRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.b)((()=>{if(globalMoveHandler||(globalMoveHandler=({clientX,clientY})=>{lastMouseClientPos={clientX,clientY}},document.addEventListener("mousemove",globalMoveHandler)),!targetRef.current){const fakeTarget=document.createElement("span");return Object.assign(fakeTarget.style,{width:"0px",height:"0px",pointerEvents:"none",position:"fixed",visibility:"hidden"}),document.body.appendChild(fakeTarget),targetRef.current=fakeTarget,()=>{fakeTarget.remove()}}}),[]);const updatePosition=e=>{const coordinatesSource=e||lastMouseClientPos;if(targetRef.current&&coordinatesSource){const{clientX,clientY}=coordinatesSource;targetRef.current.style.left=`${clientX+(options.crossOffset??0)}px`,targetRef.current.style.top=`${clientY}px`}_updatePosition()};(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.b)((()=>{options.isOpen&&updatePosition()}),[options.isOpen,targetRef.current]);const{updatePosition:_updatePosition,...result}=(0,_react_aria_overlays__WEBPACK_IMPORTED_MODULE_2__.t)({...options,targetRef});return{...result,updatePosition}}try{useMouseEventOverlayPosition.displayName="useMouseEventOverlayPosition",useMouseEventOverlayPosition.__docgenInfo={description:"",displayName:"useMouseEventOverlayPosition",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/useMouseEventOverlayPosition.tsx#useMouseEventOverlayPosition"]={docgenInfo:useMouseEventOverlayPosition.__docgenInfo,name:"useMouseEventOverlayPosition",path:"src/utils/useMouseEventOverlayPosition.tsx#useMouseEventOverlayPosition"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=4932.681f0396.iframe.bundle.js.map