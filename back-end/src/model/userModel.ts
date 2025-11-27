import { Prisma } from "@prisma/client";
import { prisma } from "../../libs/prisma/prisma"

export const findUserByEmail = async (email:string) => {
    return await prisma.user.findFirst({
        where: { email },
    })
}

export const createUserModel = async (data:Prisma.UserCreateInput) => {
    try{
        return await prisma.user.create({ data });
    }catch(e){
        console.error("Não foi possivel cadastrar o usuario no banco", e)
        throw new Error("Erro_Banco");
    }
}