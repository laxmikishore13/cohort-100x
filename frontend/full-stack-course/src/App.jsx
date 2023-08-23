import "./App.css";
import Courses from "./components/Courses";
import Navigationbar from "./components/Navigationbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navigationbar />
      <Routes>
        <Route path="/admin/signup" element={<Signup />} />
        <Route path="/admin/login" element={<Signin />} />
        <Route path="/admin/courses" element={<Courses />} />
      </Routes>
    </>
  );
}

export default App;
