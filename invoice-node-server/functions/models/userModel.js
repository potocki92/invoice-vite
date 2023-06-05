const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: { type: Object, default: {} },
  products: { type: Array, default: [] },
  clients: { type: Array, default: [] },
  invoices: { type: Array, default: [] },
});

const User = new mongoose.model("User", userSchema);

module.exports = User;