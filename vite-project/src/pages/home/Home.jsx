import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import InvoiceList from "../../components/InvoiceList/InvoiceList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
        setAllInvoices(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchInvoices();
  }, []);

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
        <DndProvider backend={HTML5Backend}>
          <InvoiceList
            id={id}
            invoices={allInvoices}
            onDelete={deleteProduct}
          />
        </DndProvider>
      )}
    </main>
  );
};

export default Home;
