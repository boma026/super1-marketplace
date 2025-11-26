import { RequestHandler } from "express";

export const loginController:RequestHandler = async (req,res) => {
    const { user, password } = req.body;
    try{
        const userVerified = await verifyUser(user, password);
        const token = JWT.sign(
            {id: userVerified.id, user: userVerified.user}, 
            process.env.JWT_SECRET_KEY as string,
            {expiresIn: "1h"})
            
        res.status(201).json({ userVerified, status: true, token });
       
    }catch(e){
        res.status(500).json({error: "Usuário não encontrado!"})
    }
} 