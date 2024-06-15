import connectDb from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'

connectDb();


export async function POST(req:NextRequest){
    try {
        const reqBody = await req.json();
        const { usernameOrEmail ,password } = reqBody;
        if(!usernameOrEmail || !password){
            return NextResponse.json({error:'Username or Email with Password must be provided '},{status:404});
        }
        const user = await User.findOne({$or:[{username:usernameOrEmail},{email:usernameOrEmail}]});
        if(!user){
            return NextResponse.json({error:'User Not Found'},{status:400});
        }
        const isMatch = await bcryptjs.compare(password,user.password);
        if(!isMatch){
            return NextResponse.json({error:'Invalid Credentials'},{status:400});
        }
        const [accessToken,refreshToken] = await user.generateTokens();
        const response = NextResponse.json({accessToken,refreshToken,id:user._id},{status:200});
        response.cookies.set("accessToken",accessToken,{
            httpOnly:true,
        })
        response.cookies.set("refreshToken",refreshToken,{
            httpOnly:true,
        })
        return response;
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}
