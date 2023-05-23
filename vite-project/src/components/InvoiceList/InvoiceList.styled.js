import styled from "styled-components";

export const InvoiceListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InvoiceListItem = styled.li`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  width: 100%;
  padding: 8px;
  background-color: red;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  > a {
    text-decoration: none;
  }
`;

export const InvoiceInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const EditButton = styled.button`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`

export const DeleteButton = styled.button`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`
export const StyledBox = styled.div`
  margin-bottom: 1.9rem;
  width: 100%
`;
