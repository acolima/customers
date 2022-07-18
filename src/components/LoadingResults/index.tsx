import { Box, Skeleton } from '@mui/material';

function LoadingResults() {
	return (
		<Box sx={styles.container}>
			<Skeleton variant='rectangular' width='90%' height='90px' />
			<Skeleton variant='rectangular' width='90%' height='90px' />
			<Skeleton variant='rectangular' width='90%' height='90px' />
		</Box>
	);
}

const styles = {
	container: {
		paddingTop: '100px',
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

export default LoadingResults;
