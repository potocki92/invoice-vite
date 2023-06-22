/**
 * This function updates the specified property in the date object of the invoice.
 * @param {string} key - The property to update in the date object.
 * @param {string} value - The new value for the specified property.
 * @param {object} invoice - The invoice object to update.
 * @returns {object} - The updated invoice object.
 */
const updateClient = (key, value, invoice) => {
  const updatedClient = {
    ...invoice.client,
    [key]: value,
  };

  return {
    ...invoice,
    client: updatedClient,
  };
};

export default updateClient;
