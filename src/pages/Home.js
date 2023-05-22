import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../utils/axiosConfig";
import InvoiceList from "./invoices/InvoiceList";

const Home = () => {
  let { id } = useParams();
  const [allInvoices, setAllInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const getUserFromLocalStorage = localStorage.getItem("user");
  const parsedUser = JSON.parse(getUserFromLocalStorage);
  const userId = parsedUser.id;

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`/invoices`, {
          headers: {
            Authorization: `Bearer ${token}`,
            UserId: userId,
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
          UserId: userId,
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
