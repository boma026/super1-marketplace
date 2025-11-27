import { createUserModel, findUserByEmail} from "../model/userModel";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

export const createUser = async (data: Prisma.UserCreateInput) =>{
    const existingUserEmail = await findUserByEmail(data.email);
    
    if(existingUserEmail){
        throw new Error("Email ja cadastrado");
    }

    const hash = await bcrypt.hash(data.password, 10);
    data.password = hash;

    return createUserModel(data);
}

export const verifyUser = async (email: string, password: string) => {
    const userVerified = await findUserByEmail(email)
    if(!userVerified){
        throw new Error("Email nao encontrado");
    }

    const passwordMatch = await bcrypt.compare(password, userVerified.password);
    if(!passwordMatch){
        throw new Error("senha nao confere");
    }
    return userVerified;
}