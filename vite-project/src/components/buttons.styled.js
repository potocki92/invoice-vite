import styled from "styled-components";

export const AddButton = styled.button`
  background-color: transparent;
  display: flex;
  align-items: center;
  color: #555;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2;
  padding-bottom: 1rem;
  gap: 0.5rem;
`;

export const AddButtonWrapper = styled.div`
  padding-left: 4px;
  padding-right: 4px;
  margin-bottom: 1rem;
`;
export const RemoveButton = styled.button`
  background-color: transparent;
  color: #555;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2;
  width: 66px;
`;

export const DefaultButton = styled.button`
  background: #3498db;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  color: #ffffff;
  font-size: 15px;
  padding: 5px 20px 5px 20px;
  text-decoration: none;
  margin-left: auto;

  @media (min-width: 1199px) {
    margin-left: 0;
  }

  &:hover {
      background: #3cb0fd;
      text-decoration: none;
  }

  &.back {
    background: #e74c3c;

    &:hover {
        background: #e94c4f;
        text-decoration: none;
    }
`;
