export const updateInvoiceNumber = (invoiceNumber) => {
    return {
        type: "UPDATE_INVOICE_NUMBER",
        payload: invoiceNumber
    }
}