import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// yup schema
const schema = yup
	.object({
		email: yup.string().email('Invalid email format').required('Email is required'),
	})
	.required();
//End yup schema

const SentEmail = () => {
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
	};
	return (
		<div>
			<div className={div1}>
				<div className={div2}>
					<div className={div3}>
						<h1 className='mb-8 text-3xl text-center'>Sign up</h1>
						<form onSubmit={handleSubmit(onSubmit)}>
							<input className={inputs} placeholder='Email' type='text' {...register('email')} />
							<p className=' text-red-800 text-sm'>{errors.email?.message}</p>

							<button type='submit' className={submitButton}>
								send email
							</button>
						</form>
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
const submitButton = 'w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1';

export default SentEmail;
