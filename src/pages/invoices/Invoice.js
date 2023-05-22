import { Types } from "mongoose";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import CurrentMonthInvoices from "../currentMonthIvoices";
import InvoicePDF from "../../components/InvoicePDF/InvoicePDF";
import InvoiceInputs from "../../components/InvoiceInputs/InvoiceInputs";
import { StyledBox } from "./InvoiceList.styled";
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

  const [newInvoice, setNewInvoice] = useState({
    _id: Types.ObjectId(),
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
  const token = localStorage.getItem("token");
  const getUserFromLocalStorage = localStorage.getItem("user");
  const parsedUser = JSON.parse(getUserFromLocalStorage);
  const userId = parsedUser.id;
  const [user, setUser] = useState({});
  const [currentMonthInvoices, setCurrentMonthInvoices] = useState(0);
  const [allInvoices, setAllInvoices] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductIndex, setSelectedProductIndex] = useState(-1);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  const [isFormValid, setIsFormValid] = useState(false);
  /**
   * Validates whether the new invoice data is valid.
   * @returns {boolean} - true if the form data is valid, false otherwise.
   */
  const validateForm = () => {
    if (
      newInvoice.invoiceNumber === "" ||
      Object.keys(newInvoice.client).length === 0 ||
      newInvoice.products.items.length === 0 ||
      Object.keys(newInvoice.date).length === 0
    ) {
      return false;
    }
    if (!newInvoice.invoiceNumber) {
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
            UserId: userId,
          },
        });
        setUser(response.data);
        setNewInvoice((prevInvoice) => ({
          ...prevInvoice,
          user: response.data,
        }));
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
            UserId: userId,
          },
        });
        setClients(response.data);
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
            UserId: userId,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [id]);

  /**
   * Generates an invoice number in the format INV-MM/YY/NN.
  @param {number} currentMonthInvoices - The current month's total number of invoices.
  @returns {string} - The generated invoice number.
  */
  const invoiceNumber = new CurrentMonthInvoices(
    currentMonthInvoices
  ).generateInvoiceNumber(currentMonthInvoices);

  // Sets the new invoice state with the generated invoice number
  useEffect(() => {
    setNewInvoice((prevInvoice) => ({ ...prevInvoice, invoiceNumber }));
  }, [currentMonthInvoices]);

  // Load all invoices to setAllInvoices
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const responseInvoice = await axios.get(`/invoices`, {
          headers: {
            Authorization: `Bearer ${token}`,
            UserId: userId,
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
  const handleClick = () => {
    if (isFormValid) {
      axios
        .post(
          `/addInvoice`,
          { ...newInvoice, invoiceNumber },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              UserId: userId,
            },
          }
        )
        .then((res) => {
          setAllInvoices([...allInvoices, newInvoice]); // aktualizujemy stan listy produktów
          setNewInvoice({
            _id: Types.ObjectId(), // wygeneruj nowe ID
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
          }); // resetujemy dane dotyczące produktu
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
  }, [newInvoice]);

  return (
    <div className="container section is-flex col">
      <StyledBox>
        <div className="invoice__home-logo">
          <h1>Invoice</h1>
          {allInvoices && <p>There are total {allInvoices.length} invoices</p>}
          <Link to={`/`}>
            <button className="button back_button">Go Back</button>
          </Link>
        </div>
      </StyledBox>
      <div className="invoice__content">
        <InvoiceInputs
          invoice={newInvoice}
          setNewInvoice={setNewInvoice}
          clients={clients}
          products={products}
          selectedProduct={selectedProduct}
          selectedProductIndex={selectedProductIndex}
        />
        <InvoicePDF
          invoice={newInvoice}
          setNewInvoice={setNewInvoice}
          clients={clients}
          products={products}
          selectedProduct={selectedProduct}
          selectedProductIndex={selectedProductIndex}
        />
      </div>
      <Link
        to={`/`}
        // sprawdza czy wszystkie inputy zostały uzupełnione, jeżeli tak to link zadziała
        onClick={isFormValid ? null : (e) => e.preventDefault()}
      >
        <button className="button mark__as-btn" onClick={handleClick}>
          Create Invoice
        </button>
      </Link>
    </div>
  );
};

export default Invoices;
