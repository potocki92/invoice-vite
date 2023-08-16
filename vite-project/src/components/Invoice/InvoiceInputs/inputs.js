import { v4 as uuidv4 } from 'uuid';
export const inputsGeneralInfo = [
    {
      id: uuidv4(),
      containerClass: "full-33",
      data: "invoiceNumber",
      name: "invoiceNumber",
      type: "text",
      label: "Invoice Number",
      required: true,
      handle: "handleInvoiceNumberChange"
    },
    {
      id: uuidv4(),
      containerClass: "full-33",
      data: "date.invoiceDate",
      name: "invoiceDate",
      type: "date",
      label: "Invoice Date",
      required: true,
      handle: "handleChange"
    },
    {
      id: uuidv4(),
      containerClass: "full-33",
      data: "date.dueDate",
      name: "dueDate",
      type: "date",
      label: "Due Date",
      required: true,
      handle: "handleChange"
    }
  ]

  export const inputsBillFrom = [
    {
      id: uuidv4(),
      containerClass: "full-33",
      data: "user.name",
      name: "name",
      type: "text",
      label: "Company name",
      required: true,
      handle: "handleChange"
    },
    {
      id: uuidv4(),
      containerClass: "full-33",
      data: "user.email",
      name: "email",
      type: "email",
      label: "Email",
      required: true,
      handle: "handleChange"
    },
    {
      id: uuidv4(),
      containerClass: "full-33",
      data: "user.phone",
      name: "phone",
      type: "tel",
      label: "Phone",
      required: true,
      handle: "handleChange"
    },
    {
      id: uuidv4(),
      containerClass: "full-66",
      data: "user.address.city",
      name: "city",
      type: "text",
      label: "City",
      required: true,
      handle: "handleChange"
    },
    {
      id: uuidv4(),
      containerClass: "full-33",
      data: "user.NIP",
      name: "NIP",
      type: "number",
      label: "NIP",
      required: true,
      handle: "handleChange"
    },
    {
      id: uuidv4(),
      containerClass: "full-33",
      data: "user.address.street",
      name: "street",
      type: "text",
      label: "Street",
      required: true,
      handle: "handleChange"
    },
    {
      id: uuidv4(),
      containerClass: "full-33",
      data: "user.address.postalCode",
      name: "postalCode",
      type: "text",
      label: "Postal code",
      required: true,
      handle: "handleChange"
    },
    {
      id: uuidv4(),
      containerClass: "full-33",
      data: "user.REGON",
      name: "REGON",
      type: "number",
      label: "REGON",
      required: true,
      handle: "handleChange"
    }
  ]

  export const inputsBillTo = [
    {
        id: uuidv4(),
        containerClass: "full-33",
        data: "client.clientName",
        modal: true,
        name: "clientName",
        type: "text",
        label: "Customer's Name",
        required: true,
        handle: "handleChange"
    },
    {
        id: uuidv4(),
        containerClass: "full-33",
        data: "client.clientEmail",
        name: "clientEmail",
        type: "email",
        label: "Customer's Email",
        required: true,
        handle: "handleChange"
      },
      {
        id: uuidv4(),
        containerClass: "full-33",
        data: "client.clientPhone",
        name: "clientPhone",
        type: "tel",
        label: "Customer's Phone",
        required: true,
        handle: "handleChange"
      },
      {
        id: uuidv4(),
        containerClass: "full-66",
        data: "client.clientAddress",
        name: "clientAddress",
        type: "text",
        label: "Customer's Address",
        required: true,
        handle: "handleChange"
      },
      {
        id: uuidv4(),
        containerClass: "full-33",
        data: "client.clientNip",
        name: "clientNip",
        type: "text",
        label: "Customer's NIP",
        required: true,
        handle: "handleChange"
      },
      {
        id: uuidv4(),
        containerClass: "full-33",
        data: "client.clientCity",
        name: "clientCity",
        type: "text",
        label: "Customer's City",
        required: true,
        handle: "handleChange"
      },
      {
        id: uuidv4(),
        containerClass: "full-33",
        data: "user.address.street",
        name: "street",
        type: "text",
        label: "Customer's Street",
        required: true,
        handle: "handleChange"
      },
      {
        id: uuidv4(),
        containerClass: "full-33",
        data: "client.clientPostal",
        name: "clientPostal",
        type: "text",
        label: "Customer's Postal",
        required: true,
        handle: "handleChange"
      },
      {
        id: uuidv4(),
        containerClass: "full-33",
        data: "client.clientRegon",
        name: "clientRegon",
        type: "text",
        label: "Customer's REGON",
        required: true,
        handle: "handleChange"
      }
  ]