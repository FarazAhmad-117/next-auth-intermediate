import connectDb from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'

connectDb();

export async function GET(req:NextRequest){
    try {
        const response = NextResponse.json(
            {message: 'Logged out successfully'},
            {status:200}
        );

        response.cookies.delete("accessToken"); 
        response.cookies.delete("refreshToken");
        return response;
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
