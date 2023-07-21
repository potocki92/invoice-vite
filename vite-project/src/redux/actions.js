
export const updateInvoiceNumber = (invoiceNumber) => {
    return {
        type: "UPDATE_INVOICE_NUMBER",
        payload: invoiceNumber
    }
}

export const updateProductData = ({ index, key, value }) => {
    return {
      type: 'UPDATE_PRODUCT_DATA',
      payload: {
        index,
        key,
        value,
      },
    };
  };

export const setProductTaxRate = (taxRate) => ({
  type: "SET_PRODUCT_TAX_RATE",
  payload: taxRate,
});