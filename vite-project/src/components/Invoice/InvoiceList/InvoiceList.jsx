import InvoiceItem from "../InvoiceItem/InvoiceItem";
import { InvoiceListStyled } from "./InvoiceList.styled";

/**
 * Represents a component that displays a list of invoices.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Array<Invoice>} props.invoices - An array of invoice objects to be displayed.
 * @param {Function} props.onDelete - A function to be called when an invoice is deleted.
 * @returns {JSX.Element} - The rendered InvoiceList component.
 */
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
