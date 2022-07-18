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
};

export default styles;
