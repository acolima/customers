import {
	Avatar,
	Box,
	Card,
	Collapse,
	Divider,
	List,
	Typography,
} from '@mui/material';

import AddCircle from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './styles';
import { api } from '../../services/api';

interface Customer {
	_id: string;
	name: string;
	email: string;
	phoneNumbers: Phone[];
}

interface Phone {
	number: string;
	type: string;
}

function CustomersList() {
	const [customers, setCustomers] = useState<Customer[] | null>(null);
	let navigate = useNavigate();

	useEffect(() => {
		getCustomers();
	}, []);

	async function getCustomers() {
		try {
			const response = await api.getCustomers();
			setCustomers(response);
		} catch (error) {
			console.log(error);
		}
	}

	if (!customers) return <h1>loading</h1>;

	return (
		<Box sx={styles.page}>
			<List sx={styles.customersList}>
				{customers.map((customer) => (
					<Customer key={customer._id} customer={customer} />
				))}
			</List>

			<AddCircle
				onClick={() => navigate('/customer')}
				sx={styles.addCustomerButton}
			/>
		</Box>
	);
}

interface CustomerProps {
	customer: Customer;
}

function Customer({ customer }: CustomerProps) {
	const [open, setOpen] = useState(false);

	const customerNameArray = customer.name.split(' ');
	let customerInitials = '';

	for (const name of customerNameArray) {
		if (name.length >= 3) customerInitials += name[0];
	}

	return (
		<Card sx={styles.customerCard}>
			<Box sx={styles.cardContainer} onClick={() => setOpen(!open)}>
				<Avatar>{customerInitials}</Avatar>

				<Typography sx={styles.customerName}>{customer.name}</Typography>

				{open && (
					<>
						<EditIcon fontSize='small' />
						<DeleteIcon fontSize='small' />
					</>
				)}
			</Box>

			<Collapse in={open}>
				<Box sx={styles.customerPhones}>
					{customer.phoneNumbers.map((phone) => (
						<Box sx={styles.customerPhone} key={customer._id}>
							{phone.type === 'home' && <HomeIcon fontSize='small' />}
							{phone.type === 'phone' && <PhoneAndroidIcon fontSize='small' />}
							<Typography>{phone.number}</Typography>
						</Box>
					))}
				</Box>

				<Divider />

				<Typography sx={styles.customerInformations}>
					Email: {customer.email}
				</Typography>
			</Collapse>
		</Card>
	);
}

export default CustomersList;
