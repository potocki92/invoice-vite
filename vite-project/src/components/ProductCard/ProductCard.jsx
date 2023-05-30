import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import {
  Amount,
  AmountSpan,
  Input,
  InputSpan,
  InputsContainer,
  InputsContent,
} from "../InvoiceInputs/InvoiceInputs.styled";
import { ModalButton } from "../Modal/Modal.styled";
import { HiUsers } from "react-icons/hi";
import Modal from "../Modal/Modal";
import { createPortal } from "react-dom";
import productCardMarkup from "../../markups/productCardMarkup";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { RemoveButton } from "../buttons.styled";
import { ProductCardContainer } from "./ProductCard.styled";
/**
 *   This component renders a product card with the product name, quantity, price, tax, and amount.
 *  It also renders a button to remove the product from the invoice.
 * The component takes the following props:
 *
 * @param {*} props
 * @returns
 */
const ProductCard = ({ index, product, invoice, setNewInvoice, products }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productName, setProductName] = useState(product.productsName);
  const [productQty, setProductQty] = useState(product.productsQty);
  const [productPrice, setProductPrice] = useState(product.productsPrice);
  const [productTax, setProductTax] = useState(product.productsTax);
  const [productTaxRate, setProductTaxRate] = useState(product.productsRateTax);
  const [amount, setAmount] = useState(1);
  const [showModal, setShowModal] = useState(false);
  /*
  This function takes in two arguments, key and value, and updates the invoice object with the new value.
  The function first creates a new array of updatedProducts by iterating over the invoice.products.items array using the map method.
  For the current product, identified by the index, the function creates a new object with the updated key and value.
  For all other products, the function returns the original product object.
  Finally, the function calls setNewInvoice with a new invoice object that merges the updated products array with the existing invoice object.
  This function is used in the component to update the products array of the invoice object whenever a user makes changes to a product's quantity or price.
*/
  const updatedProduct = (key, value) => {
    const updatedProducts = invoice.products.items.map((product, i) => {
      if (i === index) {
        return {
          ...product,
          [key]: value,
          productTaxRate: productTaxRate,
        };
      }
      return product;
    });
    console.log(updatedProducts);
    setNewInvoice({
      ...invoice,
      products: { ...invoice.products, items: updatedProducts },
    });
  };
  /*
  handleRemoveProduct:
  This is a function used to remove a product items from the invoice.
  It takes an index as an argument, removes the corresponding item from the "updateItems" array, and updates the state.
*/
  const handleRemoveProduct = () => {
    const updateItems = [...invoice.products.items];
    updateItems.splice(index, 1);

    setNewInvoice({
      ...invoice,
      products: {
        ...invoice.products,
        items: updateItems,
      },
    });
  };

  // Update amount for every change of productQty, productPrice, product.productsQty, product.productsPrice, productTaxRate or amount
  useEffect(() => {
    setProductPrice(product.productsPrice);
    setProductQty(product.productsQty);

    const updateTaxRate =
      productTax !== 1 ? productQty * productPrice * productTax?.value : 0;
    setProductTaxRate(updateTaxRate);
    const updateAmount = productQty * productPrice + productTaxRate;
    setAmount(updateAmount);
    updatedProduct("productsRateTax", updateTaxRate);
    updatedProduct("amount", updateAmount);
  }, [
    productQty,
    productPrice,
    product.productsQty,
    product.productsPrice,
    productTaxRate,
    amount,
  ]);

  /*
  This code defines a function handleProductChange that is called when the user selects a product from a list.
  First, the function extracts the ID of the selected product from the event object and finds the corresponding product object in the products array.
  Then, it updates the state of the selectedProduct object with the name, quantity, and price of the selected product, and sets the amount to 0.
  The function also updates the state of the productPrice and productQty variables with the selected product's price and quantity.
  Next, the function creates a copy of the invoice object's products.items array using the spread operator.
  Then, the function updates the product at the specified index in the copied array with the selected product's name, quantity, price, and a zero amount.
  Finally, the function sets the state of the newInvoice object with the updated items array and the previous invoice object's products object using the spread operator.
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

    const updateProduct = [...invoice.products.items]; // copy all products from invoice.products

    // updates a specific product in an array of products
    updateProduct[index] = {
      productsName: selectedProduct.productsName,
      productsQty: selectedProduct.qty,
      productsPrice: selectedProduct.productsPrice,
      productsTax: selectedProduct.productsTax,
    };

    // updates the products object of the invoice object
    setNewInvoice({
      ...invoice,
      products: { ...invoice.products, items: updateProduct },
    });
  };

  /*
  This code defines a function called handleChange which takes an event object as an argument.
  Inside the function, the name and value properties of the event target are destructured and assigned to constants.

  The function then checks if the name property is equal to "productsQty" or "productsPrice".
  If the name is "productsQty", the value is set to the productQty state using the setProductQty function,
  and then the updatedProduct function is called with the "productsQty" key and the new value as arguments.

  Similarly, if the name is "productsPrice", the value is set to the productPrice state using the setProductPrice function,
  and then the updatedProduct function is called with the "productsPrice" key and the new value as arguments.

  Overall, this function updates the productQty or productPrice state when the corresponding input is changed,
  and then updates the corresponding product in the invoice by calling the updatedProduct function.
*/
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "productsQty") {
      setProductQty(value);
      updatedProduct("productsQty", value);
    }
    if (name === "productsPrice") {
      setProductPrice(value);
      updatedProduct("productsPrice", value);
    }
  };

  const isFloating = (value) => {
    if (value) {
      return "floating";
    } else {
      return "";
    }
  };

  return (
    <ProductCardContainer>
      <InputsContent className="products" style={{ alignItems: "center" }}>
        <InputsContainer className="mobile-up-2">
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
          <ModalButton onClick={() => setShowModal(true)}>
            <HiUsers size={25} />
          </ModalButton>
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
        <InputsContainer className="mobile-up-1">
          <InputSpan className={isFloating(productQty)}>
            Quantity
          </InputSpan>
          <Input
            className={isFloating(productQty)}
            name="productsQty"
            placeholder="Quantity"
            value={productQty}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="mobile-up-1">
          <InputSpan className={isFloating(productTax?.name)}>Tax</InputSpan>
          <Input
            className={isFloating(productTax?.name)}
            name="productsTax"
            placeholder="Tax"
            value={productTax?.name || "0%"}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="mobile-up-1">
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
          <InputSpan className={isFloating(productTaxRate)}>Tax Rate</InputSpan>
          <Input
            className={isFloating(productTaxRate)}
            name="productsRateTax"
            placeholder="Tax Rate"
            value={productTaxRate || "Tax Rate"}
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
          <RemoveButton onClick={handleRemoveProduct}>
            <HiOutlineMinusCircle size={25} />
          </RemoveButton>
        </InputsContainer>
      </InputsContent>
    </ProductCardContainer>
  );
};

export default ProductCard;
