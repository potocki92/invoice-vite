import React from "react";
import "./ProductForm.css";
import InputField from "../InputField/InputField";
import productFormInput from "./productFormInputs";

/**
 * @class
 * @classdesc Represents a modal window component that displays a form for adding a new product to a list.
 * The form includes fields for the product name and price, as well as checkboxes for selecting the applicable tax rate.
 * The component also includes event handlers for handling form submission and checkbox selection,
 * and manages the state of the selected tax rate.
 * @extends React.Component
 */
class ProductForm extends React.Component {
  state = {
    checked: false,
    selectedTaxIndex: -1,
  };

  /**
   * This function is triggered when the user selects or unselects a tax rate checkbox.
   * @function
   * @param {event} event - The event object.
   * @returns {void}
   */
  handleCheckboxChange = (event) => {
    console.log(event);
    const index = parseInt(event.target.value);
    const value = this.props.taxRate[index];
    console.table(value);

    if (this.state.selectedTaxIndex === index) {
      this.setState({ selectedTaxIndex: -1 });
      this.props.handleVatChange(event, -1);
    } else {
      this.setState({ selectedTaxIndex: index });
      this.props.handleVatChange(event, index);
    }
  };
  /**
   * This function is triggered when the user submits the form.
   * @function
   * @param {event} event - The event object.
   * @returns {void}
   */
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleClick(event);
    this.setState({ selectedTaxIndex: -1, checked: false });

    // Reset inputs
    const inputs = document.querySelectorAll(".input");
    inputs.forEach((input) => {
      input.value = "";
    });
  };

  render() {
    return (
      <div className="container-product">
        <form className="details__box" onSubmit={this.handleSubmit}>
          {productFormInput(this.props).map((input) => (
            <InputField input={input} handleChange={this.props.handleChange} />
          ))}
          <div className="form__group ">
            <p>Tax</p>
            <div className="checkbox__container">
              {this.props.taxRate.map((tax, index) => (
                <div className="checkbox__card" key={index}>
                  <input
                    className="input-checkbox"
                    name={"productsTax"}
                    type="checkbox"
                    value={index}
                    checked={this.state.selectedTaxIndex === index}
                    onChange={this.handleCheckboxChange}
                  />
                  <p className="checkbox__text">{tax.name}</p>
                </div>
              ))}
            </div>
          </div>
          <button className="button" type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default ProductForm;
