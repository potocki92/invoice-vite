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

export const InvoiceListContent = styled.div`
  position: relative;
  background-color: #ffffff;
  cursor: pointer;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 8px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  > a {
    text-decoration: none;
  }
`;
export const InvoiceListItem = styled.li`
  width: 100%;
  height: 100%;
  background-color: #71e086;
  left: 0;
  top: 0;
`;

export const InvoiceInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const InvoiceButton = styled.button`
  width: 50px;
  height: 50px;
  display: none;
  z-index: 1;
  background-color: transparent;
  &.left {
    display: block;
    position: absolute;
    left: -50px;
    top: 0;
  }
  &.right {
    display: block;
    position: absolute;
    right: -50px;
    top: 0;
  }
  @media (min-width: 769px) {
    display: block;
  }
`;

export const StyledBox = styled.div`
  margin-bottom: 1.9rem;
  width: 100%;
`;
