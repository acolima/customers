import {
	Avatar,
	Box,
	Button,
	Card,
	Collapse,
	Dialog,
	DialogActions,
	DialogTitle,
	Divider,
	List,
	Typography,
} from '@mui/material';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './styles';
import { api } from '../../services/api';
import { errorAlert, successAlert } from '../../utils/toastifyAlerts';

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
	const [reloadPage, setReloadPage] = useState(false);

	let navigate = useNavigate();

	useEffect(() => {
		getCustomers();
	}, [reloadPage]);

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
					<Customer
						key={customer._id}
						customer={customer}
						reloadPage={reloadPage}
						setReloadPage={setReloadPage}
					/>
				))}
			</List>

			<PersonAddIcon
				onClick={() => navigate('/customer')}
				sx={styles.addCustomerButton}
			/>
		</Box>
	);
}

interface CustomerProps {
	customer: Customer;
	reloadPage: boolean;
	setReloadPage: React.Dispatch<React.SetStateAction<boolean>>;
}

function Customer({ customer, reloadPage, setReloadPage }: CustomerProps) {
	const [open, setOpen] = useState(false);
	const [showDialog, setShowDialog] = useState(false);

	let navigate = useNavigate();

	const customerNameArray = customer.name.split(' ');
	let customerInitials = '';

	for (const name of customerNameArray) {
		if (name.length >= 3) customerInitials += name[0];
	}

	function handleEditCustomer() {
		navigate(`/customer/${customer._id}`);
	}

	async function handleDeleteCustomer() {
		try {
			await api.deleteCustomer(customer._id);
			successAlert('Contato deletado');
			setShowDialog(false);
			setReloadPage(!reloadPage);
		} catch (error: any) {
			errorAlert(error.response.data);
		}
	}

	return (
		<Card sx={styles.customerCard}>
			<Box sx={styles.cardContainer} onClick={() => setOpen(!open)}>
				<Avatar sx={{ fontSize: '90%' }}>{customerInitials}</Avatar>

				<Typography sx={styles.customerName}>{customer.name}</Typography>

				{open && (
					<>
						<EditIcon fontSize='small' onClick={handleEditCustomer} />
						<DeleteIcon fontSize='small' onClick={() => setShowDialog(true)} />
					</>
				)}
			</Box>

			<Collapse in={open}>
				<Box sx={styles.customerPhones}>
					{customer.phoneNumbers.map((phone) => (
						<Box sx={styles.customerPhone} key={phone.number}>
							{phone.type === 'home' && <HomeIcon fontSize='small' />}
							{phone.type === 'mobile' && <PhoneAndroidIcon fontSize='small' />}
							<Typography>{phone.number}</Typography>
						</Box>
					))}
				</Box>

				<Divider />

				<Typography sx={styles.customerInformations}>
					Email: {customer.email}
				</Typography>
			</Collapse>

			<Dialog open={showDialog}>
				<DialogTitle fontSize={'16px'}>Deseja apagar esse contato</DialogTitle>
				<DialogActions>
					<Button onClick={() => setShowDialog(false)}>Não</Button>
					<Button onClick={handleDeleteCustomer}>Sim</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
}

export default CustomersList;
