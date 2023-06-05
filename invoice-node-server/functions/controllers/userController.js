const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
// Login User
const loginUser = (req, res) => {
  const { email, password } = req.body;
  console.log("Login");
  User.findOne({ "user.email": email }, (err, user) => {
    if (user) {
      const token = jwt.sign(
        { email: user.user.email, id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      if (password === user.user.password) {
        res.json({ message: "Login Successful", user: user, token });
      } else {
        res.json({ message: "Password didn't match" });
      }
    } else {
      res.status(404).json({ message: "User not registered" });
    }
  });
};

// Register User
const registerUser = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ "user.email": email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registered" });
    } else {
      const user = new User({
        user: {
          name,
          email,
          password,
          NIP: "",
          REGON: "",
          address: {
            city: "",
            postalCode: "",
            street: "",
          },
          phone: "",
        },
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered" });
        }
      });
    }
  });
};

// GET

const getUser = async (req, res) => {
  try {
    const userId = decodeToken(req)
    const user = await User.findById(userId)
    if(!user) {
      res.status(404).send("User not found")
      return
    }

    res.json(user.user)
  }catch(error) {
    console.error(error);
    res.status(500).send("Internal server error")
  }
}

// PUT
const putUser = async (req, res) => {
  const userId = decodeToken(req)
  const updateUser = { ...req.body };
  console.log(userId, updateUser);
  try {
    const user = await User.updateOne(
      {
        _id: userId,
      },
      {
        $set: { user: updateUser },
      }
    );
    if (user.nModified === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.send("User updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
module.exports = { loginUser, registerUser, getUser, putUser };