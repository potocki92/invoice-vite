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
const Authentication = ({ setLoginUser }) => {
  
  const [showRegister, setShowRegister] = useState(false);

  console.log(showRegister);
  return (
    <AuthenticationStyled>
      <FormsWrapper>
        <FormContainer>
          <Wrapper>
            <FormHeader>
              {/* <FormTitle>Invoice</FormTitle> */}
            </FormHeader>
            {showRegister ? (
              <Register setShowRegister={setShowRegister} setLoginUser={setLoginUser}/>
            ) : (
              <Login
                setShowRegister={setShowRegister}
                setLoginUser={setLoginUser}
              />
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
