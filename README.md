# Invoice Application

This repository contains the Invoice Application, which consists of a server and a React application. The server is responsible for handling API requests and interacting with the database, while the React application provides the user interface for creating, managing, and generating PDF invoices.

## Server

The server directory contains the server-side code for the Invoice Application. It utilizes Node.js and Express framework to handle API requests. The server is responsible for the following tasks:

    Connect to a MongoDB database using Mongoose.
    Implement API routes for various functionalities, such as user authentication, invoice management, product management, and client management.
    Use controllers to handle specific business logic for each API endpoint.
    Define middleware functions for tasks like user authentication using JSON Web Tokens (JWT).
    Utilize Mongoose models to interact with the database and perform CRUD operations on user, product, client, and invoice data.

The server provides the necessary backend functionality to support the Invoice Application and handles data storage, retrieval, and manipulation.
## React Application

The app directory contains the React application for the Invoice Application. It is responsible for the frontend user interface and interaction. The React application utilizes various libraries and components to create a seamless user experience. Key features of the React application include:

    User authentication: Users can register and log in to access the invoice management functionality.
    Invoice creation: Users can create new invoices by selecting clients, adding products, and specifying quantities.
    Invoice listing and management: Users can view, edit, and delete existing invoices.
    PDF generation: Users can generate PDF versions of invoices for printing or sharing.
    Styling: The application utilizes Styled Components to provide a visually appealing and responsive user interface.
    Routing: React Router is used for handling client-side routing and navigation between different pages/views of the application.

The React application communicates with the server via API requests to perform actions such as user authentication, invoice creation, retrieval, and modification.

## Technologies Used

The Invoice Application utilizes a combination of server-side and client-side technologies, including:

  ### Server:
  [![My Skills](https://skillicons.dev/icons?i=nodejs,mongodb,express)](https://skillicons.dev)
        
  ### React Application:
  [![My Skills](https://skillicons.dev/icons?i=react,vite,styledcomponents,js,html,css&theme=dark)](https://skillicons.dev)

These technologies and libraries provide a robust and efficient stack for building the Invoice Application.
