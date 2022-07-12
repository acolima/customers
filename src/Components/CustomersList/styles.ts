const styles = {
	page: {
		height: '200px',
		paddingTop: '100px',
	},
	customersList: {
		display: 'flex',
		flexDirection: 'column',
		gap: '10px',
		width: '90%',
		margin: '0 auto',
		borderRadius: '25px',
	},
	customerCard: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		gap: '5px',
		padding: '10px',
		cursor: 'pointer',
	},
	cardContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '10px',
	},
	customerName: {
		fontFamily: 'Poppins, sans-serif',
		flex: 1,
	},
	customerPhones: {
		display: 'flex',
		padding: '2px',
	},
	customerPhone: {
		display: 'flex',
		alignItems: 'center',
		gap: '5px',
		flex: 1,
	},
	customerInformations: {
		padding: '2px',
	},
};

export default styles;