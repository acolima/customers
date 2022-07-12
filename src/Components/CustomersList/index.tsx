import {
	Avatar,
	Box,
	Card,
	Collapse,
	Divider,
	List,
	Typography,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import { useState } from 'react';

import styles from './styles';

function CustomersList() {
	return (
		<Box sx={styles.page}>
			<List sx={styles.customersList}>
				<Customer />
				<Customer />
			</List>
		</Box>
	);
}

function Customer() {
	const [open, setOpen] = useState(false);

	return (
		<Card sx={styles.customerCard} onClick={() => setOpen(!open)}>
			<Box sx={styles.cardContainer}>
				<Avatar>CO</Avatar>

				<Typography sx={styles.customerName}>Caroline Oliveira</Typography>

				{open && (
					<>
						<EditIcon fontSize='small' />
						<DeleteIcon fontSize='small' />
					</>
				)}
			</Box>

			<Collapse in={open}>
				<Box sx={styles.customerPhones}>
					<Box sx={styles.customerPhone}>
						<HomeIcon fontSize='small' />
						<Typography>(19) 982390863</Typography>
					</Box>

					<Box sx={styles.customerPhone}>
						<PhoneAndroidIcon fontSize='small' />
						<Typography>(19) 982390863</Typography>
					</Box>
				</Box>

				<Divider />

				<Typography sx={styles.customerInformations}>
					Email: anacdolima@gmail.com
				</Typography>

				<Divider />

				<Typography sx={styles.customerInformations}>
					Address: Rua Quinze de Novembro, Sousas, Campinas - SP
				</Typography>
			</Collapse>
		</Card>
	);
}

export default CustomersList;
