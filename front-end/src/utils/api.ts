import axios from 'axios';
import { API_URL } from '../constants/API_URL';

if (!API_URL) {
	throw new Error('Variável API_URL não definida');
}

export const api = axios.create({
	baseURL: API_URL,
	withCredentials: true
});
