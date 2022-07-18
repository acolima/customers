import { Box, Skeleton } from '@mui/material';

function LoadingForm() {
	return (
		<Box sx={styles.container}>
			<Skeleton variant='rectangular' width='100%' height='300px' />
		</Box>
	);
}

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: '15px',
		width: '60%',
		margin: '0 auto',
		'@media(max-width:600px)': {
			width: '100%',
		},
	},
};

export default LoadingForm;
