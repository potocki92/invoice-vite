import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import {
  InvoiceButton,
  InvoiceInner,
  InvoiceListContent,
  InvoiceListItem,
} from "./InvoiceItem.styled";
import { Link } from "react-router-dom";
import { homeLink } from "../../../utils/linkConfig";
import { useRef } from "react";

/**
 *  InvoiceItem component is used to render each invoice item in the list of invoices in the home page.
 * @param {object} invoice - object that contains the invoice data.
 * @param {function} onRemove - function that is used to remove the invoice from the list of invoices.
 * @returns
 */
const InvoiceItem = ({ invoice, onDelete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const invoiceItemRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    // Call the handleResize function when the window is resized
    handleResize();
    window.addEventListener("resize", handleResize);
    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /**
   *  handleMouseDown function is used to handle the mouse down event on the invoice item.
   * It is used to set the isDragging state to true and set the startX state to the current clientX position.
   * The offsetX state is used to translate the invoice item to the left or right when the user swipes the item.
   * The isDragging state is used to add the dragging class to the invoice item.
   * @param {object} event - the mouse down event object.
   * @returns
   */
  const handleMouseDown = (event) => {
    event.preventDefault();
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(event.clientX - offsetX);
  };
  /**
   *  handleMouseMove function is used to handle the mouse move event on the invoice item.
   *  It is used to calculate the new offsetX value and set it to the offsetX state.
   *  The new offsetX value is calculated by subtracting the startX value from the current clientX position.
   *  The new offsetX value is bounded between -50 and 50.
   *  The offsetX state is used to translate the invoice item to the left or right when the user swipes the item.
   *  The isDragging state is used to add the dragging class to the invoice item.
   *  @param {object} event - the mouse move event object.
   * @returns
   */
  const handleMouseMove = (event) => {
    event.preventDefault();
    if (!isDragging) return;

    const newOffsetX = event.clientX - startX;
    const boundedOffsetX = Math.min(50, Math.max(-50, newOffsetX));
    setOffsetX(boundedOffsetX);
  };
  /**
   * handleMouseUp function is used to handle the mouse up event on the invoice item.
   * It is used to set the isDragging state to false and set the offsetX state to 0.
   * The offsetX state is used to translate the invoice item to the left or right when the user swipes the item.
   * The isDragging state is used to add the dragging class to the invoice item.
   *  @param {object} event - the mouse up event object.
   * @returns
   */
  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);
  };
  /**
   * handleMouseLeave function is used to handle the mouse leave event on the invoice item.
   * It is used to set the isDragging state to false and set the offsetX state to 0.
   * The offsetX state is used to translate the invoice item to the left or right when the user swipes the item.
   * The isDragging state is used to add the dragging class to the invoice item.
   * @param {object} event - the mouse leave event object.
   * @returns 
   */
  const handleTouchStart = (event) =>{
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(event.touches[0].clientX - offsetX);
  }
  /**
   * handleTouchMove function is used to handle the touch move event on the invoice item.
   * It is used to calculate the new offsetX value and set it to the offsetX state.
   * The new offsetX value is calculated by subtracting the startX value from the current clientX position.
   * The new offsetX value is bounded between -50 and 50.
   * The offsetX state is used to translate the invoice item to the left or right when the user swipes the item.
   * The isDragging state is used to add the dragging class to the invoice item.
   * @param {object} event - the touch move event object.
   * @returns 
   */
  const handleTouchMove = (event) => {
    if (!isDragging) return;

    const newOffsetX = event.touches[0].clientX - startX;
    const boundedOffsetX = Math.min(50, Math.max(-50, newOffsetX))
    setOffsetX(boundedOffsetX)
  }
  /**
   * handleTouchEnd function is used to handle the touch end event on the invoice item.
   * It is used to set the isDragging state to false and set the offsetX state to 0.
   * The offsetX state is used to translate the invoice item to the left or right when the user swipes the item.
   * The isDragging state is used to add the dragging class to the invoice item.
   * @param {object} event - the touch end event object.
   * @returns 
   */
  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false)
  }

  /**
   * handleTouchCancel function is used to handle the touch cancel event on the invoice item.
   * It is used to set the isDragging state to false and set the offsetX state to 0.
   * The offsetX state is used to translate the invoice item to the left or right when the user swipes the item.
   * The isDragging state is used to add the dragging class to the invoice item.
   * @param {object} event - the touch cancel event object.
   * @returns
   */
  const handleTouchCancel = () => {
    if (!isDragging) return;
    setIsDragging(false)
    setOffsetX(0)
  }

  /**
   * handleClickOutside function is used to handle the click outside event on the invoice item.
   * It is used to set the offsetX state to 0.
   * The offsetX state is used to translate the invoice item to the left or right when the user swipes the item.
   * The invoiceItemRef is used to check if the user clicked outside the invoice item.
   * If the user clicked outside the invoice item, the offsetX state is set to 0.
   * @param {*} event
   * @param {*} invoiceItemRef
   * @returns 
   */
  const handleClickOutside = (event) => {
    if (
      invoiceItemRef.current &&
      !invoiceItemRef.current.contains(event.target)
    ) {
      setOffsetX(0);
    }
  };

  // Add event listeners to the document when the component mounts and remove them when the component unmounts.
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <InvoiceListItem>
      <InvoiceListContent
        className={`list-item ${isDragging ? "dragging" : ""}`}
        style={{
          transform: `translateX(${offsetX}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        ref={invoiceItemRef}
      >
        <InvoiceInner>
          <p>{invoice.invoiceNumber}</p>
          <p>{invoice.clientName}</p>
          <p>{invoice.invoiceDate}</p>
        </InvoiceInner>
        <Link to={`${homeLink}/invoice/${invoice._id}`}>
          <InvoiceButton
            className={`
            ${offsetX === 50 ? "left" : ""}`}
          >
            <FaEdit />
          </InvoiceButton>
        </Link>
        <InvoiceButton
          onClick={() => onDelete(invoice._id)}
          className={`
          ${offsetX === -50 ? "right" : ""}`}
        >
          <RiDeleteBin2Fill />
        </InvoiceButton>
      </InvoiceListContent>
    </InvoiceListItem>
  );
};

export default InvoiceItem;
