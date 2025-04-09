"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[2402,4955],{"../../node_modules/@react-aria/button/dist/useButton.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>$701a24aa0da5b062$export$ea18c227d4417cc3});var _react_aria_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/utils/dist/filterDOMProps.mjs"),_react_aria_focus__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusable.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/usePress.mjs");function $701a24aa0da5b062$export$ea18c227d4417cc3(props,ref){let additionalProps,{elementType="button",isDisabled,onPress,onPressStart,onPressEnd,onPressUp,onPressChange,preventFocusOnPress,allowFocusWhenDisabled,onClick:deprecatedOnClick,href,target,rel,type="button"}=props;additionalProps="button"===elementType?{type,disabled:isDisabled}:{role:"button",tabIndex:isDisabled?void 0:0,href:"a"!==elementType||isDisabled?void 0:href,target:"a"===elementType?target:void 0,type:"input"===elementType?type:void 0,disabled:"input"===elementType?isDisabled:void 0,"aria-disabled":isDisabled&&"input"!==elementType?isDisabled:void 0,rel:"a"===elementType?rel:void 0};let{pressProps,isPressed}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_0__.d)({onPressStart,onPressEnd,onPressChange,onPress,onPressUp,isDisabled,preventFocusOnPress,ref}),{focusableProps}=(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_1__.W)(props,ref);allowFocusWhenDisabled&&(focusableProps.tabIndex=isDisabled?-1:focusableProps.tabIndex);let buttonProps=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.v)(focusableProps,pressProps,(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__.$)(props,{labelable:!0}));return{isPressed,buttonProps:(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.v)(additionalProps,buttonProps,{"aria-haspopup":props["aria-haspopup"],"aria-expanded":props["aria-expanded"],"aria-controls":props["aria-controls"],"aria-pressed":props["aria-pressed"],onClick:e=>{deprecatedOnClick&&(deprecatedOnClick(e),console.warn("onClick is deprecated, please use onPress"))}})}}},"../../node_modules/@react-aria/focus/dist/FocusRing.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{v:()=>$907718708eab68af$export$1a38b4ad7f578e1d});var useFocusRing=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusRing.mjs");function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f)}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}const dist_clsx=function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n};var mergeProps=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),react=__webpack_require__("../../node_modules/react/index.js");function $907718708eab68af$export$1a38b4ad7f578e1d(props){let{children,focusClass,focusRingClass}=props,{isFocused,isFocusVisible,focusProps}=(0,useFocusRing.o)(props),child=react.Children.only(children);return react.cloneElement(child,(0,mergeProps.v)(child.props,{...focusProps,className:dist_clsx({[focusClass||""]:isFocused,[focusRingClass||""]:isFocusVisible})}))}},"../../node_modules/@react-aria/focus/dist/useFocusRing.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{o:()=>$f7dceffc5ad7768b$export$4e328f61c538687f});var _react_aria_interactions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocusVisible.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocus.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocusWithin.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function $f7dceffc5ad7768b$export$4e328f61c538687f(props={}){let{autoFocus=!1,isTextInput,within}=props,state=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({isFocused:!1,isFocusVisible:autoFocus||(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_1__.pP)()}),[isFocused,setFocused]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[isFocusVisibleState,setFocusVisible]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)((()=>state.current.isFocused&&state.current.isFocusVisible)),updateState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>setFocusVisible(state.current.isFocused&&state.current.isFocusVisible)),[]),onFocusChange=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((isFocused=>{state.current.isFocused=isFocused,setFocused(isFocused),updateState()}),[updateState]);(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_1__.K7)((isFocusVisible=>{state.current.isFocusVisible=isFocusVisible,updateState()}),[],{isTextInput});let{focusProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__.i)({isDisabled:within,onFocusChange}),{focusWithinProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_3__.R)({isDisabled:!within,onFocusWithinChange:onFocusChange});return{isFocused,isFocusVisible:isFocusVisibleState,focusProps:within?focusWithinProps:focusProps}}},"../../node_modules/@react-aria/focus/dist/useFocusable.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>$e6afbd83fe6ebbd2$export$13f3202a3e5ddd5,W:()=>$e6afbd83fe6ebbd2$export$4c014de7c8940b4c});var _focusSafely_mjs__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/@react-aria/focus/dist/focusSafely.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useSyncRef.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocus.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useKeyboard.mjs");let $e6afbd83fe6ebbd2$var$FocusableContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);const $e6afbd83fe6ebbd2$export$13f3202a3e5ddd5=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((function FocusableProvider(props,ref){let{children,...otherProps}=props,context={...otherProps,ref:(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.U)(ref)};return react__WEBPACK_IMPORTED_MODULE_0__.createElement($e6afbd83fe6ebbd2$var$FocusableContext.Provider,{value:context},children)}));function $e6afbd83fe6ebbd2$export$4c014de7c8940b4c(props,domRef){let{focusProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_3__.i)(props),{keyboardProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_4__.d)(props),interactions=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__.v)(focusProps,keyboardProps),domProps=function $e6afbd83fe6ebbd2$var$useFocusableContext(ref){let context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)($e6afbd83fe6ebbd2$var$FocusableContext)||{};(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.w)(context,ref);let{ref:_,...otherProps}=context;return otherProps}(domRef),interactionProps=props.isDisabled?{}:domProps,autoFocusRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(props.autoFocus);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{autoFocusRef.current&&domRef.current&&(0,_focusSafely_mjs__WEBPACK_IMPORTED_MODULE_6__.l)(domRef.current),autoFocusRef.current=!1}),[domRef]),{focusableProps:(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__.v)({...interactions,tabIndex:props.excludeFromTabOrder&&!props.isDisabled?-1:void 0},interactionProps)}}},"../../node_modules/@react-aria/i18n/dist/context.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Y:()=>$18f2051aff69b9bf$export$43bb16f9c6d9e3f7});const $148a7a147e38ea7f$var$RTL_SCRIPTS=new Set(["Arab","Syrc","Samr","Mand","Thaa","Mend","Nkoo","Adlm","Rohg","Hebr"]),$148a7a147e38ea7f$var$RTL_LANGS=new Set(["ae","ar","arc","bcc","bqi","ckb","dv","fa","glk","he","ku","mzn","nqo","pnb","ps","sd","ug","ur","yi"]);function utils_$148a7a147e38ea7f$export$702d680b21cbd764(localeString){if(Intl.Locale){let locale=new Intl.Locale(localeString).maximize(),textInfo="function"==typeof locale.getTextInfo?locale.getTextInfo():locale.textInfo;if(textInfo)return"rtl"===textInfo.direction;if(locale.script)return $148a7a147e38ea7f$var$RTL_SCRIPTS.has(locale.script)}let lang=localeString.split("-")[0];return $148a7a147e38ea7f$var$RTL_LANGS.has(lang)}var react=__webpack_require__("../../node_modules/react/index.js"),SSRProvider=__webpack_require__("../../node_modules/@react-aria/ssr/dist/SSRProvider.mjs");const $1e5a04cdaf7d1af8$var$localeSymbol=Symbol.for("react-aria.i18n.locale");function $1e5a04cdaf7d1af8$export$f09106e7c6677ec5(){let locale="undefined"!=typeof window&&window[$1e5a04cdaf7d1af8$var$localeSymbol]||"undefined"!=typeof navigator&&(navigator.language||navigator.userLanguage)||"en-US";try{Intl.DateTimeFormat.supportedLocalesOf([locale])}catch{locale="en-US"}return{locale,direction:utils_$148a7a147e38ea7f$export$702d680b21cbd764(locale)?"rtl":"ltr"}}let $1e5a04cdaf7d1af8$var$currentLocale=$1e5a04cdaf7d1af8$export$f09106e7c6677ec5(),$1e5a04cdaf7d1af8$var$listeners=new Set;function $1e5a04cdaf7d1af8$var$updateLocale(){$1e5a04cdaf7d1af8$var$currentLocale=$1e5a04cdaf7d1af8$export$f09106e7c6677ec5();for(let listener of $1e5a04cdaf7d1af8$var$listeners)listener($1e5a04cdaf7d1af8$var$currentLocale)}function useDefaultLocale_$1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a(){let isSSR=(0,SSRProvider.wR)(),[defaultLocale,setDefaultLocale]=(0,react.useState)($1e5a04cdaf7d1af8$var$currentLocale);return(0,react.useEffect)((()=>(0===$1e5a04cdaf7d1af8$var$listeners.size&&window.addEventListener("languagechange",$1e5a04cdaf7d1af8$var$updateLocale),$1e5a04cdaf7d1af8$var$listeners.add(setDefaultLocale),()=>{$1e5a04cdaf7d1af8$var$listeners.delete(setDefaultLocale),0===$1e5a04cdaf7d1af8$var$listeners.size&&window.removeEventListener("languagechange",$1e5a04cdaf7d1af8$var$updateLocale)})),[]),isSSR?{locale:"en-US",direction:"ltr"}:defaultLocale}const $18f2051aff69b9bf$var$I18nContext=react.createContext(null);function $18f2051aff69b9bf$export$43bb16f9c6d9e3f7(){let defaultLocale=useDefaultLocale_$1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a();return(0,react.useContext)($18f2051aff69b9bf$var$I18nContext)||defaultLocale}},"../../node_modules/@react-aria/interactions/dist/useFocusWithin.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{R:()=>$9ab94262bd0047c7$export$420e68273165f4ec});var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/utils.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function $9ab94262bd0047c7$export$420e68273165f4ec(props){let{isDisabled,onBlurWithin,onFocusWithin,onFocusWithinChange}=props,state=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({isFocusWithin:!1}),onBlur=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>{state.current.isFocusWithin&&!e.currentTarget.contains(e.relatedTarget)&&(state.current.isFocusWithin=!1,onBlurWithin&&onBlurWithin(e),onFocusWithinChange&&onFocusWithinChange(!1))}),[onBlurWithin,onFocusWithinChange,state]),onSyntheticFocus=(0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.y)(onBlur),onFocus=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>{state.current.isFocusWithin||document.activeElement!==e.target||(onFocusWithin&&onFocusWithin(e),onFocusWithinChange&&onFocusWithinChange(!0),state.current.isFocusWithin=!0,onSyntheticFocus(e))}),[onFocusWithin,onFocusWithinChange,onSyntheticFocus]);return isDisabled?{focusWithinProps:{onFocus:void 0,onBlur:void 0}}:{focusWithinProps:{onFocus,onBlur}}}},"../../node_modules/@react-stately/overlays/dist/useOverlayTriggerState.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>$fc909762b330b746$export$61c6a8c84e605fb6});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_stately_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-stately/utils/dist/useControlledState.mjs");function $fc909762b330b746$export$61c6a8c84e605fb6(props){let[isOpen,setOpen]=(0,_react_stately_utils__WEBPACK_IMPORTED_MODULE_1__.P)(props.isOpen,props.defaultOpen||!1,props.onOpenChange);const open=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setOpen(!0)}),[setOpen]),close=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setOpen(!1)}),[setOpen]),toggle=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setOpen(!isOpen)}),[setOpen,isOpen]);return{isOpen,setOpen,open,close,toggle}}},"../../node_modules/@react-stately/utils/dist/useControlledState.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{P:()=>$458b0a5536c1a7cf$export$40bfa8c7b0832715});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function $458b0a5536c1a7cf$export$40bfa8c7b0832715(value,defaultValue,onChange){let[stateValue,setStateValue]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value||defaultValue),isControlledRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(void 0!==value),isControlled=void 0!==value;(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{let wasControlled=isControlledRef.current;wasControlled!==isControlled&&console.warn(`WARN: A component changed from ${wasControlled?"controlled":"uncontrolled"} to ${isControlled?"controlled":"uncontrolled"}.`),isControlledRef.current=isControlled}),[isControlled]);let currentValue=isControlled?value:stateValue,setValue=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(((value,...args)=>{let onChangeCaller=(value,...onChangeArgs)=>{onChange&&(Object.is(currentValue,value)||onChange(value,...onChangeArgs)),isControlled||(currentValue=value)};if("function"==typeof value){console.warn("We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320"),setStateValue(((oldValue,...functionArgs)=>{let interceptedValue=value(isControlled?currentValue:oldValue,...functionArgs);return onChangeCaller(interceptedValue,...args),isControlled?oldValue:interceptedValue}))}else isControlled||setStateValue(value),onChangeCaller(value,...args)}),[isControlled,currentValue,onChange]);return[currentValue,setValue]}},"./node_modules/ramda/es/internal/_arity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _arity(n,fn){switch(n){case 0:return function(){return fn.apply(this,arguments)};case 1:return function(a0){return fn.apply(this,arguments)};case 2:return function(a0,a1){return fn.apply(this,arguments)};case 3:return function(a0,a1,a2){return fn.apply(this,arguments)};case 4:return function(a0,a1,a2,a3){return fn.apply(this,arguments)};case 5:return function(a0,a1,a2,a3,a4){return fn.apply(this,arguments)};case 6:return function(a0,a1,a2,a3,a4,a5){return fn.apply(this,arguments)};case 7:return function(a0,a1,a2,a3,a4,a5,a6){return fn.apply(this,arguments)};case 8:return function(a0,a1,a2,a3,a4,a5,a6,a7){return fn.apply(this,arguments)};case 9:return function(a0,a1,a2,a3,a4,a5,a6,a7,a8){return fn.apply(this,arguments)};case 10:return function(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9){return fn.apply(this,arguments)};default:throw new Error("First argument to _arity must be a non-negative integer no greater than ten")}}__webpack_require__.d(__webpack_exports__,{A:()=>_arity})},"./node_modules/ramda/es/internal/_checkForMethod.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>_checkForMethod});var _isArray_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/internal/_isArray.js");function _checkForMethod(methodname,fn){return function(){var length=arguments.length;if(0===length)return fn();var obj=arguments[length-1];return(0,_isArray_js__WEBPACK_IMPORTED_MODULE_0__.A)(obj)||"function"!=typeof obj[methodname]?fn.apply(this,arguments):obj[methodname].apply(obj,Array.prototype.slice.call(arguments,0,length-1))}}},"./node_modules/ramda/es/internal/_curry1.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>_curry1});var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/internal/_isPlaceholder.js");function _curry1(fn){return function f1(a){return 0===arguments.length||(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(a)?f1:fn.apply(this,arguments)}}},"./node_modules/ramda/es/internal/_curry2.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>_curry2});var _curry1_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js"),_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/internal/_isPlaceholder.js");function _curry2(fn){return function f2(a,b){switch(arguments.length){case 0:return f2;case 1:return(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(a)?f2:(0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__.A)((function(_b){return fn(a,_b)}));default:return(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(a)&&(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(b)?f2:(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(a)?(0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__.A)((function(_a){return fn(_a,b)})):(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.A)(b)?(0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__.A)((function(_b){return fn(a,_b)})):fn(a,b)}}}},"./node_modules/ramda/es/internal/_has.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _has(prop,obj){return Object.prototype.hasOwnProperty.call(obj,prop)}__webpack_require__.d(__webpack_exports__,{A:()=>_has})},"./node_modules/ramda/es/internal/_isArray.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=Array.isArray||function _isArray(val){return null!=val&&val.length>=0&&"[object Array]"===Object.prototype.toString.call(val)}},"./node_modules/ramda/es/internal/_isArrayLike.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _curry1_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js"),_isArray_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/ramda/es/internal/_isArray.js"),_isString_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/ramda/es/internal/_isString.js");const __WEBPACK_DEFAULT_EXPORT__=(0,_curry1_js__WEBPACK_IMPORTED_MODULE_0__.A)((function isArrayLike(x){return!!(0,_isArray_js__WEBPACK_IMPORTED_MODULE_1__.A)(x)||!!x&&("object"==typeof x&&(!(0,_isString_js__WEBPACK_IMPORTED_MODULE_2__.A)(x)&&(1===x.nodeType?!!x.length:0===x.length||x.length>0&&(x.hasOwnProperty(0)&&x.hasOwnProperty(x.length-1)))))}))},"./node_modules/ramda/es/internal/_isPlaceholder.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _isPlaceholder(a){return null!=a&&"object"==typeof a&&!0===a["@@functional/placeholder"]}__webpack_require__.d(__webpack_exports__,{A:()=>_isPlaceholder})},"./node_modules/ramda/es/internal/_isString.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _isString(x){return"[object String]"===Object.prototype.toString.call(x)}__webpack_require__.d(__webpack_exports__,{A:()=>_isString})},"./node_modules/ramda/es/internal/_reduce.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>_reduce});var _isArrayLike=__webpack_require__("./node_modules/ramda/es/internal/_isArrayLike.js"),XWrap=function(){function XWrap(fn){this.f=fn}return XWrap.prototype["@@transducer/init"]=function(){throw new Error("init not implemented on XWrap")},XWrap.prototype["@@transducer/result"]=function(acc){return acc},XWrap.prototype["@@transducer/step"]=function(acc,x){return this.f(acc,x)},XWrap}();var _arity=__webpack_require__("./node_modules/ramda/es/internal/_arity.js");const es_bind=(0,__webpack_require__("./node_modules/ramda/es/internal/_curry2.js").A)((function bind(fn,thisObj){return(0,_arity.A)(fn.length,(function(){return fn.apply(thisObj,arguments)}))}));function _iterableReduce(xf,acc,iter){for(var step=iter.next();!step.done;){if((acc=xf["@@transducer/step"](acc,step.value))&&acc["@@transducer/reduced"]){acc=acc["@@transducer/value"];break}step=iter.next()}return xf["@@transducer/result"](acc)}function _methodReduce(xf,acc,obj,methodName){return xf["@@transducer/result"](obj[methodName](es_bind(xf["@@transducer/step"],xf),acc))}var symIterator="undefined"!=typeof Symbol?Symbol.iterator:"@@iterator";function _reduce(fn,acc,list){if("function"==typeof fn&&(fn=function _xwrap(fn){return new XWrap(fn)}(fn)),(0,_isArrayLike.A)(list))return function _arrayReduce(xf,acc,list){for(var idx=0,len=list.length;idx<len;){if((acc=xf["@@transducer/step"](acc,list[idx]))&&acc["@@transducer/reduced"]){acc=acc["@@transducer/value"];break}idx+=1}return xf["@@transducer/result"](acc)}(fn,acc,list);if("function"==typeof list["fantasy-land/reduce"])return _methodReduce(fn,acc,list,"fantasy-land/reduce");if(null!=list[symIterator])return _iterableReduce(fn,acc,list[symIterator]());if("function"==typeof list.next)return _iterableReduce(fn,acc,list);if("function"==typeof list.reduce)return _methodReduce(fn,acc,list,"reduce");throw new TypeError("reduce: list must be array or iterable")}},"./node_modules/ramda/es/keys.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>es_keys});var _curry1=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js"),_has=__webpack_require__("./node_modules/ramda/es/internal/_has.js"),_isArguments_toString=Object.prototype.toString;const internal_isArguments=function(){return"[object Arguments]"===_isArguments_toString.call(arguments)?function _isArguments(x){return"[object Arguments]"===_isArguments_toString.call(x)}:function _isArguments(x){return(0,_has.A)("callee",x)}}();var hasEnumBug=!{toString:null}.propertyIsEnumerable("toString"),nonEnumerableProps=["constructor","valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],hasArgsEnumBug=function(){return arguments.propertyIsEnumerable("length")}(),contains=function contains(list,item){for(var idx=0;idx<list.length;){if(list[idx]===item)return!0;idx+=1}return!1};const es_keys="function"!=typeof Object.keys||hasArgsEnumBug?(0,_curry1.A)((function keys(obj){if(Object(obj)!==obj)return[];var prop,nIdx,ks=[],checkArgsLength=hasArgsEnumBug&&internal_isArguments(obj);for(prop in obj)!(0,_has.A)(prop,obj)||checkArgsLength&&"length"===prop||(ks[ks.length]=prop);if(hasEnumBug)for(nIdx=nonEnumerableProps.length-1;nIdx>=0;)prop=nonEnumerableProps[nIdx],(0,_has.A)(prop,obj)&&!contains(ks,prop)&&(ks[ks.length]=prop),nIdx-=1;return ks})):(0,_curry1.A)((function keys(obj){return Object(obj)!==obj?[]:Object.keys(obj)}))},"./node_modules/ramda/es/sortBy.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=(0,__webpack_require__("./node_modules/ramda/es/internal/_curry2.js").A)((function sortBy(fn,list){return Array.prototype.slice.call(list,0).sort((function(a,b){var aa=fn(a),bb=fn(b);return aa<bb?-1:aa>bb?1:0}))}))},"./node_modules/ramda/es/type.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=(0,__webpack_require__("./node_modules/ramda/es/internal/_curry1.js").A)((function type(val){return null===val?"Null":void 0===val?"Undefined":Object.prototype.toString.call(val).slice(8,-1)}))},"./node_modules/ramda/es/uniqBy.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>es_uniqBy});var _curry2=__webpack_require__("./node_modules/ramda/es/internal/_curry2.js");function _arrayFromIterator(iter){for(var next,list=[];!(next=iter.next()).done;)list.push(next.value);return list}function _includesWith(pred,x,list){for(var idx=0,len=list.length;idx<len;){if(pred(x,list[idx]))return!0;idx+=1}return!1}var _has=__webpack_require__("./node_modules/ramda/es/internal/_has.js");const internal_objectIs="function"==typeof Object.is?Object.is:function _objectIs(a,b){return a===b?0!==a||1/a==1/b:a!=a&&b!=b};var keys=__webpack_require__("./node_modules/ramda/es/keys.js"),type=__webpack_require__("./node_modules/ramda/es/type.js");function _uniqContentEquals(aIterator,bIterator,stackA,stackB){var a=_arrayFromIterator(aIterator);function eq(_a,_b){return _equals(_a,_b,stackA.slice(),stackB.slice())}return!_includesWith((function(b,aItem){return!_includesWith(eq,aItem,b)}),_arrayFromIterator(bIterator),a)}function _equals(a,b,stackA,stackB){if(internal_objectIs(a,b))return!0;var typeA=(0,type.A)(a);if(typeA!==(0,type.A)(b))return!1;if(null==a||null==b)return!1;if("function"==typeof a["fantasy-land/equals"]||"function"==typeof b["fantasy-land/equals"])return"function"==typeof a["fantasy-land/equals"]&&a["fantasy-land/equals"](b)&&"function"==typeof b["fantasy-land/equals"]&&b["fantasy-land/equals"](a);if("function"==typeof a.equals||"function"==typeof b.equals)return"function"==typeof a.equals&&a.equals(b)&&"function"==typeof b.equals&&b.equals(a);switch(typeA){case"Arguments":case"Array":case"Object":if("function"==typeof a.constructor&&"Promise"===function _functionName(f){var match=String(f).match(/^function (\w*)/);return null==match?"":match[1]}(a.constructor))return a===b;break;case"Boolean":case"Number":case"String":if(typeof a!=typeof b||!internal_objectIs(a.valueOf(),b.valueOf()))return!1;break;case"Date":if(!internal_objectIs(a.valueOf(),b.valueOf()))return!1;break;case"Error":return a.name===b.name&&a.message===b.message;case"RegExp":if(a.source!==b.source||a.global!==b.global||a.ignoreCase!==b.ignoreCase||a.multiline!==b.multiline||a.sticky!==b.sticky||a.unicode!==b.unicode)return!1}for(var idx=stackA.length-1;idx>=0;){if(stackA[idx]===a)return stackB[idx]===b;idx-=1}switch(typeA){case"Map":return a.size===b.size&&_uniqContentEquals(a.entries(),b.entries(),stackA.concat([a]),stackB.concat([b]));case"Set":return a.size===b.size&&_uniqContentEquals(a.values(),b.values(),stackA.concat([a]),stackB.concat([b]));case"Arguments":case"Array":case"Object":case"Boolean":case"Number":case"String":case"Date":case"Error":case"RegExp":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"ArrayBuffer":break;default:return!1}var keysA=(0,keys.A)(a);if(keysA.length!==(0,keys.A)(b).length)return!1;var extendedStackA=stackA.concat([a]),extendedStackB=stackB.concat([b]);for(idx=keysA.length-1;idx>=0;){var key=keysA[idx];if(!(0,_has.A)(key,b)||!_equals(b[key],a[key],extendedStackA,extendedStackB))return!1;idx-=1}return!0}const es_equals=(0,_curry2.A)((function equals(a,b){return _equals(a,b,[],[])}));function _includes(a,list){return function _indexOf(list,a,idx){var inf,item;if("function"==typeof list.indexOf)switch(typeof a){case"number":if(0===a){for(inf=1/a;idx<list.length;){if(0===(item=list[idx])&&1/item===inf)return idx;idx+=1}return-1}if(a!=a){for(;idx<list.length;){if("number"==typeof(item=list[idx])&&item!=item)return idx;idx+=1}return-1}return list.indexOf(a,idx);case"string":case"boolean":case"function":case"undefined":return list.indexOf(a,idx);case"object":if(null===a)return list.indexOf(a,idx)}for(;idx<list.length;){if(es_equals(list[idx],a))return idx;idx+=1}return-1}(list,a,0)>=0}function hasOrAdd(item,shouldAdd,set){var prevSize,type=typeof item;switch(type){case"string":case"number":return 0===item&&1/item==-1/0?!!set._items["-0"]||(shouldAdd&&(set._items["-0"]=!0),!1):null!==set._nativeSet?shouldAdd?(prevSize=set._nativeSet.size,set._nativeSet.add(item),set._nativeSet.size===prevSize):set._nativeSet.has(item):type in set._items?item in set._items[type]||(shouldAdd&&(set._items[type][item]=!0),!1):(shouldAdd&&(set._items[type]={},set._items[type][item]=!0),!1);case"boolean":if(type in set._items){var bIdx=item?1:0;return!!set._items[type][bIdx]||(shouldAdd&&(set._items[type][bIdx]=!0),!1)}return shouldAdd&&(set._items[type]=item?[!1,!0]:[!0,!1]),!1;case"function":return null!==set._nativeSet?shouldAdd?(prevSize=set._nativeSet.size,set._nativeSet.add(item),set._nativeSet.size===prevSize):set._nativeSet.has(item):type in set._items?!!_includes(item,set._items[type])||(shouldAdd&&set._items[type].push(item),!1):(shouldAdd&&(set._items[type]=[item]),!1);case"undefined":return!!set._items[type]||(shouldAdd&&(set._items[type]=!0),!1);case"object":if(null===item)return!!set._items.null||(shouldAdd&&(set._items.null=!0),!1);default:return(type=Object.prototype.toString.call(item))in set._items?!!_includes(item,set._items[type])||(shouldAdd&&set._items[type].push(item),!1):(shouldAdd&&(set._items[type]=[item]),!1)}}const internal_Set=function(){function _Set(){this._nativeSet="function"==typeof Set?new Set:null,this._items={}}return _Set.prototype.add=function(item){return!hasOrAdd(item,!0,this)},_Set.prototype.has=function(item){return hasOrAdd(item,!1,this)},_Set}();const es_uniqBy=(0,_curry2.A)((function uniqBy(fn,list){for(var appliedItem,item,set=new internal_Set,result=[],idx=0;idx<list.length;)appliedItem=fn(item=list[idx]),set.add(appliedItem)&&result.push(item),idx+=1;return result}))}}]);