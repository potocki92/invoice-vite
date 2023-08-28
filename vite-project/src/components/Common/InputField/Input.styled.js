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
  align-items: flex-start;
  width: 100%;
  padding: 0 9px 0 9px;

  &.forms {
    padding: 0;
  }
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

  &.buttons {
    gap: 10px;
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
    }

    &.authentication {
      @media (min-width: 1025px){
        flex-direction: column;
      }  
    }
}
`;

export const ErrorMessage = styled.span`
  border: 1px solid #d11534;
  background: #fad1d8;
  margin-top: 15px;
  padding: 15px;
`;
export const InputSpan = styled.label`
  position: absolute;
  top: 0;
  left: 30px;
  translate: 10px 20px;
  transition: translate 500ms, scale 500ms;
`;

export const Input = styled.input`
  font: inherit;
  width: 100%;
  padding: 10px 40px;
  border: none;
  border-radius: 4px;
  outline: 1px solid black;
  background-color: transparent;
  transition: outline-color 500ms;
  margin: 10px 0;
  &:is(:focus, :valid) {
    outline-color: #008060;
  }
  &:focus + ${InputSpan}, &:valid + ${InputSpan}, &.has-content + ${InputSpan} {
    padding-inline: 5px;
    translate: 10px -2px;
    scale: 0.8;
    background-color: #fff;
  }
`;

export const Icon = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
`;
