/**
 * Handles the change event of the invoice number input.
 * Sets the invoice number state to the input value.
 * @param {Object} e - event object
 * @param {Array} updateFunctions - array of update functions
 * @param {Object} invoice - invoice object
 * @param {Function} setInvoice - setInvoice function
 * @returns {undefined} 
 */

import { useDispatch } from "react-redux";
import { setInvoice } from "../redux/invoiceSlice";

const handleInputChange = (e, updateFunctions, invoice) => {
  const { name, value } = e.target;
  const dispatch = useDispatch()

  const [setFunction, updateFunction] = updateFunctions[name];

  if (setFunction) {
    setFunction(value)
  }

  if (updateFunction) {
    const updatedInvoice = updateFunction(name, value, invoice);
    dispatch(setInvoice(updatedInvoice));
  }
};

export default handleInputChange;
