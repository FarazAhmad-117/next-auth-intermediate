import connectDb from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';

connectDb();

export async function POST(req:NextRequest){
    try {
        const reqBody = await req.json()
        const {token} = reqBody;
        if(!token){
            return NextResponse.json({error:'A token should be provided'},{status:404});
        }
        const user = await User.findOne({verifyToken:token , verifyTokenExpiry:{$gte: Date.now()}});
        if(!user){
            return NextResponse.json({error:'User not found Or Token is Epired'},{status:400});
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({message:'User Verified Successfully'},{status:200});
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}

