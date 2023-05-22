/*
This module exports an array of objects representing input fields for a client form.
Each object contains properties such as name, value, placeholder and required.
*/
const clientFormInput = (newClient) => [
  {
    name: "clientName",
    value: newClient.clientName,
    placeholder: "Enter Client Name",
    required: true,
  },
  {
    name: "clientNip",
    value: newClient.clientNip,
    placeholder: "Enter Client Nip",
    required: true,
  },
  {
    name: "clientRegon",
    value: newClient.clientRegon,
    placeholder: "Enter Client REGON",
    required: false,
  },
  {
    name: "clientEmail",
    value: newClient.clientEmail,
    placeholder: "Enter Client Email",
    required: false,
  },
  {
    name: "clientPhone",
    value: newClient.clientPhone,
    placeholder: "Enter Client Phone",
    required: false,
  },
  {
    name: "clientCity",
    value: newClient.clientCity,
    placeholder: "Enter Client City",
    required: true,
  },
  {
    name: "clientPostal",
    value: newClient.clientPostal,
    placeholder: "Enter Client Postal",
    required: true,
  },
  {
    name: "clientAddress",
    value: newClient.clientAddress,
    placeholder: "Enter Client Address",
    required: true,
  },
];

export default clientFormInput;
