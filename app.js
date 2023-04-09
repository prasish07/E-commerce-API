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
const orderRoute = require("./routes/orderRoutes");

const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSenitize = require("express-mongo-sanitize");

const connectDb = require("./db/connect");

const port = process.env.PORT || 5000;
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSenitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./Public"));
app.use(fileUpload());

// routes
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/orders", orderRoute);

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
