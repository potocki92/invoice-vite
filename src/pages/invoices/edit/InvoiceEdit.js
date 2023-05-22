import axios from "../../../utils/axiosConfig";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InvoicePDF from "../../../components/InvoicePDF/InvoicePDF";
import { StyledBox } from "../InvoiceList.styled";

const InvoiceEdit = () => {
  let { id, invoiceId } = useParams();

  const [invoice, setInvoice] = useState({
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
  const getUserFromLocalStorage = localStorage.getItem("user");
  const parsedUser = JSON.parse(getUserFromLocalStorage);
  const userId = parsedUser.id;
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  // Load invoice from database
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`/invoice/${invoiceId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            UserId: userId,
          },
        });
        setInvoice(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvoice();
  }, [id, invoiceId]);

  // Load all clients ro setClients
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
  // Load all products to setProducts
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
          UserId: userId,
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
  return (
    <div className="container section is-flex col">
      <StyledBox>
        <div className="invoice__home-logo">
          <h1>Edit Invoice {invoice._id}</h1>
          <p>Invoice number: {invoice.invoiceNumber}</p>
          <Link to={`/`}>
            <button className="button back_button">Go Back</button>
          </Link>
        </div>
      </StyledBox>
      <div className="invoice__content col">
        <InvoicePDF
          invoice={invoice}
          setNewInvoice={setInvoice}
          handleChange={handleChange}
          clients={clients}
          products={products}
          selectedProduct={selectedProduct}
        />
      </div>
      <button className="button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default InvoiceEdit;
