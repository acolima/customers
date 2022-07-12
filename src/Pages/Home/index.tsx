import { Box } from '@mui/material';
import Header from '../../Components/Header';
import CustomersList from '../../Components/CustomersList';

function HomePage() {
	return (
		<Box sx={styles.homepage}>
			<Header />
			<CustomersList />
		</Box>
	);
}

export default HomePage;

const styles = {
	homepage: {
		width: '100vw',
		height: '100vh',
		background: '#f4f6fa',
	},
};
