import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./Authentication.css";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import InvoiceInputs from "../Invoice/InvoiceInputs/InvoiceInputs";
import FormsWrapper from "../Common/FormsWrapper/FormsWrapper";
import { AuthenticationInputsContent, AuthenticationStyled } from "./Authentication.styled";
import {
  FormContainer,
  FormHeader,
  FormTitle,
  Wrapper,
} from "../Common/FormsWrapper/FormsWrapper.styled";

const Authentication = ({ setLoginUser }) => {
  const [showRegister, setShowRegister] = useState(true);
  return (
    <AuthenticationStyled>
      <FormsWrapper>
        <FormContainer>
          <Wrapper>
            <FormHeader>
              <FormTitle>Invoice</FormTitle>
            </FormHeader>
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
