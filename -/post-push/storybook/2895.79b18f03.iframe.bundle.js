"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[2895],{"../../node_modules/@react-aria/select/dist/useSelect.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>$58aed456727eb0f3$export$e64b2f635402ca43});var _react_aria_utils__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/@react-aria/utils/dist/filterDOMProps.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useId.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("../../node_modules/@react-aria/utils/dist/chain.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_selection__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/selection/dist/ListKeyboardDelegate.mjs"),_react_aria_selection__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/selection/dist/useTypeSelect.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocusVisible.mjs"),_react_aria_i18n__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/i18n/dist/useCollator.mjs"),_react_aria_label__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@react-aria/label/dist/useField.mjs"),_react_aria_menu__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/menu/dist/useMenuTrigger.mjs");const $58aed456727eb0f3$export$703601b7e90536f8=new WeakMap;function $58aed456727eb0f3$export$e64b2f635402ca43(props,state,ref){let{keyboardDelegate,isDisabled,isRequired,name,validationBehavior="aria"}=props,collator=(0,_react_aria_i18n__WEBPACK_IMPORTED_MODULE_1__.Q)({usage:"search",sensitivity:"base"}),delegate=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>keyboardDelegate||new(0,_react_aria_selection__WEBPACK_IMPORTED_MODULE_2__.n)(state.collection,state.disabledKeys,ref,collator)),[keyboardDelegate,state.collection,state.disabledKeys,collator]),{menuTriggerProps,menuProps}=(0,_react_aria_menu__WEBPACK_IMPORTED_MODULE_3__.V)({isDisabled,type:"listbox"},state,ref),{typeSelectProps}=(0,_react_aria_selection__WEBPACK_IMPORTED_MODULE_4__.I)({keyboardDelegate:delegate,selectionManager:state.selectionManager,onTypeSelect(key){state.setSelectedKey(key)}}),{isInvalid,validationErrors,validationDetails}=state.displayValidation,{labelProps,fieldProps,descriptionProps,errorMessageProps}=(0,_react_aria_label__WEBPACK_IMPORTED_MODULE_5__.M)({...props,labelElementType:"span",isInvalid,errorMessage:props.errorMessage||validationErrors});typeSelectProps.onKeyDown=typeSelectProps.onKeyDownCapture,delete typeSelectProps.onKeyDownCapture;let domProps=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_6__.$)(props,{labelable:!0}),triggerProps=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_7__.v)(typeSelectProps,menuTriggerProps,fieldProps),valueId=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_8__.Bi)();return $58aed456727eb0f3$export$703601b7e90536f8.set(state,{isDisabled,isRequired,name,validationBehavior}),{labelProps:{...labelProps,onClick:()=>{var _ref_current;props.isDisabled||(null===(_ref_current=ref.current)||void 0===_ref_current||_ref_current.focus(),(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_9__.Cl)("keyboard"))}},triggerProps:(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_7__.v)(domProps,{...triggerProps,isDisabled,onKeyDown:(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_10__.c)(triggerProps.onKeyDown,(e=>{switch(e.key){case"ArrowLeft":{var _delegate_getKeyAbove,_delegate_getFirstKey;e.preventDefault();let key=null!=state.selectedKey?null===(_delegate_getKeyAbove=delegate.getKeyAbove)||void 0===_delegate_getKeyAbove?void 0:_delegate_getKeyAbove.call(delegate,state.selectedKey):null===(_delegate_getFirstKey=delegate.getFirstKey)||void 0===_delegate_getFirstKey?void 0:_delegate_getFirstKey.call(delegate);key&&state.setSelectedKey(key);break}case"ArrowRight":{var _delegate_getKeyBelow,_delegate_getFirstKey1;e.preventDefault();let key=null!=state.selectedKey?null===(_delegate_getKeyBelow=delegate.getKeyBelow)||void 0===_delegate_getKeyBelow?void 0:_delegate_getKeyBelow.call(delegate,state.selectedKey):null===(_delegate_getFirstKey1=delegate.getFirstKey)||void 0===_delegate_getFirstKey1?void 0:_delegate_getFirstKey1.call(delegate);key&&state.setSelectedKey(key);break}}}),props.onKeyDown),onKeyUp:props.onKeyUp,"aria-labelledby":[valueId,triggerProps["aria-labelledby"],triggerProps["aria-label"]&&!triggerProps["aria-labelledby"]?triggerProps.id:null].filter(Boolean).join(" "),onFocus(e){state.isFocused||(props.onFocus&&props.onFocus(e),props.onFocusChange&&props.onFocusChange(!0),state.setFocused(!0))},onBlur(e){state.isOpen||(props.onBlur&&props.onBlur(e),props.onFocusChange&&props.onFocusChange(!1),state.setFocused(!1))}}),valueProps:{id:valueId},menuProps:{...menuProps,autoFocus:state.focusStrategy||!0,shouldSelectOnPressUp:!0,shouldFocusOnHover:!0,disallowEmptySelection:!0,linkBehavior:"selection",onBlur:e=>{e.currentTarget.contains(e.relatedTarget)||(props.onBlur&&props.onBlur(e),props.onFocusChange&&props.onFocusChange(!1),state.setFocused(!1))},"aria-labelledby":[fieldProps["aria-labelledby"],triggerProps["aria-label"]&&!fieldProps["aria-labelledby"]?triggerProps.id:null].filter(Boolean).join(" ")},descriptionProps,errorMessageProps,isInvalid,validationErrors,validationDetails}}},"../../node_modules/@react-aria/utils/dist/useLabels.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{b:()=>$313b98861ee5dd6c$export$d6875122194c7b44});var _useId_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useId.mjs");function $313b98861ee5dd6c$export$d6875122194c7b44(props,defaultLabel){let{id,"aria-label":label,"aria-labelledby":labelledBy}=props;if(id=(0,_useId_mjs__WEBPACK_IMPORTED_MODULE_0__.Bi)(id),labelledBy&&label){let ids=new Set([id,...labelledBy.trim().split(/\s+/)]);labelledBy=[...ids].join(" ")}else labelledBy&&(labelledBy=labelledBy.trim().split(/\s+/).join(" "));return label||labelledBy||!defaultLabel||(label=defaultLabel),{id,"aria-label":label,"aria-labelledby":labelledBy}}},"../../node_modules/@react-stately/form/dist/useFormValidationState.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{KZ:()=>$e5be200c675c3b3a$export$fc1a364ae1f3ff10,Lf:()=>$e5be200c675c3b3a$export$a763b9476acd3eb});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");const $e5be200c675c3b3a$export$aca958c65c314e6c={badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valueMissing:!1,valid:!0},$e5be200c675c3b3a$var$CUSTOM_VALIDITY_STATE={...$e5be200c675c3b3a$export$aca958c65c314e6c,customError:!0,valid:!1},$e5be200c675c3b3a$export$dad6ae84456c676a={isInvalid:!1,validationDetails:$e5be200c675c3b3a$export$aca958c65c314e6c,validationErrors:[]},$e5be200c675c3b3a$export$571b5131b7e65c11=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({}),$e5be200c675c3b3a$export$a763b9476acd3eb="__formValidationState"+Date.now();function $e5be200c675c3b3a$export$fc1a364ae1f3ff10(props){if(props[$e5be200c675c3b3a$export$a763b9476acd3eb]){let{realtimeValidation,displayValidation,updateValidation,resetValidation,commitValidation}=props[$e5be200c675c3b3a$export$a763b9476acd3eb];return{realtimeValidation,displayValidation,updateValidation,resetValidation,commitValidation}}return function $e5be200c675c3b3a$var$useFormValidationStateImpl(props){let{isInvalid,validationState,name,value,builtinValidation,validate,validationBehavior="aria"}=props;validationState&&(isInvalid||(isInvalid="invalid"===validationState));let controlledError=void 0!==isInvalid?{isInvalid,validationErrors:[],validationDetails:$e5be200c675c3b3a$var$CUSTOM_VALIDITY_STATE}:null,clientError=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>{if(!validate||null==value)return null;let validateErrors=function $e5be200c675c3b3a$var$runValidate(validate,value){if("function"==typeof validate){let e=validate(value);if(e&&"boolean"!=typeof e)return $e5be200c675c3b3a$var$asArray(e)}return[]}(validate,value);return $e5be200c675c3b3a$var$getValidationResult(validateErrors)}),[validate,value]);(null==builtinValidation?void 0:builtinValidation.validationDetails.valid)&&(builtinValidation=void 0);let serverErrors=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)($e5be200c675c3b3a$export$571b5131b7e65c11),serverErrorMessages=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>name?Array.isArray(name)?name.flatMap((name=>$e5be200c675c3b3a$var$asArray(serverErrors[name]))):$e5be200c675c3b3a$var$asArray(serverErrors[name]):[]),[serverErrors,name]),[lastServerErrors,setLastServerErrors]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(serverErrors),[isServerErrorCleared,setServerErrorCleared]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);serverErrors!==lastServerErrors&&(setLastServerErrors(serverErrors),setServerErrorCleared(!1));let serverError=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>$e5be200c675c3b3a$var$getValidationResult(isServerErrorCleared?[]:serverErrorMessages)),[isServerErrorCleared,serverErrorMessages]),nextValidation=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)($e5be200c675c3b3a$export$dad6ae84456c676a),[currentValidity,setCurrentValidity]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)($e5be200c675c3b3a$export$dad6ae84456c676a),lastError=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)($e5be200c675c3b3a$export$dad6ae84456c676a),commitValidation=()=>{if(!commitQueued)return;setCommitQueued(!1);let error=clientError||builtinValidation||nextValidation.current;$e5be200c675c3b3a$var$isEqualValidation(error,lastError.current)||(lastError.current=error,setCurrentValidity(error))},[commitQueued,setCommitQueued]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(commitValidation),{realtimeValidation:controlledError||serverError||clientError||builtinValidation||$e5be200c675c3b3a$export$dad6ae84456c676a,displayValidation:"native"===validationBehavior?controlledError||serverError||currentValidity:controlledError||serverError||clientError||builtinValidation||currentValidity,updateValidation(value){"aria"!==validationBehavior||$e5be200c675c3b3a$var$isEqualValidation(currentValidity,value)?nextValidation.current=value:setCurrentValidity(value)},resetValidation(){let error=$e5be200c675c3b3a$export$dad6ae84456c676a;$e5be200c675c3b3a$var$isEqualValidation(error,lastError.current)||(lastError.current=error,setCurrentValidity(error)),"native"===validationBehavior&&setCommitQueued(!1),setServerErrorCleared(!0)},commitValidation(){"native"===validationBehavior&&setCommitQueued(!0),setServerErrorCleared(!0)}}}(props)}function $e5be200c675c3b3a$var$asArray(v){return v?Array.isArray(v)?v:[v]:[]}function $e5be200c675c3b3a$var$getValidationResult(errors){return errors.length?{isInvalid:!0,validationErrors:errors,validationDetails:$e5be200c675c3b3a$var$CUSTOM_VALIDITY_STATE}:null}function $e5be200c675c3b3a$var$isEqualValidation(a,b){return a===b||!!a&&!!b&&a.isInvalid===b.isInvalid&&a.validationErrors.length===b.validationErrors.length&&a.validationErrors.every(((a,i)=>a===b.validationErrors[i]))&&Object.entries(a.validationDetails).every((([k,v])=>b.validationDetails[k]===v))}},"../../node_modules/@react-stately/list/dist/ListCollection.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>$a02d57049d202695$export$d085fb9e920b5ca7});class $a02d57049d202695$export$d085fb9e920b5ca7{*[Symbol.iterator](){yield*this.iterable}get size(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(key){let node=this.keyMap.get(key);var _node_prevKey;return node&&null!==(_node_prevKey=node.prevKey)&&void 0!==_node_prevKey?_node_prevKey:null}getKeyAfter(key){let node=this.keyMap.get(key);var _node_nextKey;return node&&null!==(_node_nextKey=node.nextKey)&&void 0!==_node_nextKey?_node_nextKey:null}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(key){var _this_keyMap_get;return null!==(_this_keyMap_get=this.keyMap.get(key))&&void 0!==_this_keyMap_get?_this_keyMap_get:null}at(idx){const keys=[...this.getKeys()];return this.getItem(keys[idx])}getChildren(key){let node=this.keyMap.get(key);return(null==node?void 0:node.childNodes)||[]}constructor(nodes){this.keyMap=new Map,this.firstKey=null,this.lastKey=null,this.iterable=nodes;let visit=node=>{if(this.keyMap.set(node.key,node),node.childNodes&&"section"===node.type)for(let child of node.childNodes)visit(child)};for(let node of nodes)visit(node);let last=null,index=0;for(let[key,node]of this.keyMap)last?(last.nextKey=key,node.prevKey=last.key):(this.firstKey=key,node.prevKey=void 0),"item"===node.type&&(node.index=index++),last=node,last.nextKey=void 0;var _last_key;this.lastKey=null!==(_last_key=null==last?void 0:last.key)&&void 0!==_last_key?_last_key:null}}},"../../node_modules/@react-stately/list/dist/useListState.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{p:()=>$e72dd72e1c76a225$export$2f645645f7bca764});var _ListCollection_mjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-stately/list/dist/ListCollection.mjs"),_react_stately_selection__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-stately/selection/dist/useMultipleSelectionState.mjs"),_react_stately_selection__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-stately/selection/dist/SelectionManager.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_stately_collections__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-stately/collections/dist/useCollection.mjs");function $e72dd72e1c76a225$export$2f645645f7bca764(props){let{filter,layoutDelegate}=props,selectionState=(0,_react_stately_selection__WEBPACK_IMPORTED_MODULE_1__.R)(props),disabledKeys=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>props.disabledKeys?new Set(props.disabledKeys):new Set),[props.disabledKeys]),factory=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((nodes=>filter?new(0,_ListCollection_mjs__WEBPACK_IMPORTED_MODULE_2__.J)(filter(nodes)):new(0,_ListCollection_mjs__WEBPACK_IMPORTED_MODULE_2__.J)(nodes)),[filter]),context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>({suppressTextValueWarning:props.suppressTextValueWarning})),[props.suppressTextValueWarning]),collection=(0,_react_stately_collections__WEBPACK_IMPORTED_MODULE_3__.G)(props,factory,context),selectionManager=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>new(0,_react_stately_selection__WEBPACK_IMPORTED_MODULE_4__.Y)(collection,selectionState,{layoutDelegate})),[collection,selectionState,layoutDelegate]);const cachedCollection=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{if(null!=selectionState.focusedKey&&!collection.getItem(selectionState.focusedKey)&&cachedCollection.current){const startItem=cachedCollection.current.getItem(selectionState.focusedKey),cachedItemNodes=[...cachedCollection.current.getKeys()].map((key=>{const itemNode=cachedCollection.current.getItem(key);return"item"===(null==itemNode?void 0:itemNode.type)?itemNode:null})).filter((node=>null!==node)),itemNodes=[...collection.getKeys()].map((key=>{const itemNode=collection.getItem(key);return"item"===(null==itemNode?void 0:itemNode.type)?itemNode:null})).filter((node=>null!==node));var _cachedItemNodes_length,_itemNodes_length;const diff=(null!==(_cachedItemNodes_length=null==cachedItemNodes?void 0:cachedItemNodes.length)&&void 0!==_cachedItemNodes_length?_cachedItemNodes_length:0)-(null!==(_itemNodes_length=null==itemNodes?void 0:itemNodes.length)&&void 0!==_itemNodes_length?_itemNodes_length:0);var _startItem_index,_startItem_index1,_itemNodes_length1;let index=Math.min(diff>1?Math.max((null!==(_startItem_index=null==startItem?void 0:startItem.index)&&void 0!==_startItem_index?_startItem_index:0)-diff+1,0):null!==(_startItem_index1=null==startItem?void 0:startItem.index)&&void 0!==_startItem_index1?_startItem_index1:0,(null!==(_itemNodes_length1=null==itemNodes?void 0:itemNodes.length)&&void 0!==_itemNodes_length1?_itemNodes_length1:0)-1),newNode=null,isReverseSearching=!1;for(;index>=0;){if(!selectionManager.isDisabled(itemNodes[index].key)){newNode=itemNodes[index];break}var _startItem_index2,_startItem_index3;if(index<itemNodes.length-1&&!isReverseSearching)index++;else isReverseSearching=!0,index>(null!==(_startItem_index2=null==startItem?void 0:startItem.index)&&void 0!==_startItem_index2?_startItem_index2:0)&&(index=null!==(_startItem_index3=null==startItem?void 0:startItem.index)&&void 0!==_startItem_index3?_startItem_index3:0),index--}selectionState.setFocusedKey(newNode?newNode.key:null)}cachedCollection.current=collection}),[collection,selectionManager,selectionState,selectionState.focusedKey]),{collection,disabledKeys,selectionManager}}},"../../node_modules/@react-stately/list/dist/useSingleSelectListState.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>$a0d645289fe9b86b$export$e7f05e985daf4b5f});var _useListState_mjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-stately/list/dist/useListState.mjs"),_react_stately_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-stately/utils/dist/useControlledState.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function $a0d645289fe9b86b$export$e7f05e985daf4b5f(props){var _props_defaultSelectedKey;let[selectedKey,setSelectedKey]=(0,_react_stately_utils__WEBPACK_IMPORTED_MODULE_1__.P)(props.selectedKey,null!==(_props_defaultSelectedKey=props.defaultSelectedKey)&&void 0!==_props_defaultSelectedKey?_props_defaultSelectedKey:null,props.onSelectionChange),selectedKeys=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>null!=selectedKey?[selectedKey]:[]),[selectedKey]),{collection,disabledKeys,selectionManager}=(0,_useListState_mjs__WEBPACK_IMPORTED_MODULE_2__.p)({...props,selectionMode:"single",disallowEmptySelection:!0,allowDuplicateSelectionEvents:!0,selectedKeys,onSelectionChange:keys=>{if("all"===keys)return;var _keys_values_next_value;let key=null!==(_keys_values_next_value=keys.values().next().value)&&void 0!==_keys_values_next_value?_keys_values_next_value:null;key===selectedKey&&props.onSelectionChange&&props.onSelectionChange(key),setSelectedKey(key)}}),selectedItem=null!=selectedKey?collection.getItem(selectedKey):null;return{collection,disabledKeys,selectionManager,selectedKey,setSelectedKey,selectedItem}}},"../../node_modules/@react-stately/menu/dist/useMenuTriggerState.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{I:()=>$a28c903ee9ad8dc5$export$79fefeb1c2091ac3});var _react_stately_overlays__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-stately/overlays/dist/useOverlayTriggerState.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function $a28c903ee9ad8dc5$export$79fefeb1c2091ac3(props){let overlayTriggerState=(0,_react_stately_overlays__WEBPACK_IMPORTED_MODULE_1__.T)(props),[focusStrategy,setFocusStrategy]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[expandedKeysStack,setExpandedKeysStack]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);return{focusStrategy,...overlayTriggerState,open(focusStrategy=null){setFocusStrategy(focusStrategy),overlayTriggerState.open()},toggle(focusStrategy=null){setFocusStrategy(focusStrategy),overlayTriggerState.toggle()},close(){setExpandedKeysStack([]),overlayTriggerState.close()},expandedKeysStack,openSubmenu:(triggerKey,level)=>{setExpandedKeysStack((oldStack=>level>oldStack.length?oldStack:[...oldStack.slice(0,level),triggerKey]))},closeSubmenu:(triggerKey,level)=>{setExpandedKeysStack((oldStack=>oldStack[level]===triggerKey?oldStack.slice(0,level):oldStack))}}}},"../../node_modules/@react-stately/select/dist/useSelectState.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>$2bc3a590c5373a4e$export$5159ec8b34d4ec12});var _react_stately_form__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-stately/form/dist/useFormValidationState.mjs"),_react_stately_overlays__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-stately/overlays/dist/useOverlayTriggerState.mjs"),_react_stately_list__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-stately/list/dist/useSingleSelectListState.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function $2bc3a590c5373a4e$export$5159ec8b34d4ec12(props){let triggerState=(0,_react_stately_overlays__WEBPACK_IMPORTED_MODULE_1__.T)(props),[focusStrategy,setFocusStrategy]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),listState=(0,_react_stately_list__WEBPACK_IMPORTED_MODULE_2__.V)({...props,onSelectionChange:key=>{null!=props.onSelectionChange&&props.onSelectionChange(key),triggerState.close(),validationState.commitValidation()}}),validationState=(0,_react_stately_form__WEBPACK_IMPORTED_MODULE_3__.KZ)({...props,value:listState.selectedKey}),[isFocused,setFocused]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return{...validationState,...listState,...triggerState,focusStrategy,open(focusStrategy=null){0!==listState.collection.size&&(setFocusStrategy(focusStrategy),triggerState.open())},toggle(focusStrategy=null){0!==listState.collection.size&&(setFocusStrategy(focusStrategy),triggerState.toggle())},isFocused,setFocused}}}}]);