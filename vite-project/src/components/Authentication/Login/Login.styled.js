import styled from "styled-components";

export const LoginStyled = styled.div`
display: flex;
flex-direction: column;
width: 100%;
padding: 25px;
`;

export const LoginTitle = styled.h1`
  font-size: 1.5rem;
  line-height: 1.2em;
  margin-bottom: 1rem;
  font-weight: 500;
`;

export const LoginText = styled.p`
  margin-top: 1.5rem;
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #454f5b;
  & a {
    color: #008060;
    cursor: pointer;
  }
`