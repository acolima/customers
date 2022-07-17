import { Box, InputAdornment, TextField } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import styles from './styles';

interface Props {
	customerName: string;
	setCustomerName: React.Dispatch<React.SetStateAction<string>>;
}

function Header({ customerName, setCustomerName }: Props) {
	return (
		<Box sx={styles.container}>
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
		</Box>
	);
}

export default Header;
