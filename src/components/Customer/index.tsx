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
	Typography,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomerData } from '../../pages/Home';

import { api } from '../../services/api';
import { errorAlert, successAlert } from '../../utils/toastifyAlerts';
import styles from './styles';

interface CustomerProps {
	customer: CustomerData;
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
			<Box
				id='customer-container'
				sx={styles.cardContainer}
				onClick={() => setOpen(!open)}
			>
				<Avatar sx={{ fontSize: '90%' }}>{customerInitials}</Avatar>

				<Typography sx={styles.customerName}>{customer.name}</Typography>

				{open && (
					<>
						<EditIcon
							id='edit-button'
							fontSize='small'
							onClick={handleEditCustomer}
						/>
						<DeleteIcon
							id='delete-button'
							fontSize='small'
							onClick={() => setShowDialog(true)}
						/>
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
				<DialogTitle fontSize={'16px'}>Deseja apagar esse contato?</DialogTitle>
				<DialogActions>
					<Button onClick={() => setShowDialog(false)}>Não</Button>
					<Button id='confirm-delete-button' onClick={handleDeleteCustomer}>
						Sim
					</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
}

export default Customer;
