import {
  InvoiceListStyled
} from "./InvoiceList.styled";
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
