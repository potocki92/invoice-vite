import React, { useRef } from "react";
/*
  Page, Text, View: These are components and functions provided by the "@react-pdf/renderer" package used for generating a PDF document in a React application.
*/
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import "./InvoicePDF.css";
import OpenSans from "../../../assets/Open_Sans/static/OpenSans-Bold.ttf";

Font.register({
  family: "Open Sans",
  format: "truetype",
  src: OpenSans,
});

const styles = StyleSheet.create({
  invoiceWrapper: {
    position: "relative",
    backgroundColor: "#fff",
    padding: "40px 35px",
    minWidth: "21cm",
    minHeight: "29.7cm",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  relative: {
    position: "relative",
  },
  absolute: {
    position: "absolute",
  },
  flex: {
    display: "flex",
  },
  flexEnd: {
    justifyContent: "flex-end",
  },

  alignItemsCenter: {
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  fontSize9: {
    fontSize: "9px",
  },
  fontSize11: {
    fontSize: "11px",
  },
  fontSize14: {
    fontSize: "14px",
  },
  fontSize15: {
    fontSize: "15px",
  },
  fontSize20: {
    fontSize: "20px",
  },
  fontSize45: {
    fontSize: "45px",
  },
  width12: {
    width: "12%",
  },
  width17: {
    width: "17%",
  },
  width18: {
    width: "18%",
  },
  width22: {
    width: "22%",
  },
  width25: {
    width: "25%",
  },
  width30: {
    width: "30%",
  },
  width35: {
    width: "35%",
  },
  width40: {
    width: "40%",
  },
  width48: {
    width: "48%",
  },
  width50: {
    width: "50%",
  },
  width98: {
    width: "98%",
  },
  width100: {
    width: "100%",
  },
  height50: {
    height: "50px",
  },
  gap15: {
    gap: "15px",
  },
  textAlignRight: {
    textAlign: "right",
  },
  marginTop15: {
    marginTop: "15px",
  },
  marginTop20: {
    marginTop: "20px",
  },
  marginTop30: {
    marginTop: "30px",
  },
  marginBottom1: {
    marginBottom: "1px",
  },
  bottom40px: {
    bottom: "40px",
  },
  left40px: {
    left: "40px",
  },
  bold: {
    fontWeight: "bold",
  },
  fontWeight600: {
    fontWeight: "600",
  },
  fontWeight700: {
    fontWeight: "700",
  },
  backgroundColorGray: {
    backgroundColor: "#e3e3e3",
  },
  backgroundColorDark: {
    backgroundColor: "#666",
  },
  placeholderColor: {
    color: "#aaa",
  },
  colorWhite: {
    color: "#fff",
  },
  secondColor: {
    color: "#555",
  },
  padding4px04px0: {
    padding: "4px 4px",
  },
  padding4px12px4px0: {
    padding: "4px 12px 4px 0",
  },
  padding4px8px: {
    padding: "4px 8px",
  },
  padding010px: {
    padding: "0 10px",
  },
  padding5px: {
    padding: "5px",
  },
  padding00010px: {
    padding: "0 0 0 10px",
  },
  padding0: {
    padding: "0",
  },
  padding10px0: {
    padding: "10px 0",
  },
  paddingInvoiceTitle: {
    padding: "8px 0px 16px",
  },
  borderBottom: {
    borderBottom: "1px solid #e3e3e3",
  },
  title: {
    fontFamily: "Open Sans",
  },
});

// import ProductCard from "../ProductCard/ProductCard";

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
  return (
    <Document>
      <Page size="A4" style={styles.invoiceWrapper}>
        <View
          style={{
            ...styles.flex,
            ...styles.row,
            ...styles.borderBottom,
            ...styles.paddingInvoiceTitle,
          }}
        >
          <View style={{ ...styles.flex, ...styles.width50 }}>
            <View style={{ ...styles.flex, ...styles.column }}>
              <Text style={{ ...styles.fontSize20, ...styles.secondColor }}>
                {invoice.invoiceNumber}
              </Text>
              <Text
                style={{
                  ...styles.fontSize9,
                  ...styles.bold,
                  ...styles.secondColor,
                }}
              >
                Invoice Date: {invoice.date?.invoiceDate}
              </Text>
              <Text
                style={{
                  ...styles.fontSize9,
                  ...styles.bold,
                  ...styles.secondColor,
                }}
              >
                Due Date: {invoice.date?.dueDate}
              </Text>
            </View>
          </View>
          <View
            style={{
              ...styles.flex,
              ...styles.textAlignRight,
              ...styles.width50,
            }}
          >
            <View style={{ ...styles.flex, ...styles.column }}>
              <Text
                style={{
                  ...styles.fontSize45,
                  ...styles.bold,
                  ...styles.fontWeight500,
                  ...styles.secondColor,
                  ...styles.title,
                }}
              >
                INVOICE
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            ...styles.flex,
            ...styles.row,
            ...styles.marginTop15,
            ...styles.flexEnd,
          }}
        >
          <View style={{ ...styles.flex, ...styles.column, ...styles.width50 }}>
            <Text
              style={{
                ...styles.fontSize20,
                ...styles.bold,
                ...styles.placeholderColor,
              }}
            >
              Your Company
            </Text>
            <Text
              style={{
                ...styles.fontSize14,
                ...styles.secondColor,
                ...styles.padding4px12px4px0,
                ...styles.width98,
                ...styles.bold,
                ...styles.marginBottom1,
              }}
            >
              {invoice.user?.name}
            </Text>
            <Text
              style={{
                ...styles.fontSize14,
                ...styles.secondColor,
                ...styles.padding4px12px4px0,
                ...styles.width98,
                ...styles.bold,
                ...styles.marginBottom1,
              }}
            >
              {invoice.user?.phone}
            </Text>
            <Text
              style={{
                ...styles.fontSize14,
                ...styles.secondColor,
                ...styles.padding4px12px4px0,
                ...styles.width98,
                ...styles.bold,
                ...styles.marginBottom1,
              }}
            >
              {invoice.user?.email}
            </Text>
            <Text
              style={{
                ...styles.fontSize14,
                ...styles.secondColor,
                ...styles.padding4px12px4px0,
                ...styles.width98,
                ...styles.bold,
                ...styles.marginBottom1,
              }}
            >
              {invoice.user?.NIP}
            </Text>
            <Text
              style={{
                ...styles.fontSize14,
                ...styles.secondColor,
                ...styles.padding4px12px4px0,
                ...styles.width98,
                ...styles.bold,
                ...styles.marginBottom1,
              }}
            >
              {invoice.user?.REGON}
            </Text>
            <Text
              style={{
                ...styles.fontSize14,
                ...styles.secondColor,
                ...styles.padding4px12px4px0,
                ...styles.width98,
                ...styles.bold,
                ...styles.marginBottom1,
              }}
            >
              {invoice.user?.address.street}
            </Text>
            <Text
              style={{
                ...styles.fontSize14,
                ...styles.secondColor,
                ...styles.padding4px12px4px0,
                ...styles.width98,
                ...styles.bold,
                ...styles.marginBottom1,
              }}
            >
              {invoice.user?.address.postalCode}, {invoice.user?.address.city}
            </Text>
          </View>
          <View style={{ ...styles.flex, ...styles.column, ...styles.width50 }}>
            <Text
              style={{
                ...styles.fontSize20,
                ...styles.bold,
                ...styles.placeholderColor,
              }}
            >
              Bill to
            </Text>
            <Text
              style={{
                ...styles.fontSize14,
                ...styles.secondColor,
                ...styles.padding4px12px4px0,
                ...styles.width98,
                ...styles.bold,
                ...styles.marginBottom1,
              }}
            >
              {invoice.client?.clientName}
            </Text>
            <Text
              style={{
                ...styles.fontSize14,
                ...styles.secondColor,
                ...styles.padding4px12px4px0,
                ...styles.width98,
                ...styles.bold,
                ...styles.marginBottom1,
              }}
            >
              {invoice.client?.clientPhone}
            </Text>
            <Text
              style={{
                ...styles.fontSize14,
                ...styles.secondColor,
                ...styles.padding4px12px4px0,
                ...styles.width98,
                ...styles.bold,
                ...styles.marginBottom1,
              }}
            >
              {invoice.client?.clientEmail}
            </Text>
            <Text
              style={{
                ...styles.fontSize14,
                ...styles.secondColor,
                ...styles.padding4px12px4px0,
                ...styles.width98,
                ...styles.bold,
                ...styles.marginBottom1,
              }}
            >
              {invoice.client?.clientNip}
            </Text>
            <Text
              style={{
                ...styles.fontSize14,
                ...styles.secondColor,
                ...styles.padding4px12px4px0,
                ...styles.width98,
                ...styles.bold,
                ...styles.marginBottom1,
              }}
            >
              {invoice.client?.clientRegon}
            </Text>
            <Text
              style={{
                ...styles.fontSize14,
                ...styles.secondColor,
                ...styles.padding4px12px4px0,
                ...styles.width98,
                ...styles.bold,
                ...styles.marginBottom1,
              }}
            >
              {invoice.client?.clientAddress}
            </Text>
            {invoice.client?.clientPostal && invoice.client?.clientCity && (
              <Text
                style={{
                  ...styles.fontSize14,
                  ...styles.secondColor,
                  ...styles.padding4px12px4px0,
                  ...styles.width98,
                  ...styles.bold,
                  ...styles.marginBottom1,
                }}
              >
                {invoice.client?.clientPostal}, {invoice.client?.clientCity}
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            ...styles.flex,
            ...styles.row,
            ...styles.alignItemsCenter,
            ...styles.backgroundColorDark,
            ...styles.marginTop30,
          }}
        >
          <View style={{ ...styles.width25, ...styles.padding4px8px }}>
            <Text
              style={{
                ...styles.bold,
                ...styles.colorWhite,
                ...styles.marginBottom1,
                ...styles.padding4px04px0,
                ...styles.fontSize11,
              }}
            >
              Item Description
            </Text>
          </View>
          <View
            style={{
              ...styles.width22,
              ...styles.padding4px8px,
              ...styles.flex,
              ...styles.row,
            }}
          >
            <View style={{ ...styles.width50, ...styles.padding4px8px }}>
              <Text
                style={{
                  ...styles.bold,
                  ...styles.colorWhite,
                  ...styles.marginBottom1,
                  ...styles.padding4px04px0,
                  ...styles.textAlignRight,
                  ...styles.fontSize11,
                }}
              >
                Qty
              </Text>
            </View>
            <View style={{ ...styles.width50, ...styles.padding4px8px }}>
              <Text
                style={{
                  ...styles.bold,
                  ...styles.colorWhite,
                  ...styles.marginBottom1,
                  ...styles.padding4px04px0,
                  ...styles.textAlignRight,
                  ...styles.fontSize11,
                }}
              >
                Tax
              </Text>
            </View>
          </View>
          <View
            style={{
              ...styles.width35,
              ...styles.padding4px8px,
              ...styles.flex,
              ...styles.row,
            }}
          >
            <View style={{ ...styles.width50, ...styles.padding4px8px }}>
              <Text
                style={{
                  ...styles.bold,
                  ...styles.colorWhite,
                  ...styles.marginBottom1,
                  ...styles.padding4px04px0,
                  ...styles.textAlignRight,
                  ...styles.fontSize11,
                }}
              >
                Rate
              </Text>
            </View>
            <View style={{ ...styles.width50, ...styles.padding4px8px }}>
              <Text
                style={{
                  ...styles.bold,
                  ...styles.colorWhite,
                  ...styles.marginBottom1,
                  ...styles.padding4px04px0,
                  ...styles.textAlignRight,
                  ...styles.fontSize11,
                }}
              >
                Tax Rate
              </Text>
            </View>
          </View>
          <View
            style={{
              ...styles.width25,
              ...styles.padding4px8px,
              ...styles.textAlignRight,
            }}
          >
            <Text
              style={{
                ...styles.bold,
                ...styles.colorWhite,
                ...styles.marginBottom1,
                ...styles.padding4px04px0,
                ...styles.textAlignRight,
                ...styles.fontSize11,
              }}
            >
              Amount
            </Text>
          </View>
        </View>

        {invoice.products?.items.map((product) => (
          <View
            style={{
              ...styles.flex,
              ...styles.row,
              ...styles.relative,
              ...styles.borderBottom,
              ...styles.padding10px0,
            }}
          >
            <View style={{ ...styles.width25, ...styles.padding4px8px }}>
              <Text
                style={{
                  ...styles.fontSize11,
                }}
              >
                {product.productsName}
              </Text>
            </View>
            <View
              style={{
                ...styles.width22,
                ...styles.padding4px8px,
                ...styles.flex,
                ...styles.row,
              }}
            >
              <View
                style={{
                  ...styles.width50,
                  ...styles.padding4px8px,
                }}
              >
                <Text
                  style={{
                    ...styles.fontSize11,
                  }}
                >
                  {product.productsQty}
                </Text>
              </View>
              <View
                style={{
                  ...styles.width50,
                  ...styles.padding4px8px,
                }}
              >
                <Text
                  style={{
                    ...styles.fontSize11,
                  }}
                >
                  {product.productsTax?.name || "0%"}
                </Text>
              </View>
            </View>
            <View
              style={{
                ...styles.width35,
                ...styles.padding4px8px,
                ...styles.flex,
                ...styles.row,
              }}
            >
              <View style={{ ...styles.width50, ...styles.padding4px8px }}>
                <Text
                  style={{
                    ...styles.fontSize11,
                  }}
                >
                  {product.productsPrice}
                </Text>
              </View>
              <View style={{ ...styles.width50, ...styles.padding4px8px }}>
                <Text
                  style={{
                    ...styles.fontSize11,
                  }}
                >
                  {product.productsRateTax || 0}
                </Text>
              </View>
            </View>
            <View
              style={{
                ...styles.width18,
                ...styles.padding4px8px,
                ...styles.textAlignRight,
              }}
            >
              <Text
                style={{
                  ...styles.fontSize11,
                }}
              >
                {product.amount}
              </Text>
            </View>
          </View>
        ))}
        <View style={{ ...styles.flex, ...styles.row }}>
          <View style={{ ...styles.width50, ...styles.padding4px8px }}></View>
          <View style={{ ...styles.width50, ...styles.marginTop15 }}>
            <View
              style={{
                ...styles.flex,
                ...styles.backgroundColorGray,
                ...styles.padding5px,
              }}
            >
              <View style={{ ...styles.width50, ...styles.padding5px }}>
                <Text
                  style={{
                    ...styles.bold,
                    ...styles.marginBottom1,
                    ...styles.borderBottom,
                    ...styles.padding4px04px0,
                    ...styles.fontSize14,
                  }}
                >
                  Total
                </Text>
              </View>
              <View style={{ ...styles.width50, ...styles.padding5px }}>
                <Text
                  style={{
                    ...styles.bold,
                    ...styles.marginBottom1,
                    ...styles.borderBottom,
                    ...styles.padding4px04px0,
                    ...styles.fontSize14,
                  }}
                >
                  {invoice.products?.totalAmount}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            ...styles.marginTop20,
            ...styles.absolute,
            ...styles.bottom40px,
            ...styles.left40px,
          }}
        >
          <Text
            style={{
              ...styles.bold,
              ...styles.marginBottom1,
              ...styles.padding4px04px0,
              ...styles.fontSize14,
            }}
          >
            Notes
          </Text>
          <Text
            style={{
              ...styles.fontSize11,
              ...styles.padding4px04px0,
              ...styles.secondColor,
            }}
          >
            {invoice.notes}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
