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
  border-radius: 5px;
  color: #ffffff;
  font-weight: 700;
  font-size: 1em;
  line-height: 1.133;
  padding: 1em 1.8125em;
  text-decoration: none;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : "auto")};
  appearance: none;

  @media (min-width: 1199px) {
    margin-left: 0;
  }

  &:hover {
      box-shadow: 0 5px 25px 0 rgba(0,0,0,0.25);
      background: #3cb0fd;
      text-decoration: none;
  }

  &.back {
    background: #e74c3c;

    &:hover {
        background: #e94c4f;
        text-decoration: none;
    }
  }

  &.submit {
    background-color: #008060;
    margin-top: 1em;

    &:hover {
      box-shadow: 0 5px 25px 0 rgba(0,0,0,0.25);
      background-color: #004c3f;
      color: #ffffff;
    }
  }
`;
