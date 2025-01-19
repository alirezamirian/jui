"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[7619],{"./src/Collections/Divider.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}__webpack_require__.d(__webpack_exports__,{P:()=>DividerItem,i:()=>_Divider});class DividerItem{constructor(){_defineProperty(this,"key","divider_"+DividerItem.seq++)}get id(){return this.key}}function Divider({}){return null}_defineProperty(DividerItem,"seq",0);let _Divider=Divider;Divider.getCollectionNode=function*getCollectionNode(props){yield{type:"divider",element:null,props,rendered:null,hasChildNodes:!1}}},"./src/List/ListContext.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ListContext});const ListContext=__webpack_require__("../../node_modules/react/index.js").createContext(null)},"./src/List/ListItem.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{H:()=>ListItem});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_selection__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/selection/useSelectableItem.tsx"),_intellij_platform_core_Collections__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/Collections/ItemStateContext.tsx"),_StyledListItem__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/List/StyledListItem.tsx"),_intellij_platform_core_List_ListContext__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/List/ListContext.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");function ListItem({item,children}){const{state,focused:listFocused,onAction}=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_intellij_platform_core_List_ListContext__WEBPACK_IMPORTED_MODULE_2__.Z),ref=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),isDisabled=state.disabledKeys.has(item.key),isSelected=state.selectionManager.isSelected(item.key),{itemProps}=(0,_intellij_platform_core_selection__WEBPACK_IMPORTED_MODULE_3__.C)({key:item.key,ref,onAction:()=>onAction?.(item.key),selectionManager:state.selectionManager});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_StyledListItem__WEBPACK_IMPORTED_MODULE_4__.o,{containerFocused:listFocused,selected:isSelected,disabled:isDisabled,"aria-disabled":isDisabled,"aria-selected":isSelected,"aria-label":item["aria-label"],...itemProps,ref,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core_Collections__WEBPACK_IMPORTED_MODULE_5__.k.Provider,{value:{isDisabled,isSelected,isContainerFocused:listFocused,node:item},children:children||item.rendered})})}ListItem.displayName="ListItem";try{ListItem.displayName="ListItem",ListItem.__docgenInfo={description:"",displayName:"ListItem",props:{item:{defaultValue:null,description:"",name:"item",required:!0,type:{name:"Node<T>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/List/ListItem.tsx#ListItem"]={docgenInfo:ListItem.__docgenInfo,name:"ListItem",path:"src/List/ListItem.tsx#ListItem"})}catch(__react_docgen_typescript_loader_error){}},"./src/List/story-helpers.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$q:()=>renderItemCustomUI,au:()=>renderItemText,nc:()=>renderItemTextWithHighlights,pG:()=>itemRenderer,zt:()=>commonListStories});var _test_data__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./test-data.ts"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Collections/Item.ts"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Collections/Divider.ts"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-stately/collections/dist/Section.mjs"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/CollectionSpeedSearch/HighlightedTextValue.tsx"),_story_components__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/story-components.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const renderItemCustomUI=(item,content)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:item.name,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{style:{height:40,display:"flex",alignItems:"center"},children:["🎸  ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("b",{children:content||item.name})]})},item.name);renderItemCustomUI.displayName="renderItemCustomUI";const itemRenderer=(renderItem,content)=>item=>item instanceof _intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.P?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.i,{},item.key):"items"in item?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__.$,{items:item.items,title:item.title,children:item=>renderItem(item,content)},item.title):renderItem(item,content),renderItemText=item=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:item.name,children:item.name},item.name);renderItemText.displayName="renderItemText";const renderItemTextWithHighlights=item=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:item.name,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__.J,{})},item.name);renderItemTextWithHighlights.displayName="renderItemTextWithHighlights";const commonListStories={withConnectedInput:ListCmp=>props=>{const inputRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),[isFocused,setIsFocused]=react__WEBPACK_IMPORTED_MODULE_0__.useState(!1),listRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_story_components__WEBPACK_IMPORTED_MODULE_6__.X6,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input",{ref:inputRef,onFocus:()=>setIsFocused(!0),onBlur:()=>setIsFocused(!1)}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ListCmp,{ref:listRef,focusProxyRef:inputRef,selectionMode:"single",items:_test_data__WEBPACK_IMPORTED_MODULE_7__.m,showAsFocused:isFocused,fillAvailableSpace:!0,...props,children:itemRenderer(renderItemText)})]})}};try{renderItemText.displayName="renderItemText",renderItemText.__docgenInfo={description:"",displayName:"renderItemText",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/List/story-helpers.tsx#renderItemText"]={docgenInfo:renderItemText.__docgenInfo,name:"renderItemText",path:"src/List/story-helpers.tsx#renderItemText"})}catch(__react_docgen_typescript_loader_error){}try{renderItemTextWithHighlights.displayName="renderItemTextWithHighlights",renderItemTextWithHighlights.__docgenInfo={description:"",displayName:"renderItemTextWithHighlights",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/List/story-helpers.tsx#renderItemTextWithHighlights"]={docgenInfo:renderItemTextWithHighlights.__docgenInfo,name:"renderItemTextWithHighlights",path:"src/List/story-helpers.tsx#renderItemTextWithHighlights"})}catch(__react_docgen_typescript_loader_error){}},"./src/List/useList.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>useList});var react=__webpack_require__("../../node_modules/react/index.js"),ListKeyboardDelegate=__webpack_require__("../../node_modules/@react-aria/selection/dist/ListKeyboardDelegate.mjs"),useCollator=__webpack_require__("../../node_modules/@react-aria/i18n/dist/useCollator.mjs"),useSelectableCollection=__webpack_require__("./src/selection/useSelectableCollection.ts"),useCollectionAutoScroll=__webpack_require__("./src/Collections/useCollectionAutoScroll.ts");var useFocusWithin=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocusWithin.mjs"),mergeProps=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),useEventCallback=__webpack_require__("./src/utils/useEventCallback.ts"),useCollectionFocusProxy=__webpack_require__("./src/Collections/useCollectionFocusProxy.ts");function useList({onAction,showAsFocused,focusProxyRef,...props},state,ref){const{listProps:{onMouseDown,...listProps}}=function useSelectableList(props){let{selectionManager,collection,disabledKeys,ref,keyboardDelegate,autoFocus,shouldFocusWrap,isVirtualized,disallowEmptySelection,selectOnFocus=!1,disallowTypeAhead,shouldUseVirtualFocus,allowsTabNavigation}=props,collator=(0,useCollator.X)({usage:"search",sensitivity:"base"}),delegate=(0,react.useMemo)((()=>keyboardDelegate||new ListKeyboardDelegate.d(collection,disabledKeys,ref,collator)),[keyboardDelegate,collection,disabledKeys,ref,collator]);(0,useCollectionAutoScroll.E)({isVirtualized,selectionManager},ref);let{collectionProps}=(0,useSelectableCollection.g)({ref,selectionManager,keyboardDelegate:delegate,autoFocus,shouldFocusWrap,disallowEmptySelection,selectOnFocus,disallowTypeAhead,shouldUseVirtualFocus,allowsTabNavigation});return{listProps:collectionProps}}({...props,ref,selectionManager:state.selectionManager,disallowEmptySelection:!props.allowEmptySelection,collection:state.collection,disabledKeys:state.disabledKeys,selectOnFocus:!0});(0,useCollectionFocusProxy.Q)({focusProxyRef,onAction,state,collectionRef:ref});const[focused,setFocused]=(0,react.useState)(!1),{focusWithinProps}=(0,useFocusWithin.L)({onFocusWithinChange:setFocused});(0,react.useEffect)((()=>{const firstKey=state.collection.getFirstKey();!props.allowEmptySelection&&state.selectionManager.isEmpty&&firstKey&&(state.selectionManager.setFocusedKey(firstKey),state.selectionManager.select(firstKey))}),[!props.allowEmptySelection]);const onActionCallback=(0,useEventCallback.$)(onAction??(()=>{})),listContext=(0,react.useMemo)((()=>({state,focused:Boolean(focused||showAsFocused),onAction:onActionCallback})),[state,focused,showAsFocused]);return{listProps:(0,mergeProps.d)(listProps,focusWithinProps),listContext,focused}}},"./src/List/useListState.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>useListState_useListState});var useListState=__webpack_require__("../../node_modules/@react-stately/list/dist/useListState.mjs"),react=__webpack_require__("../../node_modules/react/index.js");function useListState_useListState(props){const state=(0,useListState.n)({...props,selectionBehavior:"replace"});return function useCollectionRef({selectionManagerRef},state){(0,react.useImperativeHandle)(selectionManagerRef,(()=>state.selectionManager))}(props,state),state}},"./src/List/useListVirtualizer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{g:()=>useListVirtualizer});var react=__webpack_require__("../../node_modules/react/index.js"),VariableWidthListLayout=__webpack_require__("./src/VariableWidthListLayout.tsx"),dist_module=__webpack_require__("../../node_modules/@react-aria/virtualizer/dist/module.js");const StyledListSectionHeader=__webpack_require__("./src/styled.ts").zo.div((({theme})=>({paddingLeft:8,fontWeight:"bold",lineHeight:"20px",outline:"none",cursor:"default",color:theme.color("*.textForeground",theme.color("*.foreground"))})));try{StyledListSectionHeader.displayName="StyledListSectionHeader",StyledListSectionHeader.__docgenInfo={description:"",displayName:"StyledListSectionHeader",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme<KnownThemePropertyPath>"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/List/StyledListSectionHeader.tsx#StyledListSectionHeader"]={docgenInfo:StyledListSectionHeader.__docgenInfo,name:"StyledListSectionHeader",path:"src/List/StyledListSectionHeader.tsx#StyledListSectionHeader"})}catch(__react_docgen_typescript_loader_error){}var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function ListSection({reusableView,header,children}){const headerRef=(0,react.useRef)(null);return(0,dist_module.x)({reusableView:header,ref:headerRef}),(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(StyledListSectionHeader,{role:"presentation",ref:headerRef,style:(0,dist_module._2)(header.layoutInfo,"ltr"),children:reusableView.content.rendered}),(0,jsx_runtime.jsx)("div",{style:(0,dist_module._2)(reusableView.layoutInfo,"ltr"),children},reusableView.key)]})}const renderWrapper=(parent,reusableView,children,renderChildren)=>"section"===reusableView.viewType?(0,jsx_runtime.jsx)(ListSection,{reusableView,header:children.find((c=>"header"===c.viewType)),children:renderChildren(children.filter((c=>"item"===c.viewType)))},reusableView.key):(0,jsx_runtime.jsx)(dist_module.pH,{reusableView,parent:parent??void 0},reusableView.key);renderWrapper.displayName="renderWrapper";var ListDivider=__webpack_require__("./src/List/ListDivider.tsx");const useListVirtualizer=({renderItem,estimatedItemHeight=20,state})=>{const layout=(0,react.useMemo)((()=>new VariableWidthListLayout.T({estimatedRowHeight:estimatedItemHeight,estimatedHeadingHeight:20,dividerHeight:2})),[]);return layout.collection=state.collection,layout.disabledKeys=state.disabledKeys,{virtualizerProps:{focusedKey:state.selectionManager.focusedKey,collection:state.collection,layout,sizeToFit:"height",scrollToItem:key=>layout.virtualizer.scrollToItem(key,{shouldScrollX:!1,duration:0}),children:(type,item)=>"item"===type?renderItem(item):"divider"===type?(0,jsx_runtime.jsx)(ListDivider.R,{},item.key):void 0,renderWrapper,scrollDirection:"both"}}};try{useListVirtualizer.displayName="useListVirtualizer",useListVirtualizer.__docgenInfo={description:"",displayName:"useListVirtualizer",props:{renderItem:{defaultValue:null,description:"",name:"renderItem",required:!0,type:{name:"(item: ItemNode<T>) => ReactNode"}},estimatedItemHeight:{defaultValue:{value:"20"},description:"",name:"estimatedItemHeight",required:!1,type:{name:"number"}},state:{defaultValue:null,description:"",name:"state",required:!0,type:{name:"ListState<T>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/List/useListVirtualizer.tsx#useListVirtualizer"]={docgenInfo:useListVirtualizer.__docgenInfo,name:"useListVirtualizer",path:"src/List/useListVirtualizer.tsx#useListVirtualizer"})}catch(__react_docgen_typescript_loader_error){}},"./src/Tree/story-helpers.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$0:()=>staticTreeItems,Yc:()=>treeItems,ee:()=>staticSpeedSearchTreeItems});__webpack_require__("../../node_modules/react/index.js");var _react_stately_collections__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-stately/collections/dist/Item.mjs"),_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/CollectionSpeedSearch/HighlightedTextValue.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const treeItems=[{name:"index.ts"},{name:"List",children:[{name:"BasicList",children:[{name:"BasicList.stories.tsx"},{name:"BasicList.tsx"},{name:"BasicListItem.tsx"},{name:"useBasicList.ts"}]},{name:"SpeedSearchList",children:[{name:"SpeedSearchList.stories.tsx"},{name:"SpeedSearchList.tsx"},{name:"SpeedSearchListItem.tsx"},{name:"useSpeedSearchList.ts"}]},{name:"ListDivider.tsx"}]},{name:"Theme",children:[{name:"createTheme.ts"}]}],staticTreeItems=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"index.ts",children:"index.ts"},"index.ts"),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"List",title:"List",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"BasicList",title:"BasicList",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"BasicList.stories.tsx",children:"BasicList.stories.tsx"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"BasicList.tsx",children:"BasicList.tsx"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"BasicListItem.tsx",children:"BasicListItem.tsx"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"useBasicList.ts",children:"useBasicList.ts"})]},"BasicList"),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"SpeedSearchList",title:"SpeedSearchList",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"SpeedSearchList.stories.tsx",children:"SpeedSearchList.stories.tsx"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"SpeedSearchList.tsx",children:"SpeedSearchList.tsx"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"SpeedSearchListItem.tsx",children:"SpeedSearchListItem.tsx"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"useSpeedSearchList.ts",children:"useSpeedSearchList.ts"})]},"SpeedSearchList"),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"ListDivider.tsx",children:"ListDivider.tsx"})]},"List"),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"Theme",title:"Theme",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"createTheme.ts",children:"createTheme.ts"})},"Theme")]}).props.children,staticSpeedSearchTreeItems=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"index.ts",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_3__.J,{})},"index.ts"),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"List",title:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_3__.J,{}),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"BasicList",title:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_3__.J,{}),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"BasicList.stories.tsx",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_3__.J,{})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"BasicList.tsx",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_3__.J,{})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"BasicListItem.tsx",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_3__.J,{})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"useBasicList.ts",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_3__.J,{})})]},"BasicList"),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"SpeedSearchList",title:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_3__.J,{}),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"SpeedSearchList.stories.tsx",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_3__.J,{})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"SpeedSearchList.tsx",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_3__.J,{})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"SpeedSearchListItem.tsx",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_3__.J,{})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"useSpeedSearchList.ts",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_3__.J,{})})]},"SpeedSearchList"),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"ListDivider.tsx",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_3__.J,{})})]},"List"),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"Theme",title:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_3__.J,{}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_2__.c,{textValue:"createTheme.ts",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CollectionSpeedSearch__WEBPACK_IMPORTED_MODULE_3__.J,{})})},"Theme")]}).props.children},"./src/story-components.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G8:()=>SelectionLog,H4:()=>SpeedSearchTreeSample,W2:()=>Container,X6:()=>Pane});__webpack_require__("../../node_modules/react/index.js");var _styled__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/styled.ts"),_intellij_platform_core_Tree__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Tree/SpeedSearchTree/SpeedSearchTree.tsx"),_intellij_platform_core_Tree_story_helpers__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Tree/story-helpers.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const Container=_styled__WEBPACK_IMPORTED_MODULE_2__.zo.div`
  color: ${({theme})=>theme.color("*.foreground")};
`,Pane=props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{display:"flex",flexDirection:"column",width:400,marginTop:25,height:"calc(100vh - 70px)"},...props});function SelectionLog({selection}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("pre",{children:[selection instanceof Set&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{children:JSON.stringify([...selection],null,2)}),JSON.stringify(selection,null,2)]})}Pane.displayName="Pane",SelectionLog.displayName="SelectionLog";const SpeedSearchTreeSample=({selectedKeys,defaultSelectedKeys=["BasicList"],onSelectedKeysChange,treeRef})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core_Tree__WEBPACK_IMPORTED_MODULE_3__.b,{treeRef,autoFocus:!0,fillAvailableSpace:!0,selectionMode:"multiple",defaultExpandedKeys:["List","Theme","BasicList","Foo"],selectedKeys,defaultSelectedKeys:new Set(defaultSelectedKeys),onSelectionChange:onSelectedKeysChange,children:_intellij_platform_core_Tree_story_helpers__WEBPACK_IMPORTED_MODULE_4__.ee});SpeedSearchTreeSample.displayName="SpeedSearchTreeSample";try{SelectionLog.displayName="SelectionLog",SelectionLog.__docgenInfo={description:"",displayName:"SelectionLog",props:{selection:{defaultValue:null,description:"",name:"selection",required:!0,type:{name:"Selection"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/story-components.tsx#SelectionLog"]={docgenInfo:SelectionLog.__docgenInfo,name:"SelectionLog",path:"src/story-components.tsx#SelectionLog"})}catch(__react_docgen_typescript_loader_error){}try{Container.displayName="Container",Container.__docgenInfo={description:"",displayName:"Container",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme<KnownThemePropertyPath>"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/story-components.tsx#Container"]={docgenInfo:Container.__docgenInfo,name:"Container",path:"src/story-components.tsx#Container"})}catch(__react_docgen_typescript_loader_error){}try{Pane.displayName="Pane",Pane.__docgenInfo={description:"",displayName:"Pane",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/story-components.tsx#Pane"]={docgenInfo:Pane.__docgenInfo,name:"Pane",path:"src/story-components.tsx#Pane"})}catch(__react_docgen_typescript_loader_error){}try{SpeedSearchTreeSample.displayName="SpeedSearchTreeSample",SpeedSearchTreeSample.__docgenInfo={description:"",displayName:"SpeedSearchTreeSample",props:{selectedKeys:{defaultValue:null,description:"",name:"selectedKeys",required:!1,type:{name:"SelectedKeysType"}},defaultSelectedKeys:{defaultValue:{value:'["BasicList"]'},description:"",name:"defaultSelectedKeys",required:!1,type:{name:"SelectedKeysType"}},onSelectedKeysChange:{defaultValue:null,description:"",name:"onSelectedKeysChange",required:!1,type:{name:"((selectedKeys: Selection) => void)"}},treeRef:{defaultValue:null,description:"",name:"treeRef",required:!1,type:{name:"RefObject<TreeRefValue>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/story-components.tsx#SpeedSearchTreeSample"]={docgenInfo:SpeedSearchTreeSample.__docgenInfo,name:"SpeedSearchTreeSample",path:"src/story-components.tsx#SpeedSearchTreeSample"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/useEventCallback.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$:()=>useEventCallback});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function useEventCallback(fn){let ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();(0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)((()=>{ref.current=fn}));return(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(((...args)=>ref.current?.apply(null,args)),[])}},"./test-data.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{m:()=>legends});var _src_Collections_Divider__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/Collections/Divider.ts");const legends=[{name:"Paco de Lucia"},{name:"Vicente Amigo"},new _src_Collections_Divider__WEBPACK_IMPORTED_MODULE_0__.P,{name:"Gerardo Nunez"},{name:"Paco Serrano"},new _src_Collections_Divider__WEBPACK_IMPORTED_MODULE_0__.P,{name:"Sabicas"},{title:"Super legends",items:[{name:"Sabicas2"}]},{name:"Pepe Habichuela"},{name:"El Amir"},{name:"Paco Peña"}]},"./node_modules/ramda/es/internal/_arity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _arity(n,fn){switch(n){case 0:return function(){return fn.apply(this,arguments)};case 1:return function(a0){return fn.apply(this,arguments)};case 2:return function(a0,a1){return fn.apply(this,arguments)};case 3:return function(a0,a1,a2){return fn.apply(this,arguments)};case 4:return function(a0,a1,a2,a3){return fn.apply(this,arguments)};case 5:return function(a0,a1,a2,a3,a4){return fn.apply(this,arguments)};case 6:return function(a0,a1,a2,a3,a4,a5){return fn.apply(this,arguments)};case 7:return function(a0,a1,a2,a3,a4,a5,a6){return fn.apply(this,arguments)};case 8:return function(a0,a1,a2,a3,a4,a5,a6,a7){return fn.apply(this,arguments)};case 9:return function(a0,a1,a2,a3,a4,a5,a6,a7,a8){return fn.apply(this,arguments)};case 10:return function(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9){return fn.apply(this,arguments)};default:throw new Error("First argument to _arity must be a non-negative integer no greater than ten")}}__webpack_require__.d(__webpack_exports__,{Z:()=>_arity})},"./node_modules/ramda/es/internal/_checkForMethod.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_checkForMethod});var _isArray_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/internal/_isArray.js");function _checkForMethod(methodname,fn){return function(){var length=arguments.length;if(0===length)return fn();var obj=arguments[length-1];return(0,_isArray_js__WEBPACK_IMPORTED_MODULE_0__.Z)(obj)||"function"!=typeof obj[methodname]?fn.apply(this,arguments):obj[methodname].apply(obj,Array.prototype.slice.call(arguments,0,length-1))}}},"./node_modules/ramda/es/internal/_curry1.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_curry1});var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/internal/_isPlaceholder.js");function _curry1(fn){return function f1(a){return 0===arguments.length||(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(a)?f1:fn.apply(this,arguments)}}},"./node_modules/ramda/es/internal/_curry2.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_curry2});var _curry1_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js"),_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/internal/_isPlaceholder.js");function _curry2(fn){return function f2(a,b){switch(arguments.length){case 0:return f2;case 1:return(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(a)?f2:(0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__.Z)((function(_b){return fn(a,_b)}));default:return(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(a)&&(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(b)?f2:(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(a)?(0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__.Z)((function(_a){return fn(_a,b)})):(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.Z)(b)?(0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__.Z)((function(_b){return fn(a,_b)})):fn(a,b)}}}},"./node_modules/ramda/es/internal/_isArray.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=Array.isArray||function _isArray(val){return null!=val&&val.length>=0&&"[object Array]"===Object.prototype.toString.call(val)}},"./node_modules/ramda/es/internal/_isArrayLike.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _curry1_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js"),_isArray_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/ramda/es/internal/_isArray.js"),_isString_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/ramda/es/internal/_isString.js");const __WEBPACK_DEFAULT_EXPORT__=(0,_curry1_js__WEBPACK_IMPORTED_MODULE_0__.Z)((function isArrayLike(x){return!!(0,_isArray_js__WEBPACK_IMPORTED_MODULE_1__.Z)(x)||!!x&&("object"==typeof x&&(!(0,_isString_js__WEBPACK_IMPORTED_MODULE_2__.Z)(x)&&(1===x.nodeType?!!x.length:0===x.length||x.length>0&&(x.hasOwnProperty(0)&&x.hasOwnProperty(x.length-1)))))}))},"./node_modules/ramda/es/internal/_isPlaceholder.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _isPlaceholder(a){return null!=a&&"object"==typeof a&&!0===a["@@functional/placeholder"]}__webpack_require__.d(__webpack_exports__,{Z:()=>_isPlaceholder})},"./node_modules/ramda/es/internal/_isString.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _isString(x){return"[object String]"===Object.prototype.toString.call(x)}__webpack_require__.d(__webpack_exports__,{Z:()=>_isString})},"./node_modules/ramda/es/internal/_reduce.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_reduce});var _isArrayLike=__webpack_require__("./node_modules/ramda/es/internal/_isArrayLike.js"),XWrap=function(){function XWrap(fn){this.f=fn}return XWrap.prototype["@@transducer/init"]=function(){throw new Error("init not implemented on XWrap")},XWrap.prototype["@@transducer/result"]=function(acc){return acc},XWrap.prototype["@@transducer/step"]=function(acc,x){return this.f(acc,x)},XWrap}();var _arity=__webpack_require__("./node_modules/ramda/es/internal/_arity.js");const es_bind=(0,__webpack_require__("./node_modules/ramda/es/internal/_curry2.js").Z)((function bind(fn,thisObj){return(0,_arity.Z)(fn.length,(function(){return fn.apply(thisObj,arguments)}))}));function _iterableReduce(xf,acc,iter){for(var step=iter.next();!step.done;){if((acc=xf["@@transducer/step"](acc,step.value))&&acc["@@transducer/reduced"]){acc=acc["@@transducer/value"];break}step=iter.next()}return xf["@@transducer/result"](acc)}function _methodReduce(xf,acc,obj,methodName){return xf["@@transducer/result"](obj[methodName](es_bind(xf["@@transducer/step"],xf),acc))}var symIterator="undefined"!=typeof Symbol?Symbol.iterator:"@@iterator";function _reduce(fn,acc,list){if("function"==typeof fn&&(fn=function _xwrap(fn){return new XWrap(fn)}(fn)),(0,_isArrayLike.Z)(list))return function _arrayReduce(xf,acc,list){for(var idx=0,len=list.length;idx<len;){if((acc=xf["@@transducer/step"](acc,list[idx]))&&acc["@@transducer/reduced"]){acc=acc["@@transducer/value"];break}idx+=1}return xf["@@transducer/result"](acc)}(fn,acc,list);if("function"==typeof list["fantasy-land/reduce"])return _methodReduce(fn,acc,list,"fantasy-land/reduce");if(null!=list[symIterator])return _iterableReduce(fn,acc,list[symIterator]());if("function"==typeof list.next)return _iterableReduce(fn,acc,list);if("function"==typeof list.reduce)return _methodReduce(fn,acc,list,"reduce");throw new TypeError("reduce: list must be array or iterable")}}}]);
//# sourceMappingURL=7619.93381c23.iframe.bundle.js.map