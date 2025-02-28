import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      const { data } = await axios.post("https://smartdaro.up.railway.app/api/login", formData);
      localStorage.setItem("token", data.token);
      setMessage({ type: "success", text: "Login successful! Redirecting..." });

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Invalid credentials. Try again." });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {message.text && <p className={`text-${message.type === "error" ? "red" : "green"}-500`}>{message.text}</p>}
        
        <form onSubmit={handleLogin}>
          {["email", "password"].map((field) => (
            <input
              key={field}
              type={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              required
            />
          ))}
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">Login</button>
        </form>
        
        <p className="mt-2 text-sm">
          Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
