import axios from "../../../utils/axiosConfig";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InvoicePDF from "../../../components/Invoice/InvoicePDF/InvoicePDF";
import { homeLink } from "../../../utils/linkConfig";
import { StyledBox } from "../../../components/Invoice/InvoiceList/InvoiceList.styled";
import InvoicePreview from "../../../components/Invoice/InvoicePreview/InvoicePreview";
import { InvoiceContainer } from "../Invoice.styled";
import InvoiceInputs from "../../../components/Invoice/InvoiceInputs/InvoiceInputs";
import { DefaultButton } from "../../../components/buttons.styled";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoiceFromId, updateInvoice } from "../../../redux/invoices/operations";
import { setEditingMode } from "../../../redux/invoiceSlice";

const InvoiceEdit = () => {
  let { invoiceId } = useParams();

  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoice.editInvoice);
  dispatch(setEditingMode(true))
  // Load invoice from database
  useEffect(() => {
    dispatch(fetchInvoiceFromId(invoiceId));
  }, [dispatch]);

  // Save all changed data
  const handleSave = async () => {
    dispatch(updateInvoice({invoiceId, invoice}))
  };

  return (
    <div className="container section is-flex col">
      <StyledBox>
        <div className="invoice__home-logo">
          <h1>Edit Invoice {invoice._id}</h1>
          <p>Invoice number: {invoice.invoiceNumber}</p>
          <Link to={homeLink}>
            <DefaultButton className="button back_button">
              Go Back
            </DefaultButton>
          </Link>
        </div>
      </StyledBox>
      <InvoiceContainer>
        <InvoiceInputs buttonComponent={DefaultButton} handleSave={handleSave}>
          <DefaultButton className="edit" onClick={handleSave}>
            Save
          </DefaultButton>
        </InvoiceInputs>
        <InvoicePreview invoice={invoice} />
      </InvoiceContainer>
    </div>
  );
};

export default InvoiceEdit;
