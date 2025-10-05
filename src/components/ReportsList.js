import React, { useState, useEffect } from "react";
import API from "../api";
// ✅ import API

export default function Reports() {
  const [q, setQ] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => load(), []);

  async function load(query) {
    const res = await API.get("/reports", { params: { q: query } });
    setRows(res.data.rows || []);
  }

  const search = (e) => {
    e.preventDefault();
    load(q);
  };

  const exportExcel = async () => {
    const res = await API.get("/reports/export/excel", { params: { q }, responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "reports.xlsx";
    a.click();
  };

  return (
    <div>
      <h4>Reports</h4>
      <form className="d-flex mb-2" onSubmit={search}>
        <input className="form-control me-2" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="btn btn-secondary me-2">Search</button>
        <button type="button" className="btn btn-success" onClick={exportExcel}>
          Download Excel
        </button>
      </form>

      <table className="table table-sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>Course</th>
            <th>Lecturer</th>
            <th>Present</th>
            <th>Registered</th>
            <th>Topic</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.date_of_lecture?.slice(0, 10)}</td>
              <td>{r.course_name} ({r.course_code})</td>
              <td>{r.lecturer_name}</td>
              <td>{r.actual_present}</td>
              <td>{r.total_registered}</td>
              <td style={{ maxWidth: 250, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={r.topic_taught}>
                {r.topic_taught}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
