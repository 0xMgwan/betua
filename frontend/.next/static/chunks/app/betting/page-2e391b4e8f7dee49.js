(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8453],{92758:function(e,t,r){Promise.resolve().then(r.bind(r,4276))},34686:function(e,t,r){"use strict";r.d(t,{F4:function(){return m},xB:function(){return d}});var n,o,i=r(59593),a=r(64090),s=r(44549),c=r(78006),l=r(11109);r(92197),r(25552);var u=function(e,t){var r=arguments;if(null==t||!i.h.call(t,"css"))return a.createElement.apply(void 0,r);var n=r.length,o=Array(n);o[0]=i.E,o[1]=(0,i.c)(e,t);for(var s=2;s<n;s++)o[s]=r[s];return a.createElement.apply(null,o)};n=u||(u={}),o||(o=n.JSX||(n.JSX={}));var d=(0,i.w)(function(e,t){var r=e.styles,n=(0,l.O)([r],void 0,a.useContext(i.T)),o=a.useRef();return(0,c.j)(function(){var e=t.key+"-global",r=new t.sheet.constructor({key:e,nonce:t.sheet.nonce,container:t.sheet.container,speedy:t.sheet.isSpeedy}),i=!1,a=document.querySelector('style[data-emotion="'+e+" "+n.name+'"]');return t.sheet.tags.length&&(r.before=t.sheet.tags[0]),null!==a&&(i=!0,a.setAttribute("data-emotion",e),r.hydrate([a])),o.current=[r,i],function(){r.flush()}},[t]),(0,c.j)(function(){var e=o.current,r=e[0];if(e[1]){e[1]=!1;return}if(void 0!==n.next&&(0,s.My)(t,n.next,!0),r.tags.length){var i=r.tags[r.tags.length-1].nextElementSibling;r.before=i,r.flush()}t.insert("",n,r,!1)},[t,n.name]),null});function f(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,l.O)(t)}function m(){var e=f.apply(void 0,arguments),t="animation-"+e.name;return{name:t,styles:"@keyframes "+t+"{"+e.styles+"}",anim:1,toString:function(){return"_EMO_"+this.name+"_"+this.styles+"_EMO_"}}}},25552:function(e,t,r){"use strict";var n=r(97051),o={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},i={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},a={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},s={};function c(e){return n.isMemo(e)?a:s[e.$$typeof]||o}s[n.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},s[n.Memo]=a;var l=Object.defineProperty,u=Object.getOwnPropertyNames,d=Object.getOwnPropertySymbols,f=Object.getOwnPropertyDescriptor,m=Object.getPrototypeOf,p=Object.prototype;e.exports=function e(t,r,n){if("string"!=typeof r){if(p){var o=m(r);o&&o!==p&&e(t,o,n)}var a=u(r);d&&(a=a.concat(d(r)));for(var s=c(t),y=c(r),h=0;h<a.length;++h){var x=a[h];if(!i[x]&&!(n&&n[x])&&!(y&&y[x])&&!(s&&s[x])){var g=f(r,x);try{l(t,x,g)}catch(e){}}}}return t}},40576:function(e,t){"use strict";/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r="function"==typeof Symbol&&Symbol.for,n=r?Symbol.for("react.element"):60103,o=r?Symbol.for("react.portal"):60106,i=r?Symbol.for("react.fragment"):60107,a=r?Symbol.for("react.strict_mode"):60108,s=r?Symbol.for("react.profiler"):60114,c=r?Symbol.for("react.provider"):60109,l=r?Symbol.for("react.context"):60110,u=r?Symbol.for("react.async_mode"):60111,d=r?Symbol.for("react.concurrent_mode"):60111,f=r?Symbol.for("react.forward_ref"):60112,m=r?Symbol.for("react.suspense"):60113,p=r?Symbol.for("react.suspense_list"):60120,y=r?Symbol.for("react.memo"):60115,h=r?Symbol.for("react.lazy"):60116,x=r?Symbol.for("react.block"):60121,g=r?Symbol.for("react.fundamental"):60117,b=r?Symbol.for("react.responder"):60118,v=r?Symbol.for("react.scope"):60119;function S(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case n:switch(e=e.type){case u:case d:case i:case s:case a:case m:return e;default:switch(e=e&&e.$$typeof){case l:case f:case h:case y:case c:return e;default:return t}}case o:return t}}}function j(e){return S(e)===d}t.AsyncMode=u,t.ConcurrentMode=d,t.ContextConsumer=l,t.ContextProvider=c,t.Element=n,t.ForwardRef=f,t.Fragment=i,t.Lazy=h,t.Memo=y,t.Portal=o,t.Profiler=s,t.StrictMode=a,t.Suspense=m,t.isAsyncMode=function(e){return j(e)||S(e)===u},t.isConcurrentMode=j,t.isContextConsumer=function(e){return S(e)===l},t.isContextProvider=function(e){return S(e)===c},t.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===n},t.isForwardRef=function(e){return S(e)===f},t.isFragment=function(e){return S(e)===i},t.isLazy=function(e){return S(e)===h},t.isMemo=function(e){return S(e)===y},t.isPortal=function(e){return S(e)===o},t.isProfiler=function(e){return S(e)===s},t.isStrictMode=function(e){return S(e)===a},t.isSuspense=function(e){return S(e)===m},t.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===i||e===d||e===s||e===a||e===m||e===p||"object"==typeof e&&null!==e&&(e.$$typeof===h||e.$$typeof===y||e.$$typeof===c||e.$$typeof===l||e.$$typeof===f||e.$$typeof===g||e.$$typeof===b||e.$$typeof===v||e.$$typeof===x)},t.typeOf=S},97051:function(e,t,r){"use strict";e.exports=r(40576)},4276:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return y}});var n=r(3827),o=r(17122),i=r(9960),a=r(70776),s=r(64090),c=r(46049),l=r(98523),u=r(63048),d=r(91698),f=r(21419),m=r(17333);function p(e){let{match:t}=e,[r,o]=(0,s.useState)(null),i=(0,c.ff)("white","gray.800"),a=(0,c.ff)("gray.200","gray.700");return(0,n.jsx)(l.x,{borderWidth:"1px",borderRadius:"lg",overflow:"hidden",p:6,bg:i,borderColor:a,_hover:{shadow:"lg"},transition:"all 0.3s",children:(0,n.jsxs)(u.g,{spacing:4,align:"stretch",children:[(0,n.jsxs)(d.U,{justify:"space-between",children:[(0,n.jsx)(f.x,{fontWeight:"bold",fontSize:"lg",children:t.homeTeam}),(0,n.jsx)(f.x,{color:"gray.500",children:"vs"}),(0,n.jsx)(f.x,{fontWeight:"bold",fontSize:"lg",children:t.awayTeam})]}),(0,n.jsx)(f.x,{color:"gray.500",fontSize:"sm",children:new Date(t.date).toLocaleDateString()}),(0,n.jsxs)(d.U,{justify:"space-between",mt:4,children:[(0,n.jsxs)(m.z,{variant:"home"===r?"solid":"outline",colorScheme:"blue",onClick:()=>o("home"),size:"sm",children:["Home (",t.homeOdds.toFixed(2),")"]}),(0,n.jsxs)(m.z,{variant:"draw"===r?"solid":"outline",colorScheme:"blue",onClick:()=>o("draw"),size:"sm",children:["Draw (",t.drawOdds.toFixed(2),")"]}),(0,n.jsxs)(m.z,{variant:"away"===r?"solid":"outline",colorScheme:"blue",onClick:()=>o("away"),size:"sm",children:["Away (",t.awayOdds.toFixed(2),")"]})]}),r&&(0,n.jsx)(m.z,{colorScheme:"green",size:"sm",mt:2,onClick:()=>{console.log("Placing bet for:",r)},children:"Place Bet"})]})})}function y(){return(0,n.jsxs)(o.W,{maxW:"container.xl",py:8,children:[(0,n.jsx)(i.X,{size:"lg",mb:6,children:"Premier League Matches"}),(0,n.jsx)(a.M,{columns:{base:1,lg:2},spacing:6,children:[{id:1,homeTeam:"Arsenal",awayTeam:"Chelsea",date:"2025-03-04",homeOdds:2.1,drawOdds:3.4,awayOdds:2.8}].map(e=>(0,n.jsx)(p,{match:e},e.id))})]})}},27761:function(e,t,r){"use strict";r.d(t,{lq:function(){return o},qq:function(){return i}});var n=r(64090);function o(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return e=>{t.forEach(t=>{!function(e,t){if(null!=e){if("function"==typeof e){e(t);return}try{e.current=t}catch(r){throw Error("Cannot assign value '".concat(t,"' to ref '").concat(e,"'"))}}}(t,e)})}}function i(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,n.useMemo)(()=>o(...t),t)}},98523:function(e,t,r){"use strict";r.d(t,{x:function(){return n}});let n=(0,r(58772).m)("div");n.displayName="Box"},17333:function(e,t,r){"use strict";r.d(t,{z:function(){return g}});var n=r(3827),o=r(27761),i=r(32160),a=r(55451),s=r(235),c=r(64090);let[l,u]=(0,r(79859).k)({strict:!1,name:"ButtonGroupContext"});var d=r(58772);function f(e){let{children:t,className:r,...o}=e,i=(0,c.isValidElement)(t)?(0,c.cloneElement)(t,{"aria-hidden":!0,focusable:!1}):t,a=(0,s.cx)("chakra-button__icon",r);return(0,n.jsx)(d.m.span,{display:"inline-flex",alignSelf:"center",flexShrink:0,...o,className:a,children:i})}f.displayName="ButtonIcon";var m=r(36239),p=r(64084);function y(e){let{label:t,placement:r,spacing:o="0.5rem",children:i=(0,n.jsx)(p.$,{color:"currentColor",width:"1em",height:"1em"}),className:a,__css:l,...u}=e,f=(0,s.cx)("chakra-button__spinner",a),y="start"===r?"marginEnd":"marginStart",h=(0,c.useMemo)(()=>(0,m.k0)({display:"flex",alignItems:"center",position:t?"relative":"absolute",[y]:t?o:0,fontSize:"1em",lineHeight:"normal",...l}),[l,t,y,o]);return(0,n.jsx)(d.m.div,{className:f,...u,__css:h,children:i})}y.displayName="ButtonSpinner";var h=r(54413),x=r(14173);let g=(0,h.G)((e,t)=>{let r=u(),l=(0,x.m)("Button",{...r,...e}),{isDisabled:f=null==r?void 0:r.isDisabled,isLoading:m,isActive:p,children:h,leftIcon:g,rightIcon:v,loadingText:S,iconSpacing:j="0.5rem",type:w,spinner:_,spinnerPlacement:k="start",className:C,as:N,shouldWrapChildren:$,...O}=(0,i.L)(e),P=(0,c.useMemo)(()=>{let e={...null==l?void 0:l._focus,zIndex:1};return{display:"inline-flex",appearance:"none",alignItems:"center",justifyContent:"center",userSelect:"none",position:"relative",whiteSpace:"nowrap",verticalAlign:"middle",outline:"none",...l,...!!r&&{_focus:e}}},[l,r]),{ref:E,type:M}=function(e){let[t,r]=(0,c.useState)(!e);return{ref:(0,c.useCallback)(e=>{e&&r("BUTTON"===e.tagName)},[]),type:t?"button":void 0}}(N),T={rightIcon:v,leftIcon:g,iconSpacing:j,children:h,shouldWrapChildren:$};return(0,n.jsxs)(d.m.button,{disabled:f||m,ref:(0,o.qq)(t,E),as:N,type:null!=w?w:M,"data-active":(0,a.P)(p),"data-loading":(0,a.P)(m),__css:P,className:(0,s.cx)("chakra-button",C),...O,children:[m&&"start"===k&&(0,n.jsx)(y,{className:"chakra-button__spinner--start",label:S,placement:"start",spacing:j,children:_}),m?S||(0,n.jsx)(d.m.span,{opacity:0,children:(0,n.jsx)(b,{...T})}):(0,n.jsx)(b,{...T}),m&&"end"===k&&(0,n.jsx)(y,{className:"chakra-button__spinner--end",label:S,placement:"end",spacing:j,children:_})]})});function b(e){let{leftIcon:t,rightIcon:r,children:o,iconSpacing:i,shouldWrapChildren:a}=e;return a?(0,n.jsxs)("span",{style:{display:"contents"},children:[t&&(0,n.jsx)(f,{marginEnd:i,children:t}),o,r&&(0,n.jsx)(f,{marginStart:i,children:r})]}):(0,n.jsxs)(n.Fragment,{children:[t&&(0,n.jsx)(f,{marginEnd:i,children:t}),o,r&&(0,n.jsx)(f,{marginStart:i,children:r})]})}g.displayName="Button"},17122:function(e,t,r){"use strict";r.d(t,{W:function(){return l}});var n=r(3827),o=r(32160),i=r(235),a=r(54413),s=r(14173),c=r(58772);let l=(0,a.G)(function(e,t){let{className:r,centerContent:a,...l}=(0,o.L)(e),u=(0,s.m)("Container",e);return(0,n.jsx)(c.m.div,{ref:t,className:(0,i.cx)("chakra-container",r),...l,__css:{...u,...a&&{display:"flex",flexDirection:"column",alignItems:"center"}}})});l.displayName="Container"},70776:function(e,t,r){"use strict";r.d(t,{M:function(){return u}});var n=r(3827),o=r(12309),i=r(54413),a=r(58772);let s=(0,i.G)(function(e,t){let{templateAreas:r,gap:o,rowGap:i,columnGap:s,column:c,row:l,autoFlow:u,autoRows:d,templateRows:f,autoColumns:m,templateColumns:p,...y}=e;return(0,n.jsx)(a.m.div,{ref:t,__css:{display:"grid",gridTemplateAreas:r,gridGap:o,gridRowGap:i,gridColumnGap:s,gridAutoColumns:m,gridColumn:c,gridRow:l,gridAutoFlow:u,gridAutoRows:d,gridTemplateRows:f,gridTemplateColumns:p},...y})});s.displayName="Grid";var c=r(29583),l=r(50859);let u=(0,i.G)(function(e,t){let{columns:r,spacingX:i,spacingY:a,spacing:u,minChildWidth:d,...f}=e,m=(0,c.F)(),p=d?(0,o.XQ)(d,e=>{let t=(0,l.LP)("sizes",e,"number"==typeof e?"".concat(e,"px"):e)(m);return null===e?null:"repeat(auto-fit, minmax(".concat(t,", 1fr))")}):(0,o.XQ)(r,e=>null===e?null:"repeat(".concat(e,", minmax(0, 1fr))"));return(0,n.jsx)(s,{ref:t,gap:u,columnGap:i,rowGap:a,templateColumns:p,...f})});u.displayName="SimpleGrid"},64084:function(e,t,r){"use strict";r.d(t,{$:function(){return d}});var n=r(3827),o=r(32160),i=r(235),a=r(34686),s=r(54413),c=r(14173),l=r(58772);let u=(0,a.F4)({"0%":{transform:"rotate(0deg)"},"100%":{transform:"rotate(360deg)"}}),d=(0,s.G)((e,t)=>{let r=(0,c.m)("Spinner",e),{label:a="Loading...",thickness:s="2px",speed:d="0.45s",emptyColor:f="transparent",className:m,...p}=(0,o.L)(e),y=(0,i.cx)("chakra-spinner",m),h={display:"inline-block",borderColor:"currentColor",borderStyle:"solid",borderRadius:"99999px",borderWidth:s,borderBottomColor:f,borderLeftColor:f,animation:"".concat(u," ").concat(d," linear infinite"),...r};return(0,n.jsx)(l.m.div,{ref:t,__css:h,className:y,...p,children:a&&(0,n.jsx)(l.m.span,{srOnly:!0,children:a})})});d.displayName="Spinner"},91698:function(e,t,r){"use strict";r.d(t,{U:function(){return i}});var n=r(3827),o=r(40414);let i=(0,r(54413).G)((e,t)=>(0,n.jsx)(o.K,{align:"center",...e,direction:"row",ref:t}));i.displayName="HStack"},40414:function(e,t,r){"use strict";r.d(t,{K:function(){return l}});var n=r(3827),o=r(64090),i=r(235),a=r(58772);let s=e=>(0,n.jsx)(a.m.div,{className:"chakra-stack__item",...e,__css:{display:"inline-block",flex:"0 0 auto",minWidth:0,...e.__css}});s.displayName="StackItem";var c=r(12309);let l=(0,r(54413).G)((e,t)=>{let{isInline:r,direction:l,align:u,justify:d,spacing:f="0.5rem",wrap:m,children:p,divider:y,className:h,shouldWrapChildren:x,...g}=e,b=r?"row":null!=l?l:"column",v=(0,o.useMemo)(()=>(function(e){let{spacing:t,direction:r}=e,n={column:{my:t,mx:0,borderLeftWidth:0,borderBottomWidth:"1px"},"column-reverse":{my:t,mx:0,borderLeftWidth:0,borderBottomWidth:"1px"},row:{mx:t,my:0,borderLeftWidth:"1px",borderBottomWidth:0},"row-reverse":{mx:t,my:0,borderLeftWidth:"1px",borderBottomWidth:0}};return{"&":(0,c.XQ)(r,e=>n[e])}})({spacing:f,direction:b}),[f,b]),S=!!y,j=!x&&!S,w=(0,o.useMemo)(()=>{let e=o.Children.toArray(p).filter(e=>(0,o.isValidElement)(e));return j?e:e.map((t,r)=>{let i=void 0!==t.key?t.key:r,a=r+1===e.length,c=(0,n.jsx)(s,{children:t},i),l=x?c:t;if(!S)return l;let u=(0,o.cloneElement)(y,{__css:v});return(0,n.jsxs)(o.Fragment,{children:[l,a?null:u]},i)})},[y,v,S,j,x,p]),_=(0,i.cx)("chakra-stack",h);return(0,n.jsx)(a.m.div,{ref:t,display:"flex",alignItems:u,justifyContent:d,flexDirection:b,flexWrap:m,gap:S?void 0:f,className:_,...g,children:w})});l.displayName="Stack"},63048:function(e,t,r){"use strict";r.d(t,{g:function(){return i}});var n=r(3827),o=r(40414);let i=(0,r(54413).G)((e,t)=>(0,n.jsx)(o.K,{align:"center",...e,direction:"column",ref:t}));i.displayName="VStack"},9960:function(e,t,r){"use strict";r.d(t,{X:function(){return l}});var n=r(3827),o=r(32160),i=r(235),a=r(54413),s=r(14173),c=r(58772);let l=(0,a.G)(function(e,t){let r=(0,s.m)("Heading",e),{className:a,...l}=(0,o.L)(e);return(0,n.jsx)(c.m.h2,{ref:t,className:(0,i.cx)("chakra-heading",e.className),...l,__css:r})});l.displayName="Heading"},21419:function(e,t,r){"use strict";r.d(t,{x:function(){return u}});var n=r(3827),o=r(32160),i=r(95563),a=r(235),s=r(54413),c=r(14173),l=r(58772);let u=(0,s.G)(function(e,t){let r=(0,c.m)("Text",e),{className:s,align:u,decoration:d,casing:f,...m}=(0,o.L)(e),p=(0,i.o)({textAlign:e.align,textDecoration:e.decoration,textTransform:e.casing});return(0,n.jsx)(l.m.p,{ref:t,className:(0,a.cx)("chakra-text",e.className),...p,...m,__css:r})});u.displayName="Text"},36239:function(e,t,r){"use strict";function n(e){return e}function o(e){return e}function i(e){return{definePartsStyle:e=>e,defineMultiStyleConfig:t=>({parts:e,...t})}}r.d(t,{D:function(){return i},fj:function(){return o},k0:function(){return n}})},55451:function(e,t,r){"use strict";r.d(t,{P:function(){return n},Q:function(){return o}});let n=e=>e?"":void 0,o=e=>!!e||void 0},79859:function(e,t,r){"use strict";r.d(t,{k:function(){return o}});var n=r(64090);function o(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{name:t,strict:r=!0,hookName:o="useContext",providerName:i="Provider",errorMessage:a,defaultValue:s}=e,c=(0,n.createContext)(s);return c.displayName=t,[c.Provider,function e(){let t=(0,n.useContext)(c);if(!t&&r){var s,l;let t=Error(null!=a?a:"".concat(o," returned `undefined`. Seems you forgot to wrap component within ").concat(i));throw t.name="ContextError",null===(s=(l=Error).captureStackTrace)||void 0===s||s.call(l,t,e),t}return t},c]}},12309:function(e,t,r){"use strict";r.d(t,{XQ:function(){return o}});var n=r(72382);function o(e,t){return Array.isArray(e)?e.map(e=>null===e?null:t(e)):(0,n.Kn)(e)?Object.keys(e).reduce((r,n)=>(r[n]=t(e[n]),r),{}):null!=e?t(e):null}Object.freeze(["base","sm","md","lg","xl","2xl"])}},function(e){e.O(0,[776,2971,8069,1744],function(){return e(e.s=92758)}),_N_E=e.O()}]);