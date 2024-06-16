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
    // verifyAuthentication();
  },[])

  return (
    <div className="">

      <main className="flex flex-col w-[100vw] items-center justify-center min-h-screen bg-slate-900">
        <h2 className="my-3 text-3xl font-serif font-bold text-white" >Hello To the Home Component</h2>
        <div className="flex items-center justify-center gap-4">
            <button
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            Log Out
            </button>
            <button
            onClick={()=>{
              router.push('/profile')
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            Go to Profile
            </button>
            <button
            onClick={()=>{
              router.push('/admin')
            }}
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            Admin Dashboard
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
