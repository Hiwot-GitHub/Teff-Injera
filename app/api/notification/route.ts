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
    console.log("FCM tokens being used:", tokens);
    const message = {
      notification: {
        title,
        body,
      },
      tokens
    };

    // Send notification to all tokens
    const response = await messaging.sendEachForMulticast(message);

    // Log success and failure counts
    console.log("Notification send response:", response);
    console.log(`Success count: ${response.successCount}, Failure count: ${response.failureCount}`);

    // Loop through each response and log details for each token
    response.responses.forEach((res, index) => {
      if(res.success){
        console.log(`Notification sent successfully to token: ${tokens[index]}`);
      } else {
        console.error(`Error sending notification to token: ${tokens[index]}`, res.error);
      }
    });
    
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