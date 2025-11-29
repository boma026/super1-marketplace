import { RequestHandler } from "express";

export const isProvider: RequestHandler = (req, res, next) => {
    if (!req.user || req.user.role !== "PROVIDER") {
        return res.status(403).json({ error: "Acesso restrito a CUSTOMER" });
    }
    next();
};
