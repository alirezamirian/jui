"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[2110],{"../../node_modules/@react-stately/tooltip/dist/module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>$8796f90736e175cb$export$4d40659c25ecb50b});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_stately_overlays__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-stately/overlays/dist/useOverlayTriggerState.mjs");const $8796f90736e175cb$var$TOOLTIP_DELAY=1500,$8796f90736e175cb$var$TOOLTIP_COOLDOWN=500;let $8796f90736e175cb$var$tooltips={},$8796f90736e175cb$var$tooltipId=0,$8796f90736e175cb$var$globalWarmedUp=!1,$8796f90736e175cb$var$globalWarmUpTimeout=null,$8796f90736e175cb$var$globalCooldownTimeout=null;function $8796f90736e175cb$export$4d40659c25ecb50b(props={}){let{delay=$8796f90736e175cb$var$TOOLTIP_DELAY}=props,{isOpen,open,close}=(0,_react_stately_overlays__WEBPACK_IMPORTED_MODULE_1__.d)(props),id=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>""+ ++$8796f90736e175cb$var$tooltipId),[]),closeTimeout=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),ensureTooltipEntry=()=>{$8796f90736e175cb$var$tooltips[id]=hideTooltip},closeOpenTooltips=()=>{for(let hideTooltipId in $8796f90736e175cb$var$tooltips)hideTooltipId!==id&&($8796f90736e175cb$var$tooltips[hideTooltipId](!0),delete $8796f90736e175cb$var$tooltips[hideTooltipId])},showTooltip=()=>{clearTimeout(closeTimeout.current),closeTimeout.current=null,closeOpenTooltips(),ensureTooltipEntry(),$8796f90736e175cb$var$globalWarmedUp=!0,open(),$8796f90736e175cb$var$globalWarmUpTimeout&&(clearTimeout($8796f90736e175cb$var$globalWarmUpTimeout),$8796f90736e175cb$var$globalWarmUpTimeout=null),$8796f90736e175cb$var$globalCooldownTimeout&&(clearTimeout($8796f90736e175cb$var$globalCooldownTimeout),$8796f90736e175cb$var$globalCooldownTimeout=null)},hideTooltip=immediate=>{immediate?(clearTimeout(closeTimeout.current),closeTimeout.current=null,close()):closeTimeout.current||(closeTimeout.current=setTimeout((()=>{closeTimeout.current=null,close()}),$8796f90736e175cb$var$TOOLTIP_COOLDOWN)),$8796f90736e175cb$var$globalWarmUpTimeout&&(clearTimeout($8796f90736e175cb$var$globalWarmUpTimeout),$8796f90736e175cb$var$globalWarmUpTimeout=null),$8796f90736e175cb$var$globalWarmedUp&&($8796f90736e175cb$var$globalCooldownTimeout&&clearTimeout($8796f90736e175cb$var$globalCooldownTimeout),$8796f90736e175cb$var$globalCooldownTimeout=setTimeout((()=>{delete $8796f90736e175cb$var$tooltips[id],$8796f90736e175cb$var$globalCooldownTimeout=null,$8796f90736e175cb$var$globalWarmedUp=!1}),$8796f90736e175cb$var$TOOLTIP_COOLDOWN))};return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>()=>{clearTimeout(closeTimeout.current),$8796f90736e175cb$var$tooltips[id]&&delete $8796f90736e175cb$var$tooltips[id]}),[id]),{isOpen,open:immediate=>{!immediate&&delay>0&&!closeTimeout.current?(closeOpenTooltips(),ensureTooltipEntry(),isOpen||$8796f90736e175cb$var$globalWarmUpTimeout||$8796f90736e175cb$var$globalWarmedUp?isOpen||showTooltip():$8796f90736e175cb$var$globalWarmUpTimeout=setTimeout((()=>{$8796f90736e175cb$var$globalWarmUpTimeout=null,$8796f90736e175cb$var$globalWarmedUp=!0,showTooltip()}),delay)):showTooltip()},close:hideTooltip}}},"./src/Toolbar/Toolbar.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{FirstItemDivider:()=>FirstItemDivider,Horizontal:()=>Horizontal,HorizontalOverflow:()=>HorizontalOverflow,LastItemDivider:()=>LastItemDivider,OverflowFittedInViewport:()=>OverflowFittedInViewport,OverflowWithCustomItems:()=>OverflowWithCustomItems,OverflowWrap:()=>OverflowWrap,Vertical:()=>Vertical,VerticalOverflow:()=>VerticalOverflow,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var _intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/IconButton/IconButton.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Icon/PlatformIcon.tsx"),_Toolbar__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Toolbar/Toolbar.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/styled.ts"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/Menu/MenuTrigger.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/Menu/Menu.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./src/Collections/Item.ts"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./src/Tooltip/TooltipTrigger.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./src/Tooltip/ActionTooltip.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Toolbar",component:_Toolbar__WEBPACK_IMPORTED_MODULE_2__.o,args:{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.hU,{"aria-label":"Hide",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__.vq,{icon:"actions/arrowCollapse"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Toolbar__WEBPACK_IMPORTED_MODULE_2__.J,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.hU,{"aria-label":"Add",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__.vq,{icon:"general/add"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.hU,{"aria-label":"Checkout",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__.vq,{icon:"actions/checkOut"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.hU,{"aria-label":"Delete",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__.vq,{icon:"actions/gc"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.hU,{"aria-label":"Show Diff",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__.vq,{icon:"actions/diff"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.hU,{"aria-label":"Find",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__.vq,{icon:"actions/find"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Toolbar__WEBPACK_IMPORTED_MODULE_2__.J,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.hU,{"aria-label":"Expand All",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__.vq,{icon:"actions/expandall"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.hU,{"aria-label":"Collapse All",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__.vq,{icon:"actions/collapseall"})})]})},argTypes:{}},render=props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Toolbar__WEBPACK_IMPORTED_MODULE_2__.o,{...props});render.displayName="render";const Horizontal={render,args:{orientation:"horizontal"}},sizeArgType={control:{type:"range",min:0,max:300,step:10}},HorizontalOverflow={render:({containerWidth=140,children,...props})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{width:containerWidth},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Toolbar__WEBPACK_IMPORTED_MODULE_2__.o,{...props,children})}),args:{orientation:"horizontal"},argTypes:{containerWidth:sizeArgType}},OverflowWrap={...HorizontalOverflow,args:{...HorizontalOverflow.args,overflowBehavior:"wrap"}},Vertical={render,args:{orientation:"vertical"}},VerticalOverflow={render:({containerHeight=140,children,...props})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{height:containerHeight},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Toolbar__WEBPACK_IMPORTED_MODULE_2__.o,{...props,children})}),args:{orientation:"vertical"},argTypes:{containerHeight:sizeArgType}},OverflowFittedInViewport={render:(props,context)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{display:"flex",justifyContent:"end",paddingRight:20},children:HorizontalOverflow.render?.(props,context)}),args:{orientation:"horizontal"},argTypes:{containerWidth:sizeArgType}},StyledDropdownButton=_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__.zo.button`
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
`,OverflowWithCustomItems={render:({containerWidth=140,...props})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{width:containerWidth},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_Toolbar__WEBPACK_IMPORTED_MODULE_2__.o,{...props,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_6__.b,{renderMenu:({menuProps})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_7__.v2,{...menuProps,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_8__.c,{children:"Select..."}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_8__.c,{children:"Last 24 hours"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_8__.c,{children:"Last 7 days"})]}),children:(props,ref)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(StyledDropdownButton,{...props,ref,children:["Date ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__.vq,{icon:"general/arrowDownSmall.svg"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_6__.b,{renderMenu:({menuProps})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_7__.v2,{...menuProps,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_8__.c,{children:"Select..."}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_8__.c,{children:"me"})]}),children:(props,ref)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(StyledDropdownButton,{...props,ref,children:["User ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__.vq,{icon:"general/arrowDownSmall.svg"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_6__.b,{renderMenu:({menuProps})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_7__.v2,{...menuProps,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_8__.c,{children:"Select in..."}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_8__.c,{children:"Select in Tree..."})]}),children:(props,ref)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(StyledDropdownButton,{...props,ref,children:["Paths ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__.vq,{icon:"general/arrowDownSmall.svg"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Toolbar__WEBPACK_IMPORTED_MODULE_2__.J,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_9__.a,{tooltip:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_10__.M,{actionName:"Open New Git Log Tab"}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.hU,{"aria-label":"Checkout",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__.vq,{icon:"actions/openNewTab.svg"})})})]})}),args:{orientation:"horizontal"},argTypes:{containerWidth:sizeArgType}},LastItemDivider={render:({children,...props})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_Toolbar__WEBPACK_IMPORTED_MODULE_2__.o,{...props,children:[children,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Toolbar__WEBPACK_IMPORTED_MODULE_2__.J,{})]})},FirstItemDivider={render:({children,...props})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_Toolbar__WEBPACK_IMPORTED_MODULE_2__.o,{...props,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Toolbar__WEBPACK_IMPORTED_MODULE_2__.J,{}),children]})};Horizontal.parameters={...Horizontal.parameters,docs:{...Horizontal.parameters?.docs,source:{originalSource:'{\n  render,\n  args: {\n    orientation: "horizontal"\n  }\n}',...Horizontal.parameters?.docs?.source}}},HorizontalOverflow.parameters={...HorizontalOverflow.parameters,docs:{...HorizontalOverflow.parameters?.docs,source:{originalSource:'{\n  render: ({\n    containerWidth = 140,\n    children,\n    ...props\n  }: HorizontalOverflowProps) => <div style={{\n    width: containerWidth\n  }}>\n      <Toolbar {...props}>{children}</Toolbar>\n    </div>,\n  args: {\n    orientation: "horizontal"\n  },\n  argTypes: {\n    containerWidth: sizeArgType\n  }\n}',...HorizontalOverflow.parameters?.docs?.source}}},OverflowWrap.parameters={...OverflowWrap.parameters,docs:{...OverflowWrap.parameters?.docs,source:{originalSource:'{\n  ...HorizontalOverflow,\n  args: {\n    ...HorizontalOverflow.args,\n    overflowBehavior: "wrap"\n  }\n}',...OverflowWrap.parameters?.docs?.source}}},Vertical.parameters={...Vertical.parameters,docs:{...Vertical.parameters?.docs,source:{originalSource:'{\n  render,\n  args: {\n    orientation: "vertical"\n  }\n}',...Vertical.parameters?.docs?.source}}},VerticalOverflow.parameters={...VerticalOverflow.parameters,docs:{...VerticalOverflow.parameters?.docs,source:{originalSource:'{\n  render: ({\n    containerHeight = 140,\n    children,\n    ...props\n  }: VerticalOverflowProps) => <div style={{\n    height: containerHeight\n  }}>\n      <Toolbar {...props}>{children}</Toolbar>\n    </div>,\n  args: {\n    orientation: "vertical"\n  },\n  argTypes: {\n    containerHeight: sizeArgType\n  }\n}',...VerticalOverflow.parameters?.docs?.source}}},OverflowFittedInViewport.parameters={...OverflowFittedInViewport.parameters,docs:{...OverflowFittedInViewport.parameters?.docs,source:{originalSource:'{\n  render: (props: HorizontalOverflowProps, context: any) => <div style={{\n    display: "flex",\n    justifyContent: "end",\n    paddingRight: 20\n  }}>\n      {HorizontalOverflow.render?.((props as any), context)}\n    </div>,\n  args: {\n    orientation: "horizontal"\n  },\n  argTypes: {\n    containerWidth: sizeArgType\n  }\n}',...OverflowFittedInViewport.parameters?.docs?.source}}},OverflowWithCustomItems.parameters={...OverflowWithCustomItems.parameters,docs:{...OverflowWithCustomItems.parameters?.docs,source:{originalSource:'{\n  render: ({\n    containerWidth = 140,\n    ...props\n  }: HorizontalOverflowProps) => <div style={{\n    width: containerWidth\n  }}>\n      <Toolbar {...props}>\n        <MenuTrigger renderMenu={({\n        menuProps\n      }) => <Menu {...menuProps}>\n              <Item>Select...</Item>\n              <Item>Last 24 hours</Item>\n              <Item>Last 7 days</Item>\n            </Menu>}>\n          {(props, ref) => <StyledDropdownButton {...props} ref={ref}>\n              Date <PlatformIcon icon="general/arrowDownSmall.svg" />\n            </StyledDropdownButton>}\n        </MenuTrigger>\n        <MenuTrigger renderMenu={({\n        menuProps\n      }) => <Menu {...menuProps}>\n              <Item>Select...</Item>\n              <Item>me</Item>\n            </Menu>}>\n          {(props, ref) => <StyledDropdownButton {...props} ref={ref}>\n              User <PlatformIcon icon="general/arrowDownSmall.svg" />\n            </StyledDropdownButton>}\n        </MenuTrigger>\n        <MenuTrigger renderMenu={({\n        menuProps\n      }) => <Menu {...menuProps}>\n              <Item>Select in...</Item>\n              <Item>Select in Tree...</Item>\n            </Menu>}>\n          {(props, ref) => <StyledDropdownButton {...props} ref={ref}>\n              Paths <PlatformIcon icon="general/arrowDownSmall.svg" />\n            </StyledDropdownButton>}\n        </MenuTrigger>\n        <ToolbarSeparator />\n        <TooltipTrigger tooltip={<ActionTooltip actionName={"Open New Git Log Tab"} />}>\n          <IconButton aria-label="Checkout">\n            <PlatformIcon icon="actions/openNewTab.svg" />\n          </IconButton>\n        </TooltipTrigger>\n      </Toolbar>\n    </div>,\n  args: {\n    orientation: "horizontal"\n  },\n  argTypes: {\n    containerWidth: sizeArgType\n  }\n}',...OverflowWithCustomItems.parameters?.docs?.source}}},LastItemDivider.parameters={...LastItemDivider.parameters,docs:{...LastItemDivider.parameters?.docs,source:{originalSource:"{\n  render: ({\n    children,\n    ...props\n  }: ToolbarProps) => <Toolbar {...props}>\n      {children}\n      <ToolbarSeparator />\n    </Toolbar>\n}",...LastItemDivider.parameters?.docs?.source}}},FirstItemDivider.parameters={...FirstItemDivider.parameters,docs:{...FirstItemDivider.parameters?.docs,source:{originalSource:"{\n  render: ({\n    children,\n    ...props\n  }: ToolbarProps) => <Toolbar {...props}>\n      <ToolbarSeparator />\n      {children}\n    </Toolbar>\n}",...FirstItemDivider.parameters?.docs?.source}}};const __namedExportsOrder=["Horizontal","HorizontalOverflow","OverflowWrap","Vertical","VerticalOverflow","OverflowFittedInViewport","OverflowWithCustomItems","LastItemDivider","FirstItemDivider"]},"./src/Menu/MenuOverlay.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>MenuOverlay});__webpack_require__("../../node_modules/react/index.js");var _intellij_platform_core_utils_FocusScope__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/utils/FocusScope.tsx"),_intellij_platform_core_Menu_Menu__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Menu/Menu.tsx"),_intellij_platform_core_Overlay__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Overlay/Overlay.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");function MenuOverlay({children,restoreFocus,overlayProps,overlayRef,defaultAutoFocus,state}){return state.isOpen?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core_Overlay__WEBPACK_IMPORTED_MODULE_2__.a,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core_utils_FocusScope__WEBPACK_IMPORTED_MODULE_3__.M,{restoreFocus,autoFocus:!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core_Menu_Menu__WEBPACK_IMPORTED_MODULE_4__.EC.Provider,{value:{...state,defaultAutoFocus},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{...overlayProps,ref:overlayRef,children})})})}):null}MenuOverlay.displayName="MenuOverlay";try{MenuOverlay.displayName="MenuOverlay",MenuOverlay.__docgenInfo={description:"Overlay container for menu. Extracted into a separate component, to be used by components like MenuTrigger or\nContextMenuContainer, that need to render a menu as an overlay.",displayName:"MenuOverlay",props:{restoreFocus:{defaultValue:null,description:"",name:"restoreFocus",required:!1,type:{name:"boolean"}},overlayProps:{defaultValue:null,description:"",name:"overlayProps",required:!0,type:{name:"HTMLProps<HTMLDivElement>"}},overlayRef:{defaultValue:null,description:"",name:"overlayRef",required:!0,type:{name:"Ref<HTMLDivElement>"}},defaultAutoFocus:{defaultValue:null,description:"Sets the default value of {@link Menu }'s {@link MenuProps#autoFocus } prop.",name:"defaultAutoFocus",required:!1,type:{name:"boolean | FocusStrategy"}},state:{defaultValue:null,description:"",name:"state",required:!0,type:{name:"MenuTriggerState"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Menu/MenuOverlay.tsx#MenuOverlay"]={docgenInfo:MenuOverlay.__docgenInfo,name:"MenuOverlay",path:"src/Menu/MenuOverlay.tsx#MenuOverlay"})}catch(__react_docgen_typescript_loader_error){}},"./src/Menu/MenuTrigger.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{b:()=>MenuTrigger});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_button__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/button/dist/useButton.mjs"),_react_aria_menu__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/menu/dist/useMenuTrigger.mjs"),_react_aria_overlays__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/useOverlay.mjs"),_react_aria_overlays__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/useOverlayPosition.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_react_stately_menu__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-stately/menu/dist/useMenuTriggerState.mjs"),_MenuOverlay__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/Menu/MenuOverlay.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const MenuTrigger=({children,renderMenu,direction="bottom",align="start",shouldFlip=!0,restoreFocus=!0,preventFocusOnPress=!0,positioningTargetRef,...otherProps})=>{const state=(0,_react_stately_menu__WEBPACK_IMPORTED_MODULE_2__.W)(otherProps),triggerRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),overlayRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),{menuTriggerProps:triggerProps,menuProps}=(0,_react_aria_menu__WEBPACK_IMPORTED_MODULE_3__.u)({type:"menu"},state,triggerRef),ariaButtonProps={...triggerProps,preventFocusOnPress},{buttonProps}=(0,_react_aria_button__WEBPACK_IMPORTED_MODULE_4__.U)(ariaButtonProps,triggerRef),{overlayProps}=(0,_react_aria_overlays__WEBPACK_IMPORTED_MODULE_5__.I)({onClose:()=>state.close(),shouldCloseOnBlur:!1,isOpen:state.isOpen,isKeyboardDismissDisabled:!1,isDismissable:!0,shouldCloseOnInteractOutside:element=>!element.matches("[role=menu] *")},overlayRef),{overlayProps:positionProps}=(0,_react_aria_overlays__WEBPACK_IMPORTED_MODULE_6__.t)({targetRef:positioningTargetRef??triggerRef,overlayRef,placement:getPlacement(direction,align),shouldFlip,offset:0,containerPadding:0,isOpen:state.isOpen});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[children(buttonProps,triggerRef),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_MenuOverlay__WEBPACK_IMPORTED_MODULE_7__.T,{overlayProps:(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_8__.d)(overlayProps,positionProps),overlayRef,state,restoreFocus,children:renderMenu({menuProps})})]})};function getPlacement(direction,align){switch(direction){case"left":case"right":case"start":case"end":return`${direction} ${"end"===align?"bottom":"top"}`;default:return`${direction} ${align}`}}try{MenuTrigger.displayName="MenuTrigger",MenuTrigger.__docgenInfo={description:"Makes its children a trigger for a menu, rendered via {@link MenuTriggerProps#renderMenu } prop.\nCloses the menu when a menu action is triggered.",displayName:"MenuTrigger",props:{restoreFocus:{defaultValue:{value:"true"},description:"",name:"restoreFocus",required:!1,type:{name:"boolean"}},preventFocusOnPress:{defaultValue:{value:"true"},description:"",name:"preventFocusOnPress",required:!1,type:{name:"boolean"}},positioningTargetRef:{defaultValue:null,description:"By default, the menu is positioned relative to the trigger. `positioningTargetRef` can be used to have the menu\npositioned to another element. An example use case is when the menu trigger is a button inside some list item or\ntext box, but the menu semantically belongs to the container list item or text box.",name:"positioningTargetRef",required:!1,type:{name:"RefObject<HTMLElement>"}},renderMenu:{defaultValue:null,description:"",name:"renderMenu",required:!0,type:{name:'(props: { menuProps: Pick<AriaMenuOptions<unknown>, "autoFocus" | "id" | "aria-labelledby" | "onClose">; }) => ReactNode'}},align:{defaultValue:{value:"start"},description:"Alignment of the menu relative to the trigger.",name:"align",required:!1,type:{name:"enum",value:[{value:'"start"'},{value:'"end"'}]}},direction:{defaultValue:{value:"bottom"},description:"Where the Menu opens relative to its trigger.",name:"direction",required:!1,type:{name:"enum",value:[{value:'"bottom"'},{value:'"top"'},{value:'"left"'},{value:'"start"'},{value:'"right"'},{value:'"end"'}]}},shouldFlip:{defaultValue:{value:"true"},description:"Whether the menu should automatically flip direction when space is limited.",name:"shouldFlip",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Menu/MenuTrigger.tsx#MenuTrigger"]={docgenInfo:MenuTrigger.__docgenInfo,name:"MenuTrigger",path:"src/Menu/MenuTrigger.tsx#MenuTrigger"})}catch(__react_docgen_typescript_loader_error){}},"./src/Tooltip/ActionTooltip.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>ActionTooltip});__webpack_require__("../../node_modules/react/index.js");var _intellij_platform_core_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Tooltip/Tooltip.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const ActionTooltip=({actionName,shortcut,...tooltipProps})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_2__.u,{...tooltipProps,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_intellij_platform_core_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_2__.u.Header,{children:[actionName,shortcut&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_2__.u.Shortcut,{children:shortcut})]})});ActionTooltip.displayName="ActionTooltip";try{ActionTooltip.displayName="ActionTooltip",ActionTooltip.__docgenInfo={description:'Tooltip of type "Action"',displayName:"ActionTooltip",props:{actionName:{defaultValue:null,description:"",name:"actionName",required:!0,type:{name:"ReactNode"}},shortcut:{defaultValue:null,description:"",name:"shortcut",required:!1,type:{name:"ReactNode"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},withPointer:{defaultValue:null,description:"Whether (and in what position) the arrow pointer should be shown.\nWhen using {@link TooltipTrigger } or {@link PositionedTooltipTrigger }, the position of the pointer is calculated\nbased on the target element, and a boolean value to define whether the arrow should be shown or not would suffice.\n\nTooltips with pointer have slight style difference.\n{@see https://www.figma.com/file/nfDfMAdV7j2fnQlpYNAOfP/IntelliJ-Platform-UI-Kit-(Community)?type=design&node-id=15-51&mode=design&t=7PplrxG8ZfXB4hIK-0}\n@example <Tooltip withPointer />\n// shows the pointer in the position controlled by {@link TooltipTrigger } or {@link PositionedTooltipTrigger }// If there is not `TooltipTrigger` or `PositionedTooltipTrigger`, the arrow is shown on top center by default.\n@example <Tooltip withPointer={{side: 'top', offset: 30}} />\n// shows the pointer on the top side, with horizontal offset of 30px from the left of tooltip, regardless\n// of whether `TooltipTrigger` or `PositionedTooltipTrigger` is used.\n@example <Tooltip withPointer={{side: 'left', offset: -30}} />\n// shows the pointer on the left side, with vertidcal offset of 30px from the bottom of the tooltip, regardless\n// of whether `TooltipTrigger` or `PositionedTooltipTrigger` is used.",name:"withPointer",required:!1,type:{name:"boolean | TooltipPointerPosition"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Tooltip/ActionTooltip.tsx#ActionTooltip"]={docgenInfo:ActionTooltip.__docgenInfo,name:"ActionTooltip",path:"src/Tooltip/ActionTooltip.tsx#ActionTooltip"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/FocusScope.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>FocusScope});var _react_aria_focus__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/focus/dist/FocusScope.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const FocusScope=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((function BetterFocusScope({children,...otherProps},ref){const directChildRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),focusManagerRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref,(()=>({focus:forceFocusFirst=>{const focusManager=focusManagerRef.current,containerElement=directChildRef.current?.parentElement;if(!focusManager)throw new Error("focus manager not found!");if(!containerElement)throw new Error("container element not found");if(forceFocusFirst)return focusManager.focusFirst();document.activeElement&&document.activeElement!==containerElement&&containerElement.contains(document.activeElement)||focusManager.focusNext({tabbable:!0})}})),[]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_react_aria_focus__WEBPACK_IMPORTED_MODULE_2__.MT,{...otherProps,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(GetFocusManager,{ref:focusManagerRef}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{"data-focus-root-direct-child":"",hidden:!0,ref:directChildRef}),children]})})),GetFocusManager=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((function FocusScopeHandle(props,ref){const focusManager=(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_2__.bO)();return(0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref,(()=>focusManager),[focusManager]),null}));try{FocusScope.displayName="FocusScope",FocusScope.__docgenInfo={description:"A version of FocusScope which also allows for imperatively moving focus to the scope.\nand has tiny patches/improvements\nIt's useful for",displayName:"FocusScope",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/FocusScope.tsx#FocusScope"]={docgenInfo:FocusScope.__docgenInfo,name:"FocusScope",path:"src/utils/FocusScope.tsx#FocusScope"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/ramda/es/internal/_dispatchable.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_dispatchable});var _isArray=__webpack_require__("./node_modules/ramda/es/internal/_isArray.js");function _dispatchable(methodNames,xf,fn){return function(){if(0===arguments.length)return fn();var args=Array.prototype.slice.call(arguments,0),obj=args.pop();if(!(0,_isArray.Z)(obj)){for(var idx=0;idx<methodNames.length;){if("function"==typeof obj[methodNames[idx]])return obj[methodNames[idx]].apply(obj,args);idx+=1}if(function _isTransformer(obj){return null!=obj&&"function"==typeof obj["@@transducer/step"]}(obj))return xf.apply(null,args)(obj)}return fn.apply(this,arguments)}}},"./node_modules/ramda/es/internal/_has.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _has(prop,obj){return Object.prototype.hasOwnProperty.call(obj,prop)}__webpack_require__.d(__webpack_exports__,{Z:()=>_has})},"./node_modules/ramda/es/internal/_xfBase.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={init:function(){return this.xf["@@transducer/init"]()},result:function(result){return this.xf["@@transducer/result"](result)}}}}]);