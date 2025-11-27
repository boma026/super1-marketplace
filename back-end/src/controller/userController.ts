import { RequestHandler } from "express";
import { createUser, verifyUser } from "../service/userService";
import JWT from "jsonwebtoken";

export const loginController:RequestHandler = async (req,res) => {
    const { email, password } = req.body;
    try{
        const userVerified = await verifyUser(email, password);
        const token = JWT.sign(

            {id: userVerified.id, user: userVerified.email, role: userVerified.role}, 
            process.env.JWT_SECRET_KEY as string,
            {expiresIn: "1h"})
            
        res.status(201).json({ user: {
          id: userVerified.id,
          email: userVerified.email,
          name: userVerified.name,
          role: userVerified.role
        },
        status: true, token });
       
    }catch(e){
        res.status(500).json({error: "Usuário não encontrado!"})
    }
} 

export const registerController:RequestHandler = async (req,res) => {

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