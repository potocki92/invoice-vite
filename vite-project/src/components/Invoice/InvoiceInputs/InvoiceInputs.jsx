import React, { useEffect, useState } from "react";
import ProductCard from "../../Product/ProductCard/ProductCard";
import { InvoiceInputsContainer, TextArea } from "./InvoiceInputs.styled";
import isFloating from "../../../utils/isFloating";
import { HiUsers } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { createPortal } from "react-dom";
import Modal from "../../Common/Modal/Modal";
import { ModalButton } from "../../Common/Modal/Modal.styled";
import clientCardMarkup from "../../../markups/clientCardMarkup,js";
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
  invoiceNumber,
  companyName,
  companyEmail,
  companyAddress,
  companyCity,
  companyPostal,
  companyPhone,
  companyNip,
  companyRegon,
  clientName,
  clientEmail,
  clientPhone,
  clientCity,
  clientPostal,
  clientAddress,
  clientNip,
  clientRegon,
  invoiceDate,
  dueDate,
  notes,
  total,
  productTaxRate,
  subtotal,
  handleAddCard,
  handleChange,
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
  const [showModal, setShowModal] = useState(false);

  return (
    <InvoiceInputsContainer>
      <InfoWrapper title={"Invoice:"} />
      <InputsContent>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoiceNumber)}>
            Invoice Number:
          </InputSpan>
          <Input
            className={isFloating(invoiceNumber)}
            type="text"
            name="invoiceNumber"
            placeholder="Enter invoice number"
            value={invoiceNumber}
            onChange={handleInvoiceNumberChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className="floating">Invoice Date:</InputSpan>
          <Input
            className="floating"
            type="date"
            name="invoiceDate"
            value={invoiceDate}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className="floating">Due Date:</InputSpan>
          <Input
            className="floating"
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={handleChange}
          />
        </InputsContainer>
      </InputsContent>
      <InfoWrapper title={"Bill from:"} />
      <InputsContent>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(companyName)}>
            Company name:
          </InputSpan>
          <Input
            className={isFloating(companyName)}
            type="text"
            name="name"
            placeholder="Enter company name"
            value={companyName}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(companyEmail)}>Email:</InputSpan>
          <Input
            className={isFloating(companyEmail)}
            type="email"
            name="email"
            placeholder="Enter email"
            value={companyEmail}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(companyPhone)}>Phone:</InputSpan>
          <Input
            className={isFloating(companyPhone)}
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={companyPhone}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-66">
          <InputSpan className={isFloating(companyCity)}>City:</InputSpan>
          <Input
            className={isFloating(companyCity)}
            type="text"
            name="city"
            placeholder="Enter city"
            value={companyCity}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(companyNip)}>NIP:</InputSpan>
          <Input
            className={isFloating(companyNip)}
            type="text"
            name="NIP"
            placeholder="Enter NIP"
            value={companyNip}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(companyAddress)}>Address:</InputSpan>
          <Input
            className={isFloating(companyAddress)}
            type="text"
            name="street"
            placeholder="Enter address (street)"
            value={companyAddress}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(companyPostal)}>
            Postal code:
          </InputSpan>
          <Input
            className={isFloating(companyPostal)}
            type="text"
            name="postalCode"
            placeholder="Enter postal code"
            value={companyPostal}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(companyRegon)}>REGON:</InputSpan>
          <Input
            className={isFloating(companyRegon)}
            type="text"
            name="REGON"
            placeholder="Enter REGON"
            value={companyRegon}
            onChange={handleChange}
          />
        </InputsContainer>
      </InputsContent>
      <InfoWrapper title={"Bill to:"} />
      <InputsContent>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(clientName)}>Client name</InputSpan>
          <Input
            className={isFloating(clientName)}
            type={"text"}
            name={"clientName"}
            placeholder="Customer's name"
            value={clientName}
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
          <InputSpan className={isFloating(clientEmail)}>Email</InputSpan>
          <Input
            className={isFloating(clientEmail)}
            type={"email"}
            name={"clientEmail"}
            placeholder="Customer's Email"
            value={clientEmail}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(clientPhone)}>
            Client phone
          </InputSpan>
          <Input
            className={isFloating(clientPhone)}
            type={"tel"}
            name={"clientPhone"}
            placeholder="Customer's Phone"
            value={clientPhone}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-66">
          <InputSpan className={isFloating(clientAddress)}> Address</InputSpan>
          <Input
            className={isFloating(clientAddress)}
            type={"text"}
            name={"clientAddress"}
            placeholder="Customer's Address"
            value={clientAddress}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(clientNip)}>NIP</InputSpan>
          <Input
            className={isFloating(clientNip)}
            type={"text"}
            name={"clientNip"}
            placeholder="Customer's NIP"
            value={clientNip}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(clientCity)}>City</InputSpan>
          <Input
            className={isFloating(clientCity)}
            type={"text"}
            name={"clientCity"}
            placeholder="City"
            value={clientCity}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(clientPostal)}>Postal</InputSpan>
          <Input
            className={isFloating(clientPostal)}
            type={"text"}
            name={"clientPostal"}
            placeholder="Postal"
            value={clientPostal}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(clientRegon)}>REGON</InputSpan>
          <Input
            className={isFloating(clientRegon)}
            type={"text"}
            name={"clientRegon"}
            placeholder="Customer's REGON"
            value={clientRegon}
            onChange={handleChange}
          />
        </InputsContainer>
      </InputsContent>
      <InfoWrapper title={"Products:"} />
      {!isInAuthentication ? (
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
          <InputSpan className={isFloating(notes)}>Notes</InputSpan>
          <TextArea
            className={isFloating(notes)}
            name={"notes"}
            placeholder="Notes"
            value={notes}
            onChange={handleChange}
          ></TextArea>
        </InputsContainer>
        <InputsContainer>
          <TotalSummary
            total={total}
            productTaxRate={productTaxRate}
            subtotal={subtotal}
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
