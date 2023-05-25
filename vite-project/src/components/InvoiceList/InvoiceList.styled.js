import styled from "styled-components";

export const InvoiceListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100vw;
  position: absolute;
  left: 0;
  @media (min-width: 769px) {
    width: 100%;
    position: relative;
  }
`;

export const StyledBox = styled.div`
  margin-bottom: 1.9rem;
  width: 100%;
`;