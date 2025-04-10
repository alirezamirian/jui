"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[2980],{"../../node_modules/@react-aria/button/dist/useButton.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>$701a24aa0da5b062$export$ea18c227d4417cc3});var _react_aria_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/utils/dist/filterDOMProps.mjs"),_react_aria_focus__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusable.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/usePress.mjs");function $701a24aa0da5b062$export$ea18c227d4417cc3(props,ref){let additionalProps,{elementType="button",isDisabled,onPress,onPressStart,onPressEnd,onPressUp,onPressChange,preventFocusOnPress,allowFocusWhenDisabled,onClick:deprecatedOnClick,href,target,rel,type="button"}=props;additionalProps="button"===elementType?{type,disabled:isDisabled}:{role:"button",tabIndex:isDisabled?void 0:0,href:"a"===elementType&&isDisabled?void 0:href,target:"a"===elementType?target:void 0,type:"input"===elementType?type:void 0,disabled:"input"===elementType?isDisabled:void 0,"aria-disabled":isDisabled&&"input"!==elementType?isDisabled:void 0,rel:"a"===elementType?rel:void 0};let{pressProps,isPressed}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_0__.d)({onPressStart,onPressEnd,onPressChange,onPress,onPressUp,isDisabled,preventFocusOnPress,ref}),{focusableProps}=(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_1__.W)(props,ref);allowFocusWhenDisabled&&(focusableProps.tabIndex=isDisabled?-1:focusableProps.tabIndex);let buttonProps=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.v)(focusableProps,pressProps,(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__.$)(props,{labelable:!0}));return{isPressed,buttonProps:(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.v)(additionalProps,buttonProps,{"aria-haspopup":props["aria-haspopup"],"aria-expanded":props["aria-expanded"],"aria-controls":props["aria-controls"],"aria-pressed":props["aria-pressed"],onClick:e=>{deprecatedOnClick&&(deprecatedOnClick(e),console.warn("onClick is deprecated, please use onPress"))}})}}},"../../node_modules/@react-aria/focus/dist/useFocusable.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>$e6afbd83fe6ebbd2$export$13f3202a3e5ddd5,W:()=>$e6afbd83fe6ebbd2$export$4c014de7c8940b4c});var focusSafely=__webpack_require__("../../node_modules/@react-aria/focus/dist/focusSafely.mjs"),useLayoutEffect=__webpack_require__("../../node_modules/@react-aria/focus/node_modules/@react-aria/utils/dist/useLayoutEffect.mjs");function $e7801be82b4b2a53$export$4debdb1a3f0fa79e(context,ref){(0,useLayoutEffect.N)((()=>{if(context&&context.ref&&ref)return context.ref.current=ref.current,()=>{context.ref&&(context.ref.current=null)}}))}var react=__webpack_require__("../../node_modules/react/index.js");function $df56164dff5785e2$export$4338b53315abf666(forwardedRef){const objRef=(0,react.useRef)(null);return(0,react.useMemo)((()=>({get current(){return objRef.current},set current(value){objRef.current=value,"function"==typeof forwardedRef?forwardedRef(value):forwardedRef&&(forwardedRef.current=value)}})),[forwardedRef])}var mergeProps=__webpack_require__("../../node_modules/@react-aria/focus/node_modules/@react-aria/utils/dist/mergeProps.mjs"),useFocus=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocus.mjs"),useKeyboard=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useKeyboard.mjs");let $e6afbd83fe6ebbd2$var$FocusableContext=react.createContext(null);function $e6afbd83fe6ebbd2$var$useFocusableContext(ref){let context=(0,react.useContext)($e6afbd83fe6ebbd2$var$FocusableContext)||{};$e7801be82b4b2a53$export$4debdb1a3f0fa79e(context,ref);let{ref:_,...otherProps}=context;return otherProps}function $e6afbd83fe6ebbd2$var$FocusableProvider(props,ref){let{children,...otherProps}=props,context={...otherProps,ref:$df56164dff5785e2$export$4338b53315abf666(ref)};return react.createElement($e6afbd83fe6ebbd2$var$FocusableContext.Provider,{value:context},children)}let $e6afbd83fe6ebbd2$export$13f3202a3e5ddd5=react.forwardRef($e6afbd83fe6ebbd2$var$FocusableProvider);function $e6afbd83fe6ebbd2$export$4c014de7c8940b4c(props,domRef){let{focusProps}=(0,useFocus.i)(props),{keyboardProps}=(0,useKeyboard.d)(props),interactions=(0,mergeProps.v)(focusProps,keyboardProps),domProps=$e6afbd83fe6ebbd2$var$useFocusableContext(domRef),interactionProps=props.isDisabled?{}:domProps,autoFocusRef=(0,react.useRef)(props.autoFocus);return(0,react.useEffect)((()=>{autoFocusRef.current&&domRef.current&&(0,focusSafely.l)(domRef.current),autoFocusRef.current=!1}),[domRef]),{focusableProps:(0,mergeProps.v)({...interactions,tabIndex:props.excludeFromTabOrder&&!props.isDisabled?-1:void 0},interactionProps)}}},"../../node_modules/@react-aria/focus/node_modules/@react-aria/utils/dist/mergeProps.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function $ff5963eb1fccf552$export$e08e3b67e392101e(...callbacks){return(...args)=>{for(let callback of callbacks)"function"==typeof callback&&callback(...args)}}__webpack_require__.d(__webpack_exports__,{v:()=>$3ef42575df84b30b$export$9d1611c77c2fe928});__webpack_require__("../../node_modules/react/index.js");Boolean("undefined"!=typeof window&&window.document&&window.document.createElement);let $bdb11010cef70236$var$idsUpdaterMap=new Map;function $bdb11010cef70236$export$cd8c9cb68f842629(idA,idB){if(idA===idB)return idA;let setIdsA=$bdb11010cef70236$var$idsUpdaterMap.get(idA);if(setIdsA)return setIdsA.forEach((fn=>fn(idB))),idB;let setIdsB=$bdb11010cef70236$var$idsUpdaterMap.get(idB);return setIdsB?(setIdsB.forEach((fn=>fn(idA))),idA):idB}var clsx=__webpack_require__("../../node_modules/@react-aria/focus/node_modules/clsx/dist/clsx.mjs");function $3ef42575df84b30b$export$9d1611c77c2fe928(...args){let result={...args[0]};for(let i=1;i<args.length;i++){let props=args[i];for(let key in props){let a=result[key],b=props[key];"function"==typeof a&&"function"==typeof b&&"o"===key[0]&&"n"===key[1]&&key.charCodeAt(2)>=65&&key.charCodeAt(2)<=90?result[key]=$ff5963eb1fccf552$export$e08e3b67e392101e(a,b):"className"!==key&&"UNSAFE_className"!==key||"string"!=typeof a||"string"!=typeof b?"id"===key&&a&&b?result.id=$bdb11010cef70236$export$cd8c9cb68f842629(a,b):result[key]=void 0!==b?b:a:result[key]=(0,clsx.A)(a,b)}}return result}},"../../node_modules/@react-aria/focus/node_modules/clsx/dist/clsx.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f)}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}},"../../node_modules/@react-aria/interactions/dist/useFocus.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>$a1ea59d68270f0dd$export$f8168d8dd8fd66e6});var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/utils.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/interactions/node_modules/@react-aria/utils/dist/domHelpers.mjs");function $a1ea59d68270f0dd$export$f8168d8dd8fd66e6(props){let{isDisabled,onFocus:onFocusProp,onBlur:onBlurProp,onFocusChange}=props;const onBlur=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>{if(e.target===e.currentTarget)return onBlurProp&&onBlurProp(e),onFocusChange&&onFocusChange(!1),!0}),[onBlurProp,onFocusChange]),onSyntheticFocus=(0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.y)(onBlur),onFocus=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>{const ownerDocument=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.T)(e.target);e.target===e.currentTarget&&ownerDocument.activeElement===e.target&&(onFocusProp&&onFocusProp(e),onFocusChange&&onFocusChange(!0),onSyntheticFocus(e))}),[onFocusChange,onFocusProp,onSyntheticFocus]);return{focusProps:{onFocus:!isDisabled&&(onFocusProp||onFocusChange||onBlurProp)?onFocus:void 0,onBlur:isDisabled||!onBlurProp&&!onFocusChange?void 0:onBlur}}}},"./node_modules/ramda/es/fromPairs.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=(0,__webpack_require__("./node_modules/ramda/es/internal/_curry1.js").A)((function fromPairs(pairs){for(var result={},idx=0;idx<pairs.length;)result[pairs[idx][0]]=pairs[idx][1],idx+=1;return result}))},"./node_modules/ramda/es/internal/_arity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _arity(n,fn){switch(n){case 0:return function(){return fn.apply(this,arguments)};case 1:return function(a0){return fn.apply(this,arguments)};case 2:return function(a0,a1){return fn.apply(this,arguments)};case 3:return function(a0,a1,a2){return fn.apply(this,arguments)};case 4:return function(a0,a1,a2,a3){return fn.apply(this,arguments)};case 5:return function(a0,a1,a2,a3,a4){return fn.apply(this,arguments)};case 6:return function(a0,a1,a2,a3,a4,a5){return fn.apply(this,arguments)};case 7:return function(a0,a1,a2,a3,a4,a5,a6){return fn.apply(this,arguments)};case 8:return function(a0,a1,a2,a3,a4,a5,a6,a7){return fn.apply(this,arguments)};case 9:return function(a0,a1,a2,a3,a4,a5,a6,a7,a8){return fn.apply(this,arguments)};case 10:return function(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9){return fn.apply(this,arguments)};default:throw new Error("First argument to _arity must be a non-negative integer no greater than ten")}}__webpack_require__.d(__webpack_exports__,{A:()=>_arity})},"./node_modules/ramda/es/internal/_checkForMethod.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>_checkForMethod});var _isArray_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/internal/_isArray.js");function _checkForMethod(methodname,fn){return function(){var length=arguments.length;if(0===length)return fn();var obj=arguments[length-1];return(0,_isArray_js__WEBPACK_IMPORTED_MODULE_0__.A)(obj)||"function"!=typeof obj[methodname]?fn.apply(this,arguments):obj[methodname].apply(obj,Array.prototype.slice.call(arguments,0,length-1))}}},"./node_modules/ramda/es/internal/_curry1.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>_curry1});var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/internal/_isPlaceholder.js");function _curry1(fn){return function f1(a){return 0===arguments.length||(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(a)?f1:fn.apply(this,arguments)}}},"./node_modules/ramda/es/internal/_curry2.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>_curry2});var _curry1_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js"),_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/internal/_isPlaceholder.js");function _curry2(fn){return function f2(a,b){switch(arguments.length){case 0:return f2;case 1:return(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(a)?f2:(0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__.A)((function(_b){return fn(a,_b)}));default:return(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(a)&&(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(b)?f2:(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(a)?(0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__.A)((function(_a){return fn(_a,b)})):(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(b)?(0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__.A)((function(_b){return fn(a,_b)})):fn(a,b)}}}},"./node_modules/ramda/es/internal/_isArray.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=Array.isArray||function _isArray(val){return null!=val&&val.length>=0&&"[object Array]"===Object.prototype.toString.call(val)}},"./node_modules/ramda/es/internal/_isArrayLike.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _curry1_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js"),_isArray_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/ramda/es/internal/_isArray.js"),_isString_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/ramda/es/internal/_isString.js");const __WEBPACK_DEFAULT_EXPORT__=(0,_curry1_js__WEBPACK_IMPORTED_MODULE_0__.A)((function isArrayLike(x){return!!(0,_isArray_js__WEBPACK_IMPORTED_MODULE_1__.A)(x)||!!x&&("object"==typeof x&&(!(0,_isString_js__WEBPACK_IMPORTED_MODULE_2__.A)(x)&&(1===x.nodeType?!!x.length:0===x.length||x.length>0&&(x.hasOwnProperty(0)&&x.hasOwnProperty(x.length-1)))))}))},"./node_modules/ramda/es/internal/_isPlaceholder.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _isPlaceholder(a){return null!=a&&"object"==typeof a&&!0===a["@@functional/placeholder"]}__webpack_require__.d(__webpack_exports__,{A:()=>_isPlaceholder})},"./node_modules/ramda/es/internal/_isString.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _isString(x){return"[object String]"===Object.prototype.toString.call(x)}__webpack_require__.d(__webpack_exports__,{A:()=>_isString})},"./node_modules/ramda/es/internal/_reduce.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>_reduce});var _isArrayLike=__webpack_require__("./node_modules/ramda/es/internal/_isArrayLike.js"),XWrap=function(){function XWrap(fn){this.f=fn}return XWrap.prototype["@@transducer/init"]=function(){throw new Error("init not implemented on XWrap")},XWrap.prototype["@@transducer/result"]=function(acc){return acc},XWrap.prototype["@@transducer/step"]=function(acc,x){return this.f(acc,x)},XWrap}();var _arity=__webpack_require__("./node_modules/ramda/es/internal/_arity.js");const es_bind=(0,__webpack_require__("./node_modules/ramda/es/internal/_curry2.js").A)((function bind(fn,thisObj){return(0,_arity.A)(fn.length,(function(){return fn.apply(thisObj,arguments)}))}));function _iterableReduce(xf,acc,iter){for(var step=iter.next();!step.done;){if((acc=xf["@@transducer/step"](acc,step.value))&&acc["@@transducer/reduced"]){acc=acc["@@transducer/value"];break}step=iter.next()}return xf["@@transducer/result"](acc)}function _methodReduce(xf,acc,obj,methodName){return xf["@@transducer/result"](obj[methodName](es_bind(xf["@@transducer/step"],xf),acc))}var symIterator="undefined"!=typeof Symbol?Symbol.iterator:"@@iterator";function _reduce(fn,acc,list){if("function"==typeof fn&&(fn=function _xwrap(fn){return new XWrap(fn)}(fn)),(0,_isArrayLike.A)(list))return function _arrayReduce(xf,acc,list){for(var idx=0,len=list.length;idx<len;){if((acc=xf["@@transducer/step"](acc,list[idx]))&&acc["@@transducer/reduced"]){acc=acc["@@transducer/value"];break}idx+=1}return xf["@@transducer/result"](acc)}(fn,acc,list);if("function"==typeof list["fantasy-land/reduce"])return _methodReduce(fn,acc,list,"fantasy-land/reduce");if(null!=list[symIterator])return _iterableReduce(fn,acc,list[symIterator]());if("function"==typeof list.next)return _iterableReduce(fn,acc,list);if("function"==typeof list.reduce)return _methodReduce(fn,acc,list,"reduce");throw new TypeError("reduce: list must be array or iterable")}},"./node_modules/ramda/es/sortBy.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=(0,__webpack_require__("./node_modules/ramda/es/internal/_curry2.js").A)((function sortBy(fn,list){return Array.prototype.slice.call(list,0).sort((function(a,b){var aa=fn(a),bb=fn(b);return aa<bb?-1:aa>bb?1:0}))}))}}]);