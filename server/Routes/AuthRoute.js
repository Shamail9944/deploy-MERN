import express from "express";
import {loginUser } from "../Controllers/AuthController.js";
import { createUser } from "../Controllers/UserController.js";

const router = express.Router();
router
    .post("/createUser", createUser)
    .post("/checkUser", loginUser)
    .post("/signout",)

export default router;


