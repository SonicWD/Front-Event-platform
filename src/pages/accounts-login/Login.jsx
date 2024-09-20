// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { API_URL } from "../../config/config";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";

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

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/login`, data);
      const token = response.data.access_token;
      if (token) {
        localStorage.setItem("token", token);
        setAuthState({ token, isAuthenticated: true });
        navigate("/");
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

  return (
    <motion.div
      className="login h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="form-container bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className={`input w-full p-2 border rounded ${
                errors.username ? "border-red-600" : "border-gray-300"
              } dark:${errors.username ? "border-red-600" : "border-gray-700"}`}
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-600 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="*********"
              className={`input w-full p-2 border rounded ${
                errors.password ? "border-red-600" : "border-gray-300"
              } dark:${errors.password ? "border-red-600" : "border-gray-700"}`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-10 text-gray-600 dark:text-gray-300"
            >
              <img
                src={
                  showPassword
                    ? "/images/icons/view-password-on.svg"
                    : "/images/icons/view-password-off.svg"
                }
                alt="toggle password visibility"
                className="w-5 h-5"
              />
            </button>
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 bg-black text-white font-semibold rounded transition duration-300"
          >
            Log in
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => navigate("/create-account")}
            className="w-full py-2 bg-gray-500 text-white font-semibold rounded transition duration-300"
          >
            Sign Up
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
