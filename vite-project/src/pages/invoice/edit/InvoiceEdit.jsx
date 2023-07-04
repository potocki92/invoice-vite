import axios from "../../../utils/axiosConfig";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InvoicePDF from "../../../components/Invoice/InvoicePDF/InvoicePDF";
import { homeLink } from "../../../utils/linkConfig";
import { StyledBox } from "../../../components/Invoice/InvoiceList/InvoiceList.styled";
import InvoicePreview from "../../../components/Invoice/InvoicePreview/InvoicePreview";
import { InvoiceContainer } from "../Invoice.styled";
import InvoiceInputs from "../../../components/Invoice/InvoiceInputs/InvoiceInputs";
import calculateInvoiceTotal from "../../../utils/calculateInvoiceTotal";

const InvoiceEdit = () => {
  let { id, invoiceId } = useParams();

  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    date: { dueDate: "", invoiceDate: "" },
    client: {
      clientName: "",
      clientNip: "",
      clientRegon: "",
      clientPhone: "",
      clientEmail: "",
      clientCity: "",
      clientPostal: "",
      clientAddress: "",
    },
    products: [],
  });
  const token = localStorage.getItem("token");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductIndex, setSelectedProductIndex] = useState(-1);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [loading, setLoading] = useState(true);

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

  const [dueDate, setDueDate] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [notes, setNotes] = useState("");

  const [total, setTotal] = useState(0);
  const [productTaxRate, setProductTaxRate] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  // Load invoice from database
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`/invoice/${invoiceId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setInvoice(response.data);
        setLoading(false);

        setInvoiceData(response.data); // Update other state values based on invoice data
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvoice();
  }, []);

  useEffect(() => {
    calculateInvoiceTotal(
      invoice?.products?.items,
      setSubtotal,
      setProductTaxRate,
      setTotal
    );

    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      products: {
        ...prevInvoice.products,
        totalAmount: total,
      },
    }));
  }, [invoice?.products?.items, setSubtotal, setProductTaxRate, setTotal]);
  // Set state values based on invoice data
  const setInvoiceData = (invoice) => {
    setDueDate(invoice.date?.dueDate);
    setInvoiceDate(invoice.date?.invoiceDate);
    setNotes(invoice?.notes);

    setTotal(invoice?.products.totalAmount);
    setInvoiceNumber(invoice?.invoiceNumber);
    setCompanyName(invoice.user?.name);
    setCompanyNip(invoice.user?.NIP);
    setCompanyRegon(invoice.user?.REGON);
    setCompanyEmail(invoice.user?.email);
    setCompanyPhone(invoice.user?.phone);
    setCompanyCity(invoice.user?.address.city);
    setCompanyPostal(invoice.user?.address.postalCode);
    setCompanyAddress(invoice.user?.address.street);

    setClientName(invoice.client?.clientName);
    setClientNip(invoice.client?.clientNip);
    setClientRegon(invoice.client?.clientRegon);
    setClientEmail(invoice.client?.clientEmail);
    setClientPhone(invoice.client?.clientPhone);
    setClientCity(invoice.client?.clientCity);
    setClientPostal(invoice.client?.clientPostal);
    setClientAddress(invoice.client?.clientAddress);
  };
  // Load all clients ro setClients
  console.log(invoice);
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
  // Load all products to setProducts
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

  // Change data from inputs
  const handleChange = (event, index) => {
    const { name, value } = event.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [name]: value,
      client: { ...prevInvoice.client, [name]: value },
      products:
        index === undefined
          ? prevInvoice.products
          : prevInvoice.products.map((product, i) =>
              i === index ? { ...product, [name]: value } : product
            ),
    }));
  };
  // Remove products from invoices
  const handleRemoveProduct = (index) => {
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      products: prevInvoice.products.filter((_, i) => i !== index),
    }));
  };
  // Handle to product
  const handleProductChange = (event) => {
    const productId = event.target.value;
    const product = products.find((product) => product._id === productId);
    setSelectedProduct(product);
  };
  // Added product when user select from products
  const handleAddProduct = () => {
    if (selectedProduct) {
      setInvoice((prevInvoice) => ({
        ...prevInvoice,
        products: [
          ...prevInvoice.products,
          {
            productsName: selectedProduct.productsName,
            productsQty: 1,
            productsPrice: selectedProduct.productsPrice,
          },
        ],
      }));
      setSelectedProduct(null);
    }
  };

  // Save all changed data
  const handleSave = async () => {
    try {
      const response = await axios.put(`/invoice/${invoiceId}`, invoice, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(invoice);
      console.log("Invoice updated successfully: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  /**
   * Updates the product list in the invoice state with the new product list.
   * @param {object[]} products - The new product list.
   * @returns {void}
   */
  const handleInvoiceNumberChange = (e) => {
    setInvoiceNumber(e.target.value);
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
    setInvoice({
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
    setInvoice({
      ...invoice,
      products: {
        ...invoice.products,
        items: [...invoice.products.items, {}],
      },
    });
  };

  return (
    <div className="container section is-flex col">
      <StyledBox>
        <div className="invoice__home-logo">
          <h1>Edit Invoice {invoice._id}</h1>
          <p>Invoice number: {invoice.invoiceNumber}</p>
          <Link to={homeLink}>
            <button className="button back_button">Go Back</button>
          </Link>
        </div>
      </StyledBox>
      <InvoiceContainer>
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
          handleAddCard={handleAddCard}
          handleClientChange={handleClientChange}
          handleChange={handleChange}
          invoice={invoice}
          setNewInvoice={setInvoice}
          clients={clients}
          products={products}
          selectedProduct={selectedProduct}
          selectedProductIndex={selectedProductIndex}
        />
        <InvoicePreview invoice={invoice} />
      </InvoiceContainer>

      <button className="button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default InvoiceEdit;
