"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[5534],{"./src/Balloon/BalloonManager.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BalloonManagerStory:()=>BalloonManagerStory,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_Balloon__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Balloon/Balloon.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/Balloon/BalloonManager.tsx"),_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Icon/AutoHoverPlatformIcon.tsx");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/BalloonManager",component:_intellij_platform_core__WEBPACK_IMPORTED_MODULE_1__.a},ShowBalloonButton=()=>{const{show}=(0,_intellij_platform_core__WEBPACK_IMPORTED_MODULE_1__.L)(),showNotification=(timeout=0)=>show({title:"Maven Projects need to be imported",body:"Projects to be imported: MavenSync, MavenDependencies. Maven project structure has been changed. Import changes to IntelliJ IDEA project to make it work correctly. Otherwise, code analysis, completion and other features might work incorrectly.",actions:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Balloon__WEBPACK_IMPORTED_MODULE_2__.g,null,"Import changes"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Balloon__WEBPACK_IMPORTED_MODULE_2__.g,null,"Enable auto-import")),headerActions:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_3__.v,{icon:"ide/notification/gear",role:"button"})},timeout);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{onClick:()=>showNotification()},"show sticky balloon notification"),react__WEBPACK_IMPORTED_MODULE_0__.createElement("br",null),react__WEBPACK_IMPORTED_MODULE_0__.createElement("br",null),react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{onClick:()=>showNotification(5e3)},"show auto-hide balloon notification"))},BalloonManagerStory={render:props=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core__WEBPACK_IMPORTED_MODULE_1__.a,props,react__WEBPACK_IMPORTED_MODULE_0__.createElement(ShowBalloonButton,null)),name:"Balloon Manager"},__namedExportsOrder=["BalloonManagerStory"];BalloonManagerStory.parameters={...BalloonManagerStory.parameters,docs:{...BalloonManagerStory.parameters?.docs,source:{originalSource:'{\n  render: props => <BalloonManager {...props}>\n      <ShowBalloonButton />\n    </BalloonManager>,\n  name: "Balloon Manager"\n}',...BalloonManagerStory.parameters?.docs?.source}}}},"./src/Balloon/Balloon.styled.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{CD:()=>StyledBalloonFooter,EQ:()=>StyledToggleIconContainer,Fx:()=>StyledToggleExpandButtonContainer,GE:()=>StyledBalloonHeader,H7:()=>StyledIconContainer,NY:()=>StyledBalloonContainer,Of:()=>StyledHeaderActions,VT:()=>StyledBalloonBody,cU:()=>StyledToggleExpandButtonFooterContainer});var _intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styled.ts");const bgColor=({theme})=>theme.color("Notification.background",theme.dark?"#4E5052":"rgb(242,242,242)"),StyledHeaderActions=_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_0__.zo.div`
  position: absolute;
  right: 0;
  top: 0;
  background: inherit;
  padding: 0.375rem 0.5rem 0;
  &::before {
    content: "";
    position: absolute;
    right: 100%;
    background: linear-gradient(90deg, transparent, ${bgColor});
    width: 20px;
    height: 100%;
    z-index: 1;
    top: 0;
  }
`,StyledBalloonContainer=_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_0__.zo.div`
  line-height: 1.2;
  box-sizing: border-box;
  overflow: hidden; // header actions overflows a little at the top right rounded corner
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); // shadow doesn't seem to be themed
  padding: 0.5rem 0;
  border: 1px solid
    ${({theme})=>theme.color("Notification.borderColor",theme.dark?"#565A5CCD":"#B2B2B2CD")};
  border-radius: ${({theme})=>(theme.value("Notification.arc")??12)/2+"px"};
  //display: inline-flex;
  width: 23.3125rem;
  position: relative;
  background-color: ${bgColor};
  color: ${({theme})=>theme.color("Notification.foreground",theme.dark?"rgb(191,191,191)":"#000")};

  ${StyledHeaderActions} {
    display: none;
  }
  &:hover ${StyledHeaderActions} {
    display: initial;
  }
`,StyledIconContainer=_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_0__.zo.span`
  position: absolute;
  left: 0.75rem;
  top: 0.5rem;
`,StyledBalloonHeader=_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_0__.zo.div`
  line-height: 1rem;
  font-weight: bold;
  margin: 0 2.125rem 0.25rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; // this is not the case in original impl, but it's a clear improvement
`,StyledBalloonBody=_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_0__.zo.div`
  margin: 0 2.125rem 0 2.125rem;
  line-height: 1rem;
  display: inline;
  -webkit-line-clamp: ${({lineClamp})=>lineClamp};
  word-break: ${({lineClamp})=>1===lineClamp&&"break-all"};
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`,StyledBalloonFooter=_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_0__.zo.div`
  margin: 0.375rem 1.875rem 0 2.125rem;
  display: inline-flex;
  white-space: nowrap;
  overflow: hidden;
  gap: 1rem;

  // could be -webkit-fill-available too, if it has good support. Probably it doesn't tho
  max-width: calc(100% - 3.5rem);
`,StyledToggleIconContainer=_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_0__.zo.span`
  display: inline-flex;
  position: absolute;
  right: 0.5rem;
  bottom: 0;
  background-color: ${bgColor};
  padding-left: 0.5rem;
`,StyledToggleExpandButtonContainer=_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_0__.zo.span`
  display: block;
  position: relative; // for icon absolute positioning
  cursor: pointer;
  flex: 1;
`,StyledToggleExpandButtonFooterContainer=(0,_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_0__.zo)(StyledToggleExpandButtonContainer)`
  min-height: 1.5rem;
  margin: -0.5rem 0;
  position: relative;
  z-index: 1;
  ${StyledToggleIconContainer} {
    bottom: 0.5rem;
  }
  ${StyledBalloonFooter} {
    margin-top: 0.875rem;
    margin-bottom: 0.5rem;
  }
  ${StyledBalloonFooter}:hover + * .icon[data-hover] {
    display: none;
  }
  ${StyledBalloonFooter}:hover + * .icon {
    display: unset;
  }
`},"./src/Balloon/Balloon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{g:()=>BalloonActionLink,y:()=>Balloon});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_Icon__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Icon/PlatformIcon.tsx"),_intellij_platform_core_Icon__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/Icon/AutoHoverPlatformIcon.tsx"),_react_stately_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-stately/utils/dist/useControlledState.mjs"),_intellij_platform_core_Balloon_Balloon_styled__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Balloon/Balloon.styled.tsx"),_intellij_platform_core_Link__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/Link/Link.tsx");const BalloonContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(null),BalloonActionLink=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((({onPress,...props},ref)=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(BalloonContext);if(null===context)throw new Error("BalloonActionLink should only be rendered inside Balloon notifications");return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Link__WEBPACK_IMPORTED_MODULE_1__.r,{ref,...props,onPress:(...args)=>(context?.onClose?.(),onPress?.(...args))})})),Balloon=({icon:iconProp="Info",expanded:expandedProp,defaultExpanded=!1,onExpandedChange,title,headerActions,onClose,body,actions,...containerProps})=>{const bodyRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),[expandable,setExpandable]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[expanded,setExpanded]=(0,_react_stately_utils__WEBPACK_IMPORTED_MODULE_2__.z)(expandedProp,defaultExpanded,onExpandedChange),maxLinesWhenNotExpanded=1+(title?0:1)+(actions?0:1);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{const bodyElem=bodyRef.current;setExpandable(!!bodyElem&&(expanded?function getNumLines(bodyElem){return bodyElem.clientHeight/parseFloat(getComputedStyle(bodyElem).lineHeight)}(bodyElem)>maxLinesWhenNotExpanded:bodyElem.scrollHeight>bodyElem.clientHeight))}),[expanded]);const icon="string"==typeof iconProp?react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Icon__WEBPACK_IMPORTED_MODULE_3__.vq,{icon:`general/notification${["Error","Warning","Info"].find(((iconType,index,arr)=>iconType===iconProp||index===arr.length-1))}.svg`}):iconProp,toggle=()=>setExpanded((expanded=>!expanded)),effectiveExpanded=expanded&&Boolean(body);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(BalloonContext.Provider,{value:{onClose}},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Balloon_Balloon_styled__WEBPACK_IMPORTED_MODULE_4__.NY,{"data-testid":"balloon",...containerProps},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Balloon_Balloon_styled__WEBPACK_IMPORTED_MODULE_4__.H7,null,icon),title&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Balloon_Balloon_styled__WEBPACK_IMPORTED_MODULE_4__.GE,null,title),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Balloon_Balloon_styled__WEBPACK_IMPORTED_MODULE_4__.Of,null,headerActions,onClose&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Icon__WEBPACK_IMPORTED_MODULE_5__.v,{icon:"ide/notification/close.svg",onClick:onClose,role:"button","data-testid":"close-btn",style:{marginLeft:"0.75rem"}})),body&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(ToggleWrapper,{expanded:effectiveExpanded,enabled:expandable&&!effectiveExpanded,onToggle:toggle},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Balloon_Balloon_styled__WEBPACK_IMPORTED_MODULE_4__.VT,{lineClamp:!effectiveExpanded&&maxLinesWhenNotExpanded,ref:bodyRef},body)),react__WEBPACK_IMPORTED_MODULE_0__.createElement(ToggleWrapper,{expanded:effectiveExpanded,enabled:expandable&&effectiveExpanded,onToggle:toggle,Component:_intellij_platform_core_Balloon_Balloon_styled__WEBPACK_IMPORTED_MODULE_4__.cU},actions&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Balloon_Balloon_styled__WEBPACK_IMPORTED_MODULE_4__.CD,{onClick:e=>e.stopPropagation()},actions))))},ToggleWrapper=({children,onToggle,expanded,enabled,Component=_intellij_platform_core_Balloon_Balloon_styled__WEBPACK_IMPORTED_MODULE_4__.Fx})=>{const iconName=expanded?"collapse":"expand",toggleIcon=react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Balloon_Balloon_styled__WEBPACK_IMPORTED_MODULE_4__.EQ,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Icon__WEBPACK_IMPORTED_MODULE_5__.v,{hoverContainerSelector:`${Component}`,icon:`ide/notification/${iconName}.svg`,className:"icon"}));return enabled?react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{onClick:onToggle,role:"button","data-testid":(expanded?"collapse":"expand")+"-btn"},children,toggleIcon):react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,children)};BalloonActionLink.__docgenInfo={description:"A tiny wrapper around {@link Link} component, to be used for actions in Balloon.\nIt closes the balloon when pressed.",methods:[],displayName:"BalloonActionLink"},Balloon.__docgenInfo={description:'[Balloon notification](https://jetbrains.github.io/ui/controls/balloon/) UI.\n\nNotes and TODO:\n- Add support for "error" variant: https://github.com/JetBrains/intellij-community/blob/48c024fcd38bd8d1eccdada05489a8952a494270/platform/platform-impl/src/com/intellij/diagnostic/IdeMessagePanel.java#L215\n- Add support for timeout. Although if the auto close behaviour is only timeout-based, maybe there is not much value in adding a prop for it and calling onClose on timeout.\n- BalloonActions component to be used for rendering a bunch of links in the actions. It should encapsulate the\n  behaviour of moving actions into a menu when there is not enough room.',methods:[],displayName:"Balloon",props:{icon:{required:!1,tsType:{name:"union",raw:'"Info" | "Warning" | "Error" | React.ReactElement<IconProps>',elements:[{name:"literal",value:'"Info"'},{name:"literal",value:'"Warning"'},{name:"literal",value:'"Error"'},{name:"ReactReactElement",raw:"React.ReactElement<IconProps>",elements:[{name:"IconProps"}]}]},description:"Icon rendered in the top left",defaultValue:{value:'"Info"',computed:!1}},headerActions:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:'Rendered beside close button. Can be used for rendering a "notification settings" icon button.'},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the close button is clicked. If not passed, close button will not be rendered."},actions:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Actions rendered in the footer."},defaultExpanded:{defaultValue:{value:"false",computed:!1},required:!1}}}},"./src/Balloon/BalloonManager.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{a:()=>BalloonManager,L:()=>useBalloonManager});var react=__webpack_require__("../../node_modules/react/index.js"),react_dom=__webpack_require__("../../node_modules/react-dom/index.js"),Balloon=__webpack_require__("./src/Balloon/Balloon.tsx"),styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),Balloon_styled=__webpack_require__("./src/Balloon/Balloon.styled.tsx");const StyledBalloonsStack=styled_components_browser_esm.ZP.div`
  position: fixed;
  z-index: 1;
  bottom: 42px;
  right: 26px;
  ${Balloon_styled.NY} {
    margin-bottom: 12px;
  }
`,NotImplementedFn=()=>{throw new Error("You must render a BalloonManager...")},BalloonsContext=react.createContext({show:NotImplementedFn,showSticky:NotImplementedFn}),useBalloonManager=()=>(0,react.useContext)(BalloonsContext),BalloonManager=({children,disablePortal,BalloonsContainer=StyledBalloonsStack})=>{const[balloons,setBalloons]=(0,react.useState)([]),timeoutIdsRef=(0,react.useRef)([]),lastIdRef=(0,react.useRef)(0),api=(0,react.useMemo)((()=>{const show=(props,timeout=1e4)=>{lastIdRef.current++;const onClose=()=>{setBalloons((balloons=>balloons.filter((aBalloon=>aBalloon!==balloon))))},balloon=react.createElement(Balloon.y,{key:lastIdRef.current,...props,title:props.title,onClose});return setBalloons((balloons=>{if(timeout>0){const timeoutId=window.setTimeout((()=>{onClose(),timeoutIdsRef.current=timeoutIdsRef.current.filter((aTimeoutId=>aTimeoutId!==timeoutId))}),timeout);timeoutIdsRef.current=[...timeoutIdsRef.current,timeoutId]}return balloons.concat(balloon)})),onClose};return{show,showSticky:props=>show(props,0)}}),[]);(0,react.useEffect)((()=>()=>{timeoutIdsRef.current.forEach((id=>{window.clearTimeout(id)}))}),[]);const notificationsStack=react.createElement(BalloonsContainer,{style:{position:disablePortal?"absolute":void 0}},balloons);return react.createElement(BalloonsContext.Provider,{value:api},children,disablePortal?notificationsStack:react_dom.createPortal(notificationsStack,document.body))};BalloonManager.__docgenInfo={description:"Enables imperative API (via {@link useBalloonManager}) for showing Balloon notifications on the bottom right of the screen.\nIt renders notifications in a portal appended to `body`, unless `disablePortal` is `true`.\n\n@param disablePortal: if `true`, the container for notifications will not be rendered in a portal\n@param BalloonsContainer: container component for the notifications. It's {@link StyledBalloonsStack} by default.\n\nTODO: fade in/out transition. Notes:\n - Doesn't seem fade-in is needed. Tho it's much easier than fade-out, as it can be achieved with a css animation.\n - Fade out should happen only when the balloon is being hidden by timeout.\nTODO: Support for maximum number of notifications and showing \"x more notification(s)\" button if the limit exceeds",methods:[],displayName:"BalloonManager",props:{disablePortal:{required:!1,tsType:{name:"boolean"},description:""},BalloonsContainer:{required:!1,tsType:{name:"ReactElementType",raw:"React.ElementType"},description:"",defaultValue:{value:"styled.div`\n  position: fixed;\n  z-index: 1;\n  bottom: 42px;\n  right: 26px;\n  ${StyledBalloonContainer} {\n    margin-bottom: 12px;\n  }\n`",computed:!1}},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}}},"./src/Collections/ItemStateContext.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>ItemStateContext});const ItemStateContext=__webpack_require__("../../node_modules/react/index.js").createContext(null)},"./src/Icon/AutoHoverPlatformIcon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{R:()=>StyledHoverContainer,v:()=>AutoHoverPlatformIcon});var _intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/styled.ts"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_PlatformIcon__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Icon/PlatformIcon.tsx");const StyledHoverContainer=_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__.zo.span`
  ${({hoverContainerSelector})=>hoverContainerSelector?`${hoverContainerSelector} &`:""} .icon[data-hover] {
    display: none;
  }

  ${({hoverContainerSelector})=>hoverContainerSelector?`${hoverContainerSelector}:hover &`:"&:hover"} {
    .icon {
      display: none;
    }

    .icon[data-hover] {
      display: inline-flex;
    }
  }
`,StyledIconHoverContainer=(0,_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__.zo)(StyledHoverContainer)`
  display: inline-flex;
`,AutoHoverPlatformIcon=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((function AutoHoverPlatformIcon({hoverIcon,hoverContainerSelector,...props},ref){const className=`icon ${props.className||""}`;return react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledIconHoverContainer,{ref,hoverContainerSelector},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_PlatformIcon__WEBPACK_IMPORTED_MODULE_2__.vq,{...props,className}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_PlatformIcon__WEBPACK_IMPORTED_MODULE_2__.vq,{...props,className,icon:hoverIcon??(0,_PlatformIcon__WEBPACK_IMPORTED_MODULE_2__.qb)(props.icon,"Hover"),"data-hover":!0}))}));AutoHoverPlatformIcon.__docgenInfo={description:'A common use case for PlatformIcons is to have a default icon and a hover icon.\nThis component captures that simple use case, by rendering both icons, and hiding one based on a hover selector.\n\n### Parent hover container\n\nIf the hover-able element is a parent of the icon, and not the icon itself (i.e., the icon should change if the\nthat parent is hovered), you can use `StyledHoverContainer` to define that parent element:\n\n```tsx\nconst SomeParent = styled(StyledHoverContainer)`...`;\n<SomeParent><AutoHoverPlatformIcon icon="..." /></SomeParent>\n```\n\nIf the hover-able element is a parent of the icon, with a known selector, you can pass `hoverContainerSelector`,\ninstead of using `StyledHoverContainer`:\n\n```tsx\n<AutoHoverPlatformIcon icon="..." hoverContainerSelector="[role=menuitem]" />\n```\n\nIf the hover container is a styled component, you can have it converted to selector like this:\n\n```tsx\n<AutoHoverPlatformIcon icon="..." hoverContainerSelector={`${MyStyledHoverContainer}`} />\n```\n\nIn all examples above, the hover icon is shown when the parent is hovered, instead of the icon itself.',methods:[],displayName:"AutoHoverPlatformIcon",props:{size:{required:!1,tsType:{name:"union",raw:"16 | number",elements:[{name:"literal",value:"16"},{name:"number"}]},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""},className:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Additional node going into the icon wrapper. Such as indicators."},icon:{required:!0,tsType:{name:"string"},description:'Icon path in intellij platform repo.\nIf starts with "/", the path will be from the repo root. Otherwise, it\'s relative to "platform/icons/src".\n".svg" extension is optional.'},darkIcon:{required:!1,tsType:{name:"string"},description:"Similar to icon, but for dark themes."},hoverIcon:{required:!1,tsType:{name:"string"},description:'The icon to be used when hovered. If not provided, it will be the "somethingHovered" where "something" is the `icon`'},hoverContainerSelector:{required:!1,tsType:{name:"string"},description:""}},composes:["Omit"]}},"./src/Icon/PlatformIcon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{qb:()=>amendName,vq:()=>PlatformIcon});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/styled.ts"),_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/Icon/StyledIconWrapper.tsx"),_useSvgIcon__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Icon/useSvgIcon.tsx"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs");const amendName=(iconNameOrPath,amendment)=>{const[name,ext]=iconNameOrPath.split(".");return`${name}${amendment}${ext?`.${ext}`:""}`},getPlatformIconPath=relativePath=>relativePath.startsWith("/")?relativePath.slice(1):`platform/icons/src/${relativePath}`,PlatformIcon=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((({icon,darkIcon,...props},forwardedRef)=>{const ref=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.B)(forwardedRef),iconName=(0,_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_2__.Fg)().dark?((path,darkPath)=>{const[name,ext]=path.split(".");return darkPath||`${name}_dark${ext?`.${ext}`:""}`})(icon,darkIcon):icon;return(0,_useSvgIcon__WEBPACK_IMPORTED_MODULE_3__.Z)({path:getPlatformIconPath(iconName),fallbackPath:getPlatformIconPath(icon)},ref),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_StyledIconWrapper__WEBPACK_IMPORTED_MODULE_4__.M,{...props,ref})}));PlatformIcon.__docgenInfo={description:'Renders an icon from the predefined list of platform icons.\nicon name must follow the directory structure in platform icons.\n@example <PlatformIcon icon="general/hideToolWindow" />\n@example <PlatformIcon icon="toolbar/pin" />\n@example <PlatformIcon icon="toolbar/pin.svg" />\n@example <PlatformIcon icon="/platform/dvcs-impl/resources/icons/currentBranchLabel.svg" />',methods:[],displayName:"PlatformIcon",props:{size:{required:!1,tsType:{name:"union",raw:"16 | number",elements:[{name:"literal",value:"16"},{name:"number"}]},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""},className:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Additional node going into the icon wrapper. Such as indicators."},icon:{required:!0,tsType:{name:"string"},description:'Icon path in intellij platform repo.\nIf starts with "/", the path will be from the repo root. Otherwise, it\'s relative to "platform/icons/src".\n".svg" extension is optional.'},darkIcon:{required:!1,tsType:{name:"string"},description:"Similar to icon, but for dark themes."}},composes:["Omit"]}},"./src/Icon/StyledIconWrapper.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>StyledIconWrapper});var _styled__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styled.ts");const StyledIconWrapper=_styled__WEBPACK_IMPORTED_MODULE_0__.zo.span`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  width: ${({size=16})=>`${size}px`};
  height: ${({size=16})=>`${size}px`};
  position: relative; // to allow absolute positioned indicators and overlays on icon
  cursor: ${({role})=>"button"===role?"pointer":void 0};
`},"./src/Icon/useSvgIcon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>useSvgIcon});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/styled.ts"),_intellij_platform_core_Collections__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Collections/ItemStateContext.tsx");function useSvgIcon({path,fallbackPath},ref){const theme=(0,_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__.Fg)(),itemState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_intellij_platform_core_Collections__WEBPACK_IMPORTED_MODULE_2__.k),selected=itemState?.isSelected||itemState?.isContainerFocused;(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{let canceled=!1;return(async()=>{if(!path)return void console.error("icon path is empty");ref.current&&(ref.current.ariaBusy="true");const svg=await theme.getSvgIcon(path,selected).catch((e=>{if(fallbackPath)return theme.getSvgIcon(fallbackPath,selected);throw e})).finally((()=>{ref?.current&&!canceled&&(ref.current.ariaBusy="false")}));if(svg){const element=ref?.current;if(!canceled&&element){element.querySelector("svg")?.remove();const svgElement=document.createElement("svg");element.appendChild(svgElement),svgElement.outerHTML=function makeIdsUnique(svg){const randomPostfix=(1e3*Math.random()).toFixed(0),idMatches=svg.matchAll(/id="(.*?)"/g);return[...idMatches].reduce(((modifiedSvg,[_,id])=>{const newId=`${id}-${randomPostfix}`;return replaceAll(`id="${id}"`,`id="${newId}"`,replaceAll(`url(#${id})`,`url(#${newId})`,modifiedSvg))}),svg)}(svg)}}else console.error("Could not resolve icon:",path)})().catch(console.error),()=>{canceled=!0}}),[path,selected])}function replaceAll(theOld,theNew,str){const replaced=str.replace(theOld,theNew),replacedAgain=replaced.replace(theOld,theNew);return replaced===replacedAgain?replaced:replaceAll(theOld,theNew,replacedAgain)}},"./src/Link/Link.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>Link});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_focus__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusable.mjs"),_react_aria_focus__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/@react-aria/focus/dist/FocusRing.mjs"),_intellij_platform_core_Link_StyledLink__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/Link/StyledLink.tsx"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/usePress.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/utils/dist/filterDOMProps.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs");const Link=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const ref=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.B)(forwardedRef),{focusableProps}=(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_2__.k)(props,ref),{pressProps,isPressed}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_3__.r)({...props,ref}),domProps=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_4__.z)(props,{labelable:!0}),interactionHandlers=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__.d)(focusableProps,pressProps);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_aria_focus__WEBPACK_IMPORTED_MODULE_6__.t,{focusRingClass:"focus-visible"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_intellij_platform_core_Link_StyledLink__WEBPACK_IMPORTED_MODULE_7__.F,{...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_5__.d)(focusableProps,interactionHandlers,domProps),as:"span",role:"link",ref,className:`${props.isDisabled?"disabled":""} ${isPressed?"active":""} ${props.className||""}`,"aria-disabled":props.isDisabled||void 0,tabIndex:props.isDisabled?void 0:props.excludeFromTabOrder?-1:0},props.children))}));Link.__docgenInfo={description:"A focusable span in style of [Link](https://jetbrains.github.io/ui/controls/link/) and with accessibility role of link.\n\nTODO and known issues:\n- in the reference impl, Space presses the link, Enter doesn't. It's vice versa here, because of how usePress is implemented.\n- Support for External links\n- Support for Anchor elements?\n\nUnknowns:\n- What are ActionLink and DefaultLinkButtonUI?\n- What is HyperLinkLabel compared to LabelLink (which was looked into in implementation of this component)?",methods:[],displayName:"Link",props:{isDisabled:{required:!1,tsType:{name:"boolean"},description:""},className:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},preventFocusOnPress:{required:!1,tsType:{name:"boolean"},description:""},excludeFromTabOrder:{required:!1,tsType:{name:"boolean"},description:""}}}},"./src/Link/StyledLink.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{F:()=>StyledLink});const StyledLink=__webpack_require__("./src/styled.ts").zo.a`
  cursor: pointer;
  text-decoration: none;
  outline: none;
  // &:focus-visible didn't work as expected, so FocusRing is used
  &.focus-visible {
    outline: 1px solid
      ${({theme})=>theme.color("Link.focusedBorderColor",theme.commonColors.focusBorderColor)};
    border-radius: 2px; // Registry.intValue("ide.link.button.focus.round.arc", 4)
  }
  color: ${({theme})=>theme.commonColors.linkForegroundEnabled};

  &:hover,
  &.hover /* for testing purposes*/ {
    text-decoration: underline;
    color: ${({theme})=>theme.color("Link.hoverForeground",theme.color("link.hover.foreground",""))};
  }
  &:active,
  &.active {
    color: ${({theme})=>theme.color("Link.pressedForeground",theme.color("link.pressed.foreground",theme.dark?"#BA6F25":"#F00000"))};
  }
  &:disabled,
  &.disabled {
    cursor: default;
    text-decoration: none;
    color: ${({theme})=>theme.color("Link.disabledForeground",theme.color("Label.disabledForeground",theme.color("Label.disabledText","#999")))};
  }
  // We may need to refine this to allow passing visited as a prop for links that don't have href, and not apply the
  // styles in that case, since it seems no href is considered visited by default. Although, in all main themes
  // Link.visitedForeground is set to the default link color.
  &:visited,
  &.visited {
    color: ${({theme})=>theme.color("Link.visitedForeground",theme.color("link.visited.foreground",theme.dark?"#9776A9":"#800080"))};
  }
`},"./src/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Fg:()=>useTheme,iv:()=>css,zo:()=>styled});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const styled=styled_components__WEBPACK_IMPORTED_MODULE_0__.ZP,useTheme=styled_components__WEBPACK_IMPORTED_MODULE_0__.Fg,css=styled_components__WEBPACK_IMPORTED_MODULE_0__.iv;styled_components__WEBPACK_IMPORTED_MODULE_0__.Sf}}]);
//# sourceMappingURL=Balloon-BalloonManager-stories.e0073432.iframe.bundle.js.map