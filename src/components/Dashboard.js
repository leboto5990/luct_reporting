import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location = '/login';
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <span className="navbar-brand">LUCT Reporting</span>
          <div>
            <span className="me-2">Hello, {user.name || 'User'}</span>
            <Link className="btn btn-sm btn-outline-primary me-2" to="/">Report</Link>
            <Link className="btn btn-sm btn-outline-secondary me-2" to="/reports">Reports</Link>
            <button className="btn btn-sm btn-danger" onClick={logout}>Logout</button>
          </div>
        </div>
      </nav>
      <div className="container mt-3">
        <Outlet />
      </div>
    </div>
  );
}
