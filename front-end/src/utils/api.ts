import axios from "axios";
import { PUBLIC_API_URL } from '$env/static/public';

if (!PUBLIC_API_URL) {
    throw new Error("Variável PUBLIC_API_URL não definida");
}

export const api = axios.create({
    baseURL: PUBLIC_API_URL,
    withCredentials: true
});
