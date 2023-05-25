import styled from "styled-components";

export const InvoiceContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    @media (min-width: 769px) {
        flex-direction: row;
    }
`