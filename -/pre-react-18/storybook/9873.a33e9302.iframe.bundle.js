"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[9873],{"./src/Collections/ItemStateContext.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>ItemStateContext});const ItemStateContext=__webpack_require__("../../node_modules/react/index.js").createContext(null)},"./src/Icon/LafIcon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>LafIcon});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Icon/StyledIconWrapper.tsx"),_useSvgIcon__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Icon/useSvgIcon.tsx"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs");const ICONS_DIR_PREFIX="com/intellij/ide/ui/laf/icons/";function useIconPath(iconDescriptor,themePath){const theme=(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.Fg)(),resolvedValue=themePath&&theme.value(themePath);if(resolvedValue)return resolvedValue;const{modifiers={},name}="string"==typeof iconDescriptor?{name:iconDescriptor}:iconDescriptor;return function findIconPath(theme,name,modifiers={}){return`${ICONS_DIR_PREFIX}${theme.isUnderDarcula()?"darcula/":"intellij/"}${name}${["Editable","Selected","Pressed","Focused","Disabled"].filter((modifier=>!modifiers.Disabled||!["Focused","Pressed"].includes(modifier))).reduce(((soFar,modifier)=>soFar+(modifiers[modifier]?modifier:"")),"")}.svg`}(theme,name,modifiers)}const LafIcon=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((({themePath,icon,size,...props},forwardedRef)=>{const resolvedIconPath=useIconPath(icon,themePath),ref=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.B)(forwardedRef);return(0,_useSvgIcon__WEBPACK_IMPORTED_MODULE_3__.Z)({path:`platform/platform-impl/src/${resolvedIconPath}`},ref),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_4__.M,{...props,ref,size})}));LafIcon.__docgenInfo={description:"",methods:[],displayName:"LafIcon",props:{size:{required:!1,tsType:{name:"union",raw:"16 | number",elements:[{name:"literal",value:"16"},{name:"number"}]},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""},className:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Additional node going into the icon wrapper. Such as indicators."},icon:{required:!0,tsType:{name:"union",raw:"string | { name: string; modifiers: IconModifiers }",elements:[{name:"string"},{name:"signature",type:"object",raw:"{ name: string; modifiers: IconModifiers }",signature:{properties:[{key:"name",value:{name:"string",required:!0}},{key:"modifiers",value:{name:"IconModifiers",required:!0}}]}}]},description:"Icon which will be resolved against the default icon location based on theme type"},themePath:{required:!1,tsType:{name:"string"},description:"A theme key that can optionally override the icon."}},composes:["Omit"]}},"./src/Icon/PlatformIcon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{qb:()=>amendName,vq:()=>PlatformIcon});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/styled.ts"),_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Icon/StyledIconWrapper.tsx"),_useSvgIcon__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Icon/useSvgIcon.tsx"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs");const amendName=(iconNameOrPath,amendment)=>{const[name,ext]=iconNameOrPath.split(".");return`${name}${amendment}${ext?`.${ext}`:""}`},getPlatformIconPath=relativePath=>relativePath.startsWith("/")?relativePath.slice(1):`platform/icons/src/${relativePath}`,PlatformIcon=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((({icon,darkIcon,...props},forwardedRef)=>{const ref=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.B)(forwardedRef),iconName=(0,_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_2__.Fg)().dark?((path,darkPath)=>{const[name,ext]=path.split(".");return darkPath||`${name}_dark${ext?`.${ext}`:""}`})(icon,darkIcon):icon;return(0,_useSvgIcon__WEBPACK_IMPORTED_MODULE_3__.Z)({path:getPlatformIconPath(iconName),fallbackPath:getPlatformIconPath(icon)},ref),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_4__.M,{...props,ref})}));PlatformIcon.__docgenInfo={description:'Renders an icon from the predefined list of platform icons.\nicon name must follow the directory structure in platform icons.\n@example <PlatformIcon icon="general/hideToolWindow" />\n@example <PlatformIcon icon="toolbar/pin" />\n@example <PlatformIcon icon="toolbar/pin.svg" />\n@example <PlatformIcon icon="/platform/dvcs-impl/resources/icons/currentBranchLabel.svg" />',methods:[],displayName:"PlatformIcon",props:{size:{required:!1,tsType:{name:"union",raw:"16 | number",elements:[{name:"literal",value:"16"},{name:"number"}]},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""},className:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Additional node going into the icon wrapper. Such as indicators."},icon:{required:!0,tsType:{name:"string"},description:'Icon path in intellij platform repo.\nIf starts with "/", the path will be from the repo root. Otherwise, it\'s relative to "platform/icons/src".\n".svg" extension is optional.'},darkIcon:{required:!1,tsType:{name:"string"},description:"Similar to icon, but for dark themes."}},composes:["Omit"]}},"./src/Icon/StyledIconWrapper.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>StyledIconWrapper});var _styled__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styled.ts");const StyledIconWrapper=_styled__WEBPACK_IMPORTED_MODULE_0__.zo.span`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  width: ${({size=16})=>`${size}px`};
  height: ${({size=16})=>`${size}px`};
  position: relative; // to allow absolute positioned indicators and overlays on icon
  cursor: ${({role})=>"button"===role?"pointer":void 0};
`},"./src/Icon/useSvgIcon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>useSvgIcon});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/styled.ts"),_intellij_platform_core_Collections__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Collections/ItemStateContext.tsx");function useSvgIcon({path,fallbackPath},ref){const theme=(0,_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__.Fg)(),itemState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_intellij_platform_core_Collections__WEBPACK_IMPORTED_MODULE_2__.k),selected=itemState?.isSelected||itemState?.isContainerFocused;(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{let canceled=!1;return(async()=>{if(!path)return void console.error("icon path is empty");ref.current&&(ref.current.ariaBusy="true");const svg=await theme.getSvgIcon(path,selected).catch((e=>{if(fallbackPath)return theme.getSvgIcon(fallbackPath,selected);throw e})).finally((()=>{ref?.current&&!canceled&&(ref.current.ariaBusy="false")}));if(svg){const element=ref?.current;if(!canceled&&element){element.querySelector("svg")?.remove();const svgElement=document.createElement("svg");element.appendChild(svgElement),svgElement.outerHTML=function makeIdsUnique(svg){const randomPostfix=(1e3*Math.random()).toFixed(0),idMatches=svg.matchAll(/id="(.*?)"/g);return[...idMatches].reduce(((modifiedSvg,[_,id])=>{const newId=`${id}-${randomPostfix}`;return replaceAll(`id="${id}"`,`id="${newId}"`,replaceAll(`url(#${id})`,`url(#${newId})`,modifiedSvg))}),svg)}(svg)}}else console.error("Could not resolve icon:",path)})().catch(console.error),()=>{canceled=!0}}),[path,selected])}function replaceAll(theOld,theNew,str){const replaced=str.replace(theOld,theNew),replacedAgain=replaced.replace(theOld,theNew);return replaced===replacedAgain?replaced:replaceAll(theOld,theNew,replacedAgain)}},"./src/Tree/useTreeState.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>useTreeState});var react=__webpack_require__("../../node_modules/react/index.js"),useLatest=__webpack_require__("./src/utils/useLatest.ts");var useMultipleSelectionState=__webpack_require__("../../node_modules/@react-stately/selection/dist/useMultipleSelectionState.mjs"),useCollection=__webpack_require__("../../node_modules/@react-stately/collections/dist/useCollection.mjs"),useControlledState=__webpack_require__("../../node_modules/@react-stately/utils/dist/useControlledState.mjs"),usePrevious=__webpack_require__("./src/utils/usePrevious.ts");const useCollectionCacheInvalidation=({cacheInvalidation})=>{const invalidators="object"==typeof cacheInvalidation?cacheInvalidation.invalidators:[],lastInvalidators=(0,usePrevious.D)(invalidators);return{invalidated:"object"==typeof cacheInvalidation?cacheInvalidation.invalidators.length!==lastInvalidators.length||cacheInvalidation.invalidators.some(((anInvalidator,index)=>anInvalidator!==lastInvalidators[index])):cacheInvalidation}};class _copied_TreeCollection_TreeCollection{keyMap=new Map;iterable;firstKey;lastKey;constructor(nodes,{expandedKeys}={}){this.iterable=nodes,expandedKeys=expandedKeys||new Set;let last,visit=node=>{if(this.keyMap.set(node.key,node),node.childNodes&&("section"===node.type||expandedKeys.has(node.key)))for(let child of node.childNodes)visit(child)};for(let node of nodes)visit(node);let index=0;for(let[key,node]of this.keyMap)last?(last.nextKey=key,node.prevKey=last.key):(this.firstKey=key,node.prevKey=void 0),"item"===node.type&&(node.index=index++),last=node,last.nextKey=void 0;this.lastKey=last?.key}*[Symbol.iterator](){yield*this.iterable}get size(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(key){let node=this.keyMap.get(key);return node?.prevKey??null}getKeyAfter(key){let node=this.keyMap.get(key);return node?.nextKey??null}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(key){return this.keyMap.get(key)??null}at(idx){const keys=[...this.getKeys()];return this.getItem(keys[idx])}}function getSingleChildrenKeys(node){return getSingleChildrenKeysRecursive(node,[])}function getSingleChildrenKeysRecursive(node,previousKeys){if(!node)return[];const childNodesIterator=node.childNodes[Symbol.iterator](),{value:firstChild,done}=childNodesIterator.next(),noMoreChildren=done||null==childNodesIterator.next().value;return null!=firstChild&&noMoreChildren&&isExpandable(firstChild)?getSingleChildrenKeysRecursive(firstChild,previousKeys.concat(firstChild.key)):previousKeys}const isExpandable=node=>node.hasChildNodes||!function isEmptyIterable(iterable){for(const _ of iterable||[])return!1;return!0}(node.childNodes);var SelectionManager=__webpack_require__("../../node_modules/@react-stately/selection/dist/SelectionManager.mjs");class TreeSelectionManager extends SelectionManager.Z{collection;constructor(collection,state,options){super(collection,state,options),this.collection=collection}expandSelection(){if(this.focusedKey){const node=this.collection.getItem(this.focusedKey);if(node){const{expandKeys}=this.getExpandAndShrinkKeys(node);expandKeys.length>0&&this.setSelectedKeys([...this.selectedKeys,...expandKeys])}}}shrinkSelection(){if(this.focusedKey){const node=this.collection.getItem(this.focusedKey);if(node){const{shrinkKeys}=this.getExpandAndShrinkKeys(node);shrinkKeys.length>0&&this.setSelectedKeys([...this.selectedKeys].filter((key=>!shrinkKeys.includes(key))))}}}getExpandAndShrinkKeys(node){return this.recursivelyGetExpandAndShrinkKeys(node,[...this.collection.getKeys()],null)}recursivelyGetExpandAndShrinkKeys(node,keys,previousChild){const parent=node&&node.parentKey?this.collection.getItem(node.parentKey):null,newKeys=keys.filter((key=>key!==previousChild)),parentDescendants=parent?getAllDescendants(parent,newKeys).map((({key})=>key)):this.getAllRoots().flatMap((key=>{const item=this.collection.getItem(key);return key!==node.key&&item?getAllDescendants(item,newKeys).map((({key})=>key)).concat(key):[]}));if(parent&&parentDescendants.every((key=>this.isSelected(key))))return this.recursivelyGetExpandAndShrinkKeys(parent,keys,node.key);const descendants=getAllDescendants(node,keys.filter((key=>key!==previousChild))).map((({key})=>key));return{expandKeys:descendants.some((key=>!this.isSelected(key)))?descendants:this.isSelected(node.key)?parentDescendants:[node.key],shrinkKeys:parentDescendants.length>0&&parentDescendants.every((key=>this.isSelected(key)))?parentDescendants:this.isSelected(node.key)&&previousChild?[node.key]:descendants.filter((key=>this.isSelected(key)))}}getAllRoots(){return[...this.collection.getKeys()].filter((key=>null==this.collection.getItem(key)?.parentKey))}}function getAllDescendants(node,stopKeys){const childNodes=(node.hasChildNodes?[...node.childNodes]:[]).filter((node=>stopKeys.includes(node.key)));return node.hasChildNodes?childNodes.concat(childNodes.map((node=>getAllDescendants(node,stopKeys))).flat()):[]}var array_utils=__webpack_require__("./src/utils/array-utils.ts");class TreeCollection extends _copied_TreeCollection_TreeCollection{rootKeys;constructor(nodes,{expandedKeys}){super(nodes,{expandedKeys}),this.rootKeys=Array.from(nodes).map((({key})=>key))}getAllExpandableKeys(){const rootNodes=this.rootKeys.map((key=>this.getItem(key))).filter(array_utils.N);return this.recursivelyAddExpandableKeys(rootNodes,new Set)}recursivelyAddExpandableKeys(nodes,result){for(const node of nodes)node?.hasChildNodes&&(result.add(node.key),this.recursivelyAddExpandableKeys(node.childNodes,result));return result}}function useTreeState({childExpansionBehaviour="multi",...props},treeRef){let[expandedKeys,setExpandedKeys]=(0,useControlledState.z)(props.expandedKeys?new Set(props.expandedKeys):void 0,props.defaultExpandedKeys?new Set(props.defaultExpandedKeys):new Set,props.onExpandedChange),selectionState=(0,useMultipleSelectionState.q)({...props,selectionBehavior:"replace"}),disabledKeys=(0,react.useMemo)((()=>props.disabledKeys?new Set(props.disabledKeys):new Set),[props.disabledKeys]);const context=useCollectionCacheInvalidation(props);let tree=(0,useCollection.K)(props,(0,react.useCallback)((nodes=>new TreeCollection(nodes,{expandedKeys})),[expandedKeys]),context);const selectionManager=new TreeSelectionManager(tree,selectionState);!function useTreeRef(props,forwardedRef){const latestState=(0,useLatest.d)(props);(0,react.useImperativeHandle)(forwardedRef,(()=>({replaceSelection:key=>{latestState.current.selectionManager.replaceSelection(key)},focus:key=>{const selectionManager=latestState.current.selectionManager;selectionManager.setFocused(!0),selectionManager.setFocusedKey(null),setTimeout((()=>{selectionManager.setFocusedKey(key)}))},expandSelection(){latestState.current.selectionManager.expandSelection()},shrinkSelection(){latestState.current.selectionManager.shrinkSelection()},expandAll(){latestState.current.setExpandedKeys(latestState.current.tree.getAllExpandableKeys())},collapseAll(){const{tree,setExpandedKeys,selectionManager}=latestState.current,focusedKey=selectionManager.focusedKey;if(setExpandedKeys(new Set),focusedKey&&!tree.rootKeys.includes(focusedKey)){let item=tree.getItem(focusedKey);for(;null!=item?.parentKey;)item=tree.getItem(item.parentKey);item&&(selectionManager.setFocusedKey(item.key),selectionManager.isSelected(focusedKey)&&selectionManager.select(item.key))}}})),[])}({selectionManager,setExpandedKeys,tree},treeRef),(0,react.useEffect)((()=>{null==selectionState.focusedKey||tree.getItem(selectionState.focusedKey)||selectionState.setFocusedKey(null)}),[tree,selectionState.focusedKey]);return{collection:tree,expandedKeys,disabledKeys,toggleKey:key=>{let newExpandedKeys=toggleTreeNode(tree,expandedKeys,key);if("single"===childExpansionBehaviour){const expandedSiblings=function getSiblings(tree,key){const parentKey=tree.getItem(key)?.parentKey;if(!parentKey)return[...tree.rootKeys].concat(getRootItemKeys(tree));let parent=parentKey?tree.getItem(parentKey):null;if("item"===parent?.type)return getChildItems(parent).map((({key})=>key));const siblings=[];for(;parent;)siblings.push(...getChildItems(parent).map((({key})=>key))),"section"===parent.type?parent.parentKey?parent=tree.getItem(parent.parentKey):(siblings.push(...getRootItemKeys(tree)),parent=null):parent=null;return Array.from(new Set(siblings))}(tree,key).filter((aKey=>aKey!==key&&expandedKeys.has(aKey)));newExpandedKeys=expandedSiblings.reduce(((expandedKeys,expandedKey)=>toggleTreeNode(tree,expandedKeys,expandedKey)),newExpandedKeys)}setExpandedKeys(newExpandedKeys)},selectionManager,setExpandedKeys}}function getChildItems(node){const childNodes=[...node.childNodes||[]],childItems=childNodes.filter((({type})=>"item"===type)),sectionItems=childNodes.filter((({type})=>"section"===type));return childItems.concat(sectionItems.flatMap(getChildItems))}function getRootItemKeys(tree){return tree.rootKeys.map((key=>tree.getItem(key))).filter(array_utils.N).flatMap(getChildItems).map((({key})=>key))}function toggleTreeNode(tree,expandedKeys,key){if(!expandedKeys.has(key)&&!tree.getItem(key)?.hasChildNodes)return expandedKeys;const newKeys=function toggleKey(set,key){let res=new Set(set);res.has(key)?res.delete(key):res.add(key);return res}(expandedKeys,key);for(const aKey of newKeys)null==tree.getItem(aKey)&&newKeys.delete(aKey);if(newKeys.has(key))for(const aKey of getSingleChildrenKeys(tree.getItem(key)))newKeys.add(aKey);return newKeys}},"./src/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Fg:()=>useTheme,iv:()=>css,zo:()=>styled});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const styled=styled_components__WEBPACK_IMPORTED_MODULE_0__.ZP,useTheme=styled_components__WEBPACK_IMPORTED_MODULE_0__.Fg,css=styled_components__WEBPACK_IMPORTED_MODULE_0__.iv;styled_components__WEBPACK_IMPORTED_MODULE_0__.Sf},"./src/utils/array-utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{N:()=>notNull});const notNull=item=>null!=item},"./src/utils/useLatest.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>useLatest});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function useLatest(value){const ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(value);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)((()=>{ref.current=value})),ref}},"./src/utils/usePrevious.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>usePrevious});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function usePrevious(value){const ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(value);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{ref.current=value}),[value]),ref.current}}}]);
//# sourceMappingURL=9873.a33e9302.iframe.bundle.js.map