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

// Define the POST route handler for sending notifications
export async function POST(request: NextRequest) {
  try {
    const { token, title, body } = await request.json();

    const message = {
      token, // FCM token of the receiving device
      notification: {
        title,
        body,
      },
    };

    // Send notification
    const response = await messaging.send(message);
    return NextResponse.json({ success: true, message: 'Notification sent', response });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json({ success: false, message: 'Error sending notification', error });
  }
}
