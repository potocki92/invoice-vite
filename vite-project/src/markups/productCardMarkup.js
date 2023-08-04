/**
 * Generates the markup for a product card.
 *
 * @param {Object} item - The product data to generate the markup for.
 * @param {string} item.productsName - The name of the product.
 * @param {number} item.productsPrice - The price of the product.
 * @returns {string} - The HTML markup for the product card.
 */
const productCardMarkup = (item) => `
    <h2>${item.productsName}</h2>
    <p>${item.productsPrice}</p>
`;

export default productCardMarkup;
