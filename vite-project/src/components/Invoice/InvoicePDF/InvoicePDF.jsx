import React from "react";
/*
  Page, Text, View: These are components and functions provided by the "@react-pdf/renderer" package used for generating a PDF document in a React application.
*/
import { Document, Page, Text, View, Font } from "@react-pdf/renderer";
import OpenSans from "../../../assets/Open_Sans/static/OpenSans-Bold.ttf";
import OpenSansLight from "../../../assets/Open_Sans/static/OpenSans-Light.ttf";
import styles from "./InvoicePDF.styled";

Font.register({
  family: "Open Sans",
  format: "truetype",
  src: OpenSans,
});

Font.register({
  family: "Open Sans Light",
  format: "truetype",
  src: OpenSansLight,
});

const companyClientStyles = {
  ...styles.fontSize20,
  ...styles.OpenSansBold,
  ...styles.fontWeight600,
  ...styles.secondColor,
};

const compoanyClientInfoStyles = {
  ...styles.fontSize12,
  ...styles.OpenSansLight,
  ...styles.secondColor,
  ...styles.marginBottom1,
};

const productsInfoStyles = {
  ...styles.fontWeight600,
  ...styles.OpenSansBold,
  ...styles.colorWhite,
  ...styles.marginBottom1,
  ...styles.fontSize11,
};

const productTextStyles = {
  ...styles.fontSize11,
  ...styles.secondColor,
};
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
        {/* HEAD */}
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
                  ...styles.fontWeight400,
                  ...styles.OpenSansLight,
                  ...styles.secondColor,
                }}
              >
                Invoice Date: {invoice.date?.invoiceDate}
              </Text>
              <Text
                style={{
                  ...styles.fontSize9,
                  ...styles.fontWeight400,
                  ...styles.OpenSansLight,
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
                  ...styles.secondColor,
                  ...styles.OpenSansBold,
                  ...styles.fontWeight700,
                }}
              >
                INVOICE
              </Text>
            </View>
          </View>
        </View>
        {/* YOUR COMPANY, BILL TO */}
        <View
          style={{
            ...styles.flex,
            ...styles.row,
            ...styles.marginTop15,
            ...styles.flexEnd,
          }}
        >
          {/* YOUR COMPANY */}
          <View style={{ ...styles.flex, ...styles.column, ...styles.width50 }}>
            <Text style={companyClientStyles}>YOUR COMPANY</Text>
            <Text style={compoanyClientInfoStyles}>{invoice.user?.name}</Text>
            <Text style={compoanyClientInfoStyles}>{invoice.user?.phone}</Text>
            <Text style={compoanyClientInfoStyles}>{invoice.user?.email}</Text>
            <Text style={compoanyClientInfoStyles}>{invoice.user?.NIP}</Text>
            <Text style={compoanyClientInfoStyles}>{invoice.user?.REGON}</Text>
            <Text style={compoanyClientInfoStyles}>
              {invoice.user?.address.street}
            </Text>
            <Text style={compoanyClientInfoStyles}>
              {invoice.user?.address.postalCode}, {invoice.user?.address.city}
            </Text>
          </View>
          {/* BILL TO */}
          <View style={{ ...styles.flex, ...styles.column, ...styles.width50 }}>
            <Text style={{ ...companyClientStyles, ...styles.textAlignRight }}>
              BILL TO
            </Text>
            <Text
              style={{
                ...compoanyClientInfoStyles,
                ...styles.textAlignRight,
              }}
            >
              {invoice.client?.clientName}
            </Text>
            <Text
              style={{
                ...compoanyClientInfoStyles,
                ...styles.textAlignRight,
              }}
            >
              {invoice.client?.clientPhone}
            </Text>
            <Text
              style={{
                ...compoanyClientInfoStyles,
                ...styles.textAlignRight,
              }}
            >
              {invoice.client?.clientEmail}
            </Text>
            <Text
              style={{
                ...compoanyClientInfoStyles,
                ...styles.textAlignRight,
              }}
            >
              {invoice.client?.clientNip}
            </Text>
            <Text
              style={{
                ...compoanyClientInfoStyles,
                ...styles.textAlignRight,
              }}
            >
              {invoice.client?.clientRegon}
            </Text>
            <Text
              style={{
                ...compoanyClientInfoStyles,
                ...styles.textAlignRight,
              }}
            >
              {invoice.client?.clientAddress}
            </Text>
            {invoice.client?.clientPostal && invoice.client?.clientCity && (
              <Text
                style={{
                  ...compoanyClientInfoStyles,
                  ...styles.textAlignRight,
                }}
              >
                {invoice.client?.clientPostal}, {invoice.client?.clientCity}
              </Text>
            )}
          </View>
        </View>
        {/* ITEMS DESCRIPTION ETC. */}
        <View
          style={{
            ...styles.flex,
            ...styles.row,
            ...styles.alignItemsCenter,
            ...styles.backgroundColorDark,
            ...styles.marginTop30,
          }}
        >
          <View
            style={{
              ...styles.width25,
              ...styles.padding4px8px,
            }}
          >
            <Text style={productsInfoStyles}>Item Description</Text>
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
              <Text style={productsInfoStyles}>Qty</Text>
            </View>
            <View
              style={{
                ...styles.width50,
                ...styles.padding4px8px,
              }}
            >
              <Text style={productsInfoStyles}>Tax</Text>
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
            <View
              style={{
                ...styles.width50,
                ...styles.padding4px8px,
                ...styles.textAlignRight,
              }}
            >
              <Text style={productsInfoStyles}>Rate</Text>
            </View>
            <View
              style={{
                ...styles.width50,
                ...styles.padding4px8px,
                ...styles.textAlignRight,
              }}
            >
              <Text style={productsInfoStyles}>Tax Rate</Text>
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
                ...productsInfoStyles,
                ...styles.textAlignRight,
              }}
            >
              Amount
            </Text>
          </View>
        </View>

        {invoice.products?.items.map((product) => (
          <View
            key={product._id}
            style={{
              ...styles.flex,
              ...styles.row,
              ...styles.relative,
              ...styles.borderBottom,
              ...styles.padding10px0,
            }}
          >
            <View
              style={{
                ...styles.width25,
                ...styles.padding4px8px,
              }}
            >
              <Text style={productTextStyles}>{product.productsName}</Text>
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
                <Text style={productTextStyles}>{product.qty}</Text>
              </View>
              <View
                style={{
                  ...styles.width50,
                  ...styles.padding4px8px,
                }}
              >
                <Text style={productTextStyles}>{product.productsTax}</Text>
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
              <View
                style={{
                  ...styles.width50,
                  ...styles.padding4px8px,
                  ...styles.textAlignRight,
                }}
              >
                <Text style={productTextStyles}>{product.productsPrice}</Text>
              </View>
              <View
                style={{
                  ...styles.width50,
                  ...styles.padding4px8px,
                  ...styles.textAlignRight,
                }}
              >
                <Text style={productTextStyles}>{product.productTaxRate}</Text>
              </View>
            </View>
            <View
              style={{
                ...styles.width25,
                ...styles.padding4px8px,
                ...styles.textAlignRight,
              }}
            >
              <Text style={productTextStyles}>
                {isNaN(product.amount) ? "" : product.amount}
              </Text>
            </View>
          </View>
        ))}
        {/* TOTAL */}
        <View style={{ ...styles.flex, ...styles.row }}>
          <View style={{ ...styles.width50, ...styles.padding4px8px }}></View>
          <View style={{ ...styles.width50, ...styles.marginTop15 }}>
            <View
              style={{
                ...styles.flex,
                ...styles.row,
                ...styles.backgroundColorGray,
                ...styles.padding5px,
              }}
            >
              <View style={{ ...styles.width50, ...styles.padding5px }}>
                <Text
                  style={{
                    ...styles.marginBottom1,
                    ...styles.borderBottom,
                    ...styles.padding4px04px0,
                    ...styles.fontSize11,
                    ...styles.fontWeight600,
                    ...styles.OpenSansBold,
                    ...styles.secondColor,
                  }}
                >
                  Total
                </Text>
              </View>
              <View style={{ ...styles.width50, ...styles.padding5px }}>
                <Text
                  style={{
                    ...styles.marginBottom1,
                    ...styles.borderBottom,
                    ...styles.padding4px04px0,
                    ...styles.fontSize11,
                    ...styles.fontWeight600,
                    ...styles.OpenSansBold,
                    ...styles.textAlignRight,
                    ...styles.secondColor,
                  }}
                >
                  {invoice.products?.totalAmount}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* NOTES */}
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
              ...styles.marginBottom1,
              ...styles.padding4px04px0,
              ...styles.fontWeight600,
              ...styles.OpenSansBold,
              ...styles.fontSize12,
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
