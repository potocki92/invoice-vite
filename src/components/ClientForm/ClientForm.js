/*
This is a React component for a form that displays various input fields.
It uses the clientFormInput constant to generate the input fields based on the props passed in.
It renders the InputField component for each input in the clientFormInput array and passes in the input object as a prop.
It also passes in the handleChange function as a prop to handle changes in the input fields.
The handleClick function is called when the form is submitted.
*/

import React from "react";
import clientFormInput from "./clientFormInputs";
import InputField from "../InputField/InputField";

class ClientForm extends React.Component {
  render() {
    return (
      <form
        className="details__box"
        onSubmit={(e) => this.props.handleClick(e)}
      >
        {clientFormInput(this.props).map((input) => (
          <InputField input={input} handleChange={this.props.handleChange} />
        ))}
        <button className="button mark__as-btn" type="submit">
          Click
        </button>
      </form>
    );
  }
}

export default ClientForm;
