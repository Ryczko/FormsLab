// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD1Y1Jb33a-DecxVe64bcIymPTpK-rzA7g',
  authDomain: 'employee-pulse-b2d2e.firebaseapp.com',
  projectId: 'employee-pulse-b2d2e',
  storageBucket: 'employee-pulse-b2d2e.appspot.com',
  messagingSenderId: '964138853453',
  appId: '1:964138853453:web:b5de62a8a7053f09e52804',
  measurementId: 'G-J4KXG6KY31',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
