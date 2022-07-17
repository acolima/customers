import 'react-toastify/dist/ReactToastify.min.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Customer from './pages/Customer';
import HomePage from './pages/Home';

function App() {
	const theme = createTheme({
		palette: {
			background: { default: '#f4f6fa' },
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<ToastContainer />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/customer' element={<Customer />} />
					<Route path='/customer/:id' element={<Customer />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
