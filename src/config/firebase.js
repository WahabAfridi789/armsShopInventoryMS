// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCP7EzQyXVcYb5PdONhq9y5M5G5wYsevFs',
  authDomain: 'mirzamanandsons.firebaseapp.com',
  projectId: 'mirzamanandsons',
  storageBucket: 'mirzamanandsons.appspot.com',
  messagingSenderId: '736357956406',
  appId: '1:736357956406:web:97676abf8a25f15ebd5197',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
