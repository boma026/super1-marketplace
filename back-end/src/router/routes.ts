import express from "express";
import { loginController, registerController } from "../controller/userController";

export const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
