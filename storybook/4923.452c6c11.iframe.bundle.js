"use strict";(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[4923,5195],{"../../node_modules/@react-aria/button/dist/useButton.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{U:()=>$701a24aa0da5b062$export$ea18c227d4417cc3});var _react_aria_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/utils/dist/filterDOMProps.mjs"),_react_aria_focus__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusable.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/usePress.mjs");function $701a24aa0da5b062$export$ea18c227d4417cc3(props,ref){let additionalProps,{elementType="button",isDisabled,onPress,onPressStart,onPressEnd,onPressUp,onPressChange,preventFocusOnPress,allowFocusWhenDisabled,onClick:deprecatedOnClick,href,target,rel,type="button"}=props;additionalProps="button"===elementType?{type,disabled:isDisabled}:{role:"button",tabIndex:isDisabled?void 0:0,href:"a"===elementType&&isDisabled?void 0:href,target:"a"===elementType?target:void 0,type:"input"===elementType?type:void 0,disabled:"input"===elementType?isDisabled:void 0,"aria-disabled":isDisabled&&"input"!==elementType?isDisabled:void 0,rel:"a"===elementType?rel:void 0};let{pressProps,isPressed}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_0__.r)({onPressStart,onPressEnd,onPressChange,onPress,onPressUp,isDisabled,preventFocusOnPress,ref}),{focusableProps}=(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_1__.k)(props,ref);allowFocusWhenDisabled&&(focusableProps.tabIndex=isDisabled?-1:focusableProps.tabIndex);let buttonProps=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.d)(focusableProps,pressProps,(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__.z)(props,{labelable:!0}));return{isPressed,buttonProps:(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_2__.d)(additionalProps,buttonProps,{"aria-haspopup":props["aria-haspopup"],"aria-expanded":props["aria-expanded"],"aria-controls":props["aria-controls"],"aria-pressed":props["aria-pressed"],onClick:e=>{deprecatedOnClick&&(deprecatedOnClick(e),console.warn("onClick is deprecated, please use onPress"))}})}}},"../../node_modules/@react-aria/i18n/dist/useLocalizedStringFormatter.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{q:()=>$fca6afa0e843324b$export$f12b703ca79dfbb1});var context=__webpack_require__("../../node_modules/@react-aria/i18n/dist/context.mjs");const $5b160d28a433310d$var$localeSymbol=Symbol.for("react-aria.i18n.locale"),$5b160d28a433310d$var$stringsSymbol=Symbol.for("react-aria.i18n.strings");let $5b160d28a433310d$var$cachedGlobalStrings;class $5b160d28a433310d$export$c17fa47878dc55b6{getStringForLocale(key,locale){let string=this.getStringsForLocale(locale)[key];if(!string)throw new Error(`Could not find intl message ${key} in ${locale} locale`);return string}getStringsForLocale(locale){let strings=this.strings[locale];return strings||(strings=function $5b160d28a433310d$var$getStringsForLocale(locale,strings,defaultLocale="en-US"){if(strings[locale])return strings[locale];let language=function $5b160d28a433310d$var$getLanguage(locale){return Intl.Locale?new Intl.Locale(locale).language:locale.split("-")[0]}(locale);if(strings[language])return strings[language];for(let key in strings)if(key.startsWith(language+"-"))return strings[key];return strings[defaultLocale]}(locale,this.strings,this.defaultLocale),this.strings[locale]=strings),strings}static getGlobalDictionaryForPackage(packageName){if("undefined"==typeof window)return null;let locale=window[$5b160d28a433310d$var$localeSymbol];if(void 0===$5b160d28a433310d$var$cachedGlobalStrings){let globalStrings=window[$5b160d28a433310d$var$stringsSymbol];if(!globalStrings)return null;$5b160d28a433310d$var$cachedGlobalStrings={};for(let pkg in globalStrings)$5b160d28a433310d$var$cachedGlobalStrings[pkg]=new $5b160d28a433310d$export$c17fa47878dc55b6({[locale]:globalStrings[pkg]},locale)}let dictionary=null==$5b160d28a433310d$var$cachedGlobalStrings?void 0:$5b160d28a433310d$var$cachedGlobalStrings[packageName];if(!dictionary)throw new Error(`Strings for package "${packageName}" were not included by LocalizedStringProvider. Please add it to the list passed to createLocalizedStringDictionary.`);return dictionary}constructor(messages,defaultLocale="en-US"){this.strings=Object.fromEntries(Object.entries(messages).filter((([,v])=>v))),this.defaultLocale=defaultLocale}}const $6db58dc88e78b024$var$pluralRulesCache=new Map,$6db58dc88e78b024$var$numberFormatCache=new Map;class $6db58dc88e78b024$export$2f817fcdc4b89ae0{format(key,variables){let message=this.strings.getStringForLocale(key,this.locale);return"function"==typeof message?message(variables,this):message}plural(count,options,type="cardinal"){let opt=options["="+count];if(opt)return"function"==typeof opt?opt():opt;let key=this.locale+":"+type,pluralRules=$6db58dc88e78b024$var$pluralRulesCache.get(key);return pluralRules||(pluralRules=new Intl.PluralRules(this.locale,{type}),$6db58dc88e78b024$var$pluralRulesCache.set(key,pluralRules)),opt=options[pluralRules.select(count)]||options.other,"function"==typeof opt?opt():opt}number(value){let numberFormat=$6db58dc88e78b024$var$numberFormatCache.get(this.locale);return numberFormat||(numberFormat=new Intl.NumberFormat(this.locale),$6db58dc88e78b024$var$numberFormatCache.set(this.locale,numberFormat)),numberFormat.format(value)}select(options,value){let opt=options[value]||options.other;return"function"==typeof opt?opt():opt}constructor(locale,strings){this.locale=locale,this.strings=strings}}var react=__webpack_require__("../../node_modules/react/index.js");const $fca6afa0e843324b$var$cache=new WeakMap;function $fca6afa0e843324b$export$87b761675e8eaa10(strings,packageName){return packageName&&$5b160d28a433310d$export$c17fa47878dc55b6.getGlobalDictionaryForPackage(packageName)||function $fca6afa0e843324b$var$getCachedDictionary(strings){let dictionary=$fca6afa0e843324b$var$cache.get(strings);return dictionary||(dictionary=new $5b160d28a433310d$export$c17fa47878dc55b6(strings),$fca6afa0e843324b$var$cache.set(strings,dictionary)),dictionary}(strings)}function $fca6afa0e843324b$export$f12b703ca79dfbb1(strings,packageName){let{locale}=(0,context.j)(),dictionary=$fca6afa0e843324b$export$87b761675e8eaa10(strings,packageName);return(0,react.useMemo)((()=>new $6db58dc88e78b024$export$2f817fcdc4b89ae0(locale,dictionary)),[locale,dictionary])}},"../../node_modules/@react-aria/selection/dist/useSelectableList.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{_:()=>$982254629710d113$export$b95089534ab7c1fd});var _useSelectableCollection_mjs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/selection/dist/useSelectableCollection.mjs"),_ListKeyboardDelegate_mjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/selection/dist/ListKeyboardDelegate.mjs"),_react_aria_i18n__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/i18n/dist/useCollator.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function $982254629710d113$export$b95089534ab7c1fd(props){let{selectionManager,collection,disabledKeys,ref,keyboardDelegate,layoutDelegate}=props,collator=(0,_react_aria_i18n__WEBPACK_IMPORTED_MODULE_1__.X)({usage:"search",sensitivity:"base"}),disabledBehavior=selectionManager.disabledBehavior,delegate=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>keyboardDelegate||new(0,_ListKeyboardDelegate_mjs__WEBPACK_IMPORTED_MODULE_2__.d)({collection,disabledKeys,disabledBehavior,ref,collator,layoutDelegate})),[keyboardDelegate,layoutDelegate,collection,disabledKeys,ref,collator,disabledBehavior]),{collectionProps}=(0,_useSelectableCollection_mjs__WEBPACK_IMPORTED_MODULE_3__.g)({...props,ref,selectionManager,keyboardDelegate:delegate});return{listProps:collectionProps}}},"../../node_modules/@react-aria/tooltip/dist/module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Q:()=>$4e1b34546679e357$export$a6da6c504e4bba8b,l:()=>$326e436e94273fe1$export$1c4b08e0eca38426});var _react_aria_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/filterDOMProps.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@react-aria/utils/dist/mergeProps.mjs"),_react_aria_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useId.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useHover.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/useFocusVisible.mjs"),_react_aria_interactions__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/@react-aria/interactions/dist/usePress.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_aria_focus__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/@react-aria/focus/dist/useFocusable.mjs");function $326e436e94273fe1$export$1c4b08e0eca38426(props,state){let domProps=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__.z)(props,{labelable:!0}),{hoverProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__.X)({onHoverStart:()=>null==state?void 0:state.open(!0),onHoverEnd:()=>null==state?void 0:state.close()});return{tooltipProps:(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__.d)(domProps,hoverProps,{role:"tooltip"})}}function $4e1b34546679e357$export$a6da6c504e4bba8b(props,state,ref){let{isDisabled,trigger}=props,tooltipId=(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_4__.Me)(),isHovered=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),isFocused=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),handleShow=()=>{(isHovered.current||isFocused.current)&&state.open(isFocused.current)},handleHide=immediate=>{isHovered.current||isFocused.current||state.close(immediate)};(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{let onKeyDown=e=>{ref&&ref.current&&"Escape"===e.key&&state.close(!0)};if(state.isOpen)return document.addEventListener("keydown",onKeyDown,!0),()=>{document.removeEventListener("keydown",onKeyDown,!0)}}),[ref,state]);let{hoverProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_2__.X)({isDisabled,onHoverStart:()=>{"focus"!==trigger&&("pointer"===(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_5__.Jz)()?isHovered.current=!0:isHovered.current=!1,handleShow())},onHoverEnd:()=>{"focus"!==trigger&&(isFocused.current=!1,isHovered.current=!1,handleHide())}}),{pressProps}=(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_6__.r)({onPressStart:()=>{isFocused.current=!1,isHovered.current=!1,handleHide(!0)}}),{focusableProps}=(0,_react_aria_focus__WEBPACK_IMPORTED_MODULE_7__.k)({isDisabled,onFocus:()=>{(0,_react_aria_interactions__WEBPACK_IMPORTED_MODULE_5__.E)()&&(isFocused.current=!0,handleShow())},onBlur:()=>{isFocused.current=!1,isHovered.current=!1,handleHide(!0)}},ref);return{triggerProps:{"aria-describedby":state.isOpen?tooltipId:void 0,...(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_3__.d)(focusableProps,hoverProps,pressProps)},tooltipProps:{id:tooltipId}}}},"../../node_modules/@react-aria/utils/dist/openLink.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{eY:()=>$ea8dcbcb9ea1b556$export$7e924b3091a3bd18,tv:()=>$ea8dcbcb9ea1b556$export$9a302a45f65d0572});var _focusWithoutScrolling_mjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@react-aria/utils/dist/focusWithoutScrolling.mjs"),_platform_mjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-aria/utils/dist/platform.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");const $ea8dcbcb9ea1b556$var$RouterContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({isNative:!0,open:function $ea8dcbcb9ea1b556$var$openSyntheticLink(target,modifiers){$ea8dcbcb9ea1b556$var$getSyntheticLink(target,(link=>$ea8dcbcb9ea1b556$export$95185d699e05d4d7(link,modifiers)))},useHref:href=>href});function $ea8dcbcb9ea1b556$export$9a302a45f65d0572(){return(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)($ea8dcbcb9ea1b556$var$RouterContext)}function $ea8dcbcb9ea1b556$export$95185d699e05d4d7(target,modifiers,setOpening=!0){var _window_event_type,_window_event;let{metaKey,ctrlKey,altKey,shiftKey}=modifiers;(0,_platform_mjs__WEBPACK_IMPORTED_MODULE_1__.vU)()&&(null===(_window_event=window.event)||void 0===_window_event||null===(_window_event_type=_window_event.type)||void 0===_window_event_type?void 0:_window_event_type.startsWith("key"))&&"_blank"===target.target&&((0,_platform_mjs__WEBPACK_IMPORTED_MODULE_1__.V5)()?metaKey=!0:ctrlKey=!0);let event=(0,_platform_mjs__WEBPACK_IMPORTED_MODULE_1__.Pf)()&&(0,_platform_mjs__WEBPACK_IMPORTED_MODULE_1__.V5)()&&!(0,_platform_mjs__WEBPACK_IMPORTED_MODULE_1__.zc)()?new KeyboardEvent("keydown",{keyIdentifier:"Enter",metaKey,ctrlKey,altKey,shiftKey}):new MouseEvent("click",{metaKey,ctrlKey,altKey,shiftKey,bubbles:!0,cancelable:!0});$ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening=setOpening,(0,_focusWithoutScrolling_mjs__WEBPACK_IMPORTED_MODULE_2__.A)(target),target.dispatchEvent(event),$ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening=!1}function $ea8dcbcb9ea1b556$var$getSyntheticLink(target,open){if(target instanceof HTMLAnchorElement)open(target);else if(target.hasAttribute("data-href")){let link=document.createElement("a");link.href=target.getAttribute("data-href"),target.hasAttribute("data-target")&&(link.target=target.getAttribute("data-target")),target.hasAttribute("data-rel")&&(link.rel=target.getAttribute("data-rel")),target.hasAttribute("data-download")&&(link.download=target.getAttribute("data-download")),target.hasAttribute("data-ping")&&(link.ping=target.getAttribute("data-ping")),target.hasAttribute("data-referrer-policy")&&(link.referrerPolicy=target.getAttribute("data-referrer-policy")),target.appendChild(link),open(link),target.removeChild(link)}}function $ea8dcbcb9ea1b556$export$7e924b3091a3bd18(props){let router=$ea8dcbcb9ea1b556$export$9a302a45f65d0572();return{href:(null==props?void 0:props.href)?router.useHref(null==props?void 0:props.href):void 0,target:null==props?void 0:props.target,rel:null==props?void 0:props.rel,download:null==props?void 0:props.download,ping:null==props?void 0:props.ping,referrerPolicy:null==props?void 0:props.referrerPolicy}}$ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening=!1},"../../node_modules/@react-aria/utils/dist/useLabels.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{b:()=>$313b98861ee5dd6c$export$d6875122194c7b44});var _useId_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@react-aria/utils/dist/useId.mjs");function $313b98861ee5dd6c$export$d6875122194c7b44(props,defaultLabel){let{id,"aria-label":label,"aria-labelledby":labelledBy}=props;if(id=(0,_useId_mjs__WEBPACK_IMPORTED_MODULE_0__.Me)(id),labelledBy&&label){let ids=new Set([id,...labelledBy.trim().split(/\s+/)]);labelledBy=[...ids].join(" ")}else labelledBy&&(labelledBy=labelledBy.trim().split(/\s+/).join(" "));return label||labelledBy||!defaultLabel||(label=defaultLabel),{id,"aria-label":label,"aria-labelledby":labelledBy}}},"../../node_modules/@react-stately/collections/dist/Section.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$:()=>$9fc4852771d079eb$export$6e2c8f0811a474ce});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function $9fc4852771d079eb$var$Section(props){return null}$9fc4852771d079eb$var$Section.getCollectionNode=function*getCollectionNode(props){let{children,title,items}=props;yield{type:"section",props,hasChildNodes:!0,rendered:title,"aria-label":props["aria-label"],*childNodes(){if("function"==typeof children){if(!items)throw new Error("props.children was a function but props.items is missing");for(let item of items)yield{type:"item",value:item,renderer:children}}else{let items=[];react__WEBPACK_IMPORTED_MODULE_0__.Children.forEach(children,(child=>{items.push({type:"item",element:child})})),yield*items}}}};let $9fc4852771d079eb$export$6e2c8f0811a474ce=$9fc4852771d079eb$var$Section},"../../node_modules/@react-stately/overlays/dist/useOverlayTriggerState.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>$fc909762b330b746$export$61c6a8c84e605fb6});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_stately_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-stately/utils/dist/useControlledState.mjs");function $fc909762b330b746$export$61c6a8c84e605fb6(props){let[isOpen,setOpen]=(0,_react_stately_utils__WEBPACK_IMPORTED_MODULE_1__.z)(props.isOpen,props.defaultOpen||!1,props.onOpenChange);const open=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setOpen(!0)}),[setOpen]),close=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setOpen(!1)}),[setOpen]),toggle=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setOpen(!isOpen)}),[setOpen,isOpen]);return{isOpen,setOpen,open,close,toggle}}},"../../node_modules/@react-stately/tooltip/dist/module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>$8796f90736e175cb$export$4d40659c25ecb50b});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_react_stately_overlays__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@react-stately/overlays/dist/useOverlayTriggerState.mjs");const $8796f90736e175cb$var$TOOLTIP_DELAY=1500,$8796f90736e175cb$var$TOOLTIP_COOLDOWN=500;let $8796f90736e175cb$var$tooltips={},$8796f90736e175cb$var$tooltipId=0,$8796f90736e175cb$var$globalWarmedUp=!1,$8796f90736e175cb$var$globalWarmUpTimeout=null,$8796f90736e175cb$var$globalCooldownTimeout=null;function $8796f90736e175cb$export$4d40659c25ecb50b(props={}){let{delay=$8796f90736e175cb$var$TOOLTIP_DELAY}=props,{isOpen,open,close}=(0,_react_stately_overlays__WEBPACK_IMPORTED_MODULE_1__.d)(props),id=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>""+ ++$8796f90736e175cb$var$tooltipId),[]),closeTimeout=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),ensureTooltipEntry=()=>{$8796f90736e175cb$var$tooltips[id]=hideTooltip},closeOpenTooltips=()=>{for(let hideTooltipId in $8796f90736e175cb$var$tooltips)hideTooltipId!==id&&($8796f90736e175cb$var$tooltips[hideTooltipId](!0),delete $8796f90736e175cb$var$tooltips[hideTooltipId])},showTooltip=()=>{clearTimeout(closeTimeout.current),closeTimeout.current=null,closeOpenTooltips(),ensureTooltipEntry(),$8796f90736e175cb$var$globalWarmedUp=!0,open(),$8796f90736e175cb$var$globalWarmUpTimeout&&(clearTimeout($8796f90736e175cb$var$globalWarmUpTimeout),$8796f90736e175cb$var$globalWarmUpTimeout=null),$8796f90736e175cb$var$globalCooldownTimeout&&(clearTimeout($8796f90736e175cb$var$globalCooldownTimeout),$8796f90736e175cb$var$globalCooldownTimeout=null)},hideTooltip=immediate=>{immediate?(clearTimeout(closeTimeout.current),closeTimeout.current=null,close()):closeTimeout.current||(closeTimeout.current=setTimeout((()=>{closeTimeout.current=null,close()}),$8796f90736e175cb$var$TOOLTIP_COOLDOWN)),$8796f90736e175cb$var$globalWarmUpTimeout&&(clearTimeout($8796f90736e175cb$var$globalWarmUpTimeout),$8796f90736e175cb$var$globalWarmUpTimeout=null),$8796f90736e175cb$var$globalWarmedUp&&($8796f90736e175cb$var$globalCooldownTimeout&&clearTimeout($8796f90736e175cb$var$globalCooldownTimeout),$8796f90736e175cb$var$globalCooldownTimeout=setTimeout((()=>{delete $8796f90736e175cb$var$tooltips[id],$8796f90736e175cb$var$globalCooldownTimeout=null,$8796f90736e175cb$var$globalWarmedUp=!1}),$8796f90736e175cb$var$TOOLTIP_COOLDOWN))};return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>()=>{clearTimeout(closeTimeout.current),$8796f90736e175cb$var$tooltips[id]&&delete $8796f90736e175cb$var$tooltips[id]}),[id]),{isOpen,open:immediate=>{!immediate&&delay>0&&!closeTimeout.current?(closeOpenTooltips(),ensureTooltipEntry(),isOpen||$8796f90736e175cb$var$globalWarmUpTimeout||$8796f90736e175cb$var$globalWarmedUp?isOpen||showTooltip():$8796f90736e175cb$var$globalWarmUpTimeout=setTimeout((()=>{$8796f90736e175cb$var$globalWarmUpTimeout=null,$8796f90736e175cb$var$globalWarmedUp=!0,showTooltip()}),delay)):showTooltip()},close:hideTooltip}}},"./node_modules/ramda/es/compose.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>compose});var pipe=__webpack_require__("./node_modules/ramda/es/pipe.js"),_curry1=__webpack_require__("./node_modules/ramda/es/internal/_curry1.js"),_isString=__webpack_require__("./node_modules/ramda/es/internal/_isString.js");const es_reverse=(0,_curry1.Z)((function reverse(list){return(0,_isString.Z)(list)?list.split("").reverse().join(""):Array.prototype.slice.call(list,0).reverse()}));function compose(){if(0===arguments.length)throw new Error("compose requires at least one argument");return pipe.Z.apply(this,es_reverse(arguments))}},"./node_modules/ramda/es/identity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _identity(x){return x}__webpack_require__.d(__webpack_exports__,{Z:()=>es_identity});const es_identity=(0,__webpack_require__("./node_modules/ramda/es/internal/_curry1.js").Z)(_identity)}}]);