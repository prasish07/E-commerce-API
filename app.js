require("dotenv").config();
require("express-async-errors");

const morgon = require("morgan");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const authrouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const { auth, authorizePermission } = require("./middleware/authentication");
const fileUpload = require("express-fileupload");
const reviewRoute = require("./routes/reviewRoutes");

const connectDb = require("./db/connect");

const port = process.env.PORT || 5000;
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

app.use(morgon("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./Public"));
app.use(fileUpload());

//get request
app.get("/api/v1", (req, res) => {
  // console.log(req.cookies);
  console.log(req.signedCookies);
  res.send("hello");
});

// routes
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/review", reviewRoute);

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
