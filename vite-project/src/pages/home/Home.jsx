import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import InvoiceList from "../../components/Invoice/InvoiceList/InvoiceList";
import { useDispatch, useSelector } from "react-redux";
import { selectAllInvoices } from "../../redux/invoices/selectors";
import { fetchInvoices } from "../../redux/invoices/operations";
import { selectToken } from "../../redux/auth/selectors";

const Home = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const invoices = useSelector(selectAllInvoices);
  const token = useSelector(selectToken)
  const isLoading = useSelector((state) => state.allInvoices.isLoading);
  const error = useSelector((state) => state.allInvoices.error);

  useEffect(() => {
    if (invoices.length === 0 && token) {
      dispatch(fetchInvoices(token));
    }
  },[dispatch, invoices, token])
  /**
   * Deletes an invoice from the database and updates the state of allInvoices.
   * @param {string} invoiceId - The ID of the invoice to be deleted.
   * @returns {void}
   */
  const deleteInvoice = (invoiceId) => {
    axios
      .delete(`/invoice/${invoiceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        // After successful delete, dispatch fetchInvoices again to update allInvoices state
        // dispatch(fetchInvoices());
      })
      .catch((err) => console.error(err));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log("invoices", invoices);
  return (
    <main className="container">
      <div className="invoice__home">
        <div className="invoice__home-logo">
          <h1>Invoice</h1>
          {invoices && <p>There are total {invoices.length} invoices</p>}
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <InvoiceList id={id} invoices={invoices} onDelete={deleteInvoice} />
      )}
    </main>
  );
};

export default Home;
