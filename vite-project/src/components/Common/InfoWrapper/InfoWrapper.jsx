import { InfoWrapperStyled, InfoWrapperTitle } from "./InfoWrapper.styled"

/**
 * Represents a wrapper component for displaying information with a title.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title to be displayed in the InfoWrapper.
 * @returns {JSX.Element} - The rendered InfoWrapper component.
 */
const InfoWrapper = ({title}) => {
    return (
        <InfoWrapperStyled>
            <InfoWrapperTitle>{title}</InfoWrapperTitle>
        </InfoWrapperStyled>
    )
}

export default InfoWrapper