import { Types } from "mongoose";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import InvoiceInputs from "../../components/Invoice/InvoiceInputs/InvoiceInputs";
import { StyledBox } from "../../components/Invoice/InvoiceList/InvoiceList.styled";
import { homeLink } from "../../utils/linkConfig";
import { InvoiceContainer } from "./Invoice.styled";
import InvoicePreview from "../../components/Invoice/InvoicePreview/InvoicePreview";
import { DefaultButton } from "../../components/buttons.styled";
import { saveNewInvoiceToLocalStorage } from "../../api/localStorageAPI";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/productSlice";
import { setInvoice, setUserDetails } from "../../redux/invoiceSlice";
import { setClients } from "../../redux/clientsSlice";
/**
 * This component displays the invoice list, form to add a new invoice, and the button to download an invoice as a PDF.
 * @component
 */
const Invoices = () => {
  let { id } = useParams();
  /**
   * Represents a new invoice.
   * @typedef {Object} NewInvoice
   * @property {Object} user - The user who created the invoice
   * @property {Object} client - The client whom the invoice is for
   * @property {Array} products - The list of products included in the invoice
   * @property {Object} date - The date information of the invoice, including the due date and the invoice date
   */

  const dispatch = useDispatch()
  const invoice = useSelector((state) => state.invoice)

  console.log(invoice);
  const token = localStorage.getItem("token");
  const [currentMonthInvoices, setCurrentMonthInvoices] = useState(0);
  const [allInvoices, setAllInvoices] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
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
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setUserDetails(response.data))
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [id]);
  /**
   * Loads all clients to setClients.
   * @returns {void}
   */
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`/clients`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setClients(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchClients();
  }, [id]);
  /**
   * Loads all products to setProducts.
   * @returns {void}
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setProducts(response.data))
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [id]);

  // Load all invoices to setAllInvoices
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const responseInvoice = await axios.get(`/invoices`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllInvoices(responseInvoice.data);
        setCurrentMonthInvoices(responseInvoice.data.length);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvoices();
  }, [id]);
  /**
  Handles the click event of the "Create Invoice" button.
  Sends a request to the server to add a new invoice with the data from the new invoice state.
  Updates the allInvoices state with the new invoice data.
  Resets the newInvoice state to empty fields.
  Increments the currentMonthInvoices state by 1.
  Displays an alert if the form is not valid.
  */
  const handleSave = () => {
    if (isFormValid) {
      axios
        .post(
          `/addInvoice`,
          { ...invoice, invoiceNumber },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const invoicesToSave = {
            _id: invoice._id,
            invoiceNumber: invoice.invoiceNumber,
            name: invoice.user.name,
            clientName: invoice.client.clientName,
            date: invoice.date,
          };
          saveNewInvoiceToLocalStorage(invoicesToSave);
          dispatch(setInvoice({
            _id: new Types.ObjectId(), // wygeneruj nowe ID
            invoiceNumber: "",
            client: {
              clientName: "",
              clientNip: "",
              clientRegon: "",
              clientEmail: "",
              clientPhone: "",
              clientCity: "",
              clientPostal: "",
              clientAddress: "",
            },
            products: {},
            date: {
              dueDate: "",
              invoiceDate: "",
            },
          })); // resetujemy dane dotyczące produktu
          setCurrentMonthInvoices(currentMonthInvoices + 1);
        })
        .catch((err) => console.error(err));
    } else {
      alert("Wypełnij wszystkie pola formularza.");
    }
  };

  //  Validates the new invoice form and sets the isFormValid state to true if it is valid.
  useEffect(() => {
    setIsFormValid(validateForm());
  }, [invoice]);

  return (
    <div className="container section is-flex col">
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
        >
          <DefaultButton className="edit" onClick={handleSave}>
            <Link
              to={homeLink}
              onClick={isFormValid ? null : (e) => e.preventDefault()}
            >
              Save
            </Link>
          </DefaultButton>
        </InvoiceInputs>
        <InvoicePreview invoice={invoice} />
      </InvoiceContainer>
    </div>
  );
};

export default Invoices;
