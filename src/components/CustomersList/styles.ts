const styles = {
	page: {
		height: '100%',
		width: '60vw',
		paddingTop: '100px',
		margin: '0 auto',
		position: 'relative',
		'@media(max-width:600px)': {
			width: '100vw',
		},
	},
	customersList: {
		display: 'flex',
		flexDirection: 'column',
		gap: '10px',
		width: '90%',
		margin: '0 auto',
		borderRadius: '25px',
		paddingBottom: '60px',
	},
	addCustomerButton: {
		fontSize: '2.5em',
		color: '#bdbdbd',
		position: 'absolute',
		bottom: '20px',
		right: '20px',
		cursor: 'pointer',
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
		padding: '10px 0',
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
