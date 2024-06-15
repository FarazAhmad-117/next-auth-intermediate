import { NextRequest, NextResponse } from "next/server";
import User from "./models/userModel";
import jwt from 'jsonwebtoken'


export function middleware(req:NextRequest){
    const path = req.nextUrl.pathname;
    const publicPaths = [
        '/login',
        '/signup',
        '/verifyemail'
    ];
    const isPublicPath = publicPaths.includes(path);
    const tokenCookie = req.cookies.get('accessToken');
    const accessToken = tokenCookie ? tokenCookie.value : null;
    if (isPublicPath && accessToken) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    if (!isPublicPath && !accessToken) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
}

export const config={
    matcher:['/','/login','/signup','/verifyemail','/profile/:path*']
}