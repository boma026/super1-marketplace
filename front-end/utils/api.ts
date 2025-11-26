import axios from "axios";

const baseURL = process.env.PUBLIC_API_URL

if (!baseURL){
    throw new Error("Variável de ambiente nao definida");
}

export const api = axios.create(
    {baseURL}
);