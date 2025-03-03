(()=>{var e={};e.id=1757,e.ids=[1757],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},39491:e=>{"use strict";e.exports=require("assert")},14300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},98188:e=>{"use strict";e.exports=require("module")},41808:e=>{"use strict";e.exports=require("net")},6005:e=>{"use strict";e.exports=require("node:crypto")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},85477:e=>{"use strict";e.exports=require("punycode")},12781:e=>{"use strict";e.exports=require("stream")},71576:e=>{"use strict";e.exports=require("string_decoder")},24404:e=>{"use strict";e.exports=require("tls")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},71267:e=>{"use strict";e.exports=require("worker_threads")},59796:e=>{"use strict";e.exports=require("zlib")},2067:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>d,routeModule:()=>x,tree:()=>l});var s=r(50482),a=r(69108),n=r(62563),i=r.n(n),o=r(68300),c={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>o[e]);r.d(t,c);let l=["",{children:["markets",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,4833)),"/Users/macbookpro/CascadeProjects/betua/frontend/src/app/markets/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,21342)),"/Users/macbookpro/CascadeProjects/betua/frontend/src/app/layout.tsx"],template:[()=>Promise.resolve().then(r.bind(r,38140)),"/Users/macbookpro/CascadeProjects/betua/frontend/src/app/template.tsx"],error:[()=>Promise.resolve().then(r.bind(r,24117)),"/Users/macbookpro/CascadeProjects/betua/frontend/src/app/error.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,92793)),"/Users/macbookpro/CascadeProjects/betua/frontend/src/app/loading.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,48206)),"/Users/macbookpro/CascadeProjects/betua/frontend/src/app/not-found.tsx"]}],d=["/Users/macbookpro/CascadeProjects/betua/frontend/src/app/markets/page.tsx"],u="/markets/page",p={require:r,loadChunk:()=>Promise.resolve()},x=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/markets/page",pathname:"/markets",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},64412:(e,t,r)=>{Promise.resolve().then(r.bind(r,47869))},47869:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u});var s,a=r(95344),n=r(3729),i=r(89926),o=r(35078),c=r(86287),l=r(56506);function d(){let[e,t]=(0,n.useState)([]),[r,s]=(0,n.useState)(!0),{data:d}=(0,i.do)({address:"0x0000000000000000000000000000000000000000",abi:c,functionName:"nextMarketId"}),{data:u,refetch:p}=(0,i.do)({address:"0x0000000000000000000000000000000000000000",abi:c,functionName:"getMarketInfo",args:[0]});(0,n.useEffect)(()=>{(async()=>{if(!d)return;let e=[];for(let t=1;t<Number(d);t++)e.push(p({args:[t]}));t((await Promise.all(e)).map((e,t)=>({id:t+1,...e.data})).filter(e=>"0x0000000000000000000000000000000000000000"!==e.creator)),s(!1)})()},[d]);let x=e=>{switch(e){case 0:return"Yes/No";case 1:return"Multiple Choice";case 2:return"Numeric Range";case 3:return"Oracle Feed";default:return"Unknown"}},m=e=>new Date(1e3*e).toLocaleString();return r?a.jsx("div",{className:"flex justify-center items-center min-h-[400px]",children:a.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"})}):(0,a.jsxs)("div",{className:"max-w-7xl mx-auto p-6",children:[(0,a.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[a.jsx("h2",{className:"text-2xl font-bold",children:"Prediction Markets"}),a.jsx(l.default,{href:"/markets/create",className:"bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700",children:"Create Market"})]}),a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:e.map(e=>a.jsx(l.default,{href:`/markets/${e.id}`,className:"block",children:(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow",children:[(0,a.jsxs)("div",{className:"flex justify-between items-start mb-4",children:[a.jsx("span",{className:`px-2 py-1 text-xs rounded-full ${e.settled?"bg-gray-100 text-gray-800":"bg-green-100 text-green-800"}`,children:e.settled?"Settled":"Active"}),a.jsx("span",{className:"text-sm text-gray-500",children:x(e.marketType)})]}),a.jsx("h3",{className:"text-lg font-semibold mb-2 line-clamp-2",children:e.question}),a.jsx("p",{className:"text-gray-600 text-sm mb-4 line-clamp-3",children:e.description}),(0,a.jsxs)("div",{className:"space-y-2 text-sm text-gray-500",children:[(0,a.jsxs)("div",{className:"flex justify-between",children:[a.jsx("span",{children:"Total Liquidity:"}),(0,a.jsxs)("span",{className:"font-medium",children:[(0,o.b)(e.totalLiquidity,6)," USDC"]})]}),(0,a.jsxs)("div",{className:"flex justify-between",children:[a.jsx("span",{children:"Start:"}),a.jsx("span",{children:m(e.startTime)})]}),(0,a.jsxs)("div",{className:"flex justify-between",children:[a.jsx("span",{children:"End:"}),a.jsx("span",{children:m(e.endTime)})]})]})]})},e.id))}),0===e.length&&(0,a.jsxs)("div",{className:"text-center py-12",children:[a.jsx("h3",{className:"text-lg font-medium text-gray-900",children:"No markets found"}),a.jsx("p",{className:"mt-2 text-sm text-gray-500",children:"Be the first to create a prediction market!"})]})]})}function u(){return a.jsx("div",{className:"min-h-screen bg-gray-50",children:a.jsx(d,{})})}!function(e){e[e.BINARY=0]="BINARY",e[e.MULTIPLE_CHOICE=1]="MULTIPLE_CHOICE",e[e.NUMERIC_RANGE=2]="NUMERIC_RANGE",e[e.ORACLE_FEED=3]="ORACLE_FEED"}(s||(s={}))},4833:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>n,__esModule:()=>a,default:()=>i});let s=(0,r(86843).createProxy)(String.raw`/Users/macbookpro/CascadeProjects/betua/frontend/src/app/markets/page.tsx`),{__esModule:a,$$typeof:n}=s,i=s.default},86287:e=>{"use strict";e.exports=JSON.parse('{"abi":[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"question","type":"string"},{"internalType":"uint256","name":"endTime","type":"uint256"}],"name":"createMarket","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"marketId","type":"uint256"}],"name":"getMarket","outputs":[{"components":[{"internalType":"address","name":"creator","type":"address"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"resolved","type":"bool"}],"internalType":"struct P2PMarketV2.Market","name":"","type":"tuple"}],"stateMutability":"view","type":"function"}]}')}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[9393,785],()=>r(2067));module.exports=s})();