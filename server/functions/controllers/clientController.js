var User = require("../models/userModel.js");

// POST
const addClient = async (req, res) => {
  const userId = decodeToken(req)
  const client = { ...req.body };
  console.log(id, client);
  try {
    const result = await User.updateOne(
      { _id: userId },
      { $push: { clients: client } }
    );
    if (result.nModified === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.send("Client added succesfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

// GET
const getClients = async (req, res) => {
  try {
    const userId = decodeToken(req)
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not founr");
      return;
    }
    res.json(user.clients);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

// DELETE
const deleteClient = async (req, res) => {
  const userId = decodeToken(req)
  const clientId = req.params.clientId;
  try {
    const result = await User.updateOne(
      { _id: userId },
      { $pull: { clients: { _id: clientId } } }
    );
    if (!result) {
      res.status(404).send("Client not found");
      return;
    }
    res.send("Client removed successfullt");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
module.exports = { addClient, getClients, deleteClient };