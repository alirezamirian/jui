"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[8142],{"../../node_modules/@react-aria/focus/dist/useFocusable.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>$e6afbd83fe6ebbd2$export$4c014de7c8940b4c,t:()=>$e6afbd83fe6ebbd2$export$13f3202a3e5ddd5});var _focusSafely_mjs__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/@react-aria/focus/dist/focusSafely.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useSyncRef.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocus.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useKeyboard.mjs");let $e6afbd83fe6ebbd2$var$FocusableContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);function $e6afbd83fe6ebbd2$var$FocusableProvider(props,ref){let{children,...otherProps}=props,context={...otherProps,ref:(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.B)(ref)};return react__WEBPACK_IMPORTED_MODULE_0__.createElement($e6afbd83fe6ebbd2$var$FocusableContext.Provider,{value:context},children)}let $e6afbd83fe6ebbd2$export$13f3202a3e5ddd5=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef($e6afbd83fe6ebbd2$var$FocusableProvider);function $e6afbd83fe6ebbd2$export$4c014de7c8940b4c(props,domRef){let{focusProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_3__.K)(props),{keyboardProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_4__.v)(props),interactions=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__.d)(focusProps,keyboardProps),domProps=function $e6afbd83fe6ebbd2$var$useFocusableContext(ref){let context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)($e6afbd83fe6ebbd2$var$FocusableContext)||{};(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.l)(context,ref);let{ref:_,...otherProps}=context;return otherProps}(domRef),interactionProps=props.isDisabled?{}:domProps,autoFocusRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(props.autoFocus);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{autoFocusRef.current&&domRef.current&&(0,_focusSafely_mjs__WEBPACK_IMPORTED_MODULE_6__.e)(domRef.current),autoFocusRef.current=!1}),[domRef]),{focusableProps:(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__.d)({...interactions,tabIndex:props.excludeFromTabOrder&&!props.isDisabled?-1:void 0},interactionProps)}}},"./node_modules/ramda/es/internal/_arity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _arity(n,fn){switch(n){case 0:return function(){return fn.apply(this,arguments)};case 1:return function(a0){return fn.apply(this,arguments)};case 2:return function(a0,a1){return fn.apply(this,arguments)};case 3:return function(a0,a1,a2){return fn.apply(this,arguments)};case 4:return function(a0,a1,a2,a3){return fn.apply(this,arguments)};case 5:return function(a0,a1,a2,a3,a4){return fn.apply(this,arguments)};case 6:return function(a0,a1,a2,a3,a4,a5){return fn.apply(this,arguments)};case 7:return function(a0,a1,a2,a3,a4,a5,a6){return fn.apply(this,arguments)};case 8:return function(a0,a1,a2,a3,a4,a5,a6,a7){return fn.apply(this,arguments)};case 9:return function(a0,a1,a2,a3,a4,a5,a6,a7,a8){return fn.apply(this,arguments)};case 10:return function(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9){return fn.apply(this,arguments)};default:throw new Error("First argument to _arity must be a non-negative integer no greater than ten")}}__webpack_require__.d(__webpack_exports__,{Z:()=>_arity})},"./node_modules/ramda/es/internal/_checkForMethod.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_checkForMethod});var _isArray_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/internal/_isArray.js");function _checkForMethod(methodname,fn){return function(){var length=arguments.length;if(0===length)return fn();var obj=arguments[length-1];return(0,_isArray_js__WEBPACK_IMPORTED_MODULE_0__.Z)(obj)||"function"!=typeof obj[methodname]?fn.apply(this,arguments):obj[methodname].apply(obj,Array.prototype.slice.call(arguments,0,length-1))}}},"./node_modules/ramda/es/internal/_curry1.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_curry1});var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/internal/_isPlaceholder.js");function _curry1(fn){return function f1(a){return 0===arguments.length||(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(a)?f1:fn.apply(this,arguments)}}},"./node_modules/ramda/es/internal/_curry2.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_curry2});var _curry1_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js"),_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/internal/_isPlaceholder.js");function _curry2(fn){return function f2(a,b){switch(arguments.length){case 0:return f2;case 1:return(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(a)?f2:(0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__.Z)((function(_b){return fn(a,_b)}));default:return(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(a)&&(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(b)?f2:(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(a)?(0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__.Z)((function(_a){return fn(_a,b)})):(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(b)?(0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__.Z)((function(_b){return fn(a,_b)})):fn(a,b)}}}},"./node_modules/ramda/es/internal/_curry3.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_curry3});var _curry1_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js"),_curry2_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/ramda/es/internal/_curry2.js"),_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/internal/_isPlaceholder.js");function _curry3(fn){return function f3(a,b,c){switch(arguments.length){case 0:return f3;case 1:return(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(a)?f3:(0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((function(_b,_c){return fn(a,_b,_c)}));case 2:return(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(a)&&(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(b)?f3:(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(a)?(0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((function(_a,_c){return fn(_a,b,_c)})):(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(b)?(0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((function(_b,_c){return fn(a,_b,_c)})):(0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__.Z)((function(_c){return fn(a,b,_c)}));default:return(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(a)&&(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(b)&&(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(c)?f3:(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(a)&&(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(b)?(0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((function(_a,_b){return fn(_a,_b,c)})):(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(a)&&(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(c)?(0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((function(_a,_c){return fn(_a,b,_c)})):(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(b)&&(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(c)?(0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((function(_b,_c){return fn(a,_b,_c)})):(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(a)?(0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__.Z)((function(_a){return fn(_a,b,c)})):(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(b)?(0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__.Z)((function(_b){return fn(a,_b,c)})):(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(c)?(0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__.Z)((function(_c){return fn(a,b,_c)})):fn(a,b,c)}}}},"./node_modules/ramda/es/internal/_dispatchable.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_dispatchable});var _isArray=__webpack_require__("./node_modules/ramda/es/internal/_isArray.js");function _dispatchable(methodNames,xf,fn){return function(){if(0===arguments.length)return fn();var args=Array.prototype.slice.call(arguments,0),obj=args.pop();if(!(0,_isArray.Z)(obj)){for(var idx=0;idx<methodNames.length;){if("function"==typeof obj[methodNames[idx]])return obj[methodNames[idx]].apply(obj,args);idx+=1}if(function _isTransformer(obj){return null!=obj&&"function"==typeof obj["@@transducer/step"]}(obj))return xf.apply(null,args)(obj)}return fn.apply(this,arguments)}}},"./node_modules/ramda/es/internal/_has.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _has(prop,obj){return Object.prototype.hasOwnProperty.call(obj,prop)}__webpack_require__.d(__webpack_exports__,{Z:()=>_has})},"./node_modules/ramda/es/internal/_isArray.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=Array.isArray||function _isArray(val){return null!=val&&val.length>=0&&"[object Array]"===Object.prototype.toString.call(val)}},"./node_modules/ramda/es/internal/_isArrayLike.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _curry1_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js"),_isArray_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/ramda/es/internal/_isArray.js"),_isString_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/ramda/es/internal/_isString.js");const __WEBPACK_DEFAULT_EXPORT__=(0,_curry1_js__WEBPACK_IMPORTED_MODULE_0__.Z)((function isArrayLike(x){return!!(0,_isArray_js__WEBPACK_IMPORTED_MODULE_1__.Z)(x)||!!x&&("object"==typeof x&&(!(0,_isString_js__WEBPACK_IMPORTED_MODULE_2__.Z)(x)&&(1===x.nodeType?!!x.length:0===x.length||x.length>0&&(x.hasOwnProperty(0)&&x.hasOwnProperty(x.length-1)))))}))},"./node_modules/ramda/es/internal/_isPlaceholder.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _isPlaceholder(a){return null!=a&&"object"==typeof a&&!0===a["@@functional/placeholder"]}__webpack_require__.d(__webpack_exports__,{Z:()=>_isPlaceholder})},"./node_modules/ramda/es/internal/_isString.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _isString(x){return"[object String]"===Object.prototype.toString.call(x)}__webpack_require__.d(__webpack_exports__,{Z:()=>_isString})},"./node_modules/ramda/es/internal/_reduce.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_reduce});var _isArrayLike=__webpack_require__("./node_modules/ramda/es/internal/_isArrayLike.js"),XWrap=function(){function XWrap(fn){this.f=fn}return XWrap.prototype["@@transducer/init"]=function(){throw new Error("init not implemented on XWrap")},XWrap.prototype["@@transducer/result"]=function(acc){return acc},XWrap.prototype["@@transducer/step"]=function(acc,x){return this.f(acc,x)},XWrap}();var _arity=__webpack_require__("./node_modules/ramda/es/internal/_arity.js");const es_bind=(0,__webpack_require__("./node_modules/ramda/es/internal/_curry2.js").Z)((function bind(fn,thisObj){return(0,_arity.Z)(fn.length,(function(){return fn.apply(thisObj,arguments)}))}));function _iterableReduce(xf,acc,iter){for(var step=iter.next();!step.done;){if((acc=xf["@@transducer/step"](acc,step.value))&&acc["@@transducer/reduced"]){acc=acc["@@transducer/value"];break}step=iter.next()}return xf["@@transducer/result"](acc)}function _methodReduce(xf,acc,obj,methodName){return xf["@@transducer/result"](obj[methodName](es_bind(xf["@@transducer/step"],xf),acc))}var symIterator="undefined"!=typeof Symbol?Symbol.iterator:"@@iterator";function _reduce(fn,acc,list){if("function"==typeof fn&&(fn=function _xwrap(fn){return new XWrap(fn)}(fn)),(0,_isArrayLike.Z)(list))return function _arrayReduce(xf,acc,list){for(var idx=0,len=list.length;idx<len;){if((acc=xf["@@transducer/step"](acc,list[idx]))&&acc["@@transducer/reduced"]){acc=acc["@@transducer/value"];break}idx+=1}return xf["@@transducer/result"](acc)}(fn,acc,list);if("function"==typeof list["fantasy-land/reduce"])return _methodReduce(fn,acc,list,"fantasy-land/reduce");if(null!=list[symIterator])return _iterableReduce(fn,acc,list[symIterator]());if("function"==typeof list.next)return _iterableReduce(fn,acc,list);if("function"==typeof list.reduce)return _methodReduce(fn,acc,list,"reduce");throw new TypeError("reduce: list must be array or iterable")}},"./node_modules/ramda/es/internal/_xfBase.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={init:function(){return this.xf["@@transducer/init"]()},result:function(result){return this.xf["@@transducer/result"](result)}}},"./node_modules/ramda/es/pipe.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>pipe});var _arity=__webpack_require__("./node_modules/ramda/es/internal/_arity.js");function _pipe(f,g){return function(){return g.call(this,f.apply(this,arguments))}}var _curry3=__webpack_require__("./node_modules/ramda/es/internal/_curry3.js"),_reduce=__webpack_require__("./node_modules/ramda/es/internal/_reduce.js");const es_reduce=(0,_curry3.Z)(_reduce.Z);var _checkForMethod=__webpack_require__("./node_modules/ramda/es/internal/_checkForMethod.js"),_curry1=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js");const es_slice=(0,_curry3.Z)((0,_checkForMethod.Z)("slice",(function slice(fromIndex,toIndex,list){return Array.prototype.slice.call(list,fromIndex,toIndex)})));const es_tail=(0,_curry1.Z)((0,_checkForMethod.Z)("tail",es_slice(1,1/0)));function pipe(){if(0===arguments.length)throw new Error("pipe requires at least one argument");return(0,_arity.Z)(arguments[0].length,es_reduce(_pipe,arguments[0],es_tail(arguments)))}}}]);