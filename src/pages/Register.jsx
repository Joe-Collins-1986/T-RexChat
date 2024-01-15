import React, { useState } from "react";
import Add from "../assets/images/add.png";

import { auth, storage, db } from "../config/firebase";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;
    const file = e.target[4].files[0];

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress, pause, resume here if needed
        },
        (err) => {
          setError(true);
          console.log("Uplaod error: ", err);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(user, {
              displayName,
              photoURL: downloadURL,
            });
            console.log("Post Upload User: ", user);

            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChat", user.uid), {});
          } catch (updateError) {
            setError(true);
            console.log("Update profile error: ", updateError);
          }
        }
      );
    } catch (err) {
      setError(true);
      console.log("Non-Uplaod error: ", err);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">T-Rex Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input type="password" placeholder="confirm password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="Avatar" />
            <span>Upload Avatar</span>
          </label>
          <button>Sign Up</button>
          {error && <span>Something went wrong</span>}
        </form>
        <p>Have an account? Login</p>
      </div>
    </div>
  );
};

export default Register;
