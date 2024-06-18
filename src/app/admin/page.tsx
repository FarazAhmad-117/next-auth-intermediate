'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

interface User{
    _id:string;
    username:string;
    email:string;
}

function Admin() {
    const [users , setUsers] = useState<[User]>();
    const [user,setUser] = useState<User>();
    const router = useRouter();

    const verifyAdmin = async()=>{
        let data = localStorage.getItem('next-admin');
        data = await JSON.parse(data!);
        if(!data){
            router.push('/admin/login');
        }
    }

    const getUserData = async () => {
        let data = localStorage.getItem('next-auth');
        console.log(data);
        if (data) {
            const parsedData = await JSON.parse(data);
            setUser(parsedData.user);
        }
    };


    const getAllUsers = async()=>{
        try {
            const res = await axios.get('/api/users/getAll');
            console.log('Here is data of all users:',res.data.users);
            setUsers(res.data.users);
        } catch (error:any) {
            toast.error(error.response.data.error,{
                position:'top-left'
            })
        }
    }


    useEffect(()=>{
        getUserData();
        verifyAdmin();
    },[getUserData,verifyAdmin]);

    return (
        <div className="container mx-auto p-4" >
            <div className='flex my-3 p-3 items-center justify-end'>
                <button
                onClick={()=>{
                    localStorage.removeItem('next-admin');
                    router.push('/admin/login');
                }}
                className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                Logout
                </button>
            </div>
            {/* <h1 className="text-2xl font-bold mb-4">User List</h1> */}
            {/* <table className="min-w-full bg-white border-collapse">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Username</th>
                        <th className="py-2 px-4 border-b">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user) => (
                        <tr key={user._id}>
                            <td className="py-2 px-4 border-b">{user._id}</td>
                            <td className="py-2 px-4 border-b">{user.username}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
            {
                user && 
                <div>
                    <h2 className="text-2xl" >Here is your data</h2>
                    <p className='text-lg' >ID : <span className='text-md' >{user?._id}</span></p>
                    <p className='text-lg' >UserName : <span className='text-md' >{user?.username}</span></p>
                    <p className='text-lg' >Email : <span className='text-md' >{user?.email}</span></p>
                </div>
            }
        </div>
    )
}

export default Admin



