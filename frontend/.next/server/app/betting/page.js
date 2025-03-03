(()=>{var e={};e.id=8453,e.ids=[8453],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},39491:e=>{"use strict";e.exports=require("assert")},14300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},98188:e=>{"use strict";e.exports=require("module")},41808:e=>{"use strict";e.exports=require("net")},6005:e=>{"use strict";e.exports=require("node:crypto")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},85477:e=>{"use strict";e.exports=require("punycode")},12781:e=>{"use strict";e.exports=require("stream")},71576:e=>{"use strict";e.exports=require("string_decoder")},24404:e=>{"use strict";e.exports=require("tls")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},71267:e=>{"use strict";e.exports=require("worker_threads")},59796:e=>{"use strict";e.exports=require("zlib")},86810:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>a.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>l,routeModule:()=>x,tree:()=>d});var s=t(50482),o=t(69108),i=t(62563),a=t.n(i),n=t(68300),c={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>n[e]);t.d(r,c);let d=["",{children:["betting",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,33616)),"/Users/macbookpro/CascadeProjects/betua/frontend/src/app/betting/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,84323)),"/Users/macbookpro/CascadeProjects/betua/frontend/src/app/layout.tsx"],template:[()=>Promise.resolve().then(t.bind(t,38140)),"/Users/macbookpro/CascadeProjects/betua/frontend/src/app/template.tsx"],error:[()=>Promise.resolve().then(t.bind(t,24117)),"/Users/macbookpro/CascadeProjects/betua/frontend/src/app/error.tsx"],loading:[()=>Promise.resolve().then(t.bind(t,92793)),"/Users/macbookpro/CascadeProjects/betua/frontend/src/app/loading.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,48206)),"/Users/macbookpro/CascadeProjects/betua/frontend/src/app/not-found.tsx"]}],l=["/Users/macbookpro/CascadeProjects/betua/frontend/src/app/betting/page.tsx"],u="/betting/page",p={require:t,loadChunk:()=>Promise.resolve()},x=new s.AppPageRouteModule({definition:{kind:o.x.APP_PAGE,page:"/betting/page",pathname:"/betting",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},66514:(e,r,t)=>{Promise.resolve().then(t.bind(t,435))},435:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>g});var s=t(95344),o=t(90867),i=t(93737),a=t(59195),n=t(3729),c=t(131),d=t(32030),l=t(76937),u=t(15592),p=t(52435),x=t(26768);function m({match:e}){let[r,t]=(0,n.useState)(null),o=(0,c.ff)("white","gray.800"),i=(0,c.ff)("gray.200","gray.700");return s.jsx(d.x,{borderWidth:"1px",borderRadius:"lg",overflow:"hidden",p:6,bg:o,borderColor:i,_hover:{shadow:"lg"},transition:"all 0.3s",children:(0,s.jsxs)(l.g,{spacing:4,align:"stretch",children:[(0,s.jsxs)(u.U,{justify:"space-between",children:[s.jsx(p.x,{fontWeight:"bold",fontSize:"lg",children:e.homeTeam}),s.jsx(p.x,{color:"gray.500",children:"vs"}),s.jsx(p.x,{fontWeight:"bold",fontSize:"lg",children:e.awayTeam})]}),s.jsx(p.x,{color:"gray.500",fontSize:"sm",children:new Date(e.date).toLocaleDateString()}),(0,s.jsxs)(u.U,{justify:"space-between",mt:4,children:[(0,s.jsxs)(x.z,{variant:"home"===r?"solid":"outline",colorScheme:"blue",onClick:()=>t("home"),size:"sm",children:["Home (",e.homeOdds.toFixed(2),")"]}),(0,s.jsxs)(x.z,{variant:"draw"===r?"solid":"outline",colorScheme:"blue",onClick:()=>t("draw"),size:"sm",children:["Draw (",e.drawOdds.toFixed(2),")"]}),(0,s.jsxs)(x.z,{variant:"away"===r?"solid":"outline",colorScheme:"blue",onClick:()=>t("away"),size:"sm",children:["Away (",e.awayOdds.toFixed(2),")"]})]}),r&&s.jsx(x.z,{colorScheme:"green",size:"sm",mt:2,onClick:()=>{console.log("Placing bet for:",r)},children:"Place Bet"})]})})}function g(){return(0,s.jsxs)(o.W,{maxW:"container.xl",py:8,children:[s.jsx(i.X,{size:"lg",mb:6,children:"Premier League Matches"}),s.jsx(a.M,{columns:{base:1,lg:2},spacing:6,children:[{id:1,homeTeam:"Arsenal",awayTeam:"Chelsea",date:"2025-03-04",homeOdds:2.1,drawOdds:3.4,awayOdds:2.8}].map(e=>s.jsx(m,{match:e},e.id))})]})}},33616:(e,r,t)=>{"use strict";t.r(r),t.d(r,{$$typeof:()=>i,__esModule:()=>o,default:()=>a});let s=(0,t(86843).createProxy)(String.raw`/Users/macbookpro/CascadeProjects/betua/frontend/src/app/betting/page.tsx`),{__esModule:o,$$typeof:i}=s,a=s.default},76937:(e,r,t)=>{"use strict";t.d(r,{g:()=>i});var s=t(95344),o=t(88716);let i=(0,t(21491).G)((e,r)=>(0,s.jsx)(o.K,{align:"center",...e,direction:"column",ref:r}));i.displayName="VStack"}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[9385,175],()=>t(86810));module.exports=s})();