import axios from "axios";
import moment from "moment";
import { Component, useEffect } from "react";

/**
A class component that generates an invoice number in the format INV-MM/YY/NN,
fetches the number of invoices in the current month from the server, and updates
the invoice number in the new invoice form.
@extends React.Component
*/
class CurrentMonthInvoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonthInvoices: props.currentMonthInvoices,
    };
  }

  /**
  Method that generates an invoice number in the format INV-MM/YY/NN.
  @param {number} currentMonthInvoices - The current month's number of invoices.
  @returns {string} - The generated invoice number in the format INV-MM/YY/NN.
  */
  generateInvoiceNumber = (currentMonthInvoices) => {
    const month = moment().format("MM"); // actual month in format MM
    const year = moment().format("YY"); // actual year in format YY

    let number = currentMonthInvoices + 1; // number of invoice is an another number in actual month
    number = number < 10 ? `0${number}` : number; // add '0' before number of invoice

    return `INV-${month}/${year}/${number}`; // return number of invoice in INV-MM/YY/NN format
  };

  componentDidMount() {
    this.fetchCurrentMonthInvoices();
  }

  componentDidUpdate(prevProps) {
    const { currentMonthInvoices } = this.props;
    if (currentMonthInvoices !== prevProps.currentMonthInvoices) {
      this.fetchCurrentMonthInvoices();
      this.setState({ currentMonthInvoices });
    }
  }

  /**
  Method that fetches the number of invoices in the current month from the server
  and updates the currentMonthInvoices state.
  */
  fetchCurrentMonthInvoices = () => {
    const { id, setCurrentMonthInvoices } = this.props;
    const month = moment().format("MM");
    axios
      .get(`/${id}/invoices?month=${month}`)
      .then((res) => {
        setCurrentMonthInvoices(res.data.length);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { setNewInvoice } = this.props;
    const invoiceNumber = this.generateInvoiceNumber();
    setNewInvoice((prevInvoice) => ({ ...prevInvoice, invoiceNumber }));
    return null;
  }
}

export default CurrentMonthInvoices;
