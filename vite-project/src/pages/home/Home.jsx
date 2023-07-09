import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import InvoiceList from "../../components/Invoice/InvoiceList/InvoiceList";
import { set } from "mongoose";
import {
  getInvoicesFromLocalStorage,
  saveInvoicesToLocalStorage,
} from "../../api/localStorageAPI";

/**
 * Component for managing invoices.
 * @returns {JSX.Element} - Returns a JSX element containing invoice list component.
 * @component
 * @example
 */
const Home = () => {
  let { id } = useParams();
  const [allInvoices, setAllInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`/invoices`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        const invoicesToSave = response.data.map((invoice) => ({
          _id: invoice._id,
          invoiceNumber: invoice.invoiceNumber,
          clientName: invoice.clientName,
          dueDate: invoice.dueDate
        }));
    
        saveInvoicesToLocalStorage(invoicesToSave);
        setAllInvoices(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  /**
   * Deletes a product from the database and updates the state of allProducts.
   * @param {string} invoiceId - The ID of the product to be deleted.
   * @returns {void}
   */
  const deleteProduct = (invoiceId) => {
    axios
      .delete(`/invoice/${invoiceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAllInvoices(
          allInvoices.filter((product) => product._id !== invoiceId)
        );
      })
      .catch((err) => console.error(err));
  };
  return (
    <main className="container">
      <div className="invoice__home">
        <div className="invoice__home-logo">
          <h1>Invoice</h1>
          {allInvoices && <p>There are total {allInvoices.length} invoices</p>}
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <InvoiceList id={id} invoices={allInvoices} onDelete={deleteProduct} />
      )}
    </main>
  );
};

export default Home;
