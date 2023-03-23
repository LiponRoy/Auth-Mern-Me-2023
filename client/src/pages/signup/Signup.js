import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { registerApi, reset } from '../../features/auth/authSlice';

// yup schema
const schema = yup
	.object({
		name: yup
			.string()
			.matches(/^[A-Za-z ]*$/, 'Please enter valid name')
			.max(40)
			.min(3)
			.required('Name is required'),
		email: yup.string().email('Invalid email format').required('Email is required'),
		password: yup.string().required('Password is required'),
		confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
	})
	.required();
//End yup schema

const Signup = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (user) {
			navigate('/');
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	// yup schema and hook form
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	// End yup schema and hook form
	const onSubmit = async (data) => {
		console.log(data);
		await dispatch(registerApi(data));
	};
	return (
		<div>
			<div className={div1}>
				<div className={div2}>
					<div className={div3}>
						<h1 className='mb-8 text-3xl text-center'>Sign up</h1>
						<form onSubmit={handleSubmit(onSubmit)}>
							<input className={inputs} placeholder='Full Name' type='text' {...register('name')} />
							<p className=' text-red-800 text-sm'>{errors.name?.message}</p>

							<input className={inputs} placeholder='Email' type='text' {...register('email')} />
							<p className=' text-red-800 text-sm'>{errors.email?.message}</p>

							<input className={inputs} placeholder='Password' type='password' {...register('password')} />
							<p className=' text-red-800 text-sm'>{errors.password?.message}</p>
							<input className={inputs} placeholder='Confirm Password' type='password' {...register('confirmPassword')} />
							<p className=' text-red-800 text-sm'>{errors.confirmPassword?.message}</p>

							<button type='submit' disabled={isLoading} className={submitButton}>
								Create Account
							</button>
						</form>
					</div>

					<div className='text-grey-dark mt-6 hover:text-blue-700'>
						<Link to='/signIn'>Already have an account? Log in</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

const div1 = 'bg-grey-lighter min-h-screen flex flex-col ';
const div2 = 'container max-w-sm md:max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2';
const div3 = 'bg-white px-6 py-8 rounded shadow-lg  border-2 border-slate-200 text-black w-full';
const inputs = 'block border-2 border-slate-200 w-full p-3 rounded mt-4 mb-1';
const submitButton = 'w-full text-center py-3 rounded bg-green-500 text-white ';
export default Signup;
