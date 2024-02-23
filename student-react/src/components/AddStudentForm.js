import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import CONSTANTS from "../data/config";

const AddStudentForm = ({ student }) => {
  const [firstName, setFirstName] = useState(student ? student.firstName : "");
  const [lastName, setLastName] = useState(student ? student.lastName : "");
  const [school, setSchool] = useState(student ? student.school : "");
  const [addFlag, setAddFlag] = useState(false);

  const performFetch = async ({ url, method, body }) => {
    try {
      const headers = { "Content-Type": "application/json" };
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await response.json();
      console.log(data);
      setAddFlag(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addStudent = (e) => {
    e.preventDefault();
    const url = `${CONSTANTS.BASE_API_URL}students/`;
    performFetch({
      url,
      method: "POST",
      body: { firstName, lastName, school },
    });
  };

  const updateStudent = (e) => {
    e.preventDefault();
    // Ensure that student.id is defined
    if (!student || !student.id) {
      console.error("No student ID provided for update.");
      return;
    }
    const url = `${CONSTANTS.BASE_API_URL}students/${student.id}`;
    performFetch({
      url,
      method: "PUT",
      body: { firstName, lastName, school },
    });
  };

  const deleteStudent = (e, studentId) => {
    e.preventDefault();
    console.log("Delete student:", studentId);
    // Ensure that student.id is defined
    if (!student || !student.studentId) {
      console.error("No student ID provided for delete.");
      return;
    }
    const url = `${CONSTANTS.BASE_API_URL}students/${studentId}`;
    performFetch({
      url,
      method: "DELETE",
    });
  };

  if (addFlag) {
    return <Navigate to="/list" />;
  }

  return (
    <div className="panel panel-default">
      <h3>Add, Update, Delete Student</h3>
      <form>
        <div className="form-group">
          <label>First Name:</label>
          <input
            className="form-control"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            className="form-control"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>School:</label>
          <input
            className="form-control"
            type="text"
            placeholder="Occupation"
            value={school}
            onChange={(event) => setSchool(event.target.value)}
          />
        </div>

        <button onClick={addStudent} className="btn btn-success">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddStudentForm;
