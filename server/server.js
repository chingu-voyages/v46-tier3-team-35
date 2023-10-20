const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/cors");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");

console.log(process.env.NODE_ENV);

const app = express();
connectDB();

// middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// test route
app.get("/", function (req, res) {
  res.send("<h1>Hello, world!</h1>");
});

app.use("/users", userRoutes);

const port = process.env.PORT || 8000;

app.listen(process.env.PORT || 8000, () => {
  console.log(`Started server on port ${port}`);
});
