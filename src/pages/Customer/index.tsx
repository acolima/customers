import {
	Box,
	Button,
	ButtonGroup,
	Radio,
	RadioGroup,
	SelectChangeEvent,
	TextField,
	Typography,
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { errorAlert } from '../../utils/toastifyAlerts';
import styles from './styles';

function Customer() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneType1, setPhoneType1] = useState('Home');
	const [phoneType2, setPhoneType2] = useState('Home');
	const [phoneNumber1, setPhoneNumber1] = useState('');
	const [phoneNumber2, setPhoneNumber2] = useState('');

	const [invalidName, setInvalidName] = useState(false);
	const [invalidPhoneNumber1, setInvalidPhoneNumber1] = useState(false);
	const [invalidPhoneNumber2, setInvalidPhoneNumber2] = useState(false);

	let navigate = useNavigate();

	function handleSaveCustomer(e: React.FormEvent) {
		e.preventDefault();

		customerDataValidation();
	}

	function customerDataValidation() {
		setInvalidName(false);
		setInvalidPhoneNumber1(false);
		setInvalidPhoneNumber2(false);

		if (name.length < 3) {
			setInvalidName(true);
			errorAlert('Nome deve conter pelo menos 3 caracteres');
			return;
		}

		if (phoneNumber1.length < 10) {
			setInvalidPhoneNumber1(true);
			errorAlert('Número de telefone inválido');
			return;
		}

		if (phoneNumber2.length < 10 && phoneNumber2.length !== 0) {
			setInvalidPhoneNumber2(true);
			errorAlert('Número de telefone inválido');
			return;
		}
	}

	return (
		<Box sx={styles.page}>
			<Typography sx={{ font: '2em Poppins' }}>Novo Cliente</Typography>
			<Box component='form' onSubmit={handleSaveCustomer} sx={styles.form}>
				<TextField
					label='Nome'
					variant='standard'
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					error={invalidName}
					sx={{ width: '90%' }}
				/>

				<TextField
					label='Email'
					variant='standard'
					value={email}
					type='email'
					onChange={(e) => setEmail(e.target.value)}
					required
					sx={{ width: '90%' }}
				/>

				<PhoneNumberInput
					phoneNumber={phoneNumber1}
					setPhoneNumber={setPhoneNumber1}
					phoneType={phoneType1}
					setPhoneType={setPhoneType1}
					required={true}
					invalidPhoneNumber={invalidPhoneNumber1}
				/>

				<PhoneNumberInput
					phoneNumber={phoneNumber2}
					setPhoneNumber={setPhoneNumber2}
					phoneType={phoneType2}
					setPhoneType={setPhoneType2}
					required={false}
					invalidPhoneNumber={invalidPhoneNumber2}
				/>

				<ButtonGroup>
					<Button variant='contained' type='submit'>
						Salvar
					</Button>

					<Button onClick={() => navigate('/')}>Cancelar</Button>
				</ButtonGroup>
			</Box>
		</Box>
	);
}

interface PhoneNumberProps {
	phoneNumber: string;
	setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
	phoneType: string;
	setPhoneType: React.Dispatch<React.SetStateAction<string>>;
	required: boolean;
	invalidPhoneNumber: boolean;
}

function PhoneNumberInput({
	phoneNumber,
	setPhoneNumber,
	phoneType,
	setPhoneType,
	required,
	invalidPhoneNumber,
}: PhoneNumberProps) {
	function handleSelectPhoneType(e: SelectChangeEvent) {
		setPhoneType(e.target.value);
	}

	function handleInputMask(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		e.currentTarget.maxLength = 15;
		let value = e.target.value;

		value = value.replace(/\D/g, '');
		value = value.replace(/^(\d{2})(\d{4})(\d)/, '($1) $2-$3');

		setPhoneNumber(value);
	}

	return (
		<Box sx={styles.phoneInput}>
			<TextField
				label='Telefone'
				variant='standard'
				value={phoneNumber}
				required={required}
				error={invalidPhoneNumber}
				sx={{ flex: 1 }}
				onChange={(e) => handleInputMask(e)}
			/>

			<RadioGroup
				row
				defaultValue='Home'
				onChange={handleSelectPhoneType}
				value={phoneType}
				sx={{ display: 'flex', alignItems: 'center' }}
			>
				<Radio size='small' value='Home' />
				<HomeIcon />

				<Radio size='small' value='Mobile' />
				<PhoneAndroidIcon />
			</RadioGroup>
		</Box>
	);
}

export default Customer;
