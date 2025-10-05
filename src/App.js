import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import LecturerReportForm from "./components/ReportForm";
import Reports from "./components/ReportsList";
import CourseManagement from "./components/CourseManagement";
import "./components/App.css"; // ✅ Import external CSS

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/report" element={<LecturerReportForm />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/courses" element={<CourseManagement />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
