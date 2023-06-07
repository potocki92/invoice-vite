import React from 'react'
import { FormsWrapperStyled } from './FormsWrapper.styled'

const FormsWrapper = ({children}) => {
  return (
    <FormsWrapperStyled>
        {children}
    </FormsWrapperStyled>
  )
}

export default FormsWrapper