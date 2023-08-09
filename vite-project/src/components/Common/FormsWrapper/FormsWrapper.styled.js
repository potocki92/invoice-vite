import styled from "styled-components";

export const FormsWrapperStyled = styled.div`
  background: linear-gradient(153.13deg, #c7edec 10.04%, #eefab3 91.46%),
    #e5fbba;
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
  padding: 2.5rem;
  background-color: #fff;
  border-radius: 8px;
  max-width: 34rem;
  max-height: 40rem;
  box-shadow: 6px 12px 60px rgba(0, 0, 0, 0.2);
  width: 80vw; /* Używam 80vw dla płynności */
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
  margin-bottom: 5.5rem;
  position: absolute;
  top: 0;
  left: 0;
`;

export const FormTitle = styled.h1`
  font-size: 2rem;
  line-height: 1;
`;
