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
import { PDFDownloadLink, View } from "@react-pdf/renderer";
import InvoicePDF from "../InvoicePDF/InvoicePDF";
import { useDispatch, useSelector } from "react-redux";
import handleInputChange from "../../../utils/handleInputChange";
import { setInvoice, setInvoiceNumber, setCompanyName, setCompanyEmail, setInvoiceDate, setDueDate, setCompanyPhone, setCompanyCity, setCompanyPostal, setCompanyAddress, setCompanyNip, setCompanyRegon, setClientName, setClientEmail, setClientNip, setClientRegon, setClientPhone, setClientCity, setClientPostal, setClientAddress, setNotes } from "../../../redux/invoiceSlice";
import updateUser from "../../../utils/updateUser";
import updateDate from "../../../utils/updateDate";
import updateClient from "../../../utils/updateClient";
import updateNotes from "../../../utils/updateNotes";
import calculateInvoiceTotal from "../../../utils/calculateInvoiceTotal";
import { setTotal } from "../../../redux/totalSlice";
import { setSubtotal } from "../../../redux/productSlice";

/**
Component for displaying and editing invoice input fields.
@param {Object} props - Component props
@param {Object} props.invoice - Invoice data object
@param {Function} props.setNewInvoice - Function to update invoice data
@param {Array} props.clients - Array of client objects
@param {Array} props.products - Array of product objects
@param {Object} props.selectedProduct - Selected product object
@param {Number} props.selectedProductIndex - Index of the selected product
@returns {JSX.Element} - Rendered component
*/
const InvoiceInputs = ({
  handleInvoiceNumberChange,
  productTaxRate,
  handleAddCard,
  invoice,
  setNewInvoice,
  clients,
  products,
  selectedProduct,
  selectedProductIndex,
  handleClientChange,
  isInAuthentication,
  children
}) => {
  const dispatch = useDispatch()
  const invoiceA = useSelector((state) => state.invoice)
  const total = useSelector((state) => state.total)
  const product = useSelector((state) => state.product)

  console.log(invoiceA);

  const [showModal, setShowModal] = useState(false);

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
      const updatedInvoice = updateFunction(name, value, invoiceA);
      dispatch(setInvoice(updatedInvoice));
    }
  };

  const updateInvoiceNumber = (newInvoiceNumber) => {
    dispatch(
      setInvoice((prevInvoice) => ({
        ...prevInvoice,
        invoiceNumber: newInvoiceNumber,
      }))
    );
  };

   useEffect(() => {
    if (invoiceA?.products?.items?.length > 0) {
      calculateInvoiceTotal(
        invoiceA?.products?.items,
        dispatch(setSubtotal),
      );
    } else {
      dispatch(setSubtotal(0))
    }

    dispatch(setInvoice((prevInvoice) => ({
      ...prevInvoice,
      products: {
        ...prevInvoice.products,
        totalAmount: total,
      },
    })));

  }, [invoiceA?.products?.items, setTotal]);
  return (
    <InvoiceInputsContainer>
      <InfoWrapper title={"Invoice:"} />
      <InputsContent>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoiceA.invoiceNumber)}>
            Invoice Number:
          </InputSpan>
          <Input
            className={isFloating(invoiceA.invoiceNumber)}
            type="text"
            name="invoiceNumber"
            placeholder="Enter invoice number"
            value={invoiceA.invoiceNumber || ""}
            onChange={handleInvoiceNumberChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoiceA.date.invoiceDate)}>Invoice Date:</InputSpan>
          <Input
            className={isFloating(invoiceA.date.invoiceDate)}
            type="date"
            name="invoiceDate"
            value={invoiceA.date.invoiceDate || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoiceA.date.dueDate)}>Due Date:</InputSpan>
          <Input
            className={isFloating(invoiceA.date.dueDate)}
            type="date"
            name="dueDate"
            value={invoiceA.date.dueDate || ""}
            onChange={handleChange}
          />
        </InputsContainer>
      </InputsContent>
      <InfoWrapper title={"Bill from:"} />
      <InputsContent>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoiceA.user.name)}>
            Company name:
          </InputSpan>
          <Input
            className={isFloating(invoiceA.user.name)}
            type="text"
            name="name"
            placeholder="Enter company name"
            value={invoiceA.user.name || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoiceA.user.email)}>Email:</InputSpan>
          <Input
            className={isFloating(invoiceA.user.email)}
            type="email"
            name="email"
            placeholder="Enter email"
            value={invoiceA.user.email || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoiceA.user.phone)}>Phone:</InputSpan>
          <Input
            className={isFloating(invoiceA.user.phone)}
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={invoiceA.user.phone || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-66">
          <InputSpan className={isFloating(invoiceA.user.address.city)}>City:</InputSpan>
          <Input
            className={isFloating(invoiceA.user.address.city)}
            type="text"
            name="city"
            placeholder="Enter city"
            value={invoiceA.user.address.city || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoiceA.user.NIP)}>NIP:</InputSpan>
          <Input
            className={isFloating(invoiceA.user.NIP)}
            type="text"
            name="NIP"
            placeholder="Enter NIP"
            value={invoiceA.user.NIP || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoiceA.user.address.street)}>Address:</InputSpan>
          <Input
            className={isFloating(invoiceA.user.address.street)}
            type="text"
            name="street"
            placeholder="Enter address (street)"
            value={invoiceA.user.address.street || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoiceA.user.address.postalCode)}>
            Postal code:
          </InputSpan>
          <Input
            className={isFloating(invoiceA.user.address.postalCode)}
            type="text"
            name="postalCode"
            placeholder="Enter postal code"
            value={invoiceA.user.address.postalCode || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoiceA.user.REGON)}>REGON:</InputSpan>
          <Input
            className={isFloating(invoiceA.user.REGON)}
            type="text"
            name="REGON"
            placeholder="Enter REGON"
            value={invoiceA.user.REGON || ""}
            onChange={handleChange}
          />
        </InputsContainer>
      </InputsContent>
      <InfoWrapper title={"Bill to:"} />
      <InputsContent>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoiceA.client.clientName)}>Client name</InputSpan>
          <Input
            className={isFloating(invoiceA.client.clientName)}
            type={"text"}
            name={"clientName"}
            placeholder="Customer's name"
            value={invoiceA.client.clientName || ""}
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
          <InputSpan className={isFloating(invoiceA.client.clientEmail)}>Email</InputSpan>
          <Input
            className={isFloating(invoiceA.client.clientEmail)}
            type={"email"}
            name={"clientEmail"}
            placeholder="Customer's Email"
            value={invoiceA.client.clientEmail || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoiceA.client.clientPhone)}>
            Client phone
          </InputSpan>
          <Input
            className={isFloating(invoiceA.client.clientPhone)}
            type={"tel"}
            name={"clientPhone"}
            placeholder="Customer's Phone"
            value={invoiceA.client.clientPhone || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-66">
          <InputSpan className={isFloating(invoiceA.client.clientAddress)}> Address</InputSpan>
          <Input
            className={isFloating(invoiceA.client.clientAddress)}
            type={"text"}
            name={"clientAddress"}
            placeholder="Customer's Address"
            value={invoiceA.client.clientAddress || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoiceA.client.clientNip)}>NIP</InputSpan>
          <Input
            className={isFloating(invoiceA.client.clientNip)}
            type={"text"}
            name={"clientNip"}
            placeholder="Customer's NIP"
            value={invoiceA.client.clientNip || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoiceA.client.clientCity)}>City</InputSpan>
          <Input
            className={isFloating(invoiceA.client.clientCity)}
            type={"text"}
            name={"clientCity"}
            placeholder="City"
            value={invoiceA.client.clientCity || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoiceA.client.clientPostal)}>Postal</InputSpan>
          <Input
            className={isFloating(invoiceA.client.clientPostal)}
            type={"text"}
            name={"clientPostal"}
            placeholder="Postal"
            value={invoiceA.client.clientPostal || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoiceA.client.clientRegon)}>REGON</InputSpan>
          <Input
            className={isFloating(invoiceA.client.clientRegon)}
            type={"text"}
            name={"clientRegon"}
            placeholder="Customer's REGON"
            value={invoiceA.client.clientRegon || ""}
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
          <InputSpan className={isFloating(invoiceA.notes)}>Notes</InputSpan>
          <TextArea
            className={isFloating(invoiceA.notes)}
            name={"notes"}
            placeholder="Notes"
            value={invoiceA.notes || ""}
            onChange={handleChange}
          ></TextArea>
        </InputsContainer>
        <InputsContainer>
          <TotalSummary
            total={total}
            productTaxRate={productTaxRate}
            subtotal={product.amount}
          />
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
