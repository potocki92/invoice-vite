import React from "react";
import { Input, InputSpan, InputsContainer, InputsForm } from "../../InputField/Input.styled";
import isFloating from "../../../utils/isFloating";
import { DefaultButton } from "../../buttons.styled";

/**
 * @class
 * @classdesc Represents a modal window component that displays a form for adding a new product to a list.
 * The form includes fields for the product name and price, as well as checkboxes for selecting the applicable tax rate.
 * The component also includes event handlers for handling form submission and checkbox selection,
 * and manages the state of the selected tax rate.
 * @extends React.Component
 */
const ProductForm = ({ newProduct, handleClick, handleChange }) => {
  /**
   * This function is triggered when the user submits the form.
   * @function
   * @param {event} event - The event object.
   * @returns {void}
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    handleClick(event);

    // Reset inputs
    const inputs = document.querySelectorAll(".input");
    inputs.forEach((input) => {
      input.value = "";
    });
  };

  return (
    <InputsForm onSubmit={handleSubmit}>
      <InputsContainer>
        <InputSpan className={isFloating(newProduct.productsName)}>
          Product name
        </InputSpan>
        <Input
          className={isFloating(newProduct.productsName)}
          type="text"
          name="productsName"
          value={newProduct.productsName}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />
      </InputsContainer>
      <InputsContainer>
        <InputSpan className={isFloating(newProduct.productsPrice)}>
          Price
        </InputSpan>
        <Input
          className={isFloating(newProduct.productsPrice)}
          type="number"
          name="productsPrice"
          value={newProduct.productsPrice}
          onChange={handleChange}
          placeholder="Enter price"
          required
        />
      </InputsContainer>
      <InputsContainer>
        <InputSpan className={isFloating(newProduct.productsTax)}>
          Tax
        </InputSpan>
        <Input
          className={isFloating(newProduct.productsTax)}
          type="number"
          name="productsTax"
          value={newProduct.productsTax}
          onChange={handleChange}
          placeholder="Enter tax"
          required
        />
      </InputsContainer>
      <DefaultButton type="submit">Add</DefaultButton>
    </InputsForm>
  );
};

export default ProductForm;
