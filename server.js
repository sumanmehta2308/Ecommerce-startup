import "dotenv/config";
import express from "express";
import db from "./config/db.js";

import errorHandler from "./middleware/errorhandler.js";

import user from "./routes/user.js";
import product from "./routes/product.js";
import cart from "./routes/cart.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Student & Course Portal API!");
});

app.use("/user", user);
app.use("/product", product);
app.use("/cart", cart);

app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await db.query("SELECT 1");
    console.log("MySQL Connected Successfully");
    app.listen(4000, () => {
      console.log("Server is running on http://localhost:4000");
    });
  } catch (error) {
    console.error("MySQL Connection Failed:", error.message);
    process.exit(1);
  }
};
startServer();
