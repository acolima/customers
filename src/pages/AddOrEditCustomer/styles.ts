const styles = {
	page: {
		width: '100vw',
		height: '100vh',
		padding: '10px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '30px',
	},
	form: {
		background: '#fff',
		width: '60vw',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: '15px',
		padding: '15px 0',
		'@media(max-width: 600px)': {
			width: '90vw',
		},
	},
	phoneInput: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
		width: '90%',
	},
};

export default styles;
