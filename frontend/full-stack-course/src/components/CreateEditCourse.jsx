import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";

const CreateEditCourse = (props) => {
  const [title, setTitle] = useState(
    props?.item?.course?.title ? props?.item?.course?.title : ""
  );
  const [description, setDescription] = useState(
    props?.item?.course?.description ? props?.item?.course?.description : ""
  );
  const [price, setPrice] = useState(
    props?.item?.course?.price ? props?.item?.course?.price : 0
  );
  const [image, setImage] = useState(
    props?.item?.course?.imageLink ? props?.item?.course?.imageLink : ""
  );
  const [checked, setChecked] = useState(
    props?.item?.course?.published ? props?.item?.course?.published : false
  );

  return (
    <div>
      <Dialog open={props.create} onClose={() => props.setCreate(false)}>
        <DialogTitle>Please enter course details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="description"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="price"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="imageLink"
                fullWidth
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={checked}
                    onChange={() => setChecked(!checked)}
                  />
                }
                label="Published"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              props.type === "Create"
                ? props.createCourse({
                    title,
                    description,
                    price,
                    imageLink: image,
                    published: checked,
                  })
                : props.updateCourse({
                    title,
                    description,
                    price,
                    imageLink: image,
                    published: checked,
                  });
              setChecked(false);
              setDescription("");
              setPrice(0);
              setImage("");
              setTitle("");
            }}
          >
            {props.type}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => props.setCreate(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateEditCourse;
