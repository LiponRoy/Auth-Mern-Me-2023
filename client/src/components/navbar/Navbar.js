import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
	const [toggle, setToggle] = useState(false);

	const toggleController = () => {
		setToggle(!toggle);
	};
	return (
		<div>
			<div className={navContainer}>
				<div className=' flex items-center justify-between w-full h-full '>
					{/* left texts */}
					<div className={logo}>
						<div>Logo</div>
						<div>hi,lipon</div>
					</div>
					{/* middle texts */}
					<div className={navItem}>
						<div className=' cursor-pointer'>--</div>
						<div className=' cursor-pointer'>--</div>
					</div>
					{/* right texts */}
					<div className={navItem}>
						<span className=' cursor-pointer'>About</span>
						<span className=' cursor-pointer'>Contact</span>
						<span className=' cursor-pointer'>Signup</span>
						<a className='myBtn bg-green-700'>Login</a>
					</div>
					<div onClick={toggleController} className={toggleBtn}>
						{toggle ? <FaTimes></FaTimes> : <FaBars></FaBars>}
					</div>
					{toggle && (
						<div className={toggleContainer}>
							<span onClick={toggleController} className=' cursor-pointer'>
								About
							</span>
							<span onClick={toggleController} className=' cursor-pointer'>
								Contact
							</span>
							<span onClick={toggleController} className=' cursor-pointer '>
								Signup
							</span>
							<a onClick={toggleController} className='myBtn bg-secondary'>
								Login
							</a>
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
const toggleContainer = 'md:hidden fixed h-full w-full top-[70px] left-0 bg-primary flex flex-col items-center justify-center gap-4';
const toggleBtn = 'md:hidden flex items-center content-center gap-4 cursor-pointer';

export default Navbar;
