import React, { useEffect, useState } from "react";
import "./Authentication.css";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import InvoiceInputs from "../Invoice/InvoiceInputs/InvoiceInputs";
import FormsWrapper from "../Common/FormsWrapper/FormsWrapper";
import {
  AuthenticationInputsContent,
  AuthenticationStyled,
} from "./Authentication.styled";
import {
  FormContainer,
  FormHeader,
  Wrapper,
} from "../Common/FormsWrapper/FormsWrapper.styled";
import LinkedinAuth from "./LinkedinAuth/LinkedinAuth";
/**
 * Authentication component.
 * @component
 * @param {function} setLoginUser - Function to set the logged in user.
 * @returns {JSX.Element}
 * @example
 * return (
 *  <Authentication setLoginUser={setLoginUser} />
 * )
 */
const Authentication = () => {
  const [showRegister, setShowRegister] = useState(false);

  const handleAfterClick = () => {
    setShowRegister(!showRegister);
  };

  const handleCallbackResponse = (res) => {
    console.log("Encoded JWT ID token: " + res.credentials);
  };
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "815039792408-0a4voqplfkk3kkb1adobf7ocudbo5r01.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  return (
    <AuthenticationStyled>
      <FormsWrapper>
        <FormContainer>
          <Wrapper>
            <FormHeader
              className={`${showRegister ? "register" : ""}`}
              onClick={handleAfterClick}
            ></FormHeader>
            {showRegister ? <Register /> : <Login />}
          </Wrapper>
        </FormContainer>
      </FormsWrapper>
      <AuthenticationInputsContent>
        <InvoiceInputs isInAuthentication={true} />
      </AuthenticationInputsContent>
    </AuthenticationStyled>
  );
};

export default Authentication;
