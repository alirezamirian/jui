"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[2601],{"./src/Popup/Popup.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CustomHeader:()=>CustomHeader,Default:()=>Default,DefaultPosition:()=>DefaultPosition,DefaultSize:()=>DefaultSize,ListContent:()=>ListContent,MenuContent:()=>MenuContent,MinSizeContent:()=>MinSizeContent,MultiplePopups:()=>MultiplePopups,MultipleRowHeader:()=>MultipleRowHeader,NoInteraction:()=>NoInteraction,NonDismissable:()=>NonDismissable,Resizable:()=>Resizable,TreeContent:()=>TreeContent,WithHint:()=>WithHint,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var _intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/styled.ts"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/IconButton/IconButton.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/Icon/PlatformIcon.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/Checkbox/Checkbox.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/@react-aria/focus/dist/FocusScope.mjs"),_story_helpers__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./src/Popup/story-helpers.tsx"),_Popup__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Popup/Popup.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const StyledCustomHeader=_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.zo.div`
  width: 100%;
  color: ${({theme})=>theme.commonColors.labelForeground};
  gap: 0.625rem;
  display: flex;
  align-items: center;
`,StyledCustomHeaderTitle=_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.zo.div`
  overflow: hidden;
  flex: 1;
  padding-inline-start: 0.625rem;
`,StyledCustomHeaderMuted=_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.zo.span`
  color: ${({theme})=>theme.commonColors.inactiveTextColor};
`,StyledCustomHeader2=_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.zo.div`
  width: 100%;
  color: ${({theme})=>theme.commonColors.labelForeground};
  background: ${({theme})=>theme.color("SearchEverywhere.Header.background")};
  gap: 0.625rem;
  display: flex;
  height: 100%;
  padding: 0 1rem;
`,StyledTabs=_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.zo.div`
  display: flex;
  height: 100%;
  button {
    all: unset;
    padding: 0.5rem 1rem;
  }
  .active {
    background: ${({theme})=>theme.color("SearchEverywhere.Tab.selectedBackground")};
  }
`,StyledSearchFieldHint=_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.zo.div`
  color: ${({theme})=>theme.color("SearchEverywhere.SearchField.infoForeground")};
  white-space: nowrap;
`,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Popup",component:_Popup__WEBPACK_IMPORTED_MODULE_3__.GI,render:props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input",{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popup__WEBPACK_IMPORTED_MODULE_3__.GI,{...props})]}),args:{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popup__WEBPACK_IMPORTED_MODULE_3__.GI.Layout,{content:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{padding:"0.375rem"},children:"Popup Content"}),header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popup__WEBPACK_IMPORTED_MODULE_3__.GI.Header,{children:"Popup Title"})}),id:"popup"},parameters:{actions:{argTypesRegex:"^on((?!BoundsChanging).)*$"}},argTypes:{}},Default={},MultiplePopups=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popup__WEBPACK_IMPORTED_MODULE_3__.GI,{defaultBounds:{height:300,width:350,left:150,top:250},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popup__WEBPACK_IMPORTED_MODULE_3__.GI.Header,{children:"First popup"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popup__WEBPACK_IMPORTED_MODULE_3__.GI,{defaultBounds:{height:200,width:150,left:100,top:200},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popup__WEBPACK_IMPORTED_MODULE_3__.GI.Header,{children:"Second popup"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popup__WEBPACK_IMPORTED_MODULE_3__.GI,{defaultBounds:{height:150,width:300,left:150,top:100},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popup__WEBPACK_IMPORTED_MODULE_3__.GI.Header,{children:"Third popup"})})]}),MinSizeContent={args:{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popup__WEBPACK_IMPORTED_MODULE_3__.GI.Header,{children:"Title"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{style:{padding:"0.5rem"},children:["Popup Content. Popup Content. ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("br",{}),"Popup Content. Popup Content. ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("br",{}),"Popup Content. Popup Content."]})]}),interactions:"all",minHeight:"content",minWidth:"content"}},DefaultSize={args:{defaultBounds:{width:300,height:200}}},DefaultPosition={args:{defaultBounds:{top:100,left:100}}},Resizable={args:{interactions:"all"}},NoInteraction={args:{interactions:"none"}},NonDismissable={args:{nonDismissable:!0}},CustomHeader={args:{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popup__WEBPACK_IMPORTED_MODULE_3__.GI.Layout,{header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popup__WEBPACK_IMPORTED_MODULE_3__.GI.Header,{hasControls:!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(StyledCustomHeader,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(StyledCustomHeaderTitle,{children:["Method ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("b",{children:"setActive(boolean)"})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(StyledCustomHeaderMuted,{children:"of com.intellij.ui.TitlePanel"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{children:"6+ usages"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__.hU,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__.vq,{icon:"actions/moveToBottomLeft"})})]})}),content:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{minHeight:100,padding:"0.5rem"},children:"Content"}),footer:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popup__WEBPACK_IMPORTED_MODULE_3__.GI.Hint,{children:"Press ⌥⌘F7 again to search in 'Project files'"})})}},StyledSearchFieldContainer=_intellij_platform_core__WEBPACK_IMPORTED_MODULE_2__.zo.div`
  display: flex;
  flex-shrink: 0;
  height: 1.85rem;
  align-items: center;
  padding: 0.125rem 0.75rem 0; // Not sure why, but alignment is off without 2px (0.125rem) padding top
  gap: 0.75rem;
  border: 1px solid
    ${({theme})=>theme.color("SearchEverywhere.SearchField.borderColor")};
  border-width: 1px 0;
  input {
    all: unset;
    flex: 1;
    line-height: 1.25;

    &::selection {
      color: ${({theme})=>theme.color("*.selectionForeground")};
      background: ${({theme})=>theme.color("*.selectionBackground")};
    }
  }
`,MultipleRowHeader={args:{interactions:"all",minWidth:"content",minHeight:20,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popup__WEBPACK_IMPORTED_MODULE_3__.GI.Layout,{header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popup__WEBPACK_IMPORTED_MODULE_3__.GI.Header,{hasControls:!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(StyledCustomHeader2,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{flex:1,height:"100%"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(StyledTabs,{onMouseDown:e=>{e.stopPropagation()},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button",{children:"All"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button",{children:"Classes"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button",{className:"active",children:"Files"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button",{children:"Symbols"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button",{children:"Actions"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_6__.X,{preventFocus:!0,children:"Include disabled actions"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(StyledSearchFieldContainer,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__.vq,{icon:"actions/search"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_7__.MT,{contain:!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input",{autoFocus:!0})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(StyledSearchFieldHint,{children:"Press ⌥⏎ to assign a shortcut"})]})]}),content:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{minHeight:100,padding:"0.5rem"},children:"Content"}),footer:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popup__WEBPACK_IMPORTED_MODULE_3__.GI.Hint,{children:"Resize to see the order of things going out of the view: content, footer, header"})})}},WithHint={args:{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popup__WEBPACK_IMPORTED_MODULE_3__.GI.Layout,{content:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{padding:"0.375rem"},children:"Popup Content"}),header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popup__WEBPACK_IMPORTED_MODULE_3__.GI.Header,{children:"Popup Title"}),footer:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popup__WEBPACK_IMPORTED_MODULE_3__.GI.Hint,{children:"Press ⌥⌘F7 again to search in 'Project files'"})})}},ListContent={args:{children:_story_helpers__WEBPACK_IMPORTED_MODULE_8__.Ox}},TreeContent={args:{children:_story_helpers__WEBPACK_IMPORTED_MODULE_8__.s$}},MenuContent={args:{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_story_helpers__WEBPACK_IMPORTED_MODULE_8__.AC,{})}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{}",...Default.parameters?.docs?.source}}},MultiplePopups.parameters={...MultiplePopups.parameters,docs:{...MultiplePopups.parameters?.docs,source:{originalSource:"() => {\n  return <>\n      <Popup defaultBounds={{\n      height: 300,\n      width: 350,\n      left: 150,\n      top: 250\n    }}>\n        <Popup.Header>First popup</Popup.Header>\n      </Popup>\n      <Popup defaultBounds={{\n      height: 200,\n      width: 150,\n      left: 100,\n      top: 200\n    }}>\n        <Popup.Header>Second popup</Popup.Header>\n      </Popup>\n      <Popup defaultBounds={{\n      height: 150,\n      width: 300,\n      left: 150,\n      top: 100\n    }}>\n        <Popup.Header>Third popup</Popup.Header>\n      </Popup>\n    </>;\n}",...MultiplePopups.parameters?.docs?.source}}},MinSizeContent.parameters={...MinSizeContent.parameters,docs:{...MinSizeContent.parameters?.docs,source:{originalSource:'{\n  args: {\n    children: <>\n        <Popup.Header>Title</Popup.Header>\n        <div style={{\n        padding: "0.5rem"\n      }}>\n          Popup Content. Popup Content. <br />\n          Popup Content. Popup Content. <br />\n          Popup Content. Popup Content.\n        </div>\n      </>,\n    interactions: "all",\n    minHeight: "content",\n    minWidth: "content"\n  }\n}',...MinSizeContent.parameters?.docs?.source}}},DefaultSize.parameters={...DefaultSize.parameters,docs:{...DefaultSize.parameters?.docs,source:{originalSource:"{\n  args: {\n    defaultBounds: {\n      width: 300,\n      height: 200\n    }\n  }\n}",...DefaultSize.parameters?.docs?.source}}},DefaultPosition.parameters={...DefaultPosition.parameters,docs:{...DefaultPosition.parameters?.docs,source:{originalSource:"{\n  args: {\n    defaultBounds: {\n      top: 100,\n      left: 100\n    }\n  }\n}",...DefaultPosition.parameters?.docs?.source}}},Resizable.parameters={...Resizable.parameters,docs:{...Resizable.parameters?.docs,source:{originalSource:'{\n  args: {\n    interactions: "all"\n  }\n}',...Resizable.parameters?.docs?.source}}},NoInteraction.parameters={...NoInteraction.parameters,docs:{...NoInteraction.parameters?.docs,source:{originalSource:'{\n  args: {\n    interactions: "none"\n  }\n}',...NoInteraction.parameters?.docs?.source}}},NonDismissable.parameters={...NonDismissable.parameters,docs:{...NonDismissable.parameters?.docs,source:{originalSource:"{\n  args: {\n    nonDismissable: true\n  }\n}",...NonDismissable.parameters?.docs?.source}}},CustomHeader.parameters={...CustomHeader.parameters,docs:{...CustomHeader.parameters?.docs,source:{originalSource:'{\n  args: {\n    children: <Popup.Layout header={<Popup.Header hasControls>\n            <StyledCustomHeader>\n              <StyledCustomHeaderTitle>\n                Method <b>setActive(boolean)</b>&nbsp;\n                <StyledCustomHeaderMuted>\n                  of com.intellij.ui.TitlePanel\n                </StyledCustomHeaderMuted>\n              </StyledCustomHeaderTitle>\n              <span>6+ usages</span>\n              <IconButton>\n                <PlatformIcon icon="actions/moveToBottomLeft" />\n              </IconButton>\n            </StyledCustomHeader>\n          </Popup.Header>} content={<div style={{\n      minHeight: 100,\n      padding: "0.5rem"\n    }}>Content</div>} footer={<Popup.Hint>Press ⌥⌘F7 again to search in \'Project files\'</Popup.Hint>} />\n  }\n}',...CustomHeader.parameters?.docs?.source}}},MultipleRowHeader.parameters={...MultipleRowHeader.parameters,docs:{...MultipleRowHeader.parameters?.docs,source:{originalSource:'{\n  args: {\n    interactions: "all",\n    minWidth: "content",\n    minHeight: 20,\n    children: <Popup.Layout header={<>\n            <Popup.Header hasControls>\n              <StyledCustomHeader2>\n                <div style={{\n            flex: 1,\n            height: "100%"\n          }}>\n                  <StyledTabs onMouseDown={e => {\n              e.stopPropagation();\n            }}>\n                    <button>All</button>\n                    <button>Classes</button>\n                    <button className="active">Files</button>\n                    <button>Symbols</button>\n                    <button>Actions</button>\n                  </StyledTabs>\n                </div>\n                <Checkbox preventFocus>Include disabled actions</Checkbox>\n              </StyledCustomHeader2>\n            </Popup.Header>\n            <StyledSearchFieldContainer>\n              <PlatformIcon icon="actions/search" />\n              <FocusScope contain>\n                <input autoFocus />\n              </FocusScope>\n              <StyledSearchFieldHint>\n                Press ⌥⏎ to assign a shortcut\n              </StyledSearchFieldHint>\n            </StyledSearchFieldContainer>\n          </>} content={<div style={{\n      minHeight: 100,\n      padding: "0.5rem"\n    }}>Content</div>} footer={<Popup.Hint>\n            Resize to see the order of things going out of the view: content,\n            footer, header\n          </Popup.Hint>} />\n  }\n}',...MultipleRowHeader.parameters?.docs?.source}}},WithHint.parameters={...WithHint.parameters,docs:{...WithHint.parameters?.docs,source:{originalSource:"{\n  args: {\n    children: <Popup.Layout content={<div style={{\n      padding: \"0.375rem\"\n    }}>Popup Content</div>} header={<Popup.Header>Popup Title</Popup.Header>} footer={<Popup.Hint>Press ⌥⌘F7 again to search in 'Project files'</Popup.Hint>} />\n  }\n}",...WithHint.parameters?.docs?.source}}},ListContent.parameters={...ListContent.parameters,docs:{...ListContent.parameters?.docs,source:{originalSource:"{\n  args: {\n    children: listPopupContent\n  }\n}",...ListContent.parameters?.docs?.source}}},TreeContent.parameters={...TreeContent.parameters,docs:{...TreeContent.parameters?.docs,source:{originalSource:"{\n  args: {\n    children: treePopupContent\n  }\n}",...TreeContent.parameters?.docs?.source}}},MenuContent.parameters={...MenuContent.parameters,docs:{...MenuContent.parameters?.docs,source:{originalSource:"{\n  args: {\n    children: <MenuPopupContent />\n  }\n}",...MenuContent.parameters?.docs?.source}}};const __namedExportsOrder=["Default","MultiplePopups","MinSizeContent","DefaultSize","DefaultPosition","Resizable","NoInteraction","NonDismissable","CustomHeader","MultipleRowHeader","WithHint","ListContent","TreeContent","MenuContent"]}}]);