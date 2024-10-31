import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK (do this once, globally)
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!); // Update this to the correct path
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const messaging = admin.messaging();

interface NotificationPayload {
  tokens: string[]; // Array of FCM tokens
  title: string;
  body: string;
}

// Define the POST route handler for sending notifications
export async function POST(request: NextRequest) {
  try {
    const { tokens, title, body }: NotificationPayload = await request.json();

    const message = {
      notification: {
        title,
        body,
      },
      tokens
    }

    // Send notification to all tokens
    const response = await messaging.sendEachForMulticast(message);

    return NextResponse.json({
      success: response.successCount > 0,
      failureCount: response.failureCount,
      responses: response.responses, 
    });
  
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json({ success: false, message: 'Error sending notification', error });
  }
}