"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[9873],{"./src/IconButton/IconButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{K0:()=>IconButton});var _react_aria_interactions__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/usePress.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_styled__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/styled.ts"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_react_aria_focus__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusable.mjs");const StyledIconButton=_styled__WEBPACK_IMPORTED_MODULE_1__.I4.button`
  position: relative; // to allow absolutely positioned overlays like an dropdown icon at the bottom right corner
  background: none;
  color: inherit;
  border: 1px solid transparent;
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${({$minSize})=>`${$minSize}px`};
  min-width: ${({$minSize})=>`${$minSize}px`};
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
`,IconButton=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((function IconButton({minSize=22,preventFocusOnPress=!0,excludeFromTabOrder=!0,isPressed:isPressedInput,isDisabled,onPress,onPressChange,onPressEnd,onPressStart,onPressUp,shouldCancelOnPointerExit,...otherProps},forwardedRef){const ref=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.U)(forwardedRef),{focusableProps}=(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_3__.W)({isDisabled},ref),{pressProps,isPressed}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_4__.d)({ref,isPressed:isPressedInput,isDisabled,onPress,onPressChange,onPressEnd,onPressStart,onPressUp,shouldCancelOnPointerExit,preventFocusOnPress});return react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledIconButton,{className:isPressed?"active":"",disabled:isDisabled,...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__.v)(pressProps,otherProps,focusableProps),$minSize:minSize,tabIndex:excludeFromTabOrder&&!isDisabled?-1:void 0,ref})}));IconButton.__docgenInfo={description:"Icon button, aka Action Button, in the reference implementation.\n@see https://jetbrains.github.io/ui/controls/icon_button/",methods:[],displayName:"IconButton",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},minSize:{required:!1,tsType:{name:"number"},description:"The minimum width/height of the button.",defaultValue:{value:"22",computed:!1}},excludeFromTabOrder:{required:!1,tsType:{name:"boolean"},description:"Whether the button should be focusable by pressing tab. The default is true for icon buttons (aka. action buttons),\nwhich means they are not included in the tab order.",defaultValue:{value:"true",computed:!1}},preventFocusOnPress:{defaultValue:{value:"true",computed:!1},required:!1}},composes:["PressProps","Pick"]}},"./src/Popup/StyledPopupContainer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{t:()=>StyledPopupContainer});var _intellij_platform_core_style_constants__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/style-constants.ts");const StyledPopupContainer=__webpack_require__("./src/styled.ts").I4.div`
  position: fixed;
  box-sizing: border-box;
  // not checked if there should be a better substitute for * in the following colors. Maybe "Component"?
  background-color: ${({theme})=>theme.color("*.background")};
  color: ${({theme})=>theme.color("*.foreground")};
  outline: none; // Focus will be reflected in header. No need for outline or any other focus style on the container
  ${_intellij_platform_core_style_constants__WEBPACK_IMPORTED_MODULE_1__.E}; // FIXME: OS-dependant style?
`},"./src/Toolbar/Toolbar.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>Toolbar,l:()=>ToolbarSeparator});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_styled__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/styled.ts"),_StyledSeparator__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/StyledSeparator.tsx"),_intellij_platform_core_utils_overflow_utils_useOverflowObserver__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/utils/overflow-utils/useOverflowObserver.tsx"),_intellij_platform_core_Icon__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/Icon/PlatformIcon.tsx"),_react_aria_overlays__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/useOverlayPosition.mjs"),_react_aria_overlays__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/Overlay.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_intellij_platform_core_Popup_StyledPopupContainer__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./src/Popup/StyledPopupContainer.tsx");const borderStyle=({$border})=>$border&&_styled__WEBPACK_IMPORTED_MODULE_1__.AH`
    border-style: solid;
    border-color: ${({theme})=>theme.commonColors.borderColor};
    border-width: ${!0===$border?"1px":borderPropToCssProp[$border]};
  `,StyledToolbar=_styled__WEBPACK_IMPORTED_MODULE_1__.I4.div`
  display: inline-flex;
  box-sizing: border-box;
  overflow: hidden;
  // NOTE: in the original implementation, there is no empty space between buttons, but buttons have kind of an
  // invisible left padding, which is mouse-intractable, but doesn't visually seem a part of the button.
  // Although implementable, it didn't seem necessary to follow the exact same thing. Margin should be fine.
  gap: 4px;
  ${borderStyle}
  ${_StyledSeparator__WEBPACK_IMPORTED_MODULE_2__.h2}:first-child {
    display: none;
  }
  ${_StyledSeparator__WEBPACK_IMPORTED_MODULE_2__.h2}:last-child {
    display: none;
  }
`,borderPropToCssProp={top:"1px 0 0 0",bottom:"0 0 1px 0",right:"0 1px 0 0",left:"0 0 0 1px",horizontal:"0 1px",vertical:"1px 0"},StyledShowMoreButton=_styled__WEBPACK_IMPORTED_MODULE_1__.I4.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  ${borderStyle};
`,StyledHorizontalToolbar=(0,_styled__WEBPACK_IMPORTED_MODULE_1__.I4)(StyledToolbar)`
  padding: ${3}px ${4}px;
  max-width: 100%;
  /*noinspection CssInvalidPropertyValue*/
  max-width: -webkit-fill-available;
  ${_StyledSeparator__WEBPACK_IMPORTED_MODULE_2__.j9} {
    margin: 1px 0;
  }
  ${StyledShowMoreButton} {
    margin-right: -${4}px;
  }
`,StyledVerticalToolbar=(0,_styled__WEBPACK_IMPORTED_MODULE_1__.I4)(StyledToolbar)`
  flex-direction: column;
  max-height: 100%;
  /*noinspection CssInvalidPropertyValue*/
  max-height: -webkit-fill-available;
  padding: ${4}px ${3}px;
  ${_StyledSeparator__WEBPACK_IMPORTED_MODULE_2__.tj} {
    margin: 0 1px;
  }
  ${StyledShowMoreButton} {
    margin-bottom: -${4}px;
  }
`,StyledToolbarContent=_styled__WEBPACK_IMPORTED_MODULE_1__.I4.div`
  box-sizing: inherit;
  display: inherit;
  flex-direction: inherit;
  flex-wrap: ${({$shouldWrap})=>$shouldWrap?"wrap":"nowrap"};
  gap: inherit;
  max-height: inherit;
  max-width: inherit;
  min-height: 0;
  min-width: 0;

  ${({$firstOverflowedIndex})=>_styled__WEBPACK_IMPORTED_MODULE_1__.AH`
      > ${0===$firstOverflowedIndex?"*":`:nth-child(${$firstOverflowedIndex}) ~ *`} {
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `}
`,OrientationContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext("horizontal"),Toolbar=({border,orientation="horizontal",...props})=>{const overflowBehavior="horizontal"===orientation&&"overflowBehavior"in props?props.overflowBehavior:null,rootProps={style:props.style,className:props.className},ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),overlayRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),showMoreButtonRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),StyledToolbar="horizontal"===orientation?StyledHorizontalToolbar:StyledVerticalToolbar,{overflowedElements}=(0,_intellij_platform_core_utils_overflow_utils_useOverflowObserver__WEBPACK_IMPORTED_MODULE_3__.y)(ref,{threshold:.8}),[isOverflowPopupVisible,setOverflowPopupVisible]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[popupHeight,setPopupHeight]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(30),[firstOverflowedChildIndex,setFirstOverflowedChildIndex]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(-1),firstOverflowedChildRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();(0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)((()=>{if(ref.current){const childElements=[...ref.current.children].filter((node=>node instanceof HTMLElement)),firstOverflowedChild=childElements.findIndex((child=>overflowedElements.includes(child)));setFirstOverflowedChildIndex(firstOverflowedChild),firstOverflowedChildRef.current=childElements[firstOverflowedChild]}}),[overflowedElements]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)((()=>{overlayRef.current&&popupHeight!==overlayRef.current.offsetHeight&&setPopupHeight(overlayRef.current.offsetHeight)}));const{overlayProps}=(0,_react_aria_overlays__WEBPACK_IMPORTED_MODULE_4__.v)({isOpen:isOverflowPopupVisible,placement:"bottom left",offset:"horizontal"===orientation?3-popupHeight+1:1-popupHeight,crossOffset:"horizontal"===orientation?-5:-4,containerPadding:0,shouldFlip:!1,targetRef:"horizontal"===orientation?ref:showMoreButtonRef,overlayRef,onClose:()=>{setOverflowPopupVisible(!1)}}),toolbarProps={onMouseMove:event=>{const firstOverflowedElement=firstOverflowedChildRef.current;if(!firstOverflowedElement)return;const shouldShow="vertical"===orientation?event.clientY>firstOverflowedElement.getBoundingClientRect().top:event.clientX>firstOverflowedElement.getBoundingClientRect().left;shouldShow!==isOverflowPopupVisible&&setOverflowPopupVisible(shouldShow)},onMouseLeave:()=>{isOverflowPopupVisible&&setOverflowPopupVisible(!1)}},toolbarOverflowPopupProps={onMouseEnter:()=>setOverflowPopupVisible(!0),onMouseLeave:e=>{e.relatedTarget!==ref.current&&setOverflowPopupVisible(!1)}};return react__WEBPACK_IMPORTED_MODULE_0__.createElement(OrientationContext.Provider,{value:orientation},react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledToolbar,{$border:border,...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__.v)(rootProps,toolbarProps),role:"toolbar"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledToolbarContent,{ref,role:"presentation",$firstOverflowedIndex:firstOverflowedChildIndex,$shouldWrap:"wrap"===overflowBehavior},props.children),overflowedElements.length>0&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledShowMoreButton,{ref:showMoreButtonRef,tabIndex:-1,onMouseEnter:()=>{setOverflowPopupVisible(!0)}},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Icon__WEBPACK_IMPORTED_MODULE_6__.jE,{icon:"ide/link"}))),isOverflowPopupVisible&&overflowedElements.length>0&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(OrientationContext.Provider,{value:"horizontal"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_aria_overlays__WEBPACK_IMPORTED_MODULE_7__.hJ,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Popup_StyledPopupContainer__WEBPACK_IMPORTED_MODULE_8__.t,{ref:overlayRef,...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__.v)(overlayProps,toolbarOverflowPopupProps)},react__WEBPACK_IMPORTED_MODULE_0__.createElement(ToolbarInOverlay,{$border:!0,firstVisibleIndex:"vertical"===orientation?firstOverflowedChildIndex:void 0},props.children)))))},ToolbarInOverlay=(0,_styled__WEBPACK_IMPORTED_MODULE_1__.I4)(StyledHorizontalToolbar)`
  ${({firstVisibleIndex})=>firstVisibleIndex&&_styled__WEBPACK_IMPORTED_MODULE_1__.AH`
      ${_StyledSeparator__WEBPACK_IMPORTED_MODULE_2__.h2}:nth-child(${firstVisibleIndex+1}) {
        display: none;
      }
      > :not(:nth-child(${firstVisibleIndex}) ~ *) {
        display: none;
      }
    `};
`,ToolbarSeparator=()=>"horizontal"===(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(OrientationContext)?react__WEBPACK_IMPORTED_MODULE_0__.createElement(_StyledSeparator__WEBPACK_IMPORTED_MODULE_2__.j9,null):react__WEBPACK_IMPORTED_MODULE_0__.createElement(_StyledSeparator__WEBPACK_IMPORTED_MODULE_2__.tj,null);Toolbar.__docgenInfo={description:'@description\nA toolbar is a container for {@link IconButton} and similar UI components.\n\n## Features:\n- A toolbar can be horizontal or vertical\n- When there is not enough space for all children, toolbar shows an arrow icon, which shows the overflowing\n  items in a popup, upon mouseover.\n  Optionally, overflow can be wrapped into multiple lines, in horizontal toolbars.\n\n@example\n<Toolbar>\n  <IconButton aria-label="Show Diff">\n    <PlatformIcon icon="actions/diff" />\n  </IconButton>\n  </Toolbar>',methods:[],displayName:"Toolbar",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},orientation:{required:!1,tsType:{name:"union",raw:'"vertical" | "horizontal"',elements:[{name:"literal",value:'"vertical"'},{name:"literal",value:'"horizontal"'}]},description:"",defaultValue:{value:'"horizontal"',computed:!1}},border:{required:!1,tsType:{name:"union",raw:'| true\n| "horizontal"\n| "vertical"\n| "bottom"\n| "top"\n| "left"\n| "right"',elements:[{name:"literal",value:"true"},{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'},{name:"literal",value:'"bottom"'},{name:"literal",value:'"top"'},{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}},ToolbarSeparator.__docgenInfo={description:"Separator to be used between items in a toolbar.",methods:[],displayName:"ToolbarSeparator"}},"./src/utils/overflow-utils/useOverflowObserver.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{y:()=>useOverflowObserver});var react=__webpack_require__("../../node_modules/react/index.js"),sortBy=__webpack_require__("./node_modules/ramda/es/sortBy.js"),uniqBy=__webpack_require__("./node_modules/ramda/es/uniqBy.js");class OverflowObserver{callback;mutationObserver;data;constructor(callback){this.callback=callback,this.data=new Map,this.mutationObserver=new MutationObserver((mutations=>{mutations.forEach((mutation=>{const target=mutation.target;target instanceof Element&&(mutation.removedNodes.forEach((node=>{node instanceof Element&&this.data.get(target)?.intersectionObserver.unobserve(node)})),mutation.addedNodes.forEach((node=>{node instanceof Element&&this.data.get(target)?.intersectionObserver.observe(node)})))}))}))}observe(target,options){this.data.get(target)?.intersectionObserver.disconnect();const intersectionObserver=new IntersectionObserver((entries=>{const data=this.data.get(target),sortedEntries=(0,sortBy.A)((entry=>-entry.time),entries),validEntries=(0,uniqBy.A)((entry=>entry.target),sortedEntries),newHiddenElements=validEntries.map((entry=>!entry.isIntersecting&&entry.target instanceof Element?entry.target:void 0)).filter((i=>null!=i)),newVisibleElements=validEntries.map((entry=>entry.isIntersecting&&entry.target instanceof Element?entry.target:null)).filter((i=>null!=i)),previouslyOverflowedElements=data?.currentOverflowElements||[],overflowedElements=previouslyOverflowedElements.filter((element=>!newVisibleElements.includes(element))).concat(newHiddenElements).filter((element=>!(element instanceof HTMLElement&&0===element.offsetWidth&&0===element.offsetHeight)));this.callback({previouslyOverflowedElements,overflowedElements,target},this),data&&(data.currentOverflowElements=overflowedElements)}),{...options,root:target});[...target?.children||[]].forEach((childElement=>{intersectionObserver.observe(childElement)})),this.data.set(target,{intersectionObserver,currentOverflowElements:[]}),this.mutationObserver.observe(target,{childList:!0})}unobserve(target){this.data.get(target)?.intersectionObserver.disconnect()}disconnect(){[...this.data.values()].forEach((({intersectionObserver})=>intersectionObserver.disconnect())),this.data=new Map,this.mutationObserver.disconnect()}}function useOverflowObserver(scrollableContainerRef,{threshold=.9,rootMargin="0px"}={}){const[overflowedElements,setOverflowedElements]=(0,react.useState)([]);return(0,react.useEffect)((()=>{const overflowObserver=new OverflowObserver((change=>{setOverflowedElements(change.overflowedElements)}));return overflowObserver.observe(scrollableContainerRef.current,{rootMargin,threshold}),()=>{overflowObserver.disconnect()}}),[scrollableContainerRef.current]),{overflowedElements}}}}]);
//# sourceMappingURL=9873.af6f8ff1.iframe.bundle.js.map