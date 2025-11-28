import { RequestHandler } from "express";
import { createUser, verifyUser } from "../service/userService";
import JWT from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const loginController: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userVerified = await verifyUser(email, password);

        if (!userVerified) {
            return res.status(401).json({ error: "Usuário ou senha inválidos." });
        }
        const token = JWT.sign(
            {
                id: userVerified.id,
                user: userVerified.email,
                role: userVerified.role
            },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            user: {
                id: userVerified.id,
                email: userVerified.email,
                name: userVerified.name,
                role: userVerified.role
            },
            status: true,
            token
        });

    } catch (e) {
        return res.status(500).json({ error: "Erro no servidor!" });
    }
};


export const registerController:RequestHandler = async (req,res) => {
    console.log(req.body)

    if(!req.body.email || !req.body.password || !req.body.name){
       res.status(400).json({error: "dados inválidos"})
       return; 
    }

    try{
        const createdUser = await createUser(req.body);
            res.status(201).json({createdUser, status: true });
            return;
    }

    catch(e: any){
        if (e.message === "Email ja cadastrado!") {
            res.status(400).json({ error: "O e-mail já está cadastrado." });
            return;
        }
        
    res.status(500).json({error: "Não foi possível criar o usuário"});
    return;
    }
}