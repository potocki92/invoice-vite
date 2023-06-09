import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
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
  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    user: {
      address: {},
    },
    client: {},
    products: {
      items: [],
      totalAmount: 0,
    },
    date: {
      dueDate: new Date().toISOString().substring(0, 10),
      invoiceDate: new Date().toISOString().substring(0, 10),
    },
  });
  const [currentMonthInvoices, setCurrentMonthInvoices] = useState(0);
  const [invoiceNumber, setInvoiceNumber] = useState(
    new CurrentMonthInvoices(currentMonthInvoices).generateInvoiceNumber(
      currentMonthInvoices
    )
  );
  const [clientName, setClientName] = useState("");
  const [clientNip, setClientNip] = useState("");
  const [clientRegon, setClientRegon] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientPostal, setClientPostal] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [dueDate, setDueDate] = useState(invoice?.date?.dueDate);
  const [invoiceDate, setInvoiceDate] = useState(invoice?.date?.invoiceDate);

  const [notes, setNotes] = useState("");

  const [total, setTotal] = useState(0);
  const [productTaxRate, setProductTaxRate] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [showRegister, setShowRegister] = useState(true);

  /**
    Adds an empty product item to the invoice's product list.
    @returns {void}
    */
  const handleAddCard = () => {
    console.log(invoice);
    setInvoice({
      ...invoice,
      products: {
        ...invoice.products,
        items: [...invoice.products.items, {}],
      },
    });
  };

  /**
   * Handles the change of the invoice number.
   *
   * @param {Event} e - The change event object containing information about the field value change.
   * @returns {void}
   */
  const handleInvoiceNumberChange = (e) => {
    setInvoiceNumber(e.target.value);
  };

  /**
   * Updates the invoice number.
   *
   * @param {string} newInvoiceNumber - The new invoice number.
   * @returns {void}
   */
  const updateInvoiceNumber = (newInvoiceNumber) => {
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      invoiceNumber: newInvoiceNumber,
    }));
  };
  /**
   * Handles the change event of the invoice number input.
   * Sets the invoice number state to the input value.
   */
  const updateFunctions = {
    invoiceNumber: [setInvoiceNumber, updateInvoiceNumber],
    clientName: [setClientName, updateClient],
    clientNip: [setClientNip, updateClient],
    clientRegon: [setClientRegon, updateClient],
    clientEmail: [setClientEmail, updateClient],
    clientPhone: [setClientPhone, updateClient],
    clientCity: [setClientCity, updateClient],
    clientPostal: [setClientPostal, updateClient],
    clientAddress: [setClientAddress, updateClient],
    dueDate: [setDueDate, updateDate],
    invoiceDate: [setInvoiceDate, updateDate],
    notes: [setNotes, updateNotes],
  };

  /**
   *  Handles the change event of the invoice inputs.
   * Sets the invoice state to the input value.
   * @param {*} e
   * @param {*} updateFunctions
   * @param {*} invoice
   * @param {*} setInvoice
   * @returns {void}
   */
  const handleChange = (e) => {
    handleInputChange(e, updateFunctions, invoice, setInvoice);
  };

  useEffect(() => {
    calculateInvoiceTotal(invoice?.products?.items, setSubtotal, setProductTaxRate, setTotal);
  }, [invoice?.products?.items, setSubtotal, setProductTaxRate, setTotal]);
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
        <InvoiceInputs
          handleInvoiceNumberChange={handleInvoiceNumberChange}
          invoiceNumber={invoiceNumber}
          clientName={clientName}
          clientEmail={clientEmail}
          clientPhone={clientPhone}
          clientCity={clientCity}
          clientPostal={clientPostal}
          clientAddress={clientAddress}
          clientNip={clientNip}
          clientRegon={clientRegon}
          invoiceDate={invoiceDate}
          dueDate={dueDate}
          notes={notes}
          total={total}
          productTaxRate={productTaxRate}
          subtotal={subtotal}
          invoice={invoice}
          setNewInvoice={setInvoice}
          handleAddCard={handleAddCard}
          handleChange={handleChange}
          isInAuthentication={true}
        />
      </AuthenticationInputsContent>
    </AuthenticationStyled>
  );
};

export default Authentication;
