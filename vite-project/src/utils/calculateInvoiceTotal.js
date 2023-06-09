 /**
  * Calculate invoice total amount, tax rate and subtotal amount 
  * @param {*} items
  * @param {*} setSubtotal
  * @param {*} setProductTaxRate
  * @param {*} setTotal
  * @returns
  * @example
  * const items = [
  *  {
  *   productsPrice: 100,
  *   productsQty: 2,
  *   productTaxRate: 0.1,
  *   amount: 220
  *   },
  *   {
  *   productsPrice: 100,
  *   productsQty: 2,
  *   productTaxRate: 0.1,
  *   amount: 220
  *   }
  * ];
  * const { subtotal, productTaxRate, total } = calculateInvoiceTotal(items);
  * console.log(subtotal, productTaxRate, total);
  * // 400, 0.2, 440
  */
 const calculateInvoiceTotal = (items, setSubtotal, setProductTaxRate, setTotal) => {
    let totalAmount = 0;
    let productTaxRate = 0;
    let subtotal = 0;
  
    if (items) {
      totalAmount += items.reduce(
        (accumulator, currentAmount) => accumulator + currentAmount.amount,
        0
      );
      productTaxRate += items.reduce(
        (accumulator, currentAmount) =>
          accumulator + currentAmount.productTaxRate,
        0
      );
      subtotal += items.reduce(
        (accumulator, currentAmount) =>
          accumulator + currentAmount.productsPrice * currentAmount.productsQty,
        0
      );
      setSubtotal(subtotal);
      setProductTaxRate(productTaxRate);
      setTotal(totalAmount);
    }
  };

  export default calculateInvoiceTotal;