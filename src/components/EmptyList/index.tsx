import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { Box, Typography } from '@mui/material';

function EmptyList() {
	return (
		<Box sx={styles.container}>
			<AccountBoxIcon sx={styles.icon} />
			<Typography sx={styles.text}>Nenhum contato adicionado</Typography>
		</Box>
	);
}

const styles = {
	container: {
		paddingTop: '150px',
		width: '90%',
		margin: '0 auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	icon: { color: '#bdbdbd', fontSize: '4em' },
	text: { font: '1.3em Poppins' },
};
export default EmptyList;
