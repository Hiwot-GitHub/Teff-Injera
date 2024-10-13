// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging.js');

// Initialize Firebase in the service worker
const firebaseConfig = {
  apiKey: "AIzaSyC_GUnAxBTb8mSSR_AkB-eL9Cf3waX7yjk",
  authDomain: "teff-injera-b80d0.firebaseapp.com",
  projectId: "teff-injera-b80d0",
  storageBucket: "teff-injera-b80d0.appspot.com",
  messagingSenderId: "126771756790",
  appId: "1:126771756790:web:a28d592f03ca5bd3e036d7"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background push notifications
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
