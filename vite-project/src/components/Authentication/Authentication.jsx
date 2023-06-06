import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./Authentication.css";
import Login from "../Authentication/Login/Login"
import Register from "../Authentication/Register/Register"
import InvoiceInputs from "../Invoice/InvoiceInputs/InvoiceInputs";

const Authentication = ({ setLoginUser }) => {
  const [showRegister, setShowRegister] = useState(true);
  return (
    <div className="authentication-container">
      
      <CSSTransition
        in={showRegister}
        timeout={300}
        classNames="form"
        unmountOnExit
        onExit={() => setShowRegister(false)}
      >
        <Login
          setShowRegister={setShowRegister}
          setLoginUser={setLoginUser}
        />
      </CSSTransition>
      <CSSTransition
        in={!showRegister}
        timeout={300}
        classNames="form"
        unmountOnExit
        onExit={() => setShowRegister(true)}
      >
        <Register setShowRegister={setShowRegister} />
      </CSSTransition>
      <div className="container">
      <InvoiceInputs/>
      </div>
    </div>
  );
};

export default Authentication;
