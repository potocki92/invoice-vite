import { CloseModal, ModalInner, ModalPortal, ModalStyled } from "./Modal.styled"

const Modal = ({ onClose }) => {
    return (
        <ModalPortal>
            <ModalStyled>
                <ModalInner>
                    <CloseModal onClick={onClose}></CloseModal>
                </ModalInner>
            </ModalStyled>
        </ModalPortal>
    )
}    

export default Modal