import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface CreateCustomer {
	name: string;
	email: string;
	phoneNumbers: Phone[];
}

interface Phone {
	number: string;
	type: string;
}

async function createCustomer(body: CreateCustomer) {
	const response = await axios.post(`${BASE_URL}/customers`, body);

	return response.data;
}

async function getCustomers() {
	const response = await axios.get(`${BASE_URL}/customers`);

	return response.data;
}

export const api = {
	createCustomer,
	getCustomers,
};
