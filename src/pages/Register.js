import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API;

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    course: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    if (!form.name || !form.email || !form.password || !form.course)
      return alert("All fields required");

    try {
      await axios.post(API + "/register", form);
      alert("Registered Successfully");
      navigate("/login");
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      <input className="form-control my-2" name="name" placeholder="Name" onChange={handleChange}/>
      <input className="form-control my-2" name="email" placeholder="Email" onChange={handleChange}/>
      <input type="password" className="form-control my-2" name="password" placeholder="Password" onChange={handleChange}/>
      <input className="form-control my-2" name="course" placeholder="Course" onChange={handleChange}/>

      <button className="btn btn-primary" onClick={register}>Register</button>

      <p style={{ marginTop: "10px" }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}