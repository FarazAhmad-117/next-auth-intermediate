import connectDb from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';

connectDb();


export async function GET(){
    try {
        const users = await User.find();
        return NextResponse.json({users},{status:200})
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}






