import { Types } from "mongoose";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InvoiceInputs from "@components/Invoice/InvoiceInputs/InvoiceInputs";
import { StyledBox } from "@components/Invoice/InvoiceList/InvoiceList.styled";
import { homeLink } from "@utils/linkConfig";
import { InvoiceContainer } from "./Invoice.styled";
import InvoicePreview from "@components/Invoice/InvoicePreview/InvoicePreview";
import { DefaultButton } from "@components/buttons.styled";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditingMode,
  setInvoice,
  setUserDetails,
} from "@redux/invoices/single/slice";
import { fetchUser } from "@redux/user/operations";
import { selectUser } from "@redux/user/selectors";
import { addInvoice } from "@redux/invoices/all/operations";
import { selectInvoice } from "@redux/invoices/single/selectors";

/**
 * This component displays the invoice list, form to add a new invoice, and the button to download an invoice as a PDF.
 * @component
 */
const Invoices = () => {
  const navigate = useNavigate();
  /**
   * Represents a new invoice.
   * @typedef {Object} NewInvoice
   * @property {Object} user - The user who created the invoice
   * @property {Object} client - The client whom the invoice is for
   * @property {Array} products - The list of products included in the invoice
   * @property {Object} date - The date information of the invoice, including the due date and the invoice date
   */

  const dispatch = useDispatch();
  const invoice = useSelector(selectInvoice);
  dispatch(setEditingMode(false));
  const user = useSelector(selectUser);
  const [currentMonthInvoices, setCurrentMonthInvoices] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showInvoicePreview, setShowInvoicePreview] = useState(false);

  const handleShowInvoicePreview = () => {
    setShowInvoicePreview(!showInvoicePreview);
  };
  /**
   * Validates whether the new invoice data is valid.
   * @returns {boolean} - true if the form data is valid, false otherwise.
   */
  const validateForm = () => {
    if (
      invoice.invoiceNumber === "" ||
      Object.keys(invoice.client).length === 0 ||
      invoice.products.items.length === 0 ||
      Object.keys(invoice.date).length === 0
    ) {
      return false;
    }
    if (!invoice.invoiceNumber) {
      return false;
    }
    return true;
  };
  /**
   * Loads the user who created the invoice.
   * @returns {void}
   */
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user && Object.keys(user).length !== 0) {
      dispatch(setUserDetails(user));
    }
  }, [dispatch, user]);

  /**
   * Handles the click event of the "Create Invoice" button.
   * Sends a request to the server to add a new invoice with the data from the new invoice state.
   * Updates the allInvoices state with the new invoice data.
   * Resets the newInvoice state to empty fields.
   * Increments the currentMonthInvoices state by 1.
   * Displays an alert if the form is not valid.
   */
  const handleSave = () => {
    if (isFormValid) {
      // Send a POST request to add a new invoice to the server
      const newInvoice = {
        ...invoice,
        _id: new Types.ObjectId(),
      };
      dispatch(addInvoice(newInvoice))
        .then((res) => {
          console.log("Invoice has been saved to the database.");

          // Prepare a new empty invoice state without the _id field
          const newInvoiceState = {
            _id: "",
            invoiceNumber: "",
            user: { address: {} },
            client: {},
            products: {
              items: [
                {
                  productsName: "",
                  qty: 0,
                  productsPrice: 0,
                  productsTax: 0,
                  productTaxRate: 0,
                  amount: 0,
                },
              ],
              totalAmount: 0,
            },
            date: {
              dueDate: new Date().toISOString().substring(0, 10),
              invoiceDate: new Date().toISOString().substring(0, 10),
            },
          };

          // Update the invoice state in Redux with the new empty state
          dispatch(setInvoice(newInvoiceState));

          // Increment the currentMonthInvoices state by 1
          setCurrentMonthInvoices(currentMonthInvoices + 1);
          navigate(homeLink);
        })
        .catch((err) => console.error("Error while saving the invoice:", err));
    } else {
      alert("Please fill in all the form fields.");
    }
  };

  //  Validates the new invoice form and sets the isFormValid state to true if it is valid.
  useEffect(() => {
    setIsFormValid(validateForm());
  }, [invoice]);

  return (
    <div className="container is-flex col">
      <StyledBox>
        <div className="invoice__home-logo">
          <Link to={`/invoice-vite`}>
            <DefaultButton className="back">Go Back</DefaultButton>
          </Link>
        </div>
      </StyledBox>
      <InvoiceContainer>
        <InvoiceInputs
          buttonComponent={DefaultButton}
          handleSave={handleSave}
          handleShowInvoicePreview={handleShowInvoicePreview}
        >
          <DefaultButton className="edit" onClick={handleSave}>
            Save
          </DefaultButton>
        </InvoiceInputs>
        {showInvoicePreview ? <InvoicePreview invoice={invoice} /> : null}
      </InvoiceContainer>
    </div>
  );
};

export default Invoices;
