// app.js
const PORT = 8000;
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./APIs/user_api");
const itemRoutes = require("./APIs/item_api");
const categoryRoutes = require("./APIs/category_api");
const relationRoutes = require("./APIs/relation_api");

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

app.use("/users", userRoutes);
app.use("/items", itemRoutes);
app.use("/categories", categoryRoutes);
app.use("/relations", relationRoutes);