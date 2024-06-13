import mongoose, { mongo } from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'Please Provide a Username'],
        unique:true
    },
    email:{
        type:String,
        required:[true, 'Please Provide an Email'],
        unique:true
    },
    password:{
        type:String
    },
    isVerified:{
        type:Boolean,
        default: false
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
})

userSchema.methods.generateTokens = function () {
    const user = this;
    const accessToken = jwt.sign(
        { userId: user._id, isAdmin: user.isAdmin },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_TIME }
    );
    const refreshToken = jwt.sign(
        { userId: user._id, isAdmin: user.isAdmin },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_TIME }
    );
    return [accessToken, refreshToken];
};


const User = mongoose.models.users || mongoose.model('users',userSchema);

export default User;



