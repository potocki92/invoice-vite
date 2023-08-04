import React, { useState } from "react";
import clientFormInput from "./clientFormInputs";
import InputField from "@components/Common/InputField/InputField";
import { addClient } from "@redux/clients/operations"
import { Types } from "mongoose";
import { useDispatch } from "react-redux";

/**
 * Represents a form component that displays input fields based on the `clientFormInput` configuration.
 * It handles form data using the `useState` hook and provides input fields for user input.
 * @param {Object} props - Component props.
 * @param {Function} props.handleClick - Callback function to handle form submission.
 * @returns {JSX.Element} - Rendered form component.
 */
const ClientForm = () => {
  const dispatch = useDispatch()
  const [newClient, setNewClient] = useState({
    _id: new Types.ObjectId(),
    clientName: "",
    clientNip: "",
    clientRegon: "",
    clientEmail: "",
    clientPhone: "",
    clientCity: "",
    clientPostal: "",
    clientAddress: "",
  });
  /**
   * Handles changes in the input fields and updates the form data state accordingly.
   * @param {Event} e - The input change event.
   * @returns {void}
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewClient({ ...newClient, [name]: value });
  };

  /* This function adds a new client to the database when the 'Add Client' button is clicked, and resets the newClient state */
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(addClient(newClient))
      .then((res) => {
        setNewClient({
          _id: new Types.ObjectId(),
          clientName: "",
          clientNip: "",
          clientRegon: "",
          clientEmail: "",
          clientPhone: "",
          clientCity: "",
          clientPostal: "",
          clientAddress: "",
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <form className="details__box">
      {clientFormInput(newClient).map((input) => (
        <InputField
          key={input.name}
          input={input}
          handleChange={handleChange}
          value={newClient[input.name] || ""}
        />
      ))}
      <button className="button mark__as-btn" type="submit" onClick={handleClick}>
        Click
      </button>
    </form>
  );
};

export default ClientForm;
