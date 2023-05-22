import React, { useEffect, useRef, useState } from "react";
/*
  Page, Text, View: These are components and functions provided by the "@react-pdf/renderer" package used for generating a PDF document in a React application.
*/ import ReactToPdf from "react-to-pdf";
import { Page, Text, View } from "@react-pdf/renderer";
import "./InvoicePDF.css";
import ProductCard from "../ProductCard/ProductCard";
import { GeneratePDF } from "./InvoicePDF.styled";

/**
 * This is a React component called "InvoicePDF". It generates a PDF document based on the data provided as props. It uses the "@react-pdf/renderer" package for generating PDF documents and "ReactToPdf" for downloading the PDF.

  The component has a lot of state variables that hold values of various fields in the invoice. These fields include client name, client address, due date, invoice date, total amount, notes, etc. The component also has a ref object that references the PDF component.

  The PDF is generated using the "<Page>", "<Text>", and "<View>" components provided by "@react-pdf/renderer". The PDF is divided into several sections, including an invoice header, user details, client details, and a product table.

  The product table is generated using the map function to iterate through an array of items in the "invoice.products.items" object. For each item, the function creates a new row in the table that displays the item's description, quantity, tax, rate, tax rate, and amount.

  Finally, the PDF is downloaded using the "ReactToPdf" component.
  @param {object} invoice - Object containing data to be displayed on the PDF document.
  @returns {JSX.Element} Returns a React component.
 */
const InvoicePDF = ({ invoice }) => {
  const ref = useRef();

  const pdfComponent = (
    <Page size="A4" className="page invoice-wrapper">
      <View className="view flex flex-end">
        <View className="view w-50 flex column">
          <Text className="fs-45 bold right">INVOICE</Text>
          <Text className="fs-20 right">{invoice.invoiceNumber}</Text>
          <View className="flex flex-end flex-ai gap-15">
            <Text className="w-35 fs-11 text14">
              Invoice Date: {invoice.date?.invoiceDate}
            </Text>
          </View>
          <View className="flex flex-end flex-ai gap-15">
            <Text className="w-35 fs-11 text14">
              Due Date: {invoice.date?.dueDate}
            </Text>
          </View>
        </View>
      </View>
      <View className="view flex m-t">
        <View className="view w-50 flex column">
          <Text className="fs-20 bold p-color">Your Company</Text>
          <Text className="text14">{invoice.user?.name}</Text>
          <Text className="text14">{invoice.user?.phone}</Text>
          <Text className="text14">{invoice.user?.email}</Text>
          <Text className="text14">{invoice.user?.NIP}</Text>
          <Text className="text14">{invoice.user?.REGON}</Text>
          <Text className="text14">{invoice.user?.address.street}</Text>
          <Text className="text14">
            {invoice.user?.address.postalCode}, {invoice.user?.address.city}
          </Text>
        </View>
        <View className="view w-50 flex column">
          <Text className="fs-20 bold p-color">Bill to</Text>
          <Text className="text14">{invoice.client?.clientName}</Text>
          <Text className="text14">{invoice.client?.clientPhone}</Text>
          <Text className="text14">{invoice.client?.clientEmail}</Text>
          <Text className="text14">{invoice.client?.clientNip}</Text>
          <Text className="text14">{invoice.client?.clientRegon}</Text>
          <Text className="text14">{invoice.client?.clientAddress}</Text>
          {invoice.client?.clientPostal && invoice.client?.clientCity && (
            <Text className="text14">
              {invoice.client?.clientPostal}, {invoice.client?.clientCity}
            </Text>
          )}
        </View>
      </View>
      <View className="view mt-30 bg-dark flex flex-ai">
        <View className="view w-25 p-4-8">
          <Text className="span white bold">Item Description</Text>
        </View>
        <View className="view w-22 p-4-8 flex">
          <View className="view w-50 p-4-8">
            <Text className="span white bold right">Qty</Text>
          </View>
          <View className="view w-50 p-4-8">
            <Text className="span white bold right">Tax</Text>
          </View>
        </View>
        <View className="view w-35 p-4-8 flex">
          <View className="view w-50 p-4-8">
            <Text className="span white bold right">Rate</Text>
          </View>
          <View className="view w-50 p-4-8">
            <Text className="span white bold right">Tax Rate</Text>
          </View>
        </View>
        <View className="view w-18 p-4-8">
          <Text className="span white bold right">Amount</Text>
        </View>
      </View>

      {invoice.products?.items.map((product) => (
        <View className="view row flex b-b p-10 flex-align relative">
          <View className="view w-25 p-4-8 flex-align flex">
            <Text className="">{product.productsName}</Text>
          </View>
          <View className="view w-22 p-4-8 flex">
            <View className="view w-50 p-4-8 pb-10 ta-right">
              <Text className="dark right p-0">{product.productsQty}</Text>
            </View>
            <View className="view w-50 p-4-8 pb-10 ta-right">
              <Text className="dark right p-0">
                {product.productsTax?.name || "0%"}
              </Text>
            </View>
          </View>
          <View className="view w-35 p-4-8 flex">
            <View className="view w-50 p-4-8 pb-10 ta-right">
              <Text className="dark right p-0">{product.productsPrice}</Text>
            </View>
            <View className="view w-50 p-4-8 pb-10 ta-right">
              <Text className="dark right p-0">
                {product.productsRateTax || 0}
              </Text>
            </View>
          </View>
          <View className="view w-18 p-4-8 pb-10 right">
            <Text className="span dark">{product.amount}</Text>
          </View>
        </View>
      ))}
      <View className="flex">
        <View className="view p-4-8 w-50"></View>
        <View className="view w-50 m-t">
          <View className="view flex bg-gray p-5">
            <View className="view w-50 p-5">
              <Text className="span bold">Total</Text>
            </View>
            <View className="w-50 p-5">
              <Text class="span right bold dark">
                {invoice.products?.totalAmount}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="mt-20 absolute bottom40">
        <Text className="span bold">Notes</Text>
        <Text className="">{invoice.notes}</Text>
      </View>
    </Page>
  );

  return (
    <div ref={ref}>
      {pdfComponent}
      <ReactToPdf targetRef={ref} filename="invoice.pdf">
        {({ toPdf }) => <GeneratePDF onClick={toPdf}>Generate PDF</GeneratePDF>}
      </ReactToPdf>
    </div>
  );
};

export default InvoicePDF;
