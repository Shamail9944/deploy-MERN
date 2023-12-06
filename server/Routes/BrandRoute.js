import express from "express";
import { fetchAllBrands, AddNewBrand } from "../Controllers/BrandController.js";

const router = express.Router();
router
    .get("/fetchBrands", fetchAllBrands)
    .post("/addBrand", AddNewBrand)

export default router;
