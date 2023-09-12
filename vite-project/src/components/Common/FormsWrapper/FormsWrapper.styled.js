import styled from "styled-components";

export const FormsWrapperStyled = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15rem;
  padding: 0 20px;
  @media (min-width: 1025px) {
    justify-content: center;
    align-items: center;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  max-height: 40rem;
  background: #fff;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 320px;
  min-width: 200px;
  @media screen and (min-width: 600px) {
    max-width: 480px;
  }
  @media screen and (min-width: 1024px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 625px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media screen and (min-width: 600px) {
    font-size: 18px;
  }

  &::after,
  &::before {
    position: absolute;
    top: 0;
    width: 50%;
    height: 70px;
    content: "";
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &::after {
    left: 0;
    content: "Sign up";
    box-shadow: inset -16px -6px 16px -15px rgba(0, 0, 0, 0.2);
    background: #fbfcff;
  }

  &::before {
    right: 0;
    content: "Log in";
  }

  &.register {
    &:after {
      box-shadow: none;
      background: #353535;
    }
    &::before {
      box-shadow: inset 16px -6px 16px -15px rgba(0, 0, 0, 0.2);
      background: #f9fbfb;
    }
  }
`;

export const FormTitle = styled.h1`
  font-size: 2rem;
  line-height: 1;
`;
