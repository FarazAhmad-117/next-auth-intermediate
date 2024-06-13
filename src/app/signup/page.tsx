'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

interface SignupFormInputs {
    username: string;
    email: string;
    password: string;
}

function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>();
    const [showPassword,setShowPassword] = useState(false);

    const onSubmit: SubmitHandler<SignupFormInputs> = data => {
        console.log(data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-5 text-center text-slate-800">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Username</label>
                        <input
                        id="name"
                        {...register('username', { required: 'Username is required' })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : ''}`}
                        />
                        {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input
                        id="email"
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input
                        id="password"
                        type={showPassword ? "text":"password"}
                        {...register('password', { required: 'Password is required' })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                    </div>

                    <div className="mb-6 flex items-center justify-center">
                        <input
                        id="showPassword"
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(prev => !prev)}
                        className="mr-2 leading-tight"
                        />
                        <label className="inline text-gray-700 text-sm font-bold cursor-pointer" htmlFor="showPassword">Show Password</label>
                    </div>

                    <div className="flex items-center justify-center">
                        <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                        Sign Up
                        </button>
                    </div>
                </form>
                <hr className='my-4' />
                <div className='my-3 w-full text-black text-center' >
                    <p className='font-bold'>Already a User ? 
                        <Link href='/login' >
                            <span className='px-3 text-gray-600 hover:text-blue-700 cursor-pointer'>
                                Sign In
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup