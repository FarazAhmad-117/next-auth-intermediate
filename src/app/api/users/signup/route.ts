import connectDb from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

connectDb();

export async function POST(req:NextRequest){
    try {
        const reqBody = await req.json();
        const {username,email,password} = reqBody;
        if(!username || !email || !password){
            return NextResponse.json({error:'Unable to create new user'},{status:404});
        }
        console.log(reqBody);

        const oldUser = await User.findOne({$or:[{username},{email}]});
        if(oldUser){
            return NextResponse.json({error:'Such User Already Exists OR Change your email and username'},{status:409});
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = await User.create({username,email,password:hashedPassword});
        if(!newUser){
            return NextResponse.json({error:'Unable to create new user'},{status:500});
        }

        // send verification mail
        await sendEmail({email,emailType:'VERIFY',userId:newUser._id});

        return NextResponse.json({message:'User Registered Successfully.',success:true,newUser},{status:201});
    } catch (error:any) {
        console.log('Error while signup ',error);
        return NextResponse.json({error:error.message},{status:500});
    }
}



