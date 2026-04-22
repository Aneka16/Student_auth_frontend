import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://student-auth-backend-hqzy.onrender.com/api";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async () => {
    // ✅ Simple validation
    if (!data.email || !data.password) {
      return alert("All fields are required");
    }

    try {
      const res = await axios.post(API + "/login", data);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.msg || "Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <input
        className="form-control my-2"
        placeholder="Email"
        onChange={(e) =>
          setData({ ...data, email: e.target.value })
        }
      />

      <input
        type="password"
        className="form-control my-2"
        placeholder="Password"
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
      />

      <button className="btn btn-success" onClick={login}>
        Login
      </button>

      <p style={{ marginTop: "10px" }}>
        New user? <a href="/">Register</a>
      </p>
    </div>
  );
}