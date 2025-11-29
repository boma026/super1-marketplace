import express from "express";
import { loginController, registerController } from "../controller/userController";
import { createServiceController, getServicesController } from "../controller/serviceController";
import { authMiddleware } from "../middleware/authMiddleware";
import { isProvider } from "../middleware/isProvider";
import { upload } from "../config/multer"; // ✔ importar o DISK STORAGE correto

export const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.post("/service", authMiddleware, isProvider, upload.array("photos"), createServiceController);
router.get("/service", authMiddleware, isProvider, upload.array("photos"), getServicesController);
