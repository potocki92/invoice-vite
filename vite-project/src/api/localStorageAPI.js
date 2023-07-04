// Pobieranie danych faktur z localStorage
export const getInvoicesFromLocalStorage = () => {
  const storedInvoices = localStorage.getItem("invoices");
  return storedInvoices ? JSON.parse(storedInvoices) : [];
};

// Zapisywanie danych faktur do localStorage
export const saveInvoicesToLocalStorage = (invoices) => {
  localStorage.setItem("invoices", JSON.stringify(invoices));
};

// Usuwanie danych faktur z localStorage
export const clearInvoicesFromLocalStorage = () => {
  localStorage.removeItem("invoices");
};

// Dodawanie nowego objektu z fakturą
export const saveNewInvoiceToLocalStorage = (invoice) => {
  let invoices = getInvoicesFromLocalStorage()
  
  if (invoices === null) {
    saveInvoicesToLocalStorage(invoice)
  } else {
    invoices.push(invoice);
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }
};
