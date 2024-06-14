'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css"

export default function Home() {
  const router = useRouter();

  const verifyAuthentication = async()=>{
    const data = localStorage.getItem('next-auth');
    const creds =await JSON.parse(data!);
    console.log(creds);
    if(!creds || !creds){
      router.push('/login');
    }
  }

  const logout = ()=>{
    axios.get('/api/users/logout')
    .then(()=>{
      localStorage.removeItem('next-auth');
      router.push('/login');
    })
    .catch((err:any)=>{
      toast.error(err.response.data.error,{
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    })
  }

  useEffect(()=>{
    verifyAuthentication();
  },[])

  return (
    <div className="container mx-auto px-4">

      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <h2>Hello To the Home Component</h2>
        <div className="flex items-center justify-center">
            <button
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            Log Out
            </button>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t bg-gray-800">
        <p className="text-gray-400">© 2024 My Next.js App</p>
      </footer>
      <ToastContainer/>
    </div>
  );
}
