import React, { useEffect, useState } from "react";
import ProductCard from "../../Product/ProductCard/ProductCard";
import {
  InvoiceInputsContainer,
  TextArea,
} from "./InvoiceInputs.styled";
import isFloating from "../../../utils/isFloating";
import { HiUsers } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { createPortal } from "react-dom";
import Modal from "../../Common/Modal/Modal";
import { ModalButton } from "../../Common/Modal/Modal.styled";
import clientCardMarkup from "../../../markups/clientCardMarkup,js";
import { AddButton, AddButtonWrapper, DefaultButton } from "../../buttons.styled";
import TotalSummary from "../../Common/TotalSummary/TotalSummary";
import { InputsContent, InputsContainer, Input, InputSpan } from "../../Common/InputField/Input.styled";
import InfoWrapper from "../../Common/InfoWrapper/InfoWrapper";

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
  invoice,
  setNewInvoice,
  clients,
  products,
  selectedProduct,
  selectedProductIndex,
  isInAuthentication,
}) => {
  const [invoiceNumber, setInvoiceNumber] = useState(invoice?.invoiceNumber || "");
  const [clientName, setClientName] = useState(invoice?.client.clientName || "");
  const [clientNip, setClientNip] = useState(invoice?.client.clientNip || "");
  const [clientRegon, setClientRegon] = useState(
    invoice?.client.clientRegon || ""
  );
  const [clientEmail, setClientEmail] = useState(
    invoice?.client.clientEmail || ""
  );
  const [clientPhone, setClientPhone] = useState(
    invoice?.client.clientPhone || ""
  );
  const [clientCity, setClientCity] = useState(invoice?.client.clientCity || "");
  const [clientPostal, setClientPostal] = useState(
    invoice?.client.clientPostal || ""
  );
  const [clientAddress, setClientAddress] = useState(
    invoice?.client.clientAddress || ""
  );
  const [selectedClient, setSelectedClient] = useState(invoice?.client || "");
  const [dueDate, setDueDate] = useState(invoice?.date?.dueDate);
  const [invoiceDate, setInvoiceDate] = useState(invoice?.date?.invoiceDate);
  const [total, setTotal] = useState(0);
  const [productTaxRate, setProductTaxRate] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [notes, setNotes] = useState(invoice?.notes?.notes || "");
  const [showModal, setShowModal] = useState(false);

  /*
      This code uses the useEffect hook to calculate the total amount of the products in an invoice 
      whenever the invoice.products.items array changes.
  
      Inside the hook, it first initializes the totalAmount variable to zero. 
      Then, it checks if the invoice.products.items array exists by using optional chaining (?.). 
      If it does, it uses the reduce method to iterate over each item in the array and accumulate 
      the amount property of each item into the totalAmount variable.
  
      Finally, the setTotal function is called with the totalAmount value to update the state of the component.
  
      This code demonstrates the use of the reduce method to perform a calculation on an array 
      and how to update the state of a React component using the setTotal function.
    */
  useEffect(() => {
    let totalAmount = 0;
    let productTaxRate = 0;
    let subtotal = 0;

    if (invoice?.products?.items) {
      const items = invoice.products.items;
      totalAmount = items.reduce(
        (accumulator, currentAmount) => accumulator + currentAmount.amount,
        0
      );
      productTaxRate = items.reduce(
        (accumulator, currentAmount) =>
          accumulator + currentAmount.productTaxRate,
        0
      );
      subtotal = items.reduce(
        (accumulator, currentAmount) =>
          accumulator + currentAmount.productsPrice * currentAmount.productsQty,
        0
      );
      setSubtotal(subtotal);
      setProductTaxRate(productTaxRate);
      setTotal(totalAmount);
      setNewInvoice({
        ...invoice,
        products: {
          ...invoice.products,
          totalAmount: totalAmount,
        },
      });
    }
  }, [invoice?.products.items, setTotal]);

  /**
   * This function updates the client data in the invoice.
   * @param {string} key - The property to update in the client object.
   * @param {string} value - The new value for the specified property.
   */
  const updateClient = (key, value) => {
    const updateClient = {
      ...invoice.client,
      [key]: value,
    };

    setNewInvoice({ ...invoice, client: updateClient });
  };

  /**
   * This function updates the date in the invoice.
   * @param {string} key - The property to update in the date object.
   * @param {string} value - The new value for the specified property.
   */
  const updateDate = (key, value) => {
    const updateDate = {
      ...invoice.date,
      [key]: value,
    };

    setNewInvoice({ ...invoice, date: updateDate });
  };

  /**
   * This function updates the notes in the invoice.
   * @param {string} value - The new value for the notes property.
   */
  const updateNotes = (value) => {
    setNewInvoice({ ...invoice, notes: value });
  };

  const updateInvoiceNumber = (value) => {
    setNewInvoice({ ...invoice, invoiceNumber: value });
  };
  /**
   * Updates the selected client and invoice state based on the selected client ID.
   * @param {string} id - The ID of the selected client.
   * @returns {void}
   */
  const handleClientChange = (id) => {
    const client = clients.find((client) => client._id === id);
    setSelectedClient(client);
    setClientName(client.clientName);
    setClientNip(client.clientNip);
    setClientRegon(client.clientRegon);
    setClientEmail(client.clientEmail);
    setClientPhone(client.clientPhone);
    setClientCity(client.clientCity);
    setClientPostal(client.clientPostal);
    setClientAddress(client.clientAddress);
    setNewInvoice({
      ...invoice,
      client: {
        clientName: client.clientName,
        clientNip: client.clientNip,
        clientRegon: client.clientRegon,
        clientEmail: client.clientEmail,
        clientPhone: client.clientPhone,
        clientCity: client.clientCity,
        clientPostal: client.clientPostal,
        clientAddress: client.clientAddress,
      },
    });
  };

  /**
    Adds an empty product item to the invoice's product list.
    @returns {void}
    */
  const handleAddCard = () => {
    setNewInvoice({
      ...invoice,
      products: {
        ...invoice.products,
        items: [...invoice.products.items, {}],
      },
    });
  };

  /**
   * Handle changes to the input fields.
   *
   * @param {Object} event - The event object.
   * @param {string} event.target.name - The name of the input field that triggered the event.
   * @param {string} event.target.value - The value of the input field.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

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
    };

    const [updateState, updateClientData] = updateFunctions[name];
    updateState(value);
    updateClientData(name, value);
  };
  /**
   * Updates the notes value and calls the updateNotes function.
   * @param {Object} event - The event object.
   * @param {string} event.target.value - The value of the input field.
   * @returns {void}
   */
  const handleChangeNotes = (event) => {
    const { value } = event.target;
    setNotes(value);
    updateNotes(value);
  };

  return (
    <InvoiceInputsContainer>
      <InputsContent>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(invoiceNumber)}>Invoice Number:</InputSpan>
          <Input
              className={isFloating(invoiceNumber)}
              type="text"
              name="invoiceNumber" 
              placeholder="Enter invoice number"
              value={invoiceNumber}
              onChange={handleChange}
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
      <InfoWrapper title={"Bill to:"}/>
      <InputsContent>
        <InputsContainer className="full-66">
          <InputSpan className={isFloating(clientName)}>Client name</InputSpan>
          <Input
            className={isFloating(clientName)}
            type={"text"}
            name={"clientName"}
            placeholder="Client name"
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
            placeholder="Client Email"
            value={clientEmail}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer>
          <InputSpan className={isFloating(clientPhone)}>
            Client phone
          </InputSpan>
          <Input
            className={isFloating(clientPhone)}
            type={"tel"}
            name={"clientPhone"}
            placeholder="Client phone"
            value={clientPhone}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer>
          <InputSpan className={isFloating(clientNip)}>NIP</InputSpan>
          <Input
            className={isFloating(clientNip)}
            type={"text"}
            name={"clientNip"}
            placeholder="NIP"
            value={clientNip}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer>
          <InputSpan className={isFloating(clientRegon)}>REGON</InputSpan>
          <Input
            className={isFloating(clientRegon)}
            type={"text"}
            name={"clientRegon"}
            placeholder="REGON"
            value={clientRegon}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer>
          <InputSpan className={isFloating(clientAddress)}> Address</InputSpan>
          <Input
            className={isFloating(clientAddress)}
            type={"text"}
            name={"clientAddress"}
            placeholder="Company's Address"
            value={clientAddress}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer>
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
        <InputsContainer>
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
      </InputsContent>
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
            onChange={handleChangeNotes}
          ></TextArea>
        </InputsContainer>
        <InputsContainer>
          <TotalSummary total={total} productTaxRate={productTaxRate} subtotal={subtotal}/>
        </InputsContainer>
        <InputsContainer>
          <DefaultButton className="submit">Submit</DefaultButton>
        </InputsContainer>
      </InputsContent>
    </InvoiceInputsContainer>
  );
};

export default InvoiceInputs;
