import React, { useState } from "react";

export default function LecturerReportForm() {
  const [form, setForm] = useState({
    faculty_name: "Faculty of Information Communication Technology",
    class_name: "",
    week_of_reporting: "",
    date_of_lecture: "",
    course_name: "",
    course_code: "",
    lecturer_name: "",
    actual_present: 0,
    total_registered: 0,
    venue: "",
    scheduled_time: "",
    topic_taught: "",
    learning_outcomes: "",
    recommendations: "",
  });

  // ✅ Predefined courses
  const courses = [
    { id: 1, course_name: "Diploma in Information Technology", course_code: "DIT101" },
    { id: 2, course_name: "Diploma in Business Information Technology", course_code: "DBIT101" },
    { id: 3, course_name: "BSc in Business Information Technology", course_code: "BSCBIT101" },
  ];

  const handleCourseChange = (e) => {
    const selectedCourse = courses.find(
      (c) => c.course_name === e.target.value
    );
    if (selectedCourse) {
      setForm({
        ...form,
        course_name: selectedCourse.course_name,
        course_code: selectedCourse.course_code,
      });
    } else {
      setForm({ ...form, course_name: "", course_code: "" });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    alert(`✅ Report submitted for ${form.course_name} (${form.course_code})`);
  };

  return (
    <div className="container mt-4">
      <h4>Lecturer Reporting Form</h4>
      <form onSubmit={submit}>
        <div className="row">
          <div className="col-md-6 mb-2">
            <label>Faculty Name</label>
            <input
              className="form-control"
              value={form.faculty_name}
              onChange={(e) =>
                setForm({ ...form, faculty_name: e.target.value })
              }
            />
          </div>

          <div className="col-md-6 mb-2">
            <label>Class Name</label>
            <input
              className="form-control"
              value={form.class_name}
              onChange={(e) => setForm({ ...form, class_name: e.target.value })}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-2">
            <label>Week of Reporting</label>
            <input
              className="form-control"
              value={form.week_of_reporting}
              onChange={(e) =>
                setForm({ ...form, week_of_reporting: e.target.value })
              }
            />
          </div>

          <div className="col-md-4 mb-2">
            <label>Date of Lecture</label>
            <input
              type="date"
              className="form-control"
              value={form.date_of_lecture}
              onChange={(e) =>
                setForm({ ...form, date_of_lecture: e.target.value })
              }
            />
          </div>

          {/* ✅ Course select dropdown */}
          <div className="col-md-4 mb-2">
            <label>Course</label>
            <select
              className="form-select"
              value={form.course_name}
              onChange={handleCourseChange}
            >
              <option value="">-- Select Course --</option>
              {courses.map((c) => (
                <option key={c.id} value={c.course_name}>
                  {c.course_name} ({c.course_code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ✅ Display selected course code */}
        {form.course_code && (
          <div className="mt-2">
            <strong>Course Code:</strong> {form.course_code}
          </div>
        )}

        <button className="btn btn-primary mt-3">Submit Report</button>
      </form>
    </div>
  );
}
