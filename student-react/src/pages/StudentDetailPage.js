import React from "react";
import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
//import students from "../data/students";
import StudentList from "../components/StudentList";
import NotFoundPage from "../components/NotFoundPage";
import { useState, useEffect } from "react";
import CONSTANTS from "../data/config";
import AddStudentForm from "../components/AddStudentForm";

const StudentDetailPage = () => {
  // any JS code goes here
  const { id } = useParams();
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState({
    FirstName: "",
    LastName: "",
    School: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${CONSTANTS.BASE_API_URL}students/${id}`);
      const body = await result.json();
      setStudentInfo(body);
    };
    fetchData();
  }, [id]);
  console.log("Student prop:", studentInfo);

  const updateStudent = async (e) => {
    e.preventDefault(); // Prevent the form from causing a page reload
    try {
      const response = await fetch(`${CONSTANTS.BASE_API_URL}students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentInfo),
      });
      if (response.ok) {
        console.log("Student updated successfully");
        navigate("/list", { replace: true, state: { refresh: true } }); // Redirect after update
      } else {
        console.error("Failed to update student");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      const response = await fetch(
        `${CONSTANTS.BASE_API_URL}students/${studentId}`,
        {
          method: "delete",
        }
      );
      if (response.ok) {
        console.log("Student deleted successfully");
        navigate("/list", { replace: true, state: { refresh: true } }); // Redirect after deletion
      } else {
        console.error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!studentInfo) return <NotFoundPage />;
  return (
    <React.Fragment>
      <div style={{ width: "20%", float: "right" }}>
        <h3>Others:</h3>
        <StudentList exceptId={studentInfo.StudentId} />
      </div>

      <h4 className="text-danger">Student ID={studentInfo.StudentId}</h4>
      <p>
        <b>Name: </b>
        {studentInfo.FirstName} {studentInfo.LastName}
      </p>
      <p>
        <b>School: </b>
        {studentInfo.School}
      </p>
      <div style={{ width: "50%", float: "left" }}>
        <AddStudentForm />
      </div>

      <button
        onClick={() => deleteStudent(studentInfo.StudentId)}
        className="btn btn-danger"
      >
        Delete
      </button>
      <form onSubmit={updateStudent} style={{ width: "50%" }}>
        <h3>Update Student</h3>
        <div className="form-group">
          <label>First Name:</label>
          <input
            className="form-control"
            name="firstName"
            type="text"
            value={studentInfo.FirstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            className="form-control"
            name="lastName"
            type="text"
            value={studentInfo.LastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>School:</label>
          <input
            className="form-control"
            name="school"
            type="text"
            value={studentInfo.School}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Student
        </button>
      </form>
    </React.Fragment>
  );
};

export default StudentDetailPage;
