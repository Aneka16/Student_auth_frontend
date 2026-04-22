import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://student-auth-backend-hqzy.onrender.com";

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

  }, [token, navigate]); // ✅ important fix

  const updateCourse = async () => {
    if (!course) return alert("Enter course");

    try {
      await axios.put(API + "/update-course",
        { course },
        { headers: { Authorization: "Bearer " + token } }
      );
      alert("Course updated");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  const updatePassword = async () => {
    if (!pass.oldPassword || !pass.newPassword) {
      return alert("Enter both passwords");
    }

    try {
      await axios.put(API + "/update-password",
        pass,
        { headers: { Authorization: "Bearer " + token } }
      );
      alert("Password updated");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
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
      <input
        className="form-control my-2"
        placeholder="New Course"
        onChange={(e) => setCourse(e.target.value)}
      />
      <button className="btn btn-warning" onClick={updateCourse}>
        Update Course
      </button>

      <h4 className="mt-4">Update Password</h4>
      <input
        type="password"
        className="form-control my-2"
        placeholder="Old Password"
        onChange={(e) =>
          setPass({ ...pass, oldPassword: e.target.value })
        }
      />
      <input
        type="password"
        className="form-control my-2"
        placeholder="New Password"
        onChange={(e) =>
          setPass({ ...pass, newPassword: e.target.value })
        }
      />

      <button className="btn btn-danger" onClick={updatePassword}>
        Update Password
      </button>

      <br /><br />

      <button className="btn btn-dark" onClick={logout}>
        Logout
      </button>
    </div>
  );
}