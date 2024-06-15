'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Profile() {
    const router = useRouter();
    const [id, setId] = useState<string | null>(null);

    const getUserData = async () => {
        let data = localStorage.getItem('next-auth');
        if (data) {
        const parsedData = await JSON.parse(data);
        setId(parsedData.id);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className="my-3 flex gap-2">
            <button
                onClick={() => {
                    if (id) {
                        router.push(`/profile/${id}`);
                    } else {
                        console.error("User ID is null");
                    }
                }}
                className="bg-blue-400 hover:bg-blue-600 cursor-pointer transition-all duration-200 py-1 px-3 my-2 mx-auto"
            >
                See ID
            </button>
            
            <button
                    onClick={() => {
                        router.back();
                    }}
                    className="bg-blue-400 hover:bg-blue-600 cursor-pointer transition-all duration-200 py-1 px-3 my-2 mx-auto"
                >
                    Go Back
            </button>
        </div>
    );
}

export default Profile;
