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
  FormTitle,
  Wrapper,
} from "../Common/FormsWrapper/FormsWrapper.styled";
import CurrentMonthInvoices from "../../utils/currentMonthInvoices";
import updateDate from "../../utils/updateDate";
import updateClient from "../../utils/updateClient";
import updateNotes from "../../utils/updateNotes";
import handleInputChange from "../../utils/handleInputChange";
import calculateInvoiceTotal from "../../utils/calculateInvoiceTotal";
import updateUser from "../../utils/updateUser";
import { setInvoiceNumber, setInvoice } from "../../redux/invoiceSlice";
import { useDispatch, useSelector } from "react-redux";

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
 const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setInvoiceNumber(new CurrentMonthInvoices(0).generateInvoiceNumber(0)))
  },[dispatch])
  
  const [showRegister, setShowRegister] = useState(false);

  /**
   * Handles the change of the invoice number.
   *
   * @param {Event} e - The change event object containing information about the field value change.
   * @returns {void}
   */
  const handleInvoiceNumberChange = (e) => {
    dispatch(setInvoiceNumber(e.target.value));
  };

  return (
    <AuthenticationStyled>
      <div class="custom-shape-divider-bottom-1686686263">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
      <FormsWrapper>
        <FormContainer>
          <Wrapper>
            <FormHeader>
              <FormTitle>Invoice</FormTitle>
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
          handleInvoiceNumberChange={handleInvoiceNumberChange}
          isInAuthentication={true}
        />
      </AuthenticationInputsContent>
    </AuthenticationStyled>
  );
};

export default Authentication;
