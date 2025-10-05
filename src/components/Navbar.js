import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>MENU</h2>
      <Link to="/">Dashboard</Link>
      <Link to="/report">Report Form</Link>
      
      <Link to="/courses">Course Management</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}


