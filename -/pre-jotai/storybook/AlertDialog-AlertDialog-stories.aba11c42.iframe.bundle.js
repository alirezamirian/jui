"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[9200],{"./src/AlertDialog/AlertDialog.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Error:()=>Error,Information:()=>Information,Question:()=>Question,Warning:()=>Warning,WithCheckbox:()=>WithCheckbox,WithHelpIcon:()=>WithHelpIcon,WithSetWidth:()=>WithSetWidth,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var _Button__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Button/Button.tsx"),_AlertDialog__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/AlertDialog/AlertDialog.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Checkbox/Checkbox.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/Tooltip/TooltipTrigger.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/Tooltip/HelpTooltip.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/Icon/PlatformIcon.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/AlertDialog",component:_AlertDialog__WEBPACK_IMPORTED_MODULE_2__.a,args:{heading:"Alert heading",body:"Alert body",buttons:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_3__.z,{children:"Cancel"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_3__.z,{variant:"default",children:"Ok"})]})},argTypes:{}},Information={args:{type:"information",heading:"Information",body:"No usages found",buttons:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_3__.z,{variant:"default",children:"Ok"})}},Question={args:{type:"question",heading:"Delete",body:"Delete 'AlertDialog.stories.tsx'?",buttons:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_3__.z,{autoFocus:!0,children:"Cancel"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_3__.z,{variant:"default",children:"Delete"})]})}},Warning={args:{type:"warning",heading:"Process 'storybook:start' Is Running",body:"Do you want to terminate the process 'storybook:start'?",checkbox:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__.X,{children:"Don't ask again"}),buttons:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_3__.z,{children:"Cancel"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_3__.z,{autoFocus:!0,children:"Disconnect"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_3__.z,{variant:"default",children:"Terminate"})]})}},Error={args:{type:"error",heading:"Failed to Re-Run Refactoring",body:"Can't restore context for method extraction",buttons:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_3__.z,{variant:"default",children:"Ok"})}},WithHelpIcon={args:{helpButton:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_5__.a,{tooltip:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_6__.k,{helpText:"Show Help Contents"}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_3__.z,{variant:"icon",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_7__.vq,{icon:"actions/help"})})}),buttons:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_3__.z,{autoFocus:!0,children:"Cancel"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_3__.z,{variant:"default",children:"Exit"})]})}},WithCheckbox={args:{type:"question",heading:"Confirm Exit",body:"Are you sure you want to exit?",checkbox:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_4__.X,{children:"Don't ask again"}),buttons:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_3__.z,{autoFocus:!0,children:"Cancel"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_3__.z,{variant:"default",children:"Exit"})]})}},WithSetWidth={args:{type:"question",heading:"Delete?",body:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{style:{width:354},children:["Delete 2 directories and 3 files?",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("br",{}),"All files and subdirectories in the selected directories will be deleted. ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("br",{}),"You might not be able to fully undo this operation!"]}),buttons:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_3__.z,{autoFocus:!0,children:"Cancel"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_3__.z,{variant:"default",children:"Delete"})]})}};Information.parameters={...Information.parameters,docs:{...Information.parameters?.docs,source:{originalSource:'{\n  args: {\n    type: "information",\n    heading: "Information",\n    body: "No usages found",\n    buttons: <Button variant="default">Ok</Button>\n  }\n}',...Information.parameters?.docs?.source}}},Question.parameters={...Question.parameters,docs:{...Question.parameters?.docs,source:{originalSource:'{\n  args: {\n    type: "question",\n    heading: "Delete",\n    body: "Delete \'AlertDialog.stories.tsx\'?",\n    buttons: <>\n        <Button autoFocus>Cancel</Button>\n        <Button variant="default">Delete</Button>\n      </>\n  }\n}',...Question.parameters?.docs?.source}}},Warning.parameters={...Warning.parameters,docs:{...Warning.parameters?.docs,source:{originalSource:'{\n  args: {\n    type: "warning",\n    heading: "Process \'storybook:start\' Is Running",\n    body: "Do you want to terminate the process \'storybook:start\'?",\n    checkbox: <Checkbox>Don\'t ask again</Checkbox>,\n    buttons: <>\n        <Button>Cancel</Button>\n        <Button autoFocus>Disconnect</Button>\n        <Button variant="default">Terminate</Button>\n      </>\n  }\n}',...Warning.parameters?.docs?.source}}},Error.parameters={...Error.parameters,docs:{...Error.parameters?.docs,source:{originalSource:'{\n  args: {\n    type: "error",\n    heading: "Failed to Re-Run Refactoring",\n    body: "Can\'t restore context for method extraction",\n    buttons: <Button variant="default">Ok</Button>\n  }\n}',...Error.parameters?.docs?.source}}},WithHelpIcon.parameters={...WithHelpIcon.parameters,docs:{...WithHelpIcon.parameters?.docs,source:{originalSource:'{\n  args: {\n    helpButton: <TooltipTrigger tooltip={<HelpTooltip helpText="Show Help Contents" />}>\n        <Button variant="icon">\n          <PlatformIcon icon="actions/help"></PlatformIcon>\n        </Button>\n      </TooltipTrigger>,\n    buttons: <>\n        <Button autoFocus>Cancel</Button>\n        <Button variant="default">Exit</Button>\n      </>\n  }\n}',...WithHelpIcon.parameters?.docs?.source}}},WithCheckbox.parameters={...WithCheckbox.parameters,docs:{...WithCheckbox.parameters?.docs,source:{originalSource:'{\n  args: {\n    type: "question",\n    heading: "Confirm Exit",\n    body: "Are you sure you want to exit?",\n    checkbox: <Checkbox>Don\'t ask again</Checkbox>,\n    buttons: <>\n        <Button autoFocus>Cancel</Button>\n        <Button variant="default">Exit</Button>\n      </>\n  }\n}',...WithCheckbox.parameters?.docs?.source}}},WithSetWidth.parameters={...WithSetWidth.parameters,docs:{...WithSetWidth.parameters?.docs,source:{originalSource:'{\n  args: {\n    type: "question",\n    heading: "Delete?",\n    body: <div style={{\n      width: 354\n    }}>\n        Delete 2 directories and 3 files?\n        <br />\n        All files and subdirectories in the selected directories will be\n        deleted. <br />\n        You might not be able to fully undo this operation!\n      </div>,\n    buttons: <>\n        <Button autoFocus>Cancel</Button>\n        <Button variant="default">Delete</Button>\n      </>\n  }\n}',...WithSetWidth.parameters?.docs?.source}}};const __namedExportsOrder=["Information","Question","Warning","Error","WithHelpIcon","WithCheckbox","WithSetWidth"]},"./src/AlertDialog/AlertDialog.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{a:()=>AlertDialog});__webpack_require__("../../node_modules/react/index.js");var _intellij_platform_core_ModalWindow__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/ModalWindow/ModalWindow.tsx"),_intellij_platform_core_Overlay__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/Overlay/OverlayMoveHandle.tsx"),_styled__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/styled.ts"),_intellij_platform_core_Icon__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/Icon/PlatformIcon.tsx"),_intellij_platform_core_ButtonGroup__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/ButtonGroup/ButtonGroup.tsx"),_intellij_platform_core_utils_interaction_utils_useMove__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/utils/interaction-utils/useMove.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const StyledModalWindow=(0,_styled__WEBPACK_IMPORTED_MODULE_2__.zo)(_intellij_platform_core_ModalWindow__WEBPACK_IMPORTED_MODULE_3__.Du)`
  ${_intellij_platform_core_ModalWindow__WEBPACK_IMPORTED_MODULE_3__.dt} {
    border-radius: 0;
    outline: 0.5px solid rgba(0, 0, 0, 0.85); // FIXME
  }
`,StyledContainer=_styled__WEBPACK_IMPORTED_MODULE_2__.zo.div`
  padding: 1.25rem;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  align-items: center;
  gap: 0.875rem;
`,StyledHeading=_styled__WEBPACK_IMPORTED_MODULE_2__.zo.h2`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: bold;
`,StyledBody=_styled__WEBPACK_IMPORTED_MODULE_2__.zo.div`
  line-height: 1.2;
`,StyledContent=_styled__WEBPACK_IMPORTED_MODULE_2__.zo.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: default;
`,StyledCheckbox=_styled__WEBPACK_IMPORTED_MODULE_2__.zo.div`
  padding: 0.375rem 0;
  // to align the checkbox with the content, since the box has a padding. Maybe Checkbox should not have any padding.
  margin-left: -0.25rem;
`,StyledButtons=(0,_styled__WEBPACK_IMPORTED_MODULE_2__.zo)(_intellij_platform_core_ButtonGroup__WEBPACK_IMPORTED_MODULE_4__.h)`
  display: flex;
  justify-self: end;
  gap: 1rem;
`,StyledIcon=_styled__WEBPACK_IMPORTED_MODULE_2__.zo.span`
  align-self: start;
`,StyledHelpIcon=_styled__WEBPACK_IMPORTED_MODULE_2__.zo.div`
  justify-self: center;
`,AlertDialog=({type="question",heading,body,checkbox,helpButton,buttons,minWidth=370,...otherProps})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(StyledModalWindow,{role:"alertdialog",interactions:"move",minWidth,defaultBounds:{top:window.innerHeight/4},observeContentResize:!0,...otherProps,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core_Overlay__WEBPACK_IMPORTED_MODULE_5__.F,{dragThreshold:6,canMoveStart:_intellij_platform_core_utils_interaction_utils_useMove__WEBPACK_IMPORTED_MODULE_6__.z,children:({moveHandleProps})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(StyledContainer,{...moveHandleProps,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(StyledIcon,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_intellij_platform_core_Icon__WEBPACK_IMPORTED_MODULE_7__.vq,{size:32,icon:`general/${type}Dialog`})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(StyledContent,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(StyledHeading,{children:heading}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(StyledBody,{children:body}),checkbox&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(StyledCheckbox,{children:checkbox})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(StyledHelpIcon,{children:helpButton}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(StyledButtons,{children:buttons})]})})});AlertDialog.displayName="AlertDialog";try{AlertDialog.displayName="AlertDialog",AlertDialog.__docgenInfo={description:"A modal dialog implementing [Alert](https://jetbrains.github.io/ui/controls/alert), which is the\n[notification](https://jetbrains.github.io/ui/controls/notifications/) pattern for use cases where\nimmediate user action is required.\nSince the use cases are quite specific, and the component is expected to be used with pretty specific\ncontent items, the layout is not implemented as a separate component, the way it is in components like\n{@link ModalWindow} or {@link Menu }",displayName:"AlertDialog",props:{heading:{defaultValue:null,description:"Content slot for the heading, aka. title of the dialog. Typically plain text.",name:"heading",required:!1,type:{name:"ReactNode"}},body:{defaultValue:null,description:"Content slot for the body, aka. message of the dialog. Typically plain text.",name:"body",required:!1,type:{name:"ReactNode"}},checkbox:{defaultValue:null,description:'Content slot for the checkbox ("Do not ask again").\n@example ```jsx\n<AlertDialog checkbox={<Checkbox>Do not ask again</Checkbox>} />\n```\n@see Checkbox',name:"checkbox",required:!1,type:{name:"ReactNode"}},type:{defaultValue:{value:"question"},description:"Type of the alert dialog. The icon is set based on type.",name:"type",required:!1,type:{name:"enum",value:[{value:'"error"'},{value:'"warning"'},{value:'"information"'},{value:'"question"'}]}},buttons:{defaultValue:null,description:'Content slot for buttons.\n@example ```jsx\n<AlertDialog\n  buttons={\n    <>\n      <Button>Cancel</Button>\n      <Button variant="default">Ok</Button>\n    </>\n  }\n/>\n```\n@see Button',name:"buttons",required:!1,type:{name:"ReactNode"}},helpButton:{defaultValue:null,description:'Content slot for help icon button in the footer.\n@example ```jsx\n<AlertDialog\n  helpButton={\n    <TooltipTrigger tooltip={<HelpTooltip helpText="Show Help Contents" />}>\n      <Button variant="icon">\n        <PlatformIcon icon="actions/help"></PlatformIcon>\n      </Button>\n    </TooltipTrigger>\n  }\n/>\n```\n@see Button',name:"helpButton",required:!1,type:{name:"ReactNode"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!1,type:{name:"(() => void)"}},minWidth:{defaultValue:{value:"370"},description:"",name:"minWidth",required:!1,type:{name:'number | "content"'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/AlertDialog/AlertDialog.tsx#AlertDialog"]={docgenInfo:AlertDialog.__docgenInfo,name:"AlertDialog",path:"src/AlertDialog/AlertDialog.tsx#AlertDialog"})}catch(__react_docgen_typescript_loader_error){}},"./src/Collections/ItemStateContext.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>ItemStateContext});const ItemStateContext=__webpack_require__("../../node_modules/react/index.js").createContext(null)},"./src/Icon/LafIcon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>LafIcon});var _intellij_platform_core_utils_useForwardedRef__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/utils/useForwardedRef.ts"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/Icon/StyledIconWrapper.tsx"),_useSvgIcon__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Icon/useSvgIcon.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const ICONS_DIR_PREFIX="com/intellij/ide/ui/laf/icons/";function useIconPath(iconDescriptor,themePath){const theme=(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.Fg)(),resolvedValue=themePath&&theme.value(themePath);if(resolvedValue)return resolvedValue;const{modifiers={},name}="string"==typeof iconDescriptor?{name:iconDescriptor}:iconDescriptor;return function findIconPath(theme,name,modifiers={}){return`${ICONS_DIR_PREFIX}${theme.isUnderDarcula()?"darcula/":"intellij/"}${name}${["Editable","Selected","Pressed","Focused","Disabled"].filter((modifier=>!modifiers.Disabled||!["Focused","Pressed"].includes(modifier))).reduce(((soFar,modifier)=>soFar+(modifiers[modifier]?modifier:"")),"")}.svg`}(theme,name,modifiers)}const LafIcon=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((({themePath,icon,size,...props},forwardedRef)=>{const resolvedIconPath=useIconPath(icon,themePath),ref=(0,_intellij_platform_core_utils_useForwardedRef__WEBPACK_IMPORTED_MODULE_3__.Z)(forwardedRef);return(0,_useSvgIcon__WEBPACK_IMPORTED_MODULE_4__.Z)({path:`platform/platform-impl/src/${resolvedIconPath}`},ref),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_5__.M,{...props,ref,size})}));try{LafIcon.displayName="LafIcon",LafIcon.__docgenInfo={description:"",displayName:"LafIcon",props:{icon:{defaultValue:null,description:"Icon which will be resolved against the default icon location based on theme type",name:"icon",required:!0,type:{name:"string | { name: string; modifiers: IconModifiers; }"}},themePath:{defaultValue:null,description:"A theme key that can optionally override the icon.",name:"themePath",required:!1,type:{name:"string"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"number"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},children:{defaultValue:null,description:"Additional node going into the icon wrapper. Such as indicators.",name:"children",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Icon/LafIcon.tsx#LafIcon"]={docgenInfo:LafIcon.__docgenInfo,name:"LafIcon",path:"src/Icon/LafIcon.tsx#LafIcon"})}catch(__react_docgen_typescript_loader_error){}},"./src/Icon/PlatformIcon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{qb:()=>amendName,vq:()=>PlatformIcon});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_utils_useForwardedRef__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/utils/useForwardedRef.ts"),_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/styled.ts"),_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/Icon/StyledIconWrapper.tsx"),_useSvgIcon__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Icon/useSvgIcon.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const amendName=(iconNameOrPath,amendment)=>{const[name,ext]=iconNameOrPath.split(".");return`${name}${amendment}${ext?`.${ext}`:""}`},getPlatformIconPath=relativePath=>relativePath.startsWith("/")?relativePath.slice(1):`platform/icons/src/${relativePath}`,PlatformIcon=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((({icon,darkIcon,...props},forwardedRef)=>{const ref=(0,_intellij_platform_core_utils_useForwardedRef__WEBPACK_IMPORTED_MODULE_2__.Z)(forwardedRef),iconName=(0,_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_3__.Fg)().dark?((path,darkPath)=>{const[name,ext]=path.split(".");return darkPath||`${name}_dark${ext?`.${ext}`:""}`})(icon,darkIcon):icon;return(0,_useSvgIcon__WEBPACK_IMPORTED_MODULE_4__.Z)({path:getPlatformIconPath(iconName),fallbackPath:getPlatformIconPath(icon)},ref),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_5__.M,{...props,ref})}));try{PlatformIcon.displayName="PlatformIcon",PlatformIcon.__docgenInfo={description:"Renders an icon from the predefined list of platform icons.\nicon name must follow the directory structure in platform icons.",displayName:"PlatformIcon",props:{icon:{defaultValue:null,description:'Icon path in intellij platform repo.\nIf starts with "/", the path will be from the repo root. Otherwise, it\'s relative to "platform/icons/src".\n".svg" extension is optional.',name:"icon",required:!0,type:{name:"string"}},darkIcon:{defaultValue:null,description:"Similar to icon, but for dark themes.",name:"darkIcon",required:!1,type:{name:"string"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"number"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},children:{defaultValue:null,description:"Additional node going into the icon wrapper. Such as indicators.",name:"children",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Icon/PlatformIcon.tsx#PlatformIcon"]={docgenInfo:PlatformIcon.__docgenInfo,name:"PlatformIcon",path:"src/Icon/PlatformIcon.tsx#PlatformIcon"})}catch(__react_docgen_typescript_loader_error){}},"./src/Icon/StyledIconWrapper.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>StyledIconWrapper});var _styled__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styled.ts");const StyledIconWrapper=_styled__WEBPACK_IMPORTED_MODULE_0__.zo.span`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  width: ${({size=16})=>`${size}px`};
  height: ${({size=16})=>`${size}px`};
  position: relative; // to allow absolute positioned indicators and overlays on icon
  cursor: ${({role})=>"button"===role?"pointer":void 0};
`;try{StyledIconWrapper.displayName="StyledIconWrapper",StyledIconWrapper.__docgenInfo={description:"",displayName:"StyledIconWrapper",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"number"}},useCurrentColor:{defaultValue:null,description:"",name:"useCurrentColor",required:!1,type:{name:"boolean"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"Theme<KnownThemePropertyPath>"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Icon/StyledIconWrapper.tsx#StyledIconWrapper"]={docgenInfo:StyledIconWrapper.__docgenInfo,name:"StyledIconWrapper",path:"src/Icon/StyledIconWrapper.tsx#StyledIconWrapper"})}catch(__react_docgen_typescript_loader_error){}},"./src/Icon/useSvgIcon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>useSvgIcon});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/styled.ts"),_intellij_platform_core_Collections__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Collections/ItemStateContext.tsx");function useSvgIcon({path,fallbackPath},ref){const theme=(0,_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__.Fg)(),itemState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_intellij_platform_core_Collections__WEBPACK_IMPORTED_MODULE_2__.k),selected=itemState?.isSelected||itemState?.isContainerFocused;(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{let canceled=!1;return(async()=>{if(!path)return void console.error("icon path is empty");ref.current&&(ref.current.ariaBusy="true");const svg=await theme.getSvgIcon(path,selected).catch((e=>{if(fallbackPath)return theme.getSvgIcon(fallbackPath,selected);throw e})).finally((()=>{ref?.current&&!canceled&&(ref.current.ariaBusy="false")}));if(svg){const element=ref?.current;if(!canceled&&element){element.querySelector("svg")?.remove();const svgElement=document.createElement("svg");element.appendChild(svgElement),svgElement.outerHTML=function makeIdsUnique(svg){const randomPostfix=(1e3*Math.random()).toFixed(0),idMatches=svg.matchAll(/id="(.*?)"/g);return[...idMatches].reduce(((modifiedSvg,[_,id])=>{const newId=`${id}-${randomPostfix}`;return replaceAll(`id="${id}"`,`id="${newId}"`,replaceAll(`url(#${id})`,`url(#${newId})`,modifiedSvg))}),svg)}(svg)}}else console.error("Could not resolve icon:",path)})().catch(console.error),()=>{canceled=!0}}),[path,selected])}function replaceAll(theOld,theNew,str){const replaced=str.replace(theOld,theNew),replacedAgain=replaced.replace(theOld,theNew);return replaced===replacedAgain?replaced:replaceAll(theOld,theNew,replacedAgain)}},"./src/style-constants.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>WINDOW_SHADOW});const WINDOW_SHADOW="box-shadow: 0 5px 15px rgb(0 0 0 / 30%)"},"./src/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Fg:()=>useTheme,iv:()=>css,zo:()=>styled});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const styled=styled_components__WEBPACK_IMPORTED_MODULE_0__.ZP,useTheme=styled_components__WEBPACK_IMPORTED_MODULE_0__.Fg,css=styled_components__WEBPACK_IMPORTED_MODULE_0__.iv;styled_components__WEBPACK_IMPORTED_MODULE_0__.Sf},"./src/utils/keyboard-utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function hasAnyModifier(e){return e.altKey||e.ctrlKey||e.metaKey||e.shiftKey}__webpack_require__.d(__webpack_exports__,{a:()=>hasAnyModifier})},"./src/utils/useForwardedRef.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>useForwardedRef});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function useForwardedRef(forwardedRef){const innerRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>{forwardedRef&&("function"==typeof forwardedRef?forwardedRef(innerRef.current):forwardedRef.current=innerRef.current)})),innerRef}},"./src/utils/useLatest.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>useLatest});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function useLatest(value){const ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(value);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)((()=>{ref.current=value})),ref}}}]);
//# sourceMappingURL=AlertDialog-AlertDialog-stories.aba11c42.iframe.bundle.js.map