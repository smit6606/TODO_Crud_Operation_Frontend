import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, TwitterAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const twitterProvider = new TwitterAuthProvider();

/**
 * Generic function to sign in with a pop-up and specific provider.
 */
export const signInWithSocial = async (provider: any) => {
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error("Firebase Auth Error:", error);
        throw error;
    }
};
