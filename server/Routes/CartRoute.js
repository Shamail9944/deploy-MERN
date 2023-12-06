import express from "express";
import { addToCart, cartProductByUserId, deleteCartItem, updateCart } from "../Controllers/CartController.js";

const router = express.Router();
router
    .post("/addToCart", addToCart)
    .get("/productByUserId", cartProductByUserId)
    .patch("/updateCart/:id", updateCart)
    .delete("/deleteCartItem/:id", deleteCartItem)
// .post("/clearCart", clearCart);
export default router;
