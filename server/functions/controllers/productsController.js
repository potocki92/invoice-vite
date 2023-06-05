const decodeToken = require("../middlewares/decodeToken.js");
var User = require("../models/userModel.js");

// POST
const addProduct = async (req, res) => {
  const userId = decodeToken(req)
  const product = { ...req.body };
  console.log(id, product);
  try {
    const result = await User.updateOne(
      { _id: userId },
      { $push: { products: product } }
    );
    if (result.nModified === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.send("Product added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// GET
const getProducts = async (req, res) => {
  try {
    const userId = decodeToken(req)
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.json(user.products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  const userId = decodeToken(req)
  const productId = req.params.productId;
  try {
    const result = await User.updateOne(
      { _id: userId },
      { $pull: { products: { _id: productId } } }
    );
    if (!result) {
      res.status(404).send("Product not found");
      return;
    }
    res.send("Product removed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
module.exports = { addProduct, getProducts, deleteProduct };