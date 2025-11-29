import { RequestHandler } from "express";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { TokenPayload } from "../types/tokenPayload";

dotenv.config();

export const authMiddleware: RequestHandler = (req, res, next) => {
    const token = req.cookies.session;

    if (!token) return res.status(401).json({ error: "não logado" });

    try {
        const decoded = JWT.verify(
            token,
            process.env.JWT_SECRET_KEY as string
        ) as TokenPayload;

        req.user = decoded;

        next();
    } catch {
        return res.status(401).json({ error: "token inválido" });
    }
};
