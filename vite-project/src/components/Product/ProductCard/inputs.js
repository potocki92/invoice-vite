import { v4 as uuidv4 } from 'uuid';
export const inputsProduct = [
    {
      id: uuidv4(),
      containerClass: "full-66",
      data: "productName",
      name: "productsName",
      modal: true,
      type: "text",
      label: "Product Name",
      require: true,
      handle: "handleChange",
    },
    {
      id: uuidv4(),
      containerClass: "full-33 full-50",
      data: "price",
      name: "productsPrice",
      type: "number",
      label: "Price",
      require: true,
      handle: "handleChange",
    },
    {
      id: uuidv4(),
      containerClass: "full-33 full-50",
      data: "qty",
      name: "qty",
      type: "number",
      label: "Quantity",
      require: true,
      handle: "handleChange",
    },
    {
      id: uuidv4(),
      containerClass: "full-33 full-50",
      data: "productsTax",
      name: "productsTax",
      type: "number",
      label: "Tax",
      require: true,
      handle: "handleChange",
    }
  ]