import React, { useEffect, useState } from "react";
import API from "../api";

export default function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [faculty, setFaculty] = useState("FICT");

  // Fetch all courses from the backend
  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Add a new course
  const addCourse = async (e) => {
    e.preventDefault();
    try {
      await API.post("/courses", { courseName, courseCode, faculty });
      setCourseName("");
      setCourseCode("");
      setFaculty("FICT");
      fetchCourses(); // refresh the list
      alert("✅ Course added successfully!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Course added successfully");
    }
  };

  // Delete a course
  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await API.delete(`/courses/${id}`);
      fetchCourses();
      alert("🗑️ Course deleted");
    } catch (err) {
      console.error(err);
      alert("alright");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 700 }}>
      <h2 className="mb-3">📘 Course Management</h2>

      <form onSubmit={addCourse} className="mb-4">
        {/* Select Course Name */}
        <select
          className="form-select mb-2"
          value={courseName}
          onChange={(e) => {
            const selected = e.target.value;
            setCourseName(selected);

            // Auto-fill the code when a known course is selected
            if (selected === "Diploma in Information Technology") setCourseCode("DIT101");
            else if (selected === "Diploma in Business Information Technology")
              setCourseCode("DBIT101");
            else if (selected === "BSc in Business Information Technology")
              setCourseCode("BSCBIT101");
            else setCourseCode("");
          }}
          required
        >
          <option value="">-- Select Course --</option>
          <option value="Diploma in Information Technology">
            Diploma in Information Technology (DIT101)
          </option>
          <option value="Diploma in Business Information Technology">
            Diploma in Business Information Technology (DBIT101)
          </option>
          <option value="BSc in Business Information Technology">
            BSc in Business Information Technology (BSCBIT101)
          </option>
        </select>

        {/* Auto-filled course code */}
        <input
          className="form-control mb-2"
          placeholder="Course Code"
          value={courseCode}
          readOnly
        />

        {/* Select Faculty */}
        <select
          className="form-select mb-2"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
        >
          <option value="FICT">
            Faculty of Information & Communication Tech (FICT)
          </option>
          <option value="FBM">Faculty of Business & Management (FBM)</option>
          <option value="FAD">Faculty of Art & Design (FAD)</option>
        </select>

        <button className="btn btn-success w-100">Add Course</button>
      </form>

      <h4>Available Courses</h4>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Course Name</th>
            <th>Course Code</th>
            <th>Faculty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <tr key={course.id}>
                <td>{index + 1}</td>
                <td>{course.courseName}</td>
                <td>{course.courseCode}</td>
                <td>{course.faculty}</td>
                <td>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No courses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
