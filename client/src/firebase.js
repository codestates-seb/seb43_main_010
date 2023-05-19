/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//디비
import { getFirestore } from 'firebase/firestore';
//회원가입 로그인 및 인증
import { getAuth } from 'firebase/auth';
// 파일 처리하는 스토리지
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authService = getAuth(app);
const dbService = getFirestore(app);

const analytics = getAnalytics(app);
export { app, authService, dbService };
