"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[3405,5195,3282],{"../../node_modules/@react-aria/button/dist/useButton.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{U:()=>$701a24aa0da5b062$export$ea18c227d4417cc3});var _react_aria_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/utils/dist/filterDOMProps.mjs"),_react_aria_focus__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusable.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/usePress.mjs");function $701a24aa0da5b062$export$ea18c227d4417cc3(props,ref){let additionalProps,{elementType="button",isDisabled,onPress,onPressStart,onPressEnd,onPressUp,onPressChange,preventFocusOnPress,allowFocusWhenDisabled,onClick:deprecatedOnClick,href,target,rel,type="button"}=props;additionalProps="button"===elementType?{type,disabled:isDisabled}:{role:"button",tabIndex:isDisabled?void 0:0,href:"a"===elementType&&isDisabled?void 0:href,target:"a"===elementType?target:void 0,type:"input"===elementType?type:void 0,disabled:"input"===elementType?isDisabled:void 0,"aria-disabled":isDisabled&&"input"!==elementType?isDisabled:void 0,rel:"a"===elementType?rel:void 0};let{pressProps,isPressed}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_0__.r)({onPressStart,onPressEnd,onPressChange,onPress,onPressUp,isDisabled,preventFocusOnPress,ref}),{focusableProps}=(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_1__.k)(props,ref);allowFocusWhenDisabled&&(focusableProps.tabIndex=isDisabled?-1:focusableProps.tabIndex);let buttonProps=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.d)(focusableProps,pressProps,(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__.z)(props,{labelable:!0}));return{isPressed,buttonProps:(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.d)(additionalProps,buttonProps,{"aria-haspopup":props["aria-haspopup"],"aria-expanded":props["aria-expanded"],"aria-controls":props["aria-controls"],"aria-pressed":props["aria-pressed"],onClick:e=>{deprecatedOnClick&&(deprecatedOnClick(e),console.warn("onClick is deprecated, please use onPress"))}})}}},"../../node_modules/@react-aria/focus/dist/FocusRing.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{t:()=>$907718708eab68af$export$1a38b4ad7f578e1d});var _useFocusRing_mjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusRing.mjs"),clsx__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/focus/node_modules/clsx/dist/clsx.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/focus/node_modules/@react-aria/utils/dist/mergeProps.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function $907718708eab68af$export$1a38b4ad7f578e1d(props){let{children,focusClass,focusRingClass}=props,{isFocused,isFocusVisible,focusProps}=(0,_useFocusRing_mjs__WEBPACK_IMPORTED_MODULE_1__.F)(props),child=react__WEBPACK_IMPORTED_MODULE_0__.Children.only(children);return react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(child,(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.d)(child.props,{...focusProps,className:(0,clsx__WEBPACK_IMPORTED_MODULE_3__.Z)({[focusClass||""]:isFocused,[focusRingClass||""]:isFocusVisible})}))}},"../../node_modules/@react-aria/focus/dist/useFocusRing.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{F:()=>$f7dceffc5ad7768b$export$4e328f61c538687f});var _react_aria_interactions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocusVisible.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocus.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocusWithin.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function $f7dceffc5ad7768b$export$4e328f61c538687f(props={}){let{autoFocus=!1,isTextInput,within}=props,state=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({isFocused:!1,isFocusVisible:autoFocus||(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_1__.E)()}),[isFocused,setFocused]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[isFocusVisibleState,setFocusVisible]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)((()=>state.current.isFocused&&state.current.isFocusVisible)),updateState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>setFocusVisible(state.current.isFocused&&state.current.isFocusVisible)),[]),onFocusChange=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((isFocused=>{state.current.isFocused=isFocused,setFocused(isFocused),updateState()}),[updateState]);(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_1__.mG)((isFocusVisible=>{state.current.isFocusVisible=isFocusVisible,updateState()}),[],{isTextInput});let{focusProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__.K)({isDisabled:within,onFocusChange}),{focusWithinProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_3__.L)({isDisabled:!within,onFocusWithinChange:onFocusChange});return{isFocused,isFocusVisible:isFocusVisibleState,focusProps:within?focusWithinProps:focusProps}}},"../../node_modules/@react-aria/tooltip/dist/module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Q:()=>$4e1b34546679e357$export$a6da6c504e4bba8b,l:()=>$326e436e94273fe1$export$1c4b08e0eca38426});var _react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/filterDOMProps.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useId.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useHover.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocusVisible.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/usePress.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_focus__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusable.mjs");function $326e436e94273fe1$export$1c4b08e0eca38426(props,state){let domProps=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.z)(props,{labelable:!0}),{hoverProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__.X)({onHoverStart:()=>null==state?void 0:state.open(!0),onHoverEnd:()=>null==state?void 0:state.close()});return{tooltipProps:(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__.d)(domProps,hoverProps,{role:"tooltip"})}}function $4e1b34546679e357$export$a6da6c504e4bba8b(props,state,ref){let{isDisabled,trigger}=props,tooltipId=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_4__.Me)(),isHovered=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),isFocused=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),handleShow=()=>{(isHovered.current||isFocused.current)&&state.open(isFocused.current)},handleHide=immediate=>{isHovered.current||isFocused.current||state.close(immediate)};(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{let onKeyDown=e=>{ref&&ref.current&&"Escape"===e.key&&state.close(!0)};if(state.isOpen)return document.addEventListener("keydown",onKeyDown,!0),()=>{document.removeEventListener("keydown",onKeyDown,!0)}}),[ref,state]);let{hoverProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__.X)({isDisabled,onHoverStart:()=>{"focus"!==trigger&&("pointer"===(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_5__.Jz)()?isHovered.current=!0:isHovered.current=!1,handleShow())},onHoverEnd:()=>{"focus"!==trigger&&(isFocused.current=!1,isHovered.current=!1,handleHide())}}),{pressProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_6__.r)({onPressStart:()=>{isFocused.current=!1,isHovered.current=!1,handleHide(!0)}}),{focusableProps}=(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_7__.k)({isDisabled,onFocus:()=>{(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_5__.E)()&&(isFocused.current=!0,handleShow())},onBlur:()=>{isFocused.current=!1,isHovered.current=!1,handleHide(!0)}},ref);return{triggerProps:{"aria-describedby":state.isOpen?tooltipId:void 0,...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__.d)(focusableProps,hoverProps,pressProps)},tooltipProps:{id:tooltipId}}}},"../../node_modules/@react-stately/overlays/dist/useOverlayTriggerState.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>$fc909762b330b746$export$61c6a8c84e605fb6});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_stately_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-stately/utils/dist/useControlledState.mjs");function $fc909762b330b746$export$61c6a8c84e605fb6(props){let[isOpen,setOpen]=(0,_react_stately_utils__WEBPACK_IMPORTED_MODULE_1__.z)(props.isOpen,props.defaultOpen||!1,props.onOpenChange);const open=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setOpen(!0)}),[setOpen]),close=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setOpen(!1)}),[setOpen]),toggle=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setOpen(!isOpen)}),[setOpen,isOpen]);return{isOpen,setOpen,open,close,toggle}}},"../../node_modules/@react-stately/tooltip/dist/module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>$8796f90736e175cb$export$4d40659c25ecb50b});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_stately_overlays__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-stately/overlays/dist/useOverlayTriggerState.mjs");const $8796f90736e175cb$var$TOOLTIP_DELAY=1500,$8796f90736e175cb$var$TOOLTIP_COOLDOWN=500;let $8796f90736e175cb$var$tooltips={},$8796f90736e175cb$var$tooltipId=0,$8796f90736e175cb$var$globalWarmedUp=!1,$8796f90736e175cb$var$globalWarmUpTimeout=null,$8796f90736e175cb$var$globalCooldownTimeout=null;function $8796f90736e175cb$export$4d40659c25ecb50b(props={}){let{delay=$8796f90736e175cb$var$TOOLTIP_DELAY}=props,{isOpen,open,close}=(0,_react_stately_overlays__WEBPACK_IMPORTED_MODULE_1__.d)(props),id=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>""+ ++$8796f90736e175cb$var$tooltipId),[]),closeTimeout=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),ensureTooltipEntry=()=>{$8796f90736e175cb$var$tooltips[id]=hideTooltip},closeOpenTooltips=()=>{for(let hideTooltipId in $8796f90736e175cb$var$tooltips)hideTooltipId!==id&&($8796f90736e175cb$var$tooltips[hideTooltipId](!0),delete $8796f90736e175cb$var$tooltips[hideTooltipId])},showTooltip=()=>{clearTimeout(closeTimeout.current),closeTimeout.current=null,closeOpenTooltips(),ensureTooltipEntry(),$8796f90736e175cb$var$globalWarmedUp=!0,open(),$8796f90736e175cb$var$globalWarmUpTimeout&&(clearTimeout($8796f90736e175cb$var$globalWarmUpTimeout),$8796f90736e175cb$var$globalWarmUpTimeout=null),$8796f90736e175cb$var$globalCooldownTimeout&&(clearTimeout($8796f90736e175cb$var$globalCooldownTimeout),$8796f90736e175cb$var$globalCooldownTimeout=null)},hideTooltip=immediate=>{immediate?(clearTimeout(closeTimeout.current),closeTimeout.current=null,close()):closeTimeout.current||(closeTimeout.current=setTimeout((()=>{closeTimeout.current=null,close()}),$8796f90736e175cb$var$TOOLTIP_COOLDOWN)),$8796f90736e175cb$var$globalWarmUpTimeout&&(clearTimeout($8796f90736e175cb$var$globalWarmUpTimeout),$8796f90736e175cb$var$globalWarmUpTimeout=null),$8796f90736e175cb$var$globalWarmedUp&&($8796f90736e175cb$var$globalCooldownTimeout&&clearTimeout($8796f90736e175cb$var$globalCooldownTimeout),$8796f90736e175cb$var$globalCooldownTimeout=setTimeout((()=>{delete $8796f90736e175cb$var$tooltips[id],$8796f90736e175cb$var$globalCooldownTimeout=null,$8796f90736e175cb$var$globalWarmedUp=!1}),$8796f90736e175cb$var$TOOLTIP_COOLDOWN))};return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>()=>{clearTimeout(closeTimeout.current),$8796f90736e175cb$var$tooltips[id]&&delete $8796f90736e175cb$var$tooltips[id]}),[id]),{isOpen,open:immediate=>{!immediate&&delay>0&&!closeTimeout.current?(closeOpenTooltips(),ensureTooltipEntry(),isOpen||$8796f90736e175cb$var$globalWarmUpTimeout||$8796f90736e175cb$var$globalWarmedUp?isOpen||showTooltip():$8796f90736e175cb$var$globalWarmUpTimeout=setTimeout((()=>{$8796f90736e175cb$var$globalWarmUpTimeout=null,$8796f90736e175cb$var$globalWarmedUp=!0,showTooltip()}),delay)):showTooltip()},close:hideTooltip}}},"./node_modules/ramda/es/compose.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>compose});var pipe=__webpack_require__("./node_modules/ramda/es/pipe.js"),_curry1=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js"),_isString=__webpack_require__("./node_modules/ramda/es/internal/_isString.js");const es_reverse=(0,_curry1.Z)((function reverse(list){return(0,_isString.Z)(list)?list.split("").reverse().join(""):Array.prototype.slice.call(list,0).reverse()}));function compose(){if(0===arguments.length)throw new Error("compose requires at least one argument");return pipe.Z.apply(this,es_reverse(arguments))}},"./node_modules/ramda/es/identity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _identity(x){return x}__webpack_require__.d(__webpack_exports__,{Z:()=>es_identity});const es_identity=(0,__webpack_require__("./node_modules/ramda/es/internal/_curry1.js").Z)(_identity)},"./node_modules/ramda/es/internal/_has.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _has(prop,obj){return Object.prototype.hasOwnProperty.call(obj,prop)}__webpack_require__.d(__webpack_exports__,{Z:()=>_has})},"./node_modules/ramda/es/keys.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>es_keys});var _curry1=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js"),_has=__webpack_require__("./node_modules/ramda/es/internal/_has.js"),_isArguments_toString=Object.prototype.toString;const internal_isArguments=function(){return"[object Arguments]"===_isArguments_toString.call(arguments)?function _isArguments(x){return"[object Arguments]"===_isArguments_toString.call(x)}:function _isArguments(x){return(0,_has.Z)("callee",x)}}();var hasEnumBug=!{toString:null}.propertyIsEnumerable("toString"),nonEnumerableProps=["constructor","valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],hasArgsEnumBug=function(){return arguments.propertyIsEnumerable("length")}(),contains=function contains(list,item){for(var idx=0;idx<list.length;){if(list[idx]===item)return!0;idx+=1}return!1};const es_keys="function"!=typeof Object.keys||hasArgsEnumBug?(0,_curry1.Z)((function keys(obj){if(Object(obj)!==obj)return[];var prop,nIdx,ks=[],checkArgsLength=hasArgsEnumBug&&internal_isArguments(obj);for(prop in obj)!(0,_has.Z)(prop,obj)||checkArgsLength&&"length"===prop||(ks[ks.length]=prop);if(hasEnumBug)for(nIdx=nonEnumerableProps.length-1;nIdx>=0;)prop=nonEnumerableProps[nIdx],(0,_has.Z)(prop,obj)&&!contains(ks,prop)&&(ks[ks.length]=prop),nIdx-=1;return ks})):(0,_curry1.Z)((function keys(obj){return Object(obj)!==obj?[]:Object.keys(obj)}))},"./node_modules/ramda/es/sortBy.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=(0,__webpack_require__("./node_modules/ramda/es/internal/_curry2.js").Z)((function sortBy(fn,list){return Array.prototype.slice.call(list,0).sort((function(a,b){var aa=fn(a),bb=fn(b);return aa<bb?-1:aa>bb?1:0}))}))},"./node_modules/ramda/es/type.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=(0,__webpack_require__("./node_modules/ramda/es/internal/_curry1.js").Z)((function type(val){return null===val?"Null":void 0===val?"Undefined":Object.prototype.toString.call(val).slice(8,-1)}))},"./node_modules/ramda/es/uniqBy.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>es_uniqBy});var _curry2=__webpack_require__("./node_modules/ramda/es/internal/_curry2.js");function _arrayFromIterator(iter){for(var next,list=[];!(next=iter.next()).done;)list.push(next.value);return list}function _includesWith(pred,x,list){for(var idx=0,len=list.length;idx<len;){if(pred(x,list[idx]))return!0;idx+=1}return!1}var _has=__webpack_require__("./node_modules/ramda/es/internal/_has.js");const internal_objectIs="function"==typeof Object.is?Object.is:function _objectIs(a,b){return a===b?0!==a||1/a==1/b:a!=a&&b!=b};var keys=__webpack_require__("./node_modules/ramda/es/keys.js"),type=__webpack_require__("./node_modules/ramda/es/type.js");function _uniqContentEquals(aIterator,bIterator,stackA,stackB){var a=_arrayFromIterator(aIterator);function eq(_a,_b){return _equals(_a,_b,stackA.slice(),stackB.slice())}return!_includesWith((function(b,aItem){return!_includesWith(eq,aItem,b)}),_arrayFromIterator(bIterator),a)}function _equals(a,b,stackA,stackB){if(internal_objectIs(a,b))return!0;var typeA=(0,type.Z)(a);if(typeA!==(0,type.Z)(b))return!1;if(null==a||null==b)return!1;if("function"==typeof a["fantasy-land/equals"]||"function"==typeof b["fantasy-land/equals"])return"function"==typeof a["fantasy-land/equals"]&&a["fantasy-land/equals"](b)&&"function"==typeof b["fantasy-land/equals"]&&b["fantasy-land/equals"](a);if("function"==typeof a.equals||"function"==typeof b.equals)return"function"==typeof a.equals&&a.equals(b)&&"function"==typeof b.equals&&b.equals(a);switch(typeA){case"Arguments":case"Array":case"Object":if("function"==typeof a.constructor&&"Promise"===function _functionName(f){var match=String(f).match(/^function (\w*)/);return null==match?"":match[1]}(a.constructor))return a===b;break;case"Boolean":case"Number":case"String":if(typeof a!=typeof b||!internal_objectIs(a.valueOf(),b.valueOf()))return!1;break;case"Date":if(!internal_objectIs(a.valueOf(),b.valueOf()))return!1;break;case"Error":return a.name===b.name&&a.message===b.message;case"RegExp":if(a.source!==b.source||a.global!==b.global||a.ignoreCase!==b.ignoreCase||a.multiline!==b.multiline||a.sticky!==b.sticky||a.unicode!==b.unicode)return!1}for(var idx=stackA.length-1;idx>=0;){if(stackA[idx]===a)return stackB[idx]===b;idx-=1}switch(typeA){case"Map":return a.size===b.size&&_uniqContentEquals(a.entries(),b.entries(),stackA.concat([a]),stackB.concat([b]));case"Set":return a.size===b.size&&_uniqContentEquals(a.values(),b.values(),stackA.concat([a]),stackB.concat([b]));case"Arguments":case"Array":case"Object":case"Boolean":case"Number":case"String":case"Date":case"Error":case"RegExp":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"ArrayBuffer":break;default:return!1}var keysA=(0,keys.Z)(a);if(keysA.length!==(0,keys.Z)(b).length)return!1;var extendedStackA=stackA.concat([a]),extendedStackB=stackB.concat([b]);for(idx=keysA.length-1;idx>=0;){var key=keysA[idx];if(!(0,_has.Z)(key,b)||!_equals(b[key],a[key],extendedStackA,extendedStackB))return!1;idx-=1}return!0}const es_equals=(0,_curry2.Z)((function equals(a,b){return _equals(a,b,[],[])}));function _includes(a,list){return function _indexOf(list,a,idx){var inf,item;if("function"==typeof list.indexOf)switch(typeof a){case"number":if(0===a){for(inf=1/a;idx<list.length;){if(0===(item=list[idx])&&1/item===inf)return idx;idx+=1}return-1}if(a!=a){for(;idx<list.length;){if("number"==typeof(item=list[idx])&&item!=item)return idx;idx+=1}return-1}return list.indexOf(a,idx);case"string":case"boolean":case"function":case"undefined":return list.indexOf(a,idx);case"object":if(null===a)return list.indexOf(a,idx)}for(;idx<list.length;){if(es_equals(list[idx],a))return idx;idx+=1}return-1}(list,a,0)>=0}function hasOrAdd(item,shouldAdd,set){var prevSize,type=typeof item;switch(type){case"string":case"number":return 0===item&&1/item==-1/0?!!set._items["-0"]||(shouldAdd&&(set._items["-0"]=!0),!1):null!==set._nativeSet?shouldAdd?(prevSize=set._nativeSet.size,set._nativeSet.add(item),set._nativeSet.size===prevSize):set._nativeSet.has(item):type in set._items?item in set._items[type]||(shouldAdd&&(set._items[type][item]=!0),!1):(shouldAdd&&(set._items[type]={},set._items[type][item]=!0),!1);case"boolean":if(type in set._items){var bIdx=item?1:0;return!!set._items[type][bIdx]||(shouldAdd&&(set._items[type][bIdx]=!0),!1)}return shouldAdd&&(set._items[type]=item?[!1,!0]:[!0,!1]),!1;case"function":return null!==set._nativeSet?shouldAdd?(prevSize=set._nativeSet.size,set._nativeSet.add(item),set._nativeSet.size===prevSize):set._nativeSet.has(item):type in set._items?!!_includes(item,set._items[type])||(shouldAdd&&set._items[type].push(item),!1):(shouldAdd&&(set._items[type]=[item]),!1);case"undefined":return!!set._items[type]||(shouldAdd&&(set._items[type]=!0),!1);case"object":if(null===item)return!!set._items.null||(shouldAdd&&(set._items.null=!0),!1);default:return(type=Object.prototype.toString.call(item))in set._items?!!_includes(item,set._items[type])||(shouldAdd&&set._items[type].push(item),!1):(shouldAdd&&(set._items[type]=[item]),!1)}}const internal_Set=function(){function _Set(){this._nativeSet="function"==typeof Set?new Set:null,this._items={}}return _Set.prototype.add=function(item){return!hasOrAdd(item,!0,this)},_Set.prototype.has=function(item){return hasOrAdd(item,!1,this)},_Set}();const es_uniqBy=(0,_curry2.Z)((function uniqBy(fn,list){for(var appliedItem,item,set=new internal_Set,result=[],idx=0;idx<list.length;)appliedItem=fn(item=list[idx]),set.add(appliedItem)&&result.push(item),idx+=1;return result}))}}]);