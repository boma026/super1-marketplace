import express from "express";
import { loginController } from "../controller/loginController";

export const router = express.Router();

router.post("/login", loginController);
