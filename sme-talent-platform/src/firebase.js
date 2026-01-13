import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPToQikx_Uj7UNnbTVwFh-sijcg5JEeW4",
  authDomain: "likeminded-auth.firebaseapp.com",
  projectId: "likeminded-auth",
  storageBucket: "likeminded-auth.firebasestorage.app",
  messagingSenderId: "72018454852",
  appId: "1:72018454852:web:6be29aa0e5c7968f5fcf11",
  measurementId: "G-35QMHXCZ5F"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
