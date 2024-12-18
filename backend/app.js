// app.js
const PORT = 8000;
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./APIs/user_api");
const itemRoutes = require("./APIs/item_api");
const categoryRoutes = require("./APIs/category_api");
const relationRoutes = require("./APIs/relation_api");
const feedbackRoutes = require("./APIs/feedback_api");
const cartRoutes = require('./APIs/cart_api');
const orderRoutes = require('./APIs/order_api');
const authRoutes = require('./APIs/auth_api');
const dotenv=require("dotenv");
dotenv.config({path: "./config.env"});
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongouri = "mongodb://localhost:27017/TestWork";
mongoose.set("strictQuery", false);
mongoose
  .connect(mongouri)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(PORT, () => console.log("app started on port", PORT));
  })
  .catch((error) => {
    console.log("can't connect to mongodb: " + error);
  });
  app.use("/users",authRoutes.protect, userRoutes);
  app.use("/products",authRoutes.protect, itemRoutes);
  app.use("/categories",authRoutes.protect, categoryRoutes);
  app.use("/relations",authRoutes.protect, relationRoutes);
  app.use("/feedback",authRoutes.protect, feedbackRoutes);
  app.use("/cart",authRoutes.protect, cartRoutes);
  app.use("/orders",authRoutes.protect, orderRoutes);
  app.use("/auth", authRoutes.router);
