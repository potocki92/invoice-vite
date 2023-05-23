import { Link } from "react-router-dom";
import { InvoiceListItem, InvoiceInner, InvoiceListStyled, EditButton, DeleteButton } from "./InvoiceList.styled";
import { homeLink } from "../../utils/linkConfig";

const InvoiceList = ({ invoices, onDelete }) => {
  const reversedInvoices = [...invoices].reverse();

  return (
    <InvoiceListStyled>
      {reversedInvoices?.map((invoice, index) => (
        <InvoiceListItem key={index}>
          <InvoiceInner>
            <p>
              {invoice.invoiceNumber}
            </p>
            <p>
              {invoice.client.clientName}
            </p>
            <p>
              {invoice.date.invoiceDate}
            </p>
          </InvoiceInner>
          <Link to={`${homeLink}/invoice/${invoice._id}`}>
            <EditButton>Edit</EditButton>
          </Link>
          <DeleteButton onClick={() => onDelete(invoice._id)}>
            Delete
          </DeleteButton>
        </InvoiceListItem>
      ))}
    </InvoiceListStyled>
  );
};

export default InvoiceList;
