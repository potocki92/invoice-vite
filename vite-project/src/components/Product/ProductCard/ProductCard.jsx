import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import {
  Amount,
  AmountSpan,
  
} from "../../Invoice/InvoiceInputs/InvoiceInputs.styled";
import { ModalButton } from "../../Common/Modal/Modal.styled";
import { HiUsers } from "react-icons/hi";
import Modal from "../../Common/Modal/Modal";
import { createPortal } from "react-dom";
import productCardMarkup from "../../../markups/productCardMarkup";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { RemoveButton } from "../../buttons.styled";
import { ProductCardContainer } from "./ProductCard.styled";
import isFloating from "../../../utils/isFloating";
import {
  InputsContent,
  InputsContainer,
  Input,
  InputSpan,
} from "../../Common/InputField/Input.styled";
/**
 *   This component renders a product card with the product name, quantity, price, tax, and amount.
 *  It also renders a button to remove the product from the invoice.
 * The component takes the following props:
 *
 * @param {number} index - The index of the product in the invoice products array
 * @param {Object} product - The product object
 * @param {Object} invoice - The invoice object
 * @param {Function} setNewInvoice - The function to update the invoice object
 * @param {Array} products - The list of products
 * @returns {JSX} - Returns the product card component
 */
const ProductCard = ({ index, product, invoice, setNewInvoice, products, isInAuthentication }) => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productName, setProductName] = useState(product.productsName);
  const [productQty, setProductQty] = useState(product.productsQty);
  const [productPrice, setProductPrice] = useState(product.productsPrice);
  const [productTax, setProductTax] = useState(product.productsTax);
  const [productTaxRate, setProductTaxRate] = useState(product.productsRateTax);
  const [amount, setAmount] = useState(1);
  const [showModal, setShowModal] = useState(false);

  /**
   * updatedProduct:
   * This function takes in two arguments, key and value, and updates the invoice object with the new value.
   * The function first creates a new array of updatedProducts by iterating over the invoice.products.items array using the map method.
   * For the current product, identified by the index, the function creates a new object with the updated key and value.
   * For all other products, the function returns the original product object.
   * Finally, the function calls setNewInvoice with a new invoice object that merges the updated products array with the existing invoice object.
   * This function is used in the component to update the products array of the invoice object whenever a user makes changes to a product's quantity or price.
   * @param {*} key - The key to be updated in the invoice object products array at the specified index
   * @param {*} value - The value to be updated in the invoice object products array at the specified index
   * @returns
   */
  const updatedProduct = (key, value) => {
    const updatedProducts = invoice?.products.items.map((product, i) => {
      if (i === index) {
        return {
          ...product,
          [key]: value,
          productTaxRate: productTaxRate,
          productTax: productTax,
        };
      }
      return product;
    });
    setNewInvoice({
      ...invoice,
      products: { ...invoice?.products, items: updatedProducts },
    });
  };
  /**
   * handleRemoveProduct:
   * This is a function used to remove a product items from the invoice.
   * It takes an index as an argument, removes the corresponding item from the "updateItems" array, and updates the state.
   * @returns
   */
  const handleRemoveProduct = () => {
    const updateItems = [...invoice?.products.items];
    updateItems.splice(index, 1);

    setNewInvoice({
      ...invoice,
      products: {
        ...invoice.products,
        items: updateItems,
      },
    });
  };

  /**
   * useEffect:
   * This hook is used to update the amount whenever the product quantity, price, or tax rate changes.
   * The hook takes a callback function as an argument that is called whenever the productQty, productPrice, product.productsQty, product.productsPrice, productTaxRate, or amount variables change.
   * The callback function updates the productTaxRate variable with the product quantity, price, and tax rate.
   * Then, it updates the amount variable with the product quantity, price, and tax rate.
   * Finally, it calls the updatedProduct function to update the invoice object with the new amount.
   * @returns
   */
  useEffect(() => {
    setProductPrice(product.productsPrice);
    setProductQty(product.productsQty);

    const updateTaxRate =
      productTax !== 1 ? productQty * productPrice * (productTax / 100) : 0;
    const formattedTaxRate = parseFloat(updateTaxRate.toFixed(2));
    setProductTaxRate(formattedTaxRate);
    const updateAmount = productQty * productPrice + productTaxRate;
    setAmount(updateAmount);
    updatedProduct("productsRateTax", updateTaxRate);
    updatedProduct("amount", updateAmount);
  }, [
    productQty,
    productPrice,
    productTax,
    product.productsQty,
    product.productsPrice,
    productTaxRate,
    amount,
  ]);

  /**
   * handleProductChange:
   * This function is used to update the invoice object with the selected product.
   * It takes the product ID as an argument, finds the corresponding product object in the products array, and updates the state of the selectedProduct object with the product name, quantity, and price.
   * It also updates the state of the productPrice and productQty variables with the selected product's price and quantity.
   * Then, it creates a copy of the invoice object's products.items array using the spread operator.
   * Next, it updates the product at the specified index in the copied array with the selected product's name, quantity, price, and a zero amount.
   * Finally, it sets the state of the newInvoice object with the updated items array and the previous invoice object's products object using the spread operator.
   * @param {*} id - The ID of the selected product
   * @returns
   */
  const handleProductChange = (id) => {
    const selectedProduct = products.find((product) => product._id === id);
    setSelectedProduct({
      productsName: selectedProduct.productsName,
      productsQty: selectedProduct.qty,
      productsPrice: selectedProduct.productsPrice,
      productsTax: selectedProduct.productsTax,
    });
    setProductName(selectedProduct.productsName);
    setProductPrice(selectedProduct.productsPrice);
    setProductQty(selectedProduct.qty);
    setProductTax(selectedProduct.productsTax);

    const updateProduct = [...invoice.products.items];

    updateProduct[index] = {
      productsName: selectedProduct.productsName,
      productsQty: selectedProduct.qty,
      productsPrice: selectedProduct.productsPrice,
      productsTax: selectedProduct.productsTax,
    };

    setNewInvoice({
      ...invoice,
      products: { ...invoice.products, items: updateProduct },
    });
  };

  /**
   * handleChange:
   * This function is used to update the product quantity or price whenever the corresponding input is changed.
   * It takes an event object as an argument, destructures the name and value properties from the event target, and assigns them to constants.
   * Then, it checks if the name is "productsQty" or "productsPrice".
   * If the name is "productsQty", the value is set to the productQty state using the setProductQty function, and then the updatedProduct function is called with the "productsQty" key and the new value as arguments.
   * Similarly, if the name is "productsPrice", the value is set to the productPrice state using the setProductPrice function, and then the updatedProduct function is called with the "productsPrice" key and the new value as arguments.
   * Overall, this function updates the productQty or productPrice state when the corresponding input is changed, and then updates the corresponding product in the invoice by calling the updatedProduct function.
   * @param {*} event - The event object
   * @returns
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "productsName") {
      setProductName(value);
      updatedProduct("productsName", value);
    }
    if (name === "productsQty") {
      setProductQty(value);
      updatedProduct("productsQty", value);
    }
    if (name === "productsPrice") {
      setProductPrice(value);
      updatedProduct("productsPrice", value);
    }
    if (name === "productsTax") {
      const numericValue = value;
      setProductTax(numericValue);
    }
  };

  return (
    <ProductCardContainer>
      <InputsContent className="products" style={{ alignItems: "center" }}>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(productName)}>
            Product name
          </InputSpan>
          <Input
            className={isFloating(productName)}
            name="productsName"
            placeholder="Product name"
            value={productName}
            onChange={handleChange}
          />
          {!isInAuthentication ? (
            <ModalButton
            onClick={() => setShowModal(true)}>
              <HiUsers size={25} />
            </ModalButton>
          ) : null}
          {showModal &&
            createPortal(
              <Modal
                handleChange={handleProductChange}
                markup={productCardMarkup}
                headerText={"Products"}
                data={products}
                onClose={() => setShowModal(false)}
                className={showModal ? "show" : ""}
              />,
              document.body
            )}
        </InputsContainer>
        <InputsContainer className="full-33">
          <InputSpan className={isFloating(productPrice)}>Price</InputSpan>
          <Input
            className={isFloating(productPrice)}
            name="productsPrice"
            placeholder="Price"
            value={productPrice}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="mobile-up-1">
          <InputSpan className={isFloating(productQty)}>Quantity</InputSpan>
          <Input
            className={isFloating(productQty)}
            name="productsQty"
            placeholder="Quantity"
            value={productQty}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="mobile-up-1">
          <InputSpan className={isFloating(productTax)}>Tax</InputSpan>
          <Input
            className={isFloating(productTax)}
            name="productsTax"
            type="number"
            placeholder="Tax"
            value={productTax}
            onChange={handleChange}
          />
        </InputsContainer>
        
        <InputsContainer className="mobile-up-1">
          <InputSpan className={isFloating(productTaxRate)}>Tax Rate</InputSpan>
          <Input
            className={isFloating(productTaxRate)}
            name="productsRateTax"
            placeholder="Tax Rate"
            value={isNaN(productTaxRate) ? 0.0 : productTaxRate}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="mobile-up-1">
          <div>
            <AmountSpan>Amount</AmountSpan>
            <Amount>{amount || 0.0}</Amount>
          </div>
        </InputsContainer>
        <InputsContainer className="mobile-up-1">
          {index > 0 ? (
            <RemoveButton onClick={handleRemoveProduct}>
              <HiOutlineMinusCircle size={25} />
            </RemoveButton>
          ) : ( null )}
        </InputsContainer>
      </InputsContent>
    </ProductCardContainer>
  );
};

export default ProductCard;
