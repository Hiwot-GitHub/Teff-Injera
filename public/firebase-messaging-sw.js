// firebase-messaging-sw.js

// Handle background push notifications
self.addEventListener('push', function(event) {
  const payload = event.data?.json();
  console.log('Received background message ', payload);

  const notificationTitle = payload?.notification?.title || 'New Order';
  const notificationOptions = {
    body: payload?.notification?.body || 'You have a new order.',
    icon: '/icon.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Optionally handle notification click events
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/admin') // Open the admin page on notification click
  );
});
