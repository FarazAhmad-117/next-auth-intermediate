'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.min.css";


interface LoginFormInputs{
    usernameOrEmail:string;
    password:string;
}

function AdminLogin() {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const [showPassword,setShowPassword] = useState(false);
    const router = useRouter();
    const onSubmit: SubmitHandler<LoginFormInputs> = data => {
        if(data.usernameOrEmail === "admin" && data.password === "admin"){
            localStorage.setItem('next-admin',JSON.stringify(data));
            router.push('/admin');
        }else{
            toast.error("Invalid Credentials",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-5 text-center text-slate-800">Admin Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Username or Email</label>
                        <input
                        id="name"
                        {...register('usernameOrEmail', { required: 'Username Or Email is required' })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.usernameOrEmail ? 'border-red-500' : ''}`}
                        />
                        {errors.usernameOrEmail && <p className="text-red-500 text-xs italic">{errors.usernameOrEmail.message}</p>}
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
                        Log In
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default AdminLogin