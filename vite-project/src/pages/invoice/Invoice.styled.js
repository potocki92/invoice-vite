import styled from "styled-components";

export const InvoiceContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    @media (min-width: 769px) {
        flex-direction: row;
    }
`