import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/home/Home';
import Signup from './components/signup/Signup';
import SignIn from './components/signin/SignIn';
import SentEmail from './components/sentEmail/SentEmail';
import RequireAuth from './components/requireAuth/RequireAuth';

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route
						path='/'
						element={
							<RequireAuth>
								<Home />
							</RequireAuth>
						}
					/>
					<Route path='/signup' element={<Signup />} />
					<Route path='/login' element={<SignIn />} />
					<Route path='/sentEmail' element={<SentEmail />} />

					{/* <Route path='*' element={<NotFound />} /> */}
				</Routes>
				<ToastContainer></ToastContainer>
			</Router>
		</>
	);
}

export default App;
