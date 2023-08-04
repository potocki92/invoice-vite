/**
 * Generates the markup for a client card.
 *
 * @param {Object} item - The client data to generate the markup for.
 * @param {string} item.clientName - The name of the client.
 * @returns {string} - The HTML markup for the client card.
 */
const clientCardMarkup = (item) => `
    <h2>${item.clientName}</h2>`;

export default clientCardMarkup;
