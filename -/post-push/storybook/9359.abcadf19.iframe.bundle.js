"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[9359],{"../../node_modules/@react-aria/tooltip/dist/useTooltip.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{f:()=>$326e436e94273fe1$export$1c4b08e0eca38426});var _react_aria_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@react-aria/utils/dist/filterDOMProps.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useHover.mjs");function $326e436e94273fe1$export$1c4b08e0eca38426(props,state){let domProps=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_0__.$)(props,{labelable:!0}),{hoverProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_1__.M)({onHoverStart:()=>null==state?void 0:state.open(!0),onHoverEnd:()=>null==state?void 0:state.close()});return{tooltipProps:(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.v)(domProps,hoverProps,{role:"tooltip"})}}},"../../node_modules/@react-aria/tooltip/dist/useTooltipTrigger.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>$4e1b34546679e357$export$a6da6c504e4bba8b});var _react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocusVisible.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useHover.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useId.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_focus__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusable.mjs");function $4e1b34546679e357$export$a6da6c504e4bba8b(props,state,ref){let{isDisabled,trigger}=props,tooltipId=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.Bi)(),isHovered=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),isFocused=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),handleShow=()=>{(isHovered.current||isFocused.current)&&state.open(isFocused.current)},handleHide=immediate=>{isHovered.current||isFocused.current||state.close(immediate)};(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{let onKeyDown=e=>{ref&&ref.current&&"Escape"===e.key&&(e.stopPropagation(),state.close(!0))};if(state.isOpen)return document.addEventListener("keydown",onKeyDown,!0),()=>{document.removeEventListener("keydown",onKeyDown,!0)}}),[ref,state]);let onPressStart=()=>{isFocused.current=!1,isHovered.current=!1,handleHide(!0)},{hoverProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_3__.M)({isDisabled,onHoverStart:()=>{"focus"!==trigger&&("pointer"===(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__.ME)()?isHovered.current=!0:isHovered.current=!1,handleShow())},onHoverEnd:()=>{"focus"!==trigger&&(isFocused.current=!1,isHovered.current=!1,handleHide())}}),{focusableProps}=(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_4__.W)({isDisabled,onFocus:()=>{(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__.pP)()&&(isFocused.current=!0,handleShow())},onBlur:()=>{isFocused.current=!1,isHovered.current=!1,handleHide(!0)}},ref);return{triggerProps:{"aria-describedby":state.isOpen?tooltipId:void 0,...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__.v)(focusableProps,hoverProps,{onPointerDown:onPressStart,onKeyDown:onPressStart})},tooltipProps:{id:tooltipId}}}},"../../node_modules/@react-stately/tooltip/dist/useTooltipTriggerState.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>$8796f90736e175cb$export$4d40659c25ecb50b});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_stately_overlays__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-stately/overlays/dist/useOverlayTriggerState.mjs");const $8796f90736e175cb$var$TOOLTIP_DELAY=1500,$8796f90736e175cb$var$TOOLTIP_COOLDOWN=500;let $8796f90736e175cb$var$tooltips={},$8796f90736e175cb$var$tooltipId=0,$8796f90736e175cb$var$globalWarmedUp=!1,$8796f90736e175cb$var$globalWarmUpTimeout=null,$8796f90736e175cb$var$globalCooldownTimeout=null;function $8796f90736e175cb$export$4d40659c25ecb50b(props={}){let{delay=$8796f90736e175cb$var$TOOLTIP_DELAY,closeDelay=$8796f90736e175cb$var$TOOLTIP_COOLDOWN}=props,{isOpen,open,close}=(0,_react_stately_overlays__WEBPACK_IMPORTED_MODULE_1__.T)(props),id=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>""+ ++$8796f90736e175cb$var$tooltipId),[]),closeTimeout=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),closeCallback=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(close),ensureTooltipEntry=()=>{$8796f90736e175cb$var$tooltips[id]=hideTooltip},closeOpenTooltips=()=>{for(let hideTooltipId in $8796f90736e175cb$var$tooltips)hideTooltipId!==id&&($8796f90736e175cb$var$tooltips[hideTooltipId](!0),delete $8796f90736e175cb$var$tooltips[hideTooltipId])},showTooltip=()=>{closeTimeout.current&&clearTimeout(closeTimeout.current),closeTimeout.current=null,closeOpenTooltips(),ensureTooltipEntry(),$8796f90736e175cb$var$globalWarmedUp=!0,open(),$8796f90736e175cb$var$globalWarmUpTimeout&&(clearTimeout($8796f90736e175cb$var$globalWarmUpTimeout),$8796f90736e175cb$var$globalWarmUpTimeout=null),$8796f90736e175cb$var$globalCooldownTimeout&&(clearTimeout($8796f90736e175cb$var$globalCooldownTimeout),$8796f90736e175cb$var$globalCooldownTimeout=null)},hideTooltip=immediate=>{immediate||closeDelay<=0?(closeTimeout.current&&clearTimeout(closeTimeout.current),closeTimeout.current=null,closeCallback.current()):closeTimeout.current||(closeTimeout.current=setTimeout((()=>{closeTimeout.current=null,closeCallback.current()}),closeDelay)),$8796f90736e175cb$var$globalWarmUpTimeout&&(clearTimeout($8796f90736e175cb$var$globalWarmUpTimeout),$8796f90736e175cb$var$globalWarmUpTimeout=null),$8796f90736e175cb$var$globalWarmedUp&&($8796f90736e175cb$var$globalCooldownTimeout&&clearTimeout($8796f90736e175cb$var$globalCooldownTimeout),$8796f90736e175cb$var$globalCooldownTimeout=setTimeout((()=>{delete $8796f90736e175cb$var$tooltips[id],$8796f90736e175cb$var$globalCooldownTimeout=null,$8796f90736e175cb$var$globalWarmedUp=!1}),Math.max($8796f90736e175cb$var$TOOLTIP_COOLDOWN,closeDelay)))};return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{closeCallback.current=close}),[close]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>()=>{closeTimeout.current&&clearTimeout(closeTimeout.current),$8796f90736e175cb$var$tooltips[id]&&delete $8796f90736e175cb$var$tooltips[id]}),[id]),{isOpen,open:immediate=>{!immediate&&delay>0&&!closeTimeout.current?(closeOpenTooltips(),ensureTooltipEntry(),isOpen||$8796f90736e175cb$var$globalWarmUpTimeout||$8796f90736e175cb$var$globalWarmedUp?isOpen||showTooltip():$8796f90736e175cb$var$globalWarmUpTimeout=setTimeout((()=>{$8796f90736e175cb$var$globalWarmUpTimeout=null,$8796f90736e175cb$var$globalWarmedUp=!0,showTooltip()}),delay)):showTooltip()},close:hideTooltip}}},"./node_modules/ramda/es/compose.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>compose});var pipe=__webpack_require__("./node_modules/ramda/es/pipe.js"),_curry1=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js"),_isString=__webpack_require__("./node_modules/ramda/es/internal/_isString.js");const es_reverse=(0,_curry1.A)((function reverse(list){return(0,_isString.A)(list)?list.split("").reverse().join(""):Array.prototype.slice.call(list,0).reverse()}));function compose(){if(0===arguments.length)throw new Error("compose requires at least one argument");return pipe.A.apply(this,es_reverse(arguments))}},"./node_modules/ramda/es/identity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _identity(x){return x}__webpack_require__.d(__webpack_exports__,{A:()=>es_identity});const es_identity=(0,__webpack_require__("./node_modules/ramda/es/internal/_curry1.js").A)(_identity)},"./node_modules/ramda/es/internal/_curry3.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>_curry3});var _curry1_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js"),_curry2_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/ramda/es/internal/_curry2.js"),_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/internal/_isPlaceholder.js");function _curry3(fn){return function f3(a,b,c){switch(arguments.length){case 0:return f3;case 1:return(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(a)?f3:(0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.A)((function(_b,_c){return fn(a,_b,_c)}));case 2:return(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(a)&&(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(b)?f3:(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(a)?(0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.A)((function(_a,_c){return fn(_a,b,_c)})):(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(b)?(0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.A)((function(_b,_c){return fn(a,_b,_c)})):(0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__.A)((function(_c){return fn(a,b,_c)}));default:return(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(a)&&(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(b)&&(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(c)?f3:(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(a)&&(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(b)?(0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.A)((function(_a,_b){return fn(_a,_b,c)})):(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(a)&&(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(c)?(0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.A)((function(_a,_c){return fn(_a,b,_c)})):(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(b)&&(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(c)?(0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.A)((function(_b,_c){return fn(a,_b,_c)})):(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(a)?(0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__.A)((function(_a){return fn(_a,b,c)})):(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(b)?(0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__.A)((function(_b){return fn(a,_b,c)})):(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(c)?(0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__.A)((function(_c){return fn(a,b,_c)})):fn(a,b,c)}}}},"./node_modules/ramda/es/pipe.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>pipe});var _arity=__webpack_require__("./node_modules/ramda/es/internal/_arity.js");function _pipe(f,g){return function(){return g.call(this,f.apply(this,arguments))}}var _curry3=__webpack_require__("./node_modules/ramda/es/internal/_curry3.js"),_reduce=__webpack_require__("./node_modules/ramda/es/internal/_reduce.js");const es_reduce=(0,_curry3.A)(_reduce.A);var _checkForMethod=__webpack_require__("./node_modules/ramda/es/internal/_checkForMethod.js"),_curry1=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js");const es_slice=(0,_curry3.A)((0,_checkForMethod.A)("slice",(function slice(fromIndex,toIndex,list){return Array.prototype.slice.call(list,fromIndex,toIndex)})));const es_tail=(0,_curry1.A)((0,_checkForMethod.A)("tail",es_slice(1,1/0)));function pipe(){if(0===arguments.length)throw new Error("pipe requires at least one argument");return(0,_arity.A)(arguments[0].length,es_reduce(_pipe,arguments[0],es_tail(arguments)))}}}]);