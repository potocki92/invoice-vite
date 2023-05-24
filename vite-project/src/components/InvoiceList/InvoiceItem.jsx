import React, { useState, useRef, useEffect } from "react";
import {
  DeleteButton,
  EditButton,
  InvoiceInner,
  InvoiceListItem,
} from "./InvoiceList.styled";
import { Link } from "react-router-dom";
import { homeLink } from "../../utils/linkConfig";

const InvoiceItem = ({ invoice, onRemove }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [offsetX, setOffsetX] = useState(0) 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Sprawdź szerokość ekranu na początku
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseDown = (event) => {
    event.preventDefault();
    if (!isMobile) return; 
    setIsDragging(true);
    setStartX(event.clientX);
    setOffsetX(0)
  }

  const handleMouseMove = (event) => {
    event.preventDefault()
    if(!isDragging) return

    const newOffsetX = event.clientX - startX
    const boundedOffsetX = Math.min(150, Math.max(-150, newOffsetX))
    setOffsetX(boundedOffsetX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setOffsetX(0)
  }

  return (
    <InvoiceListItem style={{transform: `translateX(${offsetX}px)`, overflowX: 'hidden',}}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <InvoiceInner>
        <p>{invoice.invoiceNumber}</p>
        <p>{invoice.client.clientName}</p>
        <p>{invoice.date.invoiceDate}</p>
      </InvoiceInner>
      <Link to={`${homeLink}/invoice/${invoice._id}`}>
        <EditButton>Edit</EditButton>
      </Link>
      <DeleteButton onClick={onRemove}>Delete</DeleteButton>
    </InvoiceListItem>
  );
};

export default InvoiceItem;
