import 'react-toastify/dist/ReactToastify.min.css';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Customer from './pages/Customer';
import HomePage from './pages/Home';

function App() {
	return (
		<>
			<CssBaseline />
			<ToastContainer />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/customer' element={<Customer />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
