import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import InvoiceList from "../../components/Invoice/InvoiceList/InvoiceList";
import { set } from "mongoose";
import {
  getInvoicesFromLocalStorage,
  saveInvoicesToLocalStorage,
} from "../../api/localStorageAPI";
import { useDispatch, useSelector } from "react-redux";
import { setAllInvoices } from "../../redux/allInvoicesSlice";
import { fetchInvoices } from "../../redux/operations";

/**
 * Component for managing invoices.
 * @returns {JSX.Element} - Returns a JSX element containing invoice list component.
 * @component
 * @example
 */
const Home = () => {
  let { id } = useParams();
  const dispatch = useDispatch()
  const allInvoices = useSelector((state) => state.allInvoices.allInvoices)
  const isLoading = useSelector((state) => state.allInvoices.isLoading)
  const error = useSelector((state) => state.allInvoices.error)
  const token = localStorage.getItem("token");


  console.log(allInvoices);
  useEffect(() => {
    dispatch(fetchInvoices(token))
  }, [dispatch, token]);

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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
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
