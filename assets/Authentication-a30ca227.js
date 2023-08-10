import{s as a,u,r as p,j as t,E as b,I as h,a as g,D as f,l as w,b as y,c as j}from"./index-03e7f180.js";const x=a.div`
display: flex;
flex-direction: column;
width: 100%;
padding: 25px;
`;a.h1`
  font-size: 1.5rem;
  line-height: 1.2em;
  margin-bottom: 1rem;
  font-weight: 500;
`;a.p`
  margin-top: 1.5rem;
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #454f5b;
  & a {
    color: #008060;
    cursor: pointer;
  }
`;const v=()=>{const r=u(),[s,n]=p.useState({email:"",password:""}),{email:o,password:l,error:i}=s,c=e=>{n({...s,[e.target.name]:e.target.value})},d=async e=>{e.preventDefault(),(await r(w({email:o,password:l}))).success||n({...s,error:"Email or Password is invalid. Please try again!"})},m=[{name:"email",type:"email",placeholder:"Email",errorMessage:"It should be a valid email address!",label:"Email",required:!0},{name:"password",type:"password",placeholder:"Password",label:"Password",required:!0}];return t.jsxs(x,{children:[i&&t.jsx(b,{children:i}),t.jsxs(h,{className:"authentication",onSubmit:e=>d(e),children:[m.map(e=>t.jsx(g,{...e,value:s[e.name],onChange:c,isForm:!0},e.id)),t.jsx(f,{style:{marginLeft:"0"},type:"submit",value:"Login",children:"Login"})]})]})};const S=()=>{const r=u(),[s,n]=p.useState({name:"",email:"",password:""}),{name:o,email:l,password:i}=s,c=e=>n({...s,[e.target.name]:e.target.value}),d=async e=>{e.preventDefault(),o&&l&&i?(r(y({name:o,email:l,password:i})),n({name:"",email:"",password:""}),setShowRegister(!1)):alert("invalid")},m=[{name:"name",type:"text",placeholder:"Name",label:"Username",required:!0},{name:"email",type:"email",placeholder:"Email",errorMessage:"It should be a valid email address!",label:"Email",required:!0},{name:"password",type:"password",placeholder:"Password",errorMessage:"Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",label:"Password",pattern:"^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",required:!0}];return t.jsx(x,{children:t.jsxs(h,{className:"authentication",onSubmit:e=>d(e),children:[m.map(e=>t.jsx(g,{...e,value:s[e.name],onChange:c,isForm:!0},e.id)),t.jsx(f,{style:{marginLeft:"0"},type:"submit",value:"Register",children:"Register"})]})})},F=a.div`
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
`,I=a.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  max-width: 34rem;
  max-height: 40rem;
  background: #fff;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.2);
  width: 65vw;
  min-width: 200px;
  @media screen and (min-width: 1024px) {
    margin-left: auto;
    margin-right: auto;
  }
`,D=a.div`
  position: relative;
  width: 100%;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`,E=a.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
`;a.h1`
  font-size: 2rem;
  line-height: 1;
`;const A=({children:r})=>t.jsx(F,{children:r}),R=a.div`

`,k=a.div`
    padding-left: 5%;
    padding-right: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;    
    align-items: center;
`,C=()=>{const[r,s]=p.useState(!1),n=()=>{s(!r)};return t.jsxs(R,{children:[t.jsx(A,{children:t.jsx(I,{children:t.jsxs(D,{children:[t.jsx(E,{className:`${r?"register":""}`,onClick:n}),r?t.jsx(S,{}):t.jsx(v,{})]})})}),t.jsx(k,{children:t.jsx(j,{isInAuthentication:!0})})]})};export{C as default};
