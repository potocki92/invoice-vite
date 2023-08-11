import { v4 as uuidv4 } from 'uuid';
export const inputsGeneralInfo = [
    {
      id: uuidv4(),
      containerClass: "full-33",
      data: "invoiceNumber",
      name: "invoiceNumber",
      type: "text",
      label: "Invoice Number",
      require: true,
      handle: "handleInvoiceNumberChange"
    },
    {
      id: uuidv4(),
      containerClass: "full-33",
      data: "date.invoiceDate",
      name: "invoiceDate",
      type: "date",
      label: "Invoice Date",
      require: true,
      handle: "handleChange"
    },
    {
      id: uuidv4(),
      containerClass: "full-33",
      data: "date.dueDate",
      name: "dueDate",
      type: "date",
      label: "Due Date",
      require: true,
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
      require: true,
      handle: "handleChange"
    },
    {
      id: uuidv4(),
      containerClass: "full-33",
      data: "user.email",
      name: "email",
      type: "email",
      label: "Email",
      require: true,
      handle: "handleChange"
    },
    {
      id: uuidv4(),
      containerClass: "full-33",
      data: "user.phone",
      name: "phone",
      type: "tel",
      label: "Phone",
      require: true,
      handle: "handleChange"
    },
    {
      id: uuidv4(),
      containerClass: "full-66",
      data: "user.address.city",
      name: "city",
      type: "text",
      label: "City",
      require: true,
      handle: "handleChange"
    },
    {
      id: uuidv4(),
      containerClass: "full-33",
      data: "user.NIP",
      name: "NIP",
      type: "number",
      label: "NIP",
      require: true,
      handle: "handleChange"
    },
    {
      id: uuidv4(),
      containerClass: "full-33",
      data: "user.address.street",
      name: "street",
      type: "text",
      label: "Street",
      require: true,
      handle: "handleChange"
    },
    {
      id: uuidv4(),
      containerClass: "full-33",
      data: "user.address.postalCode",
      name: "postalCode",
      type: "text",
      label: "Postal code",
      require: true,
      handle: "handleChange"
    },
    {
      id: uuidv4(),
      containerClass: "full-33",
      data: "user.REGON",
      name: "REGON",
      type: "number",
      label: "REGON",
      require: true,
      handle: "handleChange"
    }
  ]

  export const inputsBillTo = [
    {
        id: uuidv4(),
        containerClass: "full-33",
        data: "client.clientEmail",
        name: "clientEmail",
        type: "email",
        label: "Customer's Email",
        require: true,
        handle: "handleChange"
      },
      {
        id: uuidv4(),
        containerClass: "full-33",
        data: "client.clientPhone",
        name: "clientPhone",
        type: "tel",
        label: "Customer's Phone",
        require: true,
        handle: "handleChange"
      },
      {
        id: uuidv4(),
        containerClass: "full-66",
        data: "client.clientAddress",
        name: "clientAddress",
        type: "text",
        label: "Customer's Address",
        require: true,
        handle: "handleChange"
      },
      {
        id: uuidv4(),
        containerClass: "full-33",
        data: "client.clientNip",
        name: "clientNip",
        type: "text",
        label: "Customer's NIP",
        require: true,
        handle: "handleChange"
      },
      {
        id: uuidv4(),
        containerClass: "full-33",
        data: "client.clientCity",
        name: "clientCity",
        type: "text",
        label: "Customer's City",
        require: true,
        handle: "handleChange"
      },
      {
        id: uuidv4(),
        containerClass: "full-33",
        data: "user.address.street",
        name: "street",
        type: "text",
        label: "Customer's Street",
        require: true,
        handle: "handleChange"
      },
      {
        id: uuidv4(),
        containerClass: "full-33",
        data: "client.clientPostal",
        name: "clientPostal",
        type: "text",
        label: "Customer's Postal",
        require: true,
        handle: "handleChange"
      },
      {
        id: uuidv4(),
        containerClass: "full-33",
        data: "client.clientRegon",
        name: "clientRegon",
        type: "text",
        label: "Customer's REGON",
        require: true,
        handle: "handleChange"
      }
  ]