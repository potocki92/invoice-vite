import React from "react";
import {
  InvoicePreviewContainer,
  InvoicePreviewContent,
  InvoicePreviewSpan,
  InvoicePreviewText,
  InvoicePreviewTitle,
  InvoicePreviewWrapper,
} from "./InvoicePreview.styled";

const styles = {
  textAlign: "right",
  productPadding: "0.5rem 0.5rem 0.5rem",
  productSummaryPadding: "0.5rem 0.5rem 0.5rem",
  borderBottom: "1px solid #e3e3e3",
};

const InvoicePreview = ({ invoice }) => {
  return (
    // Invoice preview container
    <InvoicePreviewContainer>
      {/* Invoice preview header */}
      <InvoicePreviewContent
        padding={"0.5rem 0 1rem 0"}
        borderBottom={styles.borderBottom}
      >
        <InvoicePreviewWrapper>
          <InvoicePreviewText>{invoice.invoiceNumber}</InvoicePreviewText>
          <InvoicePreviewWrapper>
            <InvoicePreviewText fontSize="0.5rem">
              Invoice Date: {invoice.date?.invoiceDate}
            </InvoicePreviewText>
            <InvoicePreviewText fontSize="0.5rem">
              Due Date: {invoice.date?.dueDate}
            </InvoicePreviewText>
          </InvoicePreviewWrapper>
        </InvoicePreviewWrapper>
        <InvoicePreviewWrapper width="50%">
          <InvoicePreviewTitle textAlign={styles.textAlign}>
            Invoice
          </InvoicePreviewTitle>
        </InvoicePreviewWrapper>
      </InvoicePreviewContent>
      {/* Invoice preview content */}
      <InvoicePreviewContent padding={"1rem 0 1rem 0"}>
        {/* Invoice preview user */}
        <InvoicePreviewWrapper width="50%">
          <InvoicePreviewSpan fontSize="1rem">Your Company</InvoicePreviewSpan>
          <InvoicePreviewText fontSize="0.5rem">
            {invoice.user?.name}
          </InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem">
            {invoice.user?.phone}
          </InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem">
            {invoice.user?.email}
          </InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem">
            {invoice.user?.NIP}
          </InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem">
            {invoice.user?.REGON}
          </InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem">
            {invoice.user?.address.street}
          </InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem">
            {invoice.user?.address.postalCode}, {invoice.user?.address.city}
          </InvoicePreviewText>
        </InvoicePreviewWrapper>
        {/* Invoice preview client */}
        <InvoicePreviewWrapper width="50%">
          <InvoicePreviewSpan fontSize="1rem" textAlign={styles.textAlign}>
            Bill to
          </InvoicePreviewSpan>
          <InvoicePreviewText fontSize="0.5rem" textAlign={styles.textAlign}>
            {invoice.client?.clientName}
          </InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem" textAlign={styles.textAlign}>
            {invoice.client?.clientPhone}
          </InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem" textAlign={styles.textAlign}>
            {invoice.client?.clientEmail}
          </InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem" textAlign={styles.textAlign}>
            {invoice.client?.clientNip}
          </InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem" textAlign={styles.textAlign}>
            {invoice.client?.clientRegon}
          </InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem" textAlign={styles.textAlign}>
            {invoice.client?.clientAddress}
          </InvoicePreviewText>
          {invoice.client?.clientPostal && (
            <InvoicePreviewText fontSize="0.5rem" textAlign={styles.textAlign}>
              {invoice.client?.clientPostal}, {invoice.client?.clientCity}
            </InvoicePreviewText>
          )}
        </InvoicePreviewWrapper>
      </InvoicePreviewContent>
      {/* Invoice preview products summary*/}
      <InvoicePreviewContent
        backgroundColor="#666"
        color="#fff"
        padding={styles.productSummaryPadding}
      >
        <InvoicePreviewWrapper width="25%" justifyContent="center">
          <InvoicePreviewSpan>Item</InvoicePreviewSpan>
        </InvoicePreviewWrapper>
        <InvoicePreviewWrapper width="22%" flexDirection="raw">
          <InvoicePreviewWrapper width="50%" justifyContent="center">
            <InvoicePreviewSpan>Qty</InvoicePreviewSpan>
          </InvoicePreviewWrapper>
          <InvoicePreviewWrapper width="50%">
            <InvoicePreviewSpan>Tax</InvoicePreviewSpan>
          </InvoicePreviewWrapper>
        </InvoicePreviewWrapper>
        <InvoicePreviewWrapper width="35%" flexDirection="raw">
          <InvoicePreviewWrapper width="50%">
            <InvoicePreviewSpan textAlign="right">Rate</InvoicePreviewSpan>
          </InvoicePreviewWrapper>
          <InvoicePreviewWrapper width="50%">
            <InvoicePreviewSpan textAlign="right">Tax Rate</InvoicePreviewSpan>
          </InvoicePreviewWrapper>
        </InvoicePreviewWrapper>
        <InvoicePreviewWrapper width="18%" justifyContent="center">
          <InvoicePreviewSpan textAlign="right">Amount</InvoicePreviewSpan>
        </InvoicePreviewWrapper>
      </InvoicePreviewContent>
      {/* Invoice preview products */}
      {invoice?.products?.items?.map((product) => (
        <InvoicePreviewContent
          key={product.id}
          padding={styles.productPadding}
          borderBottom={styles.borderBottom}
        >
          <InvoicePreviewWrapper width="25%" justifyContent="center">
            <InvoicePreviewText fontSize="0.5rem">
              {product.productsName}
            </InvoicePreviewText>
          </InvoicePreviewWrapper>
          <InvoicePreviewWrapper width="22%" flexDirection="raw">
            <InvoicePreviewWrapper width="50%" justifyContent="center">
              <InvoicePreviewText fontSize="0.5rem">
                {product.productsQty}
              </InvoicePreviewText>
            </InvoicePreviewWrapper>
            <InvoicePreviewWrapper width="50%" justifyContent="center">
              <InvoicePreviewText fontSize="0.5rem">
                {product.productTax}
              </InvoicePreviewText>
            </InvoicePreviewWrapper>
          </InvoicePreviewWrapper>
          <InvoicePreviewWrapper width="35%" flexDirection="raw">
            <InvoicePreviewWrapper width="50%">
              <InvoicePreviewText textAlign="right" fontSize="0.5rem">
                {product.productsPrice}
              </InvoicePreviewText>
            </InvoicePreviewWrapper>
            <InvoicePreviewWrapper width="50%">
              <InvoicePreviewText textAlign="right" fontSize="0.5rem">
                {product.productTaxRate}
              </InvoicePreviewText>
            </InvoicePreviewWrapper>
          </InvoicePreviewWrapper>
          <InvoicePreviewWrapper width="18%" justifyContent="center">
            <InvoicePreviewText textAlign="right" fontSize="0.5rem">
              {isNaN(product.amount) ? "0.00" : product.amount}
            </InvoicePreviewText>
          </InvoicePreviewWrapper>
        </InvoicePreviewContent>
      ))}
      {/* Invoice preview total */}
      <InvoicePreviewContent padding={"10px 0"}>
        <InvoicePreviewWrapper
          width="50%"
          justifyContent="center"
        ></InvoicePreviewWrapper>
        <InvoicePreviewWrapper
          width="50%"
          backgroundColor={"#e3e3e3"}
          padding={"5px"}
        >
          <InvoicePreviewWrapper flexDirection="raw">
            <InvoicePreviewWrapper width="50%" padding={"5px"}>
              <InvoicePreviewText fontSize="0.75rem">Total</InvoicePreviewText>
            </InvoicePreviewWrapper>
            <InvoicePreviewWrapper width="50%" padding={"5px"}>
              <InvoicePreviewText textAlign="right" fontSize="0.75rem">
                {isNaN(invoice?.products?.totalAmount)
                  ? "0.00"
                  : invoice?.products?.totalAmount}
              </InvoicePreviewText>
            </InvoicePreviewWrapper>
          </InvoicePreviewWrapper>
        </InvoicePreviewWrapper>
      </InvoicePreviewContent>
      {/* Invoice preview notes */}
      <InvoicePreviewContent padding={"180px 0 10px"}>
        <InvoicePreviewWrapper width="50%">
          <InvoicePreviewText fontSize="0.6rem" fontWeight="bold">Notes</InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem">
            {invoice.notes}
          </InvoicePreviewText>
        </InvoicePreviewWrapper>
      </InvoicePreviewContent>
    </InvoicePreviewContainer>
  );
};

export default InvoicePreview;
