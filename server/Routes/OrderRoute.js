import express from "express";
import { OrderByUserId, createOrder, updateOrder, deleteOrder } from "../Controllers/OrderController.js";

const router = express.Router();
router
    .post("/addOrder", createOrder)
    .get("/orderByUserId", OrderByUserId)
    .get("/allOrders",)
    .patch("/updateOrder/:id", updateOrder)
    .delete("/deleteOrder/:id", deleteOrder)

export default router;
updateOrder
deleteOrder