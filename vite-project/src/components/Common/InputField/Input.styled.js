import styled from "styled-components";

export const InputsContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 5px;

  &.products {
    margin-bottom: 5px;
    flex-wrap: wrap;
    flex-direction: row;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

export const InputsContainer = styled.div`
  position: relative;
  display: flex;
  padding-left: 9px;
  padding-right: 9px;
  width: 100%;

  &.full-50 {
    width: 50%;
  }

  &.productInfo {
    display: flex;
    gap: 20px;
    @media (min-width: 1024px) {
      display: flex;
      gap: 20px;
    }
  }
  @media (min-width: 1024px) {
    &.full-33 {
      width: 33.33%;
    }

    &.full-66 {
      width: 66.66%;
    }

    &.full-10 {
      width: 10%;
    }
  }
`;

export const InputsForm = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    &.mobile-up-1 {
        width: 25%;
    }
    &.mobile-up-2 {
        width: 75%;
    }

    @media (min-width: 1199px) {
        flex-direction: row;
        gap: 20px;
    }

    &.authentication {
      @media (min-width: 1025px){
        flex-direction: column;
      }  
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

  &:focus {
    outline: none;
    border-color: #008060;
  }

  &.authentication {
    box-shadow: none;
    border: 0.0625rem solid #8c9196;

    &:focus {
      outline: none;
      border-color: #008060;
    }
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
