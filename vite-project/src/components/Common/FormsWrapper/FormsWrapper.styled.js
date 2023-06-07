import styled from "styled-components";

export const FormsWrapperStyled = styled.div`
  background: linear-gradient(153.13deg, #c7edec 10.04%, #eefab3 91.46%),
    #e5fbba;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 15rem;

  @media (min-width: 1025px) {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }

  @media (min-width: 500px) {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 2.5rem;
  background-color: #fff;
  @media screen and (min-width: 1024px) {
    margin-left: 10vw;
    margin-right: 10vw;
    border-radius: 8px;
    max-width: 34rem;
    max-height: 40rem;
    -webkit-box-shadow: 6px 12px 60px rgba(0, 0, 0, 0.2);
    box-shadow: 6px 12px 60px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 500px) {
    width: 100%;
  }
`;

export const Wrapper = styled.div`
  width: 50%;

  @media (min-width: 1025px) {
    width: 100%;
    height: 100%;
  }
`;
export const FormHeader = styled.div`
  margin-bottom: 2.5rem;
`;

export const FormTitle = styled.h1`
  width: 7.3125rem;
  font-size: 2rem;
  line-height: 1;
`;
