
 // firebase.js

// Import required Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyByXbn4K1ZTGUsLUkorE-j8xdZWzIvNHN0",
  authDomain: "skill-swap-3ac31.firebaseapp.com",
  projectId: "skill-swap-3ac31",
  storageBucket: "skill-swap-3ac31.appspot.com", // 🔧 fixed typo (should be .app**spot**.com)
  messagingSenderId: "824615045904",
  appId: "1:824615045904:web:590a016ff850e6a50cf395",
  measurementId: "G-C2TVCFSGW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
