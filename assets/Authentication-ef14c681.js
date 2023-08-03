import{s,a as f,r as g,j as e,I as w,b as h,c as p,d as a,e as x,D as j,l as k,f as N,g as C}from"./index-2a62d041.js";const b=s.div`
display: flex;
flex-direction: column;
width: 100%;
`,y=s.h1`
  font-size: 1.5rem;
  line-height: 1.2em;
  margin-bottom: 1rem;
  font-weight: 500;
`,v=s.p`
  margin-top: 1.5rem;
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #454f5b;
  & a {
    color: #008060;
    cursor: pointer;
  }
`,L=({setShowRegister:r})=>{const m=f(),[t,u]=g.useState({email:"",password:""}),{email:o,password:c}=t,l=n=>u({...t,[n.target.name]:n.target.value}),d=async n=>{n.preventDefault(),m(k({email:o,password:c}))};return e.jsxs(b,{children:[e.jsx(y,{children:"Login"}),e.jsxs(w,{className:"authentication",onSubmit:n=>d(n),children:[e.jsxs(h,{children:[e.jsx(p,{className:a(t.email),children:"Email"}),e.jsx(x,{className:a(t.email)?"authentication floating":"authentication",type:"email",placeholder:"Email",name:"email",value:o,onChange:n=>l(n),required:!0})]}),e.jsxs(h,{children:[e.jsx(p,{className:a(t.password),children:"Password"}),e.jsx(x,{className:a(t.password)?"authentication floating":"authentication",type:"password",placeholder:"Password",name:"password",value:c,onChange:n=>l(n),minLength:"6"})]}),e.jsx(j,{style:{marginLeft:"0"},type:"submit",value:"Login",children:"Login"})]}),e.jsxs(v,{children:["Don't have an account?"," ",e.jsx("a",{onClick:()=>r(!0),children:"Register"})]})]})};const I=({setShowRegister:r})=>{const m=f(),[t,u]=g.useState({name:"",email:"",password:""}),{name:o,email:c,password:l}=t,d=i=>u({...t,[i.target.name]:i.target.value}),n=async i=>{i.preventDefault(),o&&c&&l?(m(N({name:o,email:c,password:l})),u({name:"",email:"",password:""}),r(!1)):alert("invalid")};return e.jsxs(b,{children:[e.jsx(y,{children:"Register"}),e.jsxs(w,{className:"authentication",onSubmit:i=>n(i),children:[e.jsxs(h,{children:[e.jsx(p,{className:a(t.name),children:"Username"}),e.jsx(x,{className:a(t.name)?"authentication floating":"authentication",type:"text",name:"name",value:o,placeholder:"Enter your username",onChange:i=>d(i),required:!0})]}),e.jsxs(h,{children:[e.jsx(p,{className:a(t.email),children:"Email"}),e.jsx(x,{className:a(t.email)?"authentication floating":"authentication",type:"email",name:"email",value:c,placeholder:"Enter your email",onChange:i=>d(i),required:!0})]}),e.jsxs(h,{children:[e.jsx(p,{className:a(t.password),children:"Password"}),e.jsx(x,{className:a(t.password)?"authentication floating":"authentication",type:"password",name:"password",value:l,placeholder:"Enter you password",onChange:i=>d(i),minLength:"6"})]}),e.jsx(j,{style:{marginLeft:"0"},type:"submit",value:"Register",children:"Register"})]}),e.jsxs(v,{children:["Already have an account?"," ",e.jsx("a",{onClick:()=>r(!1),children:"Login"})]})]})},S=s.div`
  background: linear-gradient(153.13deg, #c7edec 10.04%, #eefab3 91.46%),
    #e5fbba;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 15rem;
  @media (min-width: 1025px) {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  @media (min-width: 500px) {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
`,D=s.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 2.5rem;
  background-color: #fff;
  @media screen and (min-width: 1024px) {
    margin-left: 10vw;
    margin-right: 10vw;
    border-radius: 8px;
    max-width: 34rem;
    max-height: 40rem;
    -webkit-box-shadow: 6px 12px 60px rgba(0, 0, 0, 0.2);
    box-shadow: 6px 12px 60px rgba(0, 0, 0, 0.2);
  }
  @media (min-width: 500px) {
    width: 100%;
  }
`,F=s.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1025px) {
  }
`,R=s.div`
  margin-bottom: 5.5rem;
  position: absolute;
  top: 0;
  left: 0;
`,A=s.h1`
  width: 7.3125rem;
  font-size: 2rem;
  line-height: 1;
`,E=({children:r})=>e.jsx(S,{children:r}),q=s.div`

`,z=s.div`
    padding-left: 5%;
    padding-right: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;    
    align-items: center;
`,T=({setLoginUser:r})=>{const[m,t]=g.useState(!1);return e.jsxs(q,{children:[e.jsx("div",{className:"custom-shape-divider-bottom-1686686263",children:e.jsx("svg",{"data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1200 120",preserveAspectRatio:"none",children:e.jsx("path",{d:"M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",className:"shape-fill"})})}),e.jsx(E,{children:e.jsx(D,{children:e.jsxs(F,{children:[e.jsx(R,{children:e.jsx(A,{children:"Invoice"})}),m?e.jsx(I,{setShowRegister:t,setLoginUser:r}):e.jsx(L,{setShowRegister:t,setLoginUser:r})]})})}),e.jsx(z,{children:e.jsx(C,{isInAuthentication:!0})})]})};export{T as default};
