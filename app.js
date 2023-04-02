require("dotenv").config();
require("express-async-errors");

const morgon = require("morgan");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const authrouter = require("./routes/authRoutes");

const connectDb = require("./db/connect");

const port = process.env.PORT || 5000;
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

app.use(morgon("tiny"));
app.use(express.json());
app.use(cookieParser());

//get request
app.get("/", (req, res) => {
  console.log(req.cookies);
  res.send("hello");
});

// routes
app.use("/api/v1/auth", authrouter);

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
