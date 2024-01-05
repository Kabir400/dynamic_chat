// External imports
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const session = require("express-session");
const path = require("path");

require("dotenv").config();

// Variable
const port = process.env.port || 5000;

// Internal imports
const dbconnect = require("./config/dbconnection.js");
const userRouter = require("./routes/userRouter.js");
const socketConnect = require("./controller/socketController.js");

// Create an instance of Express
const app = express(); // Changed from 'server' to 'app'

// Use session
app.use(session({ secret: process.env.session_secret }));

// Body parsing (middleware)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up the view engine
app.set("view engine", "ejs");

// Node static hosting
app.use(express.static(path.join(__dirname, "public")));

// DB connection
dbconnect();

// Create a server using the Express instance
const server = http.createServer(app); // Changed from 'app' to 'server'

// Create a Socket.IO server using the HTTP server
const io = new Server(server, {
  cors: "*", // Allow all origins
});

// Create a namespace for the Socket.IO server
const usp = io.of("/user");

// Implement socket logic
socketConnect(usp);

// Server routes
app.use("/", userRouter);

// Start the server
server.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
