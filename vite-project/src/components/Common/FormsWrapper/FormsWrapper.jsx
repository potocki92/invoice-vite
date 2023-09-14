import React from 'react'
import { FormsWrapperStyled } from './FormsWrapper.styled'

/**
 * Represents a wrapper component for forms, providing styling and layout.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be wrapped by the FormsWrapper.
 * @returns {JSX.Element} - The rendered FormsWrapper component.
 */
const FormsWrapper = ({children}) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default FormsWrapper