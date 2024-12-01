import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBo8EUGfbyPhuudMC3jKzzz1dQWwmRAaE8",
  authDomain: "quiz-9b0a0.firebaseapp.com",
  projectId: "quiz-9b0a0",
  storageBucket: "quiz-9b0a0.firebasestorage.app",
  messagingSenderId: "457250386568",
  appId: "1:457250386568:web:811c34e93966b1ca24653d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);