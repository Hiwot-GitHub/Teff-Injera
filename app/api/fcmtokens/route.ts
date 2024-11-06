import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest){
    const tokens = await prisma.fCMTokens.findMany();
    return NextResponse.json(tokens);
}

export async function POST(request: NextRequest) {
    try{
        const { token, deviceInfo } = await request.json();
        if (!token){
            return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        }

        const upsertedToken = await prisma.fCMTokens.upsert({
            where: { token },
            update: { deviceInfo },
            create: {
                token,
                deviceInfo
            },
        });
        return NextResponse.json({ message: 'FCM token saved successfully', token: upsertedToken });
    } catch(error){
        return NextResponse.json({ error: 'Failed to save FCM token' }, { status: 500 });
    }
}