"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[2092],{"../../node_modules/@react-stately/list/dist/ListCollection.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>$a02d57049d202695$export$d085fb9e920b5ca7});class $a02d57049d202695$export$d085fb9e920b5ca7{*[Symbol.iterator](){yield*this.iterable}get size(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(key){let node=this.keyMap.get(key);return node?node.prevKey:null}getKeyAfter(key){let node=this.keyMap.get(key);return node?node.nextKey:null}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(key){return this.keyMap.get(key)}at(idx){const keys=[...this.getKeys()];return this.getItem(keys[idx])}getChildren(key){let node=this.keyMap.get(key);return(null==node?void 0:node.childNodes)||[]}constructor(nodes){this.keyMap=new Map,this.iterable=nodes;let last,visit=node=>{if(this.keyMap.set(node.key,node),node.childNodes&&"section"===node.type)for(let child of node.childNodes)visit(child)};for(let node of nodes)visit(node);let index=0;for(let[key,node]of this.keyMap)last?(last.nextKey=key,node.prevKey=last.key):(this.firstKey=key,node.prevKey=void 0),"item"===node.type&&(node.index=index++),last=node,last.nextKey=void 0;this.lastKey=null==last?void 0:last.key}}},"../../node_modules/@react-stately/list/dist/useListState.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>$e72dd72e1c76a225$export$2f645645f7bca764});var ListCollection=__webpack_require__("../../node_modules/@react-stately/list/dist/ListCollection.mjs");class $e40ea825a81a3709$export$52baac22726c72bf extends Set{constructor(keys,anchorKey,currentKey){super(keys),keys instanceof $e40ea825a81a3709$export$52baac22726c72bf?(this.anchorKey=anchorKey||keys.anchorKey,this.currentKey=currentKey||keys.currentKey):(this.anchorKey=anchorKey,this.currentKey=currentKey)}}var useControlledState=__webpack_require__("../../node_modules/@react-stately/utils/dist/useControlledState.mjs"),react=__webpack_require__("../../node_modules/react/index.js");function $7af3f5b51489e0b5$export$253fe78d46329472(props){let{selectionMode="none",disallowEmptySelection,allowDuplicateSelectionEvents,selectionBehavior:selectionBehaviorProp="toggle",disabledBehavior="all"}=props,isFocusedRef=(0,react.useRef)(!1),[,setFocused]=(0,react.useState)(!1),focusedKeyRef=(0,react.useRef)(null),childFocusStrategyRef=(0,react.useRef)(null),[,setFocusedKey]=(0,react.useState)(null),selectedKeysProp=(0,react.useMemo)((()=>$7af3f5b51489e0b5$var$convertSelection(props.selectedKeys)),[props.selectedKeys]),defaultSelectedKeys=(0,react.useMemo)((()=>$7af3f5b51489e0b5$var$convertSelection(props.defaultSelectedKeys,new $e40ea825a81a3709$export$52baac22726c72bf)),[props.defaultSelectedKeys]),[selectedKeys,setSelectedKeys]=(0,useControlledState.z)(selectedKeysProp,defaultSelectedKeys,props.onSelectionChange),disabledKeysProp=(0,react.useMemo)((()=>props.disabledKeys?new Set(props.disabledKeys):new Set),[props.disabledKeys]),[selectionBehavior,setSelectionBehavior]=(0,react.useState)(selectionBehaviorProp);"replace"===selectionBehaviorProp&&"toggle"===selectionBehavior&&"object"==typeof selectedKeys&&0===selectedKeys.size&&setSelectionBehavior("replace");let lastSelectionBehavior=(0,react.useRef)(selectionBehaviorProp);return(0,react.useEffect)((()=>{selectionBehaviorProp!==lastSelectionBehavior.current&&(setSelectionBehavior(selectionBehaviorProp),lastSelectionBehavior.current=selectionBehaviorProp)}),[selectionBehaviorProp]),{selectionMode,disallowEmptySelection,selectionBehavior,setSelectionBehavior,get isFocused(){return isFocusedRef.current},setFocused(f){isFocusedRef.current=f,setFocused(f)},get focusedKey(){return focusedKeyRef.current},get childFocusStrategy(){return childFocusStrategyRef.current},setFocusedKey(k,childFocusStrategy="first"){focusedKeyRef.current=k,childFocusStrategyRef.current=childFocusStrategy,setFocusedKey(k)},selectedKeys,setSelectedKeys(keys){!allowDuplicateSelectionEvents&&function $7af3f5b51489e0b5$var$equalSets(setA,setB){if(setA.size!==setB.size)return!1;for(let item of setA)if(!setB.has(item))return!1;return!0}(keys,selectedKeys)||setSelectedKeys(keys)},disabledKeys:disabledKeysProp,disabledBehavior}}function $7af3f5b51489e0b5$var$convertSelection(selection,defaultValue){return selection?"all"===selection?"all":new $e40ea825a81a3709$export$52baac22726c72bf(selection):defaultValue}function $c5a24bc478652b5f$export$fbdeaa6a76694f71(iterable){return function $c5a24bc478652b5f$export$5f3398f8733f90e2(iterable,index){if(index<0)return;let i=0;for(let item of iterable){if(i===index)return item;i++}}(iterable,0)}function $c5a24bc478652b5f$export$8c434b3a7a4dad6(collection,a,b){if(a.parentKey===b.parentKey)return a.index-b.index;let aAncestors=[...$c5a24bc478652b5f$var$getAncestors(collection,a),a],bAncestors=[...$c5a24bc478652b5f$var$getAncestors(collection,b),b],firstNonMatchingAncestor=aAncestors.slice(0,bAncestors.length).findIndex(((a,i)=>a!==bAncestors[i]));return-1!==firstNonMatchingAncestor?(a=aAncestors[firstNonMatchingAncestor],b=bAncestors[firstNonMatchingAncestor],a.index-b.index):aAncestors.findIndex((node=>node===b))>=0?1:(bAncestors.findIndex((node=>node===a)),-1)}function $c5a24bc478652b5f$var$getAncestors(collection,node){let parents=[];for(;null!=(null==node?void 0:node.parentKey);)node=collection.getItem(node.parentKey),parents.unshift(node);return parents}class $d496c0a20b6e58ec$export$6c8a5aaad13c9852{get selectionMode(){return this.state.selectionMode}get disallowEmptySelection(){return this.state.disallowEmptySelection}get selectionBehavior(){return this.state.selectionBehavior}setSelectionBehavior(selectionBehavior){this.state.setSelectionBehavior(selectionBehavior)}get isFocused(){return this.state.isFocused}setFocused(isFocused){this.state.setFocused(isFocused)}get focusedKey(){return this.state.focusedKey}get childFocusStrategy(){return this.state.childFocusStrategy}setFocusedKey(key,childFocusStrategy){(null==key||this.collection.getItem(key))&&this.state.setFocusedKey(key,childFocusStrategy)}get selectedKeys(){return"all"===this.state.selectedKeys?new Set(this.getSelectAllKeys()):this.state.selectedKeys}get rawSelection(){return this.state.selectedKeys}isSelected(key){return"none"!==this.state.selectionMode&&(key=this.getKey(key),"all"===this.state.selectedKeys?this.canSelectItem(key):this.state.selectedKeys.has(key))}get isEmpty(){return"all"!==this.state.selectedKeys&&0===this.state.selectedKeys.size}get isSelectAll(){if(this.isEmpty)return!1;if("all"===this.state.selectedKeys)return!0;if(null!=this._isSelectAll)return this._isSelectAll;let allKeys=this.getSelectAllKeys(),selectedKeys=this.state.selectedKeys;return this._isSelectAll=allKeys.every((k=>selectedKeys.has(k))),this._isSelectAll}get firstSelectedKey(){let first=null;for(let key of this.state.selectedKeys){let item=this.collection.getItem(key);(!first||item&&$c5a24bc478652b5f$export$8c434b3a7a4dad6(this.collection,item,first)<0)&&(first=item)}return null==first?void 0:first.key}get lastSelectedKey(){let last=null;for(let key of this.state.selectedKeys){let item=this.collection.getItem(key);(!last||item&&$c5a24bc478652b5f$export$8c434b3a7a4dad6(this.collection,item,last)>0)&&(last=item)}return null==last?void 0:last.key}get disabledKeys(){return this.state.disabledKeys}get disabledBehavior(){return this.state.disabledBehavior}extendSelection(toKey){if("none"===this.selectionMode)return;if("single"===this.selectionMode)return void this.replaceSelection(toKey);let selection;if(toKey=this.getKey(toKey),"all"===this.state.selectedKeys)selection=new $e40ea825a81a3709$export$52baac22726c72bf([toKey],toKey,toKey);else{let selectedKeys=this.state.selectedKeys,anchorKey=selectedKeys.anchorKey||toKey;selection=new $e40ea825a81a3709$export$52baac22726c72bf(selectedKeys,anchorKey,toKey);for(let key of this.getKeyRange(anchorKey,selectedKeys.currentKey||toKey))selection.delete(key);for(let key of this.getKeyRange(toKey,anchorKey))this.canSelectItem(key)&&selection.add(key)}this.state.setSelectedKeys(selection)}getKeyRange(from,to){let fromItem=this.collection.getItem(from),toItem=this.collection.getItem(to);return fromItem&&toItem?$c5a24bc478652b5f$export$8c434b3a7a4dad6(this.collection,fromItem,toItem)<=0?this.getKeyRangeInternal(from,to):this.getKeyRangeInternal(to,from):[]}getKeyRangeInternal(from,to){let keys=[],key=from;for(;key;){let item=this.collection.getItem(key);if((item&&"item"===item.type||"cell"===item.type&&this.allowsCellSelection)&&keys.push(key),key===to)return keys;key=this.collection.getKeyAfter(key)}return[]}getKey(key){let item=this.collection.getItem(key);if(!item)return key;if("cell"===item.type&&this.allowsCellSelection)return key;for(;"item"!==item.type&&null!=item.parentKey;)item=this.collection.getItem(item.parentKey);return item&&"item"===item.type?item.key:null}toggleSelection(key){if("none"===this.selectionMode)return;if("single"===this.selectionMode&&!this.isSelected(key))return void this.replaceSelection(key);if(null==(key=this.getKey(key)))return;let keys=new $e40ea825a81a3709$export$52baac22726c72bf("all"===this.state.selectedKeys?this.getSelectAllKeys():this.state.selectedKeys);keys.has(key)?keys.delete(key):this.canSelectItem(key)&&(keys.add(key),keys.anchorKey=key,keys.currentKey=key),this.disallowEmptySelection&&0===keys.size||this.state.setSelectedKeys(keys)}replaceSelection(key){if("none"===this.selectionMode)return;if(null==(key=this.getKey(key)))return;let selection=this.canSelectItem(key)?new $e40ea825a81a3709$export$52baac22726c72bf([key],key,key):new $e40ea825a81a3709$export$52baac22726c72bf;this.state.setSelectedKeys(selection)}setSelectedKeys(keys){if("none"===this.selectionMode)return;let selection=new $e40ea825a81a3709$export$52baac22726c72bf;for(let key of keys)if(key=this.getKey(key),null!=key&&(selection.add(key),"single"===this.selectionMode))break;this.state.setSelectedKeys(selection)}getSelectAllKeys(){let keys=[],addKeys=key=>{for(;null!=key;){if(this.canSelectItem(key)){let item=this.collection.getItem(key);"item"===item.type&&keys.push(key),item.hasChildNodes&&(this.allowsCellSelection||"item"!==item.type)&&addKeys($c5a24bc478652b5f$export$fbdeaa6a76694f71((node=item,collection=this.collection,"function"==typeof collection.getChildren?collection.getChildren(node.key):node.childNodes)).key)}key=this.collection.getKeyAfter(key)}var node,collection};return addKeys(this.collection.getFirstKey()),keys}selectAll(){this.isSelectAll||"multiple"!==this.selectionMode||this.state.setSelectedKeys("all")}clearSelection(){!this.disallowEmptySelection&&("all"===this.state.selectedKeys||this.state.selectedKeys.size>0)&&this.state.setSelectedKeys(new $e40ea825a81a3709$export$52baac22726c72bf)}toggleSelectAll(){this.isSelectAll?this.clearSelection():this.selectAll()}select(key,e){"none"!==this.selectionMode&&("single"===this.selectionMode?this.isSelected(key)&&!this.disallowEmptySelection?this.toggleSelection(key):this.replaceSelection(key):"toggle"===this.selectionBehavior||e&&("touch"===e.pointerType||"virtual"===e.pointerType)?this.toggleSelection(key):this.replaceSelection(key))}isSelectionEqual(selection){if(selection===this.state.selectedKeys)return!0;let selectedKeys=this.selectedKeys;if(selection.size!==selectedKeys.size)return!1;for(let key of selection)if(!selectedKeys.has(key))return!1;for(let key of selectedKeys)if(!selection.has(key))return!1;return!0}canSelectItem(key){var _item_props;if("none"===this.state.selectionMode||this.state.disabledKeys.has(key))return!1;let item=this.collection.getItem(key);return!(!item||(null==item||null===(_item_props=item.props)||void 0===_item_props?void 0:_item_props.isDisabled)||"cell"===item.type&&!this.allowsCellSelection)}isDisabled(key){var _this_collection_getItem_props,_this_collection_getItem;return"all"===this.state.disabledBehavior&&(this.state.disabledKeys.has(key)||!!(null===(_this_collection_getItem=this.collection.getItem(key))||void 0===_this_collection_getItem||null===(_this_collection_getItem_props=_this_collection_getItem.props)||void 0===_this_collection_getItem_props?void 0:_this_collection_getItem_props.isDisabled))}isLink(key){var _this_collection_getItem_props,_this_collection_getItem;return!!(null===(_this_collection_getItem=this.collection.getItem(key))||void 0===_this_collection_getItem||null===(_this_collection_getItem_props=_this_collection_getItem.props)||void 0===_this_collection_getItem_props?void 0:_this_collection_getItem_props.href)}getItemProps(key){var _this_collection_getItem;return null===(_this_collection_getItem=this.collection.getItem(key))||void 0===_this_collection_getItem?void 0:_this_collection_getItem.props}constructor(collection,state,options){var _options_allowsCellSelection;this.collection=collection,this.state=state,this.allowsCellSelection=null!==(_options_allowsCellSelection=null==options?void 0:options.allowsCellSelection)&&void 0!==_options_allowsCellSelection&&_options_allowsCellSelection,this._isSelectAll=null}}class $eb2240fc39a57fa5$export$bf788dd355e3a401{build(props,context){return this.context=context,$eb2240fc39a57fa5$var$iterable((()=>this.iterateCollection(props)))}*iterateCollection(props){let{children,items}=props;if("function"==typeof children){if(!items)throw new Error("props.children was a function but props.items is missing");for(let item of props.items)yield*this.getFullNode({value:item},{renderer:children})}else{let items=[];react.Children.forEach(children,(child=>{items.push(child)}));let index=0;for(let item of items){let nodes=this.getFullNode({element:item,index},{});for(let node of nodes)index++,yield node}}}getKey(item,partialNode,state,parentKey){if(null!=item.key)return item.key;if("cell"===partialNode.type&&null!=partialNode.key)return`${parentKey}${partialNode.key}`;let v=partialNode.value;if(null!=v){var _v_key;let key=null!==(_v_key=v.key)&&void 0!==_v_key?_v_key:v.id;if(null==key)throw new Error("No key found for item");return key}return parentKey?`${parentKey}.${partialNode.index}`:`$.${partialNode.index}`}getChildState(state,partialNode){return{renderer:partialNode.renderer||state.renderer}}*getFullNode(partialNode,state,parentKey,parentNode){let element=partialNode.element;if(!element&&partialNode.value&&state&&state.renderer){let cached=this.cache.get(partialNode.value);if(cached&&(!cached.shouldInvalidate||!cached.shouldInvalidate(this.context)))return cached.index=partialNode.index,cached.parentKey=parentNode?parentNode.key:null,void(yield cached);element=state.renderer(partialNode.value)}if(react.isValidElement(element)){let type=element.type;if("function"!=typeof type&&"function"!=typeof type.getCollectionNode){let name="function"==typeof element.type?element.type.name:element.type;throw new Error(`Unknown element <${name}> in collection.`)}let childNodes=type.getCollectionNode(element.props,this.context),index=partialNode.index,result=childNodes.next();for(;!result.done&&result.value;){let childNode=result.value;partialNode.index=index;let nodeKey=childNode.key;nodeKey||(nodeKey=childNode.element?null:this.getKey(element,partialNode,state,parentKey));let children=[...this.getFullNode({...childNode,key:nodeKey,index,wrapper:$eb2240fc39a57fa5$var$compose(partialNode.wrapper,childNode.wrapper)},this.getChildState(state,childNode),parentKey?`${parentKey}${element.key}`:element.key,parentNode)];for(let node of children){if(node.value=childNode.value||partialNode.value,node.value&&this.cache.set(node.value,node),partialNode.type&&node.type!==partialNode.type)throw new Error(`Unsupported type <${$eb2240fc39a57fa5$var$capitalize(node.type)}> in <${$eb2240fc39a57fa5$var$capitalize(parentNode.type)}>. Only <${$eb2240fc39a57fa5$var$capitalize(partialNode.type)}> is supported.`);index++,yield node}result=childNodes.next(children)}return}if(null==partialNode.key)return;let builder=this,node={type:partialNode.type,props:partialNode.props,key:partialNode.key,parentKey:parentNode?parentNode.key:null,value:partialNode.value,level:parentNode?parentNode.level+1:0,index:partialNode.index,rendered:partialNode.rendered,textValue:partialNode.textValue,"aria-label":partialNode["aria-label"],wrapper:partialNode.wrapper,shouldInvalidate:partialNode.shouldInvalidate,hasChildNodes:partialNode.hasChildNodes,childNodes:$eb2240fc39a57fa5$var$iterable((function*(){if(!partialNode.hasChildNodes)return;let index=0;for(let child of partialNode.childNodes()){null!=child.key&&(child.key=`${node.key}${child.key}`),child.index=index;let nodes=builder.getFullNode(child,builder.getChildState(state,child),node.key,node);for(let node of nodes)index++,yield node}}))};yield node}constructor(){this.cache=new WeakMap}}function $eb2240fc39a57fa5$var$iterable(iterator){let cache=[],iterable=null;return{*[Symbol.iterator](){for(let item of cache)yield item;iterable||(iterable=iterator());for(let item of iterable)cache.push(item),yield item}}}function $eb2240fc39a57fa5$var$compose(outer,inner){return outer&&inner?element=>outer(inner(element)):outer||(inner||void 0)}function $eb2240fc39a57fa5$var$capitalize(str){return str[0].toUpperCase()+str.slice(1)}function $7613b1592d41b092$export$6cd28814d92fa9c9(props,factory,context){let builder=(0,react.useMemo)((()=>new $eb2240fc39a57fa5$export$bf788dd355e3a401),[]),{children,items,collection}=props;return(0,react.useMemo)((()=>{if(collection)return collection;let nodes=builder.build({children,items},context);return factory(nodes)}),[builder,children,items,collection,context,factory])}function $e72dd72e1c76a225$export$2f645645f7bca764(props){let{filter}=props,selectionState=$7af3f5b51489e0b5$export$253fe78d46329472(props),disabledKeys=(0,react.useMemo)((()=>props.disabledKeys?new Set(props.disabledKeys):new Set),[props.disabledKeys]),factory=(0,react.useCallback)((nodes=>filter?new(0,ListCollection.D)(filter(nodes)):new(0,ListCollection.D)(nodes)),[filter]),context=(0,react.useMemo)((()=>({suppressTextValueWarning:props.suppressTextValueWarning})),[props.suppressTextValueWarning]),collection=$7613b1592d41b092$export$6cd28814d92fa9c9(props,factory,context),selectionManager=(0,react.useMemo)((()=>new $d496c0a20b6e58ec$export$6c8a5aaad13c9852(collection,selectionState)),[collection,selectionState]);const cachedCollection=(0,react.useRef)(null);return(0,react.useEffect)((()=>{if(null!=selectionState.focusedKey&&!collection.getItem(selectionState.focusedKey)){const startItem=cachedCollection.current.getItem(selectionState.focusedKey),cachedItemNodes=[...cachedCollection.current.getKeys()].map((key=>{const itemNode=cachedCollection.current.getItem(key);return"item"===itemNode.type?itemNode:null})).filter((node=>null!==node)),itemNodes=[...collection.getKeys()].map((key=>{const itemNode=collection.getItem(key);return"item"===itemNode.type?itemNode:null})).filter((node=>null!==node)),diff=cachedItemNodes.length-itemNodes.length;let newNode,index=Math.min(diff>1?Math.max(startItem.index-diff+1,0):startItem.index,itemNodes.length-1),isReverseSearching=!1;for(;index>=0;){if(!selectionManager.isDisabled(itemNodes[index].key)){newNode=itemNodes[index];break}index<itemNodes.length-1&&!isReverseSearching?index++:(isReverseSearching=!0,index>startItem.index&&(index=startItem.index),index--)}selectionState.setFocusedKey(newNode?newNode.key:null)}cachedCollection.current=collection}),[collection,selectionManager,selectionState,selectionState.focusedKey]),{collection,disabledKeys,selectionManager}}}}]);