const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes.js");
const dotenv = require("dotenv");

dotenv.config();

const USERNAME_FROM_MONGODB = process.env.USERNAME_FROM_MONGODB;
const PASSWORD_FROM_MONGODB = process.env.PASSWORD_FROM_MONGODB;
const CLUSTER_NAME_FROM_MONGODB = process.env.CLUSTER_NAME_FROM_MONGODB;
const DATABASE_NAME = process.env.DATABASE_NAME;

const uri =
  `mongodb+srv://${USERNAME_FROM_MONGODB}:` +
  encodeURIComponent(PASSWORD_FROM_MONGODB) +
  `@${CLUSTER_NAME_FROM_MONGODB}.zsrttvb.mongodb.net/${DATABASE_NAME}`;

// Create an instance of the Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Use the router to handle requests to the `/.netlify/functions/api` path
app.use(`/.netlify/functions/api`, routes);

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);