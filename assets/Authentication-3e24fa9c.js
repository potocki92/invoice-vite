import{s as n,G as j,u,r as p,j as e,E as y,I as h,a as x,D as g,l as v,R as f,b as F,F as S,c as I}from"./index-a6bb0359.js";const b=n.div`
display: flex;
flex-direction: column;
width: 100%;
padding: 25px;
`;n.h1`
  font-size: 1.5rem;
  line-height: 1.2em;
  margin-bottom: 1rem;
  font-weight: 500;
`;n.p`
  margin-top: 1.5rem;
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #454f5b;
  & a {
    color: #008060;
    cursor: pointer;
  }
`;function w(a){return j({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"}},{tag:"path",attr:{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"}}]})(a)}const A=()=>{const a=u(),[s,i]=p.useState({email:"",password:""}),{email:o,password:l,error:r}=s,c=t=>{i({...s,[t.target.name]:t.target.value})},d=async t=>{t.preventDefault(),(await a(v({email:o,password:l}))).success||i({...s,error:"Email or Password is invalid. Please try again!"})},m=[{name:"email",type:"email",placeholder:"Email",errorMessage:"It should be a valid email address!",label:"Email",required:!0,icon:e.jsx(w,{})},{name:"password",type:"password",placeholder:"Password",label:"Password",required:!0,icon:e.jsx(f,{})}];return e.jsxs(b,{children:[r&&e.jsx(y,{children:r}),e.jsxs(h,{className:"authentication",onSubmit:t=>d(t),children:[m.map(t=>e.jsx(x,{...t,value:s[t.name],onChange:c,isForm:!0},t.id)),e.jsx(g,{type:"submit",value:"Login",children:"LogIn"})]})]})},z=()=>{const a=u(),[s,i]=p.useState({name:"",email:"",password:""}),{name:o,email:l,password:r}=s,c=t=>i({...s,[t.target.name]:t.target.value}),d=async t=>{t.preventDefault(),o&&l&&r?(a(F({name:o,email:l,password:r})),i({name:"",email:"",password:""}),setShowRegister(!1)):alert("invalid")},m=[{name:"name",type:"text",placeholder:"Name",label:"Username",required:!0,icon:e.jsx(S,{})},{name:"email",type:"email",placeholder:"Email",errorMessage:"It should be a valid email address!",label:"Email",required:!0,icon:e.jsx(w,{})},{name:"password",type:"password",placeholder:"Password",errorMessage:"Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",label:"Password",pattern:"^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",required:!0,icon:e.jsx(f,{})}];return e.jsx(b,{children:e.jsxs(h,{className:"authentication",onSubmit:t=>d(t),children:[m.map(t=>e.jsx(x,{...t,value:s[t.name],onChange:c,isForm:!0},t.id)),e.jsx(g,{type:"submit",value:"Register",children:"Create An Account"})]})})},E=n.div`
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
`,D=n.div`
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
`,k=n.div`
  position: relative;
  width: 100%;
  min-height: 420px;
  display: flex;
  justify-content: center;
  align-items: center;
`,P=n.div`
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
`;n.h1`
  font-size: 2rem;
  line-height: 1;
`;const R=({children:a})=>e.jsx(E,{children:a}),C=n.div`

`,L=n.div`
    padding-left: 5%;
    padding-right: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;    
    align-items: center;
`,$=()=>{const[a,s]=p.useState(!1),i=()=>{s(!a)};return e.jsxs(C,{children:[e.jsx(R,{children:e.jsx(D,{children:e.jsxs(k,{children:[e.jsx(P,{className:`${a?"register":""}`,onClick:i}),a?e.jsx(z,{}):e.jsx(A,{})]})})}),e.jsx(L,{children:e.jsx(I,{isInAuthentication:!0})})]})};export{$ as default};
