import { getInvoicesFromLocalStorage } from "../../../api/localStorageAPI";
import InvoiceItem from "../InvoiceItem/InvoiceItem";
import { InvoiceListStyled } from "./InvoiceList.styled";

const InvoiceList = ({ invoices, onDelete }) => {
  const reversedInvoices = [...invoices].reverse();

  return (
    <InvoiceListStyled>
      {reversedInvoices?.map((invoice) => (
        <InvoiceItem key={invoice._id} invoice={invoice} onDelete={onDelete} />
      ))}
    </InvoiceListStyled>
  );
};

export default InvoiceList;
