import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

function CourseCard(props) {
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
          <Button size="small">edit</Button>
        </CardActions>
      </Card>
    </>
  );
}
export default CourseCard;
