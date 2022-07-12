import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home';

function App() {
	return (
		<>
			<CssBaseline />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
