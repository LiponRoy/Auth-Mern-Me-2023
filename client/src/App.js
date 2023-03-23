import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/signup/Signup';
import SignIn from './pages/signin/SignIn';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import RequireAuth from './components/requireAuth/RequireAuth';
function App() {
	return (
		<>
			<Router>
				<Navbar />
				<div>
					<Routes>
						<Route
							path='/'
							element={
								<RequireAuth>
									<Home />
								</RequireAuth>
							}
						/>
						<Route path='/signIn' element={<SignIn />} />
						<Route path='/signup' element={<Signup />} />
					</Routes>
				</div>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
