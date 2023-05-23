import styled from "styled-components";

export const SidebarStyled = styled.div`
  width: 345px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;

  @media (max-width: 768px) {
    display: none;
  }
`;
