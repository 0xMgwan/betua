(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1112],{96422:function(e,t,s){Promise.resolve().then(s.bind(s,71653))},71653:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return C}});var a,i,n,l,d=s(3827),r=s(64090),c=s(81092),o=JSON.parse('{"M":[{"inputs":[{"internalType":"address","name":"_usdc","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"category","type":"string"}],"name":"addSport","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"betId","type":"uint256"}],"name":"claimBet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"marketId","type":"uint256"},{"internalType":"uint256","name":"outcome","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"placeBet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"marketId","type":"uint256"},{"internalType":"uint256","name":"winningOutcome","type":"uint256"}],"name":"settleMarket","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserBets","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"}]}'),m=s(69804),x=s(32215);(a=n||(n={}))[a.MATCH_WINNER=0]="MATCH_WINNER",a[a.OVER_UNDER=1]="OVER_UNDER",a[a.HANDICAP=2]="HANDICAP",a[a.CORRECT_SCORE=3]="CORRECT_SCORE",a[a.PLAYER_PROPS=4]="PLAYER_PROPS",a[a.FUTURES=5]="FUTURES",(i=l||(l={}))[i.SCHEDULED=0]="SCHEDULED",i[i.LIVE=1]="LIVE",i[i.FINISHED=2]="FINISHED",i[i.CANCELLED=3]="CANCELLED",i[i.POSTPONED=4]="POSTPONED";let u=o.M,p=[{id:"popular",name:"Popular"},{id:"live",name:"Live"},{id:"upcoming",name:"Upcoming"},{id:"tournaments",name:"Tournaments"}],h=[{id:"basketball",name:"Basketball",icon:"\uD83C\uDFC0"},{id:"soccer",name:"Soccer",icon:"⚽"},{id:"tennis",name:"Tennis",icon:"\uD83C\uDFBE"},{id:"hockey",name:"Hockey",icon:"\uD83C\uDFD2"},{id:"baseball",name:"Baseball",icon:"⚾"},{id:"mma",name:"MMA",icon:"\uD83E\uDD4A"},{id:"esports",name:"Esports",icon:"\uD83C\uDFAE"},{id:"rugby",name:"Rugby",icon:"\uD83C\uDFC9"}];function g(){let[e,t]=(0,r.useState)("popular"),[s,a]=(0,r.useState)("all"),[i,n]=(0,r.useState)([]),{data:l}=(0,c.do)({address:x.env.NEXT_PUBLIC_SPORTS_BETTING_ADDRESS,abi:u,functionName:"nextMatchId"});(0,r.useEffect)(()=>{(async()=>{n([{id:1,homeTeam:"Sacramento Kings",awayTeam:"Houston Rockets",startTime:Date.now()+864e5,status:0,markets:[{id:1,type:0,outcomes:[1,2],odds:{1:1750,2:2050}}]}])})()},[e,s]);let o=e=>(e/100).toFixed(2);return(0,d.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[(0,d.jsx)(m.O.Group,{children:(0,d.jsx)(m.O.List,{className:"flex space-x-1 rounded-xl bg-blue-900/20 p-1",children:p.map(e=>(0,d.jsx)(m.O,{className:e=>{let{selected:t}=e;return"w-full rounded-lg py-2.5 text-sm font-medium leading-5\n                 ".concat(t?"bg-white text-blue-700 shadow":"text-gray-600 hover:bg-white/[0.12] hover:text-blue-600")},children:e.name},e.id))})}),(0,d.jsxs)("div",{className:"mt-6 grid grid-cols-12 gap-6",children:[(0,d.jsx)("div",{className:"col-span-2",children:(0,d.jsx)("nav",{className:"space-y-1",children:h.map(e=>(0,d.jsxs)("button",{onClick:()=>a(e.id),className:"w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ".concat(s===e.id?"bg-blue-50 text-blue-700":"text-gray-600 hover:bg-gray-50"),children:[(0,d.jsx)("span",{className:"mr-3",children:e.icon}),e.name]},e.id))})}),(0,d.jsx)("div",{className:"col-span-10",children:(0,d.jsx)("div",{className:"space-y-4",children:i.map(e=>(0,d.jsx)("div",{className:"bg-white rounded-lg shadow p-4",children:(0,d.jsxs)("div",{className:"flex justify-between items-center",children:[(0,d.jsxs)("div",{className:"flex-1",children:[(0,d.jsx)("div",{className:"text-sm text-gray-500",children:new Date(e.startTime).toLocaleString()}),(0,d.jsxs)("div",{className:"mt-1 text-lg font-medium",children:[e.homeTeam," vs ",e.awayTeam]})]}),(0,d.jsx)("div",{className:"flex space-x-4",children:e.markets.map(t=>(0,d.jsx)("div",{className:"flex space-x-2",children:t.outcomes.map(s=>(0,d.jsxs)("button",{className:"px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200",children:[(0,d.jsx)("div",{className:"text-sm font-medium",children:1===s?e.homeTeam:e.awayTeam}),(0,d.jsx)("div",{className:"text-lg font-bold text-blue-600",children:o(t.odds[s])})]},s))},t.id))})]})},e.id))})})]})]})}var y=s(20073),b=s(72647),N=s(32215);let j=o.M;function v(e){var t,s,a,i;let{bets:n,onRemoveBet:l,onClearSlip:o}=e,m=(0,b.p)(),[x,u]=(0,r.useState)({}),[p,h]=(0,r.useState)("0"),[g,v]=(0,r.useState)("0");(0,r.useEffect)(()=>{f()},[x,n]);let f=()=>{let e=0,t=1;n.forEach(s=>{let a=parseFloat(x[s.marketId]||"0");a>0&&(e+=a,t*=a*s.odds)}),h(e.toFixed(2)),v(t.toFixed(2))},w=(e,t)=>{u(s=>({...s,[e]:t}))},{config:S}=(0,c.PJ)({address:N.env.NEXT_PUBLIC_SPORTS_BETTING_ADDRESS,abi:j,functionName:"placeBet",args:[null===(t=n[0])||void 0===t?void 0:t.marketId,null===(s=n[0])||void 0===s?void 0:s.outcome,(0,y.v)(x[null===(a=n[0])||void 0===a?void 0:a.marketId]||"0",6)],enabled:n.length>0&&!!x[null===(i=n[0])||void 0===i?void 0:i.marketId]}),{write:T,isLoading:k,isSuccess:C}=(0,c.GG)(S),E=async()=>{if(!T){m({title:"Error",description:"Please check your inputs and try again",status:"error",duration:5e3,isClosable:!0});return}T()};return 0===n.length?(0,d.jsx)("div",{className:"bg-white rounded-lg shadow p-4",children:(0,d.jsx)("div",{className:"text-center text-gray-500 py-8",children:"Your bet slip is empty"})}):(0,d.jsxs)("div",{className:"bg-white rounded-lg shadow",children:[(0,d.jsx)("div",{className:"p-4 border-b",children:(0,d.jsxs)("div",{className:"flex justify-between items-center",children:[(0,d.jsx)("h3",{className:"text-lg font-medium",children:"Bet Slip"}),(0,d.jsx)("button",{onClick:o,className:"text-sm text-red-600 hover:text-red-800",children:"Clear All"})]})}),(0,d.jsx)("div",{className:"divide-y",children:n.map(e=>(0,d.jsxs)("div",{className:"p-4",children:[(0,d.jsxs)("div",{className:"flex justify-between items-start mb-2",children:[(0,d.jsxs)("div",{children:[(0,d.jsxs)("div",{className:"text-sm font-medium",children:[e.homeTeam," vs ",e.awayTeam]}),(0,d.jsxs)("div",{className:"text-xs text-gray-500",children:[e.marketType," - ",1===e.outcome?e.homeTeam:e.awayTeam]})]}),(0,d.jsx)("button",{onClick:()=>l(e.marketId),className:"text-gray-400 hover:text-gray-600",children:"\xd7"})]}),(0,d.jsxs)("div",{className:"flex items-center justify-between mt-2",children:[(0,d.jsx)("div",{className:"text-sm font-medium text-blue-600",children:e.odds.toFixed(2)}),(0,d.jsx)("input",{type:"number",value:x[e.marketId]||"",onChange:t=>w(e.marketId,t.target.value),placeholder:"Stake",className:"w-24 px-2 py-1 text-right border rounded",min:"1",step:"1"})]}),x[e.marketId]&&(0,d.jsxs)("div",{className:"text-sm text-gray-500 text-right mt-1",children:["Potential win: ",(parseFloat(x[e.marketId])*e.odds||0).toFixed(2)," USDC"]})]},e.marketId))}),(0,d.jsxs)("div",{className:"p-4 bg-gray-50",children:[(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsxs)("div",{className:"flex justify-between text-sm",children:[(0,d.jsx)("span",{children:"Total Stake:"}),(0,d.jsxs)("span",{className:"font-medium",children:[p," USDC"]})]}),(0,d.jsxs)("div",{className:"flex justify-between text-sm",children:[(0,d.jsx)("span",{children:"Potential Payout:"}),(0,d.jsxs)("span",{className:"font-medium",children:[g," USDC"]})]})]}),(0,d.jsx)("button",{onClick:E,disabled:!T||k||"0"===p,className:"w-full mt-4 py-2 px-4 rounded-md text-white font-medium\n            ".concat(!T||k||"0"===p?"bg-gray-400 cursor-not-allowed":"bg-blue-600 hover:bg-blue-700"),children:k?"Placing Bet...":"Place Bet"})]}),C&&(0,d.jsx)("div",{className:"p-4 bg-green-50 text-green-800",children:"Bet placed successfully!"})]})}var f=s(41196),w=s(46136),S=s(32215);w.kL.register(w.uw,w.f$,w.od,w.jn,w.ZL,w.Dx,w.u,w.De,w.Gu);let T=o.M;function k(){let[e,t]=(0,r.useState)("7d"),[s,a]=(0,r.useState)({totalBets:0,winningBets:0,totalStaked:0,totalReturns:0,profitLoss:0}),[i,n]=(0,r.useState)([]),[l,o]=(0,r.useState)([]),[m,x]=(0,r.useState)([]),{data:u}=(0,c.do)({address:S.env.NEXT_PUBLIC_SPORTS_BETTING_ADDRESS,abi:T,functionName:"getUserBets",args:["0x"]});(0,r.useEffect)(()=>{a({totalBets:156,winningBets:87,totalStaked:2500,totalReturns:2850,profitLoss:350}),n([{name:"Basketball",bets:45,winRate:62,profitLoss:180},{name:"Soccer",bets:38,winRate:55,profitLoss:90},{name:"Tennis",bets:28,winRate:48,profitLoss:-40},{name:"Hockey",bets:25,winRate:58,profitLoss:120}]),o([0,50,-20,120,80,200,350]),x(["Mon","Tue","Wed","Thu","Fri","Sat","Sun"])},[e]);let p={labels:i.map(e=>e.name),datasets:[{label:"Win Rate (%)",data:i.map(e=>e.winRate),backgroundColor:"rgba(59, 130, 246, 0.8)"}]};return(0,d.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[(0,d.jsxs)("div",{className:"flex justify-between items-center mb-8",children:[(0,d.jsx)("h2",{className:"text-2xl font-bold",children:"Betting Analytics"}),(0,d.jsx)("div",{className:"flex space-x-2",children:["24h","7d","30d","all"].map(s=>(0,d.jsx)("button",{onClick:()=>t(s),className:"px-3 py-1 rounded ".concat(e===s?"bg-blue-600 text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200"),children:s.toUpperCase()},s))})]}),(0,d.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-5 gap-6 mb-8",children:[(0,d.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,d.jsx)("div",{className:"text-sm text-gray-500",children:"Total Bets"}),(0,d.jsx)("div",{className:"text-2xl font-bold",children:s.totalBets})]}),(0,d.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,d.jsx)("div",{className:"text-sm text-gray-500",children:"Win Rate"}),(0,d.jsxs)("div",{className:"text-2xl font-bold",children:[(s.winningBets/s.totalBets*100).toFixed(1),"%"]})]}),(0,d.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,d.jsx)("div",{className:"text-sm text-gray-500",children:"Total Staked"}),(0,d.jsxs)("div",{className:"text-2xl font-bold",children:[s.totalStaked," USDC"]})]}),(0,d.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,d.jsx)("div",{className:"text-sm text-gray-500",children:"Total Returns"}),(0,d.jsxs)("div",{className:"text-2xl font-bold",children:[s.totalReturns," USDC"]})]}),(0,d.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,d.jsx)("div",{className:"text-sm text-gray-500",children:"Profit/Loss"}),(0,d.jsxs)("div",{className:"text-2xl font-bold ".concat(s.profitLoss>=0?"text-green-600":"text-red-600"),children:[s.profitLoss>0?"+":"",s.profitLoss," USDC"]})]})]}),(0,d.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[(0,d.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,d.jsx)("h3",{className:"text-lg font-medium mb-4",children:"Profit/Loss Over Time"}),(0,d.jsx)(f.x1,{data:{labels:m,datasets:[{label:"Profit/Loss",data:l,fill:!0,borderColor:"rgb(59, 130, 246)",backgroundColor:"rgba(59, 130, 246, 0.1)",tension:.4}]},options:{responsive:!0,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}}}})]}),(0,d.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,d.jsx)("h3",{className:"text-lg font-medium mb-4",children:"Win Rate by Sport"}),(0,d.jsx)(f.$Q,{data:p,options:{responsive:!0,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,max:100}}}})]})]}),(0,d.jsxs)("div",{className:"mt-8",children:[(0,d.jsx)("h3",{className:"text-lg font-medium mb-4",children:"Performance by Sport"}),(0,d.jsx)("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:(0,d.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,d.jsx)("thead",{className:"bg-gray-50",children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Sport"}),(0,d.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Total Bets"}),(0,d.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Win Rate"}),(0,d.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Profit/Loss"})]})}),(0,d.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:i.map(e=>(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,d.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.name})}),(0,d.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,d.jsx)("div",{className:"text-sm text-gray-900",children:e.bets})}),(0,d.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,d.jsxs)("div",{className:"text-sm text-gray-900",children:[e.winRate,"%"]})}),(0,d.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,d.jsxs)("div",{className:"text-sm font-medium ".concat(e.profitLoss>=0?"text-green-600":"text-red-600"),children:[e.profitLoss>0?"+":"",e.profitLoss," USDC"]})})]},e.name))})]})})]})]})}function C(){let[e,t]=(0,r.useState)([]),[s,a]=(0,r.useState)(!1);return(0,d.jsx)("div",{className:"min-h-screen bg-gray-50",children:(0,d.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[(0,d.jsxs)("div",{className:"flex justify-between items-center mb-8",children:[(0,d.jsx)("h1",{className:"text-3xl font-bold",children:"Sports Betting"}),(0,d.jsx)("button",{onClick:()=>a(!s),className:"px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",children:s?"View Markets":"View Analytics"})]}),s?(0,d.jsx)(k,{}):(0,d.jsxs)("div",{className:"grid grid-cols-12 gap-8",children:[(0,d.jsx)("div",{className:"col-span-9",children:(0,d.jsx)(g,{})}),(0,d.jsx)("div",{className:"col-span-3",children:(0,d.jsx)("div",{className:"sticky top-8",children:(0,d.jsx)(v,{bets:e,onRemoveBet:e=>{t(t=>t.filter(t=>t.marketId!==e))},onClearSlip:()=>{t([])}})})})]})]})})}}},function(e){e.O(0,[7674,1092,6789,2098,8001,2971,8069,1744],function(){return e(e.s=96422)}),_N_E=e.O()}]);