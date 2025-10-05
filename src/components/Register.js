import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "lecturer",
    faculty: "FICT",
  });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      nav("/login");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Registration failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 600 }}>
      <h3>Register</h3>
      <form onSubmit={submit}>
        <input
          className="form-control mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <select
          className="form-select mb-2"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="lecturer">Lecturer</option>
          <option value="prl">Principal Lecturer</option>
          <option value="pl">Program Leader</option>
        </select>
        <select
          className="form-select mb-3"
          value={form.faculty}
          onChange={(e) => setForm({ ...form, faculty: e.target.value })}
        >
          <option value="FICT">Faculty of Information and Communication Technology (FICT)</option>
          <option value="FADA">Faculty of Architecture and Design (FADA)</option>
          <option value="FBM">Faculty of Business and Management (FBM)</option>
          <option value="FASS">Faculty of Arts and Social Sciences (FASS)</option>
        </select>
        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
}
