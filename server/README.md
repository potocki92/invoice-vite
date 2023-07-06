# RESTful API

[![My Skills](https://skillicons.dev/icons?i=nodejs,mongodb,express)](https://skillicons.dev)

This project provides a RESTful API built with Node.js and Express.js, along with MongoDB for data storage. The API allows users to perform various operations related to user authentication, products, clients, and invoices. Below is a description of the different components and their functionalities.

## Prerequisites

Before running the API, ensure that you have the following installed on your machine:

    Node.js
    MongoDB

## Installation

    1. Clone the repository to your local machine.
    2. Navigate to the project directory.
    3. Install the dependencies by running the command: npm install.
    4. Create a .env file in the project directory and configure the following environment variables:
          
          USERNAME_FROM_MONGODB=<your-mongodb-username>
          PASSWORD_FROM_MONGODB=<your-mongodb-password>
          CLUSTER_NAME_FROM_MONGODB=<your-mongodb-cluster-name>
          DATABASE_NAME=<your-mongodb-database-name>
          JWT_SECRET=<your-jwt-secret>
    5. Start the API server by running the command: node index.js.

## API Endpoints

### Authentication

    POST /login: Authenticates a user with the provided email and password.
    POST /register: Registers a new user with the provided name, email, and password.

### Products

    POST /addProduct: Creates a new product. Requires authentication.
    GET /products: Retrieves all products. Requires authentication.
    DELETE /products/:productId: Deletes a specific product by ID. Requires authentication.

### Clients

    POST /addClient: Creates a new client. Requires authentication.
    GET /clients: Retrieves all clients. Requires authentication.
    DELETE /clients/:clientId: Deletes a specific client by ID. Requires authentication.

### Invoices

    POST /addInvoice: Creates a new invoice. Requires authentication.
    GET /invoices: Retrieves all invoices. Requires authentication.
    GET /invoice/:invoiceId: Retrieves a specific invoice by ID. Requires authentication.
    DELETE /invoice/:invoiceId: Deletes a specific invoice by ID. Requires authentication.
    PUT /invoice/:invoiceId: Updates a specific invoice by ID. Requires authentication.

### User

    GET /user: Retrieves the authenticated user's information. Requires authentication.
    PUT /user: Updates the authenticated user's information. Requires authentication.

## Middleware

    authMiddleware.js: Middleware function for authenticating requests using JSON Web Tokens (JWT).
    decodeToken.js: Middleware function that decodes the JWT token from the request headers and verifies its authenticity using the provided JWT secret. It extracts the user ID from the decoded token and returns it.

## Models

    userModel.js: Defines the user schema for MongoDB using Mongoose.

## Controllers

    userController.js: Contains controller functions for user authentication, registration, and user-related operations.
    productsController.js: Contains controller functions for managing products.
    clientController.js: Contains controller functions for managing clients.
    invoiceController.js: Contains controller functions for managing invoices.


## Dependencies

    serverless-http: Connects Express.js app to serverless functions.
    express: Web framework for Node.js.
    cors: Middleware for enabling Cross-Origin Resource Sharing (CORS).
    mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js.
    dotenv: Loads environment variables from a .env file.
    jsonwebtoken: Implements JSON Web Tokens (JWT) for user authentication.

## Author
Created by Mateusz Potocki.
