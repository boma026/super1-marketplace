import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { router } from "./router/routes";
import cookieParser from "cookie-parser";

if (process.env.NODE_ENV !== "docker") {
  dotenv.config();
}
const server = express();
server.use("/uploads", express.static("uploads"));
server.use(cookieParser());
server.use(helmet());
server.use(express.json())
server.use(cors({origin: "http://localhost:5173", credentials: true}));

server.use("/", router);

const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));