"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[1506],{"../../node_modules/@react-aria/button/dist/useButton.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>$701a24aa0da5b062$export$ea18c227d4417cc3});var _react_aria_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/utils/dist/filterDOMProps.mjs"),_react_aria_focus__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusable.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/usePress.mjs");function $701a24aa0da5b062$export$ea18c227d4417cc3(props,ref){let additionalProps,{elementType="button",isDisabled,onPress,onPressStart,onPressEnd,onPressUp,onPressChange,preventFocusOnPress,allowFocusWhenDisabled,onClick:deprecatedOnClick,href,target,rel,type="button"}=props;additionalProps="button"===elementType?{type,disabled:isDisabled}:{role:"button",tabIndex:isDisabled?void 0:0,href:"a"===elementType&&isDisabled?void 0:href,target:"a"===elementType?target:void 0,type:"input"===elementType?type:void 0,disabled:"input"===elementType?isDisabled:void 0,"aria-disabled":isDisabled&&"input"!==elementType?isDisabled:void 0,rel:"a"===elementType?rel:void 0};let{pressProps,isPressed}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_0__.d)({onPressStart,onPressEnd,onPressChange,onPress,onPressUp,isDisabled,preventFocusOnPress,ref}),{focusableProps}=(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_1__.W)(props,ref);allowFocusWhenDisabled&&(focusableProps.tabIndex=isDisabled?-1:focusableProps.tabIndex);let buttonProps=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.v)(focusableProps,pressProps,(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__.$)(props,{labelable:!0}));return{isPressed,buttonProps:(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.v)(additionalProps,buttonProps,{"aria-haspopup":props["aria-haspopup"],"aria-expanded":props["aria-expanded"],"aria-controls":props["aria-controls"],"aria-pressed":props["aria-pressed"],onClick:e=>{deprecatedOnClick&&(deprecatedOnClick(e),console.warn("onClick is deprecated, please use onPress"))}})}}},"../../node_modules/@react-aria/label/dist/useLabel.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>$d191a55c9702f145$export$8467354a121f1b9f});var _react_aria_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useId.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useLabels.mjs");function $d191a55c9702f145$export$8467354a121f1b9f(props){let{id,label,"aria-labelledby":ariaLabelledby,"aria-label":ariaLabel,labelElementType="label"}=props;id=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_0__.Bi)(id);let labelId=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_0__.Bi)(),labelProps={};return label?(ariaLabelledby=ariaLabelledby?`${labelId} ${ariaLabelledby}`:labelId,labelProps={id:labelId,htmlFor:"label"===labelElementType?id:void 0}):ariaLabelledby||ariaLabel||console.warn("If you do not provide a visible label, you must specify an aria-label or aria-labelledby attribute for accessibility"),{labelProps,fieldProps:(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.b)({id,"aria-label":ariaLabel,"aria-labelledby":ariaLabelledby})}}},"../../node_modules/@react-aria/overlays/dist/ariaHideOutside.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{h:()=>$5e3802645cc19319$export$1c3ebcada18427bf});let $5e3802645cc19319$var$refCountMap=new WeakMap,$5e3802645cc19319$var$observerStack=[];function $5e3802645cc19319$export$1c3ebcada18427bf(targets,root=document.body){let visibleNodes=new Set(targets),hiddenNodes=new Set,walk=root=>{for(let element of root.querySelectorAll("[data-live-announcer], [data-react-aria-top-layer]"))visibleNodes.add(element);let acceptNode=node=>{if(visibleNodes.has(node)||hiddenNodes.has(node.parentElement)&&"row"!==node.parentElement.getAttribute("role"))return NodeFilter.FILTER_REJECT;for(let target of visibleNodes)if(node.contains(target))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_ACCEPT},walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT,{acceptNode}),acceptRoot=acceptNode(root);if(acceptRoot===NodeFilter.FILTER_ACCEPT&&hide(root),acceptRoot!==NodeFilter.FILTER_REJECT){let node=walker.nextNode();for(;null!=node;)hide(node),node=walker.nextNode()}},hide=node=>{var _refCountMap_get;let refCount=null!==(_refCountMap_get=$5e3802645cc19319$var$refCountMap.get(node))&&void 0!==_refCountMap_get?_refCountMap_get:0;"true"===node.getAttribute("aria-hidden")&&0===refCount||(0===refCount&&node.setAttribute("aria-hidden","true"),hiddenNodes.add(node),$5e3802645cc19319$var$refCountMap.set(node,refCount+1))};$5e3802645cc19319$var$observerStack.length&&$5e3802645cc19319$var$observerStack[$5e3802645cc19319$var$observerStack.length-1].disconnect(),walk(root);let observer=new MutationObserver((changes=>{for(let change of changes)if("childList"===change.type&&0!==change.addedNodes.length&&![...visibleNodes,...hiddenNodes].some((node=>node.contains(change.target)))){for(let node of change.removedNodes)node instanceof Element&&(visibleNodes.delete(node),hiddenNodes.delete(node));for(let node of change.addedNodes)!(node instanceof HTMLElement||node instanceof SVGElement)||"true"!==node.dataset.liveAnnouncer&&"true"!==node.dataset.reactAriaTopLayer?node instanceof Element&&walk(node):visibleNodes.add(node)}}));observer.observe(root,{childList:!0,subtree:!0});let observerWrapper={observe(){observer.observe(root,{childList:!0,subtree:!0})},disconnect(){observer.disconnect()}};return $5e3802645cc19319$var$observerStack.push(observerWrapper),()=>{observer.disconnect();for(let node of hiddenNodes){let count=$5e3802645cc19319$var$refCountMap.get(node);1===count?(node.removeAttribute("aria-hidden"),$5e3802645cc19319$var$refCountMap.delete(node)):$5e3802645cc19319$var$refCountMap.set(node,count-1)}observerWrapper===$5e3802645cc19319$var$observerStack[$5e3802645cc19319$var$observerStack.length-1]?($5e3802645cc19319$var$observerStack.pop(),$5e3802645cc19319$var$observerStack.length&&$5e3802645cc19319$var$observerStack[$5e3802645cc19319$var$observerStack.length-1].observe()):$5e3802645cc19319$var$observerStack.splice($5e3802645cc19319$var$observerStack.indexOf(observerWrapper),1)}}},"../../node_modules/@react-aria/utils/dist/useLabels.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{b:()=>$313b98861ee5dd6c$export$d6875122194c7b44});var _useId_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useId.mjs");function $313b98861ee5dd6c$export$d6875122194c7b44(props,defaultLabel){let{id,"aria-label":label,"aria-labelledby":labelledBy}=props;if(id=(0,_useId_mjs__WEBPACK_IMPORTED_MODULE_0__.Bi)(id),labelledBy&&label){let ids=new Set([id,...labelledBy.trim().split(/\s+/)]);labelledBy=[...ids].join(" ")}else labelledBy&&(labelledBy=labelledBy.trim().split(/\s+/).join(" "));return label||labelledBy||!defaultLabel||(label=defaultLabel),{id,"aria-label":label,"aria-labelledby":labelledBy}}},"../../node_modules/@react-stately/overlays/dist/useOverlayTriggerState.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>$fc909762b330b746$export$61c6a8c84e605fb6});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_stately_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-stately/utils/dist/useControlledState.mjs");function $fc909762b330b746$export$61c6a8c84e605fb6(props){let[isOpen,setOpen]=(0,_react_stately_utils__WEBPACK_IMPORTED_MODULE_1__.P)(props.isOpen,props.defaultOpen||!1,props.onOpenChange);const open=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setOpen(!0)}),[setOpen]),close=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setOpen(!1)}),[setOpen]),toggle=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setOpen(!isOpen)}),[setOpen,isOpen]);return{isOpen,setOpen,open,close,toggle}}},"./node_modules/ramda/es/keys.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>es_keys});var _curry1=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js"),_has=__webpack_require__("./node_modules/ramda/es/internal/_has.js"),_isArguments_toString=Object.prototype.toString;const internal_isArguments=function(){return"[object Arguments]"===_isArguments_toString.call(arguments)?function _isArguments(x){return"[object Arguments]"===_isArguments_toString.call(x)}:function _isArguments(x){return(0,_has.A)("callee",x)}}();var hasEnumBug=!{toString:null}.propertyIsEnumerable("toString"),nonEnumerableProps=["constructor","valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],hasArgsEnumBug=function(){return arguments.propertyIsEnumerable("length")}(),contains=function contains(list,item){for(var idx=0;idx<list.length;){if(list[idx]===item)return!0;idx+=1}return!1};const es_keys="function"!=typeof Object.keys||hasArgsEnumBug?(0,_curry1.A)((function keys(obj){if(Object(obj)!==obj)return[];var prop,nIdx,ks=[],checkArgsLength=hasArgsEnumBug&&internal_isArguments(obj);for(prop in obj)!(0,_has.A)(prop,obj)||checkArgsLength&&"length"===prop||(ks[ks.length]=prop);if(hasEnumBug)for(nIdx=nonEnumerableProps.length-1;nIdx>=0;)prop=nonEnumerableProps[nIdx],(0,_has.A)(prop,obj)&&!contains(ks,prop)&&(ks[ks.length]=prop),nIdx-=1;return ks})):(0,_curry1.A)((function keys(obj){return Object(obj)!==obj?[]:Object.keys(obj)}))},"./node_modules/ramda/es/sortBy.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=(0,__webpack_require__("./node_modules/ramda/es/internal/_curry2.js").A)((function sortBy(fn,list){return Array.prototype.slice.call(list,0).sort((function(a,b){var aa=fn(a),bb=fn(b);return aa<bb?-1:aa>bb?1:0}))}))},"./node_modules/ramda/es/uniqBy.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>es_uniqBy});var _curry2=__webpack_require__("./node_modules/ramda/es/internal/_curry2.js");function _arrayFromIterator(iter){for(var next,list=[];!(next=iter.next()).done;)list.push(next.value);return list}function _includesWith(pred,x,list){for(var idx=0,len=list.length;idx<len;){if(pred(x,list[idx]))return!0;idx+=1}return!1}var _has=__webpack_require__("./node_modules/ramda/es/internal/_has.js");const internal_objectIs="function"==typeof Object.is?Object.is:function _objectIs(a,b){return a===b?0!==a||1/a==1/b:a!=a&&b!=b};var keys=__webpack_require__("./node_modules/ramda/es/keys.js"),type=__webpack_require__("./node_modules/ramda/es/type.js");function _uniqContentEquals(aIterator,bIterator,stackA,stackB){var a=_arrayFromIterator(aIterator);function eq(_a,_b){return _equals(_a,_b,stackA.slice(),stackB.slice())}return!_includesWith((function(b,aItem){return!_includesWith(eq,aItem,b)}),_arrayFromIterator(bIterator),a)}function _equals(a,b,stackA,stackB){if(internal_objectIs(a,b))return!0;var typeA=(0,type.A)(a);if(typeA!==(0,type.A)(b))return!1;if(null==a||null==b)return!1;if("function"==typeof a["fantasy-land/equals"]||"function"==typeof b["fantasy-land/equals"])return"function"==typeof a["fantasy-land/equals"]&&a["fantasy-land/equals"](b)&&"function"==typeof b["fantasy-land/equals"]&&b["fantasy-land/equals"](a);if("function"==typeof a.equals||"function"==typeof b.equals)return"function"==typeof a.equals&&a.equals(b)&&"function"==typeof b.equals&&b.equals(a);switch(typeA){case"Arguments":case"Array":case"Object":if("function"==typeof a.constructor&&"Promise"===function _functionName(f){var match=String(f).match(/^function (\w*)/);return null==match?"":match[1]}(a.constructor))return a===b;break;case"Boolean":case"Number":case"String":if(typeof a!=typeof b||!internal_objectIs(a.valueOf(),b.valueOf()))return!1;break;case"Date":if(!internal_objectIs(a.valueOf(),b.valueOf()))return!1;break;case"Error":return a.name===b.name&&a.message===b.message;case"RegExp":if(a.source!==b.source||a.global!==b.global||a.ignoreCase!==b.ignoreCase||a.multiline!==b.multiline||a.sticky!==b.sticky||a.unicode!==b.unicode)return!1}for(var idx=stackA.length-1;idx>=0;){if(stackA[idx]===a)return stackB[idx]===b;idx-=1}switch(typeA){case"Map":return a.size===b.size&&_uniqContentEquals(a.entries(),b.entries(),stackA.concat([a]),stackB.concat([b]));case"Set":return a.size===b.size&&_uniqContentEquals(a.values(),b.values(),stackA.concat([a]),stackB.concat([b]));case"Arguments":case"Array":case"Object":case"Boolean":case"Number":case"String":case"Date":case"Error":case"RegExp":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"ArrayBuffer":break;default:return!1}var keysA=(0,keys.A)(a);if(keysA.length!==(0,keys.A)(b).length)return!1;var extendedStackA=stackA.concat([a]),extendedStackB=stackB.concat([b]);for(idx=keysA.length-1;idx>=0;){var key=keysA[idx];if(!(0,_has.A)(key,b)||!_equals(b[key],a[key],extendedStackA,extendedStackB))return!1;idx-=1}return!0}const es_equals=(0,_curry2.A)((function equals(a,b){return _equals(a,b,[],[])}));function _includes(a,list){return function _indexOf(list,a,idx){var inf,item;if("function"==typeof list.indexOf)switch(typeof a){case"number":if(0===a){for(inf=1/a;idx<list.length;){if(0===(item=list[idx])&&1/item===inf)return idx;idx+=1}return-1}if(a!=a){for(;idx<list.length;){if("number"==typeof(item=list[idx])&&item!=item)return idx;idx+=1}return-1}return list.indexOf(a,idx);case"string":case"boolean":case"function":case"undefined":return list.indexOf(a,idx);case"object":if(null===a)return list.indexOf(a,idx)}for(;idx<list.length;){if(es_equals(list[idx],a))return idx;idx+=1}return-1}(list,a,0)>=0}function hasOrAdd(item,shouldAdd,set){var prevSize,type=typeof item;switch(type){case"string":case"number":return 0===item&&1/item==-1/0?!!set._items["-0"]||(shouldAdd&&(set._items["-0"]=!0),!1):null!==set._nativeSet?shouldAdd?(prevSize=set._nativeSet.size,set._nativeSet.add(item),set._nativeSet.size===prevSize):set._nativeSet.has(item):type in set._items?item in set._items[type]||(shouldAdd&&(set._items[type][item]=!0),!1):(shouldAdd&&(set._items[type]={},set._items[type][item]=!0),!1);case"boolean":if(type in set._items){var bIdx=item?1:0;return!!set._items[type][bIdx]||(shouldAdd&&(set._items[type][bIdx]=!0),!1)}return shouldAdd&&(set._items[type]=item?[!1,!0]:[!0,!1]),!1;case"function":return null!==set._nativeSet?shouldAdd?(prevSize=set._nativeSet.size,set._nativeSet.add(item),set._nativeSet.size===prevSize):set._nativeSet.has(item):type in set._items?!!_includes(item,set._items[type])||(shouldAdd&&set._items[type].push(item),!1):(shouldAdd&&(set._items[type]=[item]),!1);case"undefined":return!!set._items[type]||(shouldAdd&&(set._items[type]=!0),!1);case"object":if(null===item)return!!set._items.null||(shouldAdd&&(set._items.null=!0),!1);default:return(type=Object.prototype.toString.call(item))in set._items?!!_includes(item,set._items[type])||(shouldAdd&&set._items[type].push(item),!1):(shouldAdd&&(set._items[type]=[item]),!1)}}const internal_Set=function(){function _Set(){this._nativeSet="function"==typeof Set?new Set:null,this._items={}}return _Set.prototype.add=function(item){return!hasOrAdd(item,!0,this)},_Set.prototype.has=function(item){return hasOrAdd(item,!1,this)},_Set}();const es_uniqBy=(0,_curry2.A)((function uniqBy(fn,list){for(var appliedItem,item,set=new internal_Set,result=[],idx=0;idx<list.length;)appliedItem=fn(item=list[idx]),set.add(appliedItem)&&result.push(item),idx+=1;return result}))}}]);