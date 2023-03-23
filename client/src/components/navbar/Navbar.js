import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutApi, reset } from '../../features/auth/authSlice';

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	const [toggle, setToggle] = useState(false);

	const toggleController = () => {
		setToggle(!toggle);
	};

	const logOut = async () => {
		await dispatch(logoutApi());
	};

	return (
		<div>
			<div className={navContainer}>
				<div className=' flex items-center justify-between w-full h-full '>
					{/* left texts */}
					<div className={logo}>
						<NavLink to='/'>Logo</NavLink>
					</div>
					{/* middles */}
					<div className=''>
						<span className=' text-4xl text-white'>{user ? user.name : <span>No User</span>}</span>
					</div>

					{/* right texts */}
					<div className={navItem}>
						{user ? (
							<a onClick={() => logOut()} className='myBtn bg-secondary'>
								Logout
							</a>
						) : (
							<div className=' mx-2'>
								<NavLink className='mr-2' to='/signUp'>
									Signup
								</NavLink>
								<NavLink to='/signIn'>Login</NavLink>
							</div>
						)}
					</div>
					<div onClick={toggleController} className={toggleBtn}>
						{toggle ? <FaTimes></FaTimes> : <FaBars></FaBars>}
					</div>
					{toggle && (
						<div className={toggleContainer}>
							{user ? (
								<a onClick={() => logOut()} className='myBtn bg-secondary'>
									Logout
								</a>
							) : (
								<div className=' mx-2'>
									<NavLink onClick={toggleController} className='mr-2' to='/signUp'>
										Signup
									</NavLink>
									<NavLink onClick={toggleController} to='/signIn'>
										Login
									</NavLink>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const navContainer = 'fixed w-full h-[70px] top-0 left-0 bg-primary text-white px-8 z-50 shadow-md';
const logo = 'flex items-center content-center gap-4';
const navItem = 'hidden md:flex items-center content-center gap-4';
const toggleContainer = 'md:hidden fixed h-[20vh] w-full top-[70px] left-0 bg-primary flex flex-col items-center justify-center gap-4';
const toggleBtn = 'md:hidden flex items-center content-center gap-4 cursor-pointer';

export default Navbar;
