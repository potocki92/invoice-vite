/**
 * This function updates the specified property in the date object of the invoice.
 * @param {string} key - The property to update in the date object.
 * @param {string} value - The new value for the specified property.
 * @param {object} invoice - The invoice object to update.
 * @returns {object} - The updated invoice object.
 */
const updateDate = (key, value, invoice) => {
  const updatedDate = {
    ...invoice.date,
    [key]: value,
  };

  return {
    ...invoice,
    date: updatedDate,
  };
};

export default updateDate;
