import React from "react";
import {
  SubtotalContainer,
  SubtotalWrapper,
  Total,
  TotalHeading,
  TotalSpan,
  TotalSummaryContainer,
} from "./TotalSummary.styled";

/**
 * This component displays the total summary of the invoice.
 * @component
 * @param {Object} props
 * @param {number} props.total - The total amount of the invoice
 * @param {number} props.productTaxRate - The tax rate of the invoice
 * @param {number} props.subtotal - The subtotal of the invoice
 * @returns {JSX.Element} - JSX component
 * @example
 * return (
 *  <TotalSummary
 *    total={total}
 *    productTaxRate={productTaxRate}
 *    subtotal={subtotal}
 *  />
 * );
 */
const TotalSummary = ({ total, productTaxRate, subtotal }) => {
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
            {isNaN(productTaxRate) ? "0.00" : productTaxRate}
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
