"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[1966],{"../../node_modules/@react-aria/overlays/dist/useOverlayTrigger.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{o:()=>$628037886ba31236$export$f9d5c8beee7d008d});var _useCloseOnScroll_mjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/useCloseOnScroll.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useId.mjs");function $628037886ba31236$export$f9d5c8beee7d008d(props,state,ref){let ariaHasPopup,{type}=props,{isOpen}=state;(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{ref&&ref.current&&_useCloseOnScroll_mjs__WEBPACK_IMPORTED_MODULE_1__.a.set(ref.current,state.close)})),"menu"===type?ariaHasPopup=!0:"listbox"===type&&(ariaHasPopup="listbox");let overlayId=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.Bi)();return{triggerProps:{"aria-haspopup":ariaHasPopup,"aria-expanded":isOpen,"aria-controls":isOpen?overlayId:null,onPress:state.toggle},overlayProps:{id:overlayId}}}},"../../node_modules/@react-stately/overlays/dist/useOverlayTriggerState.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>$fc909762b330b746$export$61c6a8c84e605fb6});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_stately_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-stately/utils/dist/useControlledState.mjs");function $fc909762b330b746$export$61c6a8c84e605fb6(props){let[isOpen,setOpen]=(0,_react_stately_utils__WEBPACK_IMPORTED_MODULE_1__.P)(props.isOpen,props.defaultOpen||!1,props.onOpenChange);const open=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setOpen(!0)}),[setOpen]),close=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setOpen(!1)}),[setOpen]),toggle=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setOpen(!isOpen)}),[setOpen,isOpen]);return{isOpen,setOpen,open,close,toggle}}},"./src/Popup/PopupTrigger.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ControlledOpen:()=>ControlledOpen,Default:()=>Default,DefaultOpen:()=>DefaultOpen,DefaultPosition:()=>DefaultPosition,DefaultSize:()=>DefaultSize,ListContent:()=>ListContent,MenuContent:()=>MenuContent,NoInteraction:()=>NoInteraction,NoResize:()=>NoResize,NonDismissable:()=>NonDismissable,OnCustomTrigger:()=>OnCustomTrigger,PlacementTop:()=>PlacementTop,Positioning:()=>Positioning,TreeContent:()=>TreeContent,__namedExportsOrder:()=>__namedExportsOrder,default:()=>PopupTrigger_stories});var react=__webpack_require__("../../node_modules/react/index.js"),IconButton=__webpack_require__("./src/IconButton/IconButton.tsx"),PlatformIcon=__webpack_require__("./src/Icon/PlatformIcon.tsx"),Popup=__webpack_require__("./src/Popup/Popup.tsx"),PopupLayout=__webpack_require__("./src/Popup/PopupLayout.tsx"),Checkbox=__webpack_require__("./src/Checkbox/Checkbox.tsx"),usePress=__webpack_require__("../../node_modules/@react-aria/interactions/dist/usePress.mjs"),useObjectRef=__webpack_require__("../../node_modules/@react-aria/interactions/node_modules/@react-aria/utils/dist/useObjectRef.mjs"),mergeProps=__webpack_require__("../../node_modules/@react-aria/interactions/node_modules/@react-aria/utils/dist/mergeProps.mjs");const $3b117e43dc0ca95d$export$27c701ed9e449e99=react.forwardRef((({children,...props},ref)=>{ref=(0,useObjectRef.U)(ref);let{pressProps}=(0,usePress.d)({...props,ref}),child=react.Children.only(children);return react.cloneElement(child,{ref,...(0,mergeProps.v)(child.props,pressProps)})}));var PopupTrigger=__webpack_require__("./src/Popup/PopupTrigger.tsx"),story_helpers=__webpack_require__("./src/Popup/story-helpers.tsx");const PopupTrigger_stories={title:"Components/PopupTrigger",component:PopupTrigger.J,args:{children:react.createElement(IconButton.K0,null,react.createElement(PlatformIcon.jE,{icon:"general/add"})),popup:react.createElement(Popup.zD,null,react.createElement(PopupLayout.j,{header:react.createElement(Popup.zD.Header,null,"Title"),content:react.createElement("div",{style:{padding:"0.375rem"}},"Popup Content. Popup Content.")}))},argTypes:{}},Default={},Positioning={render:({children,...props})=>{const[triggerPosition,setTriggerPosition]=(0,react.useState)({left:16,top:16});return react.createElement("div",{style:{height:2e3,width:2e3},onDoubleClick:e=>{e.target===e.currentTarget&&setTriggerPosition({left:e.pageX-11,top:e.pageY-11})}},react.createElement(PopupTrigger.J,props,react.createElement("span",{title:"Double click on the background to move this button to different positions",style:{position:"absolute",...triggerPosition}},children)))}},PlacementTop={args:{placement:"top"},decorators:[TheStory=>react.createElement("div",{style:{marginTop:50}},react.createElement(TheStory,null))]},DefaultOpen={args:{defaultOpen:!0}},ControlledOpen={render:props=>{const[isOpen,setOpen]=(0,react.useState)(!1);return react.createElement(react.Fragment,null,react.createElement("div",null,react.createElement(Checkbox.S,{isSelected:isOpen,onChange:setOpen},"Popup Open")),react.createElement(PopupTrigger.J,{...props,isOpen,onOpenChange:setOpen}))}},DefaultSize={args:{popup:react.createElement(Popup.zD,{defaultBounds:{width:300,height:200}},react.createElement(PopupLayout.j,{header:react.createElement(Popup.zD.Header,null,"Title"),content:react.createElement("div",{style:{padding:"0.375rem"}},"Popup Content. Popup Content.")}))}},DefaultPosition={args:{popup:react.createElement(Popup.zD,{defaultBounds:{top:100,left:100}},react.createElement(PopupLayout.j,{header:react.createElement(Popup.zD.Header,null,"Title"),content:react.createElement("div",{style:{padding:"0.375rem"}},"Popup Content. Popup Content.")}))}},NoResize={args:{popup:react.createElement(Popup.zD,{interactions:"move"},react.createElement(PopupLayout.j,{header:react.createElement(Popup.zD.Header,null,"Title"),content:react.createElement("div",{style:{padding:"0.375rem"}},"Popup Content. Popup Content.")}))}},NoInteraction={args:{popup:react.createElement(Popup.zD,{interactions:"none"},react.createElement(PopupLayout.j,{header:react.createElement(Popup.zD.Header,null,"Title"),content:react.createElement("div",{style:{padding:"0.375rem"}},"Popup Content. Popup Content.")}))}},NonDismissable={args:{popup:react.createElement(Popup.zD,{nonDismissable:!0},react.createElement(PopupLayout.j,{header:react.createElement(Popup.zD.Header,null,"Title"),content:react.createElement("div",{style:{padding:"0.375rem"}},"Popup Content. Popup Content.")}))}},ListContent={args:{popup:react.createElement(Popup.zD,null,story_helpers.eD)}},TreeContent={args:{popup:react.createElement(Popup.zD,null,story_helpers.Ic)}},MenuContent={args:{popup:({close})=>react.createElement(Popup.zD,{interactions:"none"},react.createElement(story_helpers.zB,{menuProps:{onClose:close,onAction:alert}}))}},OnCustomTrigger={args:{children:react.createElement($3b117e43dc0ca95d$export$27c701ed9e449e99,null,react.createElement("button",null,"Custom trigger"))}},__namedExportsOrder=["Default","Positioning","PlacementTop","DefaultOpen","ControlledOpen","DefaultSize","DefaultPosition","NoResize","NoInteraction","NonDismissable","ListContent","TreeContent","MenuContent","OnCustomTrigger"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{}",...Default.parameters?.docs?.source}}},Positioning.parameters={...Positioning.parameters,docs:{...Positioning.parameters?.docs,source:{originalSource:'{\n  render: ({\n    children,\n    ...props\n  }) => {\n    const [triggerPosition, setTriggerPosition] = useState({\n      left: 16,\n      top: 16\n    });\n    return <div style={{\n      height: 2000,\n      width: 2000\n    }} onDoubleClick={e => {\n      if (e.target === e.currentTarget) {\n        setTriggerPosition({\n          left: e.pageX - 11,\n          top: e.pageY - 11\n        });\n      }\n    }}>\n        <PopupTrigger {...props}>\n          <span title="Double click on the background to move this button to different positions" style={{\n          position: "absolute",\n          ...triggerPosition\n        }}>\n            {children}\n          </span>\n        </PopupTrigger>\n      </div>;\n  }\n}',...Positioning.parameters?.docs?.source}}},PlacementTop.parameters={...PlacementTop.parameters,docs:{...PlacementTop.parameters?.docs,source:{originalSource:'{\n  args: {\n    placement: "top"\n  },\n  decorators: [TheStory => <div style={{\n    marginTop: 50\n  }}>\n        <TheStory />\n      </div>]\n}',...PlacementTop.parameters?.docs?.source}}},DefaultOpen.parameters={...DefaultOpen.parameters,docs:{...DefaultOpen.parameters?.docs,source:{originalSource:"{\n  args: {\n    defaultOpen: true\n  }\n}",...DefaultOpen.parameters?.docs?.source}}},ControlledOpen.parameters={...ControlledOpen.parameters,docs:{...ControlledOpen.parameters?.docs,source:{originalSource:"{\n  render: props => {\n    const [isOpen, setOpen] = useState(false);\n    return <>\n        <div>\n          <Checkbox isSelected={isOpen} onChange={setOpen}>\n            Popup Open\n          </Checkbox>\n        </div>\n        <PopupTrigger {...props} isOpen={isOpen} onOpenChange={setOpen} />\n      </>;\n  }\n}",...ControlledOpen.parameters?.docs?.source}}},DefaultSize.parameters={...DefaultSize.parameters,docs:{...DefaultSize.parameters?.docs,source:{originalSource:'{\n  args: {\n    popup: <Popup defaultBounds={{\n      width: 300,\n      height: 200\n    }}>\n        <PopupLayout header={<Popup.Header>Title</Popup.Header>} content={<div style={{\n        padding: "0.375rem"\n      }}>\n              Popup Content. Popup Content.\n            </div>} />\n      </Popup>\n  }\n}',...DefaultSize.parameters?.docs?.source}}},DefaultPosition.parameters={...DefaultPosition.parameters,docs:{...DefaultPosition.parameters?.docs,source:{originalSource:'{\n  args: {\n    popup: <Popup defaultBounds={{\n      top: 100,\n      left: 100\n    }}>\n        <PopupLayout header={<Popup.Header>Title</Popup.Header>} content={<div style={{\n        padding: "0.375rem"\n      }}>\n              Popup Content. Popup Content.\n            </div>} />\n      </Popup>\n  }\n}',...DefaultPosition.parameters?.docs?.source}}},NoResize.parameters={...NoResize.parameters,docs:{...NoResize.parameters?.docs,source:{originalSource:'{\n  args: {\n    popup: <Popup interactions="move">\n        <PopupLayout header={<Popup.Header>Title</Popup.Header>} content={<div style={{\n        padding: "0.375rem"\n      }}>\n              Popup Content. Popup Content.\n            </div>} />\n      </Popup>\n  }\n}',...NoResize.parameters?.docs?.source}}},NoInteraction.parameters={...NoInteraction.parameters,docs:{...NoInteraction.parameters?.docs,source:{originalSource:'{\n  args: {\n    popup: <Popup interactions="none">\n        <PopupLayout header={<Popup.Header>Title</Popup.Header>} content={<div style={{\n        padding: "0.375rem"\n      }}>\n              Popup Content. Popup Content.\n            </div>} />\n      </Popup>\n  }\n}',...NoInteraction.parameters?.docs?.source}}},NonDismissable.parameters={...NonDismissable.parameters,docs:{...NonDismissable.parameters?.docs,source:{originalSource:'{\n  args: {\n    popup: <Popup nonDismissable>\n        <PopupLayout header={<Popup.Header>Title</Popup.Header>} content={<div style={{\n        padding: "0.375rem"\n      }}>\n              Popup Content. Popup Content.\n            </div>} />\n      </Popup>\n  }\n}',...NonDismissable.parameters?.docs?.source}}},ListContent.parameters={...ListContent.parameters,docs:{...ListContent.parameters?.docs,source:{originalSource:"{\n  args: {\n    popup: <Popup>{listPopupContent}</Popup>\n  }\n}",...ListContent.parameters?.docs?.source}}},TreeContent.parameters={...TreeContent.parameters,docs:{...TreeContent.parameters?.docs,source:{originalSource:"{\n  args: {\n    popup: <Popup>{treePopupContent}</Popup>\n  }\n}",...TreeContent.parameters?.docs?.source}}},MenuContent.parameters={...MenuContent.parameters,docs:{...MenuContent.parameters?.docs,source:{originalSource:'{\n  args: {\n    popup: ({\n      close\n    }) => <Popup interactions="none">\n        <MenuPopupContent menuProps={{\n        onClose: close,\n        onAction: alert\n      }} />\n      </Popup>\n  }\n}',...MenuContent.parameters?.docs?.source}}},OnCustomTrigger.parameters={...OnCustomTrigger.parameters,docs:{...OnCustomTrigger.parameters?.docs,source:{originalSource:"{\n  args: {\n    children: <Pressable>\n        <button>Custom trigger</button>\n      </Pressable>\n  }\n}",...OnCustomTrigger.parameters?.docs?.source}}}},"./src/Popup/PopupTrigger.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>PopupTrigger});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_overlays__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/overlays/dist/useOverlayTrigger.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/PressResponder.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs"),_react_stately_overlays__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-stately/overlays/dist/useOverlayTriggerState.mjs"),_PopupContext__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/Popup/PopupContext.tsx");const PopupTrigger=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((function PopupTrigger({placement,children,popup,...props},forwardedRef){const state=(0,_react_stately_overlays__WEBPACK_IMPORTED_MODULE_1__.T)(props),triggerRef=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.U)(forwardedRef),{overlayProps,triggerProps}=(0,_react_aria_overlays__WEBPACK_IMPORTED_MODULE_3__.o)({type:props.type||"menu"},state,triggerRef);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_aria_interactions__WEBPACK_IMPORTED_MODULE_4__.Y,{ref:triggerRef,...triggerProps},children),state.isOpen&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_PopupContext__WEBPACK_IMPORTED_MODULE_5__.k.Provider,{value:{overlayProps,positioning:{targetRef:triggerRef,placement},onClose:state.close}},"function"==typeof popup?popup({close:state.close}):popup))}));PopupTrigger.__docgenInfo={description:"Popup opened by a trigger. `trigger` can be an element of any pressable component (such as {@link Button} or\n{@link IconButton}), and is rendered in place. Similar to {@link Popup component}, `children` defines the content\nof Popup.",methods:[],displayName:"PopupTrigger",props:{placement:{required:!1,tsType:{name:'Required["positioning"]["placement"]',raw:'Required<PopupProps>["positioning"]["placement"]'},description:""},popup:{required:!0,tsType:{name:"union",raw:"| React.ReactElement\n| (({ close }: { close: () => void }) => React.ReactNode)",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"unknown"}]},description:""},children:{required:!0,tsType:{name:"ReactReactElement",raw:"React.ReactElement"},description:""}},composes:["Partial","OverlayTriggerStateProps"]}}}]);