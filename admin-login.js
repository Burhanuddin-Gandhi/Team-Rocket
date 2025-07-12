import { auth, db } from './firebase.js';
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

document.getElementById("loginAdminBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ✅ Check Firestore for admin role
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().role === "admin") {
      alert("Admin login successful!");
      window.location.href = "dashboard.html?role=admin";
    } else {
      alert("Access denied: Not an admin account.");
      await auth.signOut();
    }
  } catch (error) {
    alert("Login failed: " + error.message);
    console.error(error);
  }
});
    