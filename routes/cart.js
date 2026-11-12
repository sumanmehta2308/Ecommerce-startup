import express from "express";
import {getCartForUser,addProductToCart,} from "../controllers/cartC.js";
const router = express.Router();
router.get("/:userId", getCartForUser);
router.post("/:userId", addProductToCart);
export default router;
