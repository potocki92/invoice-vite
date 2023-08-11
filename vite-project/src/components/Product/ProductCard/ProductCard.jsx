import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductCard.css";
import {
  InfoCount,
  InfoCountSpan,
} from "@components/Invoice/InvoiceInputs/InvoiceInputs.styled";
import { ModalButton } from "@components/Common/Modal/Modal.styled";
import { HiUsers } from "react-icons/hi";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { RemoveButton } from "@components/buttons.styled";
import { ProductCardContainer } from "./ProductCard.styled";
import isFloating from "@utils/isFloating";
import {
  InputsContent,
  InputsContainer,
  Input,
  InputSpan,
} from "@components/Common/InputField/Input.styled";
import { removeProductFromInvoice, updateProductData } from "@redux/invoices/single/slice";
import { selectAllProducts } from "@redux/products/selectors";
import { setProductTaxRate } from "@redux/products/slice";
import InputField from "../../Common/InputField/InputField";
import { inputsProduct } from "./inputs";
import productCardMarkup from "@markups/productCardMarkup";
/**
 * This component renders a product card with the product name, quantity, price, tax, and amount.
 * It also renders a button to remove the product from the invoice.
 * The component takes the following props:
 *
 * @param {number} index - The index of the product in the invoice products array
 * @param {Object} product - The product object
 * @param {Object} invoice - The invoice object
 * @param {Function} setNewInvoice - The function to update the invoice object
 * @param {Array} products - The list of products
 * @returns {JSX} - Returns the product card component
 */
const ProductCard = ({
  index,
  product,
  isInAuthentication,
}) => {
  // Local state for the product data
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)
  const [productName, setProductName] = useState(product.productsName || "");
  const [productQty, setProductQty] = useState(product.qty || "");
  const [productPrice, setProductPrice] = useState(product.productsPrice || "");
  const [productTax, setProductTax] = useState(product.productsTax || "");

  const [amount, setAmount] = useState(product.amount || 0);
  

  const productTaxRate = useMemo(() => {
    const taxRate = product.productsTax || 0;
    return taxRate !== 1 ? productQty * productPrice * (taxRate / 100) : 0;
  }, [productQty, productPrice, product.productsTax]);

  /*
   * This useEffect hook is used to update the local state of the component
   * whenever the "product" prop changes. The "product" prop contains the data
   * received from the Redux store for the specific product card.
   * 
   * It updates the local state variables with the values from the "product" object,
   * or with default values if the values don't exist in the "product" object.
   */
  useEffect(() => {
    setProductName(product.productsName || "");
    setProductQty(product.qty || "");
    setProductPrice(product.productsPrice || "");
    setProductTax(product.productsTax || "");
    setAmount(product.amount || 0);
  }, [product]);

  /**
   * This function is used to handle the removal of a product from the invoice.
   * It dispatches the "removeProductFromInvoice" action to update the state.
   */
  const handleRemoveProduct = () => {
    dispatch(removeProductFromInvoice(index))
  };

  /*
   * This hook is used to update the amount whenever the product quantity, price, or tax rate changes.
   * The hook takes a callback function as an argument that is called whenever the productQty, productPrice, product.productsQty, product.productsPrice, productTaxRate, or amount variables change.
   * The callback function updates the productTaxRate variable with the product quantity, price, and tax rate.
   * Then, it updates the amount variable with the product quantity, price, and tax rate.
   * Finally, it updates the state of the component with the new amount.
   */
  useEffect(() => {
    // Calculate the updated tax rate based on the current state values
    const updateTaxRate =
      productTax !== 1 ? productQty * productPrice * (productTax / 100) : 0;
    const formattedTaxRate = parseFloat(updateTaxRate.toFixed(2));
    if (!isNaN(updateTaxRate) && isFinite(updateTaxRate)) {
      dispatch(setProductTaxRate({ index: product._id, taxRate: formattedTaxRate }));
    }
  
    // Calculate the updated amount based on the current state values
    const updateAmount = productQty * productPrice + formattedTaxRate;
    if (!isNaN(updateAmount) && isFinite(updateAmount)) {
      setAmount(updateAmount);
    }
  }, [productQty, productPrice, productTax]);
  /**
   * This function is used to update the invoice object with the selected product.
   *
   * @param {string} id - The ID of the selected product
   */
  const handleProductChange = (productId) => {
    const selectedProduct = products.find((product) => product._id === productId);
    if (selectedProduct) {
      dispatch(
        updateProductData({
          index,
          key: "productsName",
          value: selectedProduct.productsName,
        })
      );
      dispatch(
        updateProductData({
          index,
          key: "qty",
          value: selectedProduct.qty,
        })
      );
      dispatch(
        updateProductData({
          index,
          key: "productsPrice",
          value: selectedProduct.productsPrice,
        })
      );
      dispatch(
        updateProductData({
          index,
          key: "productsTax",
          value: selectedProduct.productsTax,
        })
      );
    }
  };
  
 /**
   * This function is used to update the product quantity, price, or tax whenever the corresponding input is changed.
   *
   * @param {Object} event - The event object
   */
 const handleChange = (event) => {
  const { name, value } = event.target;
    dispatch(updateProductData({ index, key: name, value: value }));
  };

  return (
    <ProductCardContainer>
      <InputsContent className="products" style={{ alignItems: "center" }}>
        {inputsProduct.map((input) => (
            <InputField 
              key={input.id}
              {...input}
              containerClass={input.containerClass}
              value={product[input.data]}
              onChange={input.handle === "handleChange" ? handleChange : null}
              handleProductChange={handleProductChange}
              markup={productCardMarkup}
              modalData={products}
              isInAuthentication={isInAuthentication}
            />
        ))}

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
