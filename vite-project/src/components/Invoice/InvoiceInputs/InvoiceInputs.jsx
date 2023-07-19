import React, { useEffect, useState } from "react";
import ProductCard from "../../Product/ProductCard/ProductCard";
import { InvoiceInputsContainer, TextArea } from "./InvoiceInputs.styled";
import isFloating from "../../../utils/isFloating";
import { HiUsers } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { createPortal } from "react-dom";
import Modal from "../../Common/Modal/Modal";
import { ModalButton } from "../../Common/Modal/Modal.styled";
import clientCardMarkup from "../../../markups/clientCardMarkup";
import {
  AddButton,
  AddButtonWrapper,
  ButtonPDFReview,
  DefaultButton,
} from "../../buttons.styled";
import TotalSummary from "../../Common/TotalSummary/TotalSummary";
import {
  InputsContent,
  InputsContainer,
  Input,
  InputSpan,
} from "../../Common/InputField/Input.styled";
import InfoWrapper from "../../Common/InfoWrapper/InfoWrapper";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../InvoicePDF/InvoicePDF";
import { useDispatch, useSelector } from "react-redux";
import { setInvoice, setInvoiceNumber, setCompanyName, setCompanyEmail, setInvoiceDate, setDueDate, setCompanyPhone, setCompanyCity, setCompanyPostal, setCompanyAddress, setCompanyNip, setCompanyRegon, setClientName, setClientEmail, setClientNip, setClientRegon, setClientPhone, setClientCity, setClientPostal, setClientAddress, setNotes, addProductToInvoice } from "../../../redux/invoiceSlice";
import updateUser from "../../../utils/updateUser";
import updateDate from "../../../utils/updateDate";
import updateClient from "../../../utils/updateClient";
import updateNotes from "../../../utils/updateNotes";
import CurrentMonthInvoices from "../../../utils/currentMonthInvoices";

/**
 * Component for displaying and editing invoice input fields.
 * @param {Object} props - Component props
 * @param {Object} props.invoice - Invoice data object
 * @param {Function} props.setNewInvoice - Function to update invoice data
 * @param {Array} props.clients - Array of client objects
 * @param {Array} props.products - Array of product objects
 * @param {Object} props.selectedProduct - Selected product object
 * @param {Number} props.selectedProductIndex - Index of the selected product
 * @param {Function} props.handleClientChange - Function to handle client change
 * @param {boolean} props.isInAuthentication - Flag indicating if the component is in authentication mode
 * @param {ReactNode} props.children - Optional React children elements
 * @returns {JSX.Element} - Rendered component
 */
const InvoiceInputs = ({
  setNewInvoice,
  clients,
  products,
  selectedProduct,
  selectedProductIndex,
  handleClientChange,
  isInAuthentication,
  children
}) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()
  const invoice = useSelector((state) => state.invoice)
  useEffect(() => {
    dispatch(setInvoiceNumber(new CurrentMonthInvoices(0).generateInvoiceNumber(0)))
  },[dispatch])
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
   * Handles the addition of a new product card to the invoice.
   *
   * @returns {void}
   */
  const handleAddCard = () => {
    dispatch(addProductToInvoice({
      productsName: "",
        qty: 1,
        productsPrice: 0,
        productsTax: 0,
        amount: 0,
    }))
  }
  /**
   * Handles the change of input fields in the invoice form.
   *
   * @param {Event} e - The change event object containing information about the field value change.
   * @returns {void}
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updateFunctions = {
      invoiceDate: [setInvoiceDate, updateDate],
      dueDate: [setDueDate, updateDate],
      invoiceNumber: [setInvoiceNumber, updateInvoiceNumber],
      name: [setCompanyName, updateUser],
      email: [setCompanyEmail, updateUser],
      phone: [setCompanyPhone, updateUser],
      NIP: [setCompanyNip, updateUser],
      REGON: [setCompanyRegon, updateUser],

      city: [setCompanyCity, updateUser],
      postalCode: [setCompanyPostal, updateUser],
      street: [setCompanyAddress, updateUser],

      clientName: [setClientName, updateClient],
      clientNip: [setClientNip, updateClient],
      clientRegon: [setClientRegon, updateClient],
      clientEmail: [setClientEmail, updateClient],
      clientPhone: [setClientPhone, updateClient],
      clientCity: [setClientCity, updateClient],
      clientPostal: [setClientPostal, updateClient],
      clientAddress: [setClientAddress, updateClient],

      notes: [setNotes, updateNotes],
    };

    const [setFunction, updateFunction] = updateFunctions[name];

    if (setFunction) {
      dispatch(setFunction(value));
    }

    if (updateFunction) {
      const updatedInvoice = updateFunction(name, value, invoice);
      dispatch(setInvoice(updatedInvoice));
    }
  };

  /**
   * Updates the invoice number with the provided newInvoiceNumber.
   *
   * @param {string} newInvoiceNumber - The new invoice number.
   * @returns {void}
   */
  const updateInvoiceNumber = (newInvoiceNumber) => {
    dispatch(
      setInvoice((prevInvoice) => ({
        ...prevInvoice,
        invoiceNumber: newInvoiceNumber,
      }))
    );
  };

  return (
    <InvoiceInputsContainer>
      <InfoWrapper title={"Invoice:"} />
      <InputsContent>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoice.invoiceNumber)}>
            Invoice Number:
          </InputSpan>
          <Input
            className={isFloating(invoice.invoiceNumber)}
            type="text"
            name="invoiceNumber"
            placeholder="Enter invoice number"
            value={invoice.invoiceNumber || ""}
            onChange={handleInvoiceNumberChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoice.date.invoiceDate)}>Invoice Date:</InputSpan>
          <Input
            className={isFloating(invoice.date.invoiceDate)}
            type="date"
            name="invoiceDate"
            value={invoice.date.invoiceDate || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoice.date.dueDate)}>Due Date:</InputSpan>
          <Input
            className={isFloating(invoice.date.dueDate)}
            type="date"
            name="dueDate"
            value={invoice.date.dueDate || ""}
            onChange={handleChange}
          />
        </InputsContainer>
      </InputsContent>
      <InfoWrapper title={"Bill from:"} />
      <InputsContent>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoice.user.name)}>
            Company name:
          </InputSpan>
          <Input
            className={isFloating(invoice.user.name)}
            type="text"
            name="name"
            placeholder="Enter company name"
            value={invoice.user.name || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoice.user.email)}>Email:</InputSpan>
          <Input
            className={isFloating(invoice.user.email)}
            type="email"
            name="email"
            placeholder="Enter email"
            value={invoice.user.email || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoice.user.phone)}>Phone:</InputSpan>
          <Input
            className={isFloating(invoice.user.phone)}
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={invoice.user.phone || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-66">
          <InputSpan className={isFloating(invoice.user.address.city)}>City:</InputSpan>
          <Input
            className={isFloating(invoice.user.address.city)}
            type="text"
            name="city"
            placeholder="Enter city"
            value={invoice.user.address.city || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoice.user.NIP)}>NIP:</InputSpan>
          <Input
            className={isFloating(invoice.user.NIP)}
            type="text"
            name="NIP"
            placeholder="Enter NIP"
            value={invoice.user.NIP || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoice.user.address.street)}>Address:</InputSpan>
          <Input
            className={isFloating(invoice.user.address.street)}
            type="text"
            name="street"
            placeholder="Enter address (street)"
            value={invoice.user.address.street || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoice.user.address.postalCode)}>
            Postal code:
          </InputSpan>
          <Input
            className={isFloating(invoice.user.address.postalCode)}
            type="text"
            name="postalCode"
            placeholder="Enter postal code"
            value={invoice.user.address.postalCode || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoice.user.REGON)}>REGON:</InputSpan>
          <Input
            className={isFloating(invoice.user.REGON)}
            type="text"
            name="REGON"
            placeholder="Enter REGON"
            value={invoice.user.REGON || ""}
            onChange={handleChange}
          />
        </InputsContainer>
      </InputsContent>
      <InfoWrapper title={"Bill to:"} />
      <InputsContent>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoice.client.clientName)}>Client name</InputSpan>
          <Input
            className={isFloating(invoice.client.clientName)}
            type={"text"}
            name={"clientName"}
            placeholder="Customer's name"
            value={invoice.client.clientName || ""}
            onChange={handleChange}
          />
          {!isInAuthentication ? (
            <ModalButton onClick={() => setShowModal(true)}>
              <HiUsers size={25} />
            </ModalButton>
          ) : null}
          {showModal &&
            createPortal(
              <Modal
                handleChange={handleClientChange}
                markup={clientCardMarkup}
                headerText={"Clients"}
                data={clients}
                onClose={() => setShowModal(false)}
                className={showModal ? "show" : ""}
              />,
              document.body
            )}
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoice.client.clientEmail)}>Email</InputSpan>
          <Input
            className={isFloating(invoice.client.clientEmail)}
            type={"email"}
            name={"clientEmail"}
            placeholder="Customer's Email"
            value={invoice.client.clientEmail || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoice.client.clientPhone)}>
            Client phone
          </InputSpan>
          <Input
            className={isFloating(invoice.client.clientPhone)}
            type={"tel"}
            name={"clientPhone"}
            placeholder="Customer's Phone"
            value={invoice.client.clientPhone || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-66">
          <InputSpan className={isFloating(invoice.client.clientAddress)}> Address</InputSpan>
          <Input
            className={isFloating(invoice.client.clientAddress)}
            type={"text"}
            name={"clientAddress"}
            placeholder="Customer's Address"
            value={invoice.client.clientAddress || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoice.client.clientNip)}>NIP</InputSpan>
          <Input
            className={isFloating(invoice.client.clientNip)}
            type={"text"}
            name={"clientNip"}
            placeholder="Customer's NIP"
            value={invoice.client.clientNip || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoice.client.clientCity)}>City</InputSpan>
          <Input
            className={isFloating(invoice.client.clientCity)}
            type={"text"}
            name={"clientCity"}
            placeholder="City"
            value={invoice.client.clientCity || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoice.client.clientPostal)}>Postal</InputSpan>
          <Input
            className={isFloating(invoice.client.clientPostal)}
            type={"text"}
            name={"clientPostal"}
            placeholder="Postal"
            value={invoice.client.clientPostal || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoice.client.clientRegon)}>REGON</InputSpan>
          <Input
            className={isFloating(invoice.client.clientRegon)}
            type={"text"}
            name={"clientRegon"}
            placeholder="Customer's REGON"
            value={invoice.client.clientRegon || ""}
            onChange={handleChange}
          />
        </InputsContainer>
      </InputsContent>
      <InfoWrapper title={"Products:"} />
      {!isInAuthentication ? (
        <InputsContent>
          {invoice?.products?.items.map((product, index) => (
            <ProductCard
              key={index}
              index={index}
              product={product}
              invoice={invoice}
              setNewInvoice={setNewInvoice}
              selectedProduct={selectedProduct}
              selectedProductIndex={selectedProductIndex}
              products={products}
            />
          ))}
        </InputsContent>
      ) : (
        <InputsContent>
          {invoice?.products.items.map((product, index) => (
            <ProductCard
              key={index}
              index={index}
              product={product}
              invoice={invoice}
              setNewInvoice={setNewInvoice}
              selectedProduct={selectedProduct}
              selectedProductIndex={selectedProductIndex}
              products={products}
              isInAuthentication={isInAuthentication}
            />
          ))}
        </InputsContent>
      )}
      <AddButtonWrapper>
        <AddButton onClick={handleAddCard}>
          <IoMdAddCircleOutline size={25} />
          Add new product
        </AddButton>
      </AddButtonWrapper>
      <InputsContent>
        <InputsContainer>
          <InputSpan className={isFloating(invoice.notes)}>Notes</InputSpan>
          <TextArea
            className={isFloating(invoice.notes)}
            name={"notes"}
            placeholder="Notes"
            value={invoice.notes || ""}
            onChange={handleChange}
          ></TextArea>
        </InputsContainer>
        <InputsContainer>
          <TotalSummary/>
        </InputsContainer>
        <InputsContainer className="buttons">
          <PDFDownloadLink
            document={<InvoicePDF invoice={invoice} />}
            fileName="invoice"
          >
            {({ loading }) =>
              loading ? (
                `Loading document...`
              ) : (
                <DefaultButton className="submit">Download PDF</DefaultButton>
                )
              }
          </PDFDownloadLink>
              {children}
        </InputsContainer>
        <ButtonPDFReview />
        <InputsContainer>
        </InputsContainer>
      </InputsContent>
    </InvoiceInputsContainer>
  );
};

export default InvoiceInputs;
