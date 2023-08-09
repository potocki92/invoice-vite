import{s,u as j,r as f,j as e,E as C,I as w,a as E,D as v,l as L,b as p,c as x,i as o,d as g,e as S,f as D}from"./index-2527d7cc.js";const y=s.div`
display: flex;
flex-direction: column;
width: 100%;
`,b=s.h1`
  font-size: 1.5rem;
  line-height: 1.2em;
  margin-bottom: 1rem;
  font-weight: 500;
`,I=s.p`
  margin-top: 1.5rem;
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #454f5b;
  & a {
    color: #008060;
    cursor: pointer;
  }
`,F=({setShowRegister:i})=>{const l=j(),[t,c]=f.useState({email:"",password:""}),{email:d,password:m,error:r}=t,h=n=>{c({...t,[n.target.name]:n.target.value})},u=async n=>{n.preventDefault(),(await l(L({email:d,password:m}))).success||c({...t,error:"Email or Password is invalid. Please try again!"})},a=[{name:"email",type:"email",placeholder:"Email",errorMessage:"It should be a valid email address!",label:"Email",required:!0},{name:"password",type:"password",placeholder:"Password",label:"Password",required:!0}];return e.jsxs(y,{children:[e.jsx(b,{children:"Login"}),r&&e.jsx(C,{children:r}),e.jsxs(w,{className:"authentication",onSubmit:n=>u(n),children:[a.map(n=>e.jsx(E,{...n,value:t[n.name],onChange:h},n.id)),e.jsx(v,{style:{marginLeft:"0"},type:"submit",value:"Login",children:"Login"})]}),e.jsxs(I,{children:["Don't have an account?"," ",e.jsx("a",{onClick:()=>i(!0),children:"Register"})]})]})};const N=({setShowRegister:i})=>{const l=j(),[t,c]=f.useState({name:"",email:"",password:""}),{name:d,email:m,password:r}=t,h=a=>c({...t,[a.target.name]:a.target.value}),u=async a=>{a.preventDefault(),d&&m&&r?(l(S({name:d,email:m,password:r})),c({name:"",email:"",password:""}),i(!1)):alert("invalid")};return e.jsxs(y,{children:[e.jsx(b,{children:"Register"}),e.jsxs(w,{className:"authentication",onSubmit:a=>u(a),children:[e.jsxs(p,{children:[e.jsx(x,{className:o(t.name),children:"Username"}),e.jsx(g,{className:o(t.name)?"authentication floating":"authentication",type:"text",name:"name",value:d,placeholder:"Enter your username",onChange:a=>h(a),required:!0})]}),e.jsxs(p,{children:[e.jsx(x,{className:o(t.email),children:"Email"}),e.jsx(g,{className:o(t.email)?"authentication floating":"authentication",type:"email",name:"email",value:m,placeholder:"Enter your email",onChange:a=>h(a),required:!0})]}),e.jsxs(p,{children:[e.jsx(x,{className:o(t.password),children:"Password"}),e.jsx(g,{className:o(t.password)?"authentication floating":"authentication",type:"password",name:"password",value:r,placeholder:"Enter you password",onChange:a=>h(a),minLength:"6"})]}),e.jsx(v,{style:{marginLeft:"0"},type:"submit",value:"Register",children:"Register"})]}),e.jsxs(I,{children:["Already have an account?"," ",e.jsx("a",{onClick:()=>i(!1),children:"Login"})]})]})},R=s.div`
  background: linear-gradient(153.13deg, #c7edec 10.04%, #eefab3 91.46%),
    #e5fbba;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15rem;
  @media (min-width: 1025px) {
    justify-content: center;
    align-items: center;
  }
`,A=s.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.5rem;
  background-color: #fff;
  border-radius: 8px;
  max-width: 34rem;
  max-height: 40rem;
  box-shadow: 6px 12px 60px rgba(0, 0, 0, 0.2);
  width: 80vw; /* Używam 80vw dla płynności */
  min-width: 200px;
  @media screen and (min-width: 1024px) {
    width: 480px;
    margin-left: auto;
    margin-right: auto;
  }
`,P=s.div`
  position: relative;
  width: 100%;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`,k=s.div`
  margin-bottom: 5.5rem;
  position: absolute;
  top: 0;
  left: 0;
`,q=s.h1`
  font-size: 2rem;
  line-height: 1;
`,z=({children:i})=>e.jsx(R,{children:i}),M=s.div`

`,T=s.div`
    padding-left: 5%;
    padding-right: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;    
    align-items: center;
`,H=({setLoginUser:i})=>{const[l,t]=f.useState(!1);return e.jsxs(M,{children:[e.jsx("div",{className:"custom-shape-divider-bottom-1686686263",children:e.jsx("svg",{"data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1200 120",preserveAspectRatio:"none",children:e.jsx("path",{d:"M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",className:"shape-fill"})})}),e.jsx(z,{children:e.jsx(A,{children:e.jsxs(P,{children:[e.jsx(k,{children:e.jsx(q,{children:"Invoice"})}),l?e.jsx(N,{setShowRegister:t,setLoginUser:i}):e.jsx(F,{setShowRegister:t,setLoginUser:i})]})})}),e.jsx(T,{children:e.jsx(D,{isInAuthentication:!0})})]})};export{H as default};
