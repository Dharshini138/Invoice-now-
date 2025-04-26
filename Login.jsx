import { useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully!");
      }
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Google login successful!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative h-screen w-screen bg-cover bg-center" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1470&q=80')",
    }}>
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.form
          onSubmit={handleAuth}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {isRegistering ? "Create an Account" : "Welcome Back"}
          </h2>

          <input
            className="w-full border border-gray-300 px-4 py-2 rounded"
            type="email" placeholder="Email address" value={email}
            onChange={(e) => setEmail(e.target.value)} required />

          <input
            className="w-full border border-gray-300 px-4 py-2 rounded"
            type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            {isRegistering ? "Sign Up" : "Login"}
          </button>

          <div className="text-center text-sm text-gray-500">or</div>

          <button type="button" onClick={handleGoogleLogin}
            className="w-full border border-gray-400 py-2 rounded hover:bg-gray-100 transition">
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-600">
            {isRegistering ? "Already have an account?" : "Don't have an account?"}
            <span onClick={() => setIsRegistering(!isRegistering)}
              className="ml-1 text-blue-600 cursor-pointer hover:underline">
              {isRegistering ? "Login" : "Sign Up"}
            </span>
          </p>
        </motion.form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
