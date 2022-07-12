import { Box, InputAdornment, TextField } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import styles from './styles';

function Header() {
	return (
		<Box sx={styles.container}>
			<TextField
				label='Search for a customer'
				id='search-customer'
				sx={styles.textfield}
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
