import express from "express";
import { fetchUserById, updateUser } from "../Controllers/UserController.js";

const router = express.Router();
router
    .get("/fetchUserById/:id", fetchUserById)
    .patch("/updateUser/:id", updateUser)

export default router;
