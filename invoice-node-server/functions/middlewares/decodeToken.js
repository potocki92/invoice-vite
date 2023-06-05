const jwt = require("jsonwebtoken")

const decodeToken = (req) => {
    const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.id;
  return userId;
}

module.exports = decodeToken;