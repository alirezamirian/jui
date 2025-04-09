"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[2110],{"./src/Toolbar/Toolbar.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{FirstItemDivider:()=>FirstItemDivider,Horizontal:()=>Horizontal,HorizontalOverflow:()=>HorizontalOverflow,LastItemDivider:()=>LastItemDivider,OverflowFittedInViewport:()=>OverflowFittedInViewport,OverflowWithCustomItems:()=>OverflowWithCustomItems,OverflowWrap:()=>OverflowWrap,Vertical:()=>Vertical,VerticalOverflow:()=>VerticalOverflow,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/IconButton/IconButton.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Icon/PlatformIcon.tsx"),_Toolbar__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/Toolbar/Toolbar.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/styled.ts"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/Menu/MenuTrigger.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/Menu/Menu.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/Collections/Item.ts"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./src/Tooltip/TooltipTrigger.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./src/Tooltip/ActionTooltip.tsx");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Toolbar",component:_Toolbar__WEBPACK_IMPORTED_MODULE_1__.o,args:{children:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.hU,{"aria-label":"Hide"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.vq,{icon:"actions/arrowCollapse"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Toolbar__WEBPACK_IMPORTED_MODULE_1__.J,null),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.hU,{"aria-label":"Add"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.vq,{icon:"general/add"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.hU,{"aria-label":"Checkout"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.vq,{icon:"actions/checkOut"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.hU,{"aria-label":"Delete"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.vq,{icon:"actions/gc"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.hU,{"aria-label":"Show Diff"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.vq,{icon:"actions/diff"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.hU,{"aria-label":"Find"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.vq,{icon:"actions/find"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Toolbar__WEBPACK_IMPORTED_MODULE_1__.J,null),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.hU,{"aria-label":"Expand All"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.vq,{icon:"actions/expandall"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.hU,{"aria-label":"Collapse All"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.vq,{icon:"actions/collapseall"})))},argTypes:{}},render=props=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Toolbar__WEBPACK_IMPORTED_MODULE_1__.o,props),Horizontal={render,args:{orientation:"horizontal"}},sizeArgType={control:{type:"range",min:0,max:300,step:10}},HorizontalOverflow={render:({containerWidth=140,children,...props})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{style:{width:containerWidth}},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Toolbar__WEBPACK_IMPORTED_MODULE_1__.o,props,children)),args:{orientation:"horizontal"},argTypes:{containerWidth:sizeArgType}},OverflowWrap={...HorizontalOverflow,args:{...HorizontalOverflow.args,overflowBehavior:"wrap"}},Vertical={render,args:{orientation:"vertical"}},VerticalOverflow={render:({containerHeight=140,children,...props})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{style:{height:containerHeight}},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Toolbar__WEBPACK_IMPORTED_MODULE_1__.o,props,children)),args:{orientation:"vertical"},argTypes:{containerHeight:sizeArgType}},OverflowFittedInViewport={render:(props,context)=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{style:{display:"flex",justifyContent:"end",paddingRight:20}},HorizontalOverflow.render?.(props,context)),args:{orientation:"horizontal"},argTypes:{containerWidth:sizeArgType}},StyledDropdownButton=_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__.zo.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding-left: 0.25rem;
  background: ${({theme})=>theme.color("ComboBoxButton.background")};
  color: ${({theme})=>theme.color("ComboBox.disabledForeground")};
  &:hover {
    color: ${({theme})=>theme.color("*.foreground")};
  }
`,OverflowWithCustomItems={render:({containerWidth=140,...props})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{style:{width:containerWidth}},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Toolbar__WEBPACK_IMPORTED_MODULE_1__.o,props,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__.b,{renderMenu:({menuProps})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_6__.v2,menuProps,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_7__.c,null,"Select..."),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_7__.c,null,"Last 24 hours"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_7__.c,null,"Last 7 days"))},((props,ref)=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledDropdownButton,{...props,ref},"Date ",react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.vq,{icon:"general/arrowDownSmall.svg"})))),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__.b,{renderMenu:({menuProps})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_6__.v2,menuProps,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_7__.c,null,"Select..."),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_7__.c,null,"me"))},((props,ref)=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledDropdownButton,{...props,ref},"User ",react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.vq,{icon:"general/arrowDownSmall.svg"})))),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__.b,{renderMenu:({menuProps})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_6__.v2,menuProps,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_7__.c,null,"Select in..."),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_7__.c,null,"Select in Tree..."))},((props,ref)=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledDropdownButton,{...props,ref},"Paths ",react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.vq,{icon:"general/arrowDownSmall.svg"})))),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Toolbar__WEBPACK_IMPORTED_MODULE_1__.J,null),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_8__.a,{tooltip:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_9__.M,{actionName:"Open New Git Log Tab"})},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.hU,{"aria-label":"Checkout"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.vq,{icon:"actions/openNewTab.svg"}))))),args:{orientation:"horizontal"},argTypes:{containerWidth:sizeArgType}},LastItemDivider={render:({children,...props})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Toolbar__WEBPACK_IMPORTED_MODULE_1__.o,props,children,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Toolbar__WEBPACK_IMPORTED_MODULE_1__.J,null))},FirstItemDivider={render:({children,...props})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Toolbar__WEBPACK_IMPORTED_MODULE_1__.o,props,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Toolbar__WEBPACK_IMPORTED_MODULE_1__.J,null),children)},__namedExportsOrder=["Horizontal","HorizontalOverflow","OverflowWrap","Vertical","VerticalOverflow","OverflowFittedInViewport","OverflowWithCustomItems","LastItemDivider","FirstItemDivider"];Horizontal.parameters={...Horizontal.parameters,docs:{...Horizontal.parameters?.docs,source:{originalSource:'{\n  render,\n  args: {\n    orientation: "horizontal"\n  }\n}',...Horizontal.parameters?.docs?.source}}},HorizontalOverflow.parameters={...HorizontalOverflow.parameters,docs:{...HorizontalOverflow.parameters?.docs,source:{originalSource:'{\n  render: ({\n    containerWidth = 140,\n    children,\n    ...props\n  }: HorizontalOverflowProps) => <div style={{\n    width: containerWidth\n  }}>\n      <Toolbar {...props}>{children}</Toolbar>\n    </div>,\n  args: {\n    orientation: "horizontal"\n  },\n  argTypes: {\n    containerWidth: sizeArgType\n  }\n}',...HorizontalOverflow.parameters?.docs?.source}}},OverflowWrap.parameters={...OverflowWrap.parameters,docs:{...OverflowWrap.parameters?.docs,source:{originalSource:'{\n  ...HorizontalOverflow,\n  args: {\n    ...HorizontalOverflow.args,\n    overflowBehavior: "wrap"\n  }\n}',...OverflowWrap.parameters?.docs?.source}}},Vertical.parameters={...Vertical.parameters,docs:{...Vertical.parameters?.docs,source:{originalSource:'{\n  render,\n  args: {\n    orientation: "vertical"\n  }\n}',...Vertical.parameters?.docs?.source}}},VerticalOverflow.parameters={...VerticalOverflow.parameters,docs:{...VerticalOverflow.parameters?.docs,source:{originalSource:'{\n  render: ({\n    containerHeight = 140,\n    children,\n    ...props\n  }: VerticalOverflowProps) => <div style={{\n    height: containerHeight\n  }}>\n      <Toolbar {...props}>{children}</Toolbar>\n    </div>,\n  args: {\n    orientation: "vertical"\n  },\n  argTypes: {\n    containerHeight: sizeArgType\n  }\n}',...VerticalOverflow.parameters?.docs?.source}}},OverflowFittedInViewport.parameters={...OverflowFittedInViewport.parameters,docs:{...OverflowFittedInViewport.parameters?.docs,source:{originalSource:'{\n  render: (props: HorizontalOverflowProps, context: any) => <div style={{\n    display: "flex",\n    justifyContent: "end",\n    paddingRight: 20\n  }}>\n      {HorizontalOverflow.render?.(props as any, context)}\n    </div>,\n  args: {\n    orientation: "horizontal"\n  },\n  argTypes: {\n    containerWidth: sizeArgType\n  }\n}',...OverflowFittedInViewport.parameters?.docs?.source}}},OverflowWithCustomItems.parameters={...OverflowWithCustomItems.parameters,docs:{...OverflowWithCustomItems.parameters?.docs,source:{originalSource:'{\n  render: ({\n    containerWidth = 140,\n    ...props\n  }: HorizontalOverflowProps) => <div style={{\n    width: containerWidth\n  }}>\n      <Toolbar {...props}>\n        <MenuTrigger renderMenu={({\n        menuProps\n      }) => <Menu {...menuProps}>\n              <Item>Select...</Item>\n              <Item>Last 24 hours</Item>\n              <Item>Last 7 days</Item>\n            </Menu>}>\n          {(props, ref) => <StyledDropdownButton {...props} ref={ref}>\n              Date <PlatformIcon icon="general/arrowDownSmall.svg" />\n            </StyledDropdownButton>}\n        </MenuTrigger>\n        <MenuTrigger renderMenu={({\n        menuProps\n      }) => <Menu {...menuProps}>\n              <Item>Select...</Item>\n              <Item>me</Item>\n            </Menu>}>\n          {(props, ref) => <StyledDropdownButton {...props} ref={ref}>\n              User <PlatformIcon icon="general/arrowDownSmall.svg" />\n            </StyledDropdownButton>}\n        </MenuTrigger>\n        <MenuTrigger renderMenu={({\n        menuProps\n      }) => <Menu {...menuProps}>\n              <Item>Select in...</Item>\n              <Item>Select in Tree...</Item>\n            </Menu>}>\n          {(props, ref) => <StyledDropdownButton {...props} ref={ref}>\n              Paths <PlatformIcon icon="general/arrowDownSmall.svg" />\n            </StyledDropdownButton>}\n        </MenuTrigger>\n        <ToolbarSeparator />\n        <TooltipTrigger tooltip={<ActionTooltip actionName={"Open New Git Log Tab"} />}>\n          <IconButton aria-label="Checkout">\n            <PlatformIcon icon="actions/openNewTab.svg" />\n          </IconButton>\n        </TooltipTrigger>\n      </Toolbar>\n    </div>,\n  args: {\n    orientation: "horizontal"\n  },\n  argTypes: {\n    containerWidth: sizeArgType\n  }\n}',...OverflowWithCustomItems.parameters?.docs?.source}}},LastItemDivider.parameters={...LastItemDivider.parameters,docs:{...LastItemDivider.parameters?.docs,source:{originalSource:"{\n  render: ({\n    children,\n    ...props\n  }: ToolbarProps) => <Toolbar {...props}>\n      {children}\n      <ToolbarSeparator />\n    </Toolbar>\n}",...LastItemDivider.parameters?.docs?.source}}},FirstItemDivider.parameters={...FirstItemDivider.parameters,docs:{...FirstItemDivider.parameters?.docs,source:{originalSource:"{\n  render: ({\n    children,\n    ...props\n  }: ToolbarProps) => <Toolbar {...props}>\n      <ToolbarSeparator />\n      {children}\n    </Toolbar>\n}",...FirstItemDivider.parameters?.docs?.source}}}},"./src/Menu/MenuOverlay.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>MenuOverlay});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_utils_FocusScope__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/utils/FocusScope.tsx"),_intellij_platform_core_Menu_Menu__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/Menu/Menu.tsx"),_intellij_platform_core_Overlay__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Overlay/Overlay.tsx"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_react_aria_overlays__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/useOverlay.mjs"),_react_aria_overlays__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/usePreventScroll.mjs");function MenuOverlay({children,restoreFocus,overlayProps:otherOverlayProps,overlayRef:inputOverlayRef,defaultAutoFocus,onClose}){const overlayRef=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.B)(inputOverlayRef),{overlayProps}=(0,_react_aria_overlays__WEBPACK_IMPORTED_MODULE_2__.I)({onClose,shouldCloseOnBlur:!1,isOpen:!0,isKeyboardDismissDisabled:!1,isDismissable:!0,shouldCloseOnInteractOutside:element=>!(0,_intellij_platform_core_Overlay__WEBPACK_IMPORTED_MODULE_3__.Z)(overlayRef.current,element)},overlayRef);return(0,_react_aria_overlays__WEBPACK_IMPORTED_MODULE_4__.t)(),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{const onOutsideContextMenu=()=>{onClose()};return document.addEventListener("contextmenu",onOutsideContextMenu,{capture:!0}),()=>document.removeEventListener("contextmenu",onOutsideContextMenu)}),[]),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Overlay__WEBPACK_IMPORTED_MODULE_3__.a,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_utils_FocusScope__WEBPACK_IMPORTED_MODULE_5__.M,{restoreFocus,autoFocus:!0},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Menu_Menu__WEBPACK_IMPORTED_MODULE_6__.EC.Provider,{value:{close:onClose,defaultAutoFocus}},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_7__.d)(overlayProps,otherOverlayProps),ref:overlayRef},children))))}MenuOverlay.__docgenInfo={description:"Overlay container for Menu.\nPositioning is not implemented at this layer.\n{@link MenuOverlayProps#overlayProps} should be used for positioning.",methods:[],displayName:"MenuOverlay",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},restoreFocus:{required:!1,tsType:{name:"boolean"},description:""},overlayProps:{required:!0,tsType:{name:"HTMLProps",elements:[{name:"HTMLDivElement"}],raw:"HTMLProps<HTMLDivElement>"},description:""},overlayRef:{required:!1,tsType:{name:"ReactRef",raw:"React.Ref<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},description:""},defaultAutoFocus:{required:!1,tsType:{name:'MenuProps["autoFocus"]',raw:'MenuProps<unknown>["autoFocus"]'},description:"Sets the default value of {@link Menu}'s {@link MenuProps#autoFocus} prop."},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}}},"./src/Menu/MenuTrigger.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{b:()=>MenuTrigger});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_button__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/button/dist/useButton.mjs"),_react_aria_menu__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/menu/dist/useMenuTrigger.mjs"),_react_aria_overlays__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/useOverlayPosition.mjs"),_react_stately_menu__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-stately/menu/dist/useMenuTriggerState.mjs"),_MenuOverlay__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/Menu/MenuOverlay.tsx");const MenuTrigger=({children,renderMenu,direction="bottom",align="start",shouldFlip=!0,restoreFocus=!0,preventFocusOnPress=!0,positioningTargetRef,...otherProps})=>{const state=(0,_react_stately_menu__WEBPACK_IMPORTED_MODULE_1__.W)(otherProps),triggerRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),overlayRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),{menuTriggerProps:triggerProps,menuProps}=(0,_react_aria_menu__WEBPACK_IMPORTED_MODULE_2__.u)({type:"menu"},state,triggerRef),ariaButtonProps={...triggerProps,preventFocusOnPress},{buttonProps}=(0,_react_aria_button__WEBPACK_IMPORTED_MODULE_3__.U)(ariaButtonProps,triggerRef),{overlayProps:positionProps}=(0,_react_aria_overlays__WEBPACK_IMPORTED_MODULE_4__.t)({targetRef:positioningTargetRef??triggerRef,overlayRef,placement:getPlacement(direction,align),shouldFlip,offset:0,containerPadding:0,onClose:()=>state.close(),isOpen:state.isOpen});return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,children(buttonProps,triggerRef),state.isOpen&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MenuOverlay__WEBPACK_IMPORTED_MODULE_5__.T,{overlayProps:positionProps,overlayRef,onClose:state.close,restoreFocus},renderMenu({menuProps})))};function getPlacement(direction,align){switch(direction){case"left":case"right":case"start":case"end":return`${direction} ${"end"===align?"bottom":"top"}`;default:return`${direction} ${align}`}}MenuTrigger.__docgenInfo={description:"Makes its children a trigger for a menu, rendered via {@link MenuTriggerProps#renderMenu} prop.\nCloses the menu when a menu action is triggered.",methods:[],displayName:"MenuTrigger",props:{restoreFocus:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},children:{required:!0,tsType:{name:"signature",type:"function",raw:"(\n  props: HTMLAttributes<HTMLButtonElement>,\n  ref: RefObject<any> // Using a generic didn't seem to work for some reason\n) => React.ReactNode",signature:{arguments:[{type:{name:"HTMLAttributes",elements:[{name:"HTMLButtonElement"}],raw:"HTMLAttributes<HTMLButtonElement>"},name:"props"},{type:{name:"RefObject",elements:[{name:"any"}],raw:"RefObject<any>"},name:"ref"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},preventFocusOnPress:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},positioningTargetRef:{required:!1,tsType:{name:"ReactRefObject",raw:"React.RefObject<HTMLElement>",elements:[{name:"HTMLElement"}]},description:"By default, the menu is positioned relative to the trigger. `positioningTargetRef` can be used to have the menu\npositioned to another element. An example use case is when the menu trigger is a button inside some list item or\ntext box, but the menu semantically belongs to the container list item or text box."},renderMenu:{required:!0,tsType:{name:"signature",type:"function",raw:'(props: {\n  // AriaMenuOptions contains more properties than needed\n  menuProps: Pick<\n    AriaMenuOptions<unknown>,\n    "id" | "aria-labelledby" | "autoFocus" | "onClose"\n  >;\n}) => React.ReactNode',signature:{arguments:[{type:{name:"signature",type:"object",raw:'{\n  // AriaMenuOptions contains more properties than needed\n  menuProps: Pick<\n    AriaMenuOptions<unknown>,\n    "id" | "aria-labelledby" | "autoFocus" | "onClose"\n  >;\n}',signature:{properties:[{key:"menuProps",value:{name:"Pick",elements:[{name:"AriaMenuOptions",elements:[{name:"unknown"}],raw:"AriaMenuOptions<unknown>"},{name:"union",raw:'"id" | "aria-labelledby" | "autoFocus" | "onClose"',elements:[{name:"literal",value:'"id"'},{name:"literal",value:'"aria-labelledby"'},{name:"literal",value:'"autoFocus"'},{name:"literal",value:'"onClose"'}]}],raw:'Pick<\n  AriaMenuOptions<unknown>,\n  "id" | "aria-labelledby" | "autoFocus" | "onClose"\n>',required:!0}}]}},name:"props"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},align:{required:!1,tsType:{name:"Alignment"},description:"Alignment of the menu relative to the trigger.\n@default 'start'",defaultValue:{value:'"start"',computed:!1}},direction:{required:!1,tsType:{name:"union",raw:'"bottom" | "top" | "left" | "right" | "start" | "end"',elements:[{name:"literal",value:'"bottom"'},{name:"literal",value:'"top"'},{name:"literal",value:'"left"'},{name:"literal",value:'"right"'},{name:"literal",value:'"start"'},{name:"literal",value:'"end"'}]},description:"Where the Menu opens relative to its trigger.\n@default 'bottom'",defaultValue:{value:'"bottom"',computed:!1}},shouldFlip:{required:!1,tsType:{name:"boolean"},description:"Whether the menu should automatically flip direction when space is limited.\n@default true",defaultValue:{value:"true",computed:!1}}},composes:["Omit"]}},"./src/Tooltip/ActionTooltip.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>ActionTooltip});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/Tooltip/Tooltip.tsx");const ActionTooltip=({actionName,shortcut,...tooltipProps})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_1__.u,tooltipProps,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_1__.u.Header,null,actionName,shortcut&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_1__.u.Shortcut,null,shortcut)));ActionTooltip.__docgenInfo={description:'Tooltip of type "Action"\n@see {@link ActionHelpTooltip} {@link HelpTooltip}\n@see https://jetbrains.github.io/ui/controls/tooltip/#02',methods:[],displayName:"ActionTooltip",props:{actionName:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},shortcut:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}},composes:["Omit"]}},"./src/Tooltip/TooltipTrigger.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{a:()=>TooltipTrigger});var react=__webpack_require__("../../node_modules/react/index.js"),dist_module=__webpack_require__("../../node_modules/@react-stately/tooltip/dist/module.js"),useLayoutEffect=__webpack_require__("../../node_modules/@react-aria/utils/dist/useLayoutEffect.mjs"),useOverlayPosition=__webpack_require__("../../node_modules/@react-aria/overlays/dist/useOverlayPosition.mjs");let lastMouseClientPos,globalMoveHandler=null;var styled=__webpack_require__("./src/styled.ts"),TooltipTriggerAndOverlay=__webpack_require__("./src/Tooltip/TooltipTriggerAndOverlay.tsx");const TooltipTrigger=({tooltip,children,delay=500,offset,placement="bottom left",...props})=>{const triggerRef=(0,react.useRef)(null),theme=(0,styled.Fg)(),state=(0,dist_module.O)({...props,delay}),overlayRef=(0,react.useRef)(null),positionAria=function useMouseEventOverlayPosition(options){const targetRef=(0,react.useRef)(null);(0,useLayoutEffect.b)((()=>{if(globalMoveHandler||(globalMoveHandler=({clientX,clientY})=>{lastMouseClientPos={clientX,clientY}},document.addEventListener("mousemove",globalMoveHandler)),!targetRef.current){const fakeTarget=document.createElement("span");return Object.assign(fakeTarget.style,{width:"0px",height:"0px",pointerEvents:"none",position:"fixed",visibility:"hidden"}),document.body.appendChild(fakeTarget),targetRef.current=fakeTarget,()=>{fakeTarget.remove()}}}),[]);const updatePosition=e=>{const coordinatesSource=e||lastMouseClientPos;if(targetRef.current&&coordinatesSource){const{clientX,clientY}=coordinatesSource;targetRef.current.style.left=`${clientX+(options.crossOffset??0)}px`,targetRef.current.style.top=`${clientY}px`}_updatePosition()};(0,useLayoutEffect.b)((()=>{options.isOpen&&updatePosition()}),[options.isOpen,targetRef.current]);const{updatePosition:_updatePosition,...result}=(0,useOverlayPosition.t)({...options,targetRef});return{...result,updatePosition}}({overlayRef,isOpen:state.isOpen,placement,shouldFlip:!0,offset:offset??theme.value("HelpTooltip.mouseCursorOffset")??20});return(0,react.useEffect)((()=>{state.isOpen&&requestAnimationFrame((()=>{positionAria.updatePosition()}))}),[state.isOpen]),react.createElement(TooltipTriggerAndOverlay.t,{tooltip,positionAria,trigger:children,state,overlayRef,triggerRef,showOnFocus:!1,isDisabled:props.isDisabled})};TooltipTrigger.__docgenInfo={description:"Sets {@param tooltip} for its {@param children}.\nShowing tooltip on focus and controlled open state are not supported at the moment, based on how tooltip works in the\nreference impl, and since tooltip is positioned based on cursor position. Positioning the tooltip based on cursor\nposition requires tooltip to be opened on hover. That's why neither controlling opened state nor showing the tooltip\non focus are supported here. {@link PositionedTooltipTrigger} allows for positioning the tooltip with respect to the\ntrigger element, and offers more options.",methods:[],displayName:"TooltipTrigger",props:{tooltip:{required:!0,tsType:{name:"ReactElement"},description:"Tooltip content. The value should be an element of type {@link Tooltip}."},placement:{required:!1,tsType:{name:'AriaPositionProps["placement"]',raw:'AriaPositionProps["placement"]'},description:'Placement of the tooltip with respect to the cursor\n@default "bottom left"',defaultValue:{value:'"bottom left"',computed:!1}},offset:{required:!1,tsType:{name:"number"},description:'The additional offset applied along the main axis between the element and its\nanchor element.\n@default theme.value<number>("HelpTooltip.mouseCursorOffset") ?? 20'},children:{required:!0,tsType:{name:"union",raw:"| React.ReactNode\n| ((\n    props: HTMLAttributes<HTMLElement> & { ref: RefObject<HTMLElement> }\n  ) => React.ReactNode)",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"unknown"}]},description:"Either a focusable component, or a render function which accepts trigger props and passes it to some component."},delay:{defaultValue:{value:"500",computed:!1},required:!1}},composes:["Omit"]}},"./src/Tooltip/TooltipTriggerAndOverlay.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{t:()=>TooltipTriggerAndOverlay});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_tooltip__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/@react-aria/tooltip/dist/module.js"),_react_aria_focus__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusable.mjs"),_react_aria_overlays__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/Overlay.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useLayoutEffect.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_TooltipContext__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Tooltip/TooltipContext.tsx");const TooltipTriggerAndOverlay=({tooltip,trigger,state,overlayRef,triggerRef,showOnFocus,positionAria,...props})=>{const[isInteractive,setInteractive]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),{triggerProps,tooltipProps}=useTooltipTrigger(props,{...state,close:isInteractive?state.close:()=>state.close(!0)},triggerRef);return showOnFocus||delete triggerProps.onFocus,(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.b)((()=>{setInteractive(null!==overlayRef.current?.querySelector('a, button, [role="button"], [role=link]'))})),react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,function normalizeChildren(children,triggerProps){if("function"==typeof children)return children(triggerProps);if(react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(children)&&"string"==typeof children.type)return react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(children,triggerProps);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_aria_focus__WEBPACK_IMPORTED_MODULE_5__.t,triggerProps,children)}(trigger,{...triggerProps,ref:triggerRef}),state.isOpen&&!props.isDisabled&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_aria_overlays__WEBPACK_IMPORTED_MODULE_2__.aV,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_TooltipContext__WEBPACK_IMPORTED_MODULE_3__.d.Provider,{value:{state,isInteractive,placement:positionAria.placement,pointerPositionStyle:positionAria.arrowProps.style}},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_4__.d)(positionAria.overlayProps,tooltipProps),ref:overlayRef},tooltip))))};const useTooltipTrigger=(props,state,ref)=>{const{triggerProps,tooltipProps}=(0,_react_aria_tooltip__WEBPACK_IMPORTED_MODULE_6__.Q)(props,state,ref);return triggerProps.onPointerDown=()=>{ref.current instanceof HTMLInputElement||state.close(!0)},delete triggerProps.onMouseDown,{triggerProps,tooltipProps}};TooltipTriggerAndOverlay.__docgenInfo={description:"Sets {@param tooltip} for its {@param children}. It doesn't handle tooltip positioning, and so shouldn't be used\ndirectly. {@param tooltipOverlayProps} should be used to apply the intended positioning.\n\nTODO: Implement timeout-based auto-hide (https://jetbrains.github.io/ui/controls/tooltip/#19)\nTODO: shadow",methods:[],displayName:"TooltipTriggerAndOverlay",props:{tooltip:{required:!0,tsType:{name:"ReactElement"},description:"Tooltip content. The value should be an element of type {@link Tooltip}."},trigger:{required:!0,tsType:{name:"union",raw:"| React.ReactNode\n| ((\n    props: HTMLAttributes<HTMLElement> & { ref: RefObject<T> }\n  ) => React.ReactNode)",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"unknown"}]},description:"Either a focusable component, or a render function which accepts trigger props and passes it to some component."},state:{required:!0,tsType:{name:"TooltipTriggerState"},description:""},showOnFocus:{required:!1,tsType:{name:"boolean"},description:""},positionAria:{required:!0,tsType:{name:"PositionAria"},description:""},overlayRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDivElement"}],raw:"RefObject<HTMLDivElement>"},description:""},triggerRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"T"}],raw:"RefObject<T>"},description:""},isDisabled:{required:!1,tsType:{name:"boolean"},description:""}}}},"./src/utils/FocusScope.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>FocusScope});var _react_aria_focus__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/focus/dist/FocusScope.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");const FocusScope=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((function BetterFocusScope({children,...otherProps},ref){const directChildRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),focusManagerRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref,(()=>({focus:forceFocusFirst=>{const focusManager=focusManagerRef.current,containerElement=directChildRef.current?.parentElement;if(!focusManager)throw new Error("focus manager not found!");if(!containerElement)throw new Error("container element not found");if(forceFocusFirst)return focusManager.focusFirst();document.activeElement&&document.activeElement!==containerElement&&containerElement.contains(document.activeElement)||focusManager.focusNext({tabbable:!0})}})),[]),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_aria_focus__WEBPACK_IMPORTED_MODULE_1__.MT,otherProps,react__WEBPACK_IMPORTED_MODULE_0__.createElement(GetFocusManager,{ref:focusManagerRef}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{"data-focus-root-direct-child":"",hidden:!0,ref:directChildRef}),children)})),GetFocusManager=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((function FocusScopeHandle(props,ref){const focusManager=(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_1__.bO)();return(0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref,(()=>focusManager),[focusManager]),null}));FocusScope.__docgenInfo={description:"A version of FocusScope which also allows for imperatively moving focus to the scope.\nand has tiny patches/improvements\nIt's useful for",methods:[{name:"focus",docblock:null,modifiers:[],params:[{name:"forceFocusFirst",optional:!0,type:{name:"boolean"}}],returns:null}],displayName:"FocusScope"}}}]);
//# sourceMappingURL=Toolbar-Toolbar-stories.a17d030e.iframe.bundle.js.map