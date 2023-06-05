const express = require("express");
const {
  loginUser,
  registerUser,
  getUser,
  putUser,
} = require("./controllers/userController.js");
const {
  addProduct,
  getProducts,
  deleteProduct,
} = require("./controllers/productsController.js");
const {
  addClient,
  deleteClient,
  getClients,
} = require("./controllers/clientController.js");
const {
  addInvoice,
  getInvoices,
  deleteInvoice,
  getEditInvoice,
  putInvoice,
} = require("./controllers/invoiceController.js");
const authenticateToken = require("./middlewares/authMiddleware.js");
const router = express.Router();

/* 
AUTHENTICATION USER 
*/

// LOGIN USER
router.post("/login", loginUser);
// REGISTER USER
router.post("/register", registerUser);

/* 
PRODUCTS  
*/

// POST
router.post("/addProduct", authenticateToken, addProduct);
// GET
router.get("/products", authenticateToken, getProducts);
// DELETE
router.delete("/products/:productId", authenticateToken, deleteProduct);

/*
CLIENTS
*/

// POST
router.post("/addClient", authenticateToken, addClient);
// GET
router.get("/clients", authenticateToken, getClients);
// DELETE
router.delete("/clients/:clientId", authenticateToken, deleteClient);

/*
INVOICES
*/

// POST
router.post("/addInvoice", authenticateToken, addInvoice);
// GET
router.get("/invoices", authenticateToken, getInvoices);
// GET
router.get("/invoice/:invoiceId", authenticateToken, getEditInvoice);
// DELETE
router.delete("/invoice/:invoiceId", authenticateToken, deleteInvoice);
// PUT
router.put("/invoice/:invoiceId", authenticateToken, putInvoice);

/*
USER
*/

// GET
router.get("/user", authenticateToken, getUser);

// PUT
router.put("/user", authenticateToken, putUser);

module.exports = router;