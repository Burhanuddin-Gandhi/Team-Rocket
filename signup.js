import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

window.signup = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: email,
      name: name,
      role: "user", // default
      createdAt: new Date()
    });

    alert("Signup successful!");
    window.location.href = "dashboard.html?role=user";
  } catch (error) {
    alert("Signup failed: " + error.message);
  }
};
