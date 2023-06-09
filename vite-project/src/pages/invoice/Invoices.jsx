import { Types, set } from "mongoose";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import CurrentMonthInvoices from "../../utils/currentMonthInvoices";
import InvoicePDF from "../../components/Invoice/InvoicePDF/InvoicePDF";
import InvoiceInputs from "../../components/Invoice/InvoiceInputs/InvoiceInputs";
import { StyledBox } from "../../components/Invoice/InvoiceList/InvoiceList.styled";
import { homeLink } from "../../utils/linkConfig";
import { InvoiceContainer } from "./Invoice.styled";
import InvoicePreview from "../../components/Invoice/InvoicePreview/InvoicePreview";
import { DefaultButton } from "../../components/buttons.styled";
import updateDate from "../../utils/updateDate";
import updateClient from "../../utils/updateClient";
import updateNotes from "../../utils/updateNotes";
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
    _id: new Types.ObjectId(),
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
  const [user, setUser] = useState({});
  const [currentMonthInvoices, setCurrentMonthInvoices] = useState(0);
  const [allInvoices, setAllInvoices] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductIndex, setSelectedProductIndex] = useState(-1);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  const [isFormValid, setIsFormValid] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState(
    new CurrentMonthInvoices(currentMonthInvoices).generateInvoiceNumber(
      currentMonthInvoices
    )
  );
  const [clientName, setClientName] = useState(
    newInvoice?.client.clientName || ""
  );
  const [clientNip, setClientNip] = useState(
    newInvoice?.client.clientNip || ""
  );
  const [clientRegon, setClientRegon] = useState(
    newInvoice?.client.clientRegon || ""
  );
  const [clientEmail, setClientEmail] = useState(
    newInvoice?.client.clientEmail || ""
  );
  const [clientPhone, setClientPhone] = useState(
    newInvoice?.client.clientPhone || ""
  );
  const [clientCity, setClientCity] = useState(
    newInvoice?.client.clientCity || ""
  );
  const [clientPostal, setClientPostal] = useState(
    newInvoice?.client.clientPostal || ""
  );
  const [clientAddress, setClientAddress] = useState(
    newInvoice?.client.clientAddress || ""
  );
  const [selectedClient, setSelectedClient] = useState(
    newInvoice?.client || ""
  );
  const [dueDate, setDueDate] = useState(newInvoice?.date?.dueDate);
  const [invoiceDate, setInvoiceDate] = useState(newInvoice?.date?.invoiceDate);

  const [notes, setNotes] = useState(newInvoice?.notes?.notes || "");

  const [total, setTotal] = useState(0);
  const [productTaxRate, setProductTaxRate] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
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
  // const invoiceNumber = new CurrentMonthInvoices(
  //   currentMonthInvoices
  // ).generateInvoiceNumber(currentMonthInvoices);

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
            },
          }
        )
        .then((res) => {
          setAllInvoices([...allInvoices, newInvoice]); // aktualizujemy stan listy produktów
          setNewInvoice({
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

  const updateInvoiceNumber = (invoiceNumber) => {
    setNewInvoice({ ...newInvoice, invoiceNumber: invoiceNumber });
  };

  /**
   * Handles the change event of the invoice number input.
   * Sets the invoice number state to the input value.
   * @param {*} e
   * @returns {void}
   */

  const handleChange = (e) => {
    const { name, value } = e.target;

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

    const [setFunction, updateFunction] = updateFunctions[name];
    setFunction(value);

    if (updateFunction === updateDate) {
      const updateInvoice = updateFunction(name, value, newInvoice);
      setNewInvoice(updateInvoice);
    } else if (updateFunction === updateClient) {
      const updateInvoice = updateFunction(name, value, newInvoice);
      setNewInvoice(updateInvoice);
    } else if (updateFunction === updateNotes) {
      const updateInvoice = updateFunction(name, value, newInvoice);
      setNewInvoice(updateInvoice);
    } 
    else {
      updateFunction(name, value);
    }
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
      ...newInvoice,
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
      ...newInvoice,
      products: {
        ...newInvoice.products,
        items: [...newInvoice.products.items, {}],
      },
    });
  };

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

    if (newInvoice?.products?.items) {
      const items = newInvoice.products.items;
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
        ...newInvoice,
        products: {
          ...newInvoice.products,
          totalAmount: totalAmount,
        },
      });
    }
  }, [newInvoice?.products.items, setTotal]);

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
          handleAddCard={handleAddCard}
          handleClientChange={handleClientChange}
          handleChange={handleChange}
          invoice={newInvoice}
          setNewInvoice={setNewInvoice}
          clients={clients}
          products={products}
          selectedProduct={selectedProduct}
          selectedProductIndex={selectedProductIndex}
        />
        <InvoicePreview invoice={newInvoice} />
        {/* <InvoicePDF
          invoice={newInvoice}
          setNewInvoice={setNewInvoice}
          clients={clients}
          products={products}
          selectedProduct={selectedProduct}
          selectedProductIndex={selectedProductIndex}
        /> */}
      </InvoiceContainer>
      <Link
        to={homeLink}
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
