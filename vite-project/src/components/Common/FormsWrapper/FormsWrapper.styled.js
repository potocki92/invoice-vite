import styled from "styled-components";

export const FormsWrapperStyled = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15rem;
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
  max-width: 34rem;
  max-height: 40rem;
  background: #fff;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.2);
  width: 65vw;
  min-width: 200px;
  @media screen and (min-width: 1024px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after,
  &::before {
    position: absolute;
    top: 0;
    width: 50%;
    height: 50px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.2);
    content: "";
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &::after {
    left: 0;
    content: "Sign up";
  }

  &::before {
    right: 0;
    content: "Log in";
  }
`;

export const FormTitle = styled.h1`
  font-size: 2rem;
  line-height: 1;
`;
