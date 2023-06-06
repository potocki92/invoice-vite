import styled from "styled-components";

export const InputsContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 5px;

  &.products {
    margin-bottom: 5px;
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
