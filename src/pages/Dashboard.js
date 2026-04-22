import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API;

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [course, setCourse] = useState("");
  const [pass, setPass] = useState({ oldPassword: "", newPassword: "" });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/login");

    axios.get(API + "/dashboard", {
      headers: { Authorization: "Bearer " + token }
    })
    .then(res => setUser(res.data))
    .catch(() => navigate("/login"));

  }, [token, navigate]);

  const updateCourse = async () => {
    if (!course) return alert("Enter course");

    await axios.put(API + "/update-course",
      { course },
      { headers: { Authorization: "Bearer " + token } }
    );

    alert("Course updated");
  };

  const updatePassword = async () => {
    if (!pass.oldPassword || !pass.newPassword)
      return alert("Enter both passwords");

    await axios.put(API + "/update-password",
      pass,
      { headers: { Authorization: "Bearer " + token } }
    );

    alert("Password updated");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>

      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Course: {user.course}</p>

      <h4>Update Course</h4>
      <input className="form-control my-2" onChange={(e)=>setCourse(e.target.value)} />
      <button className="btn btn-warning" onClick={updateCourse}>Update</button>

      <h4 className="mt-4">Update Password</h4>
      <input type="password" className="form-control my-2"
        placeholder="Old Password"
        onChange={(e)=>setPass({...pass, oldPassword:e.target.value})} />

      <input type="password" className="form-control my-2"
        placeholder="New Password"
        onChange={(e)=>setPass({...pass, newPassword:e.target.value})} />

      <button className="btn btn-danger" onClick={updatePassword}>Update</button>

      <br /><br />
      <button className="btn btn-dark" onClick={logout}>Logout</button>
    </div>
  );
}