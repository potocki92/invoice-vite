/**
Returns an array of objects with properties that define the input fields in a product form.
@function
@param {Object} newProduct - The object containing the details of a new product.
@param {string} newProduct.productsName - The name of the new product.
@param {number} newProduct.productsPrice - The price of the new product.
@returns {Array<Object>} - An array of objects with properties that define the input fields in a product form.
@property {string} className - The class name for the input field.
@property {string} name - The name of the input field.
@property {string|number} value - The value of the input field.
@property {string} placeholder - The placeholder text for the input field.
@property {boolean} required - Whether the input field is required or not.
*/
const productFormInput = (newProduct) => [
  {
    className: "input",
    name: "productsName",
    value: newProduct.productsName,
    placeholder: "Enter Product Name",
    required: true,
  },
  {
    className: "input",
    name: "productsPrice",
    value: newProduct.productsPrice,
    placeholder: "Enter Product Price",
    required: true,
  },
];
export default productFormInput;
