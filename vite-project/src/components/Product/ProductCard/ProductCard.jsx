import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import {
  InfoCount,
  InfoCountSpan,
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
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromInvoice, updateProductData } from "../../../redux/invoiceSlice";

/**
 * This component renders a product card with the product name, quantity, price, tax, and amount.
 * It also renders a button to remove the product from the invoice.
 *
 * @param {Object} props - The component props
 * @param {number} props.index - The index of the product in the invoice products array
 * @param {Object} props.product - The product object
 * @param {Object} props.invoice - The invoice object
 * @param {Function} props.setNewInvoice - The function to update the invoice object
 * @param {Array} props.products - The list of products
 * @param {boolean} props.isInAuthentication - Flag indicating whether the component is in authentication mode
 * @returns {JSX} Returns the product card component
 */
const ProductCard = ({
  index,
  product,
  setNewInvoice,
  products,
  isInAuthentication,
}) => {
  // State for the selected product
  const [selectedProduct, setSelectedProduct] = useState({});
  // Local state for the product data
  const [productName, setProductName] = useState(product.productsName || "");
  const [productQty, setProductQty] = useState(product.qty || "");
  const [productPrice, setProductPrice] = useState(product.productsPrice || "");
  const [productTax, setProductTax] = useState(product.productsTax || "");
  const [productTaxRate, setProductTaxRate] = useState(0);
  const [amount, setAmount] = useState(product.amount || 0);
  
  const dispatch = useDispatch()
  const invoice = useSelector((state) => state.invoice)
  const [showModal, setShowModal] = useState(false);

  console.log(product);
  /**
   * This function is used to handle the removal of a product from the invoice.
   * It dispatches the "removeProductFromInvoice" action to update the state.
   */
  const handleRemoveProduct = () => {
    dispatch(removeProductFromInvoice(index))
  };

  /**
   * This hook is used to update the amount whenever the product quantity, price, or tax rate changes.
   * The hook takes a callback function as an argument that is called whenever the productQty, productPrice, product.productsQty, product.productsPrice, productTaxRate, or amount variables change.
   * The callback function updates the productTaxRate variable with the product quantity, price, and tax rate.
   * Then, it updates the amount variable with the product quantity, price, and tax rate.
   * Finally, it updates the state of the component with the new amount.
   */
  useEffect(() => {
    setProductPrice(product.productsPrice);
    setProductQty(product.qty);

    const updateTaxRate =
      productTax !== 1 ? productQty * productPrice * (productTax / 100) : 0;
    const formattedTaxRate = parseFloat(updateTaxRate.toFixed(2));
    if (!isNaN(updateTaxRate) && isFinite(updateTaxRate)) {
      setProductTaxRate(formattedTaxRate);
    }
    const updateAmount = productQty * productPrice + productTaxRate;
    if (!isNaN(updateAmount) && isFinite(updateAmount)) {
      setAmount(updateAmount);
    }
  }, [
    productQty,
    productPrice,
    productTax,
    product.qty,
    product.productsPrice,
    productTaxRate,
    amount,
  ]);

  /**
   * This function is used to update the invoice object with the selected product.
   *
   * @param {string} id - The ID of the selected product
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
   * This function is used to update the product quantity, price, or tax whenever the corresponding input is changed.
   *
   * @param {Object} event - The event object
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "productsName") {
      setProductName(value);
      dispatch(updateProductData({ index, key: "productsName", value }));
    }
    if (name === "productsQty") {
      // If the value is empty, set it to an empty string
      setProductQty(value === "" ? "" : parseFloat(value));
      dispatch(updateProductData({ index, key: "qty", value: value === "" ? "" : parseFloat(value) }));
    }
    if (name === "productsPrice") {
      // If the value is empty, set it to an empty string
      setProductPrice(value === "" ? "" : parseFloat(value));
      dispatch(updateProductData({ index, key: "productsPrice", value: value === "" ? "" : parseFloat(value) }));
    }
    if (name === "productsTax") {
      // If the value is empty, set it to an empty string
      setProductTax(value === "" ? "" : parseFloat(value));
      dispatch(updateProductData({ index, key: "productsTax", value: value === "" ? "" : parseFloat(value) }));
    }
  };

  return (
    <ProductCardContainer>
      <InputsContent className="products" style={{ alignItems: "center" }}>
        <InputsContainer className="full-66">
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
            <ModalButton onClick={() => setShowModal(true)}>
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
        <InputsContainer className="full-33 full-50">
          <InputSpan className={isFloating(productPrice)}>Price</InputSpan>
          <Input
            className={isFloating(productPrice)}
            type="number"
            name="productsPrice"
            placeholder="Price"
            value={productPrice || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33 full-50">
          <InputSpan className={isFloating(productQty)}>Quantity</InputSpan>
          <Input
            className={isFloating(productQty)}
            type="number"
            name="productsQty"
            placeholder="Quantity"
            value={productQty || ""}
            onChange={handleChange}
          />
        </InputsContainer>
        <InputsContainer className="full-33 full-50">
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

        <InputsContainer className="full-33 full-50 productInfo">
          <div>
            <InfoCountSpan>Tax Rate</InfoCountSpan>
            <InfoCount>{productTaxRate || 0.0}</InfoCount>
          </div>
          <div>
            <InfoCountSpan>Amount</InfoCountSpan>
            <InfoCount>{amount || 0.0}</InfoCount>
          </div>
          {index > 0 ? (
            <RemoveButton onClick={handleRemoveProduct}>
              <HiOutlineMinusCircle size={25} />
            </RemoveButton>
          ) : (
            <div></div>
          )}
        </InputsContainer>
      </InputsContent>
    </ProductCardContainer>
  );
};

export default ProductCard;
