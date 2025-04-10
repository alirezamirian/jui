"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[6243],{"./src/Overlay/OverlayInteractionHandler.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>OverlayInteractionHandler,G:()=>useOverlayInteractionHandler});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");const OverlayInteractionHandlerContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(null),OverlayInteractionHandler=({children,...props})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(OverlayInteractionHandlerContext.Provider,{value:props},children),useOverlayInteractionHandler=()=>(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(OverlayInteractionHandlerContext);OverlayInteractionHandler.__docgenInfo={description:"Provides the context used by components like {@link OverlayMoveHandle} and {@link OverlayResizeHandles} that provide\nuser interactions that change the boundary of the overlay they are rendered in.\nUse {@link useResizableMovableOverlay} which implements an efficient state management for overlay bounds and returns\nprops to be passed to `OverlayInteractionHandler`:\n\n@example\n\nconst {\n   bounds, // Bounds to be applied to the overlay element.\n   overlayInteractionHandlerProps,\n } = useResizableMovableOverlay(props);\n\nreturn (\n  <OverlayInteractionHandler {...overlayInteractionHandlerProps}>\n    <div style={bounds}>...</div>\n  </OverlayInteractionHandler>\n);\n\n@see useResizableMovableOverlay",methods:[],displayName:"OverlayInteractionHandler",props:{startInteraction:{required:!0,tsType:{name:"signature",type:"function",raw:'(type: "move" | "resize") => Bounds',signature:{arguments:[{type:{name:"union",raw:'"move" | "resize"',elements:[{name:"literal",value:'"move"'},{name:"literal",value:'"resize"'}]},name:"type"}],return:{name:"signature",type:"object",raw:"{\n  top: number;\n  left: number;\n  width: number;\n  height: number;\n}",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}}}},description:"Signals start of a UI interaction like resize or move, in which overlay bounds change."},updateBounds:{required:!0,tsType:{name:"signature",type:"function",raw:"(bounds: Bounds) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n  top: number;\n  left: number;\n  width: number;\n  height: number;\n}",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}},name:"bounds"}],return:{name:"void"}}},description:"Used to update bounds state during a UI interaction."},finishInteraction:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Signals end of a UI interaction."},minWidth:{required:!1,tsType:{name:"number"},description:""},minHeight:{required:!1,tsType:{name:"number"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}}},"./src/Overlay/OverlayMoveHandle.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{I:()=>OverlayMoveHandle,h:()=>useOverlayMoveHandle});var _utils_interaction_utils_useMove__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/utils/interaction-utils/useMove.tsx"),_OverlayInteractionHandler__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/Overlay/OverlayInteractionHandler.tsx");__webpack_require__("../../node_modules/react/index.js");function useOverlayMoveHandle(options){const interactionHandler=(0,_OverlayInteractionHandler__WEBPACK_IMPORTED_MODULE_1__.G)();if(!interactionHandler)return{moveHandleProps:{}};const{finishInteraction,startInteraction,updateBounds}=interactionHandler;return{moveHandleProps:(0,_utils_interaction_utils_useMove__WEBPACK_IMPORTED_MODULE_2__.f)({...options,onMoveStart:()=>startInteraction("move"),onMove:({startState,movement})=>{updateBounds({...startState,top:startState.top+movement.y,left:startState.left+movement.x})},onMoveEnd:()=>{finishInteraction()}})||{}}}const OverlayMoveHandle=({children,...props})=>children(useOverlayMoveHandle(props))},"./src/Overlay/OverlayResizeHandles.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{e:()=>OverlayResizeHandles});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_Resizer__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/Resizer/RightResizer.tsx"),_Resizer__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Resizer/LeftResizer.tsx"),_Resizer__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Resizer/TopResizer.tsx"),_Resizer__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Resizer/BottomResizer.tsx"),_OverlayInteractionHandler__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/Overlay/OverlayInteractionHandler.tsx");function OverlayResizeHandles(props){const overlayResizer=function useOverlayResizer(props={}){const initialBoundsRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({top:0,height:0,width:0,left:0}),interactionHandler=(0,_OverlayInteractionHandler__WEBPACK_IMPORTED_MODULE_5__.G)(),{minWidth=interactionHandler?.minWidth??1,minHeight=interactionHandler?.minHeight??1}=props;if(!interactionHandler)return null;const{finishInteraction,startInteraction,updateBounds}=interactionHandler,onResize={right:size=>updateBounds({...initialBoundsRef.current,width:Math.max(minWidth,initialBoundsRef.current.width+size)}),bottom:size=>updateBounds({...initialBoundsRef.current,height:Math.max(minHeight,initialBoundsRef.current.height+size)}),left:size=>{const newWidth=Math.max(minWidth,initialBoundsRef.current.width+size),initialBounds=initialBoundsRef.current;return updateBounds({...initialBounds,left:initialBounds.left+initialBounds.width-newWidth,width:newWidth})},top:size=>{const newHeight=Math.max(minHeight,initialBoundsRef.current.height+size),initialBounds=initialBoundsRef.current;return updateBounds({...initialBounds,top:initialBounds.top+initialBounds.height-newHeight,height:newHeight})}};function getResizerProps(side){return{size:1,cursor:"left"===side||"right"===side?"ew":"ns",onResizeStarted:()=>{initialBoundsRef.current=startInteraction("resize")},onResize:onResize[side],onResizeEnd:finishInteraction,style:{position:"absolute",[side]:0}}}return{getResizerProps}}(props);return overlayResizer&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Resizer__WEBPACK_IMPORTED_MODULE_1__.R,overlayResizer.getResizerProps("right")),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Resizer__WEBPACK_IMPORTED_MODULE_2__.o,overlayResizer.getResizerProps("left")),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Resizer__WEBPACK_IMPORTED_MODULE_3__.M,overlayResizer.getResizerProps("top")),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Resizer__WEBPACK_IMPORTED_MODULE_4__.I,overlayResizer.getResizerProps("bottom")))}OverlayResizeHandles.__docgenInfo={description:"Renders invisible resize handles at the edges of the overlay it's rendered in. It uses the context provided by\n{@link OverlayInteractionHandler} to resize the overlay when the handles are used.",methods:[],displayName:"OverlayResizeHandles",props:{minWidth:{required:!1,tsType:{name:"number"},description:""},minHeight:{required:!1,tsType:{name:"number"},description:""}}}},"./src/Overlay/bounds-helpers.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{DT:()=>containedWithin,G1:()=>position,W7:()=>getCenteredBounds,s2:()=>withMinSize,ws:()=>ensureInViewport});var ramda__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/clamp.js");const withMinSize=({width:minWidth,height:minHeight})=>bounds=>{const width=Math.max(minWidth,bounds.width),height=Math.max(minHeight,bounds.height);return bounds.width!=width||bounds.height!=height?{...bounds,width,height}:bounds};function getCenteredBounds(width,height){return{left:(window.innerWidth-width)/2,top:(window.innerHeight-height)/2,width,height}}const containedWithin=containerBounds=>(bounds,interactionType)=>{if("move"===interactionType){const left=(0,ramda__WEBPACK_IMPORTED_MODULE_0__.A)(containerBounds.left,containerBounds.left+containerBounds.width-bounds.width,bounds.left),top=(0,ramda__WEBPACK_IMPORTED_MODULE_0__.A)(containerBounds.top,containerBounds.top+containerBounds.height-bounds.height,bounds.top);return{...bounds,left,top}}if("resize"===interactionType){const left=Math.max(containerBounds.left,bounds.left),top=Math.max(containerBounds.top,bounds.top);return{left,top,width:bounds.width-Math.max(0,bounds.left+bounds.width-(containerBounds.left+containerBounds.width))-(left-bounds.left),height:bounds.height-Math.max(0,bounds.top+bounds.height-(containerBounds.top+containerBounds.height))-(top-bounds.top)}}return bounds},position=({targetElement,placement="bottom"})=>({height,width})=>{const targetBounds=targetElement.getBoundingClientRect();return{left:targetBounds.left,top:"bottom"===placement?targetBounds.top+targetBounds.height:targetBounds.top-height,width,height}};function ensureInViewport(bounds,{gap=0}={}){const viewportWidth=window.innerWidth-gap,viewportHeight=window.innerHeight-gap,left=(0,ramda__WEBPACK_IMPORTED_MODULE_0__.A)(gap,viewportWidth-bounds.width,bounds.left),top=(0,ramda__WEBPACK_IMPORTED_MODULE_0__.A)(gap,viewportHeight-bounds.height,bounds.top);return left!==bounds.left||top!==bounds.top?{left,top,width:bounds.width,height:bounds.height}:bounds}},"./src/Overlay/useResizableMovableOverlay.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{b:()=>useResizableMovableOverlay});var react=__webpack_require__("../../node_modules/react/index.js"),useControlledState=__webpack_require__("../../node_modules/@react-stately/utils/dist/useControlledState.mjs"),clamp=__webpack_require__("./node_modules/ramda/es/clamp.js"),filter=__webpack_require__("./node_modules/ramda/es/filter.js");const getContentSize=(style={width:"",minWidth:"fit-content",height:"",minHeight:"fit-content"},fn=element=>({width:Math.ceil(parseFloat(getComputedStyle(element).width)),height:Math.ceil(parseFloat(getComputedStyle(element).height))}),element=>{const clone=element.cloneNode(!0);clone.style.position="absolute",clone.style.left="-9999px",document.body.appendChild(clone),Object.assign(clone.style,style);const returnValue=fn(clone);return document.body.removeChild(clone),returnValue});var style,fn;const useContentSize=(ref,{observe=!1}={})=>{const[measuredSizes,setMeasuredSizes]=(0,react.useState)([]);(0,react.useLayoutEffect)((()=>{const element=ref.current;if(!element||measuredSizes.length>5)return;const size=getContentSize(element),lastMeasuredSize=measuredSizes.at(-1);lastMeasuredSize&&Size.isEqual(lastMeasuredSize,size)||setMeasuredSizes([size]);const id=window.requestAnimationFrame((()=>{const newSize=getContentSize(element);Size.isEqual(newSize,size)||setMeasuredSizes([...measuredSizes,newSize])}));return()=>{window.cancelAnimationFrame(id)}}),[measuredSizes,ref.current]);const measure=()=>{const lastMeasuredSize=measuredSizes.at(-1);if(ref.current&&lastMeasuredSize){const currentSize=getContentSize(ref.current);currentSize.height===lastMeasuredSize.height&&currentSize.width===lastMeasuredSize.width||setMeasuredSizes(measuredSizes.map((aSize=>aSize===lastMeasuredSize?currentSize:aSize)))}},debouncedMeasure=((fn,{timeout=100}={})=>{const fnRef=(0,react.useRef)(fn),currentTimeoutId=(0,react.useRef)(null);return(0,react.useLayoutEffect)((()=>{fnRef.current=fn})),(0,react.useEffect)((()=>()=>{null!==currentTimeoutId.current&&clearTimeout(currentTimeoutId.current)}),[]),(0,react.useCallback)((()=>{null!==currentTimeoutId.current&&clearTimeout(currentTimeoutId.current),currentTimeoutId.current=window.setTimeout(fnRef.current,timeout)}),[])})(measure);return(0,react.useEffect)((()=>{const element=ref.current;if(observe&&element){const mutationObserver=new MutationObserver((()=>{debouncedMeasure()}));return mutationObserver.observe(element,{subtree:!0,childList:!0}),()=>{mutationObserver.disconnect()}}}),[observe,ref.current]),[measuredSizes.at(-1)||{width:0,height:0},measure]},Size={isEqual:({width,height},{width:width2,height:height2})=>width===width2&&height===height2};var bounds_helpers=__webpack_require__("./src/Overlay/bounds-helpers.tsx");function useResizableMovableOverlay(overlayRef,{bounds:inputBounds,defaultBounds,onBoundsChange,onBoundsChanging=i=>i,minWidth,minHeight,observeContentResize}){const[bounds,setBounds]=(0,useControlledState.P)(inputBounds,defaultBounds,onBoundsChange),[contentSize,measureContentSize]=useContentSize(overlayRef,{observe:observeContentResize}),[currentInteraction,setCurrentInteraction]=(0,react.useState)(null),effectiveMinWidth="content"===minWidth?contentSize.width:minWidth||0,effectiveMinHeight="content"===minHeight?contentSize.height:minHeight||0,applyMinSize=(0,bounds_helpers.s2)({width:effectiveMinWidth,height:effectiveMinHeight}),overlayInteractionHandlerProps={startInteraction:type=>{if(!overlayRef.current)throw new Error("overlayRef value is not set. Make sure to have the ref passed to the resizable/movable overlay");const bounds=getBounds(overlayRef.current);return setCurrentInteraction({bounds,type}),bounds},updateBounds:updatedBounds=>{setCurrentInteraction((currentInteraction=>{if(currentInteraction){const{type}=currentInteraction;return{type,bounds:onBoundsChanging(updatedBounds,type)||updatedBounds}}return currentInteraction}))},finishInteraction:()=>{currentInteraction&&overlayRef.current&&setBounds(getBounds(overlayRef.current),currentInteraction.type),setCurrentInteraction(null)},minWidth:effectiveMinWidth,minHeight:effectiveMinHeight},partialBounds=currentInteraction?.bounds??bounds,centeredContentBounds=(0,bounds_helpers.W7)((0,clamp.A)(effectiveMinWidth,window.innerWidth,bounds?.width??contentSize.width),(0,clamp.A)(effectiveMinHeight,window.innerHeight,bounds?.height??contentSize.height));return{positioned:null!=partialBounds?.left&&null!=partialBounds?.top,sized:null!=partialBounds?.width&&null!=partialBounds?.height,bounds:applyMinSize({...centeredContentBounds,...partialBounds&&(0,filter.A)((value=>null!=value),partialBounds)}),UNSAFE_measureContentSize:measureContentSize,overlayInteractionHandlerProps}}function getBounds(element){const{left,top,width,height}=element.getBoundingClientRect();return{left,top,width,height}}},"./src/Resizer/TopResizer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>TopResizer});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_useResizer__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/Resizer/useResizer.ts"),_VerticalResizer__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Resizer/VerticalResizer.tsx");const TopResizer=({onResize,onResizeEnd,onResizeStarted,...props})=>{const{resizerProps}=(0,_useResizer__WEBPACK_IMPORTED_MODULE_1__.LO)({onResize,onResizeEnd,onResizeStarted});return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_VerticalResizer__WEBPACK_IMPORTED_MODULE_2__.H,{resizerProps,...props})};TopResizer.__docgenInfo={description:"Handle for resizing views in a vertical layout, where the resizer is at the top side of the resizable view. i.e.\nmoving mouse to bottom/top will decrease/increase the height",methods:[],displayName:"TopResizer",props:{onResizeStarted:{required:!0,tsType:{name:"signature",type:"function",raw:"() => number | void",signature:{arguments:[],return:{name:"union",raw:"number | void",elements:[{name:"number"},{name:"void"}]}}},description:"Called when the resize starts by a move action. The callback can optionally\nreturn the initial width of the view for which the resize handle\nis used. The amount of resize will be added to this initial value and\npassed to `onResize`, when movement happens."},onResize:{required:!0,tsType:{name:"signature",type:"function",raw:"(size: number) => void",signature:{arguments:[{type:{name:"number"},name:"size"}],return:{name:"void"}}},description:"Called when resize is happening.\n@param size: New size based on the diff and the initial size returned\nby onResizeStarted, or zero if initial size is not returned."},onResizeEnd:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when movement interaction is finished, e.g. by a mouse up event."},background:{required:!1,tsType:{name:'CSSProperties["background"]',raw:'CSSProperties["background"]'},description:"Background color of the visible space-occupying part of the resize handle."},size:{required:!1,tsType:{name:"number"},description:"Visible and space-occupying part of the resize handle. Total grab-able\nwidth will be `size` + `outerPadding`\n@default 0"},outerPadding:{required:!1,tsType:{name:"number"},description:"Length of the extra grab-able zone around the resize handle.\nFor example, if set to 10 there will be an area of length 5 pixels in each\nside of the handle which still can be used for resizing.\n@default 10"},cursor:{required:!1,tsType:{name:"unknown"},description:"Resizer cursor."},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Any arbitrary content for customizing look and feel of the resizer.\nFor example for showing a rounded handle kind of thing in the middle,\nor showing shadows, etc."},style:{required:!1,tsType:{name:"Omit",elements:[{name:"CSSProperties"},{name:"union",raw:'(Orientation extends "horizontal" ? "width" : "height") | "background"',elements:[{name:"unknown"},{name:"literal",value:'"background"'}]}],raw:'Omit<\n  CSSProperties,\n  (Orientation extends "horizontal" ? "width" : "height") | "background"\n>'},description:"styles passed to the root resizer element. `width` and `background` is not allowed and will be overridden.\nNOTE: it's added to allow use case of absolutely positioned resizers in float tool windows. Might be a better\nidea to add a `absolute` instead option and apply the necessary style based on it, if it can be seen as a re-usable\nand legit feature."}}}},"./src/utils/useEventCallback.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>useEventCallback});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function useEventCallback(fn){let ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();(0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)((()=>{ref.current=fn}));return(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(((...args)=>ref.current?.apply(null,args)),[])}}}]);