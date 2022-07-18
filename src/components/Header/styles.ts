const styles = {
	container: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		padding: '15px',
		boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
		position: 'fixed',
		zIndex: 1,
		background: '#f4f6fa',
	},
	header: {
		width: '60%',
		display: 'flex',
		gap: '25px',
		alignItems: 'center',
		padding: '0 10px',
		'@media(max-width: 600px)': {
			width: '100%',
		},
	},
	textfield: {
		flex: 1,
		margin: '0 auto',
		background: '#fff',
		borderRadius: '5px',
		'@media(max-width:600px)': {
			width: '100vw',
		},
	},
	addCustomerButton: {
		fontSize: '2.5em',
		color: '#bdbdbd',
		cursor: 'pointer',
	},
};

export default styles;
