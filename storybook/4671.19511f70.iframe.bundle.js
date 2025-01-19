"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[4671],{"./src/Tooltip/Tooltip.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{u:()=>_Tooltip});var react=__webpack_require__("../../node_modules/react/index.js"),dist_module=__webpack_require__("../../node_modules/@react-aria/tooltip/dist/module.js"),useObjectRef=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs"),styled=__webpack_require__("./src/styled.ts"),style_constants=__webpack_require__("./src/style-constants.ts"),TooltipContext=__webpack_require__("./src/Tooltip/TooltipContext.tsx"),compose=__webpack_require__("./node_modules/ramda/es/compose.js"),identity=__webpack_require__("./node_modules/ramda/es/identity.js");const tooltipBackground=({theme})=>theme.color("ToolTip.background",theme.dark?"#3c3f41":"#f2f2f2"),TRANSLATE="translate(-6px, -9px)",sideStyles={top:styled.iv`
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
`;function normalizeCssValue(value){return"number"==typeof value?`${value}px`:value}const withMin=min=>value=>null!=value?`max(${min}px, ${normalizeCssValue(value)})`:value,withMax=max=>value=>null!=value?`min(${max}px, ${normalizeCssValue(value)})`:value,HEIGHT_OFFSET=13,WIDTH_OFFSET=10;function limitPointerPositionStyles({width,height},{top,left,right,bottom}){const applyVerticalMinMax=(0,compose.Z)(height?withMax(height-HEIGHT_OFFSET):identity.Z,withMin(HEIGHT_OFFSET)),applyHorizontalMinMax=(0,compose.Z)(width?withMax(width-WIDTH_OFFSET):identity.Z,withMin(WIDTH_OFFSET));return{top:applyVerticalMinMax(top),bottom:applyVerticalMinMax(bottom),left:applyHorizontalMinMax(left),right:applyHorizontalMinMax(right)}}const getOffsetCssProp=(side,invert)=>"top"===side||"bottom"===side?invert?"right":"left":invert?"bottom":"top";function pointerPositionToOffsetStyle({side,offset="50%"}){const{invert=!1,value:offsetValue}="object"==typeof offset?offset:{invert:!1,value:offset};return{[getOffsetCssProp(side,invert)]:offsetValue}}function TooltipPointer({side,offset,tooltipRef}){const[size,setSize]=(0,react.useState)({height:void 0,width:void 0});return(0,react.useEffect)((()=>{const{offsetHeight,offsetWidth}=tooltipRef.current||{};offsetHeight==size?.height&&offsetWidth==size?.width||setSize({height:offsetHeight,width:offsetWidth})})),react.createElement(StyledTooltipPointer,{side,style:limitPointerPositionStyles(size,"specific"===offset.type?pointerPositionToOffsetStyle({side,offset:offset.value}):offset.value)})}TooltipPointer.__docgenInfo={description:"",methods:[],displayName:"TooltipPointer",props:{side:{required:!0,tsType:{name:"union",raw:'TooltipPointerPosition["side"]'},description:""},offset:{required:!0,tsType:{name:"union",raw:'| { type: "calculated"; value: CSSProperties }\n| { type: "specific"; value: TooltipPointerPosition["offset"] }',elements:[{name:"signature",type:"object",raw:'{ type: "calculated"; value: CSSProperties }',signature:{properties:[{key:"type",value:{name:"literal",value:'"calculated"',required:!0}},{key:"value",value:{name:"CSSProperties",required:!0}}]}},{name:"signature",type:"object",raw:'{ type: "specific"; value: TooltipPointerPosition["offset"] }',signature:{properties:[{key:"type",value:{name:"literal",value:'"specific"',required:!0}},{key:"value",value:{name:"union",raw:'TooltipPointerPosition["offset"]',required:!0}}]}}]},description:""},tooltipRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLElement"}],raw:"RefObject<HTMLElement>"},description:""}}};const StyledTooltip=styled.zo.div`
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
`,placementToPointerSide={bottom:"top",top:"bottom",left:"right",right:"left",center:"top"},Tooltip=react.forwardRef((function Tooltip({children,multiline,withPointer,...props},forwardedRef){const ref=(0,useObjectRef.B)(forwardedRef),{state,isInteractive,pointerPositionStyle,placement="bottom"}=(0,react.useContext)(TooltipContext.d)||{},{tooltipProps}=(0,dist_module.l)(props,state?{...state,open:isInteractive?state?.open:()=>{}}:state),{side,offset}="object"==typeof withPointer?withPointer:{side:placementToPointerSide[placement],offset:void 0};return react.createElement(StyledTooltip,{hasPointer:Boolean(withPointer),multiline,...tooltipProps,className:props.className,ref},withPointer&&react.createElement(TooltipPointer,{tooltipRef:ref,side,offset:offset||!pointerPositionStyle?{type:"specific",value:offset}:{type:"calculated",value:pointerPositionStyle}}),children)})),_Tooltip=Object.assign(Tooltip,{Header:StyledHeader,Shortcut:StyledShortcut,Description:StyledDescription,Link:StyledLink});Tooltip.__docgenInfo={description:"Implements the UI of a Tooltip. For tooltip to be shown for a trigger, on hover, use {@link TooltipTrigger}.\nThe following components can be used to compose the content of a tooltip.\n- {@link Tooltip.Header}\n- {@link Tooltip.Description}\n- {@link Tooltip.Link}\n- {@link Tooltip.Shortcut}\nPrefer using higher-level components like {@link HelpTooltip}, {@link ActionHelpTooltip} or {@link ActionTooltip}.\nthat ensure different pieces of tooltip content follow the\n[design system recommendation](https://jetbrains.github.io/ui/controls/tooltip)\n\n\n### Reference:\nTooltip, Tooltip.* and TooltipTrigger are corresponding to [HelpTooltip](https://github.com/JetBrains/intellij-community/blob/854daf45b47a6ea9da0348978608bfbfe998d99c/platform/platform-api/src/com/intellij/ide/HelpTooltip.java#L102)\nin the original impl.",methods:[],displayName:"Tooltip",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},multiline:{required:!1,tsType:{name:"boolean"},description:""},className:{required:!1,tsType:{name:"string"},description:""},withPointer:{required:!1,tsType:{name:"union",raw:"boolean | TooltipPointerPosition",elements:[{name:"boolean"},{name:"signature",type:"object",raw:'{\n  /**\n   * The side of the tooltip the pointer is shown\n   */\n  side: "top" | "bottom" | "left" | "right";\n  /**\n   * - When side is "top" or "bottom":\n   *   Horizontal offset (in px) with respect to the left (or right, if negative) of the tooltip.\n   * - When side is "left" or "right":\n   *   Vertical offset (in px) with respect to the top (or bottom, if negative) of the tooltip.\n   *\n   * @default: \'50%\'\n   */\n  offset?: OffsetValue | { value: OffsetValue; invert?: boolean };\n}',signature:{properties:[{key:"side",value:{name:"union",raw:'"top" | "bottom" | "left" | "right"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'},{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}],required:!0},description:"The side of the tooltip the pointer is shown"},{key:"offset",value:{name:"union",raw:"OffsetValue | { value: OffsetValue; invert?: boolean }",elements:[{name:"union",raw:"number | `${number}%`",elements:[{name:"number"},{name:"literal",value:"`${number}%`"}],required:!0},{name:"signature",type:"object",raw:"{ value: OffsetValue; invert?: boolean }",signature:{properties:[{key:"value",value:{name:"union",raw:"number | `${number}%`",elements:[{name:"number"},{name:"literal",value:"`${number}%`"}],required:!0}},{key:"invert",value:{name:"boolean",required:!1}}]}}],required:!1},description:'- When side is "top" or "bottom":\n  Horizontal offset (in px) with respect to the left (or right, if negative) of the tooltip.\n- When side is "left" or "right":\n  Vertical offset (in px) with respect to the top (or bottom, if negative) of the tooltip.\n\n@default: \'50%\''}]}}]},description:"Whether (and in what position) the arrow pointer should be shown.\nWhen using {@link TooltipTrigger} or {@link PositionedTooltipTrigger}, the position of the pointer is calculated\nbased on the target element, and a boolean value to define whether the arrow should be shown or not would suffice.\n\nTooltips with pointer have slight style difference.\n{@see https://www.figma.com/file/nfDfMAdV7j2fnQlpYNAOfP/IntelliJ-Platform-UI-Kit-(Community)?type=design&node-id=15-51&mode=design&t=7PplrxG8ZfXB4hIK-0}\n\n@example\n<Tooltip withPointer />\n// shows the pointer in the position controlled by {@link TooltipTrigger} or {@link PositionedTooltipTrigger}\n// If there is not `TooltipTrigger` or `PositionedTooltipTrigger`, the arrow is shown on top center by default.\n\n@example\n<Tooltip withPointer={{side: 'top', offset: 30}} />\n// shows the pointer on the top side, with horizontal offset of 30px from the left of tooltip, regardless\n// of whether `TooltipTrigger` or `PositionedTooltipTrigger` is used.\n\n@example\n<Tooltip withPointer={{side: 'left', offset: -30}} />\n// shows the pointer on the left side, with vertidcal offset of 30px from the bottom of the tooltip, regardless\n// of whether `TooltipTrigger` or `PositionedTooltipTrigger` is used."}},composes:["Omit"]}},"./src/Tooltip/TooltipContext.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>TooltipContext});const TooltipContext=__webpack_require__("../../node_modules/react/index.js").createContext(null)},"./src/style-constants.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>WINDOW_SHADOW});const WINDOW_SHADOW="box-shadow: 0 5px 15px rgb(0 0 0 / 30%)"}}]);
//# sourceMappingURL=4671.19511f70.iframe.bundle.js.map