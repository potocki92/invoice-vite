/**
 * If the value is not empty, return the class name "floating".
 * @param {string} value  The value of the input.
 * @returns {string}  The class name "floating" if the value is not empty.
 */
const isFloating = (value) => {
  if (value) {
    return "floating";
  } else {
    return "";
  }
};

export default isFloating;