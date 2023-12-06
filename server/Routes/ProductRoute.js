import express from "express";
import { createProduct, fetchAllProducts, fetchProductByFilter, fetchProductById, updateProduct } from "../Controllers/ProductController.js";

const router = express.Router();
router
    .get("/allProducts", fetchAllProducts)
    .get("/productByFilters", fetchProductByFilter)
    .get("/ProductById/:id", fetchProductById)
    .patch("/updateProduct/:id", updateProduct)
    .post("/addNewProduct", createProduct)

export default router;