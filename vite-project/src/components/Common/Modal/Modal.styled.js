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
  padding: 1.5rem;
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

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e3e3e3;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.2;
`

export const ModalCard = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 0 0 1px rgba(0,0,0,.05), 0 1px 3px 0 rgba(0,0,0,.15);
    border: 1px solid transparent;
    transition: box-shadow 150ms ease;
    &:hover {
        box-shadow: 0 0 0 1px rgba(0,0,0,.05), 0 2px 8px 0 rgba(0,0,0,.2);
    }

`
export const ModalCardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
export const ModalButton = styled.button`
  position: absolute;
  height: calc(100% - 15px);
  width: 58px;
  right: 2px;
  background-color: transparent;
  color: #555;
`

export const CloseModal = styled.button`
  border: none;
  display: flex;
  position: absolute;
  z-index: 4;
  right: 5px;
  top: 5px;
  border-radius: 50%;
  cursor: pointer;
  background-color: transparent;
  color: #555;
`;