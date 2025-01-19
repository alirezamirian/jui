"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[3130],{"./src/ActionSystem/ActionGroup.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function isInResolvedActionGroup(action){return"parent"in action}function isActionGroup(action){return"children"in action}function isResolvedActionGroup(action){return"children"in action&&"parent"in action}function isActionGroupDefinition(action){return"children"in action}__webpack_require__.d(__webpack_exports__,{$M:()=>isActionGroup,YC:()=>isResolvedActionGroup,nf:()=>isInResolvedActionGroup,yb:()=>isActionGroupDefinition});try{isInResolvedActionGroup.displayName="isInResolvedActionGroup",isInResolvedActionGroup.__docgenInfo={description:"",displayName:"isInResolvedActionGroup",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},shortcuts:{defaultValue:null,description:"shortcuts assigned to this action based on the keymap context",name:"shortcuts",required:!0,type:{name:"readonly Shortcut[] | undefined"}},shortcut:{defaultValue:null,description:"string representation of the shortcuts",name:"shortcut",required:!0,type:{name:"string | undefined"}},perform:{defaultValue:null,description:"Performs the action, if it's enabled.",name:"perform",required:!0,type:{name:"(context?: ActionContext | undefined) => void"}},isDisabled:{defaultValue:null,description:"An optional disable state for an action.\nIf set to `true`, this action would be in disabled state and cannot be performed.",name:"isDisabled",required:!1,type:{name:"boolean"}},title:{defaultValue:null,description:"The title of an action.\nThis value will be used as the text in UI display for the action.",name:"title",required:!0,type:{name:"string"}},description:{defaultValue:null,description:"An optional description for an action.\nIf provided, it can be displayed as additional information about the action in the UI.",name:"description",required:!1,type:{name:"string"}},icon:{defaultValue:null,description:"An optional icon for an action.\nIf provided, it will be displayed along with the title in the UI.",name:"icon",required:!1,type:{name:"ReactNode"}},isSearchable:{defaultValue:null,description:"Whether the action is searchable. See {@link ../ActionsProvider.ts#getAvailableActionsFor}.",name:"isSearchable",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ActionSystem/ActionGroup.tsx#isInResolvedActionGroup"]={docgenInfo:isInResolvedActionGroup.__docgenInfo,name:"isInResolvedActionGroup",path:"src/ActionSystem/ActionGroup.tsx#isInResolvedActionGroup"})}catch(__react_docgen_typescript_loader_error){}try{isActionGroup.displayName="isActionGroup",isActionGroup.__docgenInfo={description:"",displayName:"isActionGroup",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},shortcuts:{defaultValue:null,description:"shortcuts assigned to this action based on the keymap context",name:"shortcuts",required:!0,type:{name:"readonly Shortcut[] | undefined"}},shortcut:{defaultValue:null,description:"string representation of the shortcuts",name:"shortcut",required:!0,type:{name:"string | undefined"}},perform:{defaultValue:null,description:"Performs the action, if it's enabled.",name:"perform",required:!0,type:{name:"(context?: ActionContext | undefined) => void"}},isDisabled:{defaultValue:null,description:"An optional disable state for an action.\nIf set to `true`, this action would be in disabled state and cannot be performed.",name:"isDisabled",required:!1,type:{name:"boolean"}},title:{defaultValue:null,description:"The title of an action.\nThis value will be used as the text in UI display for the action.",name:"title",required:!0,type:{name:"string"}},description:{defaultValue:null,description:"An optional description for an action.\nIf provided, it can be displayed as additional information about the action in the UI.",name:"description",required:!1,type:{name:"string"}},icon:{defaultValue:null,description:"An optional icon for an action.\nIf provided, it will be displayed along with the title in the UI.",name:"icon",required:!1,type:{name:"ReactNode"}},isSearchable:{defaultValue:null,description:"Whether the action is searchable. See {@link ../ActionsProvider.ts#getAvailableActionsFor}.",name:"isSearchable",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ActionSystem/ActionGroup.tsx#isActionGroup"]={docgenInfo:isActionGroup.__docgenInfo,name:"isActionGroup",path:"src/ActionSystem/ActionGroup.tsx#isActionGroup"})}catch(__react_docgen_typescript_loader_error){}try{isResolvedActionGroup.displayName="isResolvedActionGroup",isResolvedActionGroup.__docgenInfo={description:"",displayName:"isResolvedActionGroup",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},shortcuts:{defaultValue:null,description:"shortcuts assigned to this action based on the keymap context",name:"shortcuts",required:!0,type:{name:"readonly Shortcut[] | undefined"}},shortcut:{defaultValue:null,description:"string representation of the shortcuts",name:"shortcut",required:!0,type:{name:"string | undefined"}},perform:{defaultValue:null,description:"Performs the action, if it's enabled.",name:"perform",required:!0,type:{name:"(context?: ActionContext | undefined) => void"}},isDisabled:{defaultValue:null,description:"An optional disable state for an action.\nIf set to `true`, this action would be in disabled state and cannot be performed.",name:"isDisabled",required:!1,type:{name:"boolean"}},title:{defaultValue:null,description:"The title of an action.\nThis value will be used as the text in UI display for the action.",name:"title",required:!0,type:{name:"string"}},description:{defaultValue:null,description:"An optional description for an action.\nIf provided, it can be displayed as additional information about the action in the UI.",name:"description",required:!1,type:{name:"string"}},icon:{defaultValue:null,description:"An optional icon for an action.\nIf provided, it will be displayed along with the title in the UI.",name:"icon",required:!1,type:{name:"ReactNode"}},isSearchable:{defaultValue:null,description:"Whether the action is searchable. See {@link ../ActionsProvider.ts#getAvailableActionsFor}.",name:"isSearchable",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ActionSystem/ActionGroup.tsx#isResolvedActionGroup"]={docgenInfo:isResolvedActionGroup.__docgenInfo,name:"isResolvedActionGroup",path:"src/ActionSystem/ActionGroup.tsx#isResolvedActionGroup"})}catch(__react_docgen_typescript_loader_error){}try{isActionGroupDefinition.displayName="isActionGroupDefinition",isActionGroupDefinition.__docgenInfo={description:"",displayName:"isActionGroupDefinition",props:{id:{defaultValue:null,description:"The unique identifier for the action. Used to assign shortcuts to the action, via a {@link Keymap }.",name:"id",required:!0,type:{name:"string"}},title:{defaultValue:null,description:"The title of an action.\nThis value will be used as the text in UI display for the action.",name:"title",required:!0,type:{name:"string"}},actionPerformed:{defaultValue:null,description:"The function that will be executed when the action is performed.\n@param context It provides further information about the action event.",name:"actionPerformed",required:!0,type:{name:"(context: ActionContext) => void"}},icon:{defaultValue:null,description:"An optional icon for an action.\nIf provided, it will be displayed along with the title in the UI.",name:"icon",required:!1,type:{name:"ReactNode"}},description:{defaultValue:null,description:"An optional description for an action.\nIf provided, it can be displayed as additional information about the action in the UI.",name:"description",required:!1,type:{name:"string"}},isDisabled:{defaultValue:null,description:"An optional disable state for an action.\nIf set to `true`, this action would be in disabled state and cannot be performed.",name:"isDisabled",required:!1,type:{name:"boolean"}},isSearchable:{defaultValue:null,description:"Whether the action is searchable. See {@link ../ActionsProvider.ts#getAvailableActionsFor}.",name:"isSearchable",required:!1,type:{name:"boolean"}},useShortcutsOf:{defaultValue:null,description:"Allows reusing the shortcut of another action, if no shortcut is set for this action.",name:"useShortcutsOf",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ActionSystem/ActionGroup.tsx#isActionGroupDefinition"]={docgenInfo:isActionGroupDefinition.__docgenInfo,name:"isActionGroupDefinition",path:"src/ActionSystem/ActionGroup.tsx#isActionGroupDefinition"})}catch(__react_docgen_typescript_loader_error){}},"./src/ActionSystem/ActionsProvider.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{BH:()=>useAction,C9:()=>getAvailableActionsFor,DG:()=>ActionsProvider,DI:()=>usePerformAction,ol:()=>useActions});var ramda__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/ramda/es/sortBy.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_utils_useEventCallback__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./src/utils/useEventCallback.ts"),_intellij_platform_core_utils_tree_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/utils/tree-utils.ts"),_KeymapProvider__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/ActionSystem/KeymapProvider.tsx"),_shortcutToString__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/ActionSystem/shortcutToString.ts"),_useShortcut__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/ActionSystem/useShortcut.ts"),_ActionGroup__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/ActionSystem/ActionGroup.tsx"),_intellij_platform_core_Collections__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Collections/Divider.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const ActionsContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext([]);function generateId(){return`jui-${Math.floor(1e7*Math.random())}`}const ACTION_PROVIDER_ID_ATTRIBUTE="data-action-provider",ACTION_PROVIDER_ID_DATA_PREFIX="action_provider_id_",actionProvidersMap=new Map;function ActionsProvider(props){const parentContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ActionsContext),keymap=(0,_KeymapProvider__WEBPACK_IMPORTED_MODULE_2__.og)(),actions=[];(0,_intellij_platform_core_utils_tree_utils__WEBPACK_IMPORTED_MODULE_3__.Ck)((action=>!action||action instanceof _intellij_platform_core_Collections__WEBPACK_IMPORTED_MODULE_4__.P||!(0,_ActionGroup__WEBPACK_IMPORTED_MODULE_5__.$M)(action)?null:action.children),(action=>{!action||action instanceof _intellij_platform_core_Collections__WEBPACK_IMPORTED_MODULE_4__.P||actions.push(action)}),recursivelyCreateActions(keymap,props.actions));const shortcuts=Object.fromEntries(actions.map((action=>[action.id,action.shortcuts||[]]))),[actionProviderId]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(generateId),{shortcutHandlerProps}=(0,_useShortcut__WEBPACK_IMPORTED_MODULE_6__.X)(shortcuts,((actionId,{event})=>{actions.find((action=>action.id===actionId))?.perform({event,element:event.target instanceof Element?event.target:null})}),{useCapture:props.useCapture}),allActions=[...parentContext,...actions];return shortcutHandlerProps[ACTION_PROVIDER_ID_ATTRIBUTE]=actionProviderId,shortcutHandlerProps[`data-${ACTION_PROVIDER_ID_DATA_PREFIX}${actionProviderId}`]="",(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{actionProvidersMap.set(actionProviderId,allActions)})),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>()=>{actionProvidersMap.delete(actionProviderId)}),[]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ActionsContext.Provider,{value:allActions,children:props.children({shortcutHandlerProps})})}function recursivelyCreateActions(keymap,actionDefinitions,parent){return actionDefinitions.map((actionDefinition=>{if(actionDefinition instanceof _intellij_platform_core_Collections__WEBPACK_IMPORTED_MODULE_4__.P)return actionDefinition;const shortcuts=keymap?.[actionDefinition.id]??(actionDefinition.useShortcutsOf?keymap?.[actionDefinition.useShortcutsOf]:void 0),firstShortcut=shortcuts?.[0],action={...actionDefinition,...(0,_ActionGroup__WEBPACK_IMPORTED_MODULE_5__.yb)(actionDefinition)?{parent:parent??null}:{},shortcuts,shortcut:firstShortcut?(0,_shortcutToString__WEBPACK_IMPORTED_MODULE_7__.W)(firstShortcut):void 0,perform:context=>{action.isDisabled||actionDefinition.actionPerformed(context||{event:null,element:null})}};return function isMutableActionGroup(action){return"children"in action}(action)&&(0,_ActionGroup__WEBPACK_IMPORTED_MODULE_5__.yb)(actionDefinition)&&(action.children=recursivelyCreateActions(keymap,actionDefinition.children.map((child=>"divider"===child?new _intellij_platform_core_Collections__WEBPACK_IMPORTED_MODULE_4__.P:child)),action)),action}))}function getAvailableActionsFor(element){const closestActionProvider=element.closest(`[${ACTION_PROVIDER_ID_ATTRIBUTE}]`);if(closestActionProvider instanceof HTMLElement){const actionSets=Object.keys(closestActionProvider.dataset).filter((dataKey=>dataKey.startsWith(ACTION_PROVIDER_ID_DATA_PREFIX))).map((dataKey=>{const id=dataKey?.replace(ACTION_PROVIDER_ID_DATA_PREFIX,""),actions=id&&actionProvidersMap.get(id);return actions?Object.values(actions).filter((({isSearchable})=>!1!==isSearchable)):[]})).concat();return(0,ramda__WEBPACK_IMPORTED_MODULE_8__.Z)((actionSet=>-actionSet.length),actionSets)[0]||[]}return[]}function useActions(){return(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ActionsContext)}ActionsProvider.displayName="ActionsProvider";const useAction=actionId=>useActions().find((({id})=>id===actionId))??null,usePerformAction=()=>{const actions=useActions();return(0,_intellij_platform_core_utils_useEventCallback__WEBPACK_IMPORTED_MODULE_9__.$)(((actionId,context)=>{const action=actions.find((({id})=>id===actionId));action?action.perform(context):console.error(`An attempt to perform action with id ${actionId} failed because action was not found`)}))};try{ActionsProvider.displayName="ActionsProvider",ActionsProvider.__docgenInfo={description:"Provides a set of actions for the wrapped UI. Uses the currently provided keymap to find the shortcuts\nfor each action, and passes the necessary event handlers for the shortcuts, to the `children` render function.",displayName:"ActionsProvider",props:{actions:{defaultValue:null,description:"A collection of action definitions.",name:"actions",required:!0,type:{name:"ActionDefinition[]"}},useCapture:{defaultValue:null,description:"Experimental option to determine if event handling should be done on capture phase. Useful for cases where\na descendant element handles events in capture phase, and that conflicts with an action.",name:"useCapture",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ActionSystem/ActionsProvider.tsx#ActionsProvider"]={docgenInfo:ActionsProvider.__docgenInfo,name:"ActionsProvider",path:"src/ActionSystem/ActionsProvider.tsx#ActionsProvider"})}catch(__react_docgen_typescript_loader_error){}try{getAvailableActionsFor.displayName="getAvailableActionsFor",getAvailableActionsFor.__docgenInfo={description:"Experimental function to get list of all actions available from a given html elements. Useful for implementing\naction search UI.",displayName:"getAvailableActionsFor",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ActionSystem/ActionsProvider.tsx#getAvailableActionsFor"]={docgenInfo:getAvailableActionsFor.__docgenInfo,name:"getAvailableActionsFor",path:"src/ActionSystem/ActionsProvider.tsx#getAvailableActionsFor"})}catch(__react_docgen_typescript_loader_error){}try{useAction.displayName="useAction",useAction.__docgenInfo={description:"",displayName:"useAction",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ActionSystem/ActionsProvider.tsx#useAction"]={docgenInfo:useAction.__docgenInfo,name:"useAction",path:"src/ActionSystem/ActionsProvider.tsx#useAction"})}catch(__react_docgen_typescript_loader_error){}},"./src/ActionSystem/CommonActionIds.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$:()=>CommonActionId});const CommonActionId={EXPAND_ALL:"ExpandAll",COLLAPSE_ALL:"CollapseAll",EXPAND_SELECTION:"EditorSelectWord",SHRINK_SELECTION:"EditorUnSelectWord",GO_TO_ACTION:"GotoAction",GO_TO_FILE:"GotoFile",SHOW_INTENTION_ACTIONS:"ShowIntentionActions",EDIT_SOURCE:"Documentation.EditSource",SHOW_SEARCH_HISTORY:"ShowSearchHistory",COPY_REFERENCE:"CopyReference",REFRESH:"Refresh",COPY:"$Copy",CUT:"$Cut",PASTE:"$Paste",DELETE:"$Delete",CODE_COMPLETION:"CodeCompletion"}},"./src/ActionSystem/KeymapProvider.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{ur:()=>KeymapProvider,og:()=>useKeymap});var react=__webpack_require__("../../node_modules/react/index.js"),ToolWindowActionIds=__webpack_require__("./src/ToolWindowsImpl/ToolWindowActionIds.ts"),CommonActionIds=__webpack_require__("./src/ActionSystem/CommonActionIds.ts");const defaultKeymap={[ToolWindowActionIds.G$]:[{type:"keyboard",firstKeyStroke:{code:"ArrowRight",modifiers:["Control","Alt"]}}],[ToolWindowActionIds.JQ]:[{type:"keyboard",firstKeyStroke:{code:"ArrowLeft",modifiers:["Control","Alt"]}}],[ToolWindowActionIds.lh]:[{type:"keyboard",firstKeyStroke:{code:"ArrowUp",modifiers:["Control","Alt"]}}],[ToolWindowActionIds.aV]:[{type:"keyboard",firstKeyStroke:{code:"ArrowDown",modifiers:["Control","Alt"]}}],[ToolWindowActionIds.Jy]:[{type:"keyboard",firstKeyStroke:{code:"Quote",modifiers:["Shift","Meta"]}}],[ToolWindowActionIds.Od]:[{type:"keyboard",firstKeyStroke:{code:"Escape"}}],[ToolWindowActionIds.L$]:[{type:"keyboard",firstKeyStroke:{code:"Escape",modifiers:["Shift"]}}],[ToolWindowActionIds.xm]:[{type:"keyboard",firstKeyStroke:{code:"F12",modifiers:["Shift","Meta"]}}],[ToolWindowActionIds.Dw]:[{type:"keyboard",firstKeyStroke:{code:"F12"}}],[CommonActionIds.$.EXPAND_SELECTION]:[{type:"keyboard",firstKeyStroke:{modifiers:["Meta"],code:"KeyW"}},{type:"keyboard",firstKeyStroke:{modifiers:["Alt"],code:"ArrowUp"}}],[CommonActionIds.$.SHRINK_SELECTION]:[{type:"keyboard",firstKeyStroke:{modifiers:["Meta","Shift"],code:"KeyW"}},{type:"keyboard",firstKeyStroke:{modifiers:["Alt"],code:"ArrowDown"}}],[CommonActionIds.$.EXPAND_ALL]:[{type:"keyboard",firstKeyStroke:{modifiers:["Meta"],code:"Equal"}},{type:"keyboard",firstKeyStroke:{modifiers:["Meta"],code:"NumpadAdd"}}],[CommonActionIds.$.COLLAPSE_ALL]:[{type:"keyboard",firstKeyStroke:{modifiers:["Meta"],code:"Minus"}},{type:"keyboard",firstKeyStroke:{modifiers:["Meta"],code:"NumpadSubtract"}}],[CommonActionIds.$.GO_TO_ACTION]:[{type:"keyboard",firstKeyStroke:{modifiers:["Meta","Shift"],code:"KeyA"}}],[CommonActionIds.$.SHOW_INTENTION_ACTIONS]:[{type:"keyboard",firstKeyStroke:{modifiers:["Alt"],code:"Enter"}}],[CommonActionIds.$.GO_TO_FILE]:[{type:"keyboard",firstKeyStroke:{modifiers:["Meta","Shift"],code:"KeyO"}}],[CommonActionIds.$.EDIT_SOURCE]:[{type:"keyboard",firstKeyStroke:{modifiers:["Meta"],code:"ArrowDown"}},{type:"keyboard",firstKeyStroke:{code:"F4"}}],[CommonActionIds.$.SHOW_SEARCH_HISTORY]:[{type:"keyboard",firstKeyStroke:{modifiers:["Alt"],code:"ArrowDown"}}],[CommonActionIds.$.COPY_REFERENCE]:[{type:"keyboard",firstKeyStroke:{modifiers:["Meta","Shift","Alt"],code:"KeyC"}}],[CommonActionIds.$.REFRESH]:[{type:"keyboard",firstKeyStroke:{modifiers:["Meta"],code:"KeyR"}}],[CommonActionIds.$.DELETE]:[{type:"keyboard",firstKeyStroke:{code:"Backspace"}}],[CommonActionIds.$.COPY]:[{type:"keyboard",firstKeyStroke:{modifiers:["Meta"],code:"KeyC"}}],[CommonActionIds.$.CUT]:[{type:"keyboard",firstKeyStroke:{modifiers:["Meta"],code:"KeyX"}}],[CommonActionIds.$.PASTE]:[{type:"keyboard",firstKeyStroke:{modifiers:["Meta"],code:"KeyV"}}],[CommonActionIds.$.CODE_COMPLETION]:[{type:"keyboard",firstKeyStroke:{modifiers:["Control"],code:"Space"}}]};try{defaultKeymap.displayName="defaultKeymap",defaultKeymap.__docgenInfo={description:"Default Intellij Idea keymapping for common action ids, including tool window actions.",displayName:"defaultKeymap",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ActionSystem/defaultKeymap.tsx#defaultKeymap"]={docgenInfo:defaultKeymap.__docgenInfo,name:"defaultKeymap",path:"src/ActionSystem/defaultKeymap.tsx#defaultKeymap"})}catch(__react_docgen_typescript_loader_error){}var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const KeymapContext=react.createContext(defaultKeymap),KeymapProvider=({keymap:keymapProp,children})=>{const parentKeyMap=(0,react.useContext)(KeymapContext),keymap=Object.assign(Object.create(parentKeyMap),keymapProp);return(0,jsx_runtime.jsx)(KeymapContext.Provider,{value:keymap,children})};KeymapProvider.displayName="KeymapProvider";const useKeymap=()=>(0,react.useContext)(KeymapContext);try{KeymapProvider.displayName="KeymapProvider",KeymapProvider.__docgenInfo={description:"",displayName:"KeymapProvider",props:{keymap:{defaultValue:null,description:"",name:"keymap",required:!0,type:{name:"Keymap"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ActionSystem/KeymapProvider.tsx#KeymapProvider"]={docgenInfo:KeymapProvider.__docgenInfo,name:"KeymapProvider",path:"src/ActionSystem/KeymapProvider.tsx#KeymapProvider"})}catch(__react_docgen_typescript_loader_error){}},"./src/ActionSystem/Shortcut.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>supportedModifiers,e:()=>isKeyboardShortcut});const isKeyboardShortcut=shortcut=>"keyboard"===shortcut.type,supportedModifiers=["Alt","Meta","Shift","Control"]},"./src/ActionSystem/shortcutToString.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>shortcutToString});var ramda__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ramda/es/fromPairs.js"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/platform.mjs"),_Shortcut__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/ActionSystem/Shortcut.ts");const defaultKeyToStr={Control:"Ctrl"," ":"Space",ArrowDown:"↓",ArrowUp:"↑",ArrowLeft:"←",ArrowRight:"→",Enter:"⏎",Quote:"'",Minus:"-",Subtract:"-",NumpadAdd:"+",Multiply:"*",NumpadMultiply:"*",Equal:"+",Backspace:"⌫",...(0,ramda__WEBPACK_IMPORTED_MODULE_0__.Z)(Array.from(Array(26)).map(((e,i)=>i+"a".charCodeAt(0))).map((x=>String.fromCharCode(x))).map((a=>[a,a.toUpperCase()])))},KeystrokeToString=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.V5)()?{separator:"",codeToStr:{...defaultKeyToStr,Alt:"⌥",Shift:"⇧",Meta:"⌘",Control:"^",Escape:"⎋"}}:{separator:"+",codeToStr:defaultKeyToStr},modifiersOrder=["Control","Alt","Shift","Meta"],keystrokeToString=keystroke=>[...(keystroke.modifiers||[]).sort(((a,b)=>modifiersOrder.indexOf(a)-modifiersOrder.indexOf(b))),keystroke.code].map((code=>KeystrokeToString.codeToStr[code]||code)).map((code=>code.replace(/^(Key|Digit|Numpad)(.)$/,"$2"))).join(KeystrokeToString.separator),shortcutToString=shortcut=>{if((0,_Shortcut__WEBPACK_IMPORTED_MODULE_2__.e)(shortcut))return[shortcut.firstKeyStroke,shortcut.secondKeyStroke].filter((i=>null!=i)).map(keystrokeToString).join(", ");throw new Error("Not implemented yet")}},"./src/ActionSystem/useShortcut.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>useShortcuts});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_utils_useEventCallback__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/utils/useEventCallback.ts"),_Shortcut__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/ActionSystem/Shortcut.ts");function useShortcuts(shortcuts,onAction,{useCapture=!1}={}){const firstKeyActivatedShortcutsRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]),secondStrokeResetTimerIdRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),onKeyDown=(0,_intellij_platform_core_utils_useEventCallback__WEBPACK_IMPORTED_MODULE_1__.$)((e=>{if(!function isModifierOnly(event){return 1===event.location||2===event.location}(e.nativeEvent)&&!e.repeat)if(null!==secondStrokeResetTimerIdRef.current&&window.clearTimeout(secondStrokeResetTimerIdRef.current),firstKeyActivatedShortcutsRef.current.length>0)firstKeyActivatedShortcutsRef.current.some((({shortcut,actionId})=>{if(isKeyMatch(shortcut.secondKeyStroke,e,!0))return triggerAction(actionId),!0})),firstKeyActivatedShortcutsRef.current=[];else{const firstKeyMatches=Object.entries(shortcuts).flatMap((([actionId,shortcuts])=>shortcuts.map((shortcut=>({actionId,shortcut}))))).filter((input=>(0,_Shortcut__WEBPACK_IMPORTED_MODULE_2__.e)(input.shortcut))).filter((({shortcut})=>isKeyMatch(shortcut.firstKeyStroke,e)));firstKeyActivatedShortcutsRef.current=firstKeyMatches.filter((({shortcut,actionId})=>shortcut.secondKeyStroke)),firstKeyActivatedShortcutsRef.current.length>0?(secondStrokeResetTimerIdRef.current=window.setTimeout((()=>{firstKeyActivatedShortcutsRef.current=[]}),2e3),document.addEventListener("keydown",(()=>{document.addEventListener("keyup",(()=>{firstKeyActivatedShortcutsRef.current=[]}),{once:!0})}),{once:!0,capture:!0})):firstKeyMatches.length>0&&triggerAction(firstKeyMatches[0].actionId)}function triggerAction(actionId){!1!==onAction(actionId,{event:e})&&(e.stopPropagation(),e.preventDefault())}}));return{shortcutHandlerProps:{[useCapture?"onKeyDownCapture":"onKeyDown"]:onKeyDown}}}const isKeyMatch=(keyStroke,e,loose)=>e.code===keyStroke?.code&&(loose?keyStroke.modifiers||[]:_Shortcut__WEBPACK_IMPORTED_MODULE_2__.V).every((modifier=>e.getModifierState(modifier)===Boolean(keyStroke.modifiers?.includes(modifier))))},"./src/ToolWindowsImpl/ToolWindowActionIds.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Dw:()=>JUMP_TO_LAST_WINDOW_ACTION_ID,G$:()=>RESIZE_TOOL_WINDOW_RIGHT_ACTION_ID,JF:()=>UNDOCK_MODE_ACTION_ID,JQ:()=>RESIZE_TOOL_WINDOW_LEFT_ACTION_ID,Jy:()=>MAXIMIZE_TOOL_WINDOW_ACTION_ID,L$:()=>HIDE_ACTIVE_WINDOW_ACTION_ID,Od:()=>FOCUS_EDITOR_ACTION_ID,TD:()=>DOCK_TOOL_WINDOW_ACTION_ID,Xr:()=>WINDOW_MODE_ACTION_ID,aV:()=>RESIZE_TOOL_WINDOW_BOTTOM_ACTION_ID,jw:()=>REMOVE_TOOL_WINDOW_FROM_SIDEBAR_ACTION_ID,lh:()=>RESIZE_TOOL_WINDOW_TOP_ACTION_ID,tA:()=>DOCK_UNPINNED_MODE_ACTION_ID,xm:()=>HIDE_ALL_WINDOWS_ACTION_ID,xs:()=>FLOAT_MODE_ACTION_ID,yT:()=>DOCK_PINNED_MODE_ACTION_ID});const HIDE_ALL_WINDOWS_ACTION_ID="HideAllWindows",JUMP_TO_LAST_WINDOW_ACTION_ID="JumpToLastWindow",HIDE_ACTIVE_WINDOW_ACTION_ID="HideActiveWindow",MAXIMIZE_TOOL_WINDOW_ACTION_ID="MaximizeToolWindow",DOCK_TOOL_WINDOW_ACTION_ID="DockToolWindow",RESIZE_TOOL_WINDOW_RIGHT_ACTION_ID="ResizeToolWindowRight",RESIZE_TOOL_WINDOW_LEFT_ACTION_ID="ResizeToolWindowLeft",RESIZE_TOOL_WINDOW_TOP_ACTION_ID="ResizeToolWindowTop",RESIZE_TOOL_WINDOW_BOTTOM_ACTION_ID="ResizeToolWindowBottom",DOCK_PINNED_MODE_ACTION_ID="DockPinnedMode",DOCK_UNPINNED_MODE_ACTION_ID="DockUnpinnedMode",UNDOCK_MODE_ACTION_ID="UndockMode",FLOAT_MODE_ACTION_ID="FloatMode",WINDOW_MODE_ACTION_ID="WindowMode",FOCUS_EDITOR_ACTION_ID="FocusEditor",REMOVE_TOOL_WINDOW_FROM_SIDEBAR_ACTION_ID="RemoveToolWindowFromSidebar"},"./src/utils/tree-utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Bp:()=>getExpandedToNodesKeys,Ck:()=>dfsVisit,Om:()=>getExpandAllKeys,eA:()=>bfsVisit,kD:()=>sortTreeNodesInPlace});const getExpandAllKeys=(getChildren,getKey,roots)=>{const keys=roots.map(getKey),processItem=node=>{const children=node?getChildren(node):null;null!=node&&children&&(keys.push(getKey(node)),children.forEach(processItem))};return roots.map(getChildren).flat().forEach(processItem),keys},getExpandedToNodesKeys=(getChildren,getKey,roots,targetNodeKeys)=>{const targetNodeKeySet=new Set(targetNodeKeys),expandedKeys=[];return dfsVisit(getChildren,((node,childValues)=>{const key=getKey(node),isExpanded=childValues?.some((childValue=>childValue))||targetNodeKeySet.has(key);return isExpanded&&expandedKeys.push(key),isExpanded}),roots),expandedKeys},dfsVisit=(getChildren,visit,roots)=>{const dfs=node=>{const children=getChildren(node),values=children?.map(dfs)??null;return visit(node,values)};roots.forEach(dfs)},bfsVisit=(getChildren,visit,roots)=>{const bfs=(node,parentValue)=>{const result=visit(node,parentValue),children=getChildren(node);return children?.map((childNode=>bfs(childNode,result))),result};return roots.map((root=>bfs(root,null)))},sortTreeNodesInPlace=(by,tree)=>{const compareFn=(a,b)=>{const aa=by(a),bb=by(b);return aa<bb?-1:aa>bb?1:0};tree.roots.sort(compareFn),bfsVisit(tree.getChildren,(node=>{const children=tree.getChildren(node);children&&children.sort(compareFn)}),tree.roots)}}}]);