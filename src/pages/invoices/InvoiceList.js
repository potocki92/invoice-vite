import { Link } from "react-router-dom";
import { Container, CardWrapper, ProductName } from "./InvoiceList.styled";

const InvoiceList = ({ id, invoices, onDelete }) => {
  const reversedInvoices = [...invoices].reverse();

  return (
    <Container>
      {reversedInvoices?.map((invoice, index) => (
        <CardWrapper key={index}>
          <ProductName>
            <div>
              <p>Invoice:</p>
              {invoice.invoiceNumber}
            </div>
            <div>
              <p>Client:</p>
              {invoice.client.clientName}
            </div>
            <div>
              <p>Invoice Date:</p>
              {invoice.date.invoiceDate}
            </div>
            <div>
              <p>Invoice Due:</p>
              {invoice.date.dueDate}
            </div>
          </ProductName>
          <Link to={`/invoice/${invoice._id}`}>
            <button className="button">Edit</button>
          </Link>
          <button className="button" onClick={() => onDelete(invoice._id)}>
            Delete
          </button>
        </CardWrapper>
      ))}
    </Container>
  );
};

export default InvoiceList;
