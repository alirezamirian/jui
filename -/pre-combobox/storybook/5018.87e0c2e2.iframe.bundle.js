"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[5018],{"./src/Theme/Color.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{I:()=>Color});const numberPattern="[0-9]{0,3}.?[0-9]*",parseComponent=(componentStr,index)=>componentStr?index<3?parseInt(componentStr):Math.round(255*Math.min(parseFloat(componentStr),1)):void 0,parseHexRgba=str=>str.match(/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})?$/i)?.slice(1,5).map((i=>i?parseInt(i,16):void 0)),parseShorthandHex=str=>str.match(/^#?([0-9A-F])([0-9A-F])([0-9A-F])$/i)?.slice(1,4).map((i=>i?parseInt(i+i,16):void 0)),parseRgb=str=>str.match(new RegExp(`^rgb\\(\\s*(${numberPattern})\\s*,\\s*(${numberPattern})\\s*,\\s*(${numberPattern}\\s*)\\)$`))?.slice(1,5).map(parseComponent),parseRgba=str=>str.match(new RegExp(`^rgba\\(\\s*(${numberPattern})\\s*,\\s*(${numberPattern})\\s*,\\s*(${numberPattern})\\s*,\\s*(${numberPattern}\\s*)\\)$`))?.slice(1,5).map(parseComponent);function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}class Color{constructor(rgba,g,b,a=255){let r;_defineProperty(this,"r",void 0),_defineProperty(this,"g",void 0),_defineProperty(this,"b",void 0),_defineProperty(this,"a",void 0),"string"==typeof rgba?[r=NaN,g=NaN,b=NaN,a=255]=(str=>{const result=[parseHexRgba,parseShorthandHex,parseRgb,parseRgba].reduce(((result,parse)=>result||parse(str)),void 0);return Array.isArray(result)&&result.slice(0,3).every((c=>Number.isInteger(c)))?result:null})(rgba)||[]:rgba instanceof Color?[r,g,b,a]=[rgba.r,rgba.g,rgba.b,rgba.a]:r=rgba,this.r=r,this.g=g,this.b=b,this.a=a<1?Math.round(255*a):a}isValid(){return Number.isInteger(this.r)&&Number.isInteger(this.g)&&Number.isInteger(this.b)&&Number.isInteger(this.a)}withTransparency(alpha){return new Color(this.r,this.g,this.b,alpha)}brighter(){let{r,g,b,a:alpha}=this;const int=Math.floor,FACTOR=Color.FACTOR;let i=int(1/(1-FACTOR));return 0==r&&0==g&&0==b?new Color(i,i,i,alpha):(r>0&&r<i&&(r=i),g>0&&g<i&&(g=i),b>0&&b<i&&(b=i),new Color(Math.min(int(r/FACTOR),255),Math.min(int(g/FACTOR),255),Math.min(int(b/FACTOR),255),alpha))}darker(){const FACTOR=Color.FACTOR,int=Math.floor;return new Color(Math.max(int(this.r*FACTOR),0),Math.max(int(this.g*FACTOR),0),Math.max(int(this.b*FACTOR),0),this.a)}static brighter(color){return new Color(color).brighter().toString()}blend(colorOrColorString){const color="string"==typeof colorOrColorString?new Color(colorOrColorString):colorOrColorString,getBlendedValue=component=>Math.round(color.a/255*color[component]+this.a/255*(1-color.a/255)*this[component]);return new Color(getBlendedValue("r"),getBlendedValue("g"),getBlendedValue("b"))}toString(){const toString=component=>Number.isNaN(component)?"":component.toString(16).padStart(2,"0");return`#${toString(this.r)}${toString(this.g)}${toString(this.b)}${255===this.a?"":toString(this.a)}`}}_defineProperty(Color,"FACTOR",.7)},"./src/ToolWindows/MovableToolWindowStripeProvider.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{b:()=>MovableToolWindowStripeProvider,e:()=>useMovableStripeButtons});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_utils_useLatest__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/utils/useLatest.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const MovableToolWindowStripeContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(null),MovableToolWindowStripeProvider=({onMove,children})=>{const stripes=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({}),[draggingRect,setDraggingRect]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[draggingKey,setDraggingKey]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[dropPosition,setDropPosition]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),getDropPositionRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)((()=>null)),moveStartLocationRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),contextValue=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>({addStripe:(id,propsRef)=>(stripes.current[id]&&console.error(`multiple stripes with the same id "${id}`),stripes.current[id]=propsRef,()=>{delete stripes.current[id]}),startMove:(id,{from,key})=>{const stripe=stripes.current[id]?.current;if(!stripe)return;const{stripeElRef}=stripe,stripeElement=stripeElRef.current;setDraggingRect((key=>stripeElement.querySelector(`[data-key="${key}"]`).getBoundingClientRect())(key).toJSON()),setDraggingKey(key);const indexInMain=stripe.mainItems.findIndex((item=>stripe.getKey(item)===key)),indexInSplit=stripe.splitItems.findIndex((item=>stripe.getKey(item)===key));moveStartLocationRef.current={id,anchor:stripe.anchor,index:indexInMain>-1?indexInMain:indexInSplit,isSplit:indexInSplit>-1};const dropPositionGetters=Object.entries(stripes.current).map((([id,stripe])=>[id,stripe.current.createGetDropPosition(key)])),getDropPosition=draggedRect=>{for(const[id,getDropPosition]of dropPositionGetters){const dropPosition=getDropPosition(draggedRect);if(dropPosition)return{id,dropPosition}}return null};setDropPosition(getDropPosition(from)),getDropPositionRef.current=getDropPosition},move:({to})=>{setDropPosition(getDropPositionRef.current(to))},endMove:()=>{dropPosition&&draggingKey&&onMove({from:moveStartLocationRef.current,to:{anchor:dropPosition.id,index:dropPosition.dropPosition.index,isSplit:dropPosition.dropPosition.split}}),setDraggingKey(null),setDropPosition(null),setDraggingRect(null)},dropPosition,draggingRect,draggingKey})),[dropPosition,draggingKey,draggingRect]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MovableToolWindowStripeContext.Provider,{value:contextValue,children})};function useMovableStripeButtons(props){const id=props.anchor,context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(MovableToolWindowStripeContext),latestPropsRef=(0,_utils_useLatest__WEBPACK_IMPORTED_MODULE_2__.d)(props);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{if(context)return context.addStripe(id,latestPropsRef)}),[context,id]);return{getProps:key=>({moveDisabled:!context,onMoveStart:({from})=>{context?.startMove?.(id,{from,key})},onMove:({to})=>{context?.move({to})},onMoveEnd:()=>{context?.endMove()}}),draggingRect:context?.draggingRect??null,dropPosition:context?.dropPosition?.id===id?context?.dropPosition.dropPosition:null,draggingKey:context?.draggingKey??null}}MovableToolWindowStripeProvider.displayName="MovableToolWindowStripeProvider";try{useMovableStripeButtons.displayName="useMovableStripeButtons",useMovableStripeButtons.__docgenInfo={description:"",displayName:"useMovableStripeButtons",props:{stripeElRef:{defaultValue:null,description:"",name:"stripeElRef",required:!0,type:{name:"RefObject<HTMLElement>"}},getKey:{defaultValue:null,description:"",name:"getKey",required:!0,type:{name:"(item: T) => Key"}},anchor:{defaultValue:null,description:"",name:"anchor",required:!0,type:{name:"enum",value:[{value:'"bottom"'},{value:'"top"'},{value:'"left"'},{value:'"right"'}]}},mainItems:{defaultValue:null,description:"",name:"mainItems",required:!0,type:{name:"T[]"}},splitItems:{defaultValue:null,description:"",name:"splitItems",required:!0,type:{name:"T[]"}},createGetDropPosition:{defaultValue:null,description:"",name:"createGetDropPosition",required:!0,type:{name:"(key: Key) => (draggedRect: Rect) => DropPosition | null"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ToolWindows/MovableToolWindowStripeProvider.tsx#useMovableStripeButtons"]={docgenInfo:useMovableStripeButtons.__docgenInfo,name:"useMovableStripeButtons",path:"src/ToolWindows/MovableToolWindowStripeProvider.tsx#useMovableStripeButtons"})}catch(__react_docgen_typescript_loader_error){}try{MovableToolWindowStripeProvider.displayName="MovableToolWindowStripeProvider",MovableToolWindowStripeProvider.__docgenInfo={description:"A wrapper component to render around `ToolWindowStripe`s to make their button movable. Stripe buttons then become\ndraggable and can be moved either within the same `ToolWindowStripe` or across different ones.",displayName:"MovableToolWindowStripeProvider",props:{onMove:{defaultValue:null,description:"",name:"onMove",required:!0,type:{name:"(args: { from: StripeLocation<T>; to: StripeLocation<T>; }) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ToolWindows/MovableToolWindowStripeProvider.tsx#MovableToolWindowStripeProvider"]={docgenInfo:MovableToolWindowStripeProvider.__docgenInfo,name:"MovableToolWindowStripeProvider",path:"src/ToolWindows/MovableToolWindowStripeProvider.tsx#MovableToolWindowStripeProvider"})}catch(__react_docgen_typescript_loader_error){}},"./src/ToolWindows/StyledToolWindowStripe.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{K:()=>StyledSpacer,l:()=>StyledToolWindowStripe});var _StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/ToolWindows/StyledToolWindowStripeButton.tsx"),_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/ToolWindows/utils.ts"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),_styled__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/styled.ts"),_Theme_Color__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Theme/Color.ts");const minHeight=`calc(${_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_0__.A6} + ${2*_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_0__.Mk+1}px)`,StyledToolWindowStripe=_styled__WEBPACK_IMPORTED_MODULE_3__.zo.div`
  box-sizing: border-box;
  background: ${({theme,highlighted})=>highlighted?_Theme_Color__WEBPACK_IMPORTED_MODULE_4__.I.brighter(theme.commonColors.panelBackground):theme.commonColors.panelBackground};
  display: inline-flex;
  overflow: hidden;
  ${({anchor,theme})=>(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.iv)(["border-",":1px solid ",""],(0,_utils__WEBPACK_IMPORTED_MODULE_1__.vo)(anchor),theme.commonColors.contrastBorder)};
  ${({anchor,preventCollapse})=>(0,_utils__WEBPACK_IMPORTED_MODULE_1__.m$)(anchor)?(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.iv)(["flex-direction:row;width:100%;min-height:",";","{height:1.25rem;}"],preventCollapse?minHeight:"fit-content",_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_0__.jz):(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.iv)(["flex-direction:column;height:100%;min-width:",";","{width:1.25rem;}"],preventCollapse?minHeight:"fit-content",_StyledToolWindowStripeButton__WEBPACK_IMPORTED_MODULE_0__.jz)}
`,StyledSpacer=_styled__WEBPACK_IMPORTED_MODULE_3__.zo.div`
  flex: 1;
`;try{StyledToolWindowStripe.displayName="StyledToolWindowStripe",StyledToolWindowStripe.__docgenInfo={description:"",displayName:"StyledToolWindowStripe",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},anchor:{defaultValue:null,description:"",name:"anchor",required:!0,type:{name:"enum",value:[{value:'"bottom"'},{value:'"top"'},{value:'"left"'},{value:'"right"'}]}},preventCollapse:{defaultValue:null,description:"",name:"preventCollapse",required:!1,type:{name:"boolean"}},highlighted:{defaultValue:null,description:"",name:"highlighted",required:!1,type:{name:"boolean"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme<KnownThemePropertyPath>"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ToolWindows/StyledToolWindowStripe.tsx#StyledToolWindowStripe"]={docgenInfo:StyledToolWindowStripe.__docgenInfo,name:"StyledToolWindowStripe",path:"src/ToolWindows/StyledToolWindowStripe.tsx#StyledToolWindowStripe"})}catch(__react_docgen_typescript_loader_error){}try{StyledSpacer.displayName="StyledSpacer",StyledSpacer.__docgenInfo={description:"",displayName:"StyledSpacer",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme<KnownThemePropertyPath>"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ToolWindows/StyledToolWindowStripe.tsx#StyledSpacer"]={docgenInfo:StyledSpacer.__docgenInfo,name:"StyledSpacer",path:"src/ToolWindows/StyledToolWindowStripe.tsx#StyledSpacer"})}catch(__react_docgen_typescript_loader_error){}},"./src/ToolWindows/StyledToolWindowStripeButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A6:()=>STRIPE_BUTTON_LINE_HEIGHT,Mk:()=>STRIPE_BUTTON_CROSS_PADDING,jz:()=>StyledToolWindowStripeButton});var _Icon_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/Icon/StyledIconWrapper.tsx"),_styled__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/styled.ts"),styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const STRIPE_BUTTON_CROSS_PADDING=2.5,STRIPE_BUTTON_LINE_HEIGHT="1rem",StyledToolWindowStripeButton=_styled__WEBPACK_IMPORTED_MODULE_2__.zo.span`
  box-sizing: border-box;
  display: flex; // to allow icon and text alignment by default;
  align-items: center;
  cursor: default;
  user-select: none;
  overflow: hidden;
  direction: ltr;
  flex-shrink: 0;
  font-size: 0.7rem;
  line-height: ${STRIPE_BUTTON_LINE_HEIGHT}; // absolute value seems to be problematic when the base font size is changed
  white-space: nowrap;
  color: ${({theme,active})=>active?theme.color("ToolWindow.Button.selectedForeground",theme.dark?"rgb(255,255,255)":"rgb(0,0,0)"):theme.color("*.foreground")};
  background: ${({theme,active})=>active?theme.color("ToolWindow.Button.selectedBackground",theme.dark?"rgba(15,15,15,.332)":"rgba(85,85,85,.332)"):void 0};

  ${({anchor})=>"horizontal"===("left"===anchor||"right"===anchor?"vertical":"horizontal")?(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.iv)(["padding:","px 10px;"],STRIPE_BUTTON_CROSS_PADDING):(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.iv)(["padding:10px ","px;writing-mode:vertical-lr;transform:",";","{transform:rotate(180deg);}"],STRIPE_BUTTON_CROSS_PADDING,"left"===anchor?"rotateZ(180deg)":void 0,_Icon_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_1__.M)}
  ${({active})=>!active&&(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.iv)(["&:hover{background:",";}"],(({theme})=>theme.color("ToolWindow.Button.hoverBackground",theme.dark?"rgba(15,15,15,.156)":"rgba(85,85,85,.156)")))};
`;try{StyledToolWindowStripeButton.displayName="StyledToolWindowStripeButton",StyledToolWindowStripeButton.__docgenInfo={description:"",displayName:"StyledToolWindowStripeButton",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},active:{defaultValue:null,description:"",name:"active",required:!1,type:{name:"boolean"}},anchor:{defaultValue:null,description:"",name:"anchor",required:!0,type:{name:"enum",value:[{value:'"bottom"'},{value:'"top"'},{value:'"left"'},{value:'"right"'}]}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme<KnownThemePropertyPath>"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ToolWindows/StyledToolWindowStripeButton.tsx#StyledToolWindowStripeButton"]={docgenInfo:StyledToolWindowStripeButton.__docgenInfo,name:"StyledToolWindowStripeButton",path:"src/ToolWindows/StyledToolWindowStripeButton.tsx#StyledToolWindowStripeButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/ToolWindows/ToolWindowStripe.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{f:()=>ToolWindowStripe});var mergeProps=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),react=__webpack_require__("../../node_modules/react/index.js"),utils=__webpack_require__("./src/ToolWindows/utils.ts");const createGetDropPosition=({anchor,stripeElement,splitItems,mainItems,getItemRect,getKey})=>{const getStripeRect=()=>stripeElement.getBoundingClientRect(),start=rect=>(0,utils.m$)(anchor)?rect.left:rect.top,end=rect=>(0,utils.m$)(anchor)?rect.right:rect.bottom,getDropPositions=(items,split=!1)=>{const getRef=split?end:start;return 0===items.length?[{index:0,split,score:draggingRect=>Math.abs(getRef(draggingRect)-getRef(getStripeRect()))}]:items.flatMap(((item,index)=>{const key=getKey(item);return[{index,split,relative:{key,placement:"before"},score:draggingRect=>Math.abs(getRef(draggingRect)-keyToOffsets[key].start)},{index:index+1,split,relative:{key,placement:"after"},score:draggingRect=>Math.abs(getRef(draggingRect)-keyToOffsets[key].end)}]}))},keyToOffsets=(items=>{const keyToOffsets={};return items.forEach((item=>{const key=getKey(item),boundingRect=getItemRect(key);keyToOffsets[key]={start:start(boundingRect),end:end(boundingRect)}})),keyToOffsets})([...mainItems,...splitItems]),dropPositions=[...getDropPositions(mainItems),...getDropPositions(splitItems,!0)];let lastDropPosition=null;return draggingRect=>{if(!(draggingRect=>{const stripeRect=getStripeRect();return draggingRect.right>stripeRect.left-stripeRect.width&&draggingRect.left<stripeRect.right&&draggingRect.bottom>stripeRect.top-stripeRect.height&&draggingRect.top<stripeRect.bottom})(draggingRect))return null;const result=dropPositions.reduce(((bestMatch,candidate)=>{const score=candidate.score(draggingRect);return!bestMatch||score<bestMatch.score?{...candidate,score}:bestMatch}),null);return result?(result.split===lastDropPosition?.split&&result.index===lastDropPosition?.index||(lastDropPosition=result),lastDropPosition):null}};try{createGetDropPosition.displayName="createGetDropPosition",createGetDropPosition.__docgenInfo={description:"TODO: Add a few words about what this function do.",displayName:"createGetDropPosition",props:{stripeElement:{defaultValue:null,description:"",name:"stripeElement",required:!0,type:{name:"HTMLElement"}},anchor:{defaultValue:null,description:"",name:"anchor",required:!0,type:{name:"enum",value:[{value:'"bottom"'},{value:'"top"'},{value:'"left"'},{value:'"right"'}]}},getItemRect:{defaultValue:null,description:"",name:"getItemRect",required:!0,type:{name:"(key: Key) => Rect"}},getKey:{defaultValue:null,description:"",name:"getKey",required:!0,type:{name:"(key: T) => Key"}},mainItems:{defaultValue:null,description:"",name:"mainItems",required:!0,type:{name:"T[]"}},splitItems:{defaultValue:null,description:"",name:"splitItems",required:!0,type:{name:"T[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ToolWindows/createGetDropPosition.tsx#createGetDropPosition"]={docgenInfo:createGetDropPosition.__docgenInfo,name:"createGetDropPosition",path:"src/ToolWindows/createGetDropPosition.tsx#createGetDropPosition"})}catch(__react_docgen_typescript_loader_error){}var MovableToolWindowStripeProvider=__webpack_require__("./src/ToolWindows/MovableToolWindowStripeProvider.tsx"),StyledToolWindowStripe=__webpack_require__("./src/ToolWindows/StyledToolWindowStripe.tsx"),StyledToolWindowStripeButton=__webpack_require__("./src/ToolWindows/StyledToolWindowStripeButton.tsx"),useMove=__webpack_require__("./src/utils/interaction-utils/useMove.tsx"),Color=__webpack_require__("./src/Theme/Color.ts");function findEffectiveBackgroundColor(element){let elem=element,colors=[];for(;null!=elem;){const computedBackground=getComputedStyle(elem).backgroundColor;if(computedBackground){const color=new Color.I(computedBackground);if(colors.unshift(color),255===color.a)break}elem=elem.parentElement}return colors.reduce(((resultColor,nextColor)=>resultColor?resultColor.blend(nextColor):nextColor),null)?.toString()||""}try{findEffectiveBackgroundColor.displayName="findEffectiveBackgroundColor",findEffectiveBackgroundColor.__docgenInfo={description:"Computes the effective background color of the element by blending translucent backgrounds of\nthe elements ancestors. It traverses up the parents, until reaches a solid background color.\nall translucent backgrounds in between are blended with that solid color, with respect to their\ntransparency. It's meant to be used only for the simple cases where an element doesn't overflow\nthe parents. Obviously, in other cases there won't be one single effective background color\nfor the element.",displayName:"findEffectiveBackgroundColor",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ToolWindows/findEffectiveBackgroundColor.tsx#findEffectiveBackgroundColor"]={docgenInfo:findEffectiveBackgroundColor.__docgenInfo,name:"findEffectiveBackgroundColor",path:"src/ToolWindows/findEffectiveBackgroundColor.tsx#findEffectiveBackgroundColor"})}catch(__react_docgen_typescript_loader_error){}function useElementMove({ref,onMoveStart,onMove,onMoveEnd,ghost:ghostOption,...otherOptions}){return(0,useMove.r)({...otherOptions,onMoveStart:()=>{const element=ref.current;let ghost=null;if(!element)throw new Error("Movement started but ref value is null. Make sure the passed ref is applied on the same element that other props are.");const updateGhostPosition=rect=>{ghost&&(ghost.style.left=`${rect.left}px`,ghost.style.top=`${rect.top}px`)},from=element.getBoundingClientRect();if(ghostOption){const defaultGhost=function createDefaultGhost(element){const ghost=element.cloneNode(!0);return ghost.style.backgroundColor=findEffectiveBackgroundColor(element),ghost}(element);ghost="function"==typeof ghostOption&&ghostOption(defaultGhost)||defaultGhost,ghost.style.position="fixed",document.body.append(ghost),updateGhostPosition(from)}return{ghost,from,updateGhostPosition,startState:onMoveStart({from})}},onMove:({movement,startState:{from,updateGhostPosition,startState}})=>{const to={left:from.left+movement.x,right:from.right+movement.x,top:from.top+movement.y,bottom:from.bottom+movement.y,height:from.height,width:from.width};updateGhostPosition(to),onMove({from,to,movement,startState})},onMoveEnd:({startState:{ghost,startState}})=>{ghost?.remove(),onMoveEnd?.({startState})}})}try{useElementMove.displayName="useElementMove",useElementMove.__docgenInfo={description:"Provides necessary event handling props to be applied on an element to make it movable.\nIt's implemented on top of {@link useMove}. The differences are:\n- The signature of `onMoveStart`, `onMove` and `onMoveEnd` are changed to pass\n  {@link Rect} instead of {@link XY}.\n- rendering a ghost element.\n\n## A note about ghost:\nThere is no easy way to create a snapshot image of an html element. Native drag and drop API\nsupports [setting drag\nimage](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setDragImage) but we are\nnot using drag events mainly because of not being able to customize the offset after which drag\nshould start. See {@link UseMoveOptions#dragThreshold dragThreshold} for more details. There are\nsome libraries like html2canvas for creating an image from an html element, but they are very\nbig and using them doesn't make sense at all from a value/cost ratio perspective. There might be\nsome ways of implementing custom move threshold on top of native drag events. For example by\ndelaying the call to setDragImage, but it needs more investigation. Also, not sure if opacity of\nthe ghost is something you can control when using setDragImage.",displayName:"useElementMove",props:{ref:{defaultValue:null,description:"",name:"ref",required:!0,type:{name:"RefObject<HTMLElement>"}},ghost:{defaultValue:null,description:"if true a clone of the element is created and used as ghost.\nA function can be passed to customize the default ghost element or return a completely\ndifferent one.",name:"ghost",required:!1,type:{name:"boolean | ((defaultGhost: HTMLElement) => HTMLElement)"}},onMoveStart:{defaultValue:null,description:"",name:"onMoveStart",required:!0,type:{name:"(args: { from: Rect; }) => S"}},onMove:{defaultValue:null,description:"",name:"onMove",required:!0,type:{name:"(args: { from: Rect; to: Rect; movement: XY; startState: S; }) => void"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},dragThreshold:{defaultValue:{value:"0"},description:"the amount of movement (in pixels) after which the move should start. It prevents interference\nwith simple click (or more generally, press) events, and provides better UX.",name:"dragThreshold",required:!1,type:{name:"number"}},canMoveStart:{defaultValue:null,description:"Whether the move should be initiated from a mouse down event.\nNote: regardless of the value of this option, the move won't start when interactive elements like buttons\nare being pressed.\n@see isEventOnEmptySpaces *\n@example ```ts\n// Don't move when children are being dragged.\nuseMove({ canMoveStart: e => e.target === e.currentTarget });\n```\n@example ```ts\n// move when empty spaces are being dragged.\nuseMove({ canMoveStart: isEventOnEmptySpaces });\n```",name:"canMoveStart",required:!1,type:{name:"((eventTarget: MouseEvent<Element, MouseEvent>) => boolean)"}},onMoveEnd:{defaultValue:null,description:"",name:"onMoveEnd",required:!1,type:{name:"((args: { startState: S; }) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ToolWindows/useElementMove.tsx#useElementMove"]={docgenInfo:useElementMove.__docgenInfo,name:"useElementMove",path:"src/ToolWindows/useElementMove.tsx#useElementMove"})}catch(__react_docgen_typescript_loader_error){}var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function ToolWindowStripe({anchor,items:mainItems,renderItem:render,splitItems=[],selectedKeys=[],onItemPress,getKey}){const containerRef=(0,react.useRef)(null),{getProps,draggingRect,draggingKey,dropPosition}=(0,MovableToolWindowStripeProvider.e)({stripeElRef:containerRef,getKey,anchor,mainItems,splitItems,createGetDropPosition:key=>{const isNotCurrentItem=anItem=>getKey(anItem)!==key,stripeElement=containerRef.current;return createGetDropPosition({stripeElement,mainItems:mainItems.filter(isNotCurrentItem),splitItems:splitItems.filter(isNotCurrentItem),getKey,anchor,getItemRect:key=>stripeElement.querySelector(`[data-key="${key}"]`).getBoundingClientRect()})}}),highlighted=null!=dropPosition&&null!=draggingKey&&[...mainItems,...splitItems].every((item=>getKey(item)!==draggingKey)),renderItem=item=>{const key=getKey(item);return(0,jsx_runtime.jsx)(ToolWindowStripeButton,{anchor,"data-key":key,style:{...getStripeButtonStyles({key,dropPosition,anchor,draggingRect,draggingKey})},...getProps(key),active:selectedKeys.includes(key),onPress:()=>onItemPress?.(key),children:render(item)},key)};return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsxs)(StyledToolWindowStripe.l,{anchor,preventCollapse:Boolean(dropPosition),highlighted,ref:containerRef,children:[mainItems.map(renderItem),(0,jsx_runtime.jsx)(StyledToolWindowStripe.K,{}),splitItems.map(renderItem)]})})}function getStripeButtonStyles({anchor,key,dropPosition,draggingRect,draggingKey}){const styles={};if(dropPosition?.relative?.key===key&&draggingRect){const marginValue=(0,utils.m$)(anchor)?draggingRect.width:draggingRect.height;(0,utils.m$)(anchor)?styles["before"===dropPosition.relative.placement?"marginLeft":"marginRight"]=marginValue:styles["before"===dropPosition.relative.placement?"marginTop":"marginBottom"]=marginValue}return key===draggingKey&&(styles.display="none"),styles}function ToolWindowStripeButton({children,anchor,onMoveStart,onMove,onMoveEnd,onPress,moveDisabled,...otherProps}){const ref=(0,react.useRef)(null),{pressProps}={pressProps:{onPointerUp:onPress,onMouseDown:e=>{e.preventDefault()}}},props=useElementMove({ref,disabled:moveDisabled,dragThreshold:7,ghost:!0,onMoveStart,onMove,onMoveEnd});return(0,jsx_runtime.jsx)(StyledToolWindowStripeButton.jz,{anchor,...(0,mergeProps.d)(otherProps,pressProps,props),ref,children})}ToolWindowStripeButton.displayName="ToolWindowStripeButton";try{ToolWindowStripe.displayName="ToolWindowStripe",ToolWindowStripe.__docgenInfo={description:"TODO: refactor to remove the key based interface.",displayName:"ToolWindowStripe",props:{anchor:{defaultValue:null,description:"",name:"anchor",required:!0,type:{name:"enum",value:[{value:'"bottom"'},{value:'"top"'},{value:'"left"'},{value:'"right"'}]}},items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"T[]"}},splitItems:{defaultValue:{value:"[]"},description:"",name:"splitItems",required:!1,type:{name:"T[]"}},getKey:{defaultValue:null,description:"",name:"getKey",required:!0,type:{name:"(item: T) => Key"}},renderItem:{defaultValue:null,description:"",name:"renderItem",required:!0,type:{name:"(item: T) => ReactNode"}},selectedKeys:{defaultValue:{value:"[]"},description:"",name:"selectedKeys",required:!1,type:{name:"Key[]"}},onItemPress:{defaultValue:null,description:"",name:"onItemPress",required:!1,type:{name:"((key: Key) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ToolWindows/ToolWindowStripe.tsx#ToolWindowStripe"]={docgenInfo:ToolWindowStripe.__docgenInfo,name:"ToolWindowStripe",path:"src/ToolWindows/ToolWindowStripe.tsx#ToolWindowStripe"})}catch(__react_docgen_typescript_loader_error){}},"./src/ToolWindows/utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ss:()=>getAnchorOrientation,m$:()=>isHorizontalToolWindow,vo:()=>theOtherSide});const getAnchorOrientation=anchor=>isHorizontalToolWindow(anchor)?"horizontal":"vertical",isHorizontalToolWindow=anchor=>"top"===anchor||"bottom"===anchor,theOtherSide=anchor=>({left:"right",right:"left",top:"bottom",bottom:"top"}[anchor])}}]);
//# sourceMappingURL=5018.87e0c2e2.iframe.bundle.js.map