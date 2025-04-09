"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[7992],{"./src/Checkbox/Checkbox.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>Checkbox});var react=__webpack_require__("../../node_modules/react/index.js"),useToggleState=__webpack_require__("../../node_modules/@react-stately/toggle/dist/useToggleState.mjs"),dist_module=__webpack_require__("../../node_modules/@react-aria/checkbox/dist/module.js"),useFocusRing=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusRing.mjs"),mergeProps=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),styled=__webpack_require__("./src/styled.ts"),LafIcon=__webpack_require__("./src/Icon/LafIcon.tsx");const CheckboxIcon=({isDisabled,isFocused,isIndeterminate,isSelected,...otherProps})=>react.createElement(LafIcon.J,{...otherProps,size:20,icon:{name:isIndeterminate?"checkBoxIndeterminate":"checkBox",modifiers:{Disabled:isDisabled,Selected:isSelected||isIndeterminate,Focused:isFocused}}});CheckboxIcon.__docgenInfo={description:"Renders checkbox UI in different states (focused, selected, indeterminate, etc.), without having anything to do\nwith the interactions",methods:[],displayName:"CheckboxIcon",props:{isIndeterminate:{required:!0,tsType:{name:"union",raw:"boolean | undefined",elements:[{name:"boolean"},{name:"undefined"}]},description:""},isFocused:{required:!0,tsType:{name:"boolean"},description:""},isDisabled:{required:!0,tsType:{name:"union",raw:"boolean | undefined",elements:[{name:"boolean"},{name:"undefined"}]},description:""},isSelected:{required:!0,tsType:{name:"boolean"},description:""}}};var MnemonicTrigger=__webpack_require__("./src/Mnemonic/MnemonicTrigger.tsx");const StyledWrapperLabel=styled.zo.label`
  position: relative;
  display: inline-flex;
  align-items: center;
`,StyledCheckboxLabelText=styled.zo.span`
  margin-left: 0.25rem;
  color: ${({theme,isDisabled})=>isDisabled?theme.color("CheckBox.disabledText","#808080"):theme.color("*.foreground")};
`,StyledInput=styled.zo.input`
  opacity: 0.0001;
  position: absolute;
  z-index: 1;
  inset: 0;
  cursor: default;
  &:disabled {
    cursor: default;
  }
`,Checkbox=({preventFocus,className,disableFocusAlwaysVisible,mnemonic,...props})=>{const state=(0,useToggleState.l)(props),ref=react.useRef(null),{inputProps}=(0,dist_module.O)(props,state,ref),{isFocusVisible,isFocused,focusProps}=(0,useFocusRing.F)({autoFocus:props.autoFocus}),focusDisabledProps=preventFocus?{onFocusCapture:event=>{event.stopPropagation(),event.preventDefault(),event.relatedTarget instanceof HTMLElement?event.relatedTarget.focus():event.target.blur()},tabIndex:-1}:{};return react.createElement(StyledWrapperLabel,{className},react.createElement(StyledInput,{...(0,mergeProps.d)(inputProps,focusProps,focusDisabledProps),ref}),react.createElement(CheckboxIcon,{isIndeterminate:props.isIndeterminate,isFocused:disableFocusAlwaysVisible?isFocusVisible:isFocused,isSelected:props.isIndeterminate||state.isSelected,isDisabled:props.isDisabled,"aria-hidden":"true",style:{pointerEvents:"none"}}),props.children&&react.createElement(StyledCheckboxLabelText,{isDisabled:props.isDisabled},mnemonic?react.createElement(MnemonicTrigger.Y,{mnemonic,isDisabled:props.isDisabled,onTriggered:state.toggle},props.children):props.children))};Checkbox.__docgenInfo={description:"Checkbox component to be used with or without a label.\n\nWhile the checkbox without the label + preventFocus makes it usable in tree/list, it might be more optimized to\nuse a more lightweight component like ListItemCheckbox, which uses CheckboxIcon with a simple press handle. Without\nany input, state, etc.",methods:[],displayName:"Checkbox",props:{preventFocus:{required:!1,tsType:{name:"boolean"},description:'If set to true, the checkbox won\'t be focusable.\nCommon use cases:\n- When checkbox is rendered in a focusable container, like a list item where the focus should not be taken away\n  from that container.\n- "Amend" checkbox in "Commit" tool window. The focus is kept in the commit message or changes tree, perhaps, for\n  a questionably better UX.\nNote: Passing {@link excludeFromTabOrder} will still let the checkbox be focusable, while `preventFocus`, doesn\'t\nlet the component get focused at all.\nTODO(potential): it might be nicer to have a `preventFocusOnPress` prop consistent with IconButton, instead.\n In that case preventing focus completely would be achieved with `preventFocusOnPres` and `excludeFromTabOrder`.'},disableFocusAlwaysVisible:{required:!1,tsType:{name:"boolean"},description:"By default, focus ring is always shown when the checkbox is focused, independent of the interaction method.\nif set to false, the focus will be only visible if the interaction is done via keyboard or screen readers.\nSimilar to how [:focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) works."},isIndeterminate:{required:!1,tsType:{name:"boolean"},description:"Indeterminism is presentational only.\nThe indeterminate visual representation remains regardless of user interaction."},children:{required:!1,tsType:{name:"ReactNode"},description:"The label for the element."},defaultSelected:{required:!1,tsType:{name:"boolean"},description:"Whether the element should be selected (uncontrolled)."},isSelected:{required:!1,tsType:{name:"boolean"},description:"Whether the element should be selected (controlled)."},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(isSelected: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"isSelected"}],return:{name:"void"}}},description:"Handler that is called when the element's selection state changes."},value:{required:!1,tsType:{name:"string"},description:"The value of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue)."},name:{required:!1,tsType:{name:"string"},description:"The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname)."},className:{required:!1,tsType:{name:"string"},description:""},mnemonic:{required:!1,tsType:{name:"string"},description:"A character to be used as {@link https://jetbrains.design/intellij/principles/mnemonics/ mnemonic} for the button\nIt will be shown as underlined in button text, when mnemonic is activated (by pressing Alt)\nNote: if you use mnemonic, and the direct child of the button is not a string, you should use `Mnemonic.Text`\nto render the button text, to have the underlining behavior."}},composes:["InputBase","FocusableDOMProps","AriaLabelingProps","FocusableProps"]}},"./src/IconButton/IconButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{hU:()=>IconButton});var _react_aria_interactions__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/usePress.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_styled__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/styled.ts"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_react_aria_focus__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusable.mjs");const StyledIconButton=_styled__WEBPACK_IMPORTED_MODULE_1__.zo.button`
  position: relative; // to allow absolutely positioned overlays like an dropdown icon at the bottom right corner
  background: none;
  color: inherit;
  border: 1px solid transparent;
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${({minSize})=>`${minSize}px`};
  min-width: ${({minSize})=>`${minSize}px`};
  padding: 0;
  margin: 0;
  &:disabled {
    opacity: 0.25; // not quite accurate implementation. There might be better ways to style disabled state.
  }
  &:hover:not(:disabled) {
    background: ${({theme})=>theme.color("ActionButton.hoverBackground","#DFDFDF")};
    border-color: ${({theme})=>theme.color("ActionButton.hoverBorderColor","#DFDFDF")};
  }
  &:focus-visible:not(:disabled) {
    outline: none;
    background: ${({theme})=>theme.color("ActionButton.pressedBackground","#CFCFCF")};
    border-color: ${({theme})=>theme.color("ActionButton.focusedBorderColor",theme.dark?"#5eacd0":"#62b8de")};
  }
  &:active:not(:disabled),
  &.active:not(:disabled) {
    background: ${({theme})=>theme.color("ActionButton.pressedBackground","#CFCFCF")};
    border-color: ${({theme})=>theme.color("ActionButton.pressedBorderColor","#CFCFCF")};
  }
`,IconButton=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((function IconButton({minSize=22,preventFocusOnPress=!0,excludeFromTabOrder=!0,isPressed:isPressedInput,isDisabled,onPress,onPressChange,onPressEnd,onPressStart,onPressUp,shouldCancelOnPointerExit,...otherProps},forwardedRef){const ref=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.B)(forwardedRef),{focusableProps}=(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_3__.k)({isDisabled},ref),{pressProps,isPressed}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_4__.r)({ref,isPressed:isPressedInput,isDisabled,onPress,onPressChange,onPressEnd,onPressStart,onPressUp,shouldCancelOnPointerExit,preventFocusOnPress});return react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledIconButton,{className:isPressed?"active":"",disabled:isDisabled,...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__.d)(pressProps,otherProps,focusableProps),minSize,tabIndex:excludeFromTabOrder&&!isDisabled?-1:void 0,ref})}));IconButton.__docgenInfo={description:"Icon button, aka Action Button, in the reference implementation.\n@see https://jetbrains.github.io/ui/controls/icon_button/",methods:[],displayName:"IconButton",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},minSize:{required:!1,tsType:{name:"number"},description:"The minimum width/height of the button.",defaultValue:{value:"22",computed:!1}},excludeFromTabOrder:{required:!1,tsType:{name:"boolean"},description:"Whether the button should be focusable by pressing tab. The default is true for icon buttons (aka. action buttons),\nwhich means they are not included in the tab order.",defaultValue:{value:"true",computed:!1}},preventFocusOnPress:{defaultValue:{value:"true",computed:!1},required:!1}},composes:["PressProps","Pick"]}},"./src/List/List.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{a:()=>List});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_useList__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/List/useList.ts"),_ListItem__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/List/ListItem.tsx"),_StyledList__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/List/StyledList.tsx"),_useListState__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/List/useListState.ts"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("../../node_modules/@react-aria/utils/dist/filterDOMProps.mjs"),_react_aria_virtualizer__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("../../node_modules/@react-aria/virtualizer/dist/module.js"),_intellij_platform_core_List_useListVirtualizer__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/List/useListVirtualizer.tsx"),_intellij_platform_core_List_ListContext__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/List/ListContext.tsx");const List=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((function List({allowEmptySelection=!1,fillAvailableSpace=!1,estimatedItemHeight,className,...inputProps},forwardedRef){const props={...inputProps,disallowEmptySelection:!allowEmptySelection},ref=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.B)(forwardedRef),state=(0,_useListState__WEBPACK_IMPORTED_MODULE_2__.n)(props),{listProps,listContext}=(0,_useList__WEBPACK_IMPORTED_MODULE_3__.s)({...props,isVirtualized:!0},state,ref),{virtualizerProps:{children:renderNode,...virtualizerProps}}=(0,_intellij_platform_core_List_useListVirtualizer__WEBPACK_IMPORTED_MODULE_4__.g)({state,estimatedItemHeight,renderItem:item=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ListItem__WEBPACK_IMPORTED_MODULE_5__.H,{key:item.key,item})});return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_List_ListContext__WEBPACK_IMPORTED_MODULE_6__.Z.Provider,{value:listContext},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_StyledList__WEBPACK_IMPORTED_MODULE_7__.C,{as:_react_aria_virtualizer__WEBPACK_IMPORTED_MODULE_8__.dM,...virtualizerProps,...listProps,...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_9__.z)(props,{labelable:!0}),fillAvailableSpace,className,ref},renderNode))}));List.__docgenInfo={description:"List view",methods:[],displayName:"List",props:{selectionManagerRef:{required:!1,tsType:{name:"RefObject",elements:[{name:"SelectionManager"}],raw:"RefObject<SelectionManager>"},description:"Gives imperative access to selection manager."},focusProxyRef:{required:!1,tsType:{name:"RefObject",elements:[{name:"HTMLElement"}],raw:"RefObject<HTMLElement>"},description:"ref to an element (typically HTMLInputElement) that should act as a focus\nproxy that handles ArrowUp, ArrowDown, and Enter keys to allow for\nnavigating the collection and selecting items.\nUseful for implementing\nautocompletion or search input connected to a collection element."},fillAvailableSpace:{required:!1,tsType:{name:"boolean"},description:"fills the available horizontal or vertical space, when rendered in a flex container.",defaultValue:{value:"false",computed:!1}},showAsFocused:{required:!1,tsType:{name:"boolean"},description:"When true, shows the list in focused style, even when it's not focused. A common use case is when the list\nis virtually focused. i.e. the focus is physically on some other element (like a search input) which handles\nkeyboard events as if the list was focused.\nAnother (maybe questionable) use case is master detail views, where the master view is shown as focused, even\nwhen the details view has physical focus."},allowEmptySelection:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onAction:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: Key) => void",signature:{arguments:[{type:{name:"Key"},name:"key"}],return:{name:"void"}}},description:"Called when the action for the item should be triggered, which can be by double click or pressing Enter.\nEnter not implemented yet :D"},estimatedItemHeight:{required:!1,tsType:{name:"number"},description:"Useful when list items have a custom height, to hint layout calculation logic about the item height which\nincreases rendering efficiency and also prevents flash of items with wrong height."},className:{required:!1,tsType:{name:"string"},description:""}}}},"./src/Mnemonic/MnemonicTrigger.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Y:()=>MnemonicTrigger,i:()=>MnemonicText});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_utils_useEventCallback__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/utils/useEventCallback.ts");const MnemonicContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({character:null,active:!1,rendered:()=>{}}),MnemonicTrigger=({children,mnemonic,isDisabled,onTriggered:onTriggeredProp=(()=>{})})=>{const ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),onTriggered=(0,_intellij_platform_core_utils_useEventCallback__WEBPACK_IMPORTED_MODULE_1__.$)(onTriggeredProp),[active,setActive]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),keydownListener=(0,_intellij_platform_core_utils_useEventCallback__WEBPACK_IMPORTED_MODULE_1__.$)((e=>{if(!isDisabled){if(active&&!e.repeat){const character=e.code.match(/Key([A-Z])/)?.[1];character&&character.toLowerCase()===mnemonic.toLowerCase()&&onTriggered()}"Alt"===e.key&&ref.current&&function isAccessible(element){return!element.closest("[aria-hidden]")&&null!==element.parentElement&&function isVisible(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}(element.parentElement)}(ref.current)&&setActive(!0)}}));(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{function onBlur(){setActive(!1)}function keyupListener(e){"Alt"===e.key&&setActive(!1)}return document.addEventListener("keydown",keydownListener),document.addEventListener("keyup",keyupListener),window.addEventListener("blur",onBlur),()=>{document.removeEventListener("keydown",keydownListener),document.removeEventListener("keyup",keyupListener),window.removeEventListener("blur",onBlur)}}),[]);const renderedMnemonicRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)("");return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{const timerId=setTimeout((()=>{renderedMnemonicRef.current!==mnemonic&&console.warn(`Mnemonic ${mnemonic} was set but not rendered to the user. \nMake sure the specified character is rendered directly in MnemonicTrigger, or wrapped by MnemonicText inside MnemonicTrigger children. \nElement:`,ref.current?.parentElement)}));return()=>{clearTimeout(timerId)}}),[mnemonic]),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MnemonicContext.Provider,{value:{character:mnemonic,active,rendered:()=>{renderedMnemonicRef.current=mnemonic}}},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{hidden:!0,ref}),"string"==typeof children?react__WEBPACK_IMPORTED_MODULE_0__.createElement(MnemonicText,null,children):children)};function MnemonicText({children}){const{character,active,rendered}=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(MnemonicContext);if(character){const index=children.toLowerCase().indexOf(character.toLowerCase()),found=index>-1;if(found&&rendered(),found&&active)return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,children.slice(0,index),react__WEBPACK_IMPORTED_MODULE_0__.createElement("u",null,children.slice(index,index+1)),children.slice(index+1))}return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,children)}MnemonicTrigger.__docgenInfo={description:"",methods:[],displayName:"MnemonicTrigger",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},mnemonic:{required:!0,tsType:{name:"string"},description:"Character to be used as {@link https://jetbrains.design/intellij/principles/mnemonics/ mnemonic}."},onTriggered:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when mnemonic key is pressed with the activator key",defaultValue:{value:"() => {}",computed:!1}},isDisabled:{required:!1,tsType:{name:"boolean"},description:"Whether the mnemonic is disabled. Useful when setting mnemonic on disable-able components, to just pass\nisDisabled prop down to MnemonicTrigger"}}},MnemonicText.__docgenInfo={description:'Used inside MnemonicTrigger children, when the direct child can\'t be a string.\n@example\n```tsx\n<MnemonicTrigger mnemonic="D">\n   <>\n     <MnemonicText>Disconnect</MnemonicText>\n   </>\n</MnemonicTrigger>\n```',methods:[],displayName:"MnemonicText",props:{children:{required:!0,tsType:{name:"string"},description:""}}}},"./src/Popup/StyledPopupContainer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{e:()=>StyledPopupContainer});var _intellij_platform_core_style_constants__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/style-constants.ts");const StyledPopupContainer=__webpack_require__("./src/styled.ts").zo.div`
  position: fixed;
  box-sizing: border-box;
  // not checked if there should be a better substitute for * in the following colors. Maybe "Component"?
  background-color: ${({theme})=>theme.color("*.background")};
  color: ${({theme})=>theme.color("*.foreground")};
  outline: none; // Focus will be reflected in header. No need for outline or any other focus style on the container
  ${_intellij_platform_core_style_constants__WEBPACK_IMPORTED_MODULE_1__.s}; // FIXME: OS-dependant style?
`},"./src/Popup/story-helpers.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{AC:()=>MenuPopupContent,Ox:()=>listPopupContent,s$:()=>treePopupContent});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Menu/Menu.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Collections/Item.ts"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Menu/MenuItemLayout.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/Icon/PlatformIcon.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/Collections/Divider.ts"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./src/List/List.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("../../node_modules/@react-stately/collections/dist/Section.mjs"),_intellij_platform_core_story_components__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/story-components.tsx"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/Popup/Popup.tsx");const MenuPopupContent=({menuProps={}})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(___WEBPACK_IMPORTED_MODULE_1__.GI.Layout,{header:react__WEBPACK_IMPORTED_MODULE_0__.createElement(___WEBPACK_IMPORTED_MODULE_1__.GI.Header,null,"Title"),content:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.v2,{autoFocus:!0,fillAvailableSpace:!0,...menuProps},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.c,{textValue:"File"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__._,{icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__.vq,{icon:"fileTypes/text"}),content:"File"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.c,{textValue:"Scratch File"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__._,{icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__.vq,{icon:"fileTypes/text"}),content:"Scratch File",shortcut:"⇧⌘N"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.c,{textValue:"Directory"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__._,{icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__.vq,{icon:"nodes/folder"}),content:"Directory"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_6__.i,null),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.c,{textValue:"HTML File"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__._,{icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__.vq,{icon:"fileTypes/html"}),content:"HTML File"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.c,{textValue:"Stylesheet"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__._,{icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__.vq,{icon:"fileTypes/css"}),content:"Stylesheet"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.c,{textValue:"Javascript"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__._,{icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__.vq,{icon:"fileTypes/javaScript"}),content:"Javascript"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.c,{"aria-label":"Nested menu item",title:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__._,{content:".ignore File",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__.vq,{icon:"fileTypes/text"})})},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.c,null,".gitignore File (Git)"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.c,null,".bzrignore File (Bazaar)"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.c,null,".npmignore File (Npm)")))}),treePopupContent=react__WEBPACK_IMPORTED_MODULE_0__.createElement(___WEBPACK_IMPORTED_MODULE_1__.GI.Layout,{header:react__WEBPACK_IMPORTED_MODULE_0__.createElement(___WEBPACK_IMPORTED_MODULE_1__.GI.Header,null,"Title"),content:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_story_components__WEBPACK_IMPORTED_MODULE_7__.H4,null)}),listPopupContent=react__WEBPACK_IMPORTED_MODULE_0__.createElement(___WEBPACK_IMPORTED_MODULE_1__.GI.Layout,{header:react__WEBPACK_IMPORTED_MODULE_0__.createElement(___WEBPACK_IMPORTED_MODULE_1__.GI.Header,null,"Title"),content:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_8__.a,{autoFocus:!0,selectionMode:"multiple",fillAvailableSpace:!0},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.c,null,"Paco de lucia"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_6__.i,null),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.c,null,"Vicente Amigo"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_9__.$,{title:"Other"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.c,null,"Gerardo Nunez"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.c,null,"El Amir"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.c,null,"El Amir")))});MenuPopupContent.__docgenInfo={description:"",methods:[],displayName:"MenuPopupContent",props:{menuProps:{required:!1,tsType:{name:"Partial",elements:[{name:"MenuProps",elements:[{name:"T"}],raw:"MenuProps<T>"}],raw:"Partial<MenuProps<T>>"},description:"",defaultValue:{value:"{}",computed:!1}}}}},"./src/Tree/story-helpers.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$0:()=>staticTreeItems,Yc:()=>treeItems,ee:()=>staticSpeedSearchTreeItems});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-stately/collections/dist/Item.mjs"),_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/CollectionSpeedSearch/HighlightedTextValue.tsx");const treeItems=[{name:"index.ts"},{name:"List",children:[{name:"BasicList",children:[{name:"BasicList.stories.tsx"},{name:"BasicList.tsx"},{name:"BasicListItem.tsx"},{name:"useBasicList.ts"}]},{name:"SpeedSearchList",children:[{name:"SpeedSearchList.stories.tsx"},{name:"SpeedSearchList.tsx"},{name:"SpeedSearchListItem.tsx"},{name:"useSpeedSearchList.ts"}]},{name:"ListDivider.tsx"}]},{name:"Theme",children:[{name:"createTheme.ts"}]}],staticTreeItems=react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{key:"index.ts",textValue:"index.ts"},"index.ts"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"List",title:"List",key:"List"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"BasicList",title:"BasicList",key:"BasicList"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"BasicList.stories.tsx"},"BasicList.stories.tsx"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"BasicList.tsx"},"BasicList.tsx"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"BasicListItem.tsx"},"BasicListItem.tsx"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"useBasicList.ts"},"useBasicList.ts")),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"SpeedSearchList",title:"SpeedSearchList",key:"SpeedSearchList"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"SpeedSearchList.stories.tsx"},"SpeedSearchList.stories.tsx"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"SpeedSearchList.tsx"},"SpeedSearchList.tsx"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"SpeedSearchListItem.tsx"},"SpeedSearchListItem.tsx"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"useSpeedSearchList.ts"},"useSpeedSearchList.ts")),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"ListDivider.tsx"},"ListDivider.tsx")),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"Theme",title:"Theme",key:"Theme"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"createTheme.ts"},"createTheme.ts"))).props.children,staticSpeedSearchTreeItems=react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{key:"index.ts",textValue:"index.ts"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_2__.J,null)),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"List",title:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_2__.J,null),key:"List"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"BasicList",title:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_2__.J,null),key:"BasicList"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"BasicList.stories.tsx"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_2__.J,null)),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"BasicList.tsx"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_2__.J,null)),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"BasicListItem.tsx"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_2__.J,null)),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"useBasicList.ts"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_2__.J,null))),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"SpeedSearchList",title:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_2__.J,null),key:"SpeedSearchList"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"SpeedSearchList.stories.tsx"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_2__.J,null)),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"SpeedSearchList.tsx"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_2__.J,null)),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"SpeedSearchListItem.tsx"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_2__.J,null)),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"useSpeedSearchList.ts"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_2__.J,null))),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"ListDivider.tsx"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_2__.J,null))),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"Theme",title:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_2__.J,null),key:"Theme"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_stately_collections__WEBPACK_IMPORTED_MODULE_1__.c,{textValue:"createTheme.ts"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_2__.J,null)))).props.children},"./src/story-components.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G8:()=>SelectionLog,H4:()=>SpeedSearchTreeSample,W2:()=>Container,X6:()=>Pane});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_styled__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/styled.ts"),_intellij_platform_core_Tree__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Tree/SpeedSearchTree/SpeedSearchTree.tsx"),_intellij_platform_core_Tree_story_helpers__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Tree/story-helpers.tsx");const Container=_styled__WEBPACK_IMPORTED_MODULE_1__.zo.div`
  color: ${({theme})=>theme.color("*.foreground")};
`,Pane=props=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{style:{display:"flex",flexDirection:"column",width:400,marginTop:25,height:"calc(100vh - 70px)"},...props});function SelectionLog({selection}){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("pre",null,selection instanceof Set&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",null,JSON.stringify([...selection],null,2)),JSON.stringify(selection,null,2))}const SpeedSearchTreeSample=({selectedKeys,defaultSelectedKeys=["BasicList"],onSelectedKeysChange,treeRef})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Tree__WEBPACK_IMPORTED_MODULE_2__.b,{treeRef,autoFocus:!0,fillAvailableSpace:!0,selectionMode:"multiple",defaultExpandedKeys:["List","Theme","BasicList","Foo"],selectedKeys,defaultSelectedKeys:new Set(defaultSelectedKeys),onSelectionChange:onSelectedKeysChange},_intellij_platform_core_Tree_story_helpers__WEBPACK_IMPORTED_MODULE_3__.ee);Pane.__docgenInfo={description:"",methods:[],displayName:"Pane"},SelectionLog.__docgenInfo={description:"",methods:[],displayName:"SelectionLog",props:{selection:{required:!0,tsType:{name:"Selection"},description:""}}},SpeedSearchTreeSample.__docgenInfo={description:"",methods:[],displayName:"SpeedSearchTreeSample",props:{selectedKeys:{required:!1,tsType:{name:"union",raw:'"all" | Iterable<Key>',elements:[{name:"literal",value:'"all"'},{name:"Iterable",elements:[{name:"Key"}],raw:"Iterable<Key>"}]},description:""},defaultSelectedKeys:{required:!1,tsType:{name:"union",raw:'"all" | Iterable<Key>',elements:[{name:"literal",value:'"all"'},{name:"Iterable",elements:[{name:"Key"}],raw:"Iterable<Key>"}]},description:"",defaultValue:{value:'["BasicList"]',computed:!1}},onSelectedKeysChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(selectedKeys: Selection) => void",signature:{arguments:[{type:{name:"Selection"},name:"selectedKeys"}],return:{name:"void"}}},description:""},treeRef:{required:!1,tsType:{name:"ReactRefObject",raw:"React.RefObject<TreeRefValue>",elements:[{name:"TreeRefValue"}]},description:""}}}},"./src/style-constants.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>WINDOW_SHADOW});const WINDOW_SHADOW="box-shadow: 0 5px 15px rgb(0 0 0 / 30%)"}}]);
//# sourceMappingURL=7992.83bd1c51.iframe.bundle.js.map