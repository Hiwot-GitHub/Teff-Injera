// firebase-messaging-sw.js

// Handle background push notifications
self.addEventListener('push', function(event) {
  console.log('Push event received:', event);
  
  let payload = {};
  try {
    if (event.data) {
      payload = event.data.json();  // Attempt to parse the payload
      console.log('Payload parsed:', payload);
    } else {
      console.error('Push event has no data.');
    }
  } catch (error) {
    console.error('Error parsing push event data:', error);
    return;  // Exit early if parsing fails
  }

  // Prepare notification details
  const notificationTitle = payload?.notification?.title || 'New Order';
  const notificationOptions = {
    body: payload?.notification?.body || 'You have a new order.',
    icon: payload?.notification?.icon || '/icon.png',
  };

  // Show notification
  try {
    self.registration.showNotification(notificationTitle, notificationOptions);
    console.log('Notification displayed:', notificationTitle, notificationOptions);
  } catch (error) {
    console.error('Error showing notification:', error);
  }
});

// Handle notification click events
self.addEventListener('notificationclick', function(event) {
  console.log('Notification click received:', event.notification);
  event.notification.close();

  event.waitUntil(
    clients.openWindow('/admin')
      .then(() => console.log('Opened /admin page.'))
      .catch((error) => console.error('Error opening /admin page:', error))
  );
});
