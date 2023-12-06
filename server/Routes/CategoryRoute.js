import express from "express";
import { fetchAllCategory, AddNewCategory } from "../Controllers/CategoryController.js";

const router = express.Router();
router
    .get("/fetchCategories", fetchAllCategory)
    .post("/addCategory", AddNewCategory)

export default router;
