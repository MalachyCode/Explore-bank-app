// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAWhQICGNYom0zddOoH-wnrA561WwHnoVg',
  authDomain: 'explore-bank.firebaseapp.com',
  projectId: 'explore-bank',
  storageBucket: 'explore-bank.appspot.com',
  messagingSenderId: '216817838594',
  appId: '1:216817838594:web:0e36ae7da86dbbb0b7951b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
