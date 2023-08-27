import React, { useEffect, useState } from "react";
import ProductCard from "@components/Product/ProductCard/ProductCard";
import { InvoiceInputsContainer, TextArea } from "./InvoiceInputs.styled";
import isFloating from "@utils/isFloating";
import { IoMdAddCircleOutline } from "react-icons/io";
import clientCardMarkup from "@markups/clientCardMarkup";
import {
  AddButton,
  AddButtonWrapper,
  ButtonPDFReview,
  DefaultButton,
} from "@components/buttons.styled";
import TotalSummary from "@components/Common/TotalSummary/TotalSummary";
import {
  InputsContent,
  InputsContainer,
  InputSpan,
} from "@components/Common/InputField/Input.styled";
import InfoWrapper from "@components/Common/InfoWrapper/InfoWrapper";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "@components/Invoice/InvoicePDF/InvoicePDF";
import { useDispatch, useSelector } from "react-redux";
import {
  setInvoice,
  setInvoiceNumber,
  setCompanyName,
  setCompanyEmail,
  setInvoiceDate,
  setDueDate,
  setCompanyPhone,
  setCompanyCity,
  setCompanyPostal,
  setCompanyAddress,
  setCompanyNip,
  setCompanyRegon,
  setClientName,
  setClientEmail,
  setClientNip,
  setClientRegon,
  setClientPhone,
  setClientCity,
  setClientPostal,
  setClientAddress,
  setNotes,
  addProductToInvoice,
  updateClientData,
  setEditInvoice,
} from "@redux/invoices/single/slice";
import updateUser from "@utils/updateUser";
import updateDate from "@utils/updateDate";
import updateClient from "@utils/updateClient";
import updateNotes from "@utils/updateNotes";
import CurrentMonthInvoices from "@utils/currentMonthInvoices";
import { selectAllClients } from "@redux/clients/selectors";
import { fetchClients } from "@redux/clients/operations";
import { fetchProducts } from "@redux/products/operations";
import { selectAllProducts } from "@redux/products/selectors";
import { Types } from "mongoose";
import InputField from "../../Common/InputField/InputField";
import { inputsBillFrom, inputsBillTo, inputsGeneralInfo } from "./inputs";
import { selectIsLoggedIn } from "../../../redux/auth/selectors";

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
const InvoiceInputs = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const isInLogged = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch();
  const editingMode = useSelector((state) => state.invoice.isEditing);
  const invoice = !editingMode
    ? useSelector((state) => state.invoice.invoice)
    : useSelector((state) => state.invoice.editInvoice);
  const clients = useSelector(selectAllClients);
  const products = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(
      setInvoiceNumber(new CurrentMonthInvoices(0).generateInvoiceNumber(0))
    );
  }, [dispatch]);

  useEffect(() => {
    if (clients.length === 0) {
      dispatch(fetchClients());
    }
  }, [dispatch]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

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
    dispatch(
      addProductToInvoice({
        _id: new Types.ObjectId(),
        productsName: "",
        qty: 0,
        productsPrice: 0,
        productsTax: 0,
        amount: 0,
      })
    );
  };
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
      const updateAction = editingMode ? setEditInvoice : setInvoice;
      const updatedInvoice = updateFunction(name, value, invoice);
      dispatch(updateAction(updatedInvoice));
    }
  };
  /**
   * Handles the change of a client when selecting from the modal.
   *
   * @param {string} id - ID of the selected client.
   * @returns {void}
   */
  const handleClientChange = (id) => {
    const client = clients.find((client) => client._id === id);
    dispatch(updateClientData(client));
    console.log(client);
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
        {inputsGeneralInfo.map((input) => (
          <InputField
            key={input.id}
            {...input}
            containerClass={input.containerClass}
            value={invoice[input.data]}
            onChange={
              input.handle === "handleInvoiceNumberChange"
                ? handleInvoiceNumberChange
                : handleChange
            }
          />
        ))}
      </InputsContent>
      <InfoWrapper title={"Bill from:"} />
      <InputsContent>
        {inputsBillFrom.map((input) => (
          <InputField
            key={input.id}
            {...input}
            containerClass={input.containerClass}
            value={invoice[input.data]}
            onChange={
              input.handle === "handleInvoiceNumberChange"
                ? handleInvoiceNumberChange
                : handleChange
            }
          />
        ))}
      </InputsContent>
      <InfoWrapper title={"Bill to:"} />
      <InputsContent>
        {inputsBillTo.map((input) => (
          <InputField
            key={input.id}
            {...input}
            containerClass={input.containerClass}
            value={invoice[input.data]}
            onChange={
              input.handle === "handleInvoiceNumberChange"
                ? handleInvoiceNumberChange
                : handleChange
            }
            markup={clientCardMarkup}
            modalData={clients}
          />
        ))}
      </InputsContent>
      <InfoWrapper title={"Products:"} />
      {!isInLogged ? (
        <InputsContent>
          {invoice?.products?.items.map((product, index) => (
            <ProductCard key={product._id} index={index} product={product} />
          ))}
        </InputsContent>
      ) : (
        <InputsContent>
          {invoice?.products.items.map((product, index) => (
            <ProductCard
              key={product._id}
              index={index}
              product={product}
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
          <TotalSummary />
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
        <InputsContainer></InputsContainer>
      </InputsContent>
    </InvoiceInputsContainer>
  );
};

export default InvoiceInputs;
