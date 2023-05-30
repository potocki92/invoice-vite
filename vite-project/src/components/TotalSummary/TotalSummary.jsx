import React from "react";
import {
  SubtotalContainer,
  SubtotalWrapper,
  Total,
  TotalHeading,
  TotalSpan,
  TotalSummaryContainer,
} from "./TotalSummary.styled";

const TotalSummary = ({ total, productTaxRate, subtotal }) => {
  console.log(total);
  return (
    <TotalSummaryContainer>
      <SubtotalContainer>
        <SubtotalWrapper>
          <TotalHeading>Subtotal</TotalHeading>
          <TotalSpan>{subtotal}</TotalSpan>
        </SubtotalWrapper>
        <SubtotalWrapper>
          <TotalHeading>Tax</TotalHeading>
          <TotalSpan>{productTaxRate}</TotalSpan>
        </SubtotalWrapper>
      </SubtotalContainer>
      <Total>
        <TotalHeading>Total</TotalHeading>
        <TotalSpan>{total}</TotalSpan>
      </Total>
    </TotalSummaryContainer>
  );
};

export default TotalSummary;
