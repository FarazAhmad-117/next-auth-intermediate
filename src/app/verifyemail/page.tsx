"use client";

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const VerifyEmail: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const verifyToken = async () => {
    if (token) {
      try {
        setLoading(true);
        const response = await axios.post('/api/users/verifyemail', { token });
        setVerificationStatus(response.data.message);
        toast.success("Email verified successfully!", {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      } catch (error: any) {
        toast.error(error.response.data.error || 'Verification failed. Please try again.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        setVerificationStatus('Verification failed. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Invalid or missing token.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      setVerificationStatus('Invalid or missing token.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-full flex items-center flex-col max-w-md justify-center text-center text-black min-h-[70vh]">
        {
            loading ?
            <div className="text-black">Loading...</div>
            :
            <>
                <h2 className="text-2xl font-bold mb-5">Verify Email</h2>
                <p>Here is the verification token: <span className='text-sm mx-3 italic bg-gray-200 text-red-500 py-1 px-2'>{token}</span></p>
                <div className='my-3'>
                    <button onClick={verifyToken} className='text-white bg-blue-500 hover:bg-blue-600 py-3 px-4'>Verify</button>
                </div>
                <p>{verificationStatus}</p>
            </>
        }
        </div>
      <ToastContainer />
    </div>
  );
};

export default VerifyEmail;
