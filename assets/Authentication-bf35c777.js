import{s as l,v as m,u as p,r as c,j as e,l as h,a as F,b as v,c as w,d as y,e as u,h as g}from"./index-4fe97a4a.js";l.div`
display: flex;
flex-direction: column;
width: 100%;
padding: 25px;
`;l.h1`
  font-size: 1.5rem;
  line-height: 1.2em;
  margin-bottom: 1rem;
  font-weight: 500;
`;l.p`
  margin-top: 1.5rem;
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #454f5b;
  & a {
    color: #008060;
    cursor: pointer;
  }
`;m(),m();const j=()=>{const d=p(),[a,s]=c.useState({email:"",password:""}),{email:o,password:r,error:x}=a,n=i=>{s({...a,[i.target.name]:i.target.value})},f=async i=>{i.preventDefault(),(await d(h({email:o,password:r}))).success||s({...a,error:"Email or Password is invalid. Please try again!"})};return e.jsxs("div",{className:"pt-5 px-5 mx-auto max-w-md flex w-full h-full flex-col justify-center space-y-6 sm:w-[350px]",children:[e.jsxs("div",{className:"flex flex-col space-y-2 text-center",children:[e.jsx("h1",{className:"text-2xl font-semibold tracking-tight text-[#FBFCFF]",children:"Welcome back"}),e.jsx("p",{className:"text-sm text-[#B8B3AF]",children:"Enter your email to sign in to your account"})]}),e.jsxs("div",{className:"grid gap-5",children:[e.jsx("form",{onSubmit:i=>f(i),children:e.jsxs("div",{className:"grid gap-3",children:[e.jsxs("ul",{className:"grid gap-3",children:[e.jsxs("li",{className:"flex flex-col space-y-1",children:[e.jsx("label",{className:"text-[#FBFCFF] font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm",htmlFor:"email",children:"Email"}),e.jsx("input",{className:"text-[#FBFCFF] flex h-10 w-full rounded-md border border-[#292424] bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder-[#B8B3AF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",id:"email",placeholder:"johndoe@example.com",autoCorrect:"off",type:"email",name:"email",onChange:i=>{n(i)}}),e.jsx("p",{className:"px-1 text-xs font-[500] text-red-500/90"})]}),e.jsxs("li",{className:"flex flex-col space-y-1",children:[e.jsx("label",{className:"text-[#FBFCFF] font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm",htmlFor:"password",children:"Password"}),e.jsx("input",{className:"text-[#FBFCFF] flex h-10 w-full rounded-md border border-[#292424] bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder-[#B8B3AF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",id:"password",placeholder:"*****",autoCorrect:"off",type:"password",name:"password",onChange:i=>{n(i)}}),e.jsx("p",{className:"px-1 text-xs font-[500] text-red-500/90"})]})]}),e.jsx("button",{className:"text-[#FBFCFF] bg-[#EA580C] inline-flex items-center justify-center rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",type:"submit",children:"Sign In with Email"})]})}),e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"absolute inset-0 flex items-center",children:e.jsx("span",{className:"w-full border-t border-[#292424]"})}),e.jsx("div",{className:"relative flex justify-center text-xs uppercase",children:e.jsx("span",{className:"px-2 bg-[#0C0A09] text-[#B8B3AF]",children:"OR"})})]}),e.jsx("div",{className:"inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[#292424] h-10 px-4 py-2"})]})]})};m(),m(),m();const C=({setShowRegister:d})=>{const a=p();F(v);const[s,o]=c.useState({name:"",email:"",password:"",error:""}),{name:r,email:x,password:n}=s,f=t=>o({...s,[t.target.name]:t.target.value}),i=async t=>{t.preventDefault();const b=await a(w({name:r,email:x,password:n}));b.payload.success?d(!1):(console.log(b.payload),o({...s,error:"An error occurred. Please try again."}))};return e.jsxs("div",{className:"pt-5 px-5 mx-auto max-w-md flex w-full h-full flex-col justify-center space-y-6 sm:w-[350px]",children:[e.jsxs("div",{className:"flex flex-col space-y-2 text-center",children:[e.jsx("h1",{className:"text-2xl font-semibold tracking-tight text-[#FBFCFF]",children:"Create an account"}),e.jsx("p",{className:"text-sm text-[#B8B3AF]",children:"Enter your email below to create your account"})]}),e.jsxs("div",{className:"grid gap-5",children:[e.jsx("form",{onSubmit:t=>i(t),children:e.jsxs("div",{className:"grid gap-3",children:[e.jsxs("ul",{className:"grid gap-3",children:[e.jsxs("li",{className:"flex flex-col space-y-1",children:[e.jsx("label",{className:"text-[#FBFCFF] font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm",htmlFor:"name",children:"Name"}),e.jsx("input",{className:"text-[#FBFCFF] flex h-10 w-full rounded-md border border-[#292424] bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder-[#B8B3AF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",id:"name",placeholder:"John Doe",autoCorrect:"off",type:"text",name:"name",onChange:t=>{f(t)}}),e.jsx("p",{className:"px-1 text-xs font-[500] text-red-500/90"})]}),e.jsxs("li",{className:"flex flex-col space-y-1",children:[e.jsx("label",{className:"text-[#FBFCFF] font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm",htmlFor:"email",children:"Email"}),e.jsx("input",{className:"text-[#FBFCFF] flex h-10 w-full rounded-md border border-[#292424] bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder-[#B8B3AF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",id:"email",placeholder:"johndoe@example.com",autoCorrect:"off",type:"email",name:"email",onChange:t=>{f(t)}}),e.jsx("p",{className:"px-1 text-xs font-[500] text-red-500/90"})]}),e.jsxs("li",{className:"flex flex-col space-y-1",children:[e.jsx("label",{className:"text-[#FBFCFF] font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm",htmlFor:"password",children:"Password"}),e.jsx("input",{className:"text-[#FBFCFF] flex h-10 w-full rounded-md border border-[#292424] bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder-[#B8B3AF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",id:"password",placeholder:"*****",autoCorrect:"off",type:"password",name:"password",onChange:t=>{f(t)}}),e.jsx("p",{className:"px-1 text-xs font-[500] text-red-500/90"})]})]}),e.jsx("button",{className:"text-[#FBFCFF] bg-[#EA580C] inline-flex items-center justify-center rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",type:"submit",children:"Sign In with Email"})]})}),e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"absolute inset-0 flex items-center",children:e.jsx("span",{className:"w-full border-t border-[#292424]"})}),e.jsx("div",{className:"relative flex justify-center text-xs uppercase",children:e.jsx("span",{className:"px-2 bg-[#0C0A09] text-[#B8B3AF]",children:"OR"})})]}),e.jsx("div",{className:"inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[#292424] h-10 px-4 py-2"})]})]})};l.div`
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
`;l.div`
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
`;l.div`
  position: relative;
  width: 100%;
  min-height: 625px;
  display: flex;
  justify-content: center;
  align-items: center;
`;l.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
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
    height: 70px;
    content: "";
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &::after {
    left: 0;
    content: "Sign up";
    box-shadow: inset -16px -6px 16px -15px rgba(0, 0, 0, 0.2);
    background: #fbfcff;
  }

  &::before {
    right: 0;
    content: "Log in";
  }

  &.register {
    &:after {
      box-shadow: none;
      background: #353535;
    }
    &::before {
      box-shadow: inset 16px -6px 16px -15px rgba(0, 0, 0, 0.2);
      background: #f9fbfb;
    }
  }
`;l.h1`
  font-size: 2rem;
  line-height: 1;
`;l.div`

`;const N=l.div`
    padding-left: 5%;
    padding-right: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;    
    align-items: center;
`,A=()=>{const d=p(),a=y(),[s,o]=c.useState(!1);c.useEffect(()=>{d(u(!1))},[u]),c.useEffect(()=>{a.pathname===`${g}/signup`?o(!0):a.pathname===`${g}/login`&&o(!1)},[a.pathname]);const r=()=>{o(!s)},x=n=>{console.log("Encoded JWT ID token: "+n.credentials)};return c.useEffect(()=>{google.accounts.id.initialize({client_id:"815039792408-0a4voqplfkk3kkb1adobf7ocudbo5r01.apps.googleusercontent.com",callback:x}),google.accounts.id.renderButton(document.getElementById("signInDiv"),{theme:"outline",size:"large"})},[]),e.jsxs("div",{className:"min-h-screen",children:[e.jsx("div",{className:"md:container flex flex-col items-center justify-center h-screen lg:max-w-none lg:grid-cols-2 lg:px-0",children:e.jsxs("div",{className:"relative flex flex-col items-center w-full h-full sm:h-[550px] sm:w-[400px]",children:[e.jsxs("div",{className:"w-full flex",children:[e.jsxs("button",{className:`flex justify-center w-[50%] h-[60px] relative block ${s?"bg-[#0C0A09]  text-[#FBFCFF]":"bg-[#FBFCFF]  text-[#0C0A09]"}`,onClick:r,children:[e.jsx("b",{className:`absolute bottom-[0] h-[20px] w-full ${s?"bg-[#0C0A09] before:bg-[#0C0A09]":"bg-[#0C0A09] before:bg-[#FBFCFF]"}  before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full  before:rounded-br-[20px]`}),e.jsx("b",{className:`absolute top-[0] h-[20px] w-full ${s?"bg-[#FBFCFF] after:bg-[#0C0A09]":"bg-[#FBFCFF] after:bg-[#FBFCFF]"} after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-tr-[20px]`}),e.jsx("span",{className:"md:block relative block pl-[10px] h-[60px] leading-[60px] whitespace-normal font-semibold",children:"Sign Up"})]}),e.jsxs("button",{className:`flex justify-center w-[50%] h-[60px] relative block ${s?"bg-[#FBFCFF] text-[#0C0A09]":"bg-[#0C0A09] text-[#FBFCFF]"} `,onClick:r,children:[e.jsx("b",{className:`absolute bottom-[0] h-[20px] w-full ${s?"bg-[#0C0A09] before:bg-[#FBFCFF]":"bg-[#0C0A09] before:bg-[#0C0A09]"}  bg-[#0C0A09] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#0C0A09] before:rounded-bl-[20px]`}),e.jsx("b",{className:`absolute top-[0] h-[20px] w-full ${s?"bg-[#FBFCFF] after:bg-[#FBFCFF]":"bg-[#0C0A09] after:bg-[#0C0A09]"}  bg-[#FBFCFF] after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[#0C0A09] after:rounded-tl-[20px]`}),e.jsx("span",{className:"md:block relative block pl-[10px] h-[60px] leading-[60px] whitespace-normal font-semibold",children:"Sign In"})]})]}),s?e.jsx(C,{setShowRegister:o}):e.jsx(j,{})]})}),e.jsx(N,{})]})};export{A as default};
