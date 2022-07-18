import { Box, InputAdornment, TextField } from '@mui/material';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';

import styles from './styles';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface Props {
	customerName: string;
	setCustomerName: React.Dispatch<React.SetStateAction<string>>;
	reloadPage: boolean;
}

function Header({ customerName, setCustomerName, reloadPage }: Props) {
	let navigate = useNavigate();

	useEffect(() => {
		setCustomerName('');
	}, [reloadPage]);

	return (
		<Box sx={styles.container}>
			<Box sx={styles.header}>
				<TextField
					label='Search for a customer'
					id='search-customer'
					sx={styles.textfield}
					value={customerName}
					onChange={(e) => setCustomerName(e.target.value)}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>

				<PersonAddIcon
					onClick={() => navigate('/customer')}
					sx={styles.addCustomerButton}
				/>
			</Box>
		</Box>
	);
}

export default Header;
