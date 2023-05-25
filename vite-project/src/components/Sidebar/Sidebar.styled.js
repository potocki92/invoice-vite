import styled from "styled-components";
import { UserMenuStyled } from "../UserMenu/UserMenu.styled";

export const SidebarStyled = styled.div`
  z-index: 98;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  transition: all 0.5s ease;
  min-width: 200px;
  transform: translateX(-100%);
  &.menu-open {
    transform: translateX(0);
  }

  @media (max-width: 769px) {
    height: 100%;
  }
  
  @media (min-width: 769px) {
    transform: translateX(0);
    position: relative;

  }
  ${UserMenuStyled} {
    display: none;
    @media (max-width: 769px) {
      display: flex;
      margin-left: auto;
      margin-top: auto;
    }
  }
`;

export const SidebarTitle = styled.span`
  padding-top: 48px;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 54px;
  color: #222132;
`;

export const SidebarNavlink = styled.nav`
  padding: calc(86px - 21.75px) 0 0 25px;
  width: 100%;
  @media (max-width: 768px) {
    padding: calc(86px - 21.75px) 0 0 10px;
  }
`;

export const SidebarButton = styled.button`
  background-color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 32px;
  padding: 0;
  color: #9babc5;
`;

export const SidebarSpan = styled.span`
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #9babc5;
`;

export const SidebarList = styled.ul`
  width: 100%;
`;

export const SidebarItem = styled.li`
  margin: 21.75px 0;
  cursor: pointer;
  &:hover {
    border-right: 6px solid #428777;
    path {
      color: #428777;
      transition: color 0.25s ease-in-out;
    }
    ${SidebarSpan} {
      color: #428777;
      transition: color 0.25s ease-in-out;
    }
  }
`;
export const MobileSidebar = styled.div`
  position: fixed;
  right: 20px;
  top: 13px;
  z-index: 99;
  display: block;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

export const ToggleMenuButton = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  border-radius: 50%;
  cursor: pointer;
  margin: 0;
  padding: 0 15px;
  border: none;
  z-index: 100;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  background-color: rgb(255, 255, 255);
`;

export const BurgerIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s;
  height: 100%;

  span {
    position: relative;
    width: 150%;
    margin-top: -4px;

    &::before {
      left: 0;
      border-radius: 3px 0 0 3px;
      content: "";
      position: absolute;
      top: 0;
      background: currentColor;
      height: 4px;
      width: 50%;
      transition: 0.25s cubic-bezier(0.6, 0, 0.3, 1);
      transform-origin: center center;
        }

    &::after {
      right: 0;
      border-radius: 0 3px 3px 0;
      content: "";
      position: absolute;
      top: 0;
      background: currentColor;
      height: 4px;
      width: 50%;
      transition: 0.25s cubic-bezier(0.6, 0, 0.3, 1);
      transform-origin: center center;
        }
    }
    span + span {
      margin-top: 8px;
    }
  }

  &.active {
    span:nth-of-type(1):before {
      transform: translate3d(3px, 4.5px, 0) rotate(45deg);
    }

    span:nth-of-type(1):after {
      transform: translate3d(-3px, 4.5px, 0) rotate(-45deg);
    }

    span:nth-of-type(3):before {
      transform: translate3d(3px, -5.5px, 0) rotate(-45deg);
    }

    span:nth-of-type(3):after {
      transform: translate3d(-3px, -5.5px, 0) rotate(45deg);
    }

    span:nth-of-type(2):before, span:nth-of-type(2):after {
      opacity: 0.0001;
    }

    span:nth-last-of-type(2)::before {
      transform: translateX(-200%);
    }

    span:nth-last-of-type(2)::after {
      transform: translateX(200%);
    }
    
  }
`;
