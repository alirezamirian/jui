"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[258],{"./src/Menu/ContextMenuContainer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>ContextMenuContainer,U:()=>MENU_POSITION_TARGET_DATA_ATTRIBUTE});var react=__webpack_require__("../../node_modules/react/index.js"),mergeProps=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),useMenuTriggerState=__webpack_require__("../../node_modules/@react-stately/menu/dist/useMenuTriggerState.mjs");var MenuOverlayFromOrigin=__webpack_require__("./src/Menu/MenuOverlayFromOrigin.tsx");const ContextMenuContainer=react.forwardRef((({children,renderMenu,onOpen,isDisabled,...props},ref)=>{const state=(0,useMenuTriggerState.W)({}),{positionOrigin,containerProps,overlayRef}=(({isDisabled=!1,onOpen},state)=>{const[positionOrigin,setPositionOrigin]=(0,react.useState)();return{containerProps:isDisabled?{}:{onContextMenu:e=>{e.target instanceof Element&&(setPositionOrigin(e),onOpen?.({target:e.target}),e.preventDefault(),state.isOpen?(state.close(),setTimeout((()=>{state.open(null)}))):state.open(null))}},overlayRef:(0,react.useRef)(null),positionOrigin}})({onOpen,isDisabled},state),allProps=(0,mergeProps.d)(props,containerProps);return react.createElement(react.Fragment,null,"function"==typeof children?children(allProps):react.createElement("div",{...allProps,ref},children),state.isOpen&&react.createElement(MenuOverlayFromOrigin.Z,{onClose:state.close,ref:overlayRef,origin:positionOrigin,defaultAutoFocus:!0},renderMenu()))})),MENU_POSITION_TARGET_DATA_ATTRIBUTE="data-context-menu-position-target";ContextMenuContainer.__docgenInfo={description:"A generic container for context menu. It's the same as a normal div, only with an additional `renderMenu` prop,\nto be used to render context menu, when it's triggered.\nCloses the menu when a menu action is triggered.",methods:[],displayName:"ContextMenuContainer",props:{isDisabled:{required:!1,tsType:{name:"boolean"},description:"Whether opening contextmenu is disabled."},onOpen:{required:!1,tsType:{name:"signature",type:"function",raw:"(args: {\n  /**\n   * The target element on which contextmenu event was triggered.\n   */\n  target: Element;\n}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n  /**\n   * The target element on which contextmenu event was triggered.\n   */\n  target: Element;\n}",signature:{properties:[{key:"target",value:{name:"Element",required:!0},description:"The target element on which contextmenu event was triggered."}]}},name:"args"}],return:{name:"void"}}},description:"Called when contextmenu is opened.\n@param args"},renderMenu:{required:!0,tsType:{name:"signature",type:"function",raw:"() => React.ReactNode",signature:{arguments:[],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:"Will be called to return the Menu when context menu is triggered. Use {@link Menu} component to render a menu."},children:{required:!0,tsType:{name:"union",raw:"| React.ReactNode\n| ((props: HTMLAttributes<HTMLElement>) => React.ReactNode)",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"unknown"}]},description:"If children is a function, context menu props is passed to it, to be passed to the underlying element.\nOtherwise, a div container will be rendered."}},composes:["Omit"]}},"./src/Menu/MenuOverlay.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>MenuOverlay});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_utils_FocusScope__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/utils/FocusScope.tsx"),_intellij_platform_core_Menu_Menu__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/Menu/Menu.tsx"),_intellij_platform_core_Overlay__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Overlay/Overlay.tsx"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_react_aria_overlays__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/useOverlay.mjs"),_react_aria_overlays__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/usePreventScroll.mjs");function MenuOverlay({children,restoreFocus,overlayProps:otherOverlayProps,overlayRef:inputOverlayRef,defaultAutoFocus,onClose}){const overlayRef=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.B)(inputOverlayRef),{overlayProps}=(0,_react_aria_overlays__WEBPACK_IMPORTED_MODULE_2__.I)({onClose,shouldCloseOnBlur:!1,isOpen:!0,isKeyboardDismissDisabled:!1,isDismissable:!0,shouldCloseOnInteractOutside:element=>!(0,_intellij_platform_core_Overlay__WEBPACK_IMPORTED_MODULE_3__.Z)(overlayRef.current,element)},overlayRef);return(0,_react_aria_overlays__WEBPACK_IMPORTED_MODULE_4__.t)(),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{const onOutsideContextMenu=()=>{onClose()};return document.addEventListener("contextmenu",onOutsideContextMenu,{capture:!0}),()=>document.removeEventListener("contextmenu",onOutsideContextMenu)}),[]),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Overlay__WEBPACK_IMPORTED_MODULE_3__.a,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_utils_FocusScope__WEBPACK_IMPORTED_MODULE_5__.M,{restoreFocus,autoFocus:!0},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Menu_Menu__WEBPACK_IMPORTED_MODULE_6__.EC.Provider,{value:{close:onClose,defaultAutoFocus}},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_7__.d)(overlayProps,otherOverlayProps),ref:overlayRef},children))))}MenuOverlay.__docgenInfo={description:"Overlay container for Menu.\nPositioning is not implemented at this layer.\n{@link MenuOverlayProps#overlayProps} should be used for positioning.",methods:[],displayName:"MenuOverlay",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},restoreFocus:{required:!1,tsType:{name:"boolean"},description:""},overlayProps:{required:!0,tsType:{name:"HTMLProps",elements:[{name:"HTMLDivElement"}],raw:"HTMLProps<HTMLDivElement>"},description:""},overlayRef:{required:!1,tsType:{name:"ReactRef",raw:"React.Ref<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},description:""},defaultAutoFocus:{required:!1,tsType:{name:'MenuProps["autoFocus"]',raw:'MenuProps<unknown>["autoFocus"]'},description:"Sets the default value of {@link Menu}'s {@link MenuProps#autoFocus} prop."},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}}},"./src/Menu/MenuOverlayFromOrigin.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>MenuOverlayFromOrigin});var react=__webpack_require__("../../node_modules/react/index.js"),MenuOverlay=__webpack_require__("./src/Menu/MenuOverlay.tsx");function useOverlayPositionFromOrigin({overlayRef,origin,containerPadding}){const[position,setPosition]=(0,react.useState)({});return(0,react.useLayoutEffect)((()=>{const overlayElement=overlayRef.current;setPosition(origin&&overlayElement?function calculatePosition({clientX,clientY,overlayWidth,overlayHeight,containerPadding=0}){const totalWidth=document.documentElement.clientWidth-("object"==typeof containerPadding?containerPadding.x:containerPadding),totalHeight=document.documentElement.clientHeight-("object"==typeof containerPadding?containerPadding.y:containerPadding);let top=clientY,left=clientX;left+overlayWidth>totalWidth&&(left=totalWidth-overlayWidth);top+overlayHeight>totalHeight&&(top=totalHeight-overlayHeight);return top=Math.max(0,top),left=Math.max(0,left),{top,left}}({clientX:origin.clientX+1.5,clientY:origin.clientY,containerPadding,overlayWidth:overlayElement.offsetWidth,overlayHeight:overlayElement.offsetHeight}):{})}),[origin?.clientX,origin?.clientY]),{positionProps:{style:{position:"fixed",zIndex:1e5,...position}}}}var useObjectRef=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs"),isScrollable=__webpack_require__("../../node_modules/@react-aria/utils/dist/isScrollable.mjs"),getScrollParent=__webpack_require__("../../node_modules/@react-aria/utils/dist/getScrollParent.mjs");const DisableScrollStyles=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js").vJ`
  .disable-scroll {
      overflow: hidden !important;
  }
`,MenuOverlayFromOrigin=react.forwardRef((function MenuOverlayFromOrigin({children,origin,...otherProps},forwardedRef){const overlayRef=(0,useObjectRef.B)(forwardedRef),{positionProps}=useOverlayPositionFromOrigin({overlayRef,origin,containerPadding:{x:0,y:4}}),scrollParent=(0,react.useMemo)((()=>origin?.target instanceof HTMLElement?(0,isScrollable.a)(origin.target)?origin.target:(0,getScrollParent.r)(origin.target):null),[origin?.target]);return(0,react.useEffect)((()=>(scrollParent?.classList?.add("disable-scroll"),()=>{scrollParent?.classList?.remove("disable-scroll")})),[]),react.createElement(react.Fragment,null,react.createElement(DisableScrollStyles,null),Boolean(origin)&&react.createElement(MenuOverlay.T,{overlayProps:positionProps,overlayRef,restoreFocus:!0,...otherProps},children))}));MenuOverlayFromOrigin.__docgenInfo={description:"Menu overlay position based on an origin point on the screen.\nUseful when the menu is opened by a pointer event.",methods:[],displayName:"MenuOverlayFromOrigin",props:{origin:{required:!0,tsType:{name:"union",raw:"| {\n    /**\n     * Horizontal coordinate of the origin point within the viewport.\n     * See {@link MouseEvent.clientX}\n     */\n    clientX: number;\n    /**\n     * Vertical coordinate of the origin point within the viewport.\n     * See {@link MouseEvent.clientX}\n     */\n    clientY: number;\n\n    /**\n     * Origin's target element.\n     * Used to find the scrollable parent and disable scrolling while\n     * the overlay is rendered.\n     */\n    target?: EventTarget | HTMLElement | null;\n  }\n| undefined",elements:[{name:"signature",type:"object",raw:"{\n  /**\n   * Horizontal coordinate of the origin point within the viewport.\n   * See {@link MouseEvent.clientX}\n   */\n  clientX: number;\n  /**\n   * Vertical coordinate of the origin point within the viewport.\n   * See {@link MouseEvent.clientX}\n   */\n  clientY: number;\n\n  /**\n   * Origin's target element.\n   * Used to find the scrollable parent and disable scrolling while\n   * the overlay is rendered.\n   */\n  target?: EventTarget | HTMLElement | null;\n}",signature:{properties:[{key:"clientX",value:{name:"number",required:!0},description:"Horizontal coordinate of the origin point within the viewport.\nSee {@link MouseEvent.clientX}"},{key:"clientY",value:{name:"number",required:!0},description:"Vertical coordinate of the origin point within the viewport.\nSee {@link MouseEvent.clientX}"},{key:"target",value:{name:"union",raw:"EventTarget | HTMLElement | null",elements:[{name:"EventTarget"},{name:"HTMLElement"},{name:"null"}],required:!1},description:"Origin's target element.\nUsed to find the scrollable parent and disable scrolling while\nthe overlay is rendered."}]}},{name:"undefined"}]},description:"Origin point within the viewport, based on which the menu overlay should be positioned.\nAny pointer/mouse event, or a plain object with clientX and clientY can be passed."},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}},composes:["Pick"]}},"./src/utils/FocusScope.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>FocusScope});var _react_aria_focus__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/focus/dist/FocusScope.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");const FocusScope=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((function BetterFocusScope({children,...otherProps},ref){const directChildRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),focusManagerRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref,(()=>({focus:forceFocusFirst=>{const focusManager=focusManagerRef.current,containerElement=directChildRef.current?.parentElement;if(!focusManager)throw new Error("focus manager not found!");if(!containerElement)throw new Error("container element not found");if(forceFocusFirst)return focusManager.focusFirst();document.activeElement&&document.activeElement!==containerElement&&containerElement.contains(document.activeElement)||focusManager.focusNext({tabbable:!0})}})),[]),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_aria_focus__WEBPACK_IMPORTED_MODULE_1__.MT,otherProps,react__WEBPACK_IMPORTED_MODULE_0__.createElement(GetFocusManager,{ref:focusManagerRef}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{"data-focus-root-direct-child":"",hidden:!0,ref:directChildRef}),children)})),GetFocusManager=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((function FocusScopeHandle(props,ref){const focusManager=(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_1__.bO)();return(0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref,(()=>focusManager),[focusManager]),null}));FocusScope.__docgenInfo={description:"A version of FocusScope which also allows for imperatively moving focus to the scope.\nand has tiny patches/improvements\nIt's useful for",methods:[{name:"focus",docblock:null,modifiers:[],params:[{name:"forceFocusFirst",optional:!0,type:{name:"boolean"}}],returns:null}],displayName:"FocusScope"}}}]);
//# sourceMappingURL=258.561a9d74.iframe.bundle.js.map