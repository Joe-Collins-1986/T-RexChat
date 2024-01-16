import React, { useState } from "react";
import Add from "../assets/images/add.png";
import { auth, storage, db } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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

    // Check if display name already exists
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("displayName", "==", displayName));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setError(true);
        alert("Display name is already in use. Please choose another one.");
        return;
      }

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
          console.log("Upload error: ", err);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", user.uid), {});
            navigate("/");
          } catch (updateError) {
            setError(true);
            console.log("Update user data error: ", updateError);
          }
        }
      );
    } catch (err) {
      setError(true);
      console.log("Create auth error: ", err);
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
        <p>
          Have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
