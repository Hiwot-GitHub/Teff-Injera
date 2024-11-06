import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest){
    const tokens = await prisma.fCMTokens.findMany();
    return NextResponse.json(tokens);
}

interface DeviceInfo {
    userAgent: string;
    language: string;
  }
  
  interface FcmTokenPayload {
    token: string;
    deviceInfo: DeviceInfo;
  }

export async function POST(request: NextRequest) {
    try{
        console.log("Receiving FCM token payload...");
        const { token, deviceInfo }: FcmTokenPayload = await request.json();
        console.log('Received token and deviceInfo', token, deviceInfo);
        if (!token){
            console.log("Missing FCM token in request");
            return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        }
        
        const deviceInfoString = JSON.stringify(deviceInfo);
        console.log("Device Info (as string):", deviceInfoString);
        
        const upsertedToken = await prisma.fCMTokens.upsert({
            where: { token },
            update: { deviceInfo: deviceInfoString },
            create: {
                token,
                deviceInfo: deviceInfoString
            },
        });
        return NextResponse.json({ message: 'FCM token saved successfully', token: upsertedToken });
    } catch(error){
        return NextResponse.json({ error: 'Failed to save FCM token' }, { status: 500 });
    }
}