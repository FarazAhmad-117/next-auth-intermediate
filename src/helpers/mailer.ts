import nodemailer, { Transporter } from 'nodemailer';
// import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';
import getVerifyEmail from '@/emailTemplates/verifyUser';
import getResetEmail from '@/emailTemplates/resetPassword';
import { v4 as uuidv4 } from 'uuid';

export const sendEmail = async({email,emailType,userId}:{email:String,emailType:String,userId:String})=>{
    try{
        let hashedToken='';
        if(emailType === 'VERIFY'){
            // hashedToken = await bcryptjs.hash(userId.toString(),10);
            hashedToken = uuidv4();
            await User.findByIdAndUpdate(userId,{
                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now() + 3600000
            });
        }else if(emailType === 'RESET'){
            // hashedToken = await bcryptjs.hash(userId.toString(),10);
            hashedToken = uuidv4();
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now() + 3600000
            });
        }

        // const transporter: Transporter = nodemailer.createTransport({
        //     host: process.env.SENDER_HOST as string,
        //     port: parseInt(process.env.SENDER_PORT as string, 10),
        //     secure: true,
        //     auth: {
        //         user: process.env.SENDER_USER as string,
        //         pass: process.env.SENDER_PASSWORD as string,
        //     },
        // });

        const transporter = nodemailer.createTransport({
            host: process.env.SENDER_HOST as string,
            port: 2525,
            auth: {
                user: process.env.SENDER_USER as string,
                pass: process.env.SENDER_PASSWORD as string,
            }
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL as string,   
            to: email as string,     
            subject:emailType === 'VERIFY'? 'Verify Your Email':'Reset Your Password',  
            html: emailType === 'VERIFY'? getVerifyEmail(process.env.DOMAIN + `/verifyemail?token=${hashedToken}`) : 
                getResetEmail(process.env.DOMAIN + `/forgotpassword?token=${hashedToken}`)
        };

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;

    }catch(error){
        throw error;
    }
}



