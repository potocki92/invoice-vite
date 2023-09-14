import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { homeLink } from "../../../utils/linkConfig";

/**
 *  InvoiceItem component is used to render each invoice item in the list of invoices in the home page.
 * @param {object} invoice - object that contains the invoice data.
 * @param {function} onRemove - function that is used to remove the invoice from the list of invoices.
 * @returns
 */
const InvoiceItem = ({ invoice, onDelete }) => {
  return (

    <li className="px-[10px] flex justify-between items-center h-[50px] w-full rounded bg-[#353535] text-[#FBFCFF]">
        <Link to={`${homeLink}/invoice/${invoice._id}`}>
          <FaEdit />
        </Link>
        <div className="w-full flex gap-12 px-[15px]">
          <p>{invoice.invoiceNumber}</p>
          <p>{invoice.dueDate}</p>
          <p>{invoice.clientName}</p>
        </div>
        <div onClick={() => onDelete(invoice._id)}>
          <RiDeleteBin2Fill />
        </div>
    </li>
  );
};

export default InvoiceItem;
