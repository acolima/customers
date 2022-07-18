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
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getCustomers();
	}, [reloadPage, customerName]);

	async function getCustomers() {
		setLoading(true);

		try {
			let response;
			customerName
				? (response = await api.getCustomer('name', customerName))
				: (response = await api.getCustomers());
			setCustomers(response);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Box sx={styles.homepage}>
			<Header
				customerName={customerName}
				setCustomerName={setCustomerName}
				reloadPage={reloadPage}
			/>

			<CustomersList
				customers={customers}
				emptyList={customerName.length === 0}
				reloadPage={reloadPage}
				setReloadPage={setReloadPage}
				loading={loading}
			/>
		</Box>
	);
}

export default HomePage;

const styles = {
	homepage: {
		width: '100%',
		height: '100%',
	},
};
