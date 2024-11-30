importScripts(
  'https://www.gstatic.com/firebasejs/9.8.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.8.0/firebase-messaging-compat.js',
);

const app = firebase.initializeApp({"projectId":"catnotes-bc632","appId":"1:364962378829:web:e05e25c6a7ca986ce85804","storageBucket":"catnotes-bc632.firebasestorage.app","apiKey":"AIzaSyBckcUhc-VqpIzYJ9bae_LYL65PZ8At2kU","authDomain":"catnotes-bc632.firebaseapp.com","messagingSenderId":"364962378829"});

firebase.messaging(app);
