require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDb = require("./db/connect");

const port = process.env.PORT || 5000;
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
app.use(express.json());

//get request
app.get("/", (req, res) => {
  res.send("hello");
});

// routes

// middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// listen
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
