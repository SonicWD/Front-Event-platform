
// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import API_URL  from "../../config/config";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { Moon, Sun, Eye, EyeOff } from "lucide-react"

// eslint-disable-next-line no-unused-vars
const api_url_dev = "http://127.0.0.1:8000" // URL de la API en desarrollo
// Esquema de validación con Yup
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false)

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/login`, data);
      const token = response.data.access_token;
      if (token) {
        localStorage.setItem("token", token);
        setAuthState({ token, isAuthenticated: true });
        navigate("/eventsP/*");
        console.log("Login successful");
      } else {
        console.error("No token received");
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <motion.div
        className={`w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Login</h1>
          <button
            className={`p-2 rounded-full ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium">Username</label>
            <input
              id="username"
              placeholder="Username"
              {...register("username")}
              className={`w-full p-2 border rounded ${errors.username ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                {...register("password")}
                className={`w-full p-2 border rounded ${errors.password ? "border-red-500" : "border-gray-300"}`}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-800">
            Log in
          </button>
        </form>
        <button className="w-full py-2 px-4 bg-white text-black border border-black rounded hover:bg-gray-100" onClick={() => navigate("/create-account")}>
          Sign Up
          
        </button>
      </motion.div>
    </div>
  )
}
export default Login;
