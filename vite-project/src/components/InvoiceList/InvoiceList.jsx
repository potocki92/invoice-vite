import { Link } from "react-router-dom";
import {
  InvoiceListItem,
  InvoiceInner,
  InvoiceListStyled,
  EditButton,
  DeleteButton,
} from "./InvoiceList.styled";
import { homeLink } from "../../utils/linkConfig";
import InvoiceItem from "./InvoiceItem";

const InvoiceList = ({ invoices, onDelete }) => {
  const reversedInvoices = [...invoices].reverse();

  const handleRemove = (invoiceId) => {
    onDelete(invoiceId);
  };

  return (
    <InvoiceListStyled>
      {reversedInvoices?.map((invoice, index) => (
        <InvoiceItem key={index} invoice={invoice} onRemove={handleRemove} />
      ))}
    </InvoiceListStyled>
  );
};

export default InvoiceList;
