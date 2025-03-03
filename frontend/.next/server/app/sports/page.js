(()=>{var e={};e.id=1112,e.ids=[1112],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},39491:e=>{"use strict";e.exports=require("assert")},14300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},98188:e=>{"use strict";e.exports=require("module")},41808:e=>{"use strict";e.exports=require("net")},6005:e=>{"use strict";e.exports=require("node:crypto")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},85477:e=>{"use strict";e.exports=require("punycode")},12781:e=>{"use strict";e.exports=require("stream")},71576:e=>{"use strict";e.exports=require("string_decoder")},24404:e=>{"use strict";e.exports=require("tls")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},71267:e=>{"use strict";e.exports=require("worker_threads")},59796:e=>{"use strict";e.exports=require("zlib")},16913:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>n.a,__next_app__:()=>x,originalPathname:()=>m,pages:()=>c,routeModule:()=>u,tree:()=>o});var a=s(50482),r=s(69108),i=s(62563),n=s.n(i),l=s(68300),d={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>l[e]);s.d(t,d);let o=["",{children:["sports",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,49967)),"/Users/macbookpro/CascadeProjects/betua/frontend/src/app/sports/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,84323)),"/Users/macbookpro/CascadeProjects/betua/frontend/src/app/layout.tsx"],template:[()=>Promise.resolve().then(s.bind(s,38140)),"/Users/macbookpro/CascadeProjects/betua/frontend/src/app/template.tsx"],error:[()=>Promise.resolve().then(s.bind(s,24117)),"/Users/macbookpro/CascadeProjects/betua/frontend/src/app/error.tsx"],loading:[()=>Promise.resolve().then(s.bind(s,92793)),"/Users/macbookpro/CascadeProjects/betua/frontend/src/app/loading.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,48206)),"/Users/macbookpro/CascadeProjects/betua/frontend/src/app/not-found.tsx"]}],c=["/Users/macbookpro/CascadeProjects/betua/frontend/src/app/sports/page.tsx"],m="/sports/page",x={require:s,loadChunk:()=>Promise.resolve()},u=new a.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/sports/page",pathname:"/sports",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:o}})},24871:(e,t,s)=>{Promise.resolve().then(s.bind(s,15477))},15477:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>v});var a,r,i=s(95344),n=s(3729),l=s(89926);let d=JSON.parse('{"M":[{"inputs":[{"internalType":"address","name":"_usdc","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"category","type":"string"}],"name":"addSport","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"betId","type":"uint256"}],"name":"claimBet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"marketId","type":"uint256"},{"internalType":"uint256","name":"outcome","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"placeBet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"marketId","type":"uint256"},{"internalType":"uint256","name":"winningOutcome","type":"uint256"}],"name":"settleMarket","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserBets","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"}]}');var o=s(28123);(function(e){e[e.MATCH_WINNER=0]="MATCH_WINNER",e[e.OVER_UNDER=1]="OVER_UNDER",e[e.HANDICAP=2]="HANDICAP",e[e.CORRECT_SCORE=3]="CORRECT_SCORE",e[e.PLAYER_PROPS=4]="PLAYER_PROPS",e[e.FUTURES=5]="FUTURES"})(a||(a={})),function(e){e[e.SCHEDULED=0]="SCHEDULED",e[e.LIVE=1]="LIVE",e[e.FINISHED=2]="FINISHED",e[e.CANCELLED=3]="CANCELLED",e[e.POSTPONED=4]="POSTPONED"}(r||(r={}));let c=d.M,m=[{id:"popular",name:"Popular"},{id:"live",name:"Live"},{id:"upcoming",name:"Upcoming"},{id:"tournaments",name:"Tournaments"}],x=[{id:"basketball",name:"Basketball",icon:"\uD83C\uDFC0"},{id:"soccer",name:"Soccer",icon:"⚽"},{id:"tennis",name:"Tennis",icon:"\uD83C\uDFBE"},{id:"hockey",name:"Hockey",icon:"\uD83C\uDFD2"},{id:"baseball",name:"Baseball",icon:"⚾"},{id:"mma",name:"MMA",icon:"\uD83E\uDD4A"},{id:"esports",name:"Esports",icon:"\uD83C\uDFAE"},{id:"rugby",name:"Rugby",icon:"\uD83C\uDFC9"}];function u(){let[e,t]=(0,n.useState)("popular"),[s,a]=(0,n.useState)("all"),[r,d]=(0,n.useState)([]),{data:u}=(0,l.do)({address:"YOUR_DEPLOYED_CONTRACT_ADDRESS",abi:c,functionName:"nextMatchId"});(0,n.useEffect)(()=>{(async()=>{d([{id:1,homeTeam:"Sacramento Kings",awayTeam:"Houston Rockets",startTime:Date.now()+864e5,status:0,markets:[{id:1,type:0,outcomes:[1,2],odds:{1:1750,2:2050}}]}])})()},[e,s]);let p=e=>(e/100).toFixed(2);return(0,i.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[i.jsx(o.O.Group,{children:i.jsx(o.O.List,{className:"flex space-x-1 rounded-xl bg-blue-900/20 p-1",children:m.map(e=>i.jsx(o.O,{className:({selected:e})=>`w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${e?"bg-white text-blue-700 shadow":"text-gray-600 hover:bg-white/[0.12] hover:text-blue-600"}`,children:e.name},e.id))})}),(0,i.jsxs)("div",{className:"mt-6 grid grid-cols-12 gap-6",children:[i.jsx("div",{className:"col-span-2",children:i.jsx("nav",{className:"space-y-1",children:x.map(e=>(0,i.jsxs)("button",{onClick:()=>a(e.id),className:`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${s===e.id?"bg-blue-50 text-blue-700":"text-gray-600 hover:bg-gray-50"}`,children:[i.jsx("span",{className:"mr-3",children:e.icon}),e.name]},e.id))})}),i.jsx("div",{className:"col-span-10",children:i.jsx("div",{className:"space-y-4",children:r.map(e=>i.jsx("div",{className:"bg-white rounded-lg shadow p-4",children:(0,i.jsxs)("div",{className:"flex justify-between items-center",children:[(0,i.jsxs)("div",{className:"flex-1",children:[i.jsx("div",{className:"text-sm text-gray-500",children:new Date(e.startTime).toLocaleString()}),(0,i.jsxs)("div",{className:"mt-1 text-lg font-medium",children:[e.homeTeam," vs ",e.awayTeam]})]}),i.jsx("div",{className:"flex space-x-4",children:e.markets.map(t=>i.jsx("div",{className:"flex space-x-2",children:t.outcomes.map(s=>(0,i.jsxs)("button",{className:"px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200",children:[i.jsx("div",{className:"text-sm font-medium",children:1===s?e.homeTeam:e.awayTeam}),i.jsx("div",{className:"text-lg font-bold text-blue-600",children:p(t.odds[s])})]},s))},t.id))})]})},e.id))})})]})]})}var p=s(9977),h=s(68146);let g=d.M;function b({bets:e,onRemoveBet:t,onClearSlip:s}){let a=(0,h.p)(),[r,d]=(0,n.useState)({}),[o,c]=(0,n.useState)("0"),[m,x]=(0,n.useState)("0");(0,n.useEffect)(()=>{u()},[r,e]);let u=()=>{let t=0,s=1;e.forEach(e=>{let a=parseFloat(r[e.marketId]||"0");a>0&&(t+=a,s*=a*e.odds)}),c(t.toFixed(2)),x(s.toFixed(2))},b=(e,t)=>{d(s=>({...s,[e]:t}))},{config:y}=(0,l.PJ)({address:"YOUR_DEPLOYED_CONTRACT_ADDRESS",abi:g,functionName:"placeBet",args:[e[0]?.marketId,e[0]?.outcome,(0,p.v)(r[e[0]?.marketId]||"0",6)],enabled:e.length>0&&!!r[e[0]?.marketId]}),{write:j,isLoading:f,isSuccess:N}=(0,l.GG)(y),v=async()=>{if(!j){a({title:"Error",description:"Please check your inputs and try again",status:"error",duration:5e3,isClosable:!0});return}j()};return 0===e.length?i.jsx("div",{className:"bg-white rounded-lg shadow p-4",children:i.jsx("div",{className:"text-center text-gray-500 py-8",children:"Your bet slip is empty"})}):(0,i.jsxs)("div",{className:"bg-white rounded-lg shadow",children:[i.jsx("div",{className:"p-4 border-b",children:(0,i.jsxs)("div",{className:"flex justify-between items-center",children:[i.jsx("h3",{className:"text-lg font-medium",children:"Bet Slip"}),i.jsx("button",{onClick:s,className:"text-sm text-red-600 hover:text-red-800",children:"Clear All"})]})}),i.jsx("div",{className:"divide-y",children:e.map(e=>(0,i.jsxs)("div",{className:"p-4",children:[(0,i.jsxs)("div",{className:"flex justify-between items-start mb-2",children:[(0,i.jsxs)("div",{children:[(0,i.jsxs)("div",{className:"text-sm font-medium",children:[e.homeTeam," vs ",e.awayTeam]}),(0,i.jsxs)("div",{className:"text-xs text-gray-500",children:[e.marketType," - ",1===e.outcome?e.homeTeam:e.awayTeam]})]}),i.jsx("button",{onClick:()=>t(e.marketId),className:"text-gray-400 hover:text-gray-600",children:"\xd7"})]}),(0,i.jsxs)("div",{className:"flex items-center justify-between mt-2",children:[i.jsx("div",{className:"text-sm font-medium text-blue-600",children:e.odds.toFixed(2)}),i.jsx("input",{type:"number",value:r[e.marketId]||"",onChange:t=>b(e.marketId,t.target.value),placeholder:"Stake",className:"w-24 px-2 py-1 text-right border rounded",min:"1",step:"1"})]}),r[e.marketId]&&(0,i.jsxs)("div",{className:"text-sm text-gray-500 text-right mt-1",children:["Potential win: ",(parseFloat(r[e.marketId])*e.odds||0).toFixed(2)," USDC"]})]},e.marketId))}),(0,i.jsxs)("div",{className:"p-4 bg-gray-50",children:[(0,i.jsxs)("div",{className:"space-y-2",children:[(0,i.jsxs)("div",{className:"flex justify-between text-sm",children:[i.jsx("span",{children:"Total Stake:"}),(0,i.jsxs)("span",{className:"font-medium",children:[o," USDC"]})]}),(0,i.jsxs)("div",{className:"flex justify-between text-sm",children:[i.jsx("span",{children:"Potential Payout:"}),(0,i.jsxs)("span",{className:"font-medium",children:[m," USDC"]})]})]}),i.jsx("button",{onClick:v,disabled:!j||f||"0"===o,className:`w-full mt-4 py-2 px-4 rounded-md text-white font-medium
            ${!j||f||"0"===o?"bg-gray-400 cursor-not-allowed":"bg-blue-600 hover:bg-blue-700"}`,children:f?"Placing Bet...":"Place Bet"})]}),N&&i.jsx("div",{className:"p-4 bg-green-50 text-green-800",children:"Bet placed successfully!"})]})}var y=s(18816),j=s(92465);j.kL.register(j.uw,j.f$,j.od,j.jn,j.ZL,j.Dx,j.u,j.De,j.Gu);let f=d.M;function N(){let[e,t]=(0,n.useState)("7d"),[s,a]=(0,n.useState)({totalBets:0,winningBets:0,totalStaked:0,totalReturns:0,profitLoss:0}),[r,d]=(0,n.useState)([]),[o,c]=(0,n.useState)([]),[m,x]=(0,n.useState)([]),{data:u}=(0,l.do)({address:"YOUR_DEPLOYED_CONTRACT_ADDRESS",abi:f,functionName:"getUserBets",args:["0x"]});(0,n.useEffect)(()=>{a({totalBets:156,winningBets:87,totalStaked:2500,totalReturns:2850,profitLoss:350}),d([{name:"Basketball",bets:45,winRate:62,profitLoss:180},{name:"Soccer",bets:38,winRate:55,profitLoss:90},{name:"Tennis",bets:28,winRate:48,profitLoss:-40},{name:"Hockey",bets:25,winRate:58,profitLoss:120}]),c([0,50,-20,120,80,200,350]),x(["Mon","Tue","Wed","Thu","Fri","Sat","Sun"])},[e]);let p={labels:r.map(e=>e.name),datasets:[{label:"Win Rate (%)",data:r.map(e=>e.winRate),backgroundColor:"rgba(59, 130, 246, 0.8)"}]};return(0,i.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[(0,i.jsxs)("div",{className:"flex justify-between items-center mb-8",children:[i.jsx("h2",{className:"text-2xl font-bold",children:"Betting Analytics"}),i.jsx("div",{className:"flex space-x-2",children:["24h","7d","30d","all"].map(s=>i.jsx("button",{onClick:()=>t(s),className:`px-3 py-1 rounded ${e===s?"bg-blue-600 text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200"}`,children:s.toUpperCase()},s))})]}),(0,i.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-5 gap-6 mb-8",children:[(0,i.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[i.jsx("div",{className:"text-sm text-gray-500",children:"Total Bets"}),i.jsx("div",{className:"text-2xl font-bold",children:s.totalBets})]}),(0,i.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[i.jsx("div",{className:"text-sm text-gray-500",children:"Win Rate"}),(0,i.jsxs)("div",{className:"text-2xl font-bold",children:[(s.winningBets/s.totalBets*100).toFixed(1),"%"]})]}),(0,i.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[i.jsx("div",{className:"text-sm text-gray-500",children:"Total Staked"}),(0,i.jsxs)("div",{className:"text-2xl font-bold",children:[s.totalStaked," USDC"]})]}),(0,i.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[i.jsx("div",{className:"text-sm text-gray-500",children:"Total Returns"}),(0,i.jsxs)("div",{className:"text-2xl font-bold",children:[s.totalReturns," USDC"]})]}),(0,i.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[i.jsx("div",{className:"text-sm text-gray-500",children:"Profit/Loss"}),(0,i.jsxs)("div",{className:`text-2xl font-bold ${s.profitLoss>=0?"text-green-600":"text-red-600"}`,children:[s.profitLoss>0?"+":"",s.profitLoss," USDC"]})]})]}),(0,i.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[(0,i.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[i.jsx("h3",{className:"text-lg font-medium mb-4",children:"Profit/Loss Over Time"}),i.jsx(y.x1,{data:{labels:m,datasets:[{label:"Profit/Loss",data:o,fill:!0,borderColor:"rgb(59, 130, 246)",backgroundColor:"rgba(59, 130, 246, 0.1)",tension:.4}]},options:{responsive:!0,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}}}})]}),(0,i.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[i.jsx("h3",{className:"text-lg font-medium mb-4",children:"Win Rate by Sport"}),i.jsx(y.$Q,{data:p,options:{responsive:!0,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,max:100}}}})]})]}),(0,i.jsxs)("div",{className:"mt-8",children:[i.jsx("h3",{className:"text-lg font-medium mb-4",children:"Performance by Sport"}),i.jsx("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:(0,i.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[i.jsx("thead",{className:"bg-gray-50",children:(0,i.jsxs)("tr",{children:[i.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Sport"}),i.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Total Bets"}),i.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Win Rate"}),i.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Profit/Loss"})]})}),i.jsx("tbody",{className:"bg-white divide-y divide-gray-200",children:r.map(e=>(0,i.jsxs)("tr",{children:[i.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:i.jsx("div",{className:"text-sm font-medium text-gray-900",children:e.name})}),i.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:i.jsx("div",{className:"text-sm text-gray-900",children:e.bets})}),i.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,i.jsxs)("div",{className:"text-sm text-gray-900",children:[e.winRate,"%"]})}),i.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,i.jsxs)("div",{className:`text-sm font-medium ${e.profitLoss>=0?"text-green-600":"text-red-600"}`,children:[e.profitLoss>0?"+":"",e.profitLoss," USDC"]})})]},e.name))})]})})]})]})}function v(){let[e,t]=(0,n.useState)([]),[s,a]=(0,n.useState)(!1);return i.jsx("div",{className:"min-h-screen bg-gray-50",children:(0,i.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[(0,i.jsxs)("div",{className:"flex justify-between items-center mb-8",children:[i.jsx("h1",{className:"text-3xl font-bold",children:"Sports Betting"}),i.jsx("button",{onClick:()=>a(!s),className:"px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",children:s?"View Markets":"View Analytics"})]}),s?i.jsx(N,{}):(0,i.jsxs)("div",{className:"grid grid-cols-12 gap-8",children:[i.jsx("div",{className:"col-span-9",children:i.jsx(u,{})}),i.jsx("div",{className:"col-span-3",children:i.jsx("div",{className:"sticky top-8",children:i.jsx(b,{bets:e,onRemoveBet:e=>{t(t=>t.filter(t=>t.marketId!==e))},onClearSlip:()=>{t([])}})})})]})]})})}},49967:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>i,__esModule:()=>r,default:()=>n});let a=(0,s(86843).createProxy)(String.raw`/Users/macbookpro/CascadeProjects/betua/frontend/src/app/sports/page.tsx`),{__esModule:r,$$typeof:i}=a,n=a.default}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),a=t.X(0,[9385,2728,175],()=>s(16913));module.exports=a})();