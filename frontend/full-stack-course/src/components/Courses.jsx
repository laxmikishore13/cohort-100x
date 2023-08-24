// import { Card } from "@mui/material";
import { Button, Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import CourseCard from "./Coursecard";
import CreateEditCourse from "./CreateEditCourse";

function Courses() {
  const [course, setCourse] = useState([]);
  const [create, setCreate] = useState(false);

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

  const updateCourse = async (course) => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    try {
      const updateRequest = await fetch("http://localhost:3000/admin/courses", {
        method: "POST",
        body: JSON.stringify(course),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const updateResponse = await updateRequest.json();
      if (updateResponse.message === "Course saved successfully") {
        setCreate(false);
        getCourses();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        marginTop: "5em",
      }}
    >
      <Button
        variant="contained"
        sx={{ margin: 2 }}
        onClick={() => setCreate(true)}
      >
        Create Course
      </Button>
      <div
      // style={{
      //   display: "flex",
      //   justifyContent: "space-between",
      //   flexWrap: "nowrap",
      // }}
      >
        <Grid container spacing={2} justifyContent="flex-start">
          {course.map((item) => (
            <Grid item xs={12} md={4} lg={3} key={item._id}>
              <CourseCard course={item} />
            </Grid>
          ))}
        </Grid>
      </div>
      <CreateEditCourse
        create={create}
        setCreate={setCreate}
        updateCourse={(e) => updateCourse(e)}
      />
    </div>
  );
}

export default Courses;
