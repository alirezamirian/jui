"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[448],{"./src/Menu/Menu.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AutoFocusFirst:()=>AutoFocusFirst,ContextMenu:()=>ContextMenu,MenuWithTrigger:()=>MenuWithTrigger,Nested:()=>Nested,Position:()=>Position,Sections:()=>Sections,Static:()=>Static,StaticWithTextItems:()=>StaticWithTextItems,SubmenuWithAction:()=>SubmenuWithAction,ToggleSubmenuOnPress:()=>ToggleSubmenuOnPress,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var _react_stately_collections__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/@react-stately/collections/dist/Item.mjs"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("./src/styled.ts"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__("./src/Menu/ContextMenuContainer.tsx"),_IconButton__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./src/IconButton/IconButton.tsx"),_Toolbar_Toolbar__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./src/Toolbar/Toolbar.tsx"),_Collections_Divider__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Collections/Divider.ts"),_Icon__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./src/Icon/PlatformIcon.tsx"),_story_helpers__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/story-helpers.tsx"),_Menu__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Menu/Menu.tsx"),_MenuItemLayout__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/Menu/MenuItemLayout.tsx"),_MenuTrigger__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./src/Menu/MenuTrigger.tsx"),_story_helpers__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Menu/story-helpers.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const exampleMenuItems=[{title:"View Mode",subItems:_story_helpers__WEBPACK_IMPORTED_MODULE_2__.Y},new _Collections_Divider__WEBPACK_IMPORTED_MODULE_3__.P,{title:"Group tabs",icon:"toolwindows/documentation",shortcut:"^G"}],__WEBPACK_DEFAULT_EXPORT__={title:"Components/Menu",component:_Menu__WEBPACK_IMPORTED_MODULE_4__.v2,parameters:{controls:{exclude:_story_helpers__WEBPACK_IMPORTED_MODULE_5__.q}},args:{items:exampleMenuItems,"aria-label":"Menu",children:_story_helpers__WEBPACK_IMPORTED_MODULE_2__.x,onAction:key=>{alert(`action: ${key}`)},onClose:()=>{console.log("close")}}},Template=props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Menu__WEBPACK_IMPORTED_MODULE_4__.v2,{...props});Template.displayName="Template";const Static=Template.bind(null);Static.args={disabledKeys:["jumpToExternalEditor"],children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{textValue:"Cut",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_MenuItemLayout__WEBPACK_IMPORTED_MODULE_7__._,{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_8__.vq,{icon:"actions/menu-cut"}),content:"Cut",shortcut:"⌘X"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{textValue:"Copy",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_MenuItemLayout__WEBPACK_IMPORTED_MODULE_7__._,{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_8__.vq,{icon:"actions/copy"}),content:"Copy",shortcut:"⌘C"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{textValue:"Paste",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_MenuItemLayout__WEBPACK_IMPORTED_MODULE_7__._,{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_8__.vq,{icon:"actions/menu-paste"}),content:"Paste",shortcut:"⌘V"})},"Paste"),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Collections_Divider__WEBPACK_IMPORTED_MODULE_3__.i,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{children:"Reformat Code"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{textValue:"Optimize Imports",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_MenuItemLayout__WEBPACK_IMPORTED_MODULE_7__._,{content:"Optimize Imports",shortcut:"⌃⌥O"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{textValue:"Delete",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_MenuItemLayout__WEBPACK_IMPORTED_MODULE_7__._,{content:"Delete",shortcut:"⌫"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Collections_Divider__WEBPACK_IMPORTED_MODULE_3__.i,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{textValue:"Compare with...",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_MenuItemLayout__WEBPACK_IMPORTED_MODULE_7__._,{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_8__.vq,{icon:"actions/diff"}),content:"Compare with..."})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Collections_Divider__WEBPACK_IMPORTED_MODULE_3__.i,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{textValue:"Jump to external editor",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_MenuItemLayout__WEBPACK_IMPORTED_MODULE_7__._,{content:"Jump to external editor",shortcut:"⌥⌘F4"})},"jumpToExternalEditor")]}).props.children};const AutoFocusFirst=Template.bind(null);AutoFocusFirst.args={autoFocus:"first"};const StaticWithTextItems=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_Menu__WEBPACK_IMPORTED_MODULE_4__.v2,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{children:"Restart Typescript Service"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{title:"Compile",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{children:"packages/jui/tsconfig.json"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{children:"packages/jui/src/StatusBar/StatusBar.stories.tsx"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{children:"Compile All"})]})]});StaticWithTextItems.displayName="StaticWithTextItems";const Nested=Template.bind(null);Nested.args={items:exampleMenuItems,disabledKeys:["Float"]};const Position={render:({offsetRight=230})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{paddingLeft:`calc(100% - ${offsetRight}px)`},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Menu__WEBPACK_IMPORTED_MODULE_4__.v2,{items:exampleMenuItems,children:_story_helpers__WEBPACK_IMPORTED_MODULE_2__.x})})},ToggleSubmenuOnPress=Template.bind(null);ToggleSubmenuOnPress.args={submenuBehavior:"toggleOnPress"};const SubmenuWithAction=Template.bind(null);SubmenuWithAction.args={submenuBehavior:"actionOnPress"};const Sections=Template.bind(null);Sections.args={items:[{title:"Local Branches",subItems:[{title:"master",subItems:[{title:"Pull"},{title:"Update"}]},{title:"dev"}],section:!0},{title:"Remote Branches",subItems:[{title:"origin/master",subItems:[{title:"Checkout"}]},{title:"origin/dev"}],section:!0},{title:"Empty section",subItems:[],section:!0}]};const MenuWithTrigger={render:({offsetRight,offsetBottom,menuProps:otherMenuProps,...otherProps})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{paddingLeft:null!=offsetRight?`calc(100% - ${offsetRight+24}px)`:void 0,paddingTop:null!=offsetBottom?`calc(100% - ${offsetBottom+24}px)`:void 0},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Toolbar_Toolbar__WEBPACK_IMPORTED_MODULE_9__.o,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_MenuTrigger__WEBPACK_IMPORTED_MODULE_10__.b,{...otherProps,renderMenu:({menuProps})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Menu__WEBPACK_IMPORTED_MODULE_4__.v2,{items:exampleMenuItems,disabledKeys:["Float"],...menuProps,...otherMenuProps,onAction:key=>{console.log("onAction",key)},children:_story_helpers__WEBPACK_IMPORTED_MODULE_2__.x}),children:(props,ref)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_IconButton__WEBPACK_IMPORTED_MODULE_11__.hU,{...props,ref,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_8__.vq,{icon:"general/gearPlain"})})})})})},StyledContainer=_intellij_platform_core__WEBPACK_IMPORTED_MODULE_12__.zo.div`
  color: ${({theme})=>theme.commonColors.labelForeground};
  background: ${({theme})=>theme.commonColors.panelBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`,ContextMenu={render:({children,noScroll,menuProps={}})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{height:"25vh",background:"repeating-linear-gradient(45deg, #aaa, #aaa 10px, #999 10px, #999 20px)"}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_13__.X,{id:"context-menu-container",renderMenu:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_Menu__WEBPACK_IMPORTED_MODULE_4__.v2,{"aria-label":"Editor Context Menu",...menuProps,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{textValue:"Column Selection Mode",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_MenuItemLayout__WEBPACK_IMPORTED_MODULE_7__._,{content:"Column Selection Mode",shortcut:"⇧⌘8"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Collections_Divider__WEBPACK_IMPORTED_MODULE_3__.i,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{title:"Go to",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{textValue:"Navigation Bar",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_MenuItemLayout__WEBPACK_IMPORTED_MODULE_7__._,{content:"Navigation Bar",shortcut:"`⌘↑`"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{textValue:"Implementation(s)",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_MenuItemLayout__WEBPACK_IMPORTED_MODULE_7__._,{content:"Implementation(s)",shortcut:"⌥⌘B"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{textValue:"Generate",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_MenuItemLayout__WEBPACK_IMPORTED_MODULE_7__._,{content:"Generate",shortcut:"⌘N"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Collections_Divider__WEBPACK_IMPORTED_MODULE_3__.i,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{title:"Local History",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{children:"Show History"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{children:"Put Label..."})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Collections_Divider__WEBPACK_IMPORTED_MODULE_3__.i,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_6__.c,{textValue:"Compare with Clipboard",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_MenuItemLayout__WEBPACK_IMPORTED_MODULE_7__._,{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_8__.vq,{icon:"actions/diff"}),content:"Compare with Clipboard"})})]}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(StyledContainer,{style:{height:noScroll?"75vh":void 0},children:["Right click somewhere. ",children]})})]}),parameters:{layout:"fullscreen"}};Static.parameters={...Static.parameters,docs:{...Static.parameters?.docs,source:{originalSource:"Template.bind(null)",...Static.parameters?.docs?.source}}},AutoFocusFirst.parameters={...AutoFocusFirst.parameters,docs:{...AutoFocusFirst.parameters?.docs,source:{originalSource:"Template.bind(null)",...AutoFocusFirst.parameters?.docs?.source}}},StaticWithTextItems.parameters={...StaticWithTextItems.parameters,docs:{...StaticWithTextItems.parameters?.docs,source:{originalSource:'() => <Menu>\n    <Item>Restart Typescript Service</Item>\n    <Item title="Compile">\n      <Item>packages/jui/tsconfig.json</Item>\n      <Item>packages/jui/src/StatusBar/StatusBar.stories.tsx</Item>\n      <Item>Compile All</Item>\n    </Item>\n  </Menu>',...StaticWithTextItems.parameters?.docs?.source}}},Nested.parameters={...Nested.parameters,docs:{...Nested.parameters?.docs,source:{originalSource:"Template.bind(null)",...Nested.parameters?.docs?.source}}},Position.parameters={...Position.parameters,docs:{...Position.parameters?.docs,source:{originalSource:"{\n  render: ({\n    offsetRight = 230\n  }: {\n    offsetRight: number;\n  }) => {\n    return <div style={{\n      paddingLeft: `calc(100% - ${offsetRight}px)`\n    }}>\n        <Menu items={exampleMenuItems}>{renderItem}</Menu>\n      </div>;\n  }\n}",...Position.parameters?.docs?.source}}},ToggleSubmenuOnPress.parameters={...ToggleSubmenuOnPress.parameters,docs:{...ToggleSubmenuOnPress.parameters?.docs,source:{originalSource:"Template.bind(null)",...ToggleSubmenuOnPress.parameters?.docs?.source}}},SubmenuWithAction.parameters={...SubmenuWithAction.parameters,docs:{...SubmenuWithAction.parameters?.docs,source:{originalSource:"Template.bind(null)",...SubmenuWithAction.parameters?.docs?.source}}},Sections.parameters={...Sections.parameters,docs:{...Sections.parameters?.docs,source:{originalSource:"Template.bind(null)",...Sections.parameters?.docs?.source}}},MenuWithTrigger.parameters={...MenuWithTrigger.parameters,docs:{...MenuWithTrigger.parameters?.docs,source:{originalSource:'{\n  render: ({\n    offsetRight,\n    offsetBottom,\n    menuProps: otherMenuProps,\n    ...otherProps\n  }) => {\n    return <div style={{\n      paddingLeft: offsetRight != undefined ? `calc(100% - ${offsetRight + 24}px)` : undefined,\n      paddingTop: offsetBottom != undefined ? `calc(100% - ${offsetBottom + 24}px)` : undefined\n    }}>\n        <Toolbar>\n          <MenuTrigger {...otherProps} renderMenu={({\n          menuProps\n        }) => <Menu items={exampleMenuItems} disabledKeys={["Float"]} {...menuProps} {...otherMenuProps} onAction={key => {\n          console.log("onAction", key);\n        }}>\n                {renderItem}\n              </Menu>}>\n            {(props, ref) => <IconButton {...props} ref={ref}>\n                <PlatformIcon icon={"general/gearPlain"} />\n              </IconButton>}\n          </MenuTrigger>\n        </Toolbar>\n      </div>;\n  }\n}',...MenuWithTrigger.parameters?.docs?.source}}},ContextMenu.parameters={...ContextMenu.parameters,docs:{...ContextMenu.parameters?.docs,source:{originalSource:'{\n  render: ({\n    children,\n    noScroll,\n    menuProps = {}\n  }) => {\n    return <>\n        <div style={{\n        height: "25vh",\n        background: `repeating-linear-gradient(45deg, #aaa, #aaa 10px, #999 10px, #999 20px)`\n      }} />\n        <ContextMenuContainer id="context-menu-container" renderMenu={() => <Menu aria-label="Editor Context Menu" {...menuProps}>\n              <Item textValue="Column Selection Mode">\n                <MenuItemLayout content="Column Selection Mode" shortcut="⇧⌘8" />\n              </Item>\n              <Divider />\n              <Item title="Go to">\n                <Item textValue="Navigation Bar">\n                  <MenuItemLayout content="Navigation Bar" shortcut="`⌘↑`" />\n                </Item>\n                <Item textValue="Implementation(s)">\n                  <MenuItemLayout content="Implementation(s)" shortcut="⌥⌘B" />\n                </Item>\n              </Item>\n              <Item textValue="Generate">\n                <MenuItemLayout content="Generate" shortcut="⌘N" />\n              </Item>\n              <Divider />\n              <Item title="Local History">\n                <Item>Show History</Item>\n                <Item>Put Label...</Item>\n              </Item>\n              <Divider />\n              <Item textValue="Compare with Clipboard">\n                <MenuItemLayout icon={<PlatformIcon icon={"actions/diff"} />} content="Compare with Clipboard" />\n              </Item>\n            </Menu>}>\n          <StyledContainer style={{\n          height: noScroll ? "75vh" : undefined\n        }}>\n            Right click somewhere. {children}\n          </StyledContainer>\n        </ContextMenuContainer>\n      </>;\n  },\n  parameters: {\n    layout: "fullscreen"\n  }\n}',...ContextMenu.parameters?.docs?.source}}};const __namedExportsOrder=["Static","AutoFocusFirst","StaticWithTextItems","Nested","Position","ToggleSubmenuOnPress","SubmenuWithAction","Sections","MenuWithTrigger","ContextMenu"]},"./src/Menu/ContextMenuContainer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>ContextMenuContainer,U:()=>MENU_POSITION_TARGET_DATA_ATTRIBUTE});var react=__webpack_require__("../../node_modules/react/index.js"),mergeProps=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),useMenuTriggerState=__webpack_require__("../../node_modules/@react-stately/menu/dist/useMenuTriggerState.mjs");const useContextMenu=({isDisabled=!1,onOpen},state)=>{const[positionOrigin,setPositionOrigin]=(0,react.useState)();return{containerProps:isDisabled?{}:{onContextMenu:e=>{e.target instanceof Element&&(setPositionOrigin(e),onOpen?.({target:e.target}),e.preventDefault(),state.isOpen?(state.close(),setTimeout((()=>{state.open(null)}))):state.open(null))}},overlayRef:(0,react.useRef)(null),positionOrigin}};try{useContextMenu.displayName="useContextMenu",useContextMenu.__docgenInfo={description:"Functionality and accessibility of context menu.",displayName:"useContextMenu",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Menu/useContextMenu.tsx#useContextMenu"]={docgenInfo:useContextMenu.__docgenInfo,name:"useContextMenu",path:"src/Menu/useContextMenu.tsx#useContextMenu"})}catch(__react_docgen_typescript_loader_error){}var MenuOverlayFromOrigin=__webpack_require__("./src/Menu/MenuOverlayFromOrigin.tsx"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const ContextMenuContainer=react.forwardRef((({children,renderMenu,onOpen,isDisabled,...props},ref)=>{const state=(0,useMenuTriggerState.W)({}),{positionOrigin,containerProps,overlayRef}=useContextMenu({onOpen,isDisabled},state),allProps=(0,mergeProps.d)(props,containerProps);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:["function"==typeof children?children(allProps):(0,jsx_runtime.jsx)("div",{...allProps,ref,children}),state.isOpen&&(0,jsx_runtime.jsx)(MenuOverlayFromOrigin.Z,{onClose:state.close,ref:overlayRef,origin:positionOrigin,defaultAutoFocus:!0,children:renderMenu()})]})})),MENU_POSITION_TARGET_DATA_ATTRIBUTE="data-context-menu-position-target";try{ContextMenuContainer.displayName="ContextMenuContainer",ContextMenuContainer.__docgenInfo={description:"A generic container for context menu. It's the same as a normal div, only with an additional `renderMenu` prop,\nto be used to render context menu, when it's triggered.\nCloses the menu when a menu action is triggered.",displayName:"ContextMenuContainer",props:{children:{defaultValue:null,description:"If children is a function, context menu props is passed to it, to be passed to the underlying element.\nOtherwise, a div container will be rendered.",name:"children",required:!0,type:{name:"ReactNode | ((props: HTMLAttributes<HTMLElement>) => ReactNode)"}},isDisabled:{defaultValue:null,description:"Whether opening contextmenu is disabled.",name:"isDisabled",required:!1,type:{name:"boolean"}},renderMenu:{defaultValue:null,description:"Will be called to return the Menu when context menu is triggered. Use {@link Menu } component to render a menu.",name:"renderMenu",required:!0,type:{name:"() => ReactNode"}},onOpen:{defaultValue:null,description:"Called when contextmenu is opened.\n@param args",name:"onOpen",required:!1,type:{name:"((args: { target: Element; }) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Menu/ContextMenuContainer.tsx#ContextMenuContainer"]={docgenInfo:ContextMenuContainer.__docgenInfo,name:"ContextMenuContainer",path:"src/Menu/ContextMenuContainer.tsx#ContextMenuContainer"})}catch(__react_docgen_typescript_loader_error){}try{MENU_POSITION_TARGET_DATA_ATTRIBUTE.displayName="MENU_POSITION_TARGET_DATA_ATTRIBUTE",MENU_POSITION_TARGET_DATA_ATTRIBUTE.__docgenInfo={description:"Data attribute name to be used to mark an element as the reference for positioning a contextual menu.",displayName:"MENU_POSITION_TARGET_DATA_ATTRIBUTE",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Menu/ContextMenuContainer.tsx#MENU_POSITION_TARGET_DATA_ATTRIBUTE"]={docgenInfo:MENU_POSITION_TARGET_DATA_ATTRIBUTE.__docgenInfo,name:"MENU_POSITION_TARGET_DATA_ATTRIBUTE",path:"src/Menu/ContextMenuContainer.tsx#MENU_POSITION_TARGET_DATA_ATTRIBUTE"})}catch(__react_docgen_typescript_loader_error){}},"./src/Menu/MenuOverlayFromOrigin.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>MenuOverlayFromOrigin});var react=__webpack_require__("../../node_modules/react/index.js"),MenuOverlay=__webpack_require__("./src/Menu/MenuOverlay.tsx");function useOverlayPositionFromOrigin({overlayRef,origin,containerPadding}){const[position,setPosition]=(0,react.useState)({});return(0,react.useLayoutEffect)((()=>{const overlayElement=overlayRef.current;setPosition(origin&&overlayElement?function calculatePosition({clientX,clientY,overlayWidth,overlayHeight,containerPadding=0}){const totalWidth=document.documentElement.clientWidth-("object"==typeof containerPadding?containerPadding.x:containerPadding),totalHeight=document.documentElement.clientHeight-("object"==typeof containerPadding?containerPadding.y:containerPadding);let top=clientY,left=clientX;left+overlayWidth>totalWidth&&(left=totalWidth-overlayWidth);top+overlayHeight>totalHeight&&(top=totalHeight-overlayHeight);return top=Math.max(0,top),left=Math.max(0,left),{top,left}}({clientX:origin.clientX+1.5,clientY:origin.clientY,containerPadding,overlayWidth:overlayElement.offsetWidth,overlayHeight:overlayElement.offsetHeight}):{})}),[origin?.clientX,origin?.clientY]),{positionProps:{style:{position:"fixed",zIndex:1e5,...position}}}}try{useOverlayPositionFromOrigin.displayName="useOverlayPositionFromOrigin",useOverlayPositionFromOrigin.__docgenInfo={description:"Similar to {@link import ('@react-aria/overlays').useOverlayPosition useOverlayPosition},\nbut for positioning an overlay relative to a point, typically coordinates of a mouse event.\nIt's less advanced than useOverlayPosition, not taking into account many edge cases that\n`useOverlayPosition` does.\nMost importantly:\n- Window resize is not taken into account\n- Overlay resize is not taken into account.\n  Positioning only happens when the origin changes.\n- There are no options for positioning options like placement, offset or crossOffset",displayName:"useOverlayPositionFromOrigin",props:{overlayRef:{defaultValue:null,description:"",name:"overlayRef",required:!0,type:{name:"RefObject<HTMLElement>"}},containerPadding:{defaultValue:null,description:"",name:"containerPadding",required:!1,type:{name:"number | { x: number; y: number; }"}},origin:{defaultValue:null,description:"",name:"origin",required:!0,type:{name:'Pick<MouseEvent<Element, MouseEvent>, "clientX" | "clientY"> | undefined'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Menu/useOverlayPositionFromOrigin.tsx#useOverlayPositionFromOrigin"]={docgenInfo:useOverlayPositionFromOrigin.__docgenInfo,name:"useOverlayPositionFromOrigin",path:"src/Menu/useOverlayPositionFromOrigin.tsx#useOverlayPositionFromOrigin"})}catch(__react_docgen_typescript_loader_error){}var useObjectRef=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs"),isScrollable=__webpack_require__("../../node_modules/@react-aria/utils/dist/isScrollable.mjs"),getScrollParent=__webpack_require__("../../node_modules/@react-aria/utils/dist/getScrollParent.mjs"),styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const DisableScrollStyles=(0,styled_components_browser_esm.vJ)([".disable-scroll{overflow:hidden !important;}"]),MenuOverlayFromOrigin=react.forwardRef((function MenuOverlayFromOrigin({children,origin,...otherProps},forwardedRef){const overlayRef=(0,useObjectRef.B)(forwardedRef),{positionProps}=useOverlayPositionFromOrigin({overlayRef,origin,containerPadding:{x:0,y:4}}),scrollParent=(0,react.useMemo)((()=>origin?.target instanceof HTMLElement?(0,isScrollable.a)(origin.target)?origin.target:(0,getScrollParent.r)(origin.target):null),[origin?.target]);return(0,react.useEffect)((()=>(scrollParent?.classList?.add("disable-scroll"),()=>{scrollParent?.classList?.remove("disable-scroll")})),[]),(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(DisableScrollStyles,{}),Boolean(origin)&&(0,jsx_runtime.jsx)(MenuOverlay.T,{overlayProps:positionProps,overlayRef,restoreFocus:!0,...otherProps,children})]})}));try{MenuOverlayFromOrigin.displayName="MenuOverlayFromOrigin",MenuOverlayFromOrigin.__docgenInfo={description:"Menu overlay position based on an origin point on the screen.\nUseful when the menu is opened by a pointer event.",displayName:"MenuOverlayFromOrigin",props:{origin:{defaultValue:null,description:"Origin point within the viewport, based on which the menu overlay should be positioned.\nAny pointer/mouse event, or a plain object with clientX and clientY can be passed.",name:"origin",required:!0,type:{name:"{ clientX: number; clientY: number; target?: EventTarget | HTMLElement | null | undefined; } | undefined"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}},defaultAutoFocus:{defaultValue:null,description:"Sets the default value of {@link Menu }'s {@link MenuProps#autoFocus } prop.",name:"defaultAutoFocus",required:!1,type:{name:"boolean | FocusStrategy"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Menu/MenuOverlayFromOrigin.tsx#MenuOverlayFromOrigin"]={docgenInfo:MenuOverlayFromOrigin.__docgenInfo,name:"MenuOverlayFromOrigin",path:"src/Menu/MenuOverlayFromOrigin.tsx#MenuOverlayFromOrigin"})}catch(__react_docgen_typescript_loader_error){}},"./src/Toolbar/Toolbar.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>ToolbarSeparator,o:()=>Toolbar});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_styled__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/styled.ts"),_StyledSeparator__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/StyledSeparator.tsx"),_intellij_platform_core_utils_overflow_utils_useOverflowObserver__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/utils/overflow-utils/useOverflowObserver.tsx"),_intellij_platform_core_Icon__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/Icon/PlatformIcon.tsx"),_react_aria_overlays__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/useOverlayPosition.mjs"),_react_aria_overlays__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/Overlay.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_intellij_platform_core_Popup_StyledPopupContainer__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./src/Popup/StyledPopupContainer.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const borderStyle=({border})=>border&&_styled__WEBPACK_IMPORTED_MODULE_2__.iv`
    border-style: solid;
    border-color: ${({theme})=>theme.commonColors.borderColor};
    border-width: ${!0===border?"1px":borderPropToCssProp[border]};
  `,StyledToolbar=_styled__WEBPACK_IMPORTED_MODULE_2__.zo.div`
  display: inline-flex;
  box-sizing: border-box;
  overflow: hidden;
  // NOTE: in the original implementation, there is no empty space between buttons, but buttons have kind of an
  // invisible left padding, which is mouse-intractable, but doesn't visually seem a part of the button.
  // Although implementable, it didn't seem necessary to follow the exact same thing. Margin should be fine.
  gap: 4px;
  ${borderStyle}
  ${_StyledSeparator__WEBPACK_IMPORTED_MODULE_3__.mc}:first-child {
    display: none;
  }
  ${_StyledSeparator__WEBPACK_IMPORTED_MODULE_3__.mc}:last-child {
    display: none;
  }
`,borderPropToCssProp={top:"1px 0 0 0",bottom:"0 0 1px 0",right:"0 1px 0 0",left:"0 0 0 1px",horizontal:"0 1px",vertical:"1px 0"},StyledShowMoreButton=_styled__WEBPACK_IMPORTED_MODULE_2__.zo.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  ${borderStyle};
`,StyledHorizontalToolbar=(0,_styled__WEBPACK_IMPORTED_MODULE_2__.zo)(StyledToolbar)`
  padding: ${3}px ${4}px;
  max-width: 100%;
  /*noinspection CssInvalidPropertyValue*/
  max-width: -webkit-fill-available;
  ${_StyledSeparator__WEBPACK_IMPORTED_MODULE_3__.ve} {
    margin: 1px 0;
  }
  ${StyledShowMoreButton} {
    margin-right: -${4}px;
  }
`,StyledVerticalToolbar=(0,_styled__WEBPACK_IMPORTED_MODULE_2__.zo)(StyledToolbar)`
  flex-direction: column;
  max-height: 100%;
  /*noinspection CssInvalidPropertyValue*/
  max-height: -webkit-fill-available;
  padding: ${4}px ${3}px;
  ${_StyledSeparator__WEBPACK_IMPORTED_MODULE_3__.lX} {
    margin: 0 1px;
  }
  ${StyledShowMoreButton} {
    margin-bottom: -${4}px;
  }
`,StyledToolbarContent=_styled__WEBPACK_IMPORTED_MODULE_2__.zo.div`
  box-sizing: inherit;
  display: inherit;
  flex-direction: inherit;
  flex-wrap: ${({shouldWrap})=>shouldWrap?"wrap":"nowrap"};
  gap: inherit;
  max-height: inherit;
  max-width: inherit;
  min-height: 0;
  min-width: 0;

  ${({firstOverflowedIndex})=>_styled__WEBPACK_IMPORTED_MODULE_2__.iv`
      > ${0===firstOverflowedIndex?"*":`:nth-child(${firstOverflowedIndex}) ~ *`} {
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `}
`,OrientationContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext("horizontal"),Toolbar=({border,orientation="horizontal",...props})=>{const overflowBehavior="horizontal"===orientation&&"overflowBehavior"in props?props.overflowBehavior:null,rootProps={style:props.style,className:props.className},ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),overlayRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),showMoreButtonRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),StyledToolbar="horizontal"===orientation?StyledHorizontalToolbar:StyledVerticalToolbar,{overflowedElements}=(0,_intellij_platform_core_utils_overflow_utils_useOverflowObserver__WEBPACK_IMPORTED_MODULE_4__.o)(ref,{threshold:.8}),[isOverflowPopupVisible,setOverflowPopupVisible]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[popupHeight,setPopupHeight]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(30),[firstOverflowedChildIndex,setFirstOverflowedChildIndex]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(-1),firstOverflowedChildRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();(0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)((()=>{if(ref.current){const childElements=[...ref.current.children].filter((node=>node instanceof HTMLElement)),firstOverflowedChild=childElements.findIndex((child=>overflowedElements.includes(child)));setFirstOverflowedChildIndex(firstOverflowedChild),firstOverflowedChildRef.current=childElements[firstOverflowedChild]}}),[overflowedElements]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)((()=>{overlayRef.current&&popupHeight!==overlayRef.current.offsetHeight&&setPopupHeight(overlayRef.current.offsetHeight)}));const{overlayProps}=(0,_react_aria_overlays__WEBPACK_IMPORTED_MODULE_5__.t)({isOpen:isOverflowPopupVisible,placement:"bottom left",offset:"horizontal"===orientation?3-popupHeight+1:1-popupHeight,crossOffset:"horizontal"===orientation?-5:-4,containerPadding:0,shouldFlip:!1,targetRef:"horizontal"===orientation?ref:showMoreButtonRef,overlayRef,onClose:()=>{setOverflowPopupVisible(!1)}}),toolbarProps={onMouseMove:event=>{const firstOverflowedElement=firstOverflowedChildRef.current;if(!firstOverflowedElement)return;const shouldShow="vertical"===orientation?event.clientY>firstOverflowedElement.getBoundingClientRect().top:event.clientX>firstOverflowedElement.getBoundingClientRect().left;shouldShow!==isOverflowPopupVisible&&setOverflowPopupVisible(shouldShow)},onMouseLeave:()=>{isOverflowPopupVisible&&setOverflowPopupVisible(!1)}},toolbarOverflowPopupProps={onMouseEnter:()=>setOverflowPopupVisible(!0),onMouseLeave:()=>setOverflowPopupVisible(!1)};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(OrientationContext.Provider,{value:orientation,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(StyledToolbar,{border,...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_6__.d)(rootProps,toolbarProps),role:"toolbar",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(StyledToolbarContent,{ref,role:"presentation",firstOverflowedIndex:firstOverflowedChildIndex,shouldWrap:"wrap"===overflowBehavior,children:props.children}),overflowedElements.length>0&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(StyledShowMoreButton,{ref:showMoreButtonRef,tabIndex:-1,onMouseEnter:()=>{setOverflowPopupVisible(!0)},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core_Icon__WEBPACK_IMPORTED_MODULE_7__.vq,{icon:"ide/link"})})]}),isOverflowPopupVisible&&overflowedElements.length>0&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(OrientationContext.Provider,{value:"horizontal",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_aria_overlays__WEBPACK_IMPORTED_MODULE_8__.aV,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core_Popup_StyledPopupContainer__WEBPACK_IMPORTED_MODULE_9__.e,{ref:overlayRef,...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_6__.d)(overlayProps,toolbarOverflowPopupProps),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ToolbarInOverlay,{border:!0,firstVisibleIndex:"vertical"===orientation?firstOverflowedChildIndex:void 0,children:props.children})})})})]})};Toolbar.displayName="Toolbar";const ToolbarInOverlay=(0,_styled__WEBPACK_IMPORTED_MODULE_2__.zo)(StyledHorizontalToolbar)`
  ${({firstVisibleIndex})=>firstVisibleIndex&&_styled__WEBPACK_IMPORTED_MODULE_2__.iv`
      ${_StyledSeparator__WEBPACK_IMPORTED_MODULE_3__.mc}:nth-child(${firstVisibleIndex+1}) {
        display: none;
      }
      > :not(:nth-child(${firstVisibleIndex}) ~ *) {
        display: none;
      }
    `};
`,ToolbarSeparator=()=>"horizontal"===(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(OrientationContext)?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_StyledSeparator__WEBPACK_IMPORTED_MODULE_3__.ve,{}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_StyledSeparator__WEBPACK_IMPORTED_MODULE_3__.lX,{});try{Toolbar.displayName="Toolbar",Toolbar.__docgenInfo={description:"",displayName:"Toolbar",props:{orientation:{defaultValue:{value:"horizontal"},description:"",name:"orientation",required:!1,type:{name:"enum",value:[{value:'"vertical"'},{value:'"horizontal"'}]}},border:{defaultValue:null,description:"",name:"border",required:!1,type:{name:"ToolbarBorderProp"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},overflowBehavior:{defaultValue:null,description:"Defines how the toolbar should handle its children when there is not enough room\nto fit all:\n- popup: the overflowed children will be hidden behind a show more arrow icon that\n  shows the rest of the items in a popup.\n- wrap: children will be wrapped so that they fit the available width/height",name:"overflowBehavior",required:!1,type:{name:"enum",value:[{value:'"wrap"'},{value:'"popup"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Toolbar/Toolbar.tsx#Toolbar"]={docgenInfo:Toolbar.__docgenInfo,name:"Toolbar",path:"src/Toolbar/Toolbar.tsx#Toolbar"})}catch(__react_docgen_typescript_loader_error){}try{ToolbarSeparator.displayName="ToolbarSeparator",ToolbarSeparator.__docgenInfo={description:"Separator to be used between items in a toolbar.",displayName:"ToolbarSeparator",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Toolbar/Toolbar.tsx#ToolbarSeparator"]={docgenInfo:ToolbarSeparator.__docgenInfo,name:"ToolbarSeparator",path:"src/Toolbar/Toolbar.tsx#ToolbarSeparator"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=Menu-Menu-stories.4359283f.iframe.bundle.js.map