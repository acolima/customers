import { Box } from '@mui/material';

import Header from '../../components/Header';
import CustomersList from '../../components/CustomersList';

import { useEffect, useState } from 'react';

import { api } from '../../services/api';

export interface CustomerData {
	_id: string;
	name: string;
	email: string;
	phoneNumbers: Phone[];
}

interface Phone {
	number: string;
	type: string;
}

function HomePage() {
	const [customers, setCustomers] = useState<CustomerData[] | null>(null);
	const [customerName, setCustomerName] = useState('');
	const [reloadPage, setReloadPage] = useState(false);

	useEffect(() => {
		getCustomers();
	}, [reloadPage, customerName]);

	async function getCustomers() {
		try {
			let response;
			customerName
				? (response = await api.getCustomer('name', customerName))
				: (response = await api.getCustomers());
			setCustomers(response);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Box sx={styles.homepage}>
			<Header customerName={customerName} setCustomerName={setCustomerName} />

			<CustomersList
				customers={customers}
				reloadPage={reloadPage}
				setReloadPage={setReloadPage}
			/>
		</Box>
	);
}

export default HomePage;

const styles = {
	homepage: {
		width: '100vw',
		height: '100vh',
	},
};
