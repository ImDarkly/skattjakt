import{r as a,j as e,H as h,L as r,B as o,I as d}from"./index-czeVRV2T.js";import{u as x,T as j,S as m,M as g,B as w,F as p}from"./mode-toggle-QGNcIq3o.js";const N=function(){const t=x().generateCard,{card:s}=x(),[l,n]=a.useState(!1),f=s.length===25?Array.from({length:25},(c,i)=>`b${i+1}=${s[i].tag}`).join("&"):"";a.useEffect(()=>{s.length===0&&t()},[s,t]),a.useEffect(()=>{if(l){const c=setTimeout(()=>{n(!1)},500);return()=>clearTimeout(c)}return()=>{}},[l]);const u=()=>{n(!0),t()};return e.jsxs("div",{className:"relative flex min-h-screen flex-col",children:[e.jsx(h,{children:e.jsx("title",{children:"Generate • Skattjakt"})}),e.jsxs(j,{children:[e.jsx("div",{children:e.jsx(r,{to:"/generate",className:"w-full",children:e.jsx("div",{className:"w-full rounded-md p-2 hover:bg-secondary",children:e.jsx(m,{})})})}),e.jsx("div",{className:"flex w-full items-center justify-center",children:e.jsx("h1",{className:"w-full px-2 text-center text-2xl font-bold",children:e.jsx(r,{to:"https://github.com/ImDarkly/skattjakt",children:"Skattjakt"})})}),e.jsx("div",{children:e.jsx(g,{})})]}),e.jsx("div",{className:"z-0 flex h-full w-full flex-1 flex-col items-center justify-center px-4",children:e.jsxs("div",{className:"flex w-full max-w-xl flex-col items-center justify-center gap-6",children:[e.jsx("div",{className:"flex h-12 w-full flex-row items-center",children:e.jsx("div",{className:"flex w-full flex-row items-center justify-center",children:e.jsx("h1",{className:"text-2xl",children:"Bingo card generator"})})}),e.jsx(w,{disabled:!0}),e.jsxs("div",{className:"flex h-12 w-full flex-row items-center justify-end gap-2",children:[e.jsx("div",{className:"w-full",children:e.jsx(r,{className:"w-full",to:`/card?${f}`,children:e.jsxs(o,{className:"w-full",variant:"secondary",children:[e.jsx(d,{width:24,icon:"heroicons:arrow-top-right-on-square-16-solid"}),"Open"]})})}),e.jsx("div",{className:"w-full",children:e.jsxs(o,{className:"w-full",onClick:u,children:[e.jsx(d,{className:`${l?"animate-spin":""} text-2xl`,icon:"heroicons:arrow-path-16-solid"}),"Generate"]})})]})]})}),e.jsx(p,{})]})},S=N;export{S as default};
