import { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import signinImage from "@/assets/daro.jpg"; 
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("https://smartdaro.up.railway.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Sign-in failed");
      }
      localStorage.setItem("token", data.token);
      navigate("/home"); // Redirect to home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-4xl w-full flex">
        {/* Left Side */}
        <div className="hidden md:flex w-1/2 justify-center items-center bg-gray-00 p-6">
          <img src={signinImage} alt="Signin Illustration" className="max-w-full" />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8 bg-gray-900 text-white">
          <h2 className="text-2xl font-bold text-yellow-500 mb-6">Sign In</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form className="space-y-4" onSubmit={handleSignin}>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md pl-10 focus:outline-none focus:border-yellow-500"
              />
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md pl-10 pr-10 focus:outline-none focus:border-yellow-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-gray-400">Remember me</label>
              </div>
              <span className="text-yellow-500 cursor-pointer">Forgot Password?</span>
            </div>
            <button type="submit" className="w-full bg-yellow-500 text-gray-900 font-bold py-3 rounded-md hover:bg-yellow-600">
              Sign In
            </button>
          </form>
          <p className="text-gray-400 text-center mt-4">
            Don't have an account? <span className="text-yellow-500 cursor-pointer"><Link to='signup'>Register here</Link></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
