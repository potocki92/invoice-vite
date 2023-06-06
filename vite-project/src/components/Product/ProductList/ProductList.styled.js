import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  width: 100%;
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  > a {
    text-decoration: none;
  }
`;

export const ProductName = styled.h3`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 4px;
  margin-top: 8px;
  margin-bottom: 0;
  color: #fff;
`;
