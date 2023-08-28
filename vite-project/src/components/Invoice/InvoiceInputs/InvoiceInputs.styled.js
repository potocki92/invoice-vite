import styled, { css } from "styled-components";
import { ModalButton } from "../../../components/Common/Modal/Modal.styled";
import { InputSpan } from "../../Common/InputField/Input.styled";

export const InvoiceInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;

  ${(props) =>
    props.showButtons &&
    css`
      ${ModalButton} {
        display: none;
      }
    `}
`;

export const Select = styled.select`
  display: inline-block;
  height: 3.2em;
  width: 100%;
  margin: 0 0 15px;
  padding: 1em 0.9375em;
  color: #212326;
  font-family: Open Sans, sans-serif;
  font-size: 1em;
  box-shadow: 0 0 0 1px #6b7177;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: transparent;
  transition: padding 150ms;
  -webkit-appearance: none;
  appearance: none;

  &.floating {
    padding-top: 1.5em;
    padding-bottom: 0.5em;
  }
`;

export const Option = styled.option`
  position: absolute;
  left: 1rem;
  top: 0.5rem;
  font-size: 0.6875em;
  font-weight: 400;
  pointer-events: none;
  z-index: 10;
  opacity: 0;
  -webkit-transform: translateY(3px);
  transform: translateY(3px);
  transition-property: opacity, -webkit-transform;
  transition-property: opacity, transform;
  transition-property: opacity, transform, -webkit-transform;
  transition-duration: 150ms;

  &.floating {
    opacity: 1;
    transform: translateY(0);
  }
`;
export const TextArea = styled.textarea`
  display: inline-block;
  height: 3.2em;
  width: 100%;
  margin: 0 0 15px;
  padding: 1em 0.9375em;
  color: #212326;
  font-family: ShopifySans, Helvetica, Arial, sans-serif;
  font-size: 1em;
  box-shadow: 0 0 0 1px #6b7177;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: transparent;
  transition: padding 150ms;
  -webkit-appearance: none;
  appearance: none;
  min-height: 8.75em;
  &:is(:focus, :valid) {
    outline-color: #008060;
  }
  &:focus + ${InputSpan}, &.has-content + ${InputSpan} {
    padding-inline: 5px;
    translate: 10px -12px;
    scale: 0.8;
    background-color: #fff;
  }
`;

export const InfoCountSpan = styled.span`
  position: relative;
  opacity: 1;
  display: block;
  margin-bottom: 0.6153846154em;
  font-family: ShopifySans, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 0.8125em;
  color: #42474c;
`;
export const InfoCount = styled.div`
  display: block;
  margin-bottom: 0.625em;
  color: #212326;
  font-size: 1em;
  line-height: 1.33333125;
  font-weight: 500;
  font-family: ShopifySans, Helvetica, Arial, sans-serif;
`;
