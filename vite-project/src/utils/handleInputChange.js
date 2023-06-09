/**
 * Handles the change event of the invoice number input.
 * Sets the invoice number state to the input value.
 * @param {Object} e - event object
 * @param {Array} updateFunctions - array of update functions
 * @param {Object} invoice - invoice object
 * @param {Function} setInvoice - setInvoice function
 * @returns {undefined} 
 */

const handleInputChange = (e, updateFunctions, invoice, setInvoice) => {
  const { name, value } = e.target;

  const [setFunction, updateFunction] = updateFunctions[name];
  setFunction(value);

  if (updateFunction) {
    const updatedInvoice = updateFunction(name, value, invoice);
    setInvoice(updatedInvoice);
  }
};

export default handleInputChange;
