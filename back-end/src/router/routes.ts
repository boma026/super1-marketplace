import express from "express";
import { loginController, registerController } from "../controller/userController";
import { createServiceController, getServicesByTypeController, getServicesController } from "../controller/serviceController";
import { authMiddleware } from "../middleware/authMiddleware";
import { isProvider } from "../middleware/isProvider";
import { upload } from "../config/multer"; // ✔ importar o DISK STORAGE correto
import { createAvailabilityController, getAvailabilityController } from "../controller/availabilityController";
import { isCustomer } from "../middleware/isCostumer";
import { createBookingController } from "../controller/bookingController";

export const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.post("/service", authMiddleware, isProvider, upload.array("photos"), createServiceController);
router.get("/service", authMiddleware, isProvider, upload.array("photos"), getServicesController);
router.get("/services/:type", getServicesByTypeController);

router.post("/availability", authMiddleware, isProvider, createAvailabilityController);
router.get("/availability", authMiddleware, isProvider, getAvailabilityController);

router.post("/booking", authMiddleware, isCustomer, createBookingController);
//router.get("/booking", authMiddleware, isCustomer, getBookingController);



