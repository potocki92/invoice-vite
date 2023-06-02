import React from "react";
import {
  InvoicePreviewContainer,
  InvoicePreviewContent,
  InvoicePreviewText,
  InvoicePreviewTitle,
  InvoicePreviewWrapper,
} from "./InvoicePreview.styled";

const styles = 
    {
        textAlign: "right",
    }

const InvoicePreview = ({ invoice }) => {
  return (
    <InvoicePreviewContainer>
      <InvoicePreviewContent>
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
          <InvoicePreviewTitle>Invoice</InvoicePreviewTitle>
        </InvoicePreviewWrapper>
      </InvoicePreviewContent>
      <InvoicePreviewContent>
        <InvoicePreviewWrapper width="50%">
          <InvoicePreviewTitle fontSize="1rem">
            Your Company
          </InvoicePreviewTitle>
          <InvoicePreviewText fontSize="0.5rem">{invoice.user?.name}</InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem">{invoice.user?.phone}</InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem">{invoice.user?.email}</InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem">{invoice.user?.NIP}</InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem">{invoice.user?.REGON}</InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem">{invoice.user?.address.street}</InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem">{invoice.user?.address.postalCode}, {invoice.user?.address.city}</InvoicePreviewText>
        </InvoicePreviewWrapper>
        <InvoicePreviewWrapper width="50%">
          <InvoicePreviewTitle fontSize="1rem" textAlign={styles.textAlign}>
            Bill to
          </InvoicePreviewTitle>
          <InvoicePreviewText fontSize="0.5rem" textAlign={styles.textAlign}>{invoice.client?.clientName}</InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem" textAlign={styles.textAlign}>{invoice.client?.clientPhone}</InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem" textAlign={styles.textAlign}>{invoice.client?.clientEmail}</InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem" textAlign={styles.textAlign}>{invoice.client?.clientNip}</InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem" textAlign={styles.textAlign}>{invoice.client?.clientRegon}</InvoicePreviewText>
          <InvoicePreviewText fontSize="0.5rem" textAlign={styles.textAlign}>{invoice.client?.clientAddress}</InvoicePreviewText>
          {invoice.client?.clientPostal && <InvoicePreviewText fontSize="0.5rem" textAlign={styles.textAlign}>{invoice.client?.clientPostal}, {invoice.client?.clientCity}</InvoicePreviewText>}
        </InvoicePreviewWrapper>
      </InvoicePreviewContent>
      <InvoicePreviewContent backgroundColor="#666" color="#fff">
        <InvoicePreviewWrapper width="25%">
            <InvoicePreviewTitle fontSize="0.8rem">Item</InvoicePreviewTitle>
        </InvoicePreviewWrapper>
        <InvoicePreviewWrapper width="22%" flexDirection="raw">
            <InvoicePreviewWrapper width="50%">
                <InvoicePreviewTitle fontSize="0.8rem">Qty</InvoicePreviewTitle>
            </InvoicePreviewWrapper>
            <InvoicePreviewWrapper width="50%">
                <InvoicePreviewTitle fontSize="0.8rem">Tax</InvoicePreviewTitle>
            </InvoicePreviewWrapper>
        </InvoicePreviewWrapper>
        <InvoicePreviewWrapper width="35%" flexDirection="raw">
            <InvoicePreviewWrapper width="50%">
                <InvoicePreviewTitle textAlign="right" fontSize="0.8rem">Rate</InvoicePreviewTitle>
            </InvoicePreviewWrapper>
            <InvoicePreviewWrapper width="50%">
                <InvoicePreviewTitle textAlign="right" fontSize="0.8rem">Tax Rate</InvoicePreviewTitle>
            </InvoicePreviewWrapper>
        </InvoicePreviewWrapper>
        <InvoicePreviewWrapper width="18%">
            <InvoicePreviewTitle textAlign="right" fontSize="0.8rem">Amount</InvoicePreviewTitle>
        </InvoicePreviewWrapper>
      </InvoicePreviewContent>
    </InvoicePreviewContainer>
  );
};

export default InvoicePreview;
