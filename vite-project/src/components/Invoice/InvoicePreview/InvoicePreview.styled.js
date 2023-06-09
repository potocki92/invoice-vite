import styled from "styled-components";

export const InvoicePreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 17px rgba(16, 40, 73, 0.09);
  position: relative;
  background-color: rgb(255, 255, 255);
  padding: 2rem;
  margin: 2rem 0;

  @media (min-width: 1199px) {
    width: 50%;
    height: 100%;

    min-width: 21cm;
    min-height: 29.7cm;
  }
`;

export const InvoicePreviewContent = styled.div`
  display: flex;
  background-color: ${(props) => props.backgroundColor}};
  color: ${(props) => props.color}};
  border-bottom: ${(props) => props.borderBottom}};
  padding: ${(props) => props.padding || "0"}};
  margin: ${(props) => props.margin || "0"}};
`;

export const InvoicePreviewWrapper = styled.div`
  padding: ${(props) => props.padding || "0"}}; 
  display: flex;
  justify-content: ${(props) => props.justifyContent || "flex-start"}};
  flex-direction: ${(props) => props.flexDirection || "column"}};
  width: ${(props) => props.width || "100%"}};
  background-color: ${(props) => props.backgroundColor}};
`;
export const InvoicePreviewTitle = styled.span`
  text-align: ${(props) => props.textAlign || "left"}};
  font-size: ${(props) => props.fontSize || "2rem"};
  font-weight: 700;
  text-transform: uppercase;

  @media (min-width: 1199px) {
    font-size: 2.5rem;
  }
`;

export const InvoicePreviewSpan = styled.span`
  text-align: ${(props) => props.textAlign || "left"}};
  font-size: ${(props) => props.fontSize || "0.7rem"};
  font-weight: 600;
  text-transform: uppercase;  
  
  @media (max-width: 393px ) {  
    font-size: 0.5rem;
  }
  @media (min-width: 412px ) {
    font-size: 0.6rem;
  }

  @media (min-width: 1199px) {
    font-size: 1rem;
  }
  `;
  
  export const InvoicePreviewText = styled.p`
  font-size: ${(props) => props.fontSize || "1rem"};
  text-align: ${(props) => props.textAlign || "left"}};
  font-weight: ${(props) => props.fontWeight || "400"};

  @media (min-width: 1199px) {
    font-size: 0.9rem;
  }
`;
