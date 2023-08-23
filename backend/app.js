const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;

//middleware use
app.use(express.json());
app.use(cors());

//secret
const secretKey = "r!Chm@ND7&";

//schema for mongoose
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const coursesSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  published: Boolean,
  imageLink: String,
});

// create model instance
const ADMIN = mongoose.model("Admin", adminSchema);
const COURSESDETAILS = mongoose.model("CoursesDetails", coursesSchema);

// connect to mongoose
mongoose.connect("mongodb://localhost:27017/courses", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "courses",
});

//jwt authentication

const adminAuthentication = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        req.user = user;
        next();
      }
    });
  } catch (err) {
    res.sendStatus(401);
  }
};

app.post("/admin/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await ADMIN.findOne({ username, password });
  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const newadminObj = new ADMIN({ username, password });
    newadminObj.save();
    const token = jwt.sign({ username, role: "admin" }, secretKey, {
      expiresIn: "1hr",
    });
    res.json({ message: "Admin created successfully", token });
  }
});

app.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await ADMIN.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, secretKey, {
      expiresIn: "1hr",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

app.post("/admin/courses", adminAuthentication, (req, res) => {
  const newCourse = new COURSESDETAILS(req.body);
  newCourse.save();
  res.json({ message: "Course saved successfully", courseId: newCourse.id });
});

app.put("/admin/courses/:courseId", adminAuthentication, async (req, res) => {
  const courseId = req.params.courseId;
  const userAuth = await ADMIN.findOne({ username: req.user.username });
  if (userAuth) {
    const course = await COURSESDETAILS.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });
    if (course) {
      res.json({ message: "Course updated successfully" });
    } else {
      res.status(403).json({ message: "Invalid courseId" });
    }
  } else {
    res.status(403).json({ message: "Invalid Token" });
  }
});

app.get("/admin/courses", adminAuthentication, async (req, res) => {
  const userAuth = await ADMIN.findOne({ username: req.user.username });
  if (userAuth) {
    const courses = await COURSESDETAILS.find({});
    res.json({ courses });
  } else {
    res.json({ message: "Invalid Token" });
  }
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
