import { InfoWrapperStyled, InfoWrapperTitle } from "./InfoWrapper.styled"

const InfoWrapper = ({title}) => {
    return (
        <InfoWrapperStyled>
            <InfoWrapperTitle>{title}</InfoWrapperTitle>
        </InfoWrapperStyled>
    )
}

export default InfoWrapper