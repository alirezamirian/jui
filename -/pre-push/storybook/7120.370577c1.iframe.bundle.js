"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[7120],{"../../node_modules/@react-aria/checkbox/dist/module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{vp:()=>$406796ff087fe49b$export$e375f10ce42261c5});var react=__webpack_require__("../../node_modules/react/index.js"),mergeProps=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),filterDOMProps=__webpack_require__("../../node_modules/@react-aria/utils/dist/filterDOMProps.mjs"),useEffectEvent=__webpack_require__("../../node_modules/@react-aria/utils/dist/useEffectEvent.mjs");function $99facab73266f662$export$5add1d006293d136(ref,initialValue,onReset){let resetValue=(0,react.useRef)(initialValue),handleReset=(0,useEffectEvent.J)((()=>{onReset&&onReset(resetValue.current)}));(0,react.useEffect)((()=>{var _ref_current;let form=null==ref||null===(_ref_current=ref.current)||void 0===_ref_current?void 0:_ref_current.form;return null==form||form.addEventListener("reset",handleReset),()=>{null==form||form.removeEventListener("reset",handleReset)}}),[ref,handleReset])}var useFocusable=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusable.mjs"),usePress=__webpack_require__("../../node_modules/@react-aria/interactions/dist/usePress.mjs");function $d2c8e2b0480f3f34$export$cbe85ee05b554577(props,state,ref){let{isDisabled=!1,isReadOnly=!1,value,name,children,"aria-label":ariaLabel,"aria-labelledby":ariaLabelledby,validationState="valid",isInvalid}=props;null!=children||(null!=ariaLabel||null!=ariaLabelledby)||console.warn("If you do not provide children, you must specify an aria-label for accessibility");let{pressProps,isPressed}=(0,usePress.d)({isDisabled}),{pressProps:labelProps,isPressed:isLabelPressed}=(0,usePress.d)({isDisabled:isDisabled||isReadOnly,onPress(){state.toggle()}}),{focusableProps}=(0,useFocusable.W)(props,ref),interactions=(0,mergeProps.v)(pressProps,focusableProps),domProps=(0,filterDOMProps.$)(props,{labelable:!0});return $99facab73266f662$export$5add1d006293d136(ref,state.isSelected,state.setSelected),{labelProps:(0,mergeProps.v)(labelProps,{onClick:e=>e.preventDefault()}),inputProps:(0,mergeProps.v)(domProps,{"aria-invalid":isInvalid||"invalid"===validationState||void 0,"aria-errormessage":props["aria-errormessage"],"aria-controls":props["aria-controls"],"aria-readonly":isReadOnly||void 0,onChange:e=>{e.stopPropagation(),state.setSelected(e.target.checked)},disabled:isDisabled,...null==value?{}:{value},name,type:"checkbox",...interactions}),isSelected:state.isSelected,isPressed:isPressed||isLabelPressed,isDisabled,isReadOnly,isInvalid:isInvalid||"invalid"===validationState}}var useLabel=__webpack_require__("../../node_modules/@react-aria/label/dist/useLabel.mjs"),useToggleState=__webpack_require__("../../node_modules/@react-stately/toggle/dist/useToggleState.mjs");function $parcel$export(e,n,v,s){Object.defineProperty(e,n,{get:v,set:s,enumerable:!0,configurable:!0})}function $406796ff087fe49b$export$e375f10ce42261c5(props,state,inputRef){let{inputProps}=$d2c8e2b0480f3f34$export$cbe85ee05b554577(props,state,inputRef),{isSelected}=state,{isIndeterminate}=props;return(0,react.useEffect)((()=>{inputRef.current&&(inputRef.current.indeterminate=isIndeterminate)})),{inputProps:{...inputProps,checked:isSelected,"aria-checked":isIndeterminate?"mixed":isSelected}}}$parcel$export({},"useCheckbox",(()=>$406796ff087fe49b$export$e375f10ce42261c5));$parcel$export({},"useCheckboxGroup",(()=>$1e9fce0cfacc738b$export$49ff6f28c54f1cbe));const $1ae600c947479353$export$31440636951aa68c=new WeakMap;function $1e9fce0cfacc738b$export$49ff6f28c54f1cbe(props,state){let{isDisabled,name}=props,{labelProps,fieldProps}=(0,useLabel.M)({...props,labelElementType:"span"}),domProps=(0,filterDOMProps.$)(props,{labelable:!0});return $1ae600c947479353$export$31440636951aa68c.set(state,name),{groupProps:(0,mergeProps.v)(domProps,{role:"group","aria-disabled":isDisabled||void 0,...fieldProps}),labelProps}}function $fba3e38d5ca8983f$export$353b32fc6898d37d(props,state,inputRef){const toggleState=(0,useToggleState.H)({isReadOnly:props.isReadOnly||state.isReadOnly,isSelected:state.isSelected(props.value),onChange(isSelected){isSelected?state.addValue(props.value):state.removeValue(props.value),props.onChange&&props.onChange(isSelected)}});let{inputProps}=$406796ff087fe49b$export$e375f10ce42261c5({...props,isReadOnly:props.isReadOnly||state.isReadOnly,isDisabled:props.isDisabled||state.isDisabled,name:props.name||$1ae600c947479353$export$31440636951aa68c.get(state)},toggleState,inputRef);return{inputProps}}$parcel$export({},"useCheckboxGroupItem",(()=>$fba3e38d5ca8983f$export$353b32fc6898d37d))},"../../node_modules/@react-aria/dialog/dist/module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>$40df3f8667284809$export$d55e7ee900f34e93});var _react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useId.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/utils/dist/filterDOMProps.mjs"),_react_aria_focus__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/focus/dist/focusSafely.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function $40df3f8667284809$export$d55e7ee900f34e93(props,ref){let{role="dialog"}=props,titleId=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.X1)();return titleId=props["aria-label"]?void 0:titleId,(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{if(ref.current&&!ref.current.contains(document.activeElement)){(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_2__.l)(ref.current);let timeout=setTimeout((()=>{document.activeElement===ref.current&&(ref.current.blur(),(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_2__.l)(ref.current))}),500);return()=>{clearTimeout(timeout)}}}),[ref]),{dialogProps:{...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__.$)(props,{labelable:!0}),role,tabIndex:-1,"aria-labelledby":props["aria-labelledby"]||titleId},titleProps:{id:titleId}}}!function $parcel$export(e,n,v,s){Object.defineProperty(e,n,{get:v,set:s,enumerable:!0,configurable:!0})}({},"useDialog",(()=>$40df3f8667284809$export$d55e7ee900f34e93))},"../../node_modules/@react-aria/focus/dist/useFocusRing.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{o:()=>$f7dceffc5ad7768b$export$4e328f61c538687f});var _react_aria_interactions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocusVisible.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocus.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocusWithin.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function $f7dceffc5ad7768b$export$4e328f61c538687f(props={}){let{autoFocus=!1,isTextInput,within}=props,state=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({isFocused:!1,isFocusVisible:autoFocus||(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_1__.pP)()}),[isFocused,setFocused]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[isFocusVisibleState,setFocusVisible]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)((()=>state.current.isFocused&&state.current.isFocusVisible)),updateState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>setFocusVisible(state.current.isFocused&&state.current.isFocusVisible)),[]),onFocusChange=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((isFocused=>{state.current.isFocused=isFocused,setFocused(isFocused),updateState()}),[updateState]);(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_1__.K7)((isFocusVisible=>{state.current.isFocusVisible=isFocusVisible,updateState()}),[],{isTextInput});let{focusProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__.i)({isDisabled:within,onFocusChange}),{focusWithinProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_3__.R)({isDisabled:!within,onFocusWithinChange:onFocusChange});return{isFocused,isFocusVisible:isFocusVisibleState,focusProps:within?focusWithinProps:focusProps}}},"../../node_modules/@react-aria/overlays/dist/useModalOverlay.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{l:()=>$8ac8429251c45e4b$export$dbc0f175b25fb0fb});var _ariaHideOutside_mjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/ariaHideOutside.mjs"),_useOverlay_mjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/useOverlay.mjs"),_Overlay_mjs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/Overlay.mjs"),_usePreventScroll_mjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/usePreventScroll.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function $8ac8429251c45e4b$export$dbc0f175b25fb0fb(props,state,ref){let{overlayProps,underlayProps}=(0,_useOverlay_mjs__WEBPACK_IMPORTED_MODULE_1__.e)({...props,isOpen:state.isOpen,onClose:state.close},ref);return(0,_usePreventScroll_mjs__WEBPACK_IMPORTED_MODULE_2__.H)({isDisabled:!state.isOpen}),(0,_Overlay_mjs__WEBPACK_IMPORTED_MODULE_3__.Se)(),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{if(state.isOpen)return(0,_ariaHideOutside_mjs__WEBPACK_IMPORTED_MODULE_4__.h)([ref.current])}),[state.isOpen,ref]),{modalProps:(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__.v)(overlayProps),underlayProps}}},"../../node_modules/@react-aria/tooltip/dist/module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>$4e1b34546679e357$export$a6da6c504e4bba8b,f:()=>$326e436e94273fe1$export$1c4b08e0eca38426});var _react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/filterDOMProps.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useId.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useHover.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocusVisible.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/usePress.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_focus__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusable.mjs");function $326e436e94273fe1$export$1c4b08e0eca38426(props,state){let domProps=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.$)(props,{labelable:!0}),{hoverProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__.M)({onHoverStart:()=>null==state?void 0:state.open(!0),onHoverEnd:()=>null==state?void 0:state.close()});return{tooltipProps:(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__.v)(domProps,hoverProps,{role:"tooltip"})}}function $4e1b34546679e357$export$a6da6c504e4bba8b(props,state,ref){let{isDisabled,trigger}=props,tooltipId=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_4__.Bi)(),isHovered=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),isFocused=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),handleShow=()=>{(isHovered.current||isFocused.current)&&state.open(isFocused.current)},handleHide=immediate=>{isHovered.current||isFocused.current||state.close(immediate)};(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{let onKeyDown=e=>{ref&&ref.current&&"Escape"===e.key&&state.close(!0)};if(state.isOpen)return document.addEventListener("keydown",onKeyDown,!0),()=>{document.removeEventListener("keydown",onKeyDown,!0)}}),[ref,state]);let{hoverProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__.M)({isDisabled,onHoverStart:()=>{"focus"!==trigger&&("pointer"===(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_5__.ME)()?isHovered.current=!0:isHovered.current=!1,handleShow())},onHoverEnd:()=>{"focus"!==trigger&&(isFocused.current=!1,isHovered.current=!1,handleHide())}}),{pressProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_6__.d)({onPressStart:()=>{isFocused.current=!1,isHovered.current=!1,handleHide(!0)}}),{focusableProps}=(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_7__.W)({isDisabled,onFocus:()=>{(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_5__.pP)()&&(isFocused.current=!0,handleShow())},onBlur:()=>{isFocused.current=!1,isHovered.current=!1,handleHide(!0)}},ref);return{triggerProps:{"aria-describedby":state.isOpen?tooltipId:void 0,...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__.v)(focusableProps,hoverProps,pressProps)},tooltipProps:{id:tooltipId}}}},"../../node_modules/@react-aria/utils/dist/runAfterTransition.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{v:()=>$bbed8b41f857bcc0$export$24490316f764c430});let $bbed8b41f857bcc0$var$transitionsByElement=new Map,$bbed8b41f857bcc0$var$transitionCallbacks=new Set;function $bbed8b41f857bcc0$var$setupGlobalEvents(){if("undefined"==typeof window)return;function isTransitionEvent(event){return"propertyName"in event}let onTransitionEnd=e=>{if(!isTransitionEvent(e)||!e.target)return;let properties=$bbed8b41f857bcc0$var$transitionsByElement.get(e.target);if(properties&&(properties.delete(e.propertyName),0===properties.size&&(e.target.removeEventListener("transitioncancel",onTransitionEnd),$bbed8b41f857bcc0$var$transitionsByElement.delete(e.target)),0===$bbed8b41f857bcc0$var$transitionsByElement.size)){for(let cb of $bbed8b41f857bcc0$var$transitionCallbacks)cb();$bbed8b41f857bcc0$var$transitionCallbacks.clear()}};document.body.addEventListener("transitionrun",(e=>{if(!isTransitionEvent(e)||!e.target)return;let transitions=$bbed8b41f857bcc0$var$transitionsByElement.get(e.target);transitions||(transitions=new Set,$bbed8b41f857bcc0$var$transitionsByElement.set(e.target,transitions),e.target.addEventListener("transitioncancel",onTransitionEnd,{once:!0})),transitions.add(e.propertyName)})),document.body.addEventListener("transitionend",onTransitionEnd)}function $bbed8b41f857bcc0$export$24490316f764c430(fn){requestAnimationFrame((()=>{0===$bbed8b41f857bcc0$var$transitionsByElement.size?fn():$bbed8b41f857bcc0$var$transitionCallbacks.add(fn)}))}"undefined"!=typeof document&&("loading"!==document.readyState?$bbed8b41f857bcc0$var$setupGlobalEvents():document.addEventListener("DOMContentLoaded",$bbed8b41f857bcc0$var$setupGlobalEvents))},"../../node_modules/@react-stately/toggle/dist/useToggleState.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{H:()=>$3017fa7ffdddec74$export$8042c6c013fd5226});var _react_stately_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@react-stately/utils/dist/useControlledState.mjs");function $3017fa7ffdddec74$export$8042c6c013fd5226(props={}){let{isReadOnly}=props,[isSelected,setSelected]=(0,_react_stately_utils__WEBPACK_IMPORTED_MODULE_0__.P)(props.isSelected,props.defaultSelected||!1,props.onChange);return{isSelected,setSelected:function updateSelected(value){isReadOnly||setSelected(value)},toggle:function toggleState(){isReadOnly||setSelected(!isSelected)}}}},"../../node_modules/@react-stately/tooltip/dist/module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>$8796f90736e175cb$export$4d40659c25ecb50b});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_stately_overlays__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-stately/overlays/dist/useOverlayTriggerState.mjs");const $8796f90736e175cb$var$TOOLTIP_DELAY=1500,$8796f90736e175cb$var$TOOLTIP_COOLDOWN=500;let $8796f90736e175cb$var$tooltips={},$8796f90736e175cb$var$tooltipId=0,$8796f90736e175cb$var$globalWarmedUp=!1,$8796f90736e175cb$var$globalWarmUpTimeout=null,$8796f90736e175cb$var$globalCooldownTimeout=null;function $8796f90736e175cb$export$4d40659c25ecb50b(props={}){let{delay=$8796f90736e175cb$var$TOOLTIP_DELAY}=props,{isOpen,open,close}=(0,_react_stately_overlays__WEBPACK_IMPORTED_MODULE_1__.T)(props),id=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>""+ ++$8796f90736e175cb$var$tooltipId),[]),closeTimeout=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),ensureTooltipEntry=()=>{$8796f90736e175cb$var$tooltips[id]=hideTooltip},closeOpenTooltips=()=>{for(let hideTooltipId in $8796f90736e175cb$var$tooltips)hideTooltipId!==id&&($8796f90736e175cb$var$tooltips[hideTooltipId](!0),delete $8796f90736e175cb$var$tooltips[hideTooltipId])},showTooltip=()=>{clearTimeout(closeTimeout.current),closeTimeout.current=null,closeOpenTooltips(),ensureTooltipEntry(),$8796f90736e175cb$var$globalWarmedUp=!0,open(),$8796f90736e175cb$var$globalWarmUpTimeout&&(clearTimeout($8796f90736e175cb$var$globalWarmUpTimeout),$8796f90736e175cb$var$globalWarmUpTimeout=null),$8796f90736e175cb$var$globalCooldownTimeout&&(clearTimeout($8796f90736e175cb$var$globalCooldownTimeout),$8796f90736e175cb$var$globalCooldownTimeout=null)},hideTooltip=immediate=>{immediate?(clearTimeout(closeTimeout.current),closeTimeout.current=null,close()):closeTimeout.current||(closeTimeout.current=setTimeout((()=>{closeTimeout.current=null,close()}),$8796f90736e175cb$var$TOOLTIP_COOLDOWN)),$8796f90736e175cb$var$globalWarmUpTimeout&&(clearTimeout($8796f90736e175cb$var$globalWarmUpTimeout),$8796f90736e175cb$var$globalWarmUpTimeout=null),$8796f90736e175cb$var$globalWarmedUp&&($8796f90736e175cb$var$globalCooldownTimeout&&clearTimeout($8796f90736e175cb$var$globalCooldownTimeout),$8796f90736e175cb$var$globalCooldownTimeout=setTimeout((()=>{delete $8796f90736e175cb$var$tooltips[id],$8796f90736e175cb$var$globalCooldownTimeout=null,$8796f90736e175cb$var$globalWarmedUp=!1}),$8796f90736e175cb$var$TOOLTIP_COOLDOWN))};return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>()=>{clearTimeout(closeTimeout.current),$8796f90736e175cb$var$tooltips[id]&&delete $8796f90736e175cb$var$tooltips[id]}),[id]),{isOpen,open:immediate=>{!immediate&&delay>0&&!closeTimeout.current?(closeOpenTooltips(),ensureTooltipEntry(),isOpen||$8796f90736e175cb$var$globalWarmUpTimeout||$8796f90736e175cb$var$globalWarmedUp?isOpen||showTooltip():$8796f90736e175cb$var$globalWarmUpTimeout=setTimeout((()=>{$8796f90736e175cb$var$globalWarmUpTimeout=null,$8796f90736e175cb$var$globalWarmedUp=!0,showTooltip()}),delay)):showTooltip()},close:hideTooltip}}},"./node_modules/ramda/es/clamp.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=(0,__webpack_require__("./node_modules/ramda/es/internal/_curry3.js").A)((function clamp(min,max,value){if(min>max)throw new Error("min must not be greater than max in clamp(min, max, value)");return value<min?min:value>max?max:value}))},"./node_modules/ramda/es/compose.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>compose});var pipe=__webpack_require__("./node_modules/ramda/es/pipe.js"),_curry1=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js"),_isString=__webpack_require__("./node_modules/ramda/es/internal/_isString.js");const es_reverse=(0,_curry1.A)((function reverse(list){return(0,_isString.A)(list)?list.split("").reverse().join(""):Array.prototype.slice.call(list,0).reverse()}));function compose(){if(0===arguments.length)throw new Error("compose requires at least one argument");return pipe.A.apply(this,es_reverse(arguments))}},"./node_modules/ramda/es/filter.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>es_filter});var _curry2=__webpack_require__("./node_modules/ramda/es/internal/_curry2.js"),_dispatchable=__webpack_require__("./node_modules/ramda/es/internal/_dispatchable.js");var _reduce=__webpack_require__("./node_modules/ramda/es/internal/_reduce.js"),_xfBase=__webpack_require__("./node_modules/ramda/es/internal/_xfBase.js"),XFilter=function(){function XFilter(f,xf){this.xf=xf,this.f=f}return XFilter.prototype["@@transducer/init"]=_xfBase.A.init,XFilter.prototype["@@transducer/result"]=_xfBase.A.result,XFilter.prototype["@@transducer/step"]=function(result,input){return this.f(input)?this.xf["@@transducer/step"](result,input):result},XFilter}();const internal_xfilter=(0,_curry2.A)((function _xfilter(f,xf){return new XFilter(f,xf)}));var keys=__webpack_require__("./node_modules/ramda/es/keys.js");const es_filter=(0,_curry2.A)((0,_dispatchable.A)(["filter"],internal_xfilter,(function(pred,filterable){return function _isObject(x){return"[object Object]"===Object.prototype.toString.call(x)}(filterable)?(0,_reduce.A)((function(acc,key){return pred(filterable[key])&&(acc[key]=filterable[key]),acc}),{},(0,keys.A)(filterable)):function _filter(fn,list){for(var idx=0,len=list.length,result=[];idx<len;)fn(list[idx])&&(result[result.length]=list[idx]),idx+=1;return result}(pred,filterable)})))},"./node_modules/ramda/es/identity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _identity(x){return x}__webpack_require__.d(__webpack_exports__,{A:()=>es_identity});const es_identity=(0,__webpack_require__("./node_modules/ramda/es/internal/_curry1.js").A)(_identity)}}]);