"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[941],{"./src/Collections/Divider.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>DividerItem,c:()=>_Divider});class DividerItem{static seq=0;key="divider_"+DividerItem.seq++;get id(){return this.key}}function Divider({}){return null}let _Divider=Divider;Divider.getCollectionNode=function*getCollectionNode(props){yield{type:"divider",element:null,props,rendered:null,hasChildNodes:!1}}},"./src/List/ListContext.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{E:()=>ListContext});const ListContext=__webpack_require__("../../node_modules/react/index.js").createContext(null)},"./src/List/ListItem.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{c:()=>ListItem});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_selection__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/selection/useSelectableItem.tsx"),_intellij_platform_core_Collections__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Collections/ItemStateContext.tsx"),_StyledListItem__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/List/StyledListItem.tsx"),_intellij_platform_core_List_ListContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/List/ListContext.tsx");function ListItem({item,children}){const{state,focused:listFocused,onAction}=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_intellij_platform_core_List_ListContext__WEBPACK_IMPORTED_MODULE_1__.E),ref=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),isDisabled=state.disabledKeys.has(item.key),isSelected=state.selectionManager.isSelected(item.key),{itemProps}=(0,_intellij_platform_core_selection__WEBPACK_IMPORTED_MODULE_2__.p)({key:item.key,ref,onAction:()=>onAction?.(item.key),selectionManager:state.selectionManager});return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_StyledListItem__WEBPACK_IMPORTED_MODULE_3__.H,{containerFocused:listFocused,selected:isSelected,disabled:isDisabled,"aria-disabled":isDisabled,"aria-selected":isSelected,"aria-label":item["aria-label"],...itemProps,ref},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Collections__WEBPACK_IMPORTED_MODULE_4__.k.Provider,{value:{isDisabled,isSelected,isContainerFocused:listFocused,node:item}},children||item.rendered))}ListItem.__docgenInfo={description:"",methods:[],displayName:"ListItem",props:{item:{required:!0,tsType:{name:"Node",elements:[{name:"T"}],raw:"Node<T>"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}}},"./src/List/useList.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{U:()=>useList});var react=__webpack_require__("../../node_modules/react/index.js"),ListKeyboardDelegate=__webpack_require__("../../node_modules/@react-aria/selection/dist/ListKeyboardDelegate.mjs"),useCollator=__webpack_require__("../../node_modules/@react-aria/i18n/dist/useCollator.mjs"),useSelectableCollection=__webpack_require__("./src/selection/useSelectableCollection.ts"),useCollectionAutoScroll=__webpack_require__("./src/Collections/useCollectionAutoScroll.ts");var useFocusWithin=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocusWithin.mjs"),mergeProps=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),useEventCallback=__webpack_require__("./src/utils/useEventCallback.ts"),useCollectionFocusProxy=__webpack_require__("./src/Collections/useCollectionFocusProxy.ts");function useList({onAction,showAsFocused,focusProxyRef,...props},state,ref){const{listProps:{onMouseDown,...listProps}}=function useSelectableList(props){let{selectionManager,collection,disabledKeys,ref,keyboardDelegate,autoFocus,shouldFocusWrap,isVirtualized,disallowEmptySelection,selectOnFocus=!1,disallowTypeAhead,shouldUseVirtualFocus,allowsTabNavigation}=props,collator=(0,useCollator.Q)({usage:"search",sensitivity:"base"}),delegate=(0,react.useMemo)((()=>keyboardDelegate||new ListKeyboardDelegate.n(collection,disabledKeys,ref,collator)),[keyboardDelegate,collection,disabledKeys,ref,collator]);(0,useCollectionAutoScroll.o)({isVirtualized,selectionManager},ref);let{collectionProps}=(0,useSelectableCollection.y)({ref,selectionManager,keyboardDelegate:delegate,autoFocus,shouldFocusWrap,disallowEmptySelection,selectOnFocus,disallowTypeAhead,shouldUseVirtualFocus,allowsTabNavigation});return{listProps:collectionProps}}({...props,ref,selectionManager:state.selectionManager,disallowEmptySelection:!props.allowEmptySelection,collection:state.collection,disabledKeys:state.disabledKeys,selectOnFocus:!0});(0,useCollectionFocusProxy.w)({focusProxyRef,onAction,state,collectionRef:ref});const[focused,setFocused]=(0,react.useState)(!1),{focusWithinProps}=(0,useFocusWithin.R)({onFocusWithinChange:setFocused});(0,react.useEffect)((()=>{const firstKey=state.collection.getFirstKey();!props.allowEmptySelection&&state.selectionManager.isEmpty&&firstKey&&(state.selectionManager.setFocusedKey(firstKey),state.selectionManager.select(firstKey))}),[!props.allowEmptySelection]);const onActionCallback=(0,useEventCallback.D)(onAction??(()=>{})),listContext=(0,react.useMemo)((()=>({state,focused:Boolean(focused||showAsFocused),onAction:onActionCallback})),[state,focused,showAsFocused]);return{listProps:(0,mergeProps.v)(listProps,focusWithinProps),listContext,focused}}},"./src/List/useListState.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{p:()=>useListState_useListState});var useListState=__webpack_require__("../../node_modules/@react-stately/list/dist/useListState.mjs"),react=__webpack_require__("../../node_modules/react/index.js");function useListState_useListState(props){const state=(0,useListState.p)({...props,selectionBehavior:"replace"});return function useCollectionRef({selectionManagerRef},state){(0,react.useImperativeHandle)(selectionManagerRef,(()=>state.selectionManager))}(props,state),state}},"./src/List/useListVirtualizer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>useListVirtualizer});var react=__webpack_require__("../../node_modules/react/index.js"),VariableWidthListLayout=__webpack_require__("./src/VariableWidthListLayout.tsx"),useVirtualizerItem=__webpack_require__("../../node_modules/@react-aria/virtualizer/dist/useVirtualizerItem.mjs"),VirtualizerItem=__webpack_require__("../../node_modules/@react-aria/virtualizer/dist/VirtualizerItem.mjs");const StyledListSectionHeader=__webpack_require__("./src/styled.ts").I4.div((({theme})=>({paddingLeft:8,fontWeight:"bold",lineHeight:"20px",outline:"none",cursor:"default",color:theme.color("*.textForeground",theme.color("*.foreground"))})));function ListSection({reusableView,header,children}){const headerRef=(0,react.useRef)(null);return(0,useVirtualizerItem.k)({layoutInfo:header.layoutInfo,virtualizer:reusableView.virtualizer,ref:headerRef}),react.createElement(react.Fragment,null,react.createElement(StyledListSectionHeader,{role:"presentation",ref:headerRef,style:(0,VirtualizerItem.b)(header.layoutInfo,"ltr")},reusableView.content?.rendered),react.createElement("div",{key:reusableView.key,style:(0,VirtualizerItem.b)(reusableView.layoutInfo,"ltr")},children))}const renderWrapper=(parent,reusableView,children,renderChildren)=>"section"===reusableView.viewType?react.createElement(ListSection,{key:reusableView.key,reusableView,header:children.find((c=>"header"===c.viewType))},renderChildren(children.filter((c=>"item"===c.viewType)))):react.createElement(VirtualizerItem.D,{key:reusableView.key,layoutInfo:reusableView.layoutInfo,virtualizer:reusableView.virtualizer,parent:parent?.layoutInfo},reusableView.rendered);renderWrapper.__docgenInfo={description:"",methods:[],displayName:"renderWrapper"};var ListDivider=__webpack_require__("./src/List/ListDivider.tsx"),Rect=__webpack_require__("../../node_modules/@react-stately/virtualizer/dist/Rect.mjs"),LayoutInfo=__webpack_require__("../../node_modules/@react-stately/virtualizer/dist/LayoutInfo.mjs");class ListWithSectionsLayout extends VariableWidthListLayout.h{paddingY=0;constructor(opts){super(opts)}update(invalidationContext){super.update(invalidationContext)}doBuildCollection(){let nodes=super.doBuildCollection(),y=this.contentSize.height;if(0===nodes.length){let rect=new Rect.r(0,y,this.virtualizer.visibleRect.width,this.virtualizer.visibleRect.height),placeholder=new LayoutInfo.B("placeholder","placeholder",rect),node={layoutInfo:placeholder,validRect:placeholder.rect};nodes.push(node),this.layoutNodes.set(placeholder.key,node),y=placeholder.rect.maxY}return this.contentSize.height=y+this.paddingY,nodes}buildSection(node,x,y){let headerNode={type:"header",key:node.key+":header",parentKey:node.key,value:null,level:node.level,index:node.index,hasChildNodes:!1,childNodes:[],rendered:node.rendered,textValue:node.textValue},header=this.buildSectionHeader(headerNode,x,y);header.node=headerNode,header.layoutInfo.parentKey=node.key,this.layoutNodes.set(headerNode.key,header),y+=header.layoutInfo.rect.height;let section=super.buildSection(node,x,y);return section.children.unshift(header),section}}const useListVirtualizer=({renderItem,estimatedItemHeight=20,state})=>{const layout=(0,react.useMemo)((()=>new ListWithSectionsLayout({estimatedRowHeight:estimatedItemHeight,estimatedHeadingHeight:20,dividerHeight:2})),[]),focusedKey=state.selectionManager.focusedKey;return{virtualizerProps:{persistedKeys:(0,react.useMemo)((()=>new Set(focusedKey?[focusedKey]:[])),[focusedKey]),layout,collection:state.collection,children:(type,item)=>"item"===type?renderItem(item):"divider"===type?react.createElement(ListDivider.w,{key:item.key}):void 0,renderWrapper,scrollDirection:"both"}}}},"./src/Menu/MenuItemLayout.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>MenuItemLayout});var react=__webpack_require__("../../node_modules/react/index.js"),ItemStateContext=__webpack_require__("./src/Collections/ItemStateContext.tsx"),styled=__webpack_require__("./src/styled.ts");var MenuItem=__webpack_require__("./src/Menu/MenuItem.tsx"),StyledMenuItem=__webpack_require__("./src/Menu/StyledMenuItem.tsx");const StyledMenuItemLayout=styled.I4.div`
  display: flex;
  align-items: center;
  flex: 1; // to make sure it takes as much space as available in the menu item row, so that the suffix (shortcut) is pushed to the right
`,Content=styled.I4.span`
  flex: 1;
`,Shortcut=styled.I4.kbd`
  font-family: system-ui, sans-serif;
  margin-left: 30px;
  margin-right: -0.625rem;
  color: ${({theme})=>theme.currentForegroundAware(theme.color("MenuItem.acceleratorForeground"))};
`,MenuItemLayout=({content,shortcut,icon})=>{const{isSelected}=((Context,nullErrorMessage)=>{const context=(0,react.useContext)(Context);if(null==context)throw new Error(nullErrorMessage);return context})(ItemStateContext.k,"MenuItemLayout is meant to be rendered in Item component in Menus"),{labelProps,keyboardShortcutProps}=(0,MenuItem.u)(),allowedIcon=!isSelected&&icon;return react.createElement(StyledMenuItemLayout,null,allowedIcon&&react.createElement(StyledMenuItem.HI,null,allowedIcon),react.createElement(Content,labelProps,content),shortcut&&react.createElement(Shortcut,keyboardShortcutProps,shortcut))};MenuItemLayout.__docgenInfo={description:"",methods:[],displayName:"MenuItemLayout",props:{icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},shortcut:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}}},"./src/Popup/Popup.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{zD:()=>Popup});var react=__webpack_require__("../../node_modules/react/index.js"),useInteractOutside=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useInteractOutside.mjs"),useFocusWithin=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocusWithin.mjs"),useFocusable=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusable.mjs"),FocusScope=__webpack_require__("../../node_modules/@react-aria/focus/dist/FocusScope.mjs"),useOverlay=__webpack_require__("../../node_modules/@react-aria/overlays/dist/useOverlay.mjs"),usePreventScroll=__webpack_require__("../../node_modules/@react-aria/overlays/dist/usePreventScroll.mjs"),useObjectRef=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs"),filterDOMProps=__webpack_require__("../../node_modules/@react-aria/utils/dist/filterDOMProps.mjs"),pipe=__webpack_require__("./node_modules/ramda/es/pipe.js"),Overlay=__webpack_require__("./src/Overlay/Overlay.tsx"),useResizableMovableOverlay=__webpack_require__("./src/Overlay/useResizableMovableOverlay.tsx"),bounds_helpers=__webpack_require__("./src/Overlay/bounds-helpers.tsx"),OverlayInteractionHandler=__webpack_require__("./src/Overlay/OverlayInteractionHandler.tsx"),OverlayResizeHandles=__webpack_require__("./src/Overlay/OverlayResizeHandles.tsx"),styled=__webpack_require__("./src/styled.ts"),mergeProps=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),filter=__webpack_require__("./node_modules/ramda/es/filter.js");const mergeNonNullProps=(...propsArray)=>(0,mergeProps.v)(...propsArray.map((props=>(0,filter.A)((value=>null!=value),props??[]))));var useFocusForwarder=__webpack_require__("./src/utils/useFocusForwarder.ts"),useId=__webpack_require__("../../node_modules/@react-aria/utils/dist/useId.mjs"),focusSafely=__webpack_require__("../../node_modules/@react-aria/focus/dist/focusSafely.mjs"),dist_Overlay=__webpack_require__("../../node_modules/@react-aria/overlays/dist/Overlay.mjs");var PopupHeader=__webpack_require__("./src/Popup/PopupHeader.tsx"),PopupContext=__webpack_require__("./src/Popup/PopupContext.tsx"),PopupLayout=__webpack_require__("./src/Popup/PopupLayout.tsx"),StyledPopupHint=__webpack_require__("./src/Popup/StyledPopupHint.tsx"),StyledPopupContainer=__webpack_require__("./src/Popup/StyledPopupContainer.tsx");const StyledInnerContainer=styled.I4.div`
  height: inherit;
  overflow: hidden;
`,_Popup=({interactions="move",nonDismissable=!1,allowScroll="auto",minWidth=50,minHeight=50,positioning:positioningProp,onClose:onCloseProp,...props},forwardedRef)=>{const propsContext=(0,react.useContext)(PopupContext.k),positioning=positioningProp||propsContext.positioning,onClose=()=>{onCloseProp?.(),propsContext.onClose?.()},ref=(0,useObjectRef.U)(forwardedRef),shouldCloseOnInteractOutside=element=>!positioning?.targetRef.current?.contains(element)&&!(0,Overlay.O)(ref.current,element),{overlayProps}=(0,useOverlay.e)({isOpen:!0,onClose,shouldCloseOnBlur:!nonDismissable,shouldCloseOnInteractOutside},ref);(0,useInteractOutside.$)({ref,onInteractOutsideStart:e=>{!nonDismissable&&shouldCloseOnInteractOutside(e.target)&&onClose()},onInteractOutside:()=>{}}),(0,usePreventScroll.H)({isDisabled:"auto"===allowScroll?!positioning:allowScroll});const{bounds,positioned,overlayInteractionHandlerProps}=(0,useResizableMovableOverlay.b)(ref,{...props,minWidth,minHeight,observeContentResize:!0}),positionedBounds=positioning?.targetRef.current&&!positioned?(0,pipe.A)((0,bounds_helpers.G1)({targetElement:positioning.targetRef.current,placement:positioning.placement}),bounds_helpers.ws)(bounds):bounds,[isActive,setActive]=(0,react.useState)(!1),{focusWithinProps}=(0,useFocusWithin.R)({onFocusWithinChange:setActive}),{focusableProps}=(0,useFocusable.W)({excludeFromTabOrder:!0},ref),{focusForwarderProps}=(0,useFocusForwarder._)(),{dialogProps,titleProps}=function useDialog(props,ref){let{role="dialog"}=props,titleId=(0,useId.X1)();return titleId=props["aria-label"]?void 0:titleId,(0,react.useEffect)((()=>{ref.current&&!ref.current.contains(document.activeElement)&&(0,focusSafely.l)(ref.current)}),[ref]),(0,dist_Overlay.Se)(),{dialogProps:{...(0,filterDOMProps.$)(props,{labelable:!0}),role,tabIndex:-1,"aria-labelledby":props["aria-labelledby"]||titleId},titleProps:{id:titleId}}}(props,ref),zIndex=isActive?1:0;return react.createElement(Overlay.h,null,react.createElement(OverlayInteractionHandler.D,overlayInteractionHandlerProps,react.createElement(FocusScope.n1,{restoreFocus:!0},react.createElement(StyledPopupContainer.t,{ref,style:{...positionedBounds,zIndex},tabIndex:-1,...mergeNonNullProps(focusWithinProps,focusableProps,focusForwarderProps,overlayProps,propsContext.overlayProps||{},dialogProps,(0,filterDOMProps.$)(props))},react.createElement(PopupContext.u.Provider,{value:{isActive,movable:"none"!==interactions,titleProps}},react.createElement(StyledInnerContainer,null,props.children),"all"===interactions&&react.createElement(OverlayResizeHandles.e,null))))))},Popup=Object.assign(react.forwardRef(_Popup),{Header:PopupHeader.s,Layout:PopupLayout.j,Hint:StyledPopupHint.h});_Popup.__docgenInfo={description:"[Popup](https://www.figma.com/file/nfDfMAdV7j2fnQlpYNAOfP/IntelliJ-Platform-UI-Kit-%28Community%29?node-id=75426%3A16881&t=vzpRGV2y2cDw5a6Z-0)\ncomponent, rendered as a draggable overlay which is positioned either in the center of the viewport or relative to a trigger element.\nIf there is a trigger element, use {@link PopupTrigger} instead.",methods:[],displayName:"_Popup",props:{onBoundsChange:{required:!1,tsType:{name:"signature",type:"function",raw:'(bounds: Bounds, interactionType: "move" | "resize") => void',signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n  top: number;\n  left: number;\n  width: number;\n  height: number;\n}",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}},name:"bounds"},{type:{name:"union",raw:'"move" | "resize"',elements:[{name:"literal",value:'"move"'},{name:"literal",value:'"resize"'}]},name:"interactionType"}],return:{name:"void"}}},description:""},onBoundsChanging:{required:!1,tsType:{name:"signature",type:"function",raw:'(\n  newBounds: Bounds,\n  /**\n   * Whether the interaction is a "move" or "resize" considering the initial bounds when interaction was started.\n   */\n  interactionType: "move" | "resize"\n) => Bounds',signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n  top: number;\n  left: number;\n  width: number;\n  height: number;\n}",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}},name:"newBounds"},{type:{name:"union",raw:'"move" | "resize"',elements:[{name:"literal",value:'"move"'},{name:"literal",value:'"resize"'}]},name:"interactionType"}],return:{name:"signature",type:"object",raw:"{\n  top: number;\n  left: number;\n  width: number;\n  height: number;\n}",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}}}},description:"For performance reason, overlay bounds is kept in a local state during a resize or move interaction, and\n`onBoundsChange` is called once at the end of interaction. `onBoundsChanging` gives a chance of rectifying\nbounds changes during an interaction to for example apply custom size/placement constraints."},bounds:{required:!1,tsType:{name:"Partial",elements:[{name:"signature",type:"object",raw:"{\n  top: number;\n  left: number;\n  width: number;\n  height: number;\n}",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}}],raw:"Partial<Bounds>"},description:"Controlled bounds. Can be a partially specified bounds.\n- If `top` not specified, the returned bounds will be centered vertically.\n- If `left` not specified, the returned bounds will be centered horizontally.\n- If `width` not specified, the width of the bounds will be based on content width.\n- If `height` not specified, the height of the bounds will be based on content height.\nNote that regardless of `bounds`, `onBoundsChange` always receives a full `bounds` object which is solely\nbased on the bounds of the overlay, at the end of an interaction."},defaultBounds:{required:!1,tsType:{name:"Partial",elements:[{name:"signature",type:"object",raw:"{\n  top: number;\n  left: number;\n  width: number;\n  height: number;\n}",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}}],raw:"Partial<Bounds>"},description:"Default bounds in uncontrolled mode. Can be a partially specified bounds.\n- If `top` not specified, the returned bounds will be centered vertically.\n- If `left` not specified, the returned bounds will be centered horizontally.\n- If `width` not specified, the width of the bounds will be based on content width.\n- If `height` not specified, the height of the bounds will be based on content height.\nNote that regardless of `defaultBounds`, `onBoundsChange` always receives a full `bounds` object which is solely\nbased on the bounds of the overlay, at the end of an interaction."},minWidth:{required:!1,tsType:{name:"union",raw:'number | "content"',elements:[{name:"number"},{name:"literal",value:'"content"'}]},description:"",defaultValue:{value:"50",computed:!1}},minHeight:{required:!1,tsType:{name:"union",raw:'number | "content"',elements:[{name:"number"},{name:"literal",value:'"content"'}]},description:"",defaultValue:{value:"50",computed:!1}},interactions:{required:!1,tsType:{name:"union",raw:'"all" | "move" | "none"',elements:[{name:"literal",value:'"all"'},{name:"literal",value:'"move"'},{name:"literal",value:'"none"'}]},description:'Allowed interactions:\n- "all": both resizable and movable\n- "move": movable, but not resizable\n- "none": fixed size and position\nThe reason there are no `resizable` and `movable` boolean props is that resizable=true,movable=false doesn\'t make\nsense from UX perspective.\n@default "all"',defaultValue:{value:'"move"',computed:!1}},observeContentResize:{required:!1,tsType:{name:"boolean"},description:"When the size is not specified by `bounds` or `defaultBounds` props, the content size is measured and used in the\nreturned bounds. By default, the content size is measured initially. If `observeContentSize` is true, the DOM\nmutations will be observed and the content is re-measured as changes are observed."},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},nonDismissable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},allowScroll:{required:!1,tsType:{name:"union",raw:'"auto" | boolean',elements:[{name:"literal",value:'"auto"'},{name:"boolean"}]},description:"By default, Popup prevents scrolling on the scrollable ancestor, if popup is positioned relative to a target\nelement. Allowing or disallowing scroll can be forced by passing boolean value.",defaultValue:{value:'"auto"',computed:!1}},positioning:{required:!1,tsType:{name:"signature",type:"object",raw:'{\n  targetRef: RefObject<HTMLElement>;\n  placement?: "bottom" | "top";\n}',signature:{properties:[{key:"targetRef",value:{name:"RefObject",elements:[{name:"HTMLElement"}],raw:"RefObject<HTMLElement>",required:!0}},{key:"placement",value:{name:"union",raw:'"bottom" | "top"',elements:[{name:"literal",value:'"bottom"'},{name:"literal",value:'"top"'}],required:!1}}]}},description:"Used to position the popup relative to a target element, if there is no positioning information in the input\n`bounds`/`defaultBounds`."}},composes:["DOMProps"]},Popup.__docgenInfo={description:"[Popup](https://www.figma.com/file/nfDfMAdV7j2fnQlpYNAOfP/IntelliJ-Platform-UI-Kit-%28Community%29?node-id=75426%3A16881&t=vzpRGV2y2cDw5a6Z-0)\ncomponent, rendered as a draggable overlay which is positioned either in the center of the viewport or relative to a trigger element.\nIf there is a trigger element, use {@link PopupTrigger} instead.",methods:[],displayName:"Popup",props:{onBoundsChange:{required:!1,tsType:{name:"signature",type:"function",raw:'(bounds: Bounds, interactionType: "move" | "resize") => void',signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n  top: number;\n  left: number;\n  width: number;\n  height: number;\n}",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}},name:"bounds"},{type:{name:"union",raw:'"move" | "resize"',elements:[{name:"literal",value:'"move"'},{name:"literal",value:'"resize"'}]},name:"interactionType"}],return:{name:"void"}}},description:""},onBoundsChanging:{required:!1,tsType:{name:"signature",type:"function",raw:'(\n  newBounds: Bounds,\n  /**\n   * Whether the interaction is a "move" or "resize" considering the initial bounds when interaction was started.\n   */\n  interactionType: "move" | "resize"\n) => Bounds',signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n  top: number;\n  left: number;\n  width: number;\n  height: number;\n}",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}},name:"newBounds"},{type:{name:"union",raw:'"move" | "resize"',elements:[{name:"literal",value:'"move"'},{name:"literal",value:'"resize"'}]},name:"interactionType"}],return:{name:"signature",type:"object",raw:"{\n  top: number;\n  left: number;\n  width: number;\n  height: number;\n}",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}}}},description:"For performance reason, overlay bounds is kept in a local state during a resize or move interaction, and\n`onBoundsChange` is called once at the end of interaction. `onBoundsChanging` gives a chance of rectifying\nbounds changes during an interaction to for example apply custom size/placement constraints."},bounds:{required:!1,tsType:{name:"Partial",elements:[{name:"signature",type:"object",raw:"{\n  top: number;\n  left: number;\n  width: number;\n  height: number;\n}",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}}],raw:"Partial<Bounds>"},description:"Controlled bounds. Can be a partially specified bounds.\n- If `top` not specified, the returned bounds will be centered vertically.\n- If `left` not specified, the returned bounds will be centered horizontally.\n- If `width` not specified, the width of the bounds will be based on content width.\n- If `height` not specified, the height of the bounds will be based on content height.\nNote that regardless of `bounds`, `onBoundsChange` always receives a full `bounds` object which is solely\nbased on the bounds of the overlay, at the end of an interaction."},defaultBounds:{required:!1,tsType:{name:"Partial",elements:[{name:"signature",type:"object",raw:"{\n  top: number;\n  left: number;\n  width: number;\n  height: number;\n}",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}}],raw:"Partial<Bounds>"},description:"Default bounds in uncontrolled mode. Can be a partially specified bounds.\n- If `top` not specified, the returned bounds will be centered vertically.\n- If `left` not specified, the returned bounds will be centered horizontally.\n- If `width` not specified, the width of the bounds will be based on content width.\n- If `height` not specified, the height of the bounds will be based on content height.\nNote that regardless of `defaultBounds`, `onBoundsChange` always receives a full `bounds` object which is solely\nbased on the bounds of the overlay, at the end of an interaction."},minWidth:{required:!1,tsType:{name:"union",raw:'number | "content"',elements:[{name:"number"},{name:"literal",value:'"content"'}]},description:"",defaultValue:{value:"50",computed:!1}},minHeight:{required:!1,tsType:{name:"union",raw:'number | "content"',elements:[{name:"number"},{name:"literal",value:'"content"'}]},description:"",defaultValue:{value:"50",computed:!1}},interactions:{required:!1,tsType:{name:"union",raw:'"all" | "move" | "none"',elements:[{name:"literal",value:'"all"'},{name:"literal",value:'"move"'},{name:"literal",value:'"none"'}]},description:'Allowed interactions:\n- "all": both resizable and movable\n- "move": movable, but not resizable\n- "none": fixed size and position\nThe reason there are no `resizable` and `movable` boolean props is that resizable=true,movable=false doesn\'t make\nsense from UX perspective.\n@default "all"',defaultValue:{value:'"move"',computed:!1}},observeContentResize:{required:!1,tsType:{name:"boolean"},description:"When the size is not specified by `bounds` or `defaultBounds` props, the content size is measured and used in the\nreturned bounds. By default, the content size is measured initially. If `observeContentSize` is true, the DOM\nmutations will be observed and the content is re-measured as changes are observed."},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},nonDismissable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},allowScroll:{required:!1,tsType:{name:"union",raw:'"auto" | boolean',elements:[{name:"literal",value:'"auto"'},{name:"boolean"}]},description:"By default, Popup prevents scrolling on the scrollable ancestor, if popup is positioned relative to a target\nelement. Allowing or disallowing scroll can be forced by passing boolean value.",defaultValue:{value:'"auto"',computed:!1}},positioning:{required:!1,tsType:{name:"signature",type:"object",raw:'{\n  targetRef: RefObject<HTMLElement>;\n  placement?: "bottom" | "top";\n}',signature:{properties:[{key:"targetRef",value:{name:"RefObject",elements:[{name:"HTMLElement"}],raw:"RefObject<HTMLElement>",required:!0}},{key:"placement",value:{name:"union",raw:'"bottom" | "top"',elements:[{name:"literal",value:'"bottom"'},{name:"literal",value:'"top"'}],required:!1}}]}},description:"Used to position the popup relative to a target element, if there is no positioning information in the input\n`bounds`/`defaultBounds`."}},composes:["DOMProps"]}},"./src/Popup/PopupContext.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>PopupControllerContext,u:()=>PopupContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");const PopupContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({isActive:!1,movable:!0,titleProps:{}}),PopupControllerContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({})},"./src/Popup/PopupHeader.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>PopupHeader});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/styled.ts"),_intellij_platform_core_Overlay__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Overlay/OverlayMoveHandle.tsx"),_PopupContext__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Popup/PopupContext.tsx");const StyledPopupHeader=_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__.I4.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 1.5rem;
  min-height: ${({hasControls})=>hasControls&&"1.75rem"};
  cursor: default;
  white-space: nowrap;
  color: ${({theme,active})=>active?theme.color("Popup.Header.activeForeground",theme.commonColors.labelForeground):theme.color("Popup.Header.inactiveForeground",theme.commonColors.labelDisabledForeground)};
  background-color: ${({theme,active})=>active?theme.color("Popup.Header.activeBackground","#e6e6e6"):theme.color("Popup.Header.inactiveBackground","#ededed")};
`,PopupHeader=({children,hasControls,className,style})=>{const{isActive,movable,titleProps}=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_PopupContext__WEBPACK_IMPORTED_MODULE_2__.u),renderHeader=(otherProps={})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledPopupHeader,{active:isActive,hasControls,className,style,...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__.v)(titleProps,otherProps)},children);return movable?react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Overlay__WEBPACK_IMPORTED_MODULE_4__.I,null,(({moveHandleProps})=>renderHeader(moveHandleProps))):renderHeader()};PopupHeader.__docgenInfo={description:"Implements appearance of\n[Popup Header](https://www.figma.com/file/nfDfMAdV7j2fnQlpYNAOfP/IntelliJ-Platform-UI-Kit-%28Community%29?node-id=75455%3A26566&t=Hzwse5j5R6iCEzVW-4),\nand also acts as a handle for moving the panel.\nExpected to be used with {@link Popup#Layout}:\n\n@example\n```tsx\n<Popup>\n   <Popup.Layout header={<Popup.Header>header</Popup.Header>} />\n</Popup>\n```",methods:[],displayName:"PopupHeader",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},hasControls:{required:!1,tsType:{name:"boolean"},description:""},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}}},"./src/Popup/PopupLayout.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{j:()=>PopupLayout});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/styled.ts"),_PopupHeader__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Popup/PopupHeader.tsx"),_intellij_platform_core_Popup_StyledPopupHint__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Popup/StyledPopupHint.tsx");const StyledPopupLayout=_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__.I4.div`
  display: flex;
  flex-direction: column;
  height: inherit;
`,StyledPopupLayoutHeader=_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__.I4.div`
  flex-shrink: 0;
`,StyledPopupLayoutContent=_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__.I4.div`
  flex: 1;
  overflow: auto;
  // Not sure about making the content area a vertical flex container, but it seemed it makes sense as default.
  // The use case at hand where this was added was "Branches" popup, which would of course be implementable without this
  // too, with an extra flex container around the menu.
  display: flex;
  flex-direction: column;
`,StyledPopupLayoutFooter=_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__.I4.div`
  flex-shrink: 0;
`;function PopupLayout({header,footer,content}){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledPopupLayout,null,header&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledPopupLayoutHeader,null,"string"==typeof header?react__WEBPACK_IMPORTED_MODULE_0__.createElement(_PopupHeader__WEBPACK_IMPORTED_MODULE_2__.s,null,header):header),react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledPopupLayoutContent,null,content),footer&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledPopupLayoutFooter,null,"string"==typeof footer?react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Popup_StyledPopupHint__WEBPACK_IMPORTED_MODULE_3__.h,null,footer):footer))}PopupLayout.__docgenInfo={description:"Popup content layout, supporting fixed `header` and `footer` sections, and a scrollable `content` area.",methods:[],displayName:"PopupLayout",props:{header:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Fixed position header of the popup at the top. {@link Popup.Header} can be used for the content."},content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Scrollable content of the popup."},footer:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Fixed position footer of the popup at the bottom. {@link Popup.Hint} can be used for the content."}}}},"./src/Popup/StyledPopupHint.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{h:()=>StyledPopupHint});const StyledPopupHint=__webpack_require__("./src/styled.ts").I4.div`
  // NOTE: Following the reference implementation, would require to set fallback colors non-prior to
  // *.(background|foreground) colors (by not passing the fallback color as the second argument to theme.color).
  // It's only in BigPopup that the fallback colors are prioritized over *-fallback. But in Figma designs, this is
  // simplified, and hint always has the muted color (like in BigPopup), instead of the default foreground.
  // So we are intentionally deviating from the reference implementation here.
  background: ${({theme})=>theme.color("Popup.Advertiser.background",theme.color("SearchEverywhere.Advertiser.background"))};
  color: ${({theme})=>theme.color("Popup.Advertiser.foreground",theme.color("SearchEverywhere.Advertiser.foreground"))};
  padding: 0.3125rem 0.9375rem 0.3125rem 0.625rem;
  font-size: 0.875em;
  line-height: normal;
  user-select: none;
  cursor: default;
  // NOTE: white-space is intentionally not set as nowrap.
`},"./src/utils/useFocusForwarder.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{_:()=>useFocusForwarder});var _react_aria_focus__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@react-aria/focus/dist/FocusScope.mjs");function useFocusForwarder({forwardFocus,ignoreFocusedDescendant=!1}={}){return{focusForwarderProps:{onFocus:event=>{if(event.target!==event.currentTarget)return;const possiblyBlurredElement=event.relatedTarget;possiblyBlurredElement instanceof Element&&event.currentTarget?.contains(possiblyBlurredElement)&&!ignoreFocusedDescendant?possiblyBlurredElement instanceof HTMLElement&&possiblyBlurredElement.focus():forwardFocus?forwardFocus():(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_0__.N$)(event.currentTarget).firstChild()?.focus()}}}}}}]);
//# sourceMappingURL=941.37da3676.iframe.bundle.js.map