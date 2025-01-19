"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[7478],{"./src/Tabs/StyledDefaultTab.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>StyledDefaultTab});var _TabTheme__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/Tabs/TabTheme.ts");const StyledDefaultTab=__webpack_require__("./src/styled.ts").zo.div`
  box-sizing: border-box;
  display: inline-flex;
  letter-spacing: 0.015rem;
  font-size: 0.85rem;
  cursor: default;
  white-space: nowrap;

  // spacing
  padding: 0 0.5rem;
  line-height: 1.7rem; // vertical spacing handled by line-height

  // disabled state doesn't seem to be supported in Intellij Platform at all.
  opacity: ${({disabled})=>disabled?".5":"1"};
  color: ${({theme})=>theme.color("DefaultTabs.foreground")};

  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
  }

  ${({theme})=>(0,_TabTheme__WEBPACK_IMPORTED_MODULE_0__.s)({underlineHeight:theme.value("DefaultTabs.underlineHeight")??3,inactiveUnderlineColor:theme.color("DefaultTabs.inactiveUnderlineColor",theme.dark?"#747a80":"#9ca7b8"),underlineColor:theme.color("DefaultTabs.underlineColor",theme.dark?"#4A88C7":"#4083C9"),underlinedTabInactiveForeground:theme.color("DefaultTabs.underlinedTabInactiveForeground"),underlinedTabForeground:theme.color("DefaultTabs.underlinedTabForeground"),background:theme.color("DefaultTabs.background",theme.dark?"#3C3F41":"#ECECEC"),underlinedTabInactiveBackground:theme.color("DefaultTabs.underlinedTabInactiveBackground"),underlinedTabBackground:theme.color("DefaultTabs.underlinedTabBackground"),hoverInactiveBackground:theme.color("DefaultTabs.hoverInactiveBackground",theme.dark?"rgba(0,0,0,.35)":"rgba(0,0,0,.1)"),hoverBackground:theme.color("DefaultTabs.hoverBackground",theme.dark?"rgba(0,0,0,.35)":"rgba(0,0,0,.1)")})};
`},"./src/Tabs/StyledDefaultTabs.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{f:()=>StyledDefaultTabs});var _intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/styled.ts"),_TabTheme__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/Tabs/TabTheme.ts");const StyledDefaultTabs=_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_1__.zo.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-style: solid;
  border-width: ${({noBorders})=>noBorders?"0":"1px 0"};

  ${({theme})=>(0,_TabTheme__WEBPACK_IMPORTED_MODULE_0__.N)({borderColor:theme.color("DefaultTabs.borderColor",theme.commonColors.contrastBorder),background:theme.color("DefaultTabs.background")})};
`},"./src/Tabs/TabContentLayout.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>TabContentLayout});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_styled__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/styled.ts"),_react_aria_focus__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusable.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useObjectRef.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs");const StyledTabItemLayout=_styled__WEBPACK_IMPORTED_MODULE_1__.zo.div`
  display: inline-flex;
  align-items: center;
`,iconStyle=_styled__WEBPACK_IMPORTED_MODULE_1__.iv`
  display: inline-flex; // without this, the wrapper takes the full height, causing icon to be placed on top
  margin-top: -0.1rem; // seems necessary for pixel perfect match with the original impl
`,StyledStartIconWrapper=_styled__WEBPACK_IMPORTED_MODULE_1__.zo.span`
  ${iconStyle};
  margin-right: 0.25rem;
`,StyledEndIconWrapper=_styled__WEBPACK_IMPORTED_MODULE_1__.zo.span`
  ${iconStyle};
  margin-left: 0.25rem;
  margin-right: -0.25rem; // default padding of the tab should be a little reduced when close icon is there.
  border-radius: 16px;
`,TabContentLayout=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((({startIcon,title,endIcon,containerProps={}},ref)=>{const{focusableProps}=(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_2__.k)({},(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__.B)(ref));return react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledTabItemLayout,{...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_4__.d)(focusableProps,containerProps),ref},startIcon&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledStartIconWrapper,null,startIcon),title,endIcon&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledEndIconWrapper,null,endIcon))}));TabContentLayout.__docgenInfo={description:"Helper component for rendering the common layout of tab content.",methods:[],displayName:"TabContentLayout",props:{startIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"the icon placed before the text."},title:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"title of the tab. Normally just a string"},endIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"the icon placed after the text. Typical use cases: close or pin icon."},containerProps:{required:!1,tsType:{name:"Omit",elements:[{name:"HTMLProps",elements:[{name:"HTMLDivElement"}],raw:"HTMLProps<HTMLDivElement>"},{name:"union",raw:'"ref" | "as"',elements:[{name:"literal",value:'"ref"'},{name:"literal",value:'"as"'}]}],raw:'Omit<HTMLProps<HTMLDivElement>, "ref" | "as">'},description:"Generic HTML props passed to the container div.",defaultValue:{value:"{}",computed:!1}}}}},"./src/Tabs/TabTheme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{N:()=>getTabsThemeStyles,s:()=>getTabThemeStyles});var _intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styled.ts");const getTabsThemeStyles=({background,borderColor})=>_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_0__.iv`
  border-color: ${borderColor};
  background: ${background};
`,getTabThemeStyles=({underlineHeight,background,underlinedTabBackground,underlinedTabInactiveBackground,hoverInactiveBackground,hoverBackground,underlinedTabForeground,underlinedTabInactiveForeground,inactiveUnderlineColor,underlineColor})=>_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_0__.iv`
    // active indicator
    &::after {
      height: ${null!=underlineHeight?`${underlineHeight}px`:void 0};
      background-color: ${({selected})=>selected&&inactiveUnderlineColor};
      background-color: ${({selected,active})=>selected&&active&&underlineColor};
    }

    // foreground rules
    color: ${({selected})=>selected&&underlinedTabInactiveForeground};
    color: ${({selected,active})=>selected&&active&&underlinedTabForeground};

    //  background rules
    background: ${background};
    background: ${({selected})=>selected&&underlinedTabInactiveBackground};
    background: ${({selected,active})=>selected&&active&&underlinedTabBackground};

    ${({disabled,active})=>!disabled&&_intellij_platform_core_styled__WEBPACK_IMPORTED_MODULE_0__.iv`
        &:hover,
        &.hover /* for testing purposes */ {
          background: ${hoverInactiveBackground};
          background: ${active&&hoverBackground};
        }
      `}
  `},"./src/Tabs/Tabs.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{m:()=>Tabs});var react=__webpack_require__("../../node_modules/react/index.js"),dist_module=__webpack_require__("../../node_modules/@react-aria/tabs/dist/module.js"),scrollIntoView=__webpack_require__("../../node_modules/@react-aria/utils/dist/scrollIntoView.mjs"),filterDOMProps=__webpack_require__("../../node_modules/@react-aria/utils/dist/filterDOMProps.mjs"),mergeProps=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),useTabListState=__webpack_require__("../../node_modules/@react-stately/tabs/dist/useTabListState.mjs"),styled=__webpack_require__("./src/styled.ts");const horizontalOverflowIndicatorStyles=styled.iv`
  content: "";
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 10px;
  z-index: 1;
`,StyledHorizontalOverflowShadows=styled.zo.div`
  position: relative; // for overflow indicator (pseudo-)elements to be positioned absolute

  /* FIXME: find out what color, width and gradient parameters are used in the original implementation */
  ${({hasOverflowAtStart})=>hasOverflowAtStart&&styled.iv`
      ::before {
        ${horizontalOverflowIndicatorStyles};
        background: linear-gradient(
          90deg,
          ${({theme})=>theme.commonColors.panelBackground} 0%,
          transparent 100%
        );
        left: 0;
      }
    `};
  ${({hasOverflowAtEnd})=>hasOverflowAtEnd&&styled.iv`
      ::after {
        ${horizontalOverflowIndicatorStyles};
        background: linear-gradient(
          -90deg,
          ${({theme})=>theme.commonColors.panelBackground} 0%,
          transparent 100%
        );
        right: 0;
      }
    `};
`;var Item=__webpack_require__("../../node_modules/@react-stately/collections/dist/Item.mjs"),MenuTrigger=__webpack_require__("./src/Menu/MenuTrigger.tsx"),Menu=__webpack_require__("./src/Menu/Menu.tsx"),IconButton=__webpack_require__("./src/IconButton/IconButton.tsx"),PlatformIcon=__webpack_require__("./src/Icon/PlatformIcon.tsx");const TabsOverflowMenu=({collection,overflowedKeys,onSelect})=>react.createElement(react.Fragment,null,overflowedKeys.size>0&&react.createElement(MenuTrigger.b,{align:"end",renderMenu:({menuProps})=>{const items=[...collection].filter((menuItem=>overflowedKeys.has(menuItem.key)));return react.createElement(Menu.v2,{...menuProps,onAction:key=>{onSelect(key)},items},(item=>react.createElement(Item.c,{key:item.key,textValue:item.textValue},item.props.inOverflowMenu||item.textValue)))}},((props,ref)=>react.createElement(IconButton.hU,{...props,ref},react.createElement(PlatformIcon.vq,{icon:"actions/findAndShowNextMatches"})))));TabsOverflowMenu.__docgenInfo={description:"",methods:[],displayName:"TabsOverflowMenu",props:{collection:{required:!0,tsType:{name:"Collection",elements:[{name:"Node",elements:[{name:"T"}],raw:"Node<T>"}],raw:"Collection<Node<T>>"},description:""},overflowedKeys:{required:!0,tsType:{name:"Set",elements:[{name:"Key"}],raw:"Set<Key>"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(key: Key) => void",signature:{arguments:[{type:{name:"Key"},name:"key"}],return:{name:"void"}}},description:""}}};var useOverflowObserver=__webpack_require__("./src/utils/overflow-utils/useOverflowObserver.tsx");var array_utils=__webpack_require__("./src/utils/array-utils.ts"),StyledDefaultTabs=__webpack_require__("./src/Tabs/StyledDefaultTabs.ts"),StyledDefaultTab=__webpack_require__("./src/Tabs/StyledDefaultTab.ts"),useForwardedRef=__webpack_require__("./src/utils/useForwardedRef.ts");const Tab=(0,react.forwardRef)((function Tab({state,item,focusable,active,shouldSelectOnPressUp,Component=StyledDefaultTab.z},forwardedRef){const{key,rendered}=item,ref=(0,useForwardedRef.Z)(forwardedRef),{tabProps:{tabIndex,...tabProps}}=(0,dist_module.xD)({key,shouldSelectOnPressUp},state,ref),isSelected=state.selectedKey===key,isDisabled=state.disabledKeys.has(key);return react.createElement(Component,{...tabProps,tabIndex:focusable?tabIndex:void 0,ref,active,selected:isSelected,disabled:isDisabled},rendered)}));Tab.__docgenInfo={description:"",methods:[],displayName:"Tab",props:{state:{required:!0,tsType:{name:"TabListState",elements:[{name:"object"}],raw:"TabListState<object>"},description:""},item:{required:!0,tsType:{name:"Node",elements:[{name:"T"}],raw:"Node<T>"},description:""},focusable:{required:!1,tsType:{name:"boolean"},description:"{@see TabsProps#focusable}"},active:{required:!1,tsType:{name:"boolean"},description:"{@see TabsProps#active}"},shouldSelectOnPressUp:{required:!1,tsType:{name:"boolean"},description:""},Component:{required:!1,tsType:{name:"StyledDefaultTab"},description:"",defaultValue:{value:'styled.div<StyledTabProps>`\n  box-sizing: border-box;\n  display: inline-flex;\n  letter-spacing: 0.015rem;\n  font-size: 0.85rem;\n  cursor: default;\n  white-space: nowrap;\n\n  // spacing\n  padding: 0 0.5rem;\n  line-height: 1.7rem; // vertical spacing handled by line-height\n\n  // disabled state doesn\'t seem to be supported in Intellij Platform at all.\n  opacity: ${({ disabled }) => (disabled ? ".5" : "1")};\n  color: ${({ theme }) =>\n    theme.color(\n      "DefaultTabs.foreground" as UnknownThemeProp<"DefaultTabs.foreground">\n    )};\n\n  position: relative;\n  &::after {\n    content: "";\n    position: absolute;\n    width: 100%;\n    left: 0;\n    bottom: 0;\n  }\n\n  ${defaultTabTheme};\n`',computed:!1}}}};const scrollBarDisabledStyle=styled.iv`
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  &::-webkit-scrollbar {
    /* for Chrome/Safari/Webkit */
    display: none;
  }
`,StyledTabList=styled.zo.div`
  display: flex;
  flex-wrap: ${({multiRow})=>multiRow?"wrap":"nowrap"};
  overflow: auto;

  ${scrollBarDisabledStyle};
`,Tabs=({focusable,shouldSelectOnPressUp,active,TabComponent,TabsComponent=StyledDefaultTabs.f,multiRow,noOverflowMenu,noScroll,noBorders,...props})=>{const state=(0,useTabListState.p)(props),ref=react.useRef(null),{tabListProps}=(0,dist_module.hp)(props,state,ref),{scrolledIndicatorProps,hasOverflow}=function useHasOverflow({threshold=5,ref}){const[hasOverflow,setHasOverflow]=(0,react.useState)({left:!1,right:!1,top:!1,bottom:!1}),update=()=>{const element=ref.current;if(element){const offsetLeft=element.scrollLeft,offsetRight=element.scrollWidth-(element.offsetWidth+element.scrollLeft),offsetTop=element.scrollTop,offsetBottom=element.scrollHeight-(element.offsetHeight+element.scrollTop),newHasOverflow={top:offsetTop>threshold,bottom:offsetBottom>threshold,left:offsetLeft>threshold,right:offsetRight>threshold};hasOverflow.top===newHasOverflow.top&&hasOverflow.bottom===newHasOverflow.bottom&&hasOverflow.left===newHasOverflow.left&&hasOverflow.right===newHasOverflow.right||setHasOverflow(newHasOverflow)}};return(0,react.useEffect)(update),{scrolledIndicatorProps:{onScroll:update},hasOverflow}}({ref}),{overflowedElements}=(0,useOverflowObserver.o)(ref),overflowedKeys=new Set(overflowedElements.map((element=>element instanceof HTMLElement?element.dataset.key:null)).filter(array_utils.N));(0,react.useEffect)((()=>{if(!noScroll){const scrollableContainer=ref.current,selectedTabElement=scrollableContainer?.querySelector(`[data-key="${state.selectedKey}"]`);scrollableContainer&&selectedTabElement&&(0,scrollIntoView.z)(scrollableContainer,selectedTabElement)}}),[state.selectedKey]);if(noScroll)throw new Error("noScroll is not supported yet.");return react.createElement(TabsComponent,{noBorders,...(0,filterDOMProps.z)(props)},react.createElement(StyledHorizontalOverflowShadows,{hasOverflowAtStart:hasOverflow.left,hasOverflowAtEnd:hasOverflow.right,style:{minWidth:0}},react.createElement(StyledTabList,{...(0,mergeProps.d)(tabListProps,scrolledIndicatorProps),multiRow,ref},[...state.collection].map((item=>react.createElement(Tab,{key:item.key,item,state,focusable,shouldSelectOnPressUp,active,Component:TabComponent}))))),!noOverflowMenu&&react.createElement(TabsOverflowMenu,{collection:state.collection,overflowedKeys,onSelect:key=>{state.setSelectedKey(key)}}))};Tabs.__docgenInfo={description:"TODO: add support for overflow:\n - have vertical scroll also scroll tabs\n - add support for re-reordering tabs.\n - FIX: When a tab that was not selected is removed, selection should not change. It now changes to the tab before the removed one.",methods:[],displayName:"Tabs",props:{focusable:{required:!1,tsType:{name:"boolean"},description:"Whether tabs should be focusable or not. By default, following the Intellij Platform implementation, tabs are\nnot focusable and therefore lack the keyboard accessibility support specified in WAI-ARIA.\nYou can change this default behaviour and make the tabs keyboard accessible by passing `focusable`.\nfocus styles are not perfect at the moment, since it's not considered an important feature.\n@default false"},shouldSelectOnPressUp:{required:!1,tsType:{name:"boolean"},description:"Whether selected tab should change on press up instead of press down.\n@default false."},active:{required:!1,tsType:{name:"boolean"},description:'Enables "active" style on tabs. Is usually related to a container having focus.'},multiRow:{required:!1,tsType:{name:"boolean"},description:"If set to true, tabs will be wrapped into multiple rows if needed.\nNOTE: In the original implementation, in multi row mode, rows are separated by a border. It's not easy to achieve\nthis when we are implementing this feature with a simple `flex-wrap: wrap` css rule. It doesn't seem that\nimportant, but we can achieve something similar by some css tricks like the ones suggested here:\nhttps://stackoverflow.com/questions/36128333/row-lines-for-flex-container-css\n@default false"},noScroll:{required:!1,tsType:{name:"boolean"},description:"Only effective when {@link multiRow} is not true.\nIf set to true and multiRow is not true, it will prevent horizontal scroll of tabs. Depending on the value of\nIn this case:\n- if {@link noOverflowMenu} is not set to true, tabs that can't be fitted into the available space will be\n  accessible via an overflow menu.\n- if {@link noOverflowMenu} is set to true, the tabs will be fitted into the available space, and they will\n  be shrunk when needed.\n\n@todo: not implemented yet.\n@default false"},noOverflowMenu:{required:!1,tsType:{name:"boolean"},description:"Only effective when {@link multiRow} is not true.\nWhen set to true, tabs that couldn't be fitted into the available space, are either shrunk (if {@link noScroll}\nis set to true), or are just accessible by scroll."},noBorders:{required:!1,tsType:{name:"boolean"},description:"Removes the top and bottom border when passed.\nIt's still not clear whether such option makes sense or not, but\nat least in common use cases like in tool windows, it seems borders are already there and there should be a way\nof removing tab borders. On the other hand, when Tabs is used without any assumption about the surrounding UI,\nit kind of makes sense to have the top and bottom borders by default. So that's why this is made an option for\nnow, maybe until things are clearer.\n\n@default false"},TabsComponent:{required:!1,tsType:{name:"StyledDefaultTabs"},description:"",defaultValue:{value:'styled.div<{ noBorders?: boolean }>`\n  display: flex;\n  align-items: center;\n  box-sizing: border-box;\n  border-style: solid;\n  border-width: ${({ noBorders }) => (noBorders ? "0" : "1px 0")};\n\n  ${defaultTabsTheme};\n`',computed:!1}},TabComponent:{required:!1,tsType:{name:"StyledDefaultTab"},description:""}}}}}]);
//# sourceMappingURL=7478.461605e1.iframe.bundle.js.map