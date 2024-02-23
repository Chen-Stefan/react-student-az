import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CONSTANTS from "../data/config";


const StudentList = (param) => {
  const [studentInfo, setStudentInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${CONSTANTS.BASE_API_URL}students/`);
      const body = await result.json();
      setStudentInfo(body);
    };
    fetchData();
  }, []);

  var filteredStudents = studentInfo;

  if (param !== undefined) {
    filteredStudents = Object.values(studentInfo).filter(
      (p) => p.StudentId !== param.exceptId
    );
  }

  return (
    <React.Fragment>
      <h3>Student List Page</h3>
      {filteredStudents.map((student, index) => (
        <Link key={index} to={`/detail/${student.StudentId}`}>
          <h6>
            {student.StudentId} {student.FirstName} {student.LastName}
          </h6>
        </Link>
      ))}
    </React.Fragment>
  );
};
export default StudentList;
