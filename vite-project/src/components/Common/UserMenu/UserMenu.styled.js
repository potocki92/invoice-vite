import styled from "styled-components";

export const UserMenuStyled = styled.div`
    display: flex;
    gap: 8px;
    justify-content: end;
    padding: 20px;
    @media (max-width: 769px) {
        display: none; 
    }
`

export const UserLogoutButton = styled.button`
    width: 30px;
    height: 30px;
    display: flex;
    order: 1;
    flex-grow: 0;
    padding: 0;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0px 0px 3px 2px #9babc5;
    color: #9babc5;
    justify-content: center;
    align-items: center;
    transition: color 0.5s ease-in-out, box-shadow 0.5s ease-in-out;  
    cursor: pointer;
    &:hover {
    color: #428777;
    box-shadow: 0px 0px 3px 2px #428777;
    }
`
export const UserLogo = styled.button`
  display: flex;  
  align-items: center;  
  gap: 20px;
  cursor: pointer;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  img {
    width: 40px;
    height: 40px;
  }
  span {
    font-family: "Nunito";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    color: #ffffff;
  }
`;
