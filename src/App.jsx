import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Signup from "./pages/Signup"
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Courses from "./pages/Courses";
import Venues from "./pages/Venues";
import Timetable from "./pages/Timetable";
import Signin from "./pages/Signin";

function App() {
  

  return (
    <div>
     <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Signin/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/admin" element={<Admin/>} />
                <Route path="/courses" element={<Courses/>} />
                <Route path="/venues" element={<Venues/>} />
                <Route path="/timetable" element={<Timetable/> }/>
                
                
                
            </Routes>    
    </Router>
    </div>
  )
}

export default App
