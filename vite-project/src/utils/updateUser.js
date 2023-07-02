/**
 * Update user object in invoice object with new value for specified key.
 * @param {string} key - The property to update in the user object.
 * @param {string} value - The new value for the specified property.
 * @param {object} invoice - The invoice object to update.
 * @returns {object} - The updated invoice object.
 */
const updateUser = (key, value, invoice) => {
  let updatedUser;

  if (key === "city" || key === "postalCode" || key === "street") {
    updatedUser = {
      ...invoice.user,
      address: {
        ...invoice.user.address,
        [key]: value,
      },
    };
  } else {
    updatedUser = {
      ...invoice.user,
      [key]: value,
    };
  }

  return {
    ...invoice,
    user: updatedUser,
  };
};

export default updateUser;
