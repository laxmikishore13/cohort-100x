import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import CreateEditCourse from "./CreateEditCourse";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CourseCard(props) {
  const [create, setCreate] = useState(false);
  const [courseID, setCourseID] = useState("");
  const Navigate = useNavigate();

  const updateCourse = async (course) => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    try {
      const updateRequest = await fetch(
        "http://localhost:3000/admin/courses/" + courseID,
        {
          method: "PUT",
          body: JSON.stringify(course),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const updateResponse = await updateRequest.json();
      if (updateResponse.message === "Course updated successfully") {
        setCreate(false);
        props.getCourses();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Card sx={{ minWidth: 275, maxWidth: 300, minHeight: 450 }}>
        <CardContent>
          <img
            style={{ height: 194, objectFit: "cover" }}
            src={props.course.imageLink}
            alt="course"
          />
          {/* <CardMedia
            component="img"
            height="194"
            image={props.course.imageLink}
            alt="course"
            sx={{ objectFit: "cover" }}
          /> */}
          <Typography variant="h6" gutterBottom>
            {props.course.title}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ marginBottom: 2, wordWrap: "break-word" }}
          >
            {props.course.description}
          </Typography>
          <Typography color="text.secondary">
            Price - {props.course.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              setCreate(true);
              setCourseID(props.course._id);
            }}
          >
            edit
          </Button>
        </CardActions>
      </Card>
      <CreateEditCourse
        create={create}
        setCreate={setCreate}
        type={"Update"}
        item={props}
        updateCourse={(e) => updateCourse(e)}
      />
    </>
  );
}
export default CourseCard;
