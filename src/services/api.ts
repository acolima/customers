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

async function getCustomerById(id: string) {
	const response = await axios.get(`${BASE_URL}/customers/${id}`);

	return response.data;
}

async function updateCustomer(id: string, customer: CreateCustomer) {
	const response = await axios.put(`${BASE_URL}/customers/${id}`, customer);

	return response.data;
}

async function deleteCustomer(id: string) {
	const response = await axios.delete(`${BASE_URL}/customers/${id}`);

	return response.data;
}

export const api = {
	createCustomer,
	deleteCustomer,
	getCustomers,
	getCustomerById,
	updateCustomer,
};
