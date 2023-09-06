import{s as r,v as d,G as F,j as e,R as I,F as E,u as x,r as m,E as b,I as w,a as y,D as j,l as A,b as L,c as S,d as z,e as R,h as f,f as D}from"./index-5664856b.js";const v=r.div`
display: flex;
flex-direction: column;
width: 100%;
padding: 25px;
`;r.h1`
  font-size: 1.5rem;
  line-height: 1.2em;
  margin-bottom: 1rem;
  font-weight: 500;
`;r.p`
  margin-top: 1.5rem;
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #454f5b;
  & a {
    color: #008060;
    cursor: pointer;
  }
`;const M=[{id:d(),name:"email",type:"email",errorMessage:"It should be a valid email address!",label:"Email",required:!0,icon:"MdEmail"},{id:d(),name:"password",type:"password",label:"Password",required:!0,icon:"RiLockPasswordFill"}];function P(t){return F({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"}},{tag:"path",attr:{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"}}]})(t)}const k=t=>{switch(t){case"FaUserAlt":return e.jsx(E,{});case"MdEmail":return e.jsx(P,{});case"RiLockPasswordFill":return e.jsx(I,{});default:return null}},C=()=>{const t=x(),[s,i]=m.useState({email:"",password:""}),{email:o,password:c,error:l}=s,u=n=>{i({...s,[n.target.name]:n.target.value})},p=async n=>{n.preventDefault(),(await t(A({email:o,password:c}))).success||i({...s,error:"Email or Password is invalid. Please try again!"})};return e.jsxs(v,{children:[l&&e.jsx(b,{children:l}),e.jsxs(w,{className:"authentication",onSubmit:n=>p(n),children:[M.map(n=>e.jsx(y,{...n,value:s[n.name],onChange:u,isForm:!0,icon:k(n.icon),isInAuthentication:!0},n.id)),e.jsx(j,{type:"submit",value:"Login",children:"LogIn"})]})]})},$=[{id:d(),name:"name",type:"text",label:"Username",required:!0,icon:"FaUserAlt"},{id:d(),name:"email",type:"email",errorMessage:"It should be a valid email address!",label:"Email",required:!0,icon:"MdEmail"},{id:d(),name:"password",type:"password",errorMessage:"Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",label:"Password",pattern:"^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",required:!0,icon:"RiLockPasswordFill"}],q=({setShowRegister:t})=>{const s=x(),i=L(S),[o,c]=m.useState({name:"",email:"",password:"",error:""}),{name:l,email:u,password:p}=o,n=a=>c({...o,[a.target.name]:a.target.value}),h=async a=>{a.preventDefault();const g=await s(z({name:l,email:u,password:p}));g.payload.success?t(!1):(console.log(g.payload),c({...o,error:"An error occurred. Please try again."}))};return e.jsxs(v,{children:[i&&e.jsx(b,{children:i}),e.jsxs(w,{className:"authentication",onSubmit:a=>h(a),children:[$.map(a=>e.jsx(y,{...a,value:o[a.name],onChange:n,isForm:!0,icon:k(a.icon),isInAuthentication:!0},a.id)),e.jsx(j,{type:"submit",value:"Register",children:"Create An Account"})]})]})},B=r.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15rem;
  padding: 0 20px;
  @media (min-width: 1025px) {
    justify-content: center;
    align-items: center;
  }
`,U=r.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  max-height: 40rem;
  background: #fff;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 320px;
  min-width: 200px;
  @media screen and (min-width: 600px) {
    max-width: 480px;
  }
  @media screen and (min-width: 1024px) {
    margin-left: auto;
    margin-right: auto;
  }
`,W=r.div`
  position: relative;
  width: 100%;
  min-height: 625px;
  display: flex;
  justify-content: center;
  align-items: center;
`,H=r.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media screen and (min-width: 600px) {
    font-size: 18px;
  }

  &::after,
  &::before {
    position: absolute;
    top: 0;
    width: 50%;
    height: 50px;
    content: "";
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &::after {
    left: 0;
    content: "Sign up";
    box-shadow:inset -16px -6px 16px -15px rgba(0,0,0,0.2);
    background: #f9fbfb;
  }
  
  &::before {
    right: 0;
    content: "Log in";
  }

  &.register {

    &:after {
      box-shadow: none;
      background: #fff;
    }
    &::before {
      box-shadow: inset 16px -6px 16px -15px rgba(0,0,0,0.2);
      background: #f9fbfb;
    }
  }
`;r.h1`
  font-size: 2rem;
  line-height: 1;
`;const N=({children:t})=>e.jsx(B,{children:t}),G=r.div`

`,V=r.div`
    padding-left: 5%;
    padding-right: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;    
    align-items: center;
`,J=()=>{const t=R(),[s,i]=m.useState(!1);m.useEffect(()=>{t.pathname===`${f}/signup`?i(!0):t.pathname===`${f}/login`&&i(!1)},[t.pathname]);const o=()=>{i(!s)},c=l=>{console.log("Encoded JWT ID token: "+l.credentials)};return m.useEffect(()=>{google.accounts.id.initialize({client_id:"815039792408-0a4voqplfkk3kkb1adobf7ocudbo5r01.apps.googleusercontent.com",callback:c}),google.accounts.id.renderButton(document.getElementById("signInDiv"),{theme:"outline",size:"large"})},[]),e.jsxs(G,{children:[e.jsx(N,{children:e.jsx(U,{children:e.jsxs(W,{children:[e.jsx(H,{className:`${s?"register":""}`,onClick:o}),s?e.jsx(q,{setShowRegister:i}):e.jsx(C,{})]})})}),e.jsx(V,{children:e.jsx(D,{})})]})};export{J as default};
