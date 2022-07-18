import { Box, Typography } from '@mui/material';

function NoResults() {
	return (
		<Box sx={styles.container}>
			<Typography sx={styles.text}>Nenhum resultado encontrado</Typography>
		</Box>
	);
}

const styles = {
	container: {
		paddingTop: '100px',
		width: '90%',
		margin: '0 auto',
	},
	text: { font: '1.3em Poppins', textAlign: 'center' },
};
export default NoResults;
