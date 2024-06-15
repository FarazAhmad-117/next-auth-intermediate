import Image from "next/image";
import React from "react";


export interface ChildComponent{
    children :React.ReactNode;
}

export default function ProfileLayout({children}:ChildComponent) {
    return (
        <div className="w-full h-[100vh] flex items-center justify-center bg-black">
            <div className="bg-white max-w-[400px] w-[90%] min-h-[500px] h-auto py-4 px-3 flex flex-col items-center gap-4">
                <h1 className="text-3xl">Hello Dear User</h1>
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="object-cover"
                        width={100}
                        height={100}
                        alt="profile picture"
                    />
                </div>
                {children}
            </div>
        </div>
    );
}