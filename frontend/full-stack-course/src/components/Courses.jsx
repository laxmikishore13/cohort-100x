// import { Card } from "@mui/material";
import { Card } from "@mui/material";
import { useEffect, useState } from "react";

function Courses() {
  const [course, setCourse] = useState([]);

  const getCourses = async () => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    const courseRequest = await fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const courseResponse = await courseRequest.json();
    setCourse(courseResponse?.courses);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div
      style={{
        marginTop: "10em",
        display: "flex",
      }}
    >
      {course.map((item) => (
        <Card
          style={{ margin: "2em", minWidth: "65px", minHeight: "40px" }}
          key={item._id}
        >
          {item.description}
        </Card>
      ))}
    </div>
  );
}

export default Courses;
