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
import { setInvoiceNumber } from "../../redux/invoiceSlice";
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
  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    user: {
      address: {},
    },
    client: {},
    products: {
      items: [{}],
      totalAmount: 0,
    },
    date: {
      dueDate: new Date().toISOString().substring(0, 10),
      invoiceDate: new Date().toISOString().substring(0, 10),
    },
  });

  const invoiceNumber = useSelector((state) => state.invoice.invoiceNumber)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setInvoiceNumber(new CurrentMonthInvoices(0).generateInvoiceNumber(0)))
  },[dispatch])
  const [companyName, setCompanyName] = useState("");
  const [companyNip, setCompanyNip] = useState("");
  const [companyRegon, setCompanyRegon] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [companyPostal, setCompanyPostal] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");

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

  const [total, setTotal] = useState(0.0);
  const [productTaxRate, setProductTaxRate] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const [showRegister, setShowRegister] = useState(false);

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
        items: [
          ...invoice.products.items,
          {
            productTaxRate: 0,
            productTax: 0,
            productsPrice: 0.0,
            productsQty: 1,
            amount: 0,
          },
        ],
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
    dispatch(setInvoiceNumber(e.target.value));
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
    name: [setCompanyName, updateUser],
    email: [setCompanyEmail, updateUser],
    phone: [setCompanyPhone, updateUser],
    city: [setCompanyCity, updateUser],
    postalCode: [setCompanyPostal, updateUser],
    street: [setCompanyAddress, updateUser],
    NIP: [setCompanyNip, updateUser],
    REGON: [setCompanyRegon, updateUser],
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
    if (invoice?.products?.items?.length > 0) {
      calculateInvoiceTotal(
        invoice?.products?.items,
        setSubtotal,
        setProductTaxRate,
        setTotal
      );
    } else {
      setTotal(0);
      setSubtotal(0);
      setProductTaxRate(0);
    }

    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      products: {
        ...prevInvoice.products,
        totalAmount: total,
      },
    }));

    console.log(total, subtotal, productTaxRate);
  }, [invoice?.products?.items, setSubtotal, setProductTaxRate, setTotal]);

  useEffect(() => {
    setInvoice((prevInvoice) => ({ ...prevInvoice, invoiceNumber }));
  }, []);

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
          invoiceNumber={invoiceNumber}
          companyName={companyName}
          companyEmail={companyEmail}
          companyPhone={companyPhone}
          companyCity={companyCity}
          companyPostal={companyPostal}
          companyAddress={companyAddress}
          companyNip={companyNip}
          companyRegon={companyRegon}
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
