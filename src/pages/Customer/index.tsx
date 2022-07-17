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

import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { errorAlert, successAlert } from '../../utils/toastifyAlerts';
import styles from './styles';
import { api } from '../../services/api';

interface Phone {
	number: string;
	type: string;
}

function Customer() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone1, setPhone1] = useState<Phone>({
		number: '',
		type: 'home',
	});
	const [phone2, setPhone2] = useState<Phone>({
		number: '',
		type: 'home',
	});

	const { id } = useParams();

	useEffect(() => {
		if (id) {
			getCustomerData();
		}
	}, [id]);

	async function getCustomerData() {
		try {
			const response = await api.getCustomerById(id!);
			setName(response.name);
			setEmail(response.email);
			setPhone1(response.phoneNumbers[0]);
			if (response.phoneNumbers[1].number !== '')
				setPhone2(response.phoneNumbers[1]);
		} catch (error) {
			console.log(error);
		}
	}

	const [invalidName, setInvalidName] = useState(false);
	const [invalidPhoneNumber1, setInvalidPhoneNumber1] = useState(false);
	const [invalidPhoneNumber2, setInvalidPhoneNumber2] = useState(false);

	let navigate = useNavigate();

	async function handleSaveCustomer(e: React.FormEvent) {
		e.preventDefault();

		const error = customerDataValidation();

		if (error) return;

		let phones = [phone1];
		if (phone2.number !== '') phones.push(phone2);

		const customer = {
			name,
			email,
			phoneNumbers: phones,
		};

		try {
			id
				? await api.updateCustomer(id, customer)
				: await api.createCustomer(customer);
			successAlert('Contato salvo com sucesso!');
			navigate('/');
		} catch (error: any) {
			errorAlert(error.response.data);
		}
	}

	function customerDataValidation() {
		setInvalidName(false);
		setInvalidPhoneNumber1(false);
		setInvalidPhoneNumber2(false);

		if (name.length < 3) {
			setInvalidName(true);
			errorAlert('Nome deve conter pelo menos 3 caracteres');
			return true;
		}

		if (phone1.number === phone2.number) {
			setInvalidPhoneNumber1(true);
			setInvalidPhoneNumber2(true);
			errorAlert('Os números devem ser diferentes');
			return true;
		}

		if (phone1.number.length < 10) {
			setInvalidPhoneNumber1(true);
			errorAlert('Número de telefone inválido');
			return true;
		}

		if (phone2.number.length < 10 && phone2.number !== '') {
			setInvalidPhoneNumber2(true);
			errorAlert('Número de telefone inválido');
			return true;
		}
	}

	return (
		<Box sx={styles.page}>
			<Typography sx={{ font: '2em Poppins' }}>
				{id ? 'Editar Contato' : 'Novo Contato'}
			</Typography>
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
					phone={phone1}
					setPhone={setPhone1}
					required={true}
					invalidPhoneNumber={invalidPhoneNumber1}
				/>

				<PhoneNumberInput
					phone={phone2}
					setPhone={setPhone2}
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
	phone: Phone;
	setPhone: React.Dispatch<React.SetStateAction<Phone>>;
	required: boolean;
	invalidPhoneNumber: boolean;
}

function PhoneNumberInput({
	phone,
	setPhone,
	required,
	invalidPhoneNumber,
}: PhoneNumberProps) {
	function handleSelectPhoneType(e: SelectChangeEvent) {
		setPhone({ ...phone, type: e.target.value });
	}

	function handleInputMask(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		e.currentTarget.maxLength = 15;
		let value = e.target.value;

		value = value.replace(/\D/g, '');
		value = value.replace(/^(\d{2})(\d{4,5})(\d)/, '($1) $2-$3');

		setPhone({ ...phone, number: value });
	}

	return (
		<Box sx={styles.phoneInput}>
			<TextField
				label='Telefone'
				variant='standard'
				value={phone?.number}
				required={required}
				error={invalidPhoneNumber}
				sx={{ flex: 1 }}
				onChange={(e) => handleInputMask(e)}
			/>

			<RadioGroup
				row
				defaultValue='Home'
				onChange={handleSelectPhoneType}
				value={phone?.type}
				sx={{ display: 'flex', alignItems: 'center' }}
			>
				<Radio size='small' value='home' />
				<HomeIcon />

				<Radio size='small' value='mobile' />
				<PhoneAndroidIcon />
			</RadioGroup>
		</Box>
	);
}

export default Customer;
