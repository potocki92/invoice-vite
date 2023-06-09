/**
 * This function updates the notes property in the invoice.
 * @param {string} value - The new value for the notes property.
 * @param {object} objectToUpdate - The object to update (e.g., newInvoice).
 * @returns {object} - The updated object.
 */
const updateNotes = (key, value, objectToUpdate) => {
    return { ...objectToUpdate, [key]: value };
  };

export default updateNotes;