import styled from "styled-components";

export const InputsContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 5px;

  &.products {
    flex-wrap: wrap;
    flex-direction: row;
  }
`;

export const InputsContainer = styled.div`
    position: relative;
    display: block;
    padding-left: 4px;
    padding-right: 4px;
    &.mobile-up-1 {
        width: 25%;
    }
    &.mobile-up-2 {
        width: 75%;
    }
}
`;

export const Input = styled.input`
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
  &.floating {
    padding-top: 1.5em;
    padding-bottom: 0.5em;
  }
`;

export const InputSpan = styled.span`
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

export const AmountSpan = styled.span`
  position: relative;
  opacity: 1;
  display: block;
  margin-bottom: 0.6153846154em;
  font-family: ShopifySans, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 0.8125em;
  color: #42474c;
`;
export const Amount = styled.div`
  display: block;
  margin-bottom: 0.625em;
  color: #212326;
  font-size: 1em;
  line-height: 1.33333125;
  font-weight: 500;
  font-family: ShopifySans, Helvetica, Arial, sans-serif;
`;