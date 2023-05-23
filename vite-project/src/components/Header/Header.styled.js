import styled from "styled-components";

export const HeaderStyled = styled.header`
  padding: 20px 0;
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;

  .container {
    margin: 0 59px;
  }
`;

export const MobileHeader = styled.div`
  position: fixed;
  right: 20px;
  top: 13px;
  z-index: 99;
  display: none;

  @media screen and (max-width: 1199px) {
    display: block;
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
