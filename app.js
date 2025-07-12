// app.js
import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

window.showResetPopup = function () {
  document.getElementById("resetPopup").classList.remove("hidden");
};

window.closeResetPopup = function () {
  document.getElementById("resetPopup").classList.add("hidden");
};

window.sendResetLink = async function () {
  const email = document.getElementById("resetEmail").value;
  if (!email) return alert("Please enter your email.");

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent!");
    closeResetPopup();
  } catch (error) {
    alert("Failed to send reset link: " + error.message);
    console.error(error);
  }
};
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    login();
  }
});
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const docRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(docRef);

    if (userSnap.exists()) {
      const role = userSnap.data().role || "user";
      window.location.href = `profile.html?role=${role}`;
    } else {
      alert("User data not found. Contact support.");
    }
  } catch (error) {
    alert("Login failed: " + error.message);
  }
};
