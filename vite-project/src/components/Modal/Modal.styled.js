import styled from "styled-components";

export const ModalPortal = styled.div`
  opacity: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  transition: all 0.3s ease;
  z-index: 99;

  &.show {
    opacity: 0;
    transition: all 0.3s ease;
  }
`;

export const ModalStyled = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  background: #fff;
  overflow: initial;
  border-radius: 4px;
  outline: none;
`;

export const ModalInner = styled.div`
  height: 75vh;
  width: 968px;
  overflow-y: auto;

  @media (max-width: 420px) {
    width: 320px;
  }
  @media (min-width: 421px) {
    width: 360px;
  }

  @media (min-width: 768px) {
    width: 560px;
  }
  @media (min-width: 992px) {
    width: 700px;
  }
`;

export const CloseModal = styled.button`
  border: none;
  display: flex;
  width: 45px;
  height: 45px;
  position: absolute;
  z-index: 4;
  right: 8px;
  top: 8px;
  border-radius: 50%;
  cursor: pointer;
`;