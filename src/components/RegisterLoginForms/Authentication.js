import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm/LoginForm";
import Register from "./RegisterForm/RegisterForm";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "./Authentication.css";
import axios from "../../utils/axiosConfig";

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
        <LoginForm
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
