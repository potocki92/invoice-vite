import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./Authentication.css";
import Login from "../Login/Login";
import Register from "../Register/Register";

const Authentication = ({ setLoginUser }) => {
  const [showRegister, setShowRegister] = useState(true);
  return (
    <div className="authentication-container is-flex">
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
    </div>
  );
};

export default Authentication;
