import { useDispatch } from "react-redux";
import { CloseModal, ModalCard, ModalCardWrapper, ModalHeader, ModalInner, ModalPortal, ModalStyled } from "./Modal.styled"
import { CgCloseO } from "react-icons/cg";
/**
 * Modal component to display the data in a modal window
 * @param {*} handleChange  function to handle the change of the selected item
 * @param {*} markup  function to create the markup for the modal window
 * @param {*} headerText  text to display in the modal header
 * @param {*} data  data to display in the modal window
 * @param {*} onClose  function to handle the closing of the modal window
 * @returns 
 */
const Modal = ({ handleChange, markup, headerText, data, onClose }) => {
    const createMarkup = (item) => {
        return {__html: markup(item)};
    }
    return (
    <ModalPortal>
        <ModalStyled>
            <ModalInner>
                <ModalHeader>{headerText}</ModalHeader>
                <CloseModal onClick={onClose}>
                    <CgCloseO size={30}/>
                </CloseModal>
                {data.map((item) => (
                    <ModalCard key={item._id} onClick={() => handleChange(item._id)}>
                    <ModalCardWrapper dangerouslySetInnerHTML={createMarkup(item)}/>
                    </ModalCard>
                ))}
            </ModalInner>
        </ModalStyled>
    </ModalPortal>
)
}    

export default Modal