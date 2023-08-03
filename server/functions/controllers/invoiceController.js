const decodeToken = require("../middlewares/decodeToken.js");
var User = require("../models/userModel.js");
// POST
const addInvoice = async (req, res) => {
  const userId = decodeToken(req)
  const invoice = { ...req.body };
  try {
    const result = await User.updateOne(
      { _id: userId },
      { $push: { invoices: invoice } }
    );
    if (result.nModified === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.send("Invoice added succesfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
// GET
const getInvoices = async (req, res) => {
  const userId = decodeToken(req)
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found", userId);
      return;
    }
    res.json(user.invoices);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
// GET
const getEditInvoice = async (req, res) => {
  const userId = decodeToken(req)
  const invoiceId = req.params.invoiceId;
  try {
    const user = await User.findById(
      { _id: userId },
      { invoices: { $elemMatch: { _id: invoiceId } } }
    );
    if (!user) {
      res.status(404).send("Invoice not found");
      return;
    }
    const invoice = user.invoices[0];
    res.json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
// PUT
const putInvoice = async (req, res) => {
  const userId = decodeToken(req)
  const invoiceId = req.params.invoiceId;
  const updateInvoice = { ...req.body };
  try {
    const user = await User.updateOne(
      { _id: userId, "invoices._id": invoiceId },
      { $set: { "invoices.$": updateInvoice } }
    );
    if (user.nModified === 0) {
      res.status(404).send("User not found");
    }
    res.send("Invoice update successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
// DELETE
const deleteInvoice = async (req, res) => {
  const userId = decodeToken(req)
  const invoiceId = req.params.invoiceId;
  try {
    const result = await User.updateOne(
      { _id: userId },
      { $pull: { invoices: { _id: invoiceId } } }
    );
    if (!result) {
      res.status(404).send("Invoice not found");
      return;
    }
    res.send("Invoice removed successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
module.exports = {
  addInvoice,
  getInvoices,
  deleteInvoice,
  putInvoice,
  getEditInvoice,
};