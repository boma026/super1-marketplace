import { RequestHandler } from "express";

export const isCustomer: RequestHandler = (req, res, next) => {
    if (!req.user || req.user.role !== "CUSTOMER") {
        return res.status(403).json({ error: "Acesso restrito a CUSTOMER" });
    }
    next();
};
