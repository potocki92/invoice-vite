import styled from "styled-components";

export const TotalSummaryContainer = styled.div`
  margin-top: 2em;
  width: 100%;
`;

export const TotalSpan = styled.span`
  font-size: 1.5em;
  font-weight: 700;
  line-height: 1.2;
  text-align: right;
  margin-bottom: 0.5em;
`;

export const SubtotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 1em 2em;
  width: 100%;
  background: rgb(240, 241, 242);
  border: 0 solid #e5e7eb;
  & ${TotalSpan} {
    color: rgb(66, 71, 76);
    flex-grow: 1;
    width: 50%;
    text-align: right;
    margin-bottom: 0px;
    display: block;
    margin-bottom: 0.625em;
    color: rgb(33, 35, 38);
    font-size: 1em;
    line-height: 1.33333;
    font-weight: 500;
  }
`;

export const SubtotalWrapper = styled.div`
  display: flex;
`;
export const TotalHeading = styled.h3`
  padding-top: 0.625em;
  flex-grow: 1;
  width: 50%;
  display: block;
  margin-bottom: 1.42857em;
  font-size: 0.875em;
  line-height: 1.14286;
  text-transform: uppercase;
  letter-spacing: 0.04375em;
`;

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background: rgb(0, 45, 45);
  padding: 1em 2em;
  border-radius: 0px 0px 4px 4px;
  width: 100%;
  color: rgb(255, 255, 255);

  & ${TotalSpan} {
    display: block;
    font-size: 1.25em;
    margin-bottom: 0.9em;
    line-height: 1.33333;
    font-weight: 400;
  }
`;
