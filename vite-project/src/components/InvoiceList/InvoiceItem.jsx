import React, { useState, useRef } from "react";
import {
  DeleteButton,
  EditButton,
  InvoiceInner,
  InvoiceListItem,
} from "./InvoiceList.styled";
import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";
import { homeLink } from "../../utils/linkConfig";

const InvoiceItem = ({ invoice, onRemove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const listItemRef = useRef(null);
  const initialMouseXRef = useRef(null);
  const initialOffsetXRef = useRef(null);

  const handleDrag = () => {
    setIsDragging(true);
  };

  const handleDelete = () => {
    setIsDeleted(true);
    onRemove(invoice._id);
  };

  const [{ isDraggingItem }, drag] = useDrag({
    type: "CARD",
    collect: (monitor) => ({
      isDraggingItem: monitor.isDragging(),
    }),
  });

  const handleMouseDown = (event) => {
    setIsDragging(true);
    initialMouseXRef.current = event.clientX;
    initialOffsetXRef.current = listItemRef.current.getBoundingClientRect().left;
  };

  const handleMouseMove = (event) => {
    if (isDragging && initialMouseXRef.current !== null) {
      const offsetX = event.clientX - initialMouseXRef.current;
      const newOffsetX = offsetX - initialOffsetXRef.current;

      if (newOffsetX <= -150) {
        handleDelete();
      } else {
        listItemRef.current.style.transform = `translateX(${newOffsetX}px)`;
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    initialMouseXRef.current = null;
    initialOffsetXRef.current = null;
    listItemRef.current.style.transform = "none";
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      initialMouseXRef.current = null;
      initialOffsetXRef.current = null;
      listItemRef.current.style.transform = "none";
    }
  };
  return (
    <InvoiceListItem
      ref={listItemRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <InvoiceInner ref={drag} onDrag={handleDrag}>
        <p>{invoice.invoiceNumber}</p>
        <p>{invoice.client.clientName}</p>
        <p>{invoice.date.invoiceDate}</p>
      </InvoiceInner>
      <Link to={`${homeLink}/invoice/${invoice._id}`}>
        <EditButton>Edit</EditButton>
      </Link>
      <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
    </InvoiceListItem>
  );
};

export default InvoiceItem;
