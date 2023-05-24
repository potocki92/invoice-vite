import React, { useState, useEffect } from "react";
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import {
  InvoiceButton,
  InvoiceInner,
  InvoiceListItem,
} from "./InvoiceList.styled";
import { Link, useNavigate } from "react-router-dom";
import { homeLink } from "../../utils/linkConfig";

const InvoiceItem = ({ invoice, onRemove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigation = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let timeoutId = null;

    if (offsetX === 50) {
      timeoutId = setTimeout(() => {
        navigation(`${homeLink}/invoice/${invoice._id}`);
      }, 1000)
    }

    if (offsetX === -50) {
      timeoutId = setTimeout(() => {
        onRemove
      }, 1000)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [offsetX, navigation, invoice, onRemove]);

  const handleMouseDown = (event) => {
    event.preventDefault();
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(event.clientX);
    setOffsetX(0);
  };

  const handleMouseMove = (event) => {
    event.preventDefault();
    if (!isDragging) return;

    const newOffsetX = event.clientX - startX;
    const boundedOffsetX = Math.min(50, Math.max(-50, newOffsetX));
    setOffsetX(boundedOffsetX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);
    if (offsetX !== 0) {
      setOffsetX(0);
    }
  };

  return (
    <InvoiceListItem
      className={`list-item ${isDragging ? 'dragging' : ''}`}
      style={{
        transform: `translateX(${offsetX}px)`,
        
        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
      }}
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
        <InvoiceButton className={`
          ${offsetX === 50 ? "left" : ""}`}>
          <FaEdit/>
        </InvoiceButton>
      </Link>
      <InvoiceButton onClick={onRemove} className={`
          ${offsetX === -50 ? "right" : ""}`}>
          <RiDeleteBin2Fill/>
      </InvoiceButton>
    </InvoiceListItem>
  );
};

export default InvoiceItem;
