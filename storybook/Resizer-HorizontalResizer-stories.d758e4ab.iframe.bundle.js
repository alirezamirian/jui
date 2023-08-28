"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[1154],{"./src/Resizer/HorizontalResizer.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CustomAppearance:()=>CustomAppearance,Default:()=>Default,WithMinSize:()=>WithMinSize,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),_story_helpers__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/story-helpers.tsx"),_styled__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/styled.ts"),_BottomResizer__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/Resizer/BottomResizer.tsx"),_LeftResizer__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Resizer/LeftResizer.tsx"),_RightResizer__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/Resizer/RightResizer.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const meta={title:"Components/HorizontalResizer",parameters:{layout:"fullscreen",controls:{exclude:_story_helpers__WEBPACK_IMPORTED_MODULE_2__.q},component:_LeftResizer__WEBPACK_IMPORTED_MODULE_3__.t},argTypes:{orientation:{defaultValue:"horizontal",options:["horizontal","vertical"],control:{type:"radio"}},background:{defaultValue:"red"},size:{defaultValue:5},outerPadding:{defaultValue:10}}},__WEBPACK_DEFAULT_EXPORT__=meta,HorizontalContainer=_styled__WEBPACK_IMPORTED_MODULE_4__.zo.div`
  height: 100vh;
  display: flex;
`,VerticalContainer=_styled__WEBPACK_IMPORTED_MODULE_4__.zo.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`,LeftSide=_styled__WEBPACK_IMPORTED_MODULE_4__.zo.div`
  background: lightseagreen;
  height: 100%;
`,RightSide=_styled__WEBPACK_IMPORTED_MODULE_4__.zo.div`
  background: lightslategray;
  height: 100%;
  flex: 1;
`,TopSize=_styled__WEBPACK_IMPORTED_MODULE_4__.zo.div`
  background: lightseagreen;
  width: 100%;
`,BottomSide=_styled__WEBPACK_IMPORTED_MODULE_4__.zo.div`
  background: lightslategray;
  width: 100%;
  flex: 1;
`,getComponentsAndProps=(orientation,size)=>"horizontal"===orientation?{Container:HorizontalContainer,FirstSide:LeftSide,SecondSide:RightSide,Resizer:_RightResizer__WEBPACK_IMPORTED_MODULE_5__.i,sizeStyles:{width:size}}:{Container:VerticalContainer,FirstSide:TopSize,SecondSide:BottomSide,Resizer:_BottomResizer__WEBPACK_IMPORTED_MODULE_6__.o,sizeStyles:{height:size}},Default={render:({orientation,...props})=>{const[size,setSize]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(200),{Resizer,Container,FirstSide,SecondSide,sizeStyles}=getComponentsAndProps(orientation,size);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(Container,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(FirstSide,{style:sizeStyles,children:"Resizable panel"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Resizer,{...props,onResizeStarted:(...args)=>(props.onResizeStarted(...args),size),onResize:(...args)=>{setSize(args[0]),props.onResize(...args)}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SecondSide,{})]})}},Handle=_styled__WEBPACK_IMPORTED_MODULE_4__.zo.div`
  background: grey;
  border-radius: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${({orientation})=>"horizontal"===orientation?(0,styled_components__WEBPACK_IMPORTED_MODULE_7__.iv)(["height:42px;width:50%;"]):(0,styled_components__WEBPACK_IMPORTED_MODULE_7__.iv)(["width:42px;height:50%;"])}
`,CustomAppearance={render:({orientation,...props})=>{const[size,setSize]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(200),{Resizer,Container,FirstSide,SecondSide,sizeStyles}=getComponentsAndProps(orientation,size);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(Container,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(FirstSide,{style:sizeStyles,children:"Resizable panel"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Resizer,{...props,onResizeStarted:(...args)=>(props.onResizeStarted(...args),size),onResize:(...args)=>{setSize(args[0]),props.onResize(...args)},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Handle,{orientation})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SecondSide,{})]})},argTypes:{...meta.argTypes,background:{defaultValue:"lightgrey"},size:{defaultValue:10}}},WithMinSize={render:({orientation,minSize,...props})=>{const[size,setSize]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(200),{Resizer,Container,FirstSide,SecondSide,sizeStyles}=getComponentsAndProps(orientation,size);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(Container,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(FirstSide,{style:{...sizeStyles,["horizontal"===orientation?"minWidth":"minHeight"]:minSize},children:"Resizable panel"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Resizer,{...props,onResizeStarted:(...args)=>(props.onResizeStarted(...args),size),onResize:(...args)=>{setSize(args[0]),props.onResize(...args)}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SecondSide,{})]})},argTypes:{...meta.argTypes,minSize:{type:"string",options:["100px","fit-content","min-content",void 0],control:{type:"select"},defaultValue:"100px"}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: ({\n    orientation,\n    ...props\n  }) => {\n    const [size, setSize] = useState(200);\n    const {\n      Resizer,\n      Container,\n      FirstSide,\n      SecondSide,\n      sizeStyles\n    } = getComponentsAndProps(orientation, size);\n    return <Container>\n        <FirstSide style={sizeStyles}>Resizable panel</FirstSide>\n        <Resizer {...props} onResizeStarted={(...args) => {\n        props.onResizeStarted(...args);\n        return size;\n      }} onResize={(...args) => {\n        setSize(args[0]);\n        props.onResize(...args);\n      }} />\n        <SecondSide />\n      </Container>;\n  }\n}",...Default.parameters?.docs?.source}}},CustomAppearance.parameters={...CustomAppearance.parameters,docs:{...CustomAppearance.parameters?.docs,source:{originalSource:'{\n  render: ({\n    orientation,\n    ...props\n  }: StoryProps) => {\n    const [size, setSize] = useState(200);\n    const {\n      Resizer,\n      Container,\n      FirstSide,\n      SecondSide,\n      sizeStyles\n    } = getComponentsAndProps(orientation, size);\n    return <Container>\n        <FirstSide style={sizeStyles}>Resizable panel</FirstSide>\n        <Resizer {...props} onResizeStarted={(...args) => {\n        props.onResizeStarted(...args);\n        return size;\n      }} onResize={(...args) => {\n        setSize(args[0]);\n        props.onResize(...args);\n      }}>\n          <Handle orientation={orientation} />\n        </Resizer>\n        <SecondSide />\n      </Container>;\n  },\n  argTypes: {\n    ...meta.argTypes,\n    background: {\n      defaultValue: "lightgrey"\n    },\n    size: {\n      defaultValue: 10\n    }\n  }\n}',...CustomAppearance.parameters?.docs?.source}}},WithMinSize.parameters={...WithMinSize.parameters,docs:{...WithMinSize.parameters?.docs,source:{originalSource:'{\n  render: ({\n    orientation,\n    minSize,\n    ...props\n  }: StoryProps & {\n    minSize: CSSProperties["minWidth" | "minHeight"];\n  }) => {\n    const [size, setSize] = useState(200);\n    const {\n      Resizer,\n      Container,\n      FirstSide,\n      SecondSide,\n      sizeStyles\n    } = getComponentsAndProps(orientation, size);\n    return <Container>\n        <FirstSide style={{\n        ...sizeStyles,\n        [orientation === "horizontal" ? "minWidth" : "minHeight"]: minSize\n      }}>\n          Resizable panel\n        </FirstSide>\n        <Resizer {...props} onResizeStarted={(...args) => {\n        props.onResizeStarted(...args);\n        return size;\n      }} onResize={(...args) => {\n        setSize(args[0]);\n        props.onResize(...args);\n      }} />\n        <SecondSide />\n      </Container>;\n  },\n  argTypes: {\n    ...meta.argTypes,\n    minSize: {\n      type: "string",\n      options: ["100px", "fit-content", "min-content", undefined],\n      control: {\n        type: "select"\n      },\n      defaultValue: "100px"\n    }\n  }\n}',...WithMinSize.parameters?.docs?.source}}};const __namedExportsOrder=["Default","CustomAppearance","WithMinSize"]},"./src/Resizer/BottomResizer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{o:()=>BottomResizer});__webpack_require__("../../node_modules/react/index.js");var _useResizer__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Resizer/useResizer.ts"),_VerticalResizer__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Resizer/VerticalResizer.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const BottomResizer=({onResize,onResizeEnd,onResizeStarted,...props})=>{const{resizerProps}=(0,_useResizer__WEBPACK_IMPORTED_MODULE_2__.mT)({onResize,onResizeEnd,onResizeStarted});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_VerticalResizer__WEBPACK_IMPORTED_MODULE_3__.h,{resizerProps,...props})};BottomResizer.displayName="BottomResizer";try{BottomResizer.displayName="BottomResizer",BottomResizer.__docgenInfo={description:"Handle for resizing views in a vertical layout, where the resizer is at the top side of the resizable view. i.e.\nmoving mouse to bottom/top will increase/decrease the height",displayName:"BottomResizer",props:{onResizeStarted:{defaultValue:null,description:"Called when the resize starts by a move action. The callback can optionally\nreturn the initial width of the view for which the resize handle\nis used. The amount of resize will be added to this initial value and\npassed to `onResize`, when movement happens.",name:"onResizeStarted",required:!0,type:{name:"() => number | void"}},onResize:{defaultValue:null,description:"Called when resize is happening.\n@param size : New size based on the diff and the initial size returned\nby onResizeStarted, or zero if initial size is not returned.",name:"onResize",required:!0,type:{name:"(size: number) => void"}},onResizeEnd:{defaultValue:null,description:"Called when movement interaction is finished, e.g. by a mouse up event.",name:"onResizeEnd",required:!1,type:{name:"(() => void)"}},background:{defaultValue:null,description:"Background color of the visible space-occupying part of the resize handle.",name:"background",required:!1,type:{name:"Background<string | number>"}},size:{defaultValue:{value:"0"},description:"Visible and space-occupying part of the resize handle. Total grab-able\nwidth will be `size` + `outerPadding`",name:"size",required:!1,type:{name:"number"}},outerPadding:{defaultValue:{value:"10"},description:"Length of the extra grab-able zone around the resize handle.\nFor example, if set to 10 there will be an area of length 5 pixels in each\nside of the handle which still can be used for resizing.",name:"outerPadding",required:!1,type:{name:"number"}},cursor:{defaultValue:null,description:"Resizer cursor.",name:"cursor",required:!1,type:{name:"enum",value:[{value:'"s"'},{value:'"row"'},{value:'"ns"'},{value:'"n"'}]}},children:{defaultValue:null,description:"Any arbitrary content for customizing look and feel of the resizer.\nFor example for showing a rounded handle kind of thing in the middle,\nor showing shadows, etc.",name:"children",required:!1,type:{name:"ReactNode"}},style:{defaultValue:null,description:"styles passed to the root resizer element. `width` and `background` is not allowed and will be overridden.\nNOTE: it's added to allow use case of absolutely positioned resizers in float tool windows. Might be a better\nidea to add a `absolute` instead option and apply the necessary style based on it, if it can be seen as a re-usable\nand legit feature.",name:"style",required:!1,type:{name:'Omit<CSSProperties, "background" | "height">'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Resizer/BottomResizer.tsx#BottomResizer"]={docgenInfo:BottomResizer.__docgenInfo,name:"BottomResizer",path:"src/Resizer/BottomResizer.tsx#BottomResizer"})}catch(__react_docgen_typescript_loader_error){}},"./src/Resizer/HorizontalResizer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{N:()=>HorizontalResizer});__webpack_require__("../../node_modules/react/index.js");var styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const StyledHorizontalResizer=styled_components__WEBPACK_IMPORTED_MODULE_2__.ZP.div.withConfig({displayName:"HorizontalResizer__StyledHorizontalResizer",componentId:"sc-44e68r-0"})(["top:0;height:100%;width:0;position:relative;z-index:1;"]),StyledHorizontalResizerArea=styled_components__WEBPACK_IMPORTED_MODULE_2__.ZP.div.withConfig({displayName:"HorizontalResizer__StyledHorizontalResizerArea",componentId:"sc-44e68r-1"})(["position:absolute;cursor:",";width:",";height:100%;left:",";"],(({cursor})=>`${cursor}-resize`),(({handleSize})=>`calc(100% + ${handleSize}px)`),(({handleSize})=>`-${handleSize/2}px`)),HorizontalResizer=({outerPadding=10,background,size=0,cursor="col",children,style={},resizerProps})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(StyledHorizontalResizer,{...resizerProps,style:{...style,background,width:size},children:[children,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(StyledHorizontalResizerArea,{handleSize:outerPadding,cursor})]});HorizontalResizer.displayName="HorizontalResizer";try{HorizontalResizer.displayName="HorizontalResizer",HorizontalResizer.__docgenInfo={description:"Handle for resizing views in a horizontal layout. It just handles the\nmovement event and calls onResize with the new size. It has nothing to do\nwith actually applying the size.",displayName:"HorizontalResizer",props:{children:{defaultValue:null,description:"Any arbitrary content for customizing look and feel of the resizer.\nFor example for showing a rounded handle kind of thing in the middle,\nor showing shadows, etc.",name:"children",required:!1,type:{name:"ReactNode"}},style:{defaultValue:{value:"{}"},description:"styles passed to the root resizer element. `width` and `background` is not allowed and will be overridden.\nNOTE: it's added to allow use case of absolutely positioned resizers in float tool windows. Might be a better\nidea to add a `absolute` instead option and apply the necessary style based on it, if it can be seen as a re-usable\nand legit feature.",name:"style",required:!1,type:{name:'Omit<CSSProperties, "width" | "background">'}},background:{defaultValue:null,description:"Background color of the visible space-occupying part of the resize handle.",name:"background",required:!1,type:{name:"Background<string | number>"}},size:{defaultValue:{value:"0"},description:"Visible and space-occupying part of the resize handle. Total grab-able\nwidth will be `size` + `outerPadding`",name:"size",required:!1,type:{name:"number"}},outerPadding:{defaultValue:{value:"10"},description:"Length of the extra grab-able zone around the resize handle.\nFor example, if set to 10 there will be an area of length 5 pixels in each\nside of the handle which still can be used for resizing.",name:"outerPadding",required:!1,type:{name:"number"}},cursor:{defaultValue:{value:"col"},description:"Resizer cursor.",name:"cursor",required:!1,type:{name:"enum",value:[{value:'"col"'},{value:'"ew"'},{value:'"e"'},{value:'"w"'}]}},resizerProps:{defaultValue:null,description:"",name:"resizerProps",required:!0,type:{name:"{ onMouseDown?: MouseEventHandler<Element> | undefined; }"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Resizer/HorizontalResizer.tsx#HorizontalResizer"]={docgenInfo:HorizontalResizer.__docgenInfo,name:"HorizontalResizer",path:"src/Resizer/HorizontalResizer.tsx#HorizontalResizer"})}catch(__react_docgen_typescript_loader_error){}},"./src/Resizer/LeftResizer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{t:()=>LeftResizer});__webpack_require__("../../node_modules/react/index.js");var _HorizontalResizer__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Resizer/HorizontalResizer.tsx"),_useResizer__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Resizer/useResizer.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const LeftResizer=({onResize,onResizeEnd,onResizeStarted,...props})=>{const{resizerProps}=(0,_useResizer__WEBPACK_IMPORTED_MODULE_2__.s3)({onResize,onResizeEnd,onResizeStarted});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_HorizontalResizer__WEBPACK_IMPORTED_MODULE_3__.N,{resizerProps,...props})};LeftResizer.displayName="LeftResizer";try{LeftResizer.displayName="LeftResizer",LeftResizer.__docgenInfo={description:"Handle for resizing views in a horizontal layout, where the resizer is at the left side of the resizable view. i.e.\nmoving mouse to right/left will decrease/increase the width",displayName:"LeftResizer",props:{onResizeStarted:{defaultValue:null,description:"Called when the resize starts by a move action. The callback can optionally\nreturn the initial width of the view for which the resize handle\nis used. The amount of resize will be added to this initial value and\npassed to `onResize`, when movement happens.",name:"onResizeStarted",required:!0,type:{name:"() => number | void"}},onResize:{defaultValue:null,description:"Called when resize is happening.\n@param size : New size based on the diff and the initial size returned\nby onResizeStarted, or zero if initial size is not returned.",name:"onResize",required:!0,type:{name:"(size: number) => void"}},onResizeEnd:{defaultValue:null,description:"Called when movement interaction is finished, e.g. by a mouse up event.",name:"onResizeEnd",required:!1,type:{name:"(() => void)"}},background:{defaultValue:null,description:"Background color of the visible space-occupying part of the resize handle.",name:"background",required:!1,type:{name:"Background<string | number>"}},size:{defaultValue:{value:"0"},description:"Visible and space-occupying part of the resize handle. Total grab-able\nwidth will be `size` + `outerPadding`",name:"size",required:!1,type:{name:"number"}},outerPadding:{defaultValue:{value:"10"},description:"Length of the extra grab-able zone around the resize handle.\nFor example, if set to 10 there will be an area of length 5 pixels in each\nside of the handle which still can be used for resizing.",name:"outerPadding",required:!1,type:{name:"number"}},cursor:{defaultValue:null,description:"Resizer cursor.",name:"cursor",required:!1,type:{name:"enum",value:[{value:'"col"'},{value:'"ew"'},{value:'"e"'},{value:'"w"'}]}},children:{defaultValue:null,description:"Any arbitrary content for customizing look and feel of the resizer.\nFor example for showing a rounded handle kind of thing in the middle,\nor showing shadows, etc.",name:"children",required:!1,type:{name:"ReactNode"}},style:{defaultValue:null,description:"styles passed to the root resizer element. `width` and `background` is not allowed and will be overridden.\nNOTE: it's added to allow use case of absolutely positioned resizers in float tool windows. Might be a better\nidea to add a `absolute` instead option and apply the necessary style based on it, if it can be seen as a re-usable\nand legit feature.",name:"style",required:!1,type:{name:'Omit<CSSProperties, "width" | "background">'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Resizer/LeftResizer.tsx#LeftResizer"]={docgenInfo:LeftResizer.__docgenInfo,name:"LeftResizer",path:"src/Resizer/LeftResizer.tsx#LeftResizer"})}catch(__react_docgen_typescript_loader_error){}},"./src/Resizer/RightResizer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>RightResizer});__webpack_require__("../../node_modules/react/index.js");var _HorizontalResizer__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Resizer/HorizontalResizer.tsx"),_useResizer__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Resizer/useResizer.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const RightResizer=({onResize,onResizeEnd,onResizeStarted,...props})=>{const{resizerProps}=(0,_useResizer__WEBPACK_IMPORTED_MODULE_2__.hT)({onResize,onResizeEnd,onResizeStarted});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_HorizontalResizer__WEBPACK_IMPORTED_MODULE_3__.N,{resizerProps,...props})};RightResizer.displayName="RightResizer";try{RightResizer.displayName="RightResizer",RightResizer.__docgenInfo={description:"Handle for resizing views in a horizontal layout, where the resizer is at the right side of the resizable view. i.e.\nmoving mouse to right/left will increase/decrease the width",displayName:"RightResizer",props:{onResizeStarted:{defaultValue:null,description:"Called when the resize starts by a move action. The callback can optionally\nreturn the initial width of the view for which the resize handle\nis used. The amount of resize will be added to this initial value and\npassed to `onResize`, when movement happens.",name:"onResizeStarted",required:!0,type:{name:"() => number | void"}},onResize:{defaultValue:null,description:"Called when resize is happening.\n@param size : New size based on the diff and the initial size returned\nby onResizeStarted, or zero if initial size is not returned.",name:"onResize",required:!0,type:{name:"(size: number) => void"}},onResizeEnd:{defaultValue:null,description:"Called when movement interaction is finished, e.g. by a mouse up event.",name:"onResizeEnd",required:!1,type:{name:"(() => void)"}},background:{defaultValue:null,description:"Background color of the visible space-occupying part of the resize handle.",name:"background",required:!1,type:{name:"Background<string | number>"}},size:{defaultValue:{value:"0"},description:"Visible and space-occupying part of the resize handle. Total grab-able\nwidth will be `size` + `outerPadding`",name:"size",required:!1,type:{name:"number"}},outerPadding:{defaultValue:{value:"10"},description:"Length of the extra grab-able zone around the resize handle.\nFor example, if set to 10 there will be an area of length 5 pixels in each\nside of the handle which still can be used for resizing.",name:"outerPadding",required:!1,type:{name:"number"}},cursor:{defaultValue:null,description:"Resizer cursor.",name:"cursor",required:!1,type:{name:"enum",value:[{value:'"col"'},{value:'"ew"'},{value:'"e"'},{value:'"w"'}]}},children:{defaultValue:null,description:"Any arbitrary content for customizing look and feel of the resizer.\nFor example for showing a rounded handle kind of thing in the middle,\nor showing shadows, etc.",name:"children",required:!1,type:{name:"ReactNode"}},style:{defaultValue:null,description:"styles passed to the root resizer element. `width` and `background` is not allowed and will be overridden.\nNOTE: it's added to allow use case of absolutely positioned resizers in float tool windows. Might be a better\nidea to add a `absolute` instead option and apply the necessary style based on it, if it can be seen as a re-usable\nand legit feature.",name:"style",required:!1,type:{name:'Omit<CSSProperties, "width" | "background">'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Resizer/RightResizer.tsx#RightResizer"]={docgenInfo:RightResizer.__docgenInfo,name:"RightResizer",path:"src/Resizer/RightResizer.tsx#RightResizer"})}catch(__react_docgen_typescript_loader_error){}},"./src/Resizer/VerticalResizer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{h:()=>VerticalResizer});__webpack_require__("../../node_modules/react/index.js");var styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const StyledVerticalResizer=styled_components__WEBPACK_IMPORTED_MODULE_2__.ZP.div.withConfig({displayName:"VerticalResizer__StyledVerticalResizer",componentId:"sc-1tug48n-0"})(["width:100%;height:0;position:relative;z-index:1;"]),StyledVerticalResizerArea=styled_components__WEBPACK_IMPORTED_MODULE_2__.ZP.div.withConfig({displayName:"VerticalResizer__StyledVerticalResizerArea",componentId:"sc-1tug48n-1"})(["position:absolute;cursor:",";height:",";width:100%;top:",";"],(({cursor})=>`${cursor}-resize`),(({handleSize})=>`calc(100% + ${handleSize}px)`),(({handleSize})=>`-${handleSize/2}px`)),VerticalResizer=({outerPadding=10,background,size=0,cursor="row",resizerProps,children,style={}})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(StyledVerticalResizer,{...resizerProps,style:{...style,background,height:size},children:[children,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(StyledVerticalResizerArea,{handleSize:outerPadding,cursor})]});VerticalResizer.displayName="VerticalResizer";try{VerticalResizer.displayName="VerticalResizer",VerticalResizer.__docgenInfo={description:"Handle for resizing views in a vertical layout. It just handles the\nmovement event and calls onResize with the new size. It has nothing to do\nwith actually applying the size.",displayName:"VerticalResizer",props:{children:{defaultValue:null,description:"Any arbitrary content for customizing look and feel of the resizer.\nFor example for showing a rounded handle kind of thing in the middle,\nor showing shadows, etc.",name:"children",required:!1,type:{name:"ReactNode"}},style:{defaultValue:{value:"{}"},description:"styles passed to the root resizer element. `width` and `background` is not allowed and will be overridden.\nNOTE: it's added to allow use case of absolutely positioned resizers in float tool windows. Might be a better\nidea to add a `absolute` instead option and apply the necessary style based on it, if it can be seen as a re-usable\nand legit feature.",name:"style",required:!1,type:{name:'Omit<CSSProperties, "background" | "height">'}},background:{defaultValue:null,description:"Background color of the visible space-occupying part of the resize handle.",name:"background",required:!1,type:{name:"Background<string | number>"}},size:{defaultValue:{value:"0"},description:"Visible and space-occupying part of the resize handle. Total grab-able\nwidth will be `size` + `outerPadding`",name:"size",required:!1,type:{name:"number"}},outerPadding:{defaultValue:{value:"10"},description:"Length of the extra grab-able zone around the resize handle.\nFor example, if set to 10 there will be an area of length 5 pixels in each\nside of the handle which still can be used for resizing.",name:"outerPadding",required:!1,type:{name:"number"}},cursor:{defaultValue:{value:"row"},description:"Resizer cursor.",name:"cursor",required:!1,type:{name:"enum",value:[{value:'"s"'},{value:'"row"'},{value:'"ns"'},{value:'"n"'}]}},resizerProps:{defaultValue:null,description:"",name:"resizerProps",required:!0,type:{name:"{ onMouseDown?: MouseEventHandler<Element> | undefined; }"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Resizer/VerticalResizer.tsx#VerticalResizer"]={docgenInfo:VerticalResizer.__docgenInfo,name:"VerticalResizer",path:"src/Resizer/VerticalResizer.tsx#VerticalResizer"})}catch(__react_docgen_typescript_loader_error){}},"./src/Resizer/useResizer.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Sf:()=>useTopResizer,hT:()=>useRightResizer,mT:()=>useBottomResizer,s3:()=>useLeftResizer});var _utils_interaction_utils_useMove__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/interaction-utils/useMove.tsx");const useResizer=(orientation,invert,{onResizeStarted,onResize,onResizeEnd})=>({resizerProps:(0,_utils_interaction_utils_useMove__WEBPACK_IMPORTED_MODULE_0__.r)({dragThreshold:0,onMoveStart:()=>onResizeStarted()||0,onMoveEnd:()=>onResizeEnd?.(),onMove:({movement,startState})=>onResize(startState+(invert?-1:1)*movement["horizontal"===orientation?"x":"y"])})}),useLeftResizer=props=>useResizer("horizontal",!0,props),useRightResizer=props=>useResizer("horizontal",!1,props),useTopResizer=props=>useResizer("vertical",!0,props),useBottomResizer=props=>useResizer("vertical",!1,props)},"./src/story-helpers.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{q:()=>styledComponentsControlsExclude});const styledComponentsControlsExclude=["theme","as","forwardedAs","ref"]},"./src/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Fg:()=>useTheme,iv:()=>css,zo:()=>styled});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const styled=styled_components__WEBPACK_IMPORTED_MODULE_0__.ZP,useTheme=styled_components__WEBPACK_IMPORTED_MODULE_0__.Fg,css=styled_components__WEBPACK_IMPORTED_MODULE_0__.iv;styled_components__WEBPACK_IMPORTED_MODULE_0__.Sf},"./src/utils/interaction-utils/useMove.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>useMove});var dist_module=__webpack_require__("../../node_modules/@react-aria/utils/dist/module.js");let state="default",savedUserSelect="";function restoreTextSelection(){"disabled"===state&&(state="restoring",setTimeout((()=>{(0,dist_module.QB)((()=>{"restoring"===state&&("none"===document.documentElement.style.webkitUserSelect&&(document.documentElement.style.webkitUserSelect=savedUserSelect||""),savedUserSelect="",state="default")}))}),300))}var useLatest=__webpack_require__("./src/utils/useLatest.ts");function useMove({dragThreshold=0,disabled,onMoveStart,onMove,onMoveEnd}){const handlersRef=(0,useLatest.d)({onMove,onMoveEnd});return disabled?{}:{onMouseDown:event=>{if(function disableTextSelection(){"default"===state&&(savedUserSelect=document.documentElement.style.webkitUserSelect,document.documentElement.style.webkitUserSelect="none"),state="disabled"}(),0!==event.button)return void restoreTextSelection();const from={x:event.pageX,y:event.pageY};let startState,dragStarted=!1;const onMouseMove=event=>{const{pageX:x,pageY:y}=event,movement={x:x-from.x,y:y-from.y};(Math.abs(movement.x)>=dragThreshold||Math.abs(movement.y)>=dragThreshold)&&!dragStarted&&(dragStarted=!0,startState=onMoveStart({from})),dragStarted&&handlersRef.current.onMove({from,to:{x:from.x+movement.x,y:from.y+movement.y},movement,startState})};document.addEventListener("mousemove",onMouseMove),document.addEventListener("mouseup",(()=>{restoreTextSelection(),dragStarted&&handlersRef.current.onMoveEnd?.({startState}),document.removeEventListener("mousemove",onMouseMove)}),{once:!0})}}}try{useMove.displayName="useMove",useMove.__docgenInfo={description:"Similar to https://react-spectrum.adobe.com/react-aria/useMove.html, with slightly different\nfeatures and API.\nNOTE: initially the API was designed in a way that onMove and onMove end callbacks were\nreturned from onMoveStart, instead of being directly passed in the options.\nThis would enable capturing the initial state of each move transaction, by defining whatever\nvariable in onMoveStart and closing over them by onMove and onMoveEnd.\nThe problem with this approach was that although you could capture the initial state of the\nmovement, by closure, any other variable in the outer scopes was also closed over, and you were\nstuck with the values from the particular render in which the movement was started.\nOf course, you could work around it by using refs, but it would be unintuitive.\nSo because of that issue, it's redesigned to have onMoveStart, onMove, and onMoveEnd all\ndirectly passed as options, but you can return anything from `onMoveStart` which will be passed\nto onMove and onMoveEnd as `startState`.",displayName:"useMove",props:{dragThreshold:{defaultValue:{value:"0"},description:"the amount of movement (in pixels) after which the move should start. It prevents interference\nwith simple click (or more generally, press) events, and provides better UX.",name:"dragThreshold",required:!1,type:{name:"number"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},onMoveStart:{defaultValue:null,description:"",name:"onMoveStart",required:!0,type:{name:"(args: { from: XY; }) => S"}},onMove:{defaultValue:null,description:"",name:"onMove",required:!0,type:{name:"(args: { from: XY; to: XY; movement: XY; startState: S; }) => void"}},onMoveEnd:{defaultValue:null,description:"",name:"onMoveEnd",required:!1,type:{name:"((args: { startState: S; }) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/interaction-utils/useMove.tsx#useMove"]={docgenInfo:useMove.__docgenInfo,name:"useMove",path:"src/utils/interaction-utils/useMove.tsx#useMove"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/useLatest.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>useLatest});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function useLatest(value){const ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(value);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)((()=>{ref.current=value})),ref}}}]);