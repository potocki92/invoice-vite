import styled from "styled-components";

export const InvoiceContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    @media (min-width: 1199px) {
        flex-direction: row;
        gap: 20px
    }
`