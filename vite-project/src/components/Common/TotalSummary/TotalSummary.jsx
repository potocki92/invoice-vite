import React from "react";
import {
  SubtotalContainer,
  SubtotalWrapper,
  Total,
  TotalHeading,
  TotalSpan,
  TotalSummaryContainer,
} from "./TotalSummary.styled";
import { useSelector } from "react-redux";

/**
 * This component displays the total summary of the invoice.
 * @component
 * @param {Object} props
 * @param {number} props.productTaxRate - The tax rate of the invoice
 * @param {number} props.subtotal - The subtotal of the invoice
 * @returns {JSX.Element} - JSX component
 * @example
 * return (
 *  <TotalSummary
 *    productTaxRate={productTaxRate}
 *  />
 * );
 */
const TotalSummary = () => {
  const isEditing = useSelector((state) => state.invoice.isEditing);
  const invoiceData = isEditing
    ? useSelector((state) => state.invoice.editInvoice) // Dla edycji pobieramy dane z editInvoice
    : useSelector((state) => state.invoice.invoice); // Dla nowej faktury pobieramy dane z invoice

  const products = invoiceData.products;
  const total = products.totalAmount;
  const items = products.items;
  const subtotal = items.reduce(
    (accumulator, currentAmount) =>
      accumulator + currentAmount.productsPrice * currentAmount.qty,
    0
  );

  const productTaxRate = items.reduce(
    (accumulator, currentProduct) =>
      accumulator +
      currentProduct.qty *
        currentProduct.productsPrice *
        (currentProduct.productsTax / 100),
    0
  );
  const formattedProductTaxRate = productTaxRate.toFixed(2);
  return (
    <TotalSummaryContainer>
      <SubtotalContainer>
        <SubtotalWrapper>
          <TotalHeading>Subtotal</TotalHeading>
          <TotalSpan>{isNaN(subtotal) ? "0.00" : subtotal}</TotalSpan>
        </SubtotalWrapper>
        <SubtotalWrapper>
          <TotalHeading>Tax</TotalHeading>
          <TotalSpan>
            {isNaN(formattedProductTaxRate) ? "0.00" : formattedProductTaxRate}
          </TotalSpan>
        </SubtotalWrapper>
      </SubtotalContainer>
      <Total>
        <TotalHeading>Total</TotalHeading>
        <TotalSpan>{isNaN(total) ? "0.00" : total}</TotalSpan>
      </Total>
    </TotalSummaryContainer>
  );
};

export default TotalSummary;
