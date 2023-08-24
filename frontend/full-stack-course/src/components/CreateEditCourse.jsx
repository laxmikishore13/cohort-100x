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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [checked, setChecked] = useState(false);

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
              props.updateCourse({
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
            Create
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
