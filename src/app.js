const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;

mongoose.connect(`${process.env.DATABASE}`, () => {
  console.log("Connection established.");
});

//---- Routes ----//
const auth = require("../routes/auth");
const users = require("../routes/users");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:4000"],
    methods: "GET, POST, OPTIONS",
    allowedHeaders: ["Content-Type", "Accept", "token"],
    exposedHeaders: ["Content-Type", "Accept", "token"],
  })
);
app.use(cookieParser());
app.use("/", auth);
app.use("/", users);

app.listen(port, () => console.log(`App online on port ${port}.`));
