import React, { useState } from "react";
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
  FormTitle,
  Wrapper,
} from "../Common/FormsWrapper/FormsWrapper.styled";
import { Link } from "react-router-dom";
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
    setShowRegister(!showRegister)
  }
  return (
    <AuthenticationStyled>
      <FormsWrapper>
        <FormContainer>
          <Wrapper>
            <FormHeader 
              className={`${showRegister ? "register" : ""}`}
              onClick={handleAfterClick}
            >
            </FormHeader>
            {showRegister ? (
              <Register/>
            ) : (
              <Login/>
            )}
          </Wrapper>
        </FormContainer>
      </FormsWrapper>
      <AuthenticationInputsContent>
        <InvoiceInputs
          isInAuthentication={true}
        />
      </AuthenticationInputsContent>
    </AuthenticationStyled>
  );
};

export default Authentication;
