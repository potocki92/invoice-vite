import React, { useState } from "react";
import { Icon, Input, InputSpan, InputsContainer } from "./Input.styled";
import isFloating from "../../../utils/isFloating";
import { useSelector } from "react-redux";
import { ModalButton } from "../Modal/Modal.styled";
import { HiUser } from "react-icons/hi";
import Modal from "@components/Common/Modal/Modal";
import { createPortal } from "react-dom";
import InvoiceInputs from "../../Invoice/InvoiceInputs/InvoiceInputs";

/**
 * The InputField component is used to display a form field.
 * @param {Object} props - Object containing input parameters.
 * @param {Object} props.input - Object containing form field properties such as name, className, typeText, value, placeholder, and required.
 * @param {Function} props.handleChange - Function handling changes in the form fields.
 * @returns {JSX.Element} - Returns a JSX element representing the form field.
 */
const InputField = (props) => {
  const [showModal, setShowModal] = useState(false);
  const editingMode = useSelector((state) => state.invoice.isEditing);
  const invoice = !editingMode
  ? useSelector((state) => state.invoice.invoice)
  : useSelector((state) => state.invoice.editInvoice);
  const { markup, isInAuthentication, label, onChange, handleProductChange, containerClass, id, data,modalData, value, isForm, icon, ...inputProps } = props;
  console.log(isInAuthentication, inputProps.modal);

  const getValueByDataKey = (obj, key) => {
    if (key) {
      const keys = key.split('.');
      let value = obj;
      for (const k of keys) {
        value = value[k];
        if (value === undefined) break;
      }
      return value;
    }
  };
  
  return (
    <InputsContainer className={`${isForm ? "forms" : ""} ${containerClass}`}>
      <Input
        id={id}
        className={`${isForm ? "forms" : ""
        } ${value ? "has-content" : ""}`}
        {...inputProps}
        value={getValueByDataKey(invoice, data)}
        onChange={(e) => {
          onChange(e);
        }}
      />
        <InputSpan for={id} className={isFloating(value)}>{label}</InputSpan>
      <Icon>
        {icon}
      </Icon>
      {!isInAuthentication && inputProps.modal ? (
        <ModalButton onClick={() => setShowModal(true)}>
          <HiUser size={25} />
        </ModalButton>
      ) : null}
      {showModal &&
            createPortal(
              <Modal
                handleChange={handleProductChange}
                markup={markup}
                headerText={"Products"}
                data={modalData}
                onClose={() => setShowModal(false)}
                className={showModal ? "show" : ""}
              />,
              document.body
            )}
    </InputsContainer>
  );
};
export default InputField;
