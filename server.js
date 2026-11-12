import express from "express";
const app=express();
import {user} from "./routes/user";
import { product } from "./routes/product";
import { cart } from "./routes/cart";
app.get("/", (req, res) => {
  res.send("Welcome to the Student & Course Portal API!");
});
app.use("/user",user);
app.use("/product",product);
app.use("/cart",cart);
app.use((req, res) => {
  res.status(404).send("Page not found");
});
app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});