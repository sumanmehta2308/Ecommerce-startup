import express from "express";
const app = express();
import errorHandler from "./middleware/errorhandler.js";
import  user from "./routes/user.js";
import product from "./routes/product.js";
import cart from "./routes/cart.js";
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the Student & Course Portal API!");
});
app.use("/user", user);
app.use("/product", product);
app.use("/cart", cart);
app.use((req, res,next) => {
  const error = new Error("Page not found");
  error.statusCode = 404;
  next(error);
});
app.use(errorHandler);
app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
