'use client'
import { useRouter } from 'next/navigation';
import React from 'react'

function page({params}:{params:{id:string}}) {
    const router = useRouter();

    return (
        <div className='flex flex-col items-center' >
            <div className='my-3 mx-auto w-[80%] text-2xl font-bold' > 
                <p>Here is the id you wanted to see<span className='block w-full bg-gray-50 text-red-400 italic py-1 px-2 text-sm'>{params.id}</span></p>
            </div>
            <div className="my-3">
                <button
                    onClick={() => {
                        router.back();
                    }}
                    className="bg-blue-400 hover:bg-blue-600 cursor-pointer transition-all duration-200 py-1 px-3 my-2 mx-auto"
                >
                    Go Back
                </button>
            </div>
        </div>
    )
}

export default page