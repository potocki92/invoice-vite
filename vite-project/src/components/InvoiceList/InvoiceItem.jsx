import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import {
  InvoiceButton,
  InvoiceInner,
  InvoiceListContent,
  InvoiceListItem,
} from "./InvoiceList.styled";
import { Link, useNavigate } from "react-router-dom";
import { homeLink } from "../../utils/linkConfig";
/**
 *  InvoiceItem component is used to render each invoice item in the list of invoices in the home page.
 * @param {object} invoice - object that contains the invoice data.
 * @param {function} onRemove - function that is used to remove the invoice from the list of invoices.
 * @returns
 */
const InvoiceItem = ({ invoice, onRemove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [touchPosition, setTouchPosition] = useState(null);
  const navigation = useNavigate();

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
  useEffect(() => {
    let timeoutId = null;
    // If the user swipes the item to the right, navigate to the invoice page after 1 second delay to allow the animation to finish first.
    if (offsetX === 50) {
      timeoutId = setTimeout(() => {
        navigation(`${homeLink}/invoice/${invoice._id}`);
      }, 1000);
    }
    // If the user swipes the item to the left, remove the invoice from the list of invoices after 1 second delay to allow the animation to finish first.
    if (offsetX === -50) {
      timeoutId = setTimeout(() => {
        onRemove(invoice._id);
      }, 1000);
    }
    // Clear the timeout when the component is unmounted  or when the offsetX is changed.
    return () => {
      clearTimeout(timeoutId);
    };
  }, [offsetX, navigation, invoice, onRemove]);

  /**
   *  handleMouseDown function is used to handle the mouse down event on the invoice item.
   *  It is used to set the isDragging state to true and set the startX state to the current clientX position.
   *  It also sets the offsetX state to 0.
   *  The offsetX state is used to translate the invoice item to the left or right when the user swipes the item.
   *  The isDragging state is used to add the dragging class to the invoice item.
   * @param {object} event - the mouse down event object.
   * @returns
   */
  const handleMouseDown = (event) => {
    event.preventDefault();
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(event.clientX);
    setOffsetX(0);
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
   *  handleMouseUp function is used to handle the mouse up event on the invoice item.
   *  It is used to set the isDragging state to false and set the offsetX state to 0.
   *  The offsetX state is used to translate the invoice item to the left or right when the user swipes the item.
   *  The isDragging state is used to add the dragging class to the invoice item.
   *  @param {object} event - the mouse up event object.
   * @returns
   */
  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);
    if (offsetX !== 0) {
      setOffsetX(0);
    }
  };
  /**
   *  handleMouseLeave function is used to handle the mouse leave event on the invoice item. 
   *  It is used to set the isDragging state to false and set the offsetX state to 0.
   *  The offsetX state is used to translate the invoice item to the left or right when the user swipes the item.
   *  The isDragging state is used to add the dragging class to the invoice item.
   *  @param {object} event - the mouse leave event object. 
   * @returns 
   */
  const handleTouchStart = (event) =>{
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(event.touches[0].clientX);
    setOffsetX(0);
  }
  /**
   *  handleTouchMove function is used to handle the touch move event on the invoice item.
   *  It is used to calculate the new offsetX value and set it to the offsetX state.
   *  The new offsetX value is calculated by subtracting the startX value from the current clientX position.
   *  The new offsetX value is bounded between -50 and 50.
   *  The offsetX state is used to translate the invoice item to the left or right when the user swipes the item.
   *  The isDragging state is used to add the dragging class to the invoice item.
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
   *  handleTouchEnd function is used to handle the touch end event on the invoice item.  
   *  It is used to set the isDragging state to false and set the offsetX state to 0.
   *  The offsetX state is used to translate the invoice item to the left or right when the user swipes the item.
   *  The isDragging state is used to add the dragging class to the invoice item.
   *  @param {object} event - the touch end event object.
   * @returns 
   */
  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false)
    if (offsetX !== 0) {
      setOffsetX(0)
    }
  }

  /**
   * handleTouchCancel function is used to handle the touch cancel event on the invoice item.
   *  It is used to set the isDragging state to false and set the offsetX state to 0.
   *  The offsetX state is used to translate the invoice item to the left or right when the user swipes the item.
   *  The isDragging state is used to add the dragging class to the invoice item.
   *  @param {object} event - the touch cancel event object.
   * @returns
   */
  const handleTouchCancel = () => {
    if (!isDragging) return;
    setIsDragging(false)
    setOffsetX(0)
  }
  return (
    <InvoiceListItem>
      <InvoiceListContent
        className={`list-item ${isDragging ? "dragging" : ""}`}
        style={{
          transform: `translateX(${offsetX}px)`,
          borderRadius: isDragging ? "5px" : "",
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
      >
        <InvoiceInner>
          <p>{invoice.invoiceNumber}</p>
          <p>{invoice.client.clientName}</p>
          <p>{invoice.date.invoiceDate}</p>
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
          onClick={onRemove}
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
