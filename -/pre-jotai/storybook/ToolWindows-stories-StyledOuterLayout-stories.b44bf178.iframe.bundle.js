"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[5363],{"../../node_modules/@react-aria/utils/dist/runAfterTransition.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Q:()=>$bbed8b41f857bcc0$export$24490316f764c430});let $bbed8b41f857bcc0$var$transitionsByElement=new Map,$bbed8b41f857bcc0$var$transitionCallbacks=new Set;function $bbed8b41f857bcc0$var$setupGlobalEvents(){if("undefined"==typeof window)return;function isTransitionEvent(event){return"propertyName"in event}let onTransitionEnd=e=>{if(!isTransitionEvent(e)||!e.target)return;let properties=$bbed8b41f857bcc0$var$transitionsByElement.get(e.target);if(properties&&(properties.delete(e.propertyName),0===properties.size&&(e.target.removeEventListener("transitioncancel",onTransitionEnd),$bbed8b41f857bcc0$var$transitionsByElement.delete(e.target)),0===$bbed8b41f857bcc0$var$transitionsByElement.size)){for(let cb of $bbed8b41f857bcc0$var$transitionCallbacks)cb();$bbed8b41f857bcc0$var$transitionCallbacks.clear()}};document.body.addEventListener("transitionrun",(e=>{if(!isTransitionEvent(e)||!e.target)return;let transitions=$bbed8b41f857bcc0$var$transitionsByElement.get(e.target);transitions||(transitions=new Set,$bbed8b41f857bcc0$var$transitionsByElement.set(e.target,transitions),e.target.addEventListener("transitioncancel",onTransitionEnd,{once:!0})),transitions.add(e.propertyName)})),document.body.addEventListener("transitionend",onTransitionEnd)}function $bbed8b41f857bcc0$export$24490316f764c430(fn){requestAnimationFrame((()=>{0===$bbed8b41f857bcc0$var$transitionsByElement.size?fn():$bbed8b41f857bcc0$var$transitionCallbacks.add(fn)}))}"undefined"!=typeof document&&("loading"!==document.readyState?$bbed8b41f857bcc0$var$setupGlobalEvents():document.addEventListener("DOMContentLoaded",$bbed8b41f857bcc0$var$setupGlobalEvents))},"./src/ToolWindows/stories/StyledOuterLayout.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{StyledOuterLayout:()=>StyledOuterLayout,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var _story_helpers__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/story-helpers.tsx"),_StyledToolWindowOuterLayout__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/ToolWindows/StyledToolWindowOuterLayout.tsx"),_ToolWindowStripe__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/ToolWindows/ToolWindowStripe.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/ToolWindow"},StyledOuterLayout={render:({hideStripes})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_StyledToolWindowOuterLayout__WEBPACK_IMPORTED_MODULE_2__.$.Shell,{style:{height:"100vh"},hideStripes,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_StyledToolWindowOuterLayout__WEBPACK_IMPORTED_MODULE_2__.$.TopStripe,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_ToolWindowStripe__WEBPACK_IMPORTED_MODULE_3__.f,{items:[{name:"Project"},{name:"Structure"}],getKey:({name})=>name,renderItem:({name})=>name,anchor:"top"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_StyledToolWindowOuterLayout__WEBPACK_IMPORTED_MODULE_2__.$.RightStripe,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_ToolWindowStripe__WEBPACK_IMPORTED_MODULE_3__.f,{items:[{name:"Project"}],getKey:({name})=>name,renderItem:({name})=>name,anchor:"right"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_StyledToolWindowOuterLayout__WEBPACK_IMPORTED_MODULE_2__.$.BottomStripe,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_ToolWindowStripe__WEBPACK_IMPORTED_MODULE_3__.f,{items:[{name:"Project"}],getKey:({name})=>name,renderItem:({name})=>name,anchor:"bottom"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_StyledToolWindowOuterLayout__WEBPACK_IMPORTED_MODULE_2__.$.LeftStripe,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_ToolWindowStripe__WEBPACK_IMPORTED_MODULE_3__.f,{items:[{name:"Project"}],getKey:({name})=>name,renderItem:({name})=>name,anchor:"left"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_StyledToolWindowOuterLayout__WEBPACK_IMPORTED_MODULE_2__.$.InnerView,{children:"main area"})]}),parameters:{layout:"fullscreen",controls:{exclude:_story_helpers__WEBPACK_IMPORTED_MODULE_4__.q},component:_StyledToolWindowOuterLayout__WEBPACK_IMPORTED_MODULE_2__.$.Shell}};StyledOuterLayout.parameters={...StyledOuterLayout.parameters,docs:{...StyledOuterLayout.parameters?.docs,source:{originalSource:'{\n  render: ({\n    hideStripes\n  }: {\n    hideStripes: boolean;\n  }) => {\n    return <StyledToolWindowOuterLayout.Shell style={{\n      height: "100vh"\n    }} hideStripes={hideStripes}>\n        <StyledToolWindowOuterLayout.TopStripe>\n          <ToolWindowStripe items={[{\n          name: "Project"\n        }, {\n          name: "Structure"\n        }]} getKey={({\n          name\n        }) => name} renderItem={({\n          name\n        }) => name} anchor="top" />\n        </StyledToolWindowOuterLayout.TopStripe>\n        <StyledToolWindowOuterLayout.RightStripe>\n          <ToolWindowStripe items={[{\n          name: "Project"\n        }]} getKey={({\n          name\n        }) => name} renderItem={({\n          name\n        }) => name} anchor="right" />\n        </StyledToolWindowOuterLayout.RightStripe>\n        <StyledToolWindowOuterLayout.BottomStripe>\n          <ToolWindowStripe items={[{\n          name: "Project"\n        }]} getKey={({\n          name\n        }) => name} renderItem={({\n          name\n        }) => name} anchor="bottom" />\n        </StyledToolWindowOuterLayout.BottomStripe>\n        <StyledToolWindowOuterLayout.LeftStripe>\n          <ToolWindowStripe items={[{\n          name: "Project"\n        }]} getKey={({\n          name\n        }) => name} renderItem={({\n          name\n        }) => name} anchor="left" />\n        </StyledToolWindowOuterLayout.LeftStripe>\n        <StyledToolWindowOuterLayout.InnerView>\n          main area\n        </StyledToolWindowOuterLayout.InnerView>\n      </StyledToolWindowOuterLayout.Shell>;\n  },\n  parameters: {\n    layout: "fullscreen",\n    controls: {\n      exclude: styledComponentsControlsExclude\n    },\n    component: StyledToolWindowOuterLayout.Shell\n  }\n}',...StyledOuterLayout.parameters?.docs?.source}}};const __namedExportsOrder=["StyledOuterLayout"]},"./src/Icon/StyledIconWrapper.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>StyledIconWrapper});var _styled__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styled.ts");const StyledIconWrapper=_styled__WEBPACK_IMPORTED_MODULE_0__.zo.span`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  width: ${({size=16})=>`${size}px`};
  height: ${({size=16})=>`${size}px`};
  position: relative; // to allow absolute positioned indicators and overlays on icon
  cursor: ${({role})=>"button"===role?"pointer":void 0};
`;try{StyledIconWrapper.displayName="StyledIconWrapper",StyledIconWrapper.__docgenInfo={description:"",displayName:"StyledIconWrapper",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"number"}},useCurrentColor:{defaultValue:null,description:"",name:"useCurrentColor",required:!1,type:{name:"boolean"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme<KnownThemePropertyPath>"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Icon/StyledIconWrapper.tsx#StyledIconWrapper"]={docgenInfo:StyledIconWrapper.__docgenInfo,name:"StyledIconWrapper",path:"src/Icon/StyledIconWrapper.tsx#StyledIconWrapper"})}catch(__react_docgen_typescript_loader_error){}},"./src/ToolWindows/StyledToolWindowOuterLayout.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$:()=>StyledToolWindowOuterLayout});var _styled__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styled.ts"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const TopStripe=_styled__WEBPACK_IMPORTED_MODULE_0__.zo.div`
  display: flex; // default display, which is block causes an unwanted minimum height
  grid-area: ts;
`,BottomStripe=_styled__WEBPACK_IMPORTED_MODULE_0__.zo.div`
  display: flex; // default display, which is block causes an unwanted minimum height
  grid-area: bs;
`,LeftStripe=_styled__WEBPACK_IMPORTED_MODULE_0__.zo.div`
  grid-area: ls;
`,RightStripe=_styled__WEBPACK_IMPORTED_MODULE_0__.zo.div`
  grid-area: rs;
`,InnerView=_styled__WEBPACK_IMPORTED_MODULE_0__.zo.div`
  grid-area: main;
  min-height: 0; // necessary to prevent overflow;
  position: relative; // necessary for undock views which are absolute positioned
  background: inherit;
  min-width: 0; // very important for layout. If not set, resizing tool windows can cause weird scrollbar inside tool windows pane.
`,StyledToolWindowOuterLayout={Shell:_styled__WEBPACK_IMPORTED_MODULE_0__.zo.div`
  display: grid;
  grid-template-columns: min-content auto min-content;
  grid-template-rows: min-content auto min-content;
  grid-template-areas:
    ".   ts   ."
    "ls main rs"
    ".   bs   .";

  background: ${({theme})=>theme.commonColors.panelBackground};
  color: ${({theme})=>theme.color("*.foreground")};
  ${({hideStripes})=>hideStripes&&(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.iv)(["",",",",",",","{display:none;}"],TopStripe,BottomStripe,LeftStripe,RightStripe)}
`,TopStripe,BottomStripe,LeftStripe,RightStripe,InnerView}},"./src/story-helpers.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{q:()=>styledComponentsControlsExclude});const styledComponentsControlsExclude=["theme","as","forwardedAs","ref"]},"./src/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Fg:()=>useTheme,iv:()=>css,zo:()=>styled});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const styled=styled_components__WEBPACK_IMPORTED_MODULE_0__.ZP,useTheme=styled_components__WEBPACK_IMPORTED_MODULE_0__.Fg,css=styled_components__WEBPACK_IMPORTED_MODULE_0__.iv;styled_components__WEBPACK_IMPORTED_MODULE_0__.Sf},"./src/utils/interaction-utils/useMove.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>isEventOnEmptySpaces,r:()=>useMove});var runAfterTransition=__webpack_require__("../../node_modules/@react-aria/utils/dist/runAfterTransition.mjs");let state="default",savedUserSelect="";var useLatest=__webpack_require__("./src/utils/useLatest.ts");function isEventOnEmptySpaces({target,currentTarget}){return currentTarget===target||target instanceof HTMLElement&&[...target.childNodes].every((child=>child instanceof HTMLElement))}function useMove({dragThreshold=0,disabled,onMoveStart,onMove,onMoveEnd,canMoveStart=()=>!0}){const handlersRef=(0,useLatest.d)({onMove,onMoveEnd});return disabled?{}:{onMouseDown:event=>{if(0!==event.button||!canMoveStart(event))return;!function disableTextSelection(){"default"===state&&(savedUserSelect=document.documentElement.style.webkitUserSelect,document.documentElement.style.webkitUserSelect="none"),state="disabled"}();const from={x:event.pageX,y:event.pageY};let startState,dragStarted=!1;const onMouseMove=event=>{const{pageX:x,pageY:y}=event,movement={x:x-from.x,y:y-from.y};(Math.abs(movement.x)>=dragThreshold||Math.abs(movement.y)>=dragThreshold)&&!dragStarted&&(dragStarted=!0,startState=onMoveStart({from})),dragStarted&&handlersRef.current.onMove({from,to:{x:from.x+movement.x,y:from.y+movement.y},movement,startState})};document.addEventListener("mousemove",onMouseMove),document.addEventListener("mouseup",(()=>{!function restoreTextSelection(){"disabled"===state&&(state="restoring",setTimeout((()=>{(0,runAfterTransition.Q)((()=>{"restoring"===state&&("none"===document.documentElement.style.webkitUserSelect&&(document.documentElement.style.webkitUserSelect=savedUserSelect||""),savedUserSelect="",state="default")}))}),300))}(),dragStarted&&handlersRef.current.onMoveEnd?.({startState}),document.removeEventListener("mousemove",onMouseMove)}),{once:!0})}}}try{isEventOnEmptySpaces.displayName="isEventOnEmptySpaces",isEventOnEmptySpaces.__docgenInfo={description:"To be used with {@link UseMoveOptions#canMoveStart } to allow\nthe move to start only on whitespaces. Does that by checking if the\nelement is an HTMLElement with all children being Elements.\nThis logic almost always detects the whitespaces properly, because if mouse\nwas pressed on a piece of text, the event target would have been that element.",displayName:"isEventOnEmptySpaces",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/interaction-utils/useMove.tsx#isEventOnEmptySpaces"]={docgenInfo:isEventOnEmptySpaces.__docgenInfo,name:"isEventOnEmptySpaces",path:"src/utils/interaction-utils/useMove.tsx#isEventOnEmptySpaces"})}catch(__react_docgen_typescript_loader_error){}try{useMove.displayName="useMove",useMove.__docgenInfo={description:"Similar to https://react-spectrum.adobe.com/react-aria/useMove.html, with slightly different\nfeatures and API.\nNOTE: initially the API was designed in a way that onMove and onMove end callbacks were\nreturned from onMoveStart, instead of being directly passed in the options.\nThis would enable capturing the initial state of each move transaction, by defining whatever\nvariable in onMoveStart and closing over them by onMove and onMoveEnd.\nThe problem with this approach was that although you could capture the initial state of the\nmovement, by closure, any other variable in the outer scopes was also closed over, and you were\nstuck with the values from the particular render in which the movement was started.\nOf course, you could work around it by using refs, but it would be unintuitive.\nSo because of that issue, it's redesigned to have onMoveStart, onMove, and onMoveEnd all\ndirectly passed as options, but you can return anything from `onMoveStart` which will be passed\nto onMove and onMoveEnd as `startState`.",displayName:"useMove",props:{dragThreshold:{defaultValue:{value:"0"},description:"the amount of movement (in pixels) after which the move should start. It prevents interference\nwith simple click (or more generally, press) events, and provides better UX.",name:"dragThreshold",required:!1,type:{name:"number"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},canMoveStart:{defaultValue:{value:"() => true"},description:"Whether the move should be initiated from a mouse down event.\nNote: regardless of the value of this option, the move won't start when interactive elements like buttons\nare being pressed.\n@see isEventOnEmptySpaces *\n@example ```ts\n// Don't move when children are being dragged.\nuseMove({ canMoveStart: e => e.target === e.currentTarget });\n```\n@example ```ts\n// move when empty spaces are being dragged.\nuseMove({ canMoveStart: isEventOnEmptySpaces });\n```",name:"canMoveStart",required:!1,type:{name:"((eventTarget: MouseEvent<Element, MouseEvent>) => boolean)"}},onMoveStart:{defaultValue:null,description:"",name:"onMoveStart",required:!0,type:{name:"(args: { from: XY; }) => S"}},onMove:{defaultValue:null,description:"",name:"onMove",required:!0,type:{name:"(args: { from: XY; to: XY; movement: XY; startState: S; }) => void"}},onMoveEnd:{defaultValue:null,description:"",name:"onMoveEnd",required:!1,type:{name:"((args: { startState: S; }) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/interaction-utils/useMove.tsx#useMove"]={docgenInfo:useMove.__docgenInfo,name:"useMove",path:"src/utils/interaction-utils/useMove.tsx#useMove"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/useLatest.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>useLatest});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function useLatest(value){const ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(value);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)((()=>{ref.current=value})),ref}}}]);
//# sourceMappingURL=ToolWindows-stories-StyledOuterLayout-stories.b44bf178.iframe.bundle.js.map